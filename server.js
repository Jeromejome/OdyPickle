// Static file server + owner-only API for local development: `npm run start`
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 3000;
const env = { ...readEnvFile(path.join(root, ".env")), ...process.env };
const SUPABASE_URL = env.SUPABASE_URL;
const PUBLISHABLE_KEY = env.SUPABASE_PUBLISHABLE_KEY;
const SECRET_KEY = env.SUPABASE_SECRET_KEY;

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon"
};
// Never serve secrets or server-side files.
const blocked = /^(\.env|\.git|node_modules|server\.js|package(-lock)?\.json|supabase)(\/|$)/;

function readEnvFile(file) {
  try {
    return Object.fromEntries(
      fs.readFileSync(file, "utf8")
        .split(/\r?\n/)
        .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i))
        .filter(Boolean)
        .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, "")])
    );
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------- Supabase admin calls

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function supabase(pathname, { method = "GET", body, key = SECRET_KEY, token = key, headers = {} } = {}) {
  const response = await fetch(`${SUPABASE_URL}${pathname}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  return { ok: response.ok, status: response.status, data };
}

// Confirms the caller is signed in and is an OdyZPickle owner.
async function requireOwner(req) {
  const token = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) throw new ApiError(401, "Sign in first.");
  const user = await supabase("/auth/v1/user", { key: PUBLISHABLE_KEY, token });
  if (!user.ok || !user.data?.id) throw new ApiError(401, "Your session has expired. Sign in again.");
  const owner = await supabase(`/rest/v1/platform_admins?select=user_id&user_id=eq.${encodeURIComponent(user.data.id)}`);
  if (!owner.ok || !owner.data.length) throw new ApiError(403, "Only OdyZPickle owners can manage club logins.");
  return user.data;
}

async function findUserByEmail(email) {
  for (let page = 1; page <= 50; page += 1) {
    const result = await supabase(`/auth/v1/admin/users?page=${page}&per_page=1000`);
    if (!result.ok) throw new ApiError(502, "Couldn’t look up existing accounts.");
    const users = result.data.users || [];
    const match = users.find((user) => (user.email || "").toLowerCase() === email);
    if (match) return match;
    if (users.length < 1000) return null;
  }
  return null;
}

// POST /api/club-logins { clubId, email, password }
// Creates (or resets the password of) a club admin's login and links it to the club.
async function setClubLogin(req, payload) {
  await requireOwner(req);
  const clubId = String(payload.clubId || "");
  const email = String(payload.email || "").trim().toLowerCase();
  const password = String(payload.password || "");
  if (!/^[0-9a-f-]{36}$/i.test(clubId)) throw new ApiError(400, "Unknown club.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new ApiError(400, "Enter a valid email address.");
  if (password.length < 6) throw new ApiError(400, "Password must be at least 6 characters.");

  const club = await supabase(`/rest/v1/clubs?select=id,name&id=eq.${clubId}`);
  if (!club.ok || !club.data.length) throw new ApiError(404, "That club no longer exists.");

  let created = false;
  let user = await findUserByEmail(email);
  if (user) {
    const owner = await supabase(`/rest/v1/platform_admins?select=user_id&user_id=eq.${user.id}`);
    if (owner.ok && owner.data.length) throw new ApiError(400, "That email is an owner account. Use a different email for the club.");
    const updated = await supabase(`/auth/v1/admin/users/${user.id}`, {
      method: "PUT",
      body: { password, email_confirm: true }
    });
    if (!updated.ok) throw new ApiError(400, updated.data?.msg || updated.data?.message || "Couldn’t update that password.");
  } else {
    const result = await supabase("/auth/v1/admin/users", {
      method: "POST",
      body: { email, password, email_confirm: true }
    });
    if (!result.ok) throw new ApiError(400, result.data?.msg || result.data?.message || "Couldn’t create that login.");
    user = result.data;
    created = true;
  }

  const member = await supabase("/rest/v1/club_members?on_conflict=club_id,email", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: { club_id: clubId, email, user_id: user.id }
  });
  if (!member.ok) throw new ApiError(500, "Login saved, but it couldn’t be linked to the club.");
  return { created, email, clubName: club.data[0].name };
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10000) {
        reject(new ApiError(413, "Request too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new ApiError(400, "Invalid request."));
      }
    });
  });
}

async function handleApi(req, res, pathname) {
  const send = (status, data) => {
    res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
    res.end(JSON.stringify(data));
  };
  try {
    if (!SUPABASE_URL || !PUBLISHABLE_KEY || !SECRET_KEY) {
      throw new ApiError(500, "Server is missing Supabase settings in .env.");
    }
    if (pathname === "/api/club-logins" && req.method === "POST") {
      return send(200, await setClubLogin(req, await readJson(req)));
    }
    throw new ApiError(404, "Not found.");
  } catch (error) {
    if (!(error instanceof ApiError)) console.error(error);
    send(error.status || 500, { error: error instanceof ApiError ? error.message : "Something went wrong." });
  }
}

// ---------------------------------------------------------------- server

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  if (urlPath.startsWith("/api/")) {
    handleApi(req, res, urlPath);
    return;
  }
  const relative = path.normalize(urlPath === "/" ? "index.html" : urlPath.slice(1)).replace(/\\/g, "/");
  const filePath = path.join(root, relative);
  if (!filePath.startsWith(root) || blocked.test(relative)) {
    res.writeHead(404).end("Not found");
    return;
  }
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404).end("Not found");
      return;
    }
    // no-cache: the browser always checks for the latest version, so a refresh picks up changes.
    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(content);
  });
})
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use — the app may already be running at http://localhost:${port}.`);
      console.error(`Stop the other server, or pick another port: $env:PORT=3001; npm run start`);
      process.exit(1);
    }
    throw error;
  })
  .listen(port, () => console.log(`Rally Club running at http://localhost:${port}`));

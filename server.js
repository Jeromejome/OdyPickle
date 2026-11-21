// LOCAL DEVELOPMENT ONLY: `npm run start`
// On Vercel, static files are served directly and the API runs from api/club-logins.js.
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 3000;

// Load .env into process.env (real environment variables win).
for (const [key, value] of Object.entries(readEnvFile(path.join(root, ".env")))) {
  if (process.env[key] === undefined) process.env[key] = value;
}

const { ApiError, setClubLogin, respond } = require("./api/_lib/club-logins");

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
const blocked = /^(\.env|\.git|node_modules|server\.js|package(-lock)?\.json|supabase|api)(\/|$)/;

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
  const { status, data } = await respond(async () => {
    if (pathname === "/api/club-logins" && req.method === "POST") {
      return setClubLogin(req.headers.authorization, await readJson(req));
    }
    throw new ApiError(404, "Not found.");
  });
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(data));
}

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

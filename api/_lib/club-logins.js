// Owner-only club login management. Shared by the Vercel function (api/club-logins.js)
// and the local dev server (server.js). Files under api/_lib are not deployed as routes.

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function settings() {
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY || !SUPABASE_SECRET_KEY) {
    throw new ApiError(500, "Server is missing Supabase settings (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SECRET_KEY).");
  }
  return { url: SUPABASE_URL, publishableKey: SUPABASE_PUBLISHABLE_KEY, secretKey: SUPABASE_SECRET_KEY };
}

async function supabase(pathname, { method = "GET", body, key, token, headers = {} } = {}) {
  const { url, secretKey } = settings();
  key = key || secretKey;
  token = token || key;
  const response = await fetch(`${url}${pathname}`, {
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
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { message: text };
  }
  return { ok: response.ok, status: response.status, data };
}

// Confirms the caller is signed in and is an OdyZPickle owner.
async function requireOwner(authorization) {
  const token = (authorization || "").replace(/^Bearer\s+/i, "");
  if (!token) throw new ApiError(401, "Sign in first.");
  const user = await supabase("/auth/v1/user", { key: settings().publishableKey, token });
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
async function setClubLogin(authorization, payload) {
  await requireOwner(authorization);
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

// Runs a handler and turns the result or error into { status, data }.
async function respond(fn) {
  try {
    return { status: 200, data: await fn() };
  } catch (error) {
    if (!(error instanceof ApiError)) console.error(error);
    return {
      status: error.status || 500,
      data: { error: error instanceof ApiError ? error.message : "Something went wrong." }
    };
  }
}

module.exports = { ApiError, setClubLogin, respond };

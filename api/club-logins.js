// Vercel serverless function: POST /api/club-logins
const { ApiError, setClubLogin, respond } = require("./_lib/club-logins");

function parseBody(body) {
  if (body && typeof body === "object") return body;
  if (typeof body === "string" && body) {
    try {
      return JSON.parse(body);
    } catch {
      throw new ApiError(400, "Invalid request.");
    }
  }
  return {};
}

module.exports = async (req, res) => {
  const { status, data } = await respond(() => {
    if (req.method !== "POST") throw new ApiError(405, "Method not allowed.");
    return setClubLogin(req.headers.authorization, parseBody(req.body));
  });
  res.setHeader("Cache-Control", "no-store");
  res.status(status).json(data);
};

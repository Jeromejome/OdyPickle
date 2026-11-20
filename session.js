// Shared Supabase client and sign-in helpers for every page.
(function () {
  const config = window.RALLY_CONFIG || {};
  const db = window.supabase && config.supabaseUrl && config.supabaseKey
    ? window.supabase.createClient(config.supabaseUrl, config.supabaseKey)
    : null;

  async function currentUser() {
    if (!db) return null;
    const { data } = await db.auth.getSession();
    return data.session ? data.session.user : null;
  }

  // Redirects to the sign-in page when nobody is signed in.
  async function requireUser() {
    const user = await currentUser();
    if (!user) {
      const back = encodeURIComponent(location.pathname.replace(/^\//, "") + location.search);
      location.replace(`login.html?next=${back}`);
      return null;
    }
    return user;
  }

  async function isPlatformAdmin() {
    const { data, error } = await db.rpc("is_platform_admin");
    if (error) throw error;
    return data === true;
  }

  async function signOut() {
    await db.auth.signOut();
    location.replace("login.html");
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  // True when the club may still record changes (mirrors club_has_access in SQL).
  function clubHasAccess(club) {
    if (!club || club.status === "suspended") return false;
    if (!club.access_until) return true;
    return club.access_until >= todayIso();
  }

  function todayIso() {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  window.Ody = { db, currentUser, requireUser, isPlatformAdmin, signOut, escapeHtml, clubHasAccess, todayIso };
})();

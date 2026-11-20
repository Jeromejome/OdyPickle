const { db } = window.Ody;

const els = {
  form: document.querySelector("#auth-form"),
  email: document.querySelector("#auth-email"),
  password: document.querySelector("#auth-password"),
  passwordField: document.querySelector("#password-field"),
  submit: document.querySelector("#auth-submit"),
  feedback: document.querySelector("#auth-feedback"),
  eyebrow: document.querySelector("#auth-eyebrow"),
  title: document.querySelector("#auth-title"),
  subtitle: document.querySelector("#auth-subtitle"),
  toggle: document.querySelector("#toggle-mode"),
  forgot: document.querySelector("#forgot-password"),
  noClub: document.querySelector("#no-club"),
  noClubEmail: document.querySelector("#no-club-email"),
  noClubSignOut: document.querySelector("#no-club-signout")
};

// "signin" | "signup" | "reset" | "newpassword"
let mode = "signin";

const copy = {
  signin: ["WELCOME BACK", "Sign in to your club", "Use the login OdyZPickle gave your club.", "Sign in", "New here? Create an account"],
  signup: ["GET STARTED", "Create your account", "Use the email your club gave to OdyZPickle.", "Create account", "Have an account? Sign in"],
  reset: ["RESET PASSWORD", "Forgot your password?", "We’ll email you a link to choose a new one.", "Send reset link", "Back to sign in"],
  newpassword: ["RESET PASSWORD", "Choose a new password", "At least 6 characters.", "Save password", "Back to sign in"]
};

function setMode(next) {
  mode = next;
  const [eyebrow, title, subtitle, submit, toggle] = copy[mode];
  els.eyebrow.textContent = eyebrow;
  els.title.innerHTML = `${title}<span class="heading-period">.</span>`;
  els.subtitle.textContent = subtitle;
  els.submit.textContent = submit;
  els.toggle.textContent = toggle;
  els.passwordField.hidden = mode === "reset";
  els.email.closest(".field").hidden = mode === "newpassword";
  els.forgot.hidden = mode !== "signin";
  // Club logins are created by the owner, so there's no public sign-up link.
  els.toggle.hidden = mode === "signin";
  els.password.autocomplete = mode === "signin" ? "current-password" : "new-password";
  showFeedback("");
}

function showFeedback(message, isError = false) {
  els.feedback.textContent = message;
  els.feedback.classList.toggle("error", isError);
}

function safeNext() {
  const next = new URLSearchParams(location.search).get("next") || "";
  return /^[a-z0-9_-]+\.html(\?[^#]*)?$/i.test(next) ? next : "";
}

// Decides where a signed-in user should land.
async function routeSignedIn(user) {
  showFeedback("Signing you in…");
  try {
    await db.rpc("claim_memberships");
    const [{ data: isAdmin, error: adminError }, { data: memberships, error: memberError }] = await Promise.all([
      db.rpc("is_platform_admin"),
      db.from("club_members").select("club_id").eq("user_id", user.id)
    ]);
    if (adminError) throw adminError;
    if (memberError) throw memberError;

    const next = safeNext();
    if (next && (isAdmin || memberships.length)) return location.replace(next);
    if (isAdmin) return location.replace("owner.html");
    if (memberships.length) return location.replace("index.html");

    els.form.hidden = true;
    document.querySelector(".auth-switches").hidden = true;
    els.noClubEmail.textContent = user.email;
    els.noClub.hidden = false;
    showFeedback("");
  } catch (error) {
    console.error(error);
    showFeedback("Couldn’t load your club. Check your connection and try again.", true);
  }
}

els.toggle.addEventListener("click", () => setMode(mode === "signin" ? "signup" : "signin"));
els.forgot.addEventListener("click", () => setMode("reset"));
els.noClubSignOut.addEventListener("click", () => window.Ody.signOut());

els.form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = els.email.value.trim().toLowerCase();
  const password = els.password.value;
  if (mode !== "newpassword" && !/^\S+@\S+\.\S+$/.test(email)) return showFeedback("Enter a valid email address.", true);
  if (mode !== "reset" && password.length < 6) return showFeedback("Password must be at least 6 characters.", true);

  els.submit.disabled = true;
  try {
    const redirectTo = new URL("login.html", location.href).href;
    if (mode === "signin") {
      const { data, error } = await db.auth.signInWithPassword({ email, password });
      if (error) throw error;
      await routeSignedIn(data.user);
    } else if (mode === "signup") {
      const { data, error } = await db.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
      if (error) throw error;
      if (data.session) await routeSignedIn(data.user);
      else showFeedback("Check your inbox to confirm your email, then come back and sign in.");
    } else if (mode === "reset") {
      const { error } = await db.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      showFeedback("If that email has an account, a reset link is on its way.");
    } else {
      const { data, error } = await db.auth.updateUser({ password });
      if (error) throw error;
      showFeedback("Password updated.");
      await routeSignedIn(data.user);
    }
  } catch (error) {
    const message = /invalid login/i.test(error.message)
      ? "Email or password is incorrect."
      : /not confirmed/i.test(error.message)
        ? "Confirm your email first — check your inbox for the link."
        : error.message || "Something went wrong. Try again.";
    showFeedback(message, true);
  } finally {
    els.submit.disabled = false;
  }
});

db.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY") setMode("newpassword");
});

(async () => {
  setMode("signin");
  // Give supabase-js a moment to read a confirmation/recovery link from the URL.
  const { data } = await db.auth.getSession();
  if (data.session && mode !== "newpassword" && !location.hash.includes("type=recovery")) {
    await routeSignedIn(data.session.user);
  }
})();

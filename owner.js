const { db, escapeHtml, todayIso } = window.Ody;

const els = {
  askDialog: document.querySelector("#ask-dialog"),
  askForm: document.querySelector("#ask-form"),
  askEyebrow: document.querySelector("#ask-eyebrow"),
  askTitle: document.querySelector("#ask-title"),
  askMessage: document.querySelector("#ask-message"),
  askField: document.querySelector("#ask-field"),
  askLabel: document.querySelector("#ask-label"),
  askInput: document.querySelector("#ask-input"),
  askToggle: document.querySelector("#ask-toggle"),
  askGenerate: document.querySelector("#ask-generate"),
  askFeedback: document.querySelector("#ask-feedback"),
  askCancel: document.querySelector("#ask-cancel"),
  askClose: document.querySelector("#ask-close"),
  askOk: document.querySelector("#ask-ok"),
  logoPreview: document.querySelector("#logo-preview"),
  logoUpload: document.querySelector("#logo-upload"),
  logoRemove: document.querySelector("#logo-remove"),
  logoFile: document.querySelector("#logo-file"),
  newLogo: document.querySelector("#new-club-logo"),
  newLogoName: document.querySelector("#new-club-logo-name"),
  userEmail: document.querySelector("#user-email"),
  signOut: document.querySelector("#sign-out"),
  notice: document.querySelector("#owner-notice"),
  statClubs: document.querySelector("#stat-clubs"),
  statClubsNote: document.querySelector("#stat-clubs-note"),
  statActive: document.querySelector("#stat-active"),
  statTrial: document.querySelector("#stat-trial"),
  statAttention: document.querySelector("#stat-attention"),
  clubsCount: document.querySelector("#clubs-count"),
  clubsBody: document.querySelector("#clubs-body"),
  clubsEmpty: document.querySelector("#clubs-empty"),
  search: document.querySelector("#club-search"),
  filters: document.querySelectorAll("[data-filter]"),
  refresh: document.querySelector("#refresh"),
  addForm: document.querySelector("#add-club-form"),
  newName: document.querySelector("#new-club-name"),
  newEmail: document.querySelector("#new-club-email"),
  newPassword: document.querySelector("#new-club-password"),
  generatePassword: document.querySelector("#generate-password"),
  newAdminPassword: document.querySelector("#new-admin-password"),
  newStatus: document.querySelector("#new-club-status"),
  newUntil: document.querySelector("#new-club-until"),
  addFeedback: document.querySelector("#add-club-feedback"),
  dialog: document.querySelector("#club-dialog"),
  dialogForm: document.querySelector("#club-form"),
  dialogTitle: document.querySelector("#dialog-title"),
  dialogClose: document.querySelector("#dialog-close"),
  editName: document.querySelector("#edit-name"),
  editStatus: document.querySelector("#edit-status"),
  editUntil: document.querySelector("#edit-until"),
  editNotes: document.querySelector("#edit-notes"),
  clearUntil: document.querySelector("#clear-until"),
  adminList: document.querySelector("#admin-list"),
  newAdminEmail: document.querySelector("#new-admin-email"),
  addAdmin: document.querySelector("#add-admin"),
  dialogFeedback: document.querySelector("#dialog-feedback"),
  deleteClub: document.querySelector("#delete-club"),
  openBoard: document.querySelector("#open-board"),
  saveClub: document.querySelector("#save-club")
};

const TRIAL_DAYS = 14;
const ATTENTION_DAYS = 7;
let clubs = [];
let filter = "all";
let editingId = null;

// ---------------------------------------------------------------- dates

function addDays(iso, days) {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return toIso(date);
}

function addMonths(iso, months) {
  const date = new Date(`${iso}T00:00:00`);
  const day = date.getDate();
  date.setMonth(date.getMonth() + months);
  if (date.getDate() !== day) date.setDate(0); // Jan 31 + 1 month → Feb 28/29
  return toIso(date);
}

function toIso(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function daysUntil(iso) {
  return Math.round((new Date(`${iso}T00:00:00`) - new Date(`${todayIso()}T00:00:00`)) / 86400000);
}

function formatDate(iso) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${iso}T00:00:00`));
}

function timeAgo(timestamp) {
  if (!timestamp) return "Never";
  const minutes = Math.round((Date.now() - new Date(timestamp)) / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(timestamp));
}

// ---------------------------------------------------------------- club helpers

function stateOf(club) {
  const state = Array.isArray(club.club_state) ? club.club_state[0] : club.club_state;
  return state || {};
}

function playerCount(club) {
  const players = stateOf(club).players;
  return Array.isArray(players) ? players.length : 0;
}

// What the club's subscription looks like right now.
function standing(club) {
  if (club.status === "suspended") return { key: "suspended", label: "Suspended", attention: true };
  const left = club.access_until ? daysUntil(club.access_until) : null;
  if (left !== null && left < 0) return { key: "expired", label: "Expired", attention: true };
  const ending = left !== null && left <= ATTENTION_DAYS;
  return club.status === "active"
    ? { key: "active", label: "Active", attention: ending }
    : { key: "trial", label: "Trial", attention: ending };
}

function untilLabel(club) {
  if (!club.access_until) return '<span class="muted">No end date</span>';
  const left = daysUntil(club.access_until);
  const hint = left < 0
    ? `<small class="warn">${-left}d overdue</small>`
    : left <= ATTENTION_DAYS
      ? `<small class="warn">${left === 0 ? "ends today" : `${left}d left`}</small>`
      : "";
  return `${formatDate(club.access_until)}${hint}`;
}

function normalizeEmail(value) {
  const email = value.trim().toLowerCase();
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? email : null;
}

// Readable random password (no 0/O, 1/l/I look-alikes).
function makePassword(length = 10) {
  const alphabet = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint32Array(length));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

// Creates a club login, or resets its password if the email already has one.
// Runs on our server, which holds the secret key and checks you are an owner.
async function saveClubLogin(clubId, email, password) {
  const { data } = await db.auth.getSession();
  const response = await fetch("api/club-logins", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.session ? data.session.access_token : ""}`
    },
    body: JSON.stringify({ clubId, email, password })
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Couldn’t save that login. Is the server running (npm run start)?");
  return body;
}

function credentialsHtml(intro, email, password) {
  return `${escapeHtml(intro)}<span class="credentials"><span>Email: <b>${escapeHtml(email)}</b></span><span>Password: <b>${escapeHtml(password)}</b></span></span>`;
}

// ---------------------------------------------------------------- styled pop-up (ask)

// Opens the styled pop-up. Resolves with the typed value (input mode), true (confirm mode),
// or null if cancelled. `input.validate(value)` returns an error message, or "" when OK.
// `input.match` keeps the OK button disabled until the typed value equals it.
function askDialog({ eyebrow = "", title, message = "", confirmLabel = "OK", danger = false, input = null }) {
  els.askEyebrow.textContent = eyebrow;
  els.askTitle.textContent = title;
  els.askMessage.textContent = message;
  els.askMessage.hidden = !message;
  els.askOk.textContent = confirmLabel;
  els.askOk.classList.toggle("button-warn", danger);
  els.askFeedback.textContent = "";
  els.askField.hidden = !input;
  els.askToggle.hidden = !(input && input.secret);
  els.askGenerate.hidden = !(input && input.generate);
  if (input) {
    els.askLabel.textContent = input.label || "";
    els.askInput.value = input.value || "";
    els.askInput.placeholder = input.placeholder || "";
    els.askInput.type = "text";
    els.askToggle.textContent = "Hide";
  }
  const syncOk = () => {
    els.askOk.disabled = Boolean(input && input.match) && els.askInput.value.trim() !== input.match;
  };
  syncOk();
  els.askDialog.showModal();
  (input ? els.askInput : els.askCancel).focus();
  if (input && input.value) els.askInput.select();

  return new Promise((resolve) => {
    const cleanup = (result) => {
      els.askForm.removeEventListener("submit", onSubmit);
      els.askInput.removeEventListener("input", onInput);
      els.askGenerate.removeEventListener("click", onGenerate);
      els.askToggle.removeEventListener("click", onToggle);
      els.askCancel.removeEventListener("click", onCancel);
      els.askClose.removeEventListener("click", onCancel);
      els.askDialog.removeEventListener("cancel", onEscape);
      els.askDialog.close();
      resolve(result);
    };
    const onSubmit = (event) => {
      event.preventDefault();
      if (!input) return cleanup(true);
      const value = els.askInput.value.trim();
      const problem = input.validate ? input.validate(value) : "";
      if (problem) {
        els.askFeedback.textContent = problem;
        els.askInput.focus();
        return;
      }
      cleanup(value);
    };
    const onInput = () => {
      els.askFeedback.textContent = "";
      syncOk();
    };
    const onGenerate = () => {
      els.askInput.value = input.generate();
      els.askInput.type = "text";
      els.askToggle.textContent = "Hide";
      onInput();
      els.askInput.focus();
      els.askInput.select();
    };
    const onToggle = () => {
      const hidden = els.askInput.type === "password";
      els.askInput.type = hidden ? "text" : "password";
      els.askToggle.textContent = hidden ? "Hide" : "Show";
    };
    const onCancel = () => cleanup(null);
    const onEscape = (event) => {
      event.preventDefault();
      cleanup(null);
    };
    els.askForm.addEventListener("submit", onSubmit);
    els.askInput.addEventListener("input", onInput);
    els.askGenerate.addEventListener("click", onGenerate);
    els.askToggle.addEventListener("click", onToggle);
    els.askCancel.addEventListener("click", onCancel);
    els.askClose.addEventListener("click", onCancel);
    els.askDialog.addEventListener("cancel", onEscape);
  });
}

// ---------------------------------------------------------------- club logos

const LOGO_BUCKET = "club-logos";
const LOGO_MAX_BYTES = 5 * 1024 * 1024;
const LOGO_MAX_SIZE = 512;

// The club's logo, or its initials when it has none.
function clubLogoHtml(club, extraClass = "") {
  return club.logo_url
    ? `<img class="club-logo-img ${extraClass}" src="${escapeHtml(club.logo_url)}" alt="" loading="lazy">`
    : `<span class="player-avatar club-avatar ${extraClass}">${escapeHtml(club.name.trim().slice(0, 2))}</span>`;
}

// Checks the file, then resizes it (max 512 px, keeping transparency) to a PNG.
async function prepareLogo(file) {
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    throw new Error("Use a PNG, JPG or WebP image.");
  }
  if (file.size > LOGO_MAX_BYTES) throw new Error("That image is over 5 MB. Pick a smaller one.");
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, LOGO_MAX_SIZE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Couldn’t read that image."))), "image/png"));
}

function logoErrorMessage(error) {
  const text = String((error && error.message) || error);
  if (/bucket not found|logo_url/i.test(text)) return "Logos aren’t set up yet — run supabase/11_club_logos.sql in Supabase first.";
  return text || "Couldn’t upload the logo.";
}

// Uploads (or replaces) a club's logo and saves its link on the club.
async function uploadClubLogo(clubId, file) {
  const blob = await prepareLogo(file);
  const path = `${clubId}/logo.png`;
  const { error } = await db.storage.from(LOGO_BUCKET).upload(path, blob, { upsert: true, contentType: "image/png", cacheControl: "3600" });
  if (error) throw error;
  const { data } = db.storage.from(LOGO_BUCKET).getPublicUrl(path);
  // ?v= makes browsers show the new logo straight away instead of a cached old one.
  const url = `${data.publicUrl}?v=${Date.now()}`;
  const { error: saveError } = await db.from("clubs").update({ logo_url: url }).eq("id", clubId);
  if (saveError) throw saveError;
  return url;
}

async function removeClubLogo(clubId) {
  const { error } = await db.storage.from(LOGO_BUCKET).remove([`${clubId}/logo.png`]);
  if (error) throw error;
  const { error: saveError } = await db.from("clubs").update({ logo_url: null }).eq("id", clubId);
  if (saveError) throw saveError;
}

// ---------------------------------------------------------------- data

async function loadClubs() {
  const { data, error } = await db
    .from("clubs")
    // "*" so newer columns (like logo_url) come through, and older databases still work.
    .select("*, club_members(id, email, user_id), club_state(updated_at, players:data->players)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  clubs = data;
}

async function reload() {
  try {
    await loadClubs();
    showNotice("");
  } catch (error) {
    console.error(error);
    showNotice("Couldn’t load clubs. Check your connection and refresh.");
  }
  render();
}

function showNotice(message) {
  els.notice.textContent = message;
  els.notice.hidden = !message;
}

// ---------------------------------------------------------------- render

function render() {
  const standings = clubs.map(standing);
  els.statClubs.textContent = clubs.length;
  const players = clubs.reduce((total, club) => total + playerCount(club), 0);
  els.statClubsNote.textContent = `${players} ${players === 1 ? "player" : "players"} across all clubs`;
  els.statActive.textContent = standings.filter((item) => item.key === "active").length;
  els.statTrial.textContent = standings.filter((item) => item.key === "trial").length;
  els.statAttention.textContent = standings.filter((item) => item.attention).length;
  els.clubsCount.textContent = clubs.length;

  const query = els.search.value.trim().toLowerCase();
  const visible = clubs.filter((club) => {
    const status = standing(club);
    if (filter === "attention" && !status.attention) return false;
    if ((filter === "active" || filter === "trial") && status.key !== filter) return false;
    if (!query) return true;
    return club.name.toLowerCase().includes(query)
      || club.club_members.some((member) => member.email.includes(query));
  });

  els.clubsBody.innerHTML = visible.map(renderClubRow).join("");
  els.clubsEmpty.hidden = visible.length > 0;
  els.clubsEmpty.textContent = clubs.length
    ? "No clubs match this filter."
    : "No clubs yet. Add your first customer on the right.";
}

function renderClubRow(club) {
  const status = standing(club);
  const admins = club.club_members.length
    ? club.club_members.map((member) => escapeHtml(member.email)).join(", ")
    : '<span class="warn">No admin yet</span>';
  const count = playerCount(club);
  return `<div class="clubs-row" role="row">
    <span class="club-cell" role="cell">
      ${clubLogoHtml(club)}
      <span class="club-text">
        <strong>${escapeHtml(club.name)}</strong>
        <small>${admins}</small>
      </span>
    </span>
    <span role="cell"><span class="status-pill status-${status.key}">${status.label}</span></span>
    <span role="cell" class="until-cell"><span class="cell-label">Access until</span>${untilLabel(club)}</span>
    <span role="cell"><span class="cell-label">Players</span>${count}</span>
    <span role="cell"><span class="cell-label">Last active</span>${timeAgo(stateOf(club).updated_at)}</span>
    <span role="cell" class="row-actions">
      <a class="link-button" href="index.html?club=${encodeURIComponent(club.id)}">Open</a>
      <button class="button button-dark" type="button" data-manage="${escapeHtml(club.id)}">Manage</button>
    </span>
  </div>`;
}

// ---------------------------------------------------------------- add club

function setAddFeedback(message, isError = false, html = false) {
  if (html) els.addFeedback.innerHTML = message;
  else els.addFeedback.textContent = message;
  els.addFeedback.classList.toggle("error", isError);
}

els.generatePassword.addEventListener("click", () => {
  els.newPassword.value = makePassword();
});

els.newStatus.addEventListener("change", () => {
  els.newUntil.value = els.newStatus.value === "trial"
    ? addDays(todayIso(), TRIAL_DAYS)
    : addMonths(todayIso(), 1);
});

els.addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = els.newName.value.trim();
  const email = normalizeEmail(els.newEmail.value);
  const password = els.newPassword.value;
  if (!name) return setAddFeedback("Give the club a name.", true);
  if (!email) return setAddFeedback("Enter the club’s login email.", true);
  if (password.length < 6) return setAddFeedback("Login password must be at least 6 characters.", true);
  if (clubs.some((club) => club.name.toLowerCase() === name.toLowerCase())) {
    return setAddFeedback("A club with that name already exists.", true);
  }

  const submit = els.addForm.querySelector("button[type=submit]");
  submit.disabled = true;
  try {
    const { data: club, error } = await db
      .from("clubs")
      .insert({ name, status: els.newStatus.value, access_until: els.newUntil.value || null })
      .select("id")
      .single();
    if (error) throw error;
    try {
      await saveClubLogin(club.id, email, password);
    } catch (loginError) {
      await reload();
      return setAddFeedback(`${name} was added, but its login wasn’t created: ${loginError.message} Add it under Manage.`, true);
    }
    // Optional logo picked on the form.
    const logoFile = els.newLogo.files && els.newLogo.files[0];
    let logoNote = "";
    if (logoFile) {
      try {
        await uploadClubLogo(club.id, logoFile);
      } catch (logoError) {
        console.error(logoError);
        logoNote = ` (Logo not uploaded: ${logoErrorMessage(logoError)} You can add it under Manage.)`;
      }
    }
    els.addForm.reset();
    els.newLogoName.textContent = "No file chosen";
    els.newUntil.value = addDays(todayIso(), TRIAL_DAYS);
    els.newPassword.value = makePassword();
    setAddFeedback(credentialsHtml(`${name} is ready.${logoNote} Share this login with the club:`, email, password), false, true);
    await reload();
  } catch (error) {
    console.error(error);
    setAddFeedback(error.message || "Couldn’t add the club.", true);
  } finally {
    submit.disabled = false;
  }
});

// ---------------------------------------------------------------- manage dialog

function editingClub() {
  return clubs.find((club) => club.id === editingId);
}

function setDialogFeedback(message, isError = false, html = false) {
  if (html) els.dialogFeedback.innerHTML = message;
  else els.dialogFeedback.textContent = message;
  els.dialogFeedback.classList.toggle("error", isError);
}

function openDialog(clubId) {
  editingId = clubId;
  const club = editingClub();
  if (!club) return;
  els.dialogTitle.textContent = club.name;
  els.editName.value = club.name;
  els.editStatus.value = club.status;
  els.editUntil.value = club.access_until || "";
  els.editNotes.value = club.notes || "";
  els.openBoard.href = `index.html?club=${encodeURIComponent(club.id)}`;
  els.newAdminEmail.value = "";
  setDialogFeedback("");
  renderAdmins();
  renderLogoSection();
  els.dialog.showModal();
}

function renderLogoSection() {
  const club = editingClub();
  if (!club) return;
  els.logoPreview.innerHTML = clubLogoHtml(club, "logo-preview-img");
  els.logoUpload.textContent = club.logo_url ? "Replace logo" : "Upload logo";
  els.logoRemove.hidden = !club.logo_url;
}

els.logoUpload.addEventListener("click", () => els.logoFile.click());
els.logoFile.addEventListener("change", async () => {
  const file = els.logoFile.files && els.logoFile.files[0];
  els.logoFile.value = "";
  if (!file || !editingId) return;
  els.logoUpload.disabled = true;
  setDialogFeedback("Uploading logo…", false);
  try {
    await uploadClubLogo(editingId, file);
    await reload();
    renderLogoSection();
    setDialogFeedback("Logo saved. It shows on the club’s pages now.", false);
  } catch (error) {
    console.error(error);
    setDialogFeedback(logoErrorMessage(error), true);
  } finally {
    els.logoUpload.disabled = false;
  }
});
els.logoRemove.addEventListener("click", async () => {
  const club = editingClub();
  if (!club) return;
  const ok = await askDialog({
    eyebrow: "CLUB LOGO",
    title: `Remove ${club.name}’s logo?`,
    message: "The club’s pages will show its initials instead. You can upload a new logo any time.",
    confirmLabel: "Remove logo",
    danger: true
  });
  if (!ok) return;
  els.logoRemove.disabled = true;
  try {
    await removeClubLogo(club.id);
    await reload();
    renderLogoSection();
    setDialogFeedback("Logo removed.", false);
  } catch (error) {
    console.error(error);
    setDialogFeedback(logoErrorMessage(error), true);
  } finally {
    els.logoRemove.disabled = false;
  }
});
els.newLogo.addEventListener("change", () => {
  const file = els.newLogo.files && els.newLogo.files[0];
  els.newLogoName.textContent = file ? file.name : "No file chosen";
});

function renderAdmins() {
  const club = editingClub();
  if (!club) return;
  els.adminList.innerHTML = club.club_members.length
    ? club.club_members.map((member) => `
      <li class="player-row">
        <div class="player-main">
          <span class="player-avatar">${escapeHtml(member.email.slice(0, 2))}</span>
          <span class="player-name">${escapeHtml(member.email)}</span>
        </div>
        <span class="row-tools">
          <button class="link-button" type="button" data-set-password="${escapeHtml(member.email)}">${member.user_id ? "Reset password" : "Set password"}</button>
          <button class="remove-player" type="button" data-remove-member="${escapeHtml(member.id)}" aria-label="Remove ${escapeHtml(member.email)}">×</button>
        </span>
      </li>`).join("")
    : '<li class="roster-empty">No login yet. Add one below so the club can sign in.</li>';
}

els.clubsBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-manage]");
  if (button) openDialog(button.dataset.manage);
});

els.dialogClose.addEventListener("click", () => els.dialog.close());

document.querySelectorAll("[data-extend]").forEach((button) => {
  button.addEventListener("click", () => {
    const today = todayIso();
    const base = els.editUntil.value && els.editUntil.value > today ? els.editUntil.value : today;
    els.editUntil.value = addMonths(base, Number(button.dataset.extend));
    els.editStatus.value = "active";
    setDialogFeedback("Dates updated — save to apply.");
  });
});

els.clearUntil.addEventListener("click", () => {
  els.editUntil.value = "";
  setDialogFeedback("Dates updated — save to apply.");
});

els.dialogForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = els.editName.value.trim();
  if (!name) return setDialogFeedback("Club name can’t be empty.", true);
  els.saveClub.disabled = true;
  try {
    const { error } = await db
      .from("clubs")
      .update({
        name,
        status: els.editStatus.value,
        access_until: els.editUntil.value || null,
        notes: els.editNotes.value.trim()
      })
      .eq("id", editingId);
    if (error) throw error;
    await reload();
    els.dialog.close();
  } catch (error) {
    console.error(error);
    setDialogFeedback(error.message || "Couldn’t save changes.", true);
  } finally {
    els.saveClub.disabled = false;
  }
});

els.addAdmin.addEventListener("click", async () => {
  const email = normalizeEmail(els.newAdminEmail.value);
  const password = els.newAdminPassword.value || makePassword();
  if (!email) return setDialogFeedback("Enter a valid login email.", true);
  if (password.length < 6) return setDialogFeedback("Password must be at least 6 characters.", true);
  if (editingClub().club_members.some((member) => member.email === email)) {
    return setDialogFeedback("That login is already on this club. Use Reset password instead.", true);
  }
  els.addAdmin.disabled = true;
  try {
    await saveClubLogin(editingId, email, password);
    await reload();
    renderAdmins();
    els.newAdminEmail.value = "";
    els.newAdminPassword.value = "";
    setDialogFeedback(credentialsHtml("Login created. Share it with the club:", email, password), false, true);
  } catch (error) {
    console.error(error);
    setDialogFeedback(error.message || "Couldn’t create that login.", true);
  } finally {
    els.addAdmin.disabled = false;
  }
});

els.adminList.addEventListener("click", async (event) => {
  const passwordButton = event.target.closest("[data-set-password]");
  if (passwordButton) {
    const email = passwordButton.dataset.setPassword;
    const hasLogin = passwordButton.textContent.trim().startsWith("Reset");
    const password = await askDialog({
      eyebrow: "CLUB LOGIN",
      title: hasLogin ? "Reset password" : "Set password",
      message: `For ${email}. Share the new password with the club — their old one stops working.`,
      confirmLabel: "Save password",
      input: {
        label: "New password",
        value: makePassword(),
        secret: true,
        generate: makePassword,
        validate: (value) => (value.length < 6 ? "Password must be at least 6 characters." : "")
      }
    });
    if (password === null) return;
    passwordButton.disabled = true;
    try {
      await saveClubLogin(editingId, email, password);
      await reload();
      renderAdmins();
      setDialogFeedback(credentialsHtml("Password saved. Share the new login with the club:", email, password), false, true);
    } catch (error) {
      setDialogFeedback(error.message, true);
      passwordButton.disabled = false;
    }
    return;
  }

  const button = event.target.closest("[data-remove-member]");
  if (!button) return;
  const member = editingClub().club_members.find((item) => item.id === button.dataset.removeMember);
  if (!member) return;
  const ok = await askDialog({
    eyebrow: "CLUB LOGIN",
    title: `Remove ${member.email}?`,
    message: "They’ll lose access to this club straight away. You can add them back later.",
    confirmLabel: "Remove login",
    danger: true
  });
  if (!ok) return;
  const { error } = await db.from("club_members").delete().eq("id", member.id);
  if (error) return setDialogFeedback(error.message, true);
  await reload();
  renderAdmins();
  setDialogFeedback(`${member.email} removed.`);
});

els.deleteClub.addEventListener("click", async () => {
  const club = editingClub();
  if (!club) return;
  const typed = await askDialog({
    eyebrow: "DELETE CLUB",
    title: `Delete ${club.name}?`,
    message: "This permanently deletes the club and all its players, games, payments and history. It can’t be undone.",
    confirmLabel: "Delete club",
    danger: true,
    input: { label: `Type “${club.name}” to confirm`, placeholder: club.name, match: club.name }
  });
  if (typed === null) return;
  const { error } = await db.from("clubs").delete().eq("id", club.id);
  if (error) return setDialogFeedback(error.message, true);
  els.dialog.close();
  await reload();
});

// ---------------------------------------------------------------- filters & boot

els.search.addEventListener("input", render);
els.filters.forEach((chip) => {
  chip.addEventListener("click", () => {
    filter = chip.dataset.filter;
    els.filters.forEach((item) => {
      item.classList.toggle("selected", item === chip);
      item.setAttribute("aria-pressed", String(item === chip));
    });
    render();
  });
});
els.refresh.addEventListener("click", reload);
els.signOut.addEventListener("click", () => window.Ody.signOut());

(async () => {
  const user = await window.Ody.requireUser();
  if (!user) return;
  try {
    if (!(await window.Ody.isPlatformAdmin())) {
      location.replace("index.html");
      return;
    }
  } catch (error) {
    console.error(error);
    showNotice("Couldn’t verify your owner access. Check your connection and refresh.");
  }
  els.userEmail.textContent = user.email;
  els.newUntil.value = addDays(todayIso(), TRIAL_DAYS);
  els.newPassword.value = makePassword();
  document.body.classList.remove("is-booting");
  await reload();
})();

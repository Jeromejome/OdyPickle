const { db } = window.Ody;

const elements = {
  clubName: document.querySelector("#club-name"),
  ownerLink: document.querySelector("#owner-link"),
  ownerDivider: document.querySelector("#owner-divider"),
  signOut: document.querySelector("#sign-out"),
  today: document.querySelector("#today-label"),
  saveIndicator: document.querySelector("#save-indicator"),
  storageNotice: document.querySelector("#storage-notice"),
  navLinks: document.querySelectorAll("[data-view]"),
  pageTitle: document.querySelector("#page-title"),
  pageSubtitle: document.querySelector("#page-subtitle"),
  boardView: document.querySelector("#board-view"),
  historyView: document.querySelector("#history-view"),
  historySummary: document.querySelector("#history-summary"),
  historyDays: document.querySelector("#history-days"),
  historyDaysEmpty: document.querySelector("#history-days-empty"),
  historyFrom: document.querySelector("#history-from"),
  historyTo: document.querySelector("#history-to"),
  datePresets: document.querySelectorAll("[data-date-preset]"),
  membersView: document.querySelector("#members-view"),
  paymentsView: document.querySelector("#payments-view"),
  payFrom: document.querySelector("#pay-from"),
  payTo: document.querySelector("#pay-to"),
  payPresets: document.querySelectorAll("[data-pay-preset]"),
  payMethodChips: document.querySelectorAll("[data-pay-filter]"),
  paySearch: document.querySelector("#pay-search"),
  payCollected: document.querySelector("#pay-collected"),
  payCollectedNote: document.querySelector("#pay-collected-note"),
  payCount: document.querySelector("#pay-count"),
  payCountNote: document.querySelector("#pay-count-note"),
  payUnpaid: document.querySelector("#pay-unpaid"),
  payUnpaidNote: document.querySelector("#pay-unpaid-note"),
  payMethods: document.querySelector("#pay-methods"),
  unpaidCount: document.querySelector("#unpaid-count"),
  unpaidList: document.querySelector("#unpaid-list"),
  unpaidEmpty: document.querySelector("#unpaid-empty"),
  paymentsCount: document.querySelector("#payments-count"),
  paymentsList: document.querySelector("#payments-list"),
  paymentsEmpty: document.querySelector("#payments-empty"),
  memberSearch: document.querySelector("#member-search"),
  memberFilters: document.querySelectorAll("[data-member-filter]"),
  memberSortHeads: document.querySelectorAll("[data-member-sort]"),
  membersBody: document.querySelector("#members-body"),
  membersEmpty: document.querySelector("#members-empty"),
  membersPager: document.querySelector("#members-pager"),
  membersTabCount: document.querySelector("#members-tab-count"),
  guestsTabCount: document.querySelector("#guests-tab-count"),
  membersSecondHead: document.querySelector("#members-second-head"),
  addMemberForm: document.querySelector("#add-member-form"),
  memberInput: document.querySelector("#member-input"),
  memberAddress: document.querySelector("#member-address"),
  memberContact: document.querySelector("#member-contact"),
  memberSubmit: document.querySelector("#member-submit"),
  memberCancelEdit: document.querySelector("#member-cancel-edit"),
  memberFormTitle: document.querySelector("#member-form-title"),
  memberFeedback: document.querySelector("#member-feedback"),
  modePicker: document.querySelector("#mode-picker"),
  modeClub: document.querySelector("#mode-club"),
  modeClubLogo: document.querySelector("#mode-club-logo"),
  clubLogo: document.querySelector("#club-logo"),
  chooseOpenPlay: document.querySelector("#choose-open-play"),
  openPlayHint: document.querySelector("#open-play-hint"),
  runningSession: document.querySelector("#running-session"),
  runningTitle: document.querySelector("#running-title"),
  runningDetail: document.querySelector("#running-detail"),
  runningContinue: document.querySelector("#running-continue"),
  runningFinish: document.querySelector("#running-finish"),
  modeHistoryHint: document.querySelector("#mode-history-hint"),
  modeMembersHint: document.querySelector("#mode-members-hint"),
  sessionDialog: document.querySelector("#session-dialog"),
  sessionForm: document.querySelector("#session-form"),
  sessionFormatButtons: document.querySelectorAll("[data-session-format]"),
  sessionStepButtons: document.querySelectorAll("[data-step]"),
  sessionCourts: document.querySelector("#session-courts"),
  sessionDate: document.querySelector("#session-date"),
  sessionNote: document.querySelector("#session-note"),
  confirmDialog: document.querySelector("#confirm-dialog"),
  confirmEyebrow: document.querySelector("#confirm-eyebrow"),
  confirmTitle: document.querySelector("#confirm-title"),
  confirmBody: document.querySelector("#confirm-body"),
  confirmOk: document.querySelector("#confirm-ok"),
  confirmCancel: document.querySelector("#confirm-cancel"),
  sessionTitle: document.querySelector("#session-title"),
  sessionSubmit: document.querySelector("#session-submit"),
  sessionVenue: document.querySelector("#session-venue"),
  sessionFeeMember: document.querySelector("#session-fee-member"),
  sessionFeeGuest: document.querySelector("#session-fee-guest"),
  sessionFeeDefault: document.querySelector("#session-fee-default"),
  sessionFeeHint: document.querySelector("#session-fee-hint"),
  sessionStart: document.querySelector("#session-start"),
  sessionEnd: document.querySelector("#session-end"),
  sessionFeedback: document.querySelector("#session-feedback"),
  sessionClose: document.querySelector("#session-close"),
  sessionBack: document.querySelector("#session-back"),
  sessionBanner: document.querySelector("#session-banner"),
  sessionSummary: document.querySelector("#session-summary"),
  sessionChange: document.querySelector("#session-change"),
  sessionFinish: document.querySelector("#session-finish"),
  statPlayers: document.querySelector("#stat-players"),
  statPlayersNote: document.querySelector("#stat-players-note"),
  presenceAll: document.querySelectorAll("[data-presence-all]"),
  presenceCount: document.querySelector("#presence-count"),
  statRounds: document.querySelector("#stat-rounds"),
  statMatches: document.querySelector("#stat-matches"),
  roundChip: document.querySelector("#round-chip"),
  roundSummary: document.querySelector("#round-summary"),
  roundProgress: document.querySelector("#round-progress"),
  matchesList: document.querySelector("#matches-list"),
  roundEmpty: document.querySelector("#round-empty"),
  rosterCount: document.querySelector("#roster-count"),
  addPlayerForm: document.querySelector("#add-player-form"),
  playerInput: document.querySelector("#player-input"),
  playerSuggest: document.querySelector("#player-suggest"),
  playerTypeButtons: document.querySelectorAll("[data-player-type]"),
  rosterFeedback: document.querySelector("#roster-feedback"),
  playerList: document.querySelector("#player-list"),
  rosterEmpty: document.querySelector("#roster-empty"),
  courtCount: document.querySelector("#court-count"),
  addCourtForm: document.querySelector("#add-court-form"),
  courtInput: document.querySelector("#court-input"),
  courtFeedback: document.querySelector("#court-feedback"),
  courtList: document.querySelector("#court-list"),
  courtsEmpty: document.querySelector("#courts-empty"),
  matchDialog: document.querySelector("#match-dialog"),
  matchDialogForm: document.querySelector("#match-dialog-form"),
  matchDialogTitle: document.querySelector("#match-dialog-title"),
  matchDialogFormat: document.querySelector("#match-dialog-format"),
  matchDialogNote: document.querySelector("#match-dialog-note"),
  matchDialogFeedback: document.querySelector("#match-dialog-feedback"),
  matchDialogClose: document.querySelector("#match-dialog-close"),
  matchDialogCancel: document.querySelector("#match-dialog-cancel"),
  matchCourt: document.querySelector("#match-court"),
  courtOptions: document.querySelector("#court-options"),
  teamAInputs: document.querySelector("#team-a-inputs"),
  teamBInputs: document.querySelector("#team-b-inputs"),
  sortHeads: document.querySelectorAll("[data-sort]"),
  formatButtons: document.querySelectorAll("[data-format]"),
  formatBar: document.querySelector("#format-bar"),
  formatFeedback: document.querySelector("#format-feedback"),
  rosterTip: document.querySelector("#roster-tip-text"),
  logList: document.querySelector("#log-list"),
  logEmpty: document.querySelector("#log-empty"),
  logMore: document.querySelector("#log-more"),
  historyList: document.querySelector("#history-list"),
  historyEmpty: document.querySelector("#history-empty")
};

const freshState = () => ({ players: [], rounds: [] });
let storageNotice = "";
let accessNotice = "";
let storageReadFailed = false;
// Set once we know which club is open. Each club caches under its own key.
let storageKey = null;
let club = null;
let readOnly = true;
let state = freshState();

function loadState() {
  if (!storageKey) return freshState();
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return freshState();
    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.players) || !Array.isArray(parsed.rounds)) {
      storageReadFailed = true;
      storageNotice = "Saved club data is invalid. This session will not overwrite it; refresh after checking your browser storage.";
      return freshState();
    }
    return parsed;
  } catch {
    storageReadFailed = true;
    storageNotice = "Saved club data could not be read. This session is temporary; the existing saved data has not been changed.";
    return freshState();
  }
}

// "local" = no cloud configured, "syncing", "synced", "error"
let syncStatus = db ? "syncing" : "local";
// Never push to the cloud until the first pull finishes, so stale local data can't overwrite it.
let remoteReady = false;
let pushing = false;
let pushQueued = false;

function isValidState(value) {
  return Boolean(value) && Array.isArray(value.players) && Array.isArray(value.rounds);
}

function saveLocal() {
  if (storageReadFailed || !storageKey) return;
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageNotice = "";
  } catch {
    storageNotice = "Could not save changes in this browser. Check storage availability and try again.";
  }
}

// Log entries waiting to reach Supabase. Each carries a snapshot of the board right after it happened.
let pendingEvents = [];
let logMissing = false;

// Saves the board. Pass an event ({ kind, summary, details }) to record it in the game log.
function saveState(event) {
  saveLocal();
  if (event) pendingEvents.push({ ...event, snapshot: JSON.parse(JSON.stringify(state)) });
  pushRemote();
}

function setSyncStatus(status) {
  syncStatus = status;
  renderSaveIndicator();
}

async function pushRemote() {
  if (!db || !remoteReady || !club) return;
  if (pushing) {
    pushQueued = true;
    return;
  }
  pushing = true;
  setSyncStatus("syncing");
  const batch = pendingEvents.slice();
  try {
    const { error } = await db.rpc("save_club_state", { target: club.id, new_data: state, events: batch });
    if (error && error.code === "PGRST202") {
      // 05_game_log.sql hasn't been run yet: keep saving the board without a log.
      logMissing = true;
      const fallback = await db.from("club_state").upsert({ club_id: club.id, data: state });
      if (fallback.error) throw fallback.error;
    } else if (error) {
      throw error;
    }
    pendingEvents.splice(0, batch.length);
    setSyncStatus("synced");
    if (batch.length) loadLog();
  } catch (error) {
    console.error("Supabase save failed:", error);
    setSyncStatus("error");
  } finally {
    pushing = false;
    if (pushQueued) {
      pushQueued = false;
      pushRemote();
    }
  }
}

async function pullRemote() {
  if (!db || !club) return;
  try {
    const { data, error } = await db.from("club_state").select("data").eq("club_id", club.id).maybeSingle();
    if (error) throw error;
    remoteReady = true;
    if (data && isValidState(data.data)) {
      state = data.data;
      saveLocal();
      setSyncStatus("synced");
      if (!readOnly) {
        const recovered = recoverPlayersFromHistory();
        if (recovered.length) {
          saveState({
            kind: "players_recovered",
            summary: `Brought back from match history (marked Out): ${recovered.map((player) => player.name).join(", ")}`,
            details: { players: recovered.map((player) => player.name) }
          });
        }
      }
      render();
      await loadLog();
    } else if (!readOnly) {
      // No cloud copy yet: start one from what this device has.
      await pushRemote();
    } else {
      setSyncStatus("synced");
    }
  } catch (error) {
    console.error("Supabase load failed:", error);
    storageNotice = "Couldn’t reach the cloud, so this is the copy saved on this device. Changes you make now may be replaced when you refresh.";
    setSyncStatus("error");
    render();
  }
}

// Blocks edits for clubs whose subscription has lapsed.
function canEdit() {
  if (!readOnly) return true;
  render();
  return false;
}

// Works out which club to open, then loads it.
async function boot() {
  const user = await window.Ody.requireUser();
  if (!user) return;
  elements.signOut.addEventListener("click", () => window.Ody.signOut());

  try {
    await db.rpc("claim_memberships");
    const isAdmin = await window.Ody.isPlatformAdmin();
    const requested = new URLSearchParams(location.search).get("club");
    let clubId = requested;
    if (!clubId) {
      const { data: memberships, error } = await db
        .from("club_members").select("club_id").eq("user_id", user.id).order("created_at").limit(1);
      if (error) throw error;
      if (!memberships.length) {
        location.replace(isAdmin ? "owner.html" : "login.html");
        return;
      }
      clubId = memberships[0].club_id;
    }

    const { data, error } = await db
      // "*" so newer columns (like logo_url) come through, and older databases still work.
      .from("clubs").select("*").eq("id", clubId).maybeSingle();
    if (error) throw error;
    if (!data) {
      accessNotice = "That club doesn’t exist, or your account doesn’t have access to it.";
      syncStatus = "error";
      hideModePicker();
      render();
      return;
    }

    club = data;
    const hasAccess = window.Ody.clubHasAccess(club);
    readOnly = !hasAccess && !isAdmin;
    if (!hasAccess) {
      accessNotice = isAdmin
        ? "This club’s access has ended or is suspended. You can still edit it as the owner."
        : "Your club’s OdyZPickle access has ended, so the board is read-only. Contact OdyZPickle to renew.";
    }
    elements.clubName.textContent = club.name.toUpperCase();
    // Club logo (uploaded by the owner) next to the club's name on its pages and the format choice.
    [elements.clubLogo, elements.modeClubLogo].forEach((img) => {
      img.hidden = !club.logo_url;
      img.parentElement.classList.toggle("has-logo", Boolean(club.logo_url));
      if (club.logo_url) {
        img.src = club.logo_url;
        img.alt = `${club.name} logo`;
      }
    });
    document.title = `${club.name} — OdyZPickle`;
    elements.ownerLink.hidden = !isAdmin;
    elements.ownerDivider.hidden = !isAdmin;

    storageKey = `rally-club-state-v2:${club.id}`;
    state = loadState();
    render();
    await pullRemote();
    // Every sign-in starts by choosing how the club is playing today (read-only clubs skip it).
    // If they already went to Game History or Members while the club was loading, stay there.
    if (readOnly || currentView !== "board") {
      hideModePicker();
      render();
    } else {
      showModePicker();
    }
  } catch (error) {
    console.error(error);
    accessNotice = "Couldn’t load your club. Check your connection and refresh.";
    syncStatus = "error";
    // Show the board so the error message is visible.
    hideModePicker();
    render();
  }
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------- format choice & open play setup

// The choice screen is already showing when the page opens (so the dashboard never flashes first);
// this fills it in and enables Open Play once the club's data has loaded.
function showModePicker() {
  const session = state.session;
  elements.modeClub.textContent = club ? club.name.toUpperCase() : "YOUR CLUB";
  elements.chooseOpenPlay.disabled = false;
  // An open play that hasn't been finished (any date) shows above the choices, ready to continue.
  elements.runningSession.hidden = !session || readOnly;
  if (session) {
    const totals = sessionTotals(session);
    const schedule = formatSchedule(session);
    elements.runningTitle.textContent = session.venue || "Open play";
    const attendance = sessionAttendance();
    elements.runningDetail.textContent = [
      formatSessionDate(session.date),
      schedule,
      `${session.courtCount} ${FORMATS[session.format].label.toLowerCase()} ${session.courtCount === 1 ? "court" : "courts"}`,
      `${totals.games} ${totals.games === 1 ? "game" : "games"} so far`,
      hasFee(session) ? `${feeText(session)} · ${formatMoney(paymentSummary().total)} paid of ${formatMoney(sessionCollection(session, attendance))}` : ""
    ].filter(Boolean).join(" · ");
  }
  // Only one open play at a time: a new one can't start until the running one is finished.
  elements.chooseOpenPlay.disabled = Boolean(session) || readOnly;
  elements.chooseOpenPlay.classList.toggle("is-locked", Boolean(session));
  elements.openPlayHint.textContent = session ? "Finish the open play in progress to start a new one." : "";
  const games = playedMatches();
  const days = new Set(games.map((game) => game.day).filter(Boolean));
  elements.modeHistoryHint.textContent = games.length
    ? `${days.size ? `${days.size} open play ${days.size === 1 ? "day" : "days"} · ` : ""}${games.length} ${games.length === 1 ? "game" : "games"}`
    : "No games yet";
  const memberCount = state.players.filter(isMember).length;
  const guestCount = state.players.length - memberCount;
  elements.modeMembersHint.textContent = `${memberCount} ${memberCount === 1 ? "member" : "members"}${guestCount ? ` · ${guestCount} ${guestCount === 1 ? "guest" : "guests"}` : ""}`;
  // Opened from "Change" further down the dashboard: scroll up so the top bar shows above the choices.
  window.scrollTo(0, 0);
  elements.modePicker.hidden = false;
  document.body.classList.add("choosing-mode");
  elements.chooseOpenPlay.focus({ preventScroll: true });
}

function hideModePicker() {
  elements.modePicker.hidden = true;
  document.body.classList.remove("choosing-mode");
}

let sessionFormat = "doubles";

function setSessionFormat(format) {
  sessionFormat = format;
  elements.sessionFormatButtons.forEach((button) => {
    const selected = button.dataset.sessionFormat === format;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function sessionCourtCount() {
  const count = Math.round(Number(elements.sessionCourts.value));
  return Number.isFinite(count) ? Math.min(20, Math.max(1, count)) : 1;
}

function updateSessionNote() {
  const date = elements.sessionDate.value;
  const live = activeRound();
  const unfinished = live ? live.matches.filter((match) => !match.winner).length : 0;
  const newDay = !state.session || state.session.date !== date;
  elements.sessionNote.textContent = newDay && live
    ? `Starting a new day closes the current round${unfinished ? ` — ${unfinished} unfinished ${unfinished === 1 ? "match" : "matches"} won’t count` : ""}. Results so far stay in history.`
    : "";
}

// "18:30" → "6:30 PM"
function formatTime(hhmm) {
  const [hours, minutes] = String(hhmm).split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return "";
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
}

// Pesos, e.g. 150 → "₱150", 1200.5 → "₱1,200.50".
function formatMoney(amount) {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(value);
}

// ---- fees: members pay the member fee; everyone else (open play guests) pays the non-member fee

const isFeeNumber = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0;

// A session's (or the club settings') two fees. Older data with one "feePerHead" uses it for both.
function feesOf(source) {
  if (!source) return { member: 0, guest: 0 };
  const single = isFeeNumber(source.feePerHead) ? source.feePerHead : 0;
  return {
    member: isFeeNumber(source.feeMember) ? source.feeMember : single,
    guest: isFeeNumber(source.feeGuest) ? source.feeGuest : single
  };
}

function hasFee(source) {
  const fees = feesOf(source);
  return fees.member > 0 || fees.guest > 0;
}

// "₱150 per head" when both fees match, else "Members ₱100 · Non-members ₱150".
function describeFees(fees) {
  if (!fees.member && !fees.guest) return "Free";
  if (fees.member === fees.guest) return `${formatMoney(fees.member)} per head`;
  return `Members ${formatMoney(fees.member)} · Non-members ${formatMoney(fees.guest)}`;
}

function feeText(session) {
  return hasFee(session) ? describeFees(feesOf(session)) : "";
}

// Who came to the open play running now — everyone on today's roster (timed in, timed in during
// this session, or played), including those who left early — split into members and non-members.
function sessionAttendance() {
  if (!state.session) return { total: 0, members: 0, guests: 0 };
  const ids = todaysRosterIds();
  const came = state.players.filter((player) => ids.has(player.id));
  const members = came.filter(isMember).length;
  return { total: came.length, members, guests: came.length - members };
}

function sessionAttendeeCount() {
  return sessionAttendance().total;
}

// Amount to collect: members × member fee + non-members × non-member fee.
function sessionCollection(session, attendance = sessionAttendance()) {
  const fees = feesOf(session);
  return Math.round((attendance.members * fees.member + attendance.guests * fees.guest) * 100) / 100;
}

// The club's own default fees (saved with the club), or null if it hasn't set any.
function clubDefaultFees() {
  const settings = state.settings;
  if (!settings) return null;
  if (!isFeeNumber(settings.feeMember) && !isFeeNumber(settings.feeGuest) && !isFeeNumber(settings.feePerHead)) return null;
  return feesOf(settings);
}

function typedFee(input) {
  return input.value.trim() === "" ? 0 : Number(input.value);
}

function updateFeeHint() {
  const club = clubDefaultFees();
  const typed = { member: typedFee(elements.sessionFeeMember), guest: typedFee(elements.sessionFeeGuest) };
  elements.sessionFeeHint.textContent = !club
    ? "No club default yet"
    : typed.member === club.member && typed.guest === club.guest
      ? `These are the club defaults`
      : `Club default: ${describeFees(club)}`;
}

// ---- payments for the open play running now

const PAYMENT_METHODS = [
  ["cash", "Cash"],
  ["gcash", "GCash"],
  ["maya", "Maya"],
  ["bank", "Bank transfer"]
];
const paymentLabel = (method) => (PAYMENT_METHODS.find(([key]) => key === method) || [method, method])[1];

let newPlayerType = "guest";   // Member / Non-member switch on the Add player form
let payingPlayerId = null;     // roster row currently showing the payment-method choices

// What a player owes this open play: member fee if they're a member, otherwise non-member fee.
function feeFor(player, session = state.session) {
  const fees = feesOf(session);
  return isMember(player) ? fees.member : fees.guest;
}

function sessionPayments() {
  return (state.session && state.session.payments) || {};
}

function markPaid(playerId, method) {
  const session = state.session;
  const player = state.players.find((item) => item.id === playerId);
  if (!session || !player) return;
  const amount = feeFor(player);
  session.payments = { ...(session.payments || {}), [playerId]: { method, amount, member: isMember(player), name: player.name, at: new Date().toISOString() } };
  saveState({
    kind: "payment",
    summary: `${player.name} paid ${formatMoney(amount)} · ${paymentLabel(method)}`,
    details: { player: player.name, method, amount }
  });
}

function markUnpaid(playerId) {
  const session = state.session;
  const payment = session && session.payments && session.payments[playerId];
  if (!payment) return;
  const { [playerId]: removed, ...rest } = session.payments;
  session.payments = rest;
  saveState({
    kind: "payment_undone",
    summary: `Payment undone: ${payment.name} (${formatMoney(payment.amount)} · ${paymentLabel(payment.method)})`,
    details: { player: payment.name, method: payment.method, amount: payment.amount }
  });
}

// Collected so far (by method) and who on today's roster hasn't paid.
function paymentSummary() {
  const payments = sessionPayments();
  const paid = Object.values(payments);
  const byMethod = {};
  paid.forEach((payment) => { byMethod[payment.method] = (byMethod[payment.method] || 0) + payment.amount; });
  const total = Math.round(paid.reduce((sum, payment) => sum + payment.amount, 0) * 100) / 100;
  const ids = todaysRosterIds();
  const unpaid = state.players.filter((player) => ids.has(player.id) && !payments[player.id] && feeFor(player) > 0);
  return { total, count: paid.length, byMethod, unpaid };
}

function describeByMethod(byMethod) {
  return Object.entries(byMethod).map(([method, amount]) => `${paymentLabel(method)} ${formatMoney(amount)}`).join(" · ");
}

// Saves the club's default fees (used to pre-fill every new open play).
function setClubDefaultFees(fees) {
  const current = clubDefaultFees();
  if (current && current.member === fees.member && current.guest === fees.guest) return false;
  const { feePerHead, ...rest } = state.settings || {};
  state.settings = { ...rest, feeMember: fees.member, feeGuest: fees.guest };
  saveState({
    kind: "club_fee_set",
    summary: `Club default fees set: ${describeFees(fees)}`,
    details: { feeMember: fees.member, feeGuest: fees.guest }
  });
  return true;
}

function formatSchedule(session) {
  return session && session.startTime && session.endTime ? `${formatTime(session.startTime)}–${formatTime(session.endTime)}` : "";
}

// The next half hour from now, e.g. 6:10 PM → "18:30".
function nextHalfHour() {
  const date = new Date();
  date.setMinutes(date.getMinutes() < 30 ? 30 : 60, 0, 0);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function addHours(hhmm, hours) {
  const [h, m] = hhmm.split(":").map(Number);
  const total = Math.min(23 * 60 + 59, h * 60 + m + hours * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

// The most recent session (running or finished), used to pre-fill venue and times.
function lastSession() {
  if (state.session) return state.session;
  const sessions = Array.isArray(state.sessions) ? state.sessions : [];
  return sessions[sessions.length - 1] || null;
}

// New open play, or — while one is running — "Update open play" for that session (date locked,
// so it can't turn into a second open play).
function openSessionDialog() {
  const session = state.session;
  const previous = lastSession();
  const today = window.Ody.todayIso();
  elements.sessionTitle.textContent = session ? "Update open play" : "Set up today’s courts";
  elements.sessionSubmit.textContent = session ? "Save changes" : "Start open play →";
  setSessionFormat(session ? session.format : clubFormat());
  elements.sessionCourts.value = session ? session.courtCount : (clubCourts().length || 2);
  elements.sessionDate.value = session ? session.date : today;
  elements.sessionDate.disabled = Boolean(session);
  elements.sessionVenue.value = previous && previous.venue ? previous.venue : "";
  // A running open play shows its own fee; a new one starts from the club's default fee.
  const club = clubDefaultFees();
  const fees = session ? feesOf(session) : club || feesOf(previous);
  elements.sessionFeeMember.value = fees.member ? fees.member : "";
  elements.sessionFeeGuest.value = fees.guest ? fees.guest : "";
  elements.sessionFeeDefault.checked = !club && (fees.member > 0 || fees.guest > 0);
  updateFeeHint();
  const start = previous && previous.startTime ? previous.startTime : nextHalfHour();
  elements.sessionStart.value = start;
  elements.sessionEnd.value = previous && previous.endTime ? previous.endTime : addHours(start, 3);
  elements.sessionFeedback.textContent = "";
  elements.sessionFeedback.classList.remove("error");
  updateSessionNote();
  elements.sessionDialog.showModal();
  if (!elements.sessionVenue.value) elements.sessionVenue.focus();
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

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0] || "").join("");
}

function currentRound() {
  return state.rounds[state.rounds.length - 1] || null;
}

function allMatchesPlayed(round) {
  return round.matches.length > 0 && round.matches.every((match) => match.winner === "A" || match.winner === "B");
}

function render() {
  // The board only counts the open play running now; past sessions live in Game History.
  const thisSession = sessionRounds();
  const sessionGames = thisSession.flatMap((item) => item.matches.filter((match) => match.winner));
  const sessionPlayers = new Set(sessionGames.flatMap((match) => [...match.teamA, ...match.teamB]).map((player) => player.id));
  elements.today.textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date());
  const presentCount = state.players.filter(isTimedIn).length;
  elements.statPlayers.textContent = presentCount;
  elements.statPlayersNote.textContent = `of ${state.players.length} ${state.players.length === 1 ? "member" : "members"} timed in`;
  elements.statRounds.textContent = sessionGames.length;
  elements.statMatches.textContent = sessionPlayers.size;
  // The board is court by court: the round being played, or — when none is — every court open,
  // ready to start the next round from any court.
  const live = activeRound();
  const board = live || upcomingRound();
  elements.roundChip.textContent = state.session ? (live ? "OPEN PLAY · LIVE" : "OPEN PLAY") : "NO OPEN PLAY";
  elements.roundChip.classList.toggle("active", Boolean(state.session));
  elements.roundSummary.hidden = !live || live.matches.length === 0;
  if (live) {
    const completed = live.matches.filter((match) => match.winner).length;
    elements.roundProgress.textContent = `${completed} / ${live.matches.length} MATCHES`;
  }

  // Matches and open courts together, in court order (Court 1 first).
  // Done matches have left their court; their results show in Recent rounds.
  const cards = club ? [
    ...(live ? matchesInCourtOrder(live).filter(({ match }) => !match.done)
      .map(({ match, court, courtRound }) => ({ court, html: renderMatch(match, court, courtRound) })) : []),
    ...openCourtsIn(board).map((court) => ({ court: court.name, html: renderOpenCourt(court, board) }))
  ].sort((a, b) => compareCourtNames(a.court, b.court)) : [];
  elements.matchesList.innerHTML = cards.map((card) => card.html).join("");
  elements.matchesList.hidden = cards.length === 0;
  elements.roundEmpty.hidden = cards.length > 0;
  if (live && live.byes.length) {
    const presentIds = timedInIds();
    const waiting = live.byes.filter((player) => presentIds.has(player.id));
    const someonePlayed = live.matches.some((match) => match.done);
    if (waiting.length) {
      elements.matchesList.insertAdjacentHTML("beforeend", `<div class="bye-list">
        <span><strong>${someonePlayed ? "Waiting for a court:" : "Sitting this one out:"}</strong> ${waiting.map((player) => escapeHtml(player.name)).join(", ")}</span>
      </div>`);
    }
  }
  const away = todaysRoster().filter((player) => !isTimedIn(player));
  if (club && away.length) {
    elements.matchesList.insertAdjacentHTML("beforeend", `<div class="bye-list away-list">
      <span><strong>Timed out:</strong> ${away.map((player) => escapeHtml(player.name)).join(", ")}</span>
    </div>`);
  }

  renderFormat();
  const session = state.session;
  elements.sessionBanner.hidden = !session || currentView !== "board";
  if (currentView === "history") renderGameHistory();
  if (currentView === "members") renderMembers();
  if (currentView === "payments") renderPayments();
  if (session) {
    const schedule = formatSchedule(session);
    elements.sessionSummary.innerHTML = [
      session.venue ? `<span class="session-venue">${escapeHtml(session.venue)}</span>` : "",
      escapeHtml(formatSessionDate(session.date)),
      schedule ? escapeHtml(schedule) : "",
      `${session.courtCount} ${session.courtCount === 1 ? "court" : "courts"}`,
      FORMATS[session.format].label,
      hasFee(session) ? `<span class="session-fee">${escapeHtml(feeText(session))}</span>` : ""
    ].filter(Boolean).join(" · ");
  }
  elements.sessionChange.hidden = readOnly;
  elements.sessionFinish.hidden = readOnly;
  elements.playerInput.disabled = readOnly;
  elements.addPlayerForm.querySelector("button[type=submit]").disabled = readOnly;

  renderPlayers();
  renderCourts();
  renderHistory();
  renderLog();
  const notice = [accessNotice, storageNotice].filter(Boolean).join(" ");
  elements.storageNotice.textContent = notice;
  elements.storageNotice.hidden = !notice;
  renderSaveIndicator();
}

function renderSaveIndicator() {
  const [dotClass, label] = {
    synced: ["", "Synced to cloud"],
    syncing: ["save-dot-syncing", "Syncing…"],
    error: ["save-dot-error", "Cloud sync failed"],
    local: storageNotice ? ["save-dot-error", "Not saved"] : ["", "Saved on this device"]
  }[syncStatus];
  elements.saveIndicator.innerHTML = `<span class="save-dot ${dotClass}"></span> ${label}`;
}

function renderMatch(match, courtName, courtRound = 1) {
  const winnerTeam = match.winner;
  const bracketClass = match.bracket === "Winners" ? "bracket-winners" : match.bracket === "Challengers" ? "bracket-challengers" : "";
  const bracketText = match.bracket === "Open" ? "Open draw"
    : match.bracket === "Mixed" ? "Mixed draw"
      : match.bracket === "Custom" ? "Picked by hand"
        : `${match.bracket} bracket`;
  const editable = !readOnly && !match.winner;
  const teamMarkup = (team, code) => {
    const playerMarkup = team.map((player) => `
      <div class="team-player">
        <span class="player-avatar">${escapeHtml(initials(player.name))}</span>
        <span class="team-player-name">${escapeHtml(player.name)}</span>
      </div>`).join("");
    return `<div class="match-team${winnerTeam === code ? " is-winner" : ""}">
      <div class="team-players">${playerMarkup}</div>
      ${winnerTeam === code ? '<span class="team-win-tag">WINNER</span>' : ""}
    </div>`;
  };
  const format = matchFormat(match);
  // Singles buttons name the player; doubles keep "Team A / Team B".
  const label = (code, teamName) => format === "singles"
    ? `${escapeHtml((code === "A" ? match.teamA : match.teamB)[0].name)} won`
    : `Team ${teamName} won`;
  const button = (code, teamName) => `<button class="result-button${winnerTeam === code ? " selected" : ""}" type="button" data-match-id="${escapeHtml(match.id)}" data-winner="${code}" aria-pressed="${winnerTeam === code}"${readOnly ? " disabled" : ""}>${winnerTeam === code ? "✓ " : ""}${label(code, teamName)}</button>`;
  return `<article class="match-card">
    <div class="match-card-top">
      <span class="court-label">${escapeHtml(courtName)} <span class="court-round">· Round ${courtRound}</span></span>
      <span class="match-tags">
        <span class="format-tag format-${format}">${FORMATS[format].label}</span>
        <span class="bracket-label ${bracketClass}">${bracketText}</span>
        ${editable ? `<button class="link-button edit-match" type="button" data-edit-match="${escapeHtml(match.id)}" aria-label="Edit players on ${escapeHtml(courtName)}">✎ Edit</button>
        <button class="link-button clear-match" type="button" data-clear-match="${escapeHtml(match.id)}" aria-label="Clear players from ${escapeHtml(courtName)}">✕ Clear</button>` : ""}
      </span>
    </div>
    <div class="match-teams">
      ${teamMarkup(match.teamA, "A")}
      <span class="versus">VS</span>
      ${teamMarkup(match.teamB, "B")}
    </div>
    <div class="match-actions">
      ${button("A", "A")}
      ${button("B", "B")}
    </div>
    ${readOnly ? "" : `<button class="done-button" type="button" data-done-match="${escapeHtml(match.id)}"${winnerTeam ? "" : " disabled"}
      title="${winnerTeam ? `Finish and free ${escapeHtml(courtName)}` : "Pick the winning team first"}">
      ${winnerTeam ? `✓ Done — free ${escapeHtml(courtName)}` : "Done (pick the winner first)"}
    </button>`}
  </article>`;
}


// ---------------------------------------------------------------- singles / doubles

const FORMATS = {
  doubles: { label: "Doubles", teamSize: 2 },
  singles: { label: "Singles", teamSize: 1 }
};

// The format new matches use. Clubs start on doubles.
function clubFormat() {
  return state.format === "singles" ? "singles" : "doubles";
}

function matchSize(format = clubFormat()) {
  return FORMATS[format].teamSize * 2;
}

// Older matches have no format saved; their team size tells us.
function matchFormat(match) {
  return match.format || (match.teamA.length === 1 ? "singles" : "doubles");
}

function renderFormat() {
  const format = clubFormat();
  const hasCourts = clubCourts().length > 0;
  // With courts set up, each court has its own game type (in the Courts list), so the board-wide switch hides.
  elements.formatBar.hidden = hasCourts;
  elements.formatButtons.forEach((button) => {
    const selected = button.dataset.format === format;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.disabled = readOnly;
  });
  const formats = new Set(hasCourts ? clubCourts().map((court) => courtFormat(court.name)) : [format]);
  elements.rosterTip.textContent = formats.size > 1
    ? "Doubles courts need 4 players, singles courts need 2."
    : formats.has("singles") ? "A singles match needs 2 players." : "A doubles match needs 4 players.";
}

// Small Doubles | Singles switch used on each court.
function courtFormatToggle(court) {
  const format = courtFormat(court.name);
  return `<span class="mini-toggle" role="group" aria-label="Game type for ${escapeHtml(court.name)}">
    ${Object.entries(FORMATS).map(([key, info]) => `<button type="button" class="mini-option${key === format ? " selected" : ""}"
      data-court-format="${key}" data-court-id="${escapeHtml(court.id)}" aria-pressed="${key === format}"${readOnly ? " disabled" : ""}>${info.label}</button>`).join("")}
  </span>`;
}

// The club's courts that have no match in this round yet (only while the round is still being played).
// A not-yet-started round: everyone waiting, no matches. Shown when no round is being played.
function upcomingRound() {
  const round = currentRound();
  return { number: (round ? round.number : 0) + 1, date: playDate(), sessionId: currentSessionId(), matches: [], byes: rosterPlayers(), upcoming: true };
}

// The date games are being played for: the open play session's date, or today.
function playDate() {
  return state.session && state.session.date ? state.session.date : window.Ody.todayIso();
}

function openCourtsIn(round) {
  if (!round || (!round.upcoming && round !== activeRound())) return [];
  const used = occupiedCourts(round);
  // The club's courts, plus any court freed with Done this round (clubs without a court list use "Court N").
  const names = new Set(clubCourts().map((court) => court.name));
  // Clubs without a court list always get the next free "Court N", so another match can start.
  if (!names.size) {
    let number = 1;
    while (used.has(`Court ${number}`)) number += 1;
    names.add(`Court ${number}`);
  }
  round.matches.forEach((match, index) => { if (match.done) names.add(courtsInRound(round)[index]); });
  return [...names]
    .filter((name) => !used.has(name))
    .map((name) => clubCourts().find((court) => court.name === name) || { id: name, name });
}

// Courts with a match still on them. A match marked Done has left its court.
function occupiedCourts(round) {
  const names = courtsInRound(round);
  return new Set(round.matches.map((match, index) => (match.done ? null : names[index])).filter(Boolean));
}

function renderOpenCourt(court, round) {
  const presentIds = timedInIds();
  const waiting = round.byes.filter((player) => presentIds.has(player.id));
  const format = courtFormat(court.name);
  const size = matchSize(format);
  const ready = waiting.length >= size;
  const slots = Array.from({ length: size }, (_, index) => {
    const player = waiting[index];
    return player
      ? `<span class="open-slot filled" title="${escapeHtml(player.name)}">${escapeHtml(initials(player.name))}</span>`
      : '<span class="open-slot" aria-hidden="true"></span>';
  }).join("");
  const needed = size - Math.min(waiting.length, size);
  const note = ready
    ? `${waiting.length} players waiting — ready for ${FORMATS[format].label.toLowerCase()}.`
    : waiting.length
      ? `Waiting: ${waiting.map((player) => escapeHtml(player.name)).join(", ")} · needs ${needed} more ${needed === 1 ? "player" : "players"}.`
      : "No one is waiting. Add players to the roster to fill this court.";
  return `<article class="match-card open-court">
    <div class="match-card-top">
      <span class="court-label">${escapeHtml(court.name)} <span class="court-round">· Round ${nextCourtRound(round, court.name)}</span></span>
      <span class="match-tags">
        <span class="format-tag format-${format}">${FORMATS[format].label}</span>
        <span class="bracket-label open-label">Open court</span>
      </span>
    </div>
    <div class="open-court-body">
      <div class="open-slots" aria-label="${Math.min(waiting.length, size)} of ${size} spots filled">${slots}</div>
      <p class="open-note">${note}</p>
      ${readOnly ? "" : `<div class="open-actions">
        ${ready ? `<button class="result-button selected open-start" type="button" data-start-court="${escapeHtml(court.name)}">Random match here</button>` : ""}
        <button class="result-button open-start" type="button" data-pick-court="${escapeHtml(court.name)}">Pick players</button>
      </div>`}
    </div>
  </article>`;
}

// ---------------------------------------------------------------- standings

// "roster" keeps the order players were added; "doubles"/"singles" rank by that record.
let rosterSort = "roster";

// Wins and losses per player, split by game type, counted from every recorded result.
// `rounds` defaults to the whole history; the board passes just this open play's rounds.
function playerStandings(rounds = state.rounds) {
  const stats = new Map(state.players.map((player) => [player.id, {
    doubles: { wins: 0, losses: 0 },
    singles: { wins: 0, losses: 0 }
  }]));
  // Someone deleted and re-added under the same name got a new id; match their old games by name.
  const idByName = new Map(state.players.map((player) => [player.name.toLocaleLowerCase(), player.id]));
  const statsFor = (player) => stats.get(player.id) || stats.get(idByName.get(String(player.name || "").toLocaleLowerCase()));
  for (const round of rounds) {
    for (const match of round.matches) {
      if (match.winner !== "A" && match.winner !== "B") continue;
      const format = matchFormat(match);
      const winners = match.winner === "A" ? match.teamA : match.teamB;
      const losers = match.winner === "A" ? match.teamB : match.teamA;
      winners.forEach((player) => { const entry = statsFor(player); if (entry) entry[format].wins += 1; });
      losers.forEach((player) => { const entry = statsFor(player); if (entry) entry[format].losses += 1; });
    }
  }
  return stats;
}

// Most wins first; ties go to the better win rate, then fewer losses, then name.
function compareRecords(a, b) {
  if (b.wins !== a.wins) return b.wins - a.wins;
  const rate = (record) => (record.wins + record.losses ? record.wins / (record.wins + record.losses) : -1);
  if (rate(b) !== rate(a)) return rate(b) - rate(a);
  return a.losses - b.losses;
}

function recordCell(record, highlight) {
  const played = record.wins + record.losses;
  return `<span class="player-record num${highlight ? " sorted" : ""}${played ? "" : " none"}"
    title="${played ? `${record.wins} won, ${record.losses} lost` : "No games yet"}">${played ? `<b>${record.wins}</b>–${record.losses}` : "—"}</span>`;
}

function renderPlayers() {
  // The board's roster is today's players with this open play's records. Everyone (and all-time
  // records) stays on the Members page.
  const players = todaysRoster();
  elements.rosterCount.textContent = players.length;
  elements.rosterEmpty.hidden = players.length > 0;
  const stats = playerStandings(sessionRounds());
  if (rosterSort !== "roster") {
    players.sort((a, b) => compareRecords(stats.get(a.id)[rosterSort], stats.get(b.id)[rosterSort])
      || a.name.localeCompare(b.name));
  }
  const presentCount = players.filter(isTimedIn).length;
  elements.presenceCount.textContent = players.length ? `${presentCount} of ${players.length} timed in` : "";
  elements.presenceAll.forEach((button) => {
    button.hidden = readOnly || !players.length;
    button.disabled = button.dataset.presenceAll === "in" ? presentCount === players.length : presentCount === 0;
  });
  elements.sortHeads.forEach((head) => {
    const active = head.dataset.sort === rosterSort;
    head.classList.toggle("active", active);
    head.setAttribute("aria-pressed", String(active));
  });
  elements.playerList.innerHTML = players.map((player, index) => {
    const record = stats.get(player.id);
    const ranked = rosterSort !== "roster" && record[rosterSort].wins + record[rosterSort].losses > 0;
    const present = isTimedIn(player);
    const stamp = present ? player.timeIn : player.timeOut;
    const option = (status, label) => `<button class="presence-opt presence-${status}${(status === "in") === present ? " selected" : ""}" type="button"
      data-presence-set="${status}" data-player="${escapeHtml(player.id)}" aria-pressed="${(status === "in") === present}"${readOnly ? " disabled" : ""}>${label}</button>`;
    return `
    <li class="player-row standings-row${present ? "" : " is-away"}">
      <div class="player-main">
        ${ranked ? `<span class="rank">${index + 1}</span>` : ""}
        <span class="player-avatar">${escapeHtml(initials(player.name))}</span>
        <span class="player-text">
          <span class="player-name-line">
            <span class="player-name">${escapeHtml(player.name)}</span>
            <span class="type-tag ${isMember(player) ? "type-member" : "type-guest"}">${isMember(player) ? "Member" : "Non-member"}</span>
          </span>
          <span class="presence-line">
            <span class="presence-toggle" role="group" aria-label="Time ${escapeHtml(player.name)} in or out">${option("in", "In")}${option("out", "Out")}</span>
            ${stamp ? `<span class="presence-time">${escapeHtml(formatClock(stamp))}</span>` : ""}
          </span>
          ${paymentLine(player)}
        </span>
      </div>
      ${recordCell(record.doubles, rosterSort === "doubles")}
      ${recordCell(record.singles, rosterSort === "singles")}
    </li>`;
  }).join("");
}

// The payment line under a roster player: amount due + Mark paid, the method choices, or Paid.
function paymentLine(player) {
  const session = state.session;
  if (!session || !hasFee(session)) return "";
  const payment = sessionPayments()[player.id];
  const id = escapeHtml(player.id);
  if (payment) {
    return `<span class="pay-line">
      <span class="paid-chip">✓ Paid · ${escapeHtml(paymentLabel(payment.method))} · ${escapeHtml(formatMoney(payment.amount))}</span>
      ${readOnly ? "" : `<button class="link-button pay-undo" type="button" data-unpay="${id}">Undo</button>`}
    </span>`;
  }
  const due = feeFor(player);
  if (!due) return `<span class="pay-line"><span class="free-chip">Free</span></span>`;
  if (readOnly) return `<span class="pay-line"><span class="due-chip">${escapeHtml(formatMoney(due))} due</span></span>`;
  if (payingPlayerId === player.id) {
    return `<span class="pay-line pay-choose" role="group" aria-label="How did ${escapeHtml(player.name)} pay?">
      ${PAYMENT_METHODS.map(([key, label]) => `<button class="method-chip" type="button" data-pay-method="${key}" data-pay-player="${id}">${label}</button>`).join("")}
      <button class="link-button pay-cancel" type="button" data-pay-cancel aria-label="Cancel">×</button>
    </span>`;
  }
  return `<span class="pay-line">
    <span class="due-chip">${escapeHtml(formatMoney(due))} due</span>
    <button class="pay-button" type="button" data-pay-open="${id}">Mark paid</button>
  </span>`;
}

function renderCourts() {
  const courts = clubCourts();
  elements.courtCount.textContent = courts.length || "";
  elements.courtInput.disabled = readOnly;
  elements.addCourtForm.querySelector("button[type=submit]").disabled = readOnly;
  elements.courtsEmpty.hidden = courts.length > 0;
  elements.courtList.innerHTML = courts.map((court) => `
    <li class="player-row court-row">
      <div class="player-main">
        <span class="player-avatar court-avatar" aria-hidden="true">▭</span>
        <span class="player-name">${escapeHtml(court.name)}</span>
      </div>
      <span class="court-row-tools">
        ${courtFormatToggle(court)}
        ${readOnly ? "" : `<button class="remove-player" type="button" data-remove-court="${escapeHtml(court.id)}" aria-label="Remove ${escapeHtml(court.name)}">×</button>`}
      </span>
    </li>`).join("");
}

const HISTORY_PER_COURT = 8;

// Results grouped by court, each court with its own round numbers, newest first.
function renderHistory() {
  const { byCourt } = courtTimeline();
  const courts = [...byCourt.entries()]
    .map(([court, list]) => ({
      court,
      results: list.map((entry, index) => ({ ...entry, courtRound: index + 1 })).filter(({ match }) => match.winner)
    }))
    .filter(({ results }) => results.length)
    .sort((a, b) => compareCourtNames(a.court, b.court));
  elements.historyEmpty.hidden = courts.length > 0;
  elements.historyList.innerHTML = courts.map(({ court, results }) => {
    const latest = results.slice(-HISTORY_PER_COURT).reverse();
    const rows = latest.map(({ match, courtRound }) => {
      const winners = match.winner === "A" ? match.teamA : match.teamB;
      const losers = match.winner === "A" ? match.teamB : match.teamA;
      const format = matchFormat(match);
      return `<li class="court-history-row">
        <span class="court-history-round">R${courtRound}</span>
        <span class="court-history-result">
          <span class="history-winners">🏆 ${escapeHtml(teamNames(winners))}</span>
          <span class="history-losers">beat ${escapeHtml(teamNames(losers))}</span>
        </span>
        <span class="format-tag format-${format}">${FORMATS[format].label}</span>
      </li>`;
    }).join("");
    const more = results.length > HISTORY_PER_COURT ? `<p class="court-history-more">+ ${results.length - HISTORY_PER_COURT} earlier — see the Game log</p>` : "";
    return `<article class="court-history">
      <header class="court-history-head">
        <span class="history-court">${escapeHtml(court)}</span>
        <span class="court-history-count">${results.length} ${results.length === 1 ? "round" : "rounds"} played</span>
      </header>
      <ol class="court-history-list">${rows}</ol>
      ${more}
    </article>`;
  }).join("");
}

// ---------------------------------------------------------------- views: board / game history / members

const VIEWS = {
  board: { title: "Club dashboard", subtitle: "Get your crew together. We’ll take care of the matchups." },
  history: { title: "Game history", subtitle: "Every open play day, court by court." },
  members: { title: "Members", subtitle: "Your club’s registered members. Open play walk-ins are listed under Guests." },
  payments: { title: "Payments", subtitle: "Who paid, how they paid, and who still owes — across every open play." }
};
let currentView = "board";

// "#history?from=2026-11-01&to=2026-11-22" → view "history" (the rest are page parameters).
function viewFromHash() {
  const view = location.hash.replace("#", "").split("?")[0];
  return VIEWS[view] ? view : "board";
}

function hashParams() {
  const query = location.hash.split("?")[1] || "";
  return new URLSearchParams(query);
}

// ---- Game History date filter (from / to, inclusive; empty = open-ended)

const historyRange = { from: "", to: "" };

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value || "");
}

function shiftIsoDate(iso, days) {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return localDate(date.toISOString());
}

// Reads the range from the address (so refresh / bookmarks keep it).
function readHistoryRange() {
  const params = hashParams();
  historyRange.from = isIsoDate(params.get("from")) ? params.get("from") : "";
  historyRange.to = isIsoDate(params.get("to")) ? params.get("to") : "";
  if (historyRange.from && historyRange.to && historyRange.from > historyRange.to) {
    [historyRange.from, historyRange.to] = [historyRange.to, historyRange.from];
  }
}

// Saves the range into the address without reloading or re-triggering navigation.
function writeHistoryRange() {
  const params = new URLSearchParams();
  if (historyRange.from) params.set("from", historyRange.from);
  if (historyRange.to) params.set("to", historyRange.to);
  const query = params.toString();
  history.replaceState(null, "", `#history${query ? `?${query}` : ""}`);
}

// `changed` says which box was edited: if From goes past To, To moves up to match (and vice versa).
function setHistoryRange(from, to, changed = "") {
  historyRange.from = from || "";
  historyRange.to = to || "";
  if (historyRange.from && historyRange.to && historyRange.from > historyRange.to) {
    if (changed === "to") historyRange.from = historyRange.to;
    else historyRange.to = historyRange.from;
  }
  writeHistoryRange();
  renderGameHistory();
}

function inHistoryRange(day) {
  if (!historyRange.from && !historyRange.to) return true;
  if (!day) return false; // games without a date only show under "All dates"
  return (!historyRange.from || day >= historyRange.from) && (!historyRange.to || day <= historyRange.to);
}

function historyRangeLabel() {
  const { from, to } = historyRange;
  if (!from && !to) return "";
  if (from && to && from === to) return formatSessionDate(from);
  if (from && to) return `${formatSessionDate(from)} – ${formatSessionDate(to)}`;
  return from ? `from ${formatSessionDate(from)}` : `up to ${formatSessionDate(to)}`;
}

function datePresetRange(preset) {
  const today = window.Ody.todayIso();
  if (preset === "today") return [today, today];
  if (preset === "week") return [shiftIsoDate(today, -6), today];
  if (preset === "month") {
    // The whole calendar month (1st → last day), so open plays dated later this month are included.
    const [year, month] = today.split("-").map(Number);
    const lastDay = new Date(year, month, 0).getDate();
    return [`${today.slice(0, 8)}01`, `${today.slice(0, 8)}${String(lastDay).padStart(2, "0")}`];
  }
  return ["", ""];
}

function showView(view) {
  currentView = VIEWS[view] ? view : "board";
  if (currentView === "history") readHistoryRange();
  elements.boardView.hidden = currentView !== "board";
  elements.historyView.hidden = currentView !== "history";
  elements.membersView.hidden = currentView !== "members";
  elements.paymentsView.hidden = currentView !== "payments";
  elements.navLinks.forEach((link) => {
    if (link.dataset.view === currentView) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  elements.pageTitle.innerHTML = `${escapeHtml(VIEWS[currentView].title)}<span class="heading-period">.</span>`;
  elements.pageSubtitle.textContent = VIEWS[currentView].subtitle;
  // Small line under the club name (next to its logo): the page you're on.
  elements.clubName.dataset.sub = VIEWS[currentView].title.toUpperCase();
  render();
}

// Local calendar date (YYYY-MM-DD) for a timestamp.
function localDate(iso) {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// The day a match belongs to: its round's open play date, else when its result was recorded.
// Games from before dates were saved have none.
function matchDay(round, match) {
  if (round.date) return round.date;
  const stamp = match.playedAt || match.doneAt;
  return stamp ? localDate(stamp) : null;
}

// Every played match in the club's history, with its day, court, and the court's round number
// within that day (Court 1 · R3 = the 3rd game on Court 1 that day).
function playedMatches() {
  const perDayCourt = new Map();
  const list = [];
  for (const round of state.rounds) {
    const courts = courtsInRound(round);
    round.matches.forEach((match, index) => {
      if (match.winner !== "A" && match.winner !== "B") return;
      const day = matchDay(round, match);
      const key = `${day || "undated"}|${courts[index]}`;
      perDayCourt.set(key, (perDayCourt.get(key) || 0) + 1);
      list.push({ round, match, court: courts[index], courtRound: perDayCourt.get(key), day });
    });
  }
  return list;
}

// When a game's result came in (or, failing that, when its court was marked Done).
function gameTime(match) {
  return match.playedAt || match.doneAt || null;
}

function resultRow({ match, courtRound }) {
  const winners = match.winner === "A" ? match.teamA : match.teamB;
  const losers = match.winner === "A" ? match.teamB : match.teamA;
  const format = matchFormat(match);
  const time = gameTime(match);
  return `<li class="court-history-row">
    <span class="court-history-round">R${courtRound}</span>
    <span class="court-history-result">
      <span class="history-winners">🏆 ${escapeHtml(teamNames(winners))}</span>
      <span class="history-losers">beat ${escapeHtml(teamNames(losers))}</span>
    </span>
    <span class="game-meta">
      ${time ? `<span class="game-time">${escapeHtml(formatLogTime(time))}</span>` : ""}
      <span class="format-tag format-${format}">${FORMATS[format].label}</span>
    </span>
  </li>`;
}

function playerCountText(count) {
  return `${count} ${count === 1 ? "player" : "players"}`;
}

// Courts side by side, each listing its games newest first, numbered R1, R2… within the block.
function courtColumns(blockGames) {
  const byCourt = new Map();
  blockGames.forEach((game) => {
    if (!byCourt.has(game.court)) byCourt.set(game.court, []);
    byCourt.get(game.court).push(game);
  });
  return [...byCourt.entries()]
    .sort((a, b) => compareCourtNames(a[0], b[0]))
    .map(([court, list]) => `<article class="court-history">
      <header class="court-history-head">
        <span class="history-court">${escapeHtml(court)}</span>
        <span class="court-history-count">${list.length} ${list.length === 1 ? "game" : "games"}</span>
      </header>
      <ol class="court-history-list">${list.map((game, index) => ({ ...game, courtRound: index + 1 })).reverse().map(resultRow).join("")}</ol>
    </article>`).join("");
}

// Player standings for a set of games: most wins, then better win rate, then fewer losses.
// Players with the same record share a rank.
function standingsCard(blockGames) {
  const table = new Map();
  for (const { match } of blockGames) {
    const winners = match.winner === "A" ? match.teamA : match.teamB;
    const losers = match.winner === "A" ? match.teamB : match.teamA;
    const entry = (player) => {
      if (!table.has(player.id)) table.set(player.id, { name: player.name, wins: 0, losses: 0 });
      return table.get(player.id);
    };
    winners.forEach((player) => { entry(player).wins += 1; });
    losers.forEach((player) => { entry(player).losses += 1; });
  }
  const rows = [...table.values()].sort((a, b) => compareRecords(a, b) || a.name.localeCompare(b.name));
  let rank = 0;
  let previous = null;
  const medals = ["🥇", "🥈", "🥉"];
  const body = rows.map((row, index) => {
    if (!previous || compareRecords(previous, row) !== 0) rank = index + 1;
    previous = row;
    const games = row.wins + row.losses;
    const rate = games ? Math.round((row.wins / games) * 100) : 0;
    // Medals for the top three — but only for players who actually won a game.
    const medal = rank <= 3 && row.wins > 0;
    return `<li class="standings-line${medal ? " top" : ""}">
      <span class="standings-rank">${rank}</span>
      <span class="standings-name">${medal ? `<span class="medal" aria-hidden="true">${medals[rank - 1]}</span>` : ""}${escapeHtml(row.name)}</span>
      <span class="standings-num"><b>${row.wins}</b>–${row.losses}</span>
      <span class="standings-num">${rate}%</span>
      <span class="standings-num">${games}</span>
    </li>`;
  }).join("");
  return `<article class="court-history standings-card">
    <header class="court-history-head">
      <span class="history-court">STANDINGS</span>
      <span class="court-history-count">${rows.length} ${rows.length === 1 ? "player" : "players"}</span>
    </header>
    <div class="standings-line standings-head" aria-hidden="true">
      <span>#</span><span>PLAYER</span><span class="standings-num">W–L</span><span class="standings-num">WIN %</span><span class="standings-num">GAMES</span>
    </div>
    <ol class="standings-list" aria-label="Player standings">${body}</ol>
  </article>`;
}

// Splits a day's games into blocks: one per open play (with its scheduled hours), and — for older
// games that weren't part of an open play — one per clock hour. Newest block first.
function dayBlocks(dayGames, sessionsById) {
  const blocks = new Map();
  for (const game of dayGames) {
    const sessionId = game.round.sessionId;
    const time = gameTime(game.match);
    let key;
    if (sessionId) key = `session:${sessionId}`;
    else if (time) key = `hour:${new Date(time).getHours()}`;
    else key = "untimed";
    if (!blocks.has(key)) blocks.set(key, { key, sessionId, games: [], first: null, last: null });
    const block = blocks.get(key);
    block.games.push(game);
    if (time) {
      if (!block.first || time < block.first) block.first = time;
      if (!block.last || time > block.last) block.last = time;
    }
  }
  return [...blocks.values()]
    .map((block) => {
      const session = block.sessionId ? sessionsById.get(block.sessionId) : null;
      return { ...block, session, sortAt: (session && session.startedAt) || block.first || "" };
    })
    .sort((a, b) => (a.key === "untimed") - (b.key === "untimed") || b.sortAt.localeCompare(a.sortAt));
}

function blockHeading(block) {
  const { session } = block;
  if (session) {
    const schedule = formatSchedule(session);
    const courts = `${session.courtCount} ${FORMATS[session.format] ? FORMATS[session.format].label.toLowerCase() : ""} ${session.courtCount === 1 ? "court" : "courts"}`;
    const split = typeof session.membersCame === "number"
      ? ` (${session.membersCame} ${session.membersCame === 1 ? "member" : "members"}, ${session.guestsCame} ${session.guestsCame === 1 ? "non-member" : "non-members"})`
      : "";
    // Finished sessions with payment tracking show what was actually paid (and by which method).
    const collected = typeof session.paidTotal === "number"
      ? ` · ${formatMoney(session.paidTotal)} paid of ${formatMoney(session.collection || 0)} from ${session.attendees} ${session.attendees === 1 ? "player" : "players"}${split}${session.paidByMethod && Object.keys(session.paidByMethod).length ? ` (${describeByMethod(session.paidByMethod)})` : ""}${session.unpaidCount ? ` · ${session.unpaidCount} unpaid` : ""}`
      : session.collection ? ` · ${formatMoney(session.collection)} collected from ${session.attendees} ${session.attendees === 1 ? "player" : "players"}${split}` : "";
    const money = hasFee(session) ? `${feeText(session)}${session.finishedAt ? collected : ""}` : "";
    return {
      time: schedule || (session.startedAt ? `From ${formatClock(session.startedAt)}` : "Open play"),
      detail: [session.venue, courts, money, session.finishedAt ? `finished ${formatClock(session.finishedAt)}` : "in progress"].filter(Boolean).join(" · ")
    };
  }
  if (block.key === "untimed") return { time: "Time not recorded", detail: "Older games" };
  const hour = Number(block.key.split(":")[1]);
  const from = new Date();
  from.setHours(hour, 0, 0, 0);
  const to = new Date(from.getTime() + 3600000);
  const label = (date) => new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(date);
  return { time: `${label(from)} – ${label(to)}`, detail: "Games this hour" };
}

function renderGameHistory() {
  elements.historyFrom.value = historyRange.from;
  elements.historyTo.value = historyRange.to;
  elements.datePresets.forEach((chip) => {
    const [from, to] = datePresetRange(chip.dataset.datePreset);
    const active = from === historyRange.from && to === historyRange.to;
    chip.classList.toggle("selected", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  const allGames = playedMatches();
  const games = allGames.filter((game) => inHistoryRange(game.day));
  const days = new Map();
  for (const game of games) {
    const key = game.day || "undated";
    if (!days.has(key)) days.set(key, []);
    days.get(key).push(game);
  }
  const ordered = [...days.keys()].sort((a, b) => (a === "undated" ? 1 : b === "undated" ? -1 : b.localeCompare(a)));
  const dated = ordered.filter((key) => key !== "undated").length;
  const rangeLabel = historyRangeLabel();
  elements.historySummary.textContent = games.length
    ? `${games.length} ${games.length === 1 ? "game" : "games"}${dated ? ` across ${dated} open play ${dated === 1 ? "day" : "days"}` : ""}${rangeLabel ? ` · ${rangeLabel}` : ""}`
    : "";
  elements.historyDaysEmpty.hidden = games.length > 0;
  elements.historyDaysEmpty.textContent = allGames.length && rangeLabel
    ? `No games ${historyRange.from === historyRange.to ? "on" : "for"} ${rangeLabel}. Try another date, or All dates.`
    : "No games recorded yet. Results show up here once courts start playing.";
  const sessions = [...(Array.isArray(state.sessions) ? state.sessions : []), ...(state.session ? [state.session] : [])];
  const sessionsById = new Map(sessions.filter((item) => item.id).map((item) => [item.id, item]));

  elements.historyDays.innerHTML = ordered.map((key) => {
    const dayGames = days.get(key);
    const attended = new Set(dayGames.flatMap(({ match }) => [...match.teamA, ...match.teamB]).map((player) => player.id));
    const courtsUsed = new Set(dayGames.map((game) => game.court));
    const blocks = dayBlocks(dayGames, sessionsById);
    const openPlays = blocks.filter((block) => block.session).length;
    const title = key === "undated" ? "Before dates were tracked" : formatSessionDate(key);
    return `<article class="panel history-day">
      <header class="history-day-head">
        <div>
          <p class="eyebrow">${openPlays ? `${openPlays} OPEN ${openPlays === 1 ? "PLAY" : "PLAYS"}` : key === "undated" ? "OLDER GAMES" : "GAMES"}</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <div class="history-day-stats">
          <span><b>${dayGames.length}</b> ${dayGames.length === 1 ? "game" : "games"}</span>
          <span><b>${attended.size}</b> ${attended.size === 1 ? "player" : "players"}</span>
          <span><b>${courtsUsed.size}</b> ${courtsUsed.size === 1 ? "court" : "courts"}</span>
        </div>
      </header>
      ${blocks.map((block) => {
        const heading = blockHeading(block);
        const players = new Map();
        block.games.forEach(({ match }) => [...match.teamA, ...match.teamB].forEach((player) => players.set(player.id, player.name)));
        return `<section class="history-block">
          <header class="history-block-head">
            <div>
              <h3 class="history-block-time">${escapeHtml(heading.time)}</h3>
              <p class="history-block-detail">${escapeHtml(heading.detail)}</p>
            </div>
            <span class="history-block-count">${block.games.length} ${block.games.length === 1 ? "game" : "games"} · ${playerCountText(players.size)}</span>
          </header>
          <div class="history-list">${standingsCard(block.games)}${courtColumns(block.games)}</div>
        </section>`;
      }).join("")}
    </article>`;
  }).join("");
}

// "members" = the club's registered members (added on the Members page); "guests" = everyone who
// only came to open play.
let memberFilter = "members";
let memberSort = "name";
const MEMBERS_PER_PAGE = 40;
let memberPage = 1;

// Page buttons: ‹ Previous 1 2 3 … Next ›
function renderPager(container, page, totalItems, perPage, attr) {
  const pages = Math.ceil(totalItems / perPage);
  container.hidden = pages <= 1;
  if (pages <= 1) {
    container.innerHTML = "";
    return;
  }
  const first = (page - 1) * perPage + 1;
  const last = Math.min(page * perPage, totalItems);
  const numbers = [];
  for (let n = 1; n <= pages; n += 1) {
    // Show first, last, and pages near the current one; collapse the rest into "…".
    if (n === 1 || n === pages || Math.abs(n - page) <= 1) numbers.push(n);
    else if (numbers[numbers.length - 1] !== "…") numbers.push("…");
  }
  container.innerHTML = `
    <span class="pager-info">Showing ${first}–${last} of ${totalItems}</span>
    <span class="pager-buttons">
      <button class="pager-button" type="button" ${attr}="${page - 1}"${page === 1 ? " disabled" : ""}>‹ Previous</button>
      ${numbers.map((n) => n === "…"
        ? '<span class="pager-gap">…</span>'
        : `<button class="pager-button pager-number${n === page ? " current" : ""}" type="button" ${attr}="${n}"${n === page ? ' aria-current="page"' : ""}>${n}</button>`).join("")}
      <button class="pager-button" type="button" ${attr}="${page + 1}"${page === pages ? " disabled" : ""}>Next ›</button>
    </span>`;
}

function isMember(player) {
  return Boolean(player.memberSince);
}

// Turns an open play guest into a registered member (keeps their history).
function makeMember(player) {
  if (!player || isMember(player)) return false;
  player.memberSince = new Date().toISOString();
  saveState({
    kind: "members_added",
    summary: `${player.name} is now a member`,
    details: { members: [player.name], fromGuest: true }
  });
  return true;
}

function renderMembers() {
  const stats = playerStandings();
  const games = playedMatches();
  const lastPlayed = new Map();
  const played = new Map();
  for (const { match, day } of games) {
    for (const player of [...match.teamA, ...match.teamB]) {
      played.set(player.id, (played.get(player.id) || 0) + 1);
      if (day && (!lastPlayed.has(player.id) || day > lastPlayed.get(player.id))) lastPlayed.set(player.id, day);
    }
  }
  // Payment tracking: total paid and open plays still unpaid, per player.
  const paidByPlayer = new Map();
  allPayments().forEach((payment) => paidByPlayer.set(payment.playerId, (paidByPlayer.get(payment.playerId) || 0) + payment.amount));
  const owesByPlayer = new Map();
  unpaidEntries().forEach((entry) => owesByPlayer.set(entry.player.id, (owesByPlayer.get(entry.player.id) || 0) + 1));
  const query = elements.memberSearch.value.trim().toLocaleLowerCase();
  const showMembers = memberFilter === "members";
  const memberCount = state.players.filter(isMember).length;
  elements.membersTabCount.textContent = memberCount;
  elements.guestsTabCount.textContent = state.players.length - memberCount;
  elements.membersSecondHead.textContent = showMembers ? "MEMBER SINCE" : "GUEST";
  const rows = state.players
    .filter((player) => isMember(player) === showMembers)
    .filter((player) => !query || player.name.toLocaleLowerCase().includes(query))
    .map((player) => {
      const record = stats.get(player.id);
      const wins = record.doubles.wins + record.singles.wins;
      const losses = record.doubles.losses + record.singles.losses;
      return {
        player,
        record,
        games: played.get(player.id) || wins + losses,
        rate: wins + losses ? wins / (wins + losses) : -1,
        last: lastPlayed.get(player.id) || "",
        paid: paidByPlayer.get(player.id) || 0,
        owes: owesByPlayer.get(player.id) || 0
      };
    });
  const sorters = {
    name: (a, b) => a.player.name.localeCompare(b.player.name),
    doubles: (a, b) => compareRecords(a.record.doubles, b.record.doubles),
    singles: (a, b) => compareRecords(a.record.singles, b.record.singles),
    games: (a, b) => b.games - a.games,
    rate: (a, b) => b.rate - a.rate,
    paid: (a, b) => b.paid - a.paid || b.owes - a.owes,
    last: (a, b) => b.last.localeCompare(a.last)
  };
  rows.sort((a, b) => sorters[memberSort](a, b) || a.player.name.localeCompare(b.player.name));
  elements.memberSortHeads.forEach((head) => head.classList.toggle("active", head.dataset.memberSort === memberSort));
  elements.memberFilters.forEach((chip) => {
    const active = chip.dataset.memberFilter === memberFilter;
    chip.classList.toggle("selected", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  elements.membersEmpty.hidden = rows.length > 0;
  elements.membersEmpty.textContent = query
    ? "No one matches that search."
    : showMembers
      ? "No members yet. Add your club’s members above — or make a regular from Guests a member."
      : "No guests. Players added during open play who aren’t members show up here.";
  // 40 per page.
  const pageCount = Math.max(1, Math.ceil(rows.length / MEMBERS_PER_PAGE));
  memberPage = Math.min(Math.max(1, memberPage), pageCount);
  const pageRows = rows.slice((memberPage - 1) * MEMBERS_PER_PAGE, memberPage * MEMBERS_PER_PAGE);
  renderPager(elements.membersPager, memberPage, rows.length, MEMBERS_PER_PAGE, "data-member-page");
  elements.membersBody.innerHTML = pageRows.map(({ player, record, games: count, rate, last, paid, owes }) => {
    const second = showMembers
      ? `<span class="member-since">${escapeHtml(formatSessionDate(localDate(player.memberSince)))}</span>`
      : `<span class="guest-cell"><span class="guest-tag">Guest</span>${readOnly ? "" : `<button class="link-button make-member" type="button" data-make-member="${escapeHtml(player.id)}">Make member</button>`}</span>`;
    const contact = player.contact
      ? `<a class="member-contact" href="tel:${escapeHtml(player.contact.replace(/[^\d+]/g, ""))}">${escapeHtml(player.contact)}</a>`
      : `<span class="muted">—</span>`;
    return `<div class="members-row" role="row">
      <span class="member-name" role="cell">
        <span class="player-avatar">${escapeHtml(initials(player.name))}</span>
        <span class="member-name-text">
          <span class="member-name-line">${escapeHtml(player.name)}${showMembers && !readOnly ? `<button class="link-button member-edit" type="button" data-edit-member="${escapeHtml(player.id)}" aria-label="Edit ${escapeHtml(player.name)}">Edit</button>` : ""}</span>
          ${player.address ? `<small class="member-address">${escapeHtml(player.address)}</small>` : ""}
        </span>
      </span>
      <span role="cell"><span class="cell-label">Contact</span>${contact}</span>
      <span role="cell"><span class="cell-label">${showMembers ? "Member since" : "Guest"}</span>${second}</span>
      <span role="cell" class="num"><span class="cell-label">Doubles</span>${recordCell(record.doubles, memberSort === "doubles")}</span>
      <span role="cell" class="num"><span class="cell-label">Singles</span>${recordCell(record.singles, memberSort === "singles")}</span>
      <span role="cell" class="num"><span class="cell-label">Games</span>${count}</span>
      <span role="cell" class="num"><span class="cell-label">Win %</span>${rate < 0 ? "—" : `${Math.round(rate * 100)}%`}</span>
      <span role="cell" class="num member-paid"><span class="cell-label">Paid</span>${paid ? `<b>${escapeHtml(formatMoney(paid))}</b>` : `<span class="muted">—</span>`}${owes ? `<a class="owes-tag" href="#payments" data-view-pay="${escapeHtml(player.name)}">${owes} unpaid</a>` : ""}</span>
      <span role="cell" class="num member-last"><span class="cell-label">Last played</span>${last ? escapeHtml(formatSessionDate(last)) : "—"}</span>
    </div>`;
  }).join("");
}

// ---------------------------------------------------------------- payments page

const payFilter = { from: "", to: "", method: "all" };
let payingLaterKey = null; // "sessionId|playerId" of the unpaid row showing method choices

// Every open play, with the running one's live data (its payments live on state.session).
function allSessionsWithLive() {
  const list = Array.isArray(state.sessions) ? [...state.sessions] : [];
  if (state.session) {
    const index = list.findIndex((item) => item.id && item.id === state.session.id);
    if (index >= 0) list[index] = state.session;
    else list.push(state.session);
  }
  return list;
}

function allPayments() {
  return allSessionsWithLive().flatMap((session) => Object.entries(session.payments || {})
    .map(([playerId, payment]) => ({ session, playerId, ...payment })));
}

// Who came but hasn't paid: finished open plays (saved list) + the running one (live roster).
function unpaidEntries() {
  const entries = [];
  for (const session of allSessionsWithLive()) {
    if (!hasFee(session)) continue;
    const paid = session.payments || {};
    let players;
    if (session === state.session) {
      players = paymentSummary().unpaid;
    } else if (session.finishedAt) {
      const ids = Array.isArray(session.unpaidIds) ? session.unpaidIds : null;
      players = ids
        ? ids.map((id) => state.players.find((player) => player.id === id)).filter(Boolean)
        : (session.unpaidNames || []).map((name) => state.players.find((player) => player.name === name)).filter(Boolean);
    } else {
      continue;
    }
    for (const player of players) {
      if (paid[player.id]) continue;
      const due = feeFor(player, session);
      if (due > 0) entries.push({ session, player, due });
    }
  }
  return entries;
}

// Recomputes a session's paid totals after a payment changes.
function refreshSessionPayments(session) {
  const payments = Object.values(session.payments || {});
  session.paidTotal = Math.round(payments.reduce((sum, payment) => sum + payment.amount, 0) * 100) / 100;
  session.paidByMethod = {};
  payments.forEach((payment) => { session.paidByMethod[payment.method] = (session.paidByMethod[payment.method] || 0) + payment.amount; });
  if (Array.isArray(session.unpaidIds)) session.unpaidIds = session.unpaidIds.filter((id) => !session.payments[id]);
  if (Array.isArray(session.unpaidNames)) {
    const paidNames = new Set(payments.map((payment) => payment.name));
    session.unpaidNames = session.unpaidNames.filter((name) => !paidNames.has(name));
  }
  if (typeof session.unpaidCount === "number") session.unpaidCount = (session.unpaidIds || session.unpaidNames || []).length;
}

// A late payment for an open play (the running one, or one already finished).
function markPaidLater(sessionId, playerId, method) {
  if (state.session && state.session.id === sessionId) {
    markPaid(playerId, method);
    return;
  }
  const session = (state.sessions || []).find((item) => item.id === sessionId);
  const player = state.players.find((item) => item.id === playerId);
  if (!session || !player) return;
  const amount = feeFor(player, session);
  session.payments = { ...(session.payments || {}), [playerId]: { method, amount, member: isMember(player), name: player.name, at: new Date().toISOString(), late: true } };
  refreshSessionPayments(session);
  saveState({
    kind: "payment",
    summary: `${player.name} paid ${formatMoney(amount)} · ${paymentLabel(method)} (late, for ${formatSessionDate(session.date)})`,
    details: { player: player.name, method, amount, sessionId, late: true }
  });
}

function inPayRange(date) {
  if (!payFilter.from && !payFilter.to) return true;
  if (!date) return false;
  return (!payFilter.from || date >= payFilter.from) && (!payFilter.to || date <= payFilter.to);
}

function sessionLabel(session) {
  return [formatSessionDate(session.date), session.venue].filter(Boolean).join(" · ");
}

function renderPayments() {
  elements.payFrom.value = payFilter.from;
  elements.payTo.value = payFilter.to;
  elements.payPresets.forEach((chip) => {
    const [from, to] = datePresetRange(chip.dataset.payPreset);
    const active = from === payFilter.from && to === payFilter.to;
    chip.classList.toggle("selected", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  elements.payMethodChips.forEach((chip) => {
    const active = chip.dataset.payFilter === payFilter.method;
    chip.classList.toggle("selected", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  const query = elements.paySearch.value.trim().toLocaleLowerCase();
  const nameMatches = (name) => !query || String(name).toLocaleLowerCase().includes(query);

  // Totals follow the dates + search; the method filter only narrows the payments list.
  const inScope = allPayments().filter((payment) => inPayRange(payment.session.date) && nameMatches(payment.name));
  const shown = inScope
    .filter((payment) => payFilter.method === "all" || payment.method === payFilter.method)
    .sort((a, b) => String(b.at).localeCompare(String(a.at)));
  const unpaid = unpaidEntries()
    .filter((entry) => inPayRange(entry.session.date) && nameMatches(entry.player.name))
    .sort((a, b) => String(b.session.date).localeCompare(String(a.session.date)) || a.player.name.localeCompare(b.player.name));

  const collected = inScope.reduce((sum, payment) => sum + payment.amount, 0);
  const owed = unpaid.reduce((sum, entry) => sum + entry.due, 0);
  const byMethod = {};
  inScope.forEach((payment) => { byMethod[payment.method] = (byMethod[payment.method] || 0) + payment.amount; });
  const sessionsCount = new Set(inScope.map((payment) => payment.session.id || payment.session.date)).size;

  elements.payCollected.textContent = formatMoney(collected);
  elements.payCollectedNote.textContent = inScope.length ? `from ${sessionsCount} open ${sessionsCount === 1 ? "play" : "plays"}` : "no payments yet";
  elements.payCount.textContent = inScope.length;
  const paidMembers = inScope.filter((payment) => payment.member).length;
  const paidGuests = inScope.length - paidMembers;
  elements.payCountNote.textContent = `${paidMembers} ${paidMembers === 1 ? "member" : "members"} · ${paidGuests} ${paidGuests === 1 ? "non-member" : "non-members"}`;
  elements.payUnpaid.textContent = unpaid.length;
  elements.payUnpaidNote.textContent = unpaid.length ? `${formatMoney(owed)} still owed` : "everyone’s paid";
  elements.payMethods.innerHTML = PAYMENT_METHODS.map(([key, label]) => `
    <span class="pay-method-line${byMethod[key] ? "" : " none"}"><span>${label}</span><b>${formatMoney(byMethod[key] || 0)}</b></span>`).join("");

  // Unpaid list with "Mark paid" (late payments).
  elements.unpaidCount.textContent = unpaid.length || "";
  elements.unpaidEmpty.hidden = unpaid.length > 0;
  elements.unpaidList.innerHTML = unpaid.map(({ session, player, due }) => {
    const key = `${session.id}|${player.id}`;
    const choosing = payingLaterKey === key;
    const live = session === state.session;
    return `<div class="pay-row unpaid-row">
      <span class="pay-date">${escapeHtml(formatSessionDate(session.date))}${live ? '<small class="live-tag">IN PROGRESS</small>' : ""}</span>
      <span class="pay-player">${escapeHtml(player.name)} <span class="type-tag ${isMember(player) ? "type-member" : "type-guest"}">${isMember(player) ? "Member" : "Non-member"}</span></span>
      <span class="pay-session">${escapeHtml(session.venue || "Open play")}</span>
      <span class="pay-actions">${readOnly ? "" : choosing
        ? `${PAYMENT_METHODS.map(([method, label]) => `<button class="method-chip" type="button" data-late-method="${method}" data-late-key="${escapeHtml(key)}">${label}</button>`).join("")}
           <button class="link-button pay-cancel" type="button" data-late-cancel aria-label="Cancel">×</button>`
        : `<button class="pay-button" type="button" data-late-open="${escapeHtml(key)}">Mark paid</button>`}</span>
      <span class="num due-chip">${escapeHtml(formatMoney(due))}</span>
    </div>`;
  }).join("");

  // All payments.
  elements.paymentsCount.textContent = shown.length || "";
  elements.paymentsEmpty.hidden = shown.length > 0;
  elements.paymentsList.innerHTML = shown.map((payment) => `<div class="pay-row">
      <span class="pay-date">${escapeHtml(formatSessionDate(payment.session.date))}<small>${payment.at ? escapeHtml(formatLogTime(payment.at)) : ""}${payment.late ? " · late" : ""}</small></span>
      <span class="pay-player">${escapeHtml(payment.name)} <span class="type-tag ${payment.member ? "type-member" : "type-guest"}">${payment.member ? "Member" : "Non-member"}</span></span>
      <span class="pay-session">${escapeHtml(payment.session.venue || "Open play")}</span>
      <span><span class="method-tag method-${escapeHtml(payment.method)}">${escapeHtml(paymentLabel(payment.method))}</span></span>
      <span class="num pay-amount">${escapeHtml(formatMoney(payment.amount))}</span>
    </div>`).join("");
}

// ---------------------------------------------------------------- game log

const LOG_PAGE = 30;
let logEvents = [];
let logLimit = LOG_PAGE;
let logHasMore = false;

const LOG_ICONS = {
  players_added: "＋",
  player_removed: "−",
  players_recovered: "↺",
  members_added: "＋",
  member_updated: "✎",
  session_started: "▶",
  session_finished: "■",
  club_fee_set: "₱",
  payment: "₱",
  payment_undone: "↺",
  round_created: "⤨",
  match_result: "✓",
  result_changed: "↺",
  court_added: "▭",
  court_removed: "▭",
  round_court_added: "＋",
  format_changed: "⇄",
  custom_match: "✎",
  match_edited: "✎",
  court_cleared: "✕",
  court_done: "✓",
  player_in: "●",
  player_out: "○",
  restored: "⟲",
  log_started: "✦"
};

// Fetches the newest log entries (without their board snapshots, which the page doesn't need).
// The board's log covers the open play running now (from when it started).
async function loadLog() {
  if (!db || !club || logMissing) return false;
  // A small margin so the "Open play started" entry shows even if this device's clock runs a bit fast.
  const since = state.session && state.session.startedAt
    ? new Date(new Date(state.session.startedAt).getTime() - 2 * 60000).toISOString()
    : null;
  if (!since) {
    logEvents = [];
    logHasMore = false;
    renderLog();
    return true;
  }
  const { data, error } = await db
    .from("club_events")
    .select("id, created_at, actor_email, kind, summary")
    .eq("club_id", club.id)
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(logLimit + 1);
  if (error) {
    if (error.code === "PGRST205" || error.code === "42P01") logMissing = true;
    else console.error("Game log load failed:", error);
    renderLog();
    return false;
  }
  logHasMore = data.length > logLimit;
  logEvents = data.slice(0, logLimit);
  renderLog();
  return true;
}

function formatLogTime(timestamp) {
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(timestamp));
}

function formatLogDay(timestamp) {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" }).format(date);
}

function renderLog() {
  if (logMissing) {
    elements.logList.innerHTML = "";
    elements.logEmpty.hidden = false;
    elements.logEmpty.textContent = "The game log isn’t set up yet. Run supabase/05_game_log.sql in Supabase to turn it on.";
    elements.logMore.hidden = true;
    return;
  }
  elements.logEmpty.hidden = logEvents.length > 0;
  elements.logEmpty.textContent = state.session
    ? "Every player, game and result this open play will be logged here."
    : "Start an open play to see its changes here.";
  elements.logMore.hidden = !logHasMore;
  let lastDay = "";
  elements.logList.innerHTML = logEvents.map((event, index) => {
    const day = formatLogDay(event.created_at);
    const dayHeading = day !== lastDay ? `<li class="log-day">${escapeHtml(day)}</li>` : "";
    lastDay = day;
    return `${dayHeading}<li class="log-row log-${escapeHtml(event.kind)}">
      <span class="log-icon" aria-hidden="true">${LOG_ICONS[event.kind] || "•"}</span>
      <span class="log-text">
        <span class="log-summary">${escapeHtml(event.summary)}</span>
        <small>${formatLogTime(event.created_at)}${event.actor_email ? ` · ${escapeHtml(event.actor_email)}` : ""}</small>
      </span>
    </li>`;
  }).join("");
}

function teamNames(team) {
  return team.map((player) => player.name).join(" & ");
}

function describeRound(round) {
  const sitting = round.byes.length ? ` · sitting out: ${round.byes.map((player) => player.name).join(", ")}` : "";
  const formats = [...new Set(round.matches.map(matchFormat))];
  const format = formats.length === 1 ? `${FORMATS[formats[0]].label.toLowerCase()} ` : "";
  const mix = formats.length > 1 ? " (singles & doubles)" : "";
  return `Round ${round.number} started · ${round.matches.length} ${format}${round.matches.length === 1 ? "match" : "matches"}${mix}${sitting}`;
}

function matchDetails(round, match) {
  return {
    round: round.number,
    court: match.court,
    teamA: match.teamA.map((player) => player.name),
    teamB: match.teamB.map((player) => player.name),
    winner: match.winner
  };
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

// Splits 2 players (singles) or 4 players (doubles) into two sides.
function makeMatch(players, bracket) {
  const shuffledPlayers = shuffled(players);
  const teamSize = shuffledPlayers.length / 2;
  return {
    id: makeId(),
    format: teamSize === 1 ? "singles" : "doubles",
    teamA: shuffledPlayers.slice(0, teamSize),
    teamB: shuffledPlayers.slice(teamSize, teamSize * 2),
    winner: null,
    bracket
  };
}

// Natural court order: "Court 1", "Court2", "Court 3" … "Court 10". Spaces are ignored so
// "Court2" and "Court 2" sort the same way; numbers compare as numbers.
function compareCourtNames(a, b) {
  const key = (name) => name.replace(/\s+/g, "");
  return key(a).localeCompare(key(b), undefined, { numeric: true, sensitivity: "base" })
    || a.localeCompare(b);
}

// The club's courts, always in court order.
function clubCourts() {
  return (Array.isArray(state.courts) ? [...state.courts] : []).sort((a, b) => compareCourtNames(a.name, b.name));
}

// Each court has its own game type. Courts saved before that existed use whatever they last
// played; anything else (and clubs without courts) uses the club default.
function courtFormat(courtName) {
  const court = clubCourts().find((item) => item.name === courtName);
  if (court && court.format) return court.format;
  for (let r = state.rounds.length - 1; r >= 0; r -= 1) {
    const names = courtsInRound(state.rounds[r]);
    const index = names.lastIndexOf(courtName);
    if (index >= 0) return matchFormat(state.rounds[r].matches[index]);
  }
  return clubFormat();
}

// Which courts a round fills, in order, given how many players are available.
// With courts set, each court takes its own match size; without, as many default-format courts as fit.
function planCourts(playerCount) {
  const courts = clubCourts();
  const plan = [];
  let remaining = playerCount;
  if (courts.length) {
    for (const court of courts) {
      const size = matchSize(courtFormat(court.name));
      if (remaining >= size) {
        plan.push({ name: court.name, size });
        remaining -= size;
      }
    }
  } else {
    const size = matchSize();
    for (let number = 1; remaining >= size; number += 1) {
      plan.push({ name: `Court ${number}`, size });
      remaining -= size;
    }
  }
  return plan;
}

// Fills planned courts in order from an ordered player list. Labels each match by who's in it.
function fillCourts(plan, ordered, labelFor) {
  const queue = [...ordered];
  return plan.map((court) => {
    const match = makeMatch(queue.splice(0, court.size), "Open");
    match.court = court.name;
    match.bracket = labelFor(match);
    return match;
  });
}

// ---- open play sessions

function formatSessionDate(iso) {
  return new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })
    .format(new Date(`${iso}T00:00:00`));
}

// Sets the club's courts to `count` courts of one game type. Existing courts keep their names
// (in court order); missing ones are added as "Court N". "Court2" and "Court 2" count as the same.
function setupCourts(count, format) {
  const kept = clubCourts().slice(0, count).map((court) => ({ ...court, format }));
  const taken = new Set(kept.map((court) => court.name.replace(/\s+/g, "").toLocaleLowerCase()));
  for (let number = 1; kept.length < count; number += 1) {
    if (taken.has(`court${number}`)) continue;
    taken.add(`court${number}`);
    kept.push({ id: makeId(), name: `Court ${number}`, format });
  }
  state.courts = kept;
}

// Saves the current session into the club's list of sessions (one entry per session).
function recordSession(session) {
  const others = (Array.isArray(state.sessions) ? state.sessions : []).filter((item) => !session.id || item.id !== session.id);
  state.sessions = [...others, { ...session }]
    .sort((a, b) => a.date.localeCompare(b.date) || String(a.startedAt).localeCompare(String(b.startedAt)));
}

// Starts (or updates) an open play session. Changing the courts of the running session on the same
// date keeps play going; anything else is a new session, which closes the previous round so every
// court starts open.
function startOpenPlay({ format, courtCount, date, venue = "", startTime = "", endTime = "", feeMember = 0, feeGuest = 0 }) {
  const previous = state.session;
  const live = activeRound();
  const continuing = Boolean(previous && !previous.finishedAt && previous.date === date);
  if (!continuing && live) live.closed = true;
  state.format = format;
  setupCourts(courtCount, format);
  // feePerHead keeps the non-member fee too, for older screens and the club_sessions table.
  const details = { format, courtCount, venue, startTime, endTime, feeMember, feeGuest, feePerHead: feeGuest };
  state.session = continuing
    ? { ...previous, ...details, id: previous.id || makeId() }
    : { id: makeId(), mode: "open_play", ...details, date, startedAt: new Date().toISOString() };
  recordSession(state.session);
  const schedule = formatSchedule(state.session);
  saveState({
    kind: "session_started",
    summary: `${continuing ? "Open play updated" : "Open play started"}${venue ? ` at ${venue}` : ""} · ${formatSessionDate(date)}${schedule ? ` · ${schedule}` : ""} · ${courtCount} ${FORMATS[format].label.toLowerCase()} ${courtCount === 1 ? "court" : "courts"}`,
    details: { ...state.session }
  });
}

// What's been played in this open play (not earlier sessions on the same date).
function sessionTotals(session) {
  const rounds = session === state.session
    ? sessionRounds()
    : state.rounds.filter((round) => round.sessionId && round.sessionId === session.id);
  const games = rounds.flatMap((round) => round.matches.filter((match) => match.winner === "A" || match.winner === "B"));
  const players = new Set(games.flatMap((match) => [...match.teamA, ...match.teamB]).map((player) => player.id));
  const courts = new Set(rounds.flatMap((round) => courtsInRound(round).filter((_, index) => round.matches[index].winner)));
  return { games: games.length, players: players.size, courts: courts.size };
}

// Styled confirmation pop-up. Resolves true when confirmed.
function confirmDialog({ eyebrow = "", title, bodyHtml, confirmLabel = "Confirm" }) {
  elements.confirmEyebrow.textContent = eyebrow;
  elements.confirmTitle.textContent = title;
  elements.confirmBody.innerHTML = bodyHtml;
  elements.confirmOk.textContent = confirmLabel;
  elements.confirmDialog.returnValue = "";
  elements.confirmDialog.showModal();
  elements.confirmCancel.focus();
  return new Promise((resolve) => {
    elements.confirmDialog.addEventListener("close", () => resolve(elements.confirmDialog.returnValue === "confirm"), { once: true });
  });
}

// Asks before finishing, showing what this open play produced.
function confirmFinishOpenPlay() {
  const session = state.session;
  if (!session) return Promise.resolve(false);
  const live = activeRound();
  const unplayed = live ? live.matches.filter((match) => !match.winner).length : 0;
  const present = state.players.filter(isTimedIn).length;
  const totals = sessionTotals(session);
  const schedule = formatSchedule(session);
  const stat = (value, label) => `<span class="confirm-stat"><b>${value}</b>${label}</span>`;
  const attendance = sessionAttendance();
  const fees = feesOf(session);
  const pay = paymentSummary();
  const expected = sessionCollection(session, attendance);
  const money = hasFee(session)
    ? `<p class="confirm-money">${[
        attendance.members ? `${attendance.members} ${attendance.members === 1 ? "member" : "members"} × ${escapeHtml(formatMoney(fees.member))}` : "",
        attendance.guests ? `${attendance.guests} ${attendance.guests === 1 ? "non-member" : "non-members"} × ${escapeHtml(formatMoney(fees.guest))}` : ""
      ].filter(Boolean).join(" + ") || "No one came"} = ${escapeHtml(formatMoney(expected))} expected${pay.count ? `<br>Paid: ${escapeHtml(describeByMethod(pay.byMethod))}` : ""}</p>`
    : "";
  const unpaidPoint = hasFee(session) && pay.unpaid.length
    ? `<li class="warn-point">Not paid yet: ${pay.unpaid.slice(0, 8).map((player) => escapeHtml(player.name)).join(", ")}${pay.unpaid.length > 8 ? ` and ${pay.unpaid.length - 8} more` : ""}.</li>`
    : "";
  const bodyHtml = `
    <p class="confirm-lead">${[escapeHtml(formatSessionDate(session.date)), schedule ? escapeHtml(schedule) : "", `${session.courtCount} ${FORMATS[session.format].label.toLowerCase()} ${session.courtCount === 1 ? "court" : "courts"}`, hasFee(session) ? escapeHtml(feeText(session)) : ""].filter(Boolean).join(" · ")}</p>
    <div class="confirm-stats">
      ${stat(totals.games, totals.games === 1 ? "game" : "games")}
      ${stat(attendance.total, attendance.total === 1 ? "player came" : "players came")}
      ${hasFee(session)
        ? `<span class="confirm-stat money-stat"><b>${escapeHtml(formatMoney(pay.total))}</b>collected of ${escapeHtml(formatMoney(expected))}</span>`
        : stat(totals.courts, totals.courts === 1 ? "court used" : "courts used")}
    </div>
    ${money}
    <ul class="confirm-points">
      ${unplayed ? `<li class="warn-point">${unplayed} ${unplayed === 1 ? "match" : "matches"} still on court without a result will be dropped.</li>` : ""}
      ${unpaidPoint}
      <li>${present ? `${present} ${present === 1 ? "player is" : "players are"} timed in and will be timed out.` : "Everyone is already timed out."}</li>
      <li>This open play is saved to Game History, and the board clears for the next one.</li>
    </ul>`;
  return confirmDialog({
    eyebrow: "FINISH OPEN PLAY",
    title: session.venue || "Open play",
    bodyHtml,
    confirmLabel: "Finish open play"
  });
}

// Ends the open play: drops matches that never got a result, closes the round, times everyone
// out (so attendance has a leave time), and saves the session to history.
// (Ask first with confirmFinishOpenPlay.)
function finishOpenPlay() {
  const session = state.session;
  if (!session) return false;
  const live = activeRound();
  const unplayed = live ? live.matches.filter((match) => !match.winner) : [];
  const totals = sessionTotals(session);
  // Count who came before everyone is timed out (that resets today's roster).
  const attendance = sessionAttendance();
  const attendees = attendance.total;
  const collection = hasFee(session) ? sessionCollection(session, attendance) : 0;
  const pay = paymentSummary();

  const now = new Date().toISOString();
  if (live) {
    live.matches = live.matches.filter((match) => match.winner);
    live.closed = true;
    if (!live.matches.length) state.rounds.splice(state.rounds.indexOf(live), 1);
  }
  const timedOut = state.players.filter(isTimedIn);
  timedOut.forEach((player) => {
    player.status = "out";
    player.timeOut = now;
  });
  const finished = {
    ...session,
    id: session.id || makeId(),
    finishedAt: now,
    games: totals.games,
    players: totals.players,
    attendees,
    membersCame: attendance.members,
    guestsCame: attendance.guests,
    collection,                       // expected: members × member fee + non-members × non-member fee
    paidTotal: pay.total,             // actually paid
    paidByMethod: pay.byMethod,
    unpaidCount: pay.unpaid.length,
    unpaidIds: pay.unpaid.map((player) => player.id),
    unpaidNames: pay.unpaid.map((player) => player.name)
  };
  recordSession(finished);
  state.session = null;
  saveState({
    kind: "session_finished",
    summary: `Open play finished · ${formatSessionDate(finished.date)} · ${totals.games} ${totals.games === 1 ? "game" : "games"} · ${attendees} ${attendees === 1 ? "player" : "players"} came${collection ? ` · ${formatMoney(pay.total)} collected of ${formatMoney(collection)}${pay.unpaid.length ? ` (${pay.unpaid.length} unpaid)` : ""}` : ""}${timedOut.length ? ` · ${timedOut.length} timed out` : ""}`,
    details: { ...finished, droppedMatches: unplayed.length }
  });
  return true;
}

// ---- time in / time out

// Present players can be picked. Players saved before time in/out existed count as in.
function isTimedIn(player) {
  return player.status !== "out";
}

function timedInIds() {
  return new Set(state.players.filter(isTimedIn).map((player) => player.id));
}

// Everyone available to play right now (timed in).
function rosterPlayers() {
  return state.players.filter(isTimedIn).map(({ id, name }) => ({ id, name }));
}

// Players are never deleted, so the history keeps who played. Anyone removed by an older version
// of the app is brought back from the match history, marked Out. Returns the players added.
function recoverPlayersFromHistory() {
  const knownIds = new Set(state.players.map((player) => player.id));
  const knownNames = new Set(state.players.map((player) => player.name.toLocaleLowerCase()));
  const recovered = [];
  for (const round of state.rounds) {
    for (const player of [...round.matches.flatMap((match) => [...match.teamA, ...match.teamB]), ...round.byes]) {
      if (!player || !player.id || !player.name) continue;
      const key = player.name.toLocaleLowerCase();
      // Someone re-added under the same name is the same person; don't make a duplicate.
      if (knownIds.has(player.id) || knownNames.has(key)) continue;
      knownIds.add(player.id);
      knownNames.add(key);
      recovered.push({ id: player.id, name: player.name, wins: 0, losses: 0, status: "out", timeIn: null, timeOut: null });
    }
  }
  state.players.push(...recovered);
  return recovered;
}

// Adds club members from a comma-separated list. They're saved as members but not timed in,
// so they don't appear on today's board until they arrive. A name that's an open play guest
// becomes a member (keeping their history); names that are already members are skipped.
let editingMemberId = null;

// Contact numbers: digits with optional +, spaces, dashes, dots or brackets; 7–15 digits.
function contactProblem(contact) {
  if (!contact) return "";
  if (!/^[+\d][\d\s().-]*$/.test(contact)) return "Contact number can only have digits, spaces, +, - and brackets.";
  const digits = contact.replace(/\D/g, "").length;
  return digits < 7 || digits > 15 ? "Contact number should have 7 to 15 digits." : "";
}

// Adds one member (or updates `editingId`). A name that's an open play guest becomes a member,
// keeping their game history. Returns { message } or { error, field }.
function saveMember({ name, address = "", contact = "" }, editingId = null) {
  const cleanName = String(name).trim().replace(/\s+/g, " ").slice(0, 40);
  const cleanAddress = String(address).trim().replace(/\s+/g, " ").slice(0, 160);
  const cleanContact = String(contact).trim().replace(/\s+/g, " ").slice(0, 20);
  if (!cleanName) return { error: "Enter the member’s name.", field: "name" };
  const problem = contactProblem(cleanContact);
  if (problem) return { error: problem, field: "contact" };
  const sameName = state.players.find((player) => player.name.toLocaleLowerCase() === cleanName.toLocaleLowerCase());
  const now = new Date().toISOString();

  if (editingId) {
    const player = state.players.find((item) => item.id === editingId);
    if (!player) return { error: "That member no longer exists.", field: "name" };
    if (sameName && sameName.id !== player.id) return { error: `Someone else is already called “${sameName.name}”.`, field: "name" };
    const before = player.name;
    Object.assign(player, { name: cleanName, address: cleanAddress, contact: cleanContact });
    saveState({ kind: "member_updated", summary: `Member details updated: ${before === cleanName ? cleanName : `${before} → ${cleanName}`}`, details: { member: cleanName } });
    return { message: `${cleanName}’s details saved.` };
  }
  if (sameName && isMember(sameName)) {
    return { error: `${sameName.name} is already a member — use Edit on their row to change details.`, field: "name" };
  }
  if (sameName) {
    Object.assign(sameName, { memberSince: now, address: cleanAddress, contact: cleanContact });
    saveState({ kind: "members_added", summary: `${sameName.name} is now a member`, details: { members: [sameName.name], fromGuest: true } });
    return { message: `${sameName.name} moved from Guests to Members, with their game history.` };
  }
  const member = { id: makeId(), name: cleanName, address: cleanAddress, contact: cleanContact, wins: 0, losses: 0, status: "out", timeIn: null, timeOut: null, memberSince: now };
  state.players.push(member);
  saveState({ kind: "members_added", summary: `New member: ${cleanName}`, details: { members: [cleanName] } });
  return { message: `${cleanName} added as a member.` };
}

function addMembers(text) {
  const names = String(text).split(/[,\n]+/).map((name) => name.trim().slice(0, 40)).filter(Boolean);
  const known = new Map(state.players.map((player) => [player.name.toLocaleLowerCase(), player]));
  const added = [];
  const promoted = [];
  const existing = [];
  const now = new Date().toISOString();
  for (const name of names) {
    const key = name.toLocaleLowerCase();
    if (known.has(key)) {
      const match = known.get(key);
      // Typed twice in this same list: just skip it.
      if (added.includes(match) || promoted.includes(match)) continue;
      if (isMember(match)) {
        if (!existing.includes(match.name)) existing.push(match.name);
      } else {
        match.memberSince = now;
        promoted.push(match);
      }
      continue;
    }
    const member = { id: makeId(), name, wins: 0, losses: 0, status: "out", timeIn: null, timeOut: null, memberSince: now };
    known.set(key, member);
    added.push(member);
  }
  state.players.push(...added);
  if (added.length || promoted.length) {
    const all = [...added, ...promoted].map((player) => player.name);
    saveState({
      kind: "members_added",
      summary: `New ${all.length === 1 ? "member" : "members"}: ${all.join(", ")}`,
      details: { members: added.map((player) => player.name), fromGuests: promoted.map((player) => player.name) }
    });
  }
  return { added: [...added, ...promoted], promoted, existing };
}

// Today's roster: players timed in now, plus anyone who timed in or played during this open play
// (so someone who leaves early still shows with today's record). Everyone else is only on Members.
function todaysRosterIds() {
  const ids = new Set(state.players.filter(isTimedIn).map((player) => player.id));
  const session = state.session;
  if (session && session.startedAt) {
    state.players.forEach((player) => {
      if (player.timeIn && player.timeIn >= session.startedAt) ids.add(player.id);
    });
  }
  sessionRounds().forEach((round) => round.matches.forEach((match) => {
    [...match.teamA, ...match.teamB].forEach((player) => ids.add(player.id));
  }));
  return ids;
}

function todaysRoster() {
  const ids = todaysRosterIds();
  return state.players.filter((player) => ids.has(player.id));
}

function formatClock(iso) {
  const date = new Date(iso);
  const sameDay = date.toDateString() === new Date().toDateString();
  return new Intl.DateTimeFormat(undefined, sameDay
    ? { hour: "numeric", minute: "2-digit" }
    : { weekday: "short", hour: "numeric", minute: "2-digit" }).format(date);
}

// Times players in or out. Timing in mid-round puts them on the waiting list straight away.
function setPresence(players, status) {
  const changing = players.filter((player) => isTimedIn(player) !== (status === "in"));
  if (!changing.length) return [];
  const now = new Date().toISOString();
  const live = activeRound();
  for (const player of changing) {
    player.status = status;
    if (status === "in") {
      player.timeIn = now;
      player.timeOut = null;
      if (live) {
        const onCourt = live.matches.some((match) => !match.done && [...match.teamA, ...match.teamB].some((p) => p.id === player.id));
        if (!onCourt && !live.byes.some((p) => p.id === player.id)) live.byes.push({ id: player.id, name: player.name });
      }
    } else {
      player.timeOut = now;
    }
  }
  const names = changing.map((player) => player.name).join(", ");
  saveState({
    kind: status === "in" ? "player_in" : "player_out",
    summary: `${names} timed ${status}`,
    details: { players: changing.map((player) => player.name), status }
  });
  return changing;
}

function createFirstRound() {
  const players = shuffled(rosterPlayers());
  const plan = planCourts(players.length);
  const seats = plan.reduce((total, court) => total + court.size, 0);
  const matches = fillCourts(plan, players.slice(0, seats), () => "Open");
  if (!matches.length) return;
  state.rounds.push({ number: 1, date: playDate(), sessionId: currentSessionId(), matches, byes: players.slice(seats) });
  saveState({ kind: "round_created", summary: describeRound(currentRound()), details: { round: 1 } });
  render();
}

function createNextRound() {
  const previous = currentRound();
  if (!previous || !allMatchesPlayed(previous)) return;

  const winnerIds = new Set();
  const challengerIds = new Set();
  for (const match of previous.matches) {
    (match.winner === "A" ? match.teamA : match.teamB).forEach((player) => winnerIds.add(player.id));
    (match.winner === "A" ? match.teamB : match.teamA).forEach((player) => challengerIds.add(player.id));
  }
  // A hand-picked match can put someone on two courts in one round; a win takes priority.
  winnerIds.forEach((id) => challengerIds.delete(id));

  // When courts are limited, players who sat out last round (or just joined) get first pick.
  const players = rosterPlayers();
  const rested = players.filter((player) => !winnerIds.has(player.id) && !challengerIds.has(player.id));
  const played = players.filter((player) => winnerIds.has(player.id) || challengerIds.has(player.id));
  const queue = [...shuffled(rested), ...shuffled(played)];
  const plan = planCourts(players.length);
  const seats = plan.reduce((total, court) => total + court.size, 0);
  const playing = queue.slice(0, seats);
  const byes = queue.slice(seats);

  // Winners play winners: line up winners, then challengers, then everyone else, and fill courts in order.
  const ordered = [
    ...shuffled(playing.filter((player) => winnerIds.has(player.id))),
    ...shuffled(playing.filter((player) => challengerIds.has(player.id))),
    ...shuffled(playing.filter((player) => !winnerIds.has(player.id) && !challengerIds.has(player.id)))
  ];
  const matches = fillCourts(plan, ordered, (match) => {
    const ids = [...match.teamA, ...match.teamB].map((player) => player.id);
    if (ids.every((id) => winnerIds.has(id))) return "Winners";
    if (ids.every((id) => challengerIds.has(id))) return "Challengers";
    return "Mixed";
  });
  if (matches.length === 0) return;

  state.rounds.push({
    number: previous.number + 1,
    date: playDate(),
    sessionId: currentSessionId(),
    matches,
    byes
  });
  saveState({ kind: "round_created", summary: describeRound(currentRound()), details: { round: previous.number + 1 } });
  render();
}

// Court names the round is using (older rounds didn't store them, so fall back to "Court N").
function courtsInRound(round) {
  return round.matches.map((match, index) => match.court || `Court ${index + 1}`);
}

// The rounds that belong to the open play running now. Everything else is history.
// (A round started before rounds were tagged with a session counts if it's still being played.)
function sessionRounds() {
  const session = state.session;
  if (!session) {
    // No open play set up (older data): just the round being played, if any.
    const playing = activeRound();
    return playing ? [playing] : [];
  }
  const live = currentRound();
  return state.rounds.filter((round) => (session.id && round.sessionId === session.id)
    || (!round.sessionId && round === live && !round.closed));
}

function currentSessionId() {
  return state.session && state.session.id ? state.session.id : null;
}

// Each court keeps its own round count within an open play: Court 1 · Round 3 is the 3rd match
// on Court 1 this session. A new open play starts every court again at Round 1.
function courtTimeline(rounds = sessionRounds()) {
  const byCourt = new Map();   // court name → [{ match, round }] in the order played
  const numberOf = new Map();  // match → its court round number
  for (const round of rounds) {
    const names = courtsInRound(round);
    round.matches.forEach((match, index) => {
      const list = byCourt.get(names[index]) || [];
      list.push({ match, round });
      byCourt.set(names[index], list);
      numberOf.set(match, list.length);
    });
  }
  return { byCourt, numberOf };
}

// The round's matches sorted by court (Court 1 first), each with its court name and court round number.
function matchesInCourtOrder(round) {
  const names = courtsInRound(round);
  const { numberOf } = courtTimeline();
  return round.matches
    .map((match, index) => ({ match, court: names[index], courtRound: numberOf.get(match) || 1 }))
    .sort((a, b) => compareCourtNames(a.court, b.court) || a.courtRound - b.courtRound);
}

// The round number the next match on a court would be.
function nextCourtRound(round, courtName) {
  const list = courtTimeline().byCourt.get(courtName);
  return (list ? list.length : 0) + 1;
}

// Puts players who are sitting out onto one more court in the current round (2 for singles, 4 for doubles).
// Uses courtName when given, otherwise the next free court. Returns the new match, or null.
function addCourtToRound(courtName) {
  const round = currentRound();
  if (!round) return null;
  const used = occupiedCourts(round);
  if (courtName && used.has(courtName)) return null;
  const freeCourt = clubCourts().find((court) => !used.has(court.name));
  let number = 1;
  while (used.has(`Court ${number}`)) number += 1;
  const court = courtName || (freeCourt ? freeCourt.name : `Court ${number}`);
  const size = matchSize(courtFormat(court));
  const rosterIds = new Set(state.players.map((player) => player.id));
  // Players who haven't played yet this round go first; those who just finished a match come after.
  const playedThisRound = new Set(round.matches.flatMap((match) => [...match.teamA, ...match.teamB]).map((player) => player.id));
  const presentIds = timedInIds();
  const candidates = round.byes.filter((player) => rosterIds.has(player.id) && presentIds.has(player.id));
  const waiting = [
    ...shuffled(candidates.filter((player) => !playedThisRound.has(player.id))),
    ...shuffled(candidates.filter((player) => playedThisRound.has(player.id)))
  ];
  if (waiting.length < size) return null;
  const match = makeMatch(waiting.splice(0, size), "Mixed");
  match.court = court;
  round.matches.push(match);
  round.byes = waiting;
  saveState({
    kind: "round_court_added",
    summary: `Round ${round.number} · ${match.court} added: ${teamNames(match.teamA)} vs ${teamNames(match.teamB)}`,
    details: matchDetails(round, match)
  });
  render();
  return match;
}

// Takes everyone off a court that hasn't played yet; they go back to waiting and the court opens up.
function clearCourt(matchId) {
  const round = currentRound();
  const index = round ? round.matches.findIndex((item) => item.id === matchId) : -1;
  if (index < 0 || round.matches[index].winner) return;
  const match = round.matches[index];
  const court = courtsInRound(round)[index];
  const players = [...match.teamA, ...match.teamB];
  round.matches.splice(index, 1);
  const waitingIds = new Set(round.byes.map((player) => player.id));
  round.byes.push(...players.filter((player) => !waitingIds.has(player.id)));
  // The round stays even if every court is now clear; nothing is picked automatically.
  saveState({
    kind: "court_cleared",
    summary: `Round ${round.number} · ${court} cleared: ${teamNames(match.teamA)} vs ${teamNames(match.teamB)} back to waiting`,
    details: { ...matchDetails(round, match), court }
  });
  render();
}

// A court finished early: keep the result, send its players back to waiting, and free the court.
function markCourtDone(matchId) {
  const round = currentRound();
  const index = round ? round.matches.findIndex((item) => item.id === matchId) : -1;
  if (index < 0) return;
  const match = round.matches[index];
  if (!match.winner || match.done) return;
  const court = courtsInRound(round)[index];
  match.court = court;
  match.done = true;
  match.doneAt = new Date().toISOString();
  const waitingIds = new Set(round.byes.map((player) => player.id));
  round.byes.push(...[...match.teamA, ...match.teamB].filter((player) => !waitingIds.has(player.id)));
  const winners = match.winner === "A" ? match.teamA : match.teamB;
  saveState({
    kind: "court_done",
    summary: `Round ${round.number} · ${court} done — ${teamNames(winners)} won; court is free`,
    details: { ...matchDetails(round, match), court }
  });
  render();
}

// "Random match here" on an open court. With no round being played, this starts the next round.
function startRandomOnCourt(courtName) {
  let started = null;
  if (!activeRound()) {
    started = upcomingRound();
    delete started.upcoming;
    state.rounds.push(started);
  }
  const match = addCourtToRound(courtName);
  if (!match && started) {
    state.rounds.pop();
    render();
  }
}

// A round whose courts have all been cleared.
function isEmptyRound(round) {
  return Boolean(round) && round.matches.length === 0;
}

// Fills an all-clear round with a fresh random draw (same round number).
function drawIntoEmptyRound() {
  const empty = state.rounds.pop();
  const before = state.rounds.length;
  if (currentRound()) createNextRound();
  else createFirstRound();
  // Not enough players for any court: put the empty round back untouched.
  if (state.rounds.length === before) {
    state.rounds.push(empty);
    render();
  }
}

// ---------------------------------------------------------------- hand-picked matches

let editingMatchId = null;

// The round new matches join: the current one while it's still being played, or once courts have
// been freed with Done (so play can keep rolling on those courts even after every result is in).
function activeRound() {
  const round = currentRound();
  // A round closed by starting a new open play day is history, not the live board.
  if (!round || round.closed) return null;
  return !allMatchesPlayed(round) || round.matches.some((match) => match.done) ? round : null;
}

// Players already on court in an unfinished match (other than the one being edited).
function busyPlayerIds(exceptMatchId) {
  const round = activeRound();
  if (!round) return new Set();
  return new Set(round.matches
    .filter((match) => !match.winner && match.id !== exceptMatchId)
    .flatMap((match) => [...match.teamA, ...match.teamB])
    .map((player) => player.id));
}

function suggestCourt() {
  const round = activeRound();
  const used = round ? occupiedCourts(round) : new Set();
  const free = clubCourts().find((court) => !used.has(court.name));
  if (free) return free.name;
  let number = 1;
  while (used.has(`Court ${number}`)) number += 1;
  return `Court ${number}`;
}

function openMatchDialog({ court, matchId } = {}) {
  if (!canEdit()) return;
  const round = activeRound();
  const match = matchId && round ? round.matches.find((item) => item.id === matchId && !item.winner) : null;
  editingMatchId = match ? match.id : null;
  elements.matchDialogTitle.textContent = match ? `Edit players · ${match.court || "this court"}` : "Pick players";
  elements.matchCourt.value = match ? (match.court || "") : (court || suggestCourt());
  elements.matchCourt.disabled = Boolean(match);
  elements.matchDialogNote.textContent = match
    ? "Swap anyone in. Players you take off go back to the waiting list."
    : round
      ? `This match joins Round ${round.number}.`
      : `This starts Round ${(currentRound() ? currentRound().number : 0) + 1}. Everyone else waits for the next court.`;

  elements.courtOptions.innerHTML = clubCourts().map((item) => `<option value="${escapeHtml(item.name)}"></option>`).join("");
  buildPlayerSlots(match ? matchFormat(match) : courtFormat(elements.matchCourt.value.trim()),
    match ? match.teamA.map((player) => player.name) : [],
    match ? match.teamB.map((player) => player.name) : []);
  setMatchDialogFeedback("");
  elements.matchDialog.showModal();
  const firstEmpty = [...elements.matchDialog.querySelectorAll(".slot-input")].find((input) => !input.value);
  (firstEmpty || elements.teamAInputs.querySelector("input")).focus();
}

// Draws the player boxes for a game type (1 or 2 per team), keeping any names already typed.
function buildPlayerSlots(format, namesA, namesB) {
  const teamSize = FORMATS[format].teamSize;
  elements.matchDialog.dataset.format = format;
  elements.matchDialogFormat.textContent = `${FORMATS[format].label} · ${teamSize} v ${teamSize}`;
  const slot = (side, index, value) => {
    const listId = `suggest-${side}-${index}`;
    return `<div class="slot-wrap">
      <input class="field-input slot-input" type="text" maxlength="40" autocomplete="off" spellcheck="false"
        role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="${listId}"
        data-side="${side}" placeholder="${teamSize === 1 ? "Player" : `Player ${index + 1}`}"
        aria-label="Team ${side} player ${index + 1}" value="${escapeHtml(value || "")}">
      <ul class="suggest-list" id="${listId}" role="listbox" hidden></ul>
    </div>`;
  };
  const fill = (side, names) => Array.from({ length: teamSize }, (_, index) => slot(side, index, names[index] || "")).join("");
  elements.teamAInputs.innerHTML = fill("A", namesA);
  elements.teamBInputs.innerHTML = fill("B", namesB);
}

// Changing the court in a new match switches to that court's game type.
function syncDialogToCourt() {
  if (editingMatchId) return;
  const format = courtFormat(elements.matchCourt.value.trim());
  if (format === elements.matchDialog.dataset.format) return;
  const read = (container) => [...container.querySelectorAll("input")].map((input) => input.value.trim());
  buildPlayerSlots(format, read(elements.teamAInputs), read(elements.teamBInputs));
}

// ---- player suggestions in the Pick players dialog

// Players for a match come only from the open play's Player roster (today's roster).
function pickableRoster() {
  return state.session || activeRound() ? todaysRoster() : state.players.filter(isTimedIn);
}

// Today's roster players matching what's typed (all of them when the box is empty): names that
// start with it first, then names containing it. Leaves out anyone already in another box or
// playing on another court. Timed-out roster players stay listed (highlighted, not selectable).
function slotSuggestions(input) {
  const query = input.value.trim().toLocaleLowerCase();
  const busy = busyPlayerIds(editingMatchId);
  const taken = new Set([...elements.matchDialog.querySelectorAll(".slot-input")]
    .filter((other) => other !== input)
    .map((other) => other.value.trim().toLocaleLowerCase())
    .filter(Boolean));
  return pickableRoster()
    .filter((player) => {
      const name = player.name.toLocaleLowerCase();
      return (!query || name.includes(query)) && !busy.has(player.id) && !taken.has(name);
    })
    .sort((a, b) => {
      if (isTimedIn(a) !== isTimedIn(b)) return isTimedIn(a) ? -1 : 1;
      const aStarts = a.name.toLocaleLowerCase().startsWith(query);
      const bStarts = b.name.toLocaleLowerCase().startsWith(query);
      return aStarts === bStarts ? a.name.localeCompare(b.name) : aStarts ? -1 : 1;
    })
    .slice(0, query ? 8 : 30);
}

function highlightMatch(name, query) {
  if (!query) return escapeHtml(name);
  const start = name.toLocaleLowerCase().indexOf(query);
  if (start < 0) return escapeHtml(name);
  return `${escapeHtml(name.slice(0, start))}<b>${escapeHtml(name.slice(start, start + query.length))}</b>${escapeHtml(name.slice(start + query.length))}`;
}

function suggestListFor(input) {
  return input.parentElement.querySelector(".suggest-list");
}

function hideSuggestions(input) {
  const list = suggestListFor(input);
  if (!list) return;
  list.hidden = true;
  list.innerHTML = "";
  input.setAttribute("aria-expanded", "false");
  input.removeAttribute("aria-activedescendant");
}

// Shows on focus too (with an empty box it lists everyone free on today's roster).
function showSuggestions(input) {
  const list = suggestListFor(input);
  const query = input.value.trim().toLocaleLowerCase();
  const players = slotSuggestions(input);
  if (!query && !players.length) {
    list.innerHTML = '<li class="suggest-empty">No one free on today’s roster. Add players on the Player roster first.</li>';
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    return;
  }
  // Already typed a full (timed-in) name exactly: nothing more to suggest.
  if (players.length === 1 && isTimedIn(players[0]) && players[0].name.toLocaleLowerCase() === query) return hideSuggestions(input);
  // Timed-out players are shown highlighted but aren't options: they use a different class,
  // so clicks, arrow keys and Enter (which look for .suggest-item) skip them.
  let firstOption = -1;
  list.innerHTML = players.length
    ? players.map((player, index) => {
      if (!isTimedIn(player)) {
        return `<li class="suggest-away" aria-disabled="true" title="Timed out — time them in on the roster to pick them">
          <span class="player-avatar">${escapeHtml(initials(player.name))}</span>
          <span>${highlightMatch(player.name, query)}</span>
          <span class="away-tag">Timed out</span>
        </li>`;
      }
      if (firstOption < 0) firstOption = index;
      const active = index === firstOption;
      return `<li class="suggest-item${active ? " active" : ""}" role="option"
        id="${list.id}-${index}" aria-selected="${active}" data-name="${escapeHtml(player.name)}">
        <span class="player-avatar">${escapeHtml(initials(player.name))}</span>
        <span>${highlightMatch(player.name, query)}</span>
      </li>`;
    }).join("")
    : `<li class="suggest-empty">No one called “${escapeHtml(input.value.trim())}” is on today’s roster.</li>`;
  list.hidden = false;
  input.setAttribute("aria-expanded", "true");
  if (firstOption >= 0) input.setAttribute("aria-activedescendant", `${list.id}-${firstOption}`);
  else input.removeAttribute("aria-activedescendant");
}

function moveSuggestion(input, step) {
  const items = [...suggestListFor(input).querySelectorAll(".suggest-item")];
  if (!items.length) return;
  const current = items.findIndex((item) => item.classList.contains("active"));
  const next = (current + step + items.length) % items.length;
  items.forEach((item, index) => {
    item.classList.toggle("active", index === next);
    item.setAttribute("aria-selected", String(index === next));
  });
  input.setAttribute("aria-activedescendant", items[next].id);
  items[next].scrollIntoView({ block: "nearest" });
}

function chooseSuggestion(input, name) {
  input.value = name;
  hideSuggestions(input);
  setMatchDialogFeedback("");
  // Jump to the next empty box so a whole match can be typed quickly.
  const next = [...elements.matchDialog.querySelectorAll(".slot-input")].find((other) => !other.value.trim());
  if (next) next.focus();
}

function setMatchDialogFeedback(message, isError = true) {
  elements.matchDialogFeedback.textContent = message;
  elements.matchDialogFeedback.classList.toggle("error", isError);
}

function saveHandPickedMatch() {
  if (!canEdit()) return;
  const round = activeRound();
  const match = editingMatchId && round ? round.matches.find((item) => item.id === editingMatchId) : null;
  if (editingMatchId && (!match || match.winner)) {
    setMatchDialogFeedback("That match already has a result, so its players can’t be changed.");
    return;
  }
  const format = elements.matchDialog.dataset.format;
  const read = (container) => [...container.querySelectorAll("input")].map((input) => input.value.trim());
  const namesA = read(elements.teamAInputs);
  const namesB = read(elements.teamBInputs);
  if ([...namesA, ...namesB].some((name) => !name)) return setMatchDialogFeedback("Fill in every spot.");

  const lowered = [...namesA, ...namesB].map((name) => name.toLocaleLowerCase());
  if (new Set(lowered).size !== lowered.length) return setMatchDialogFeedback("Each player can only be in one spot.");

  // Every name must be on today's Player roster (matched ignoring case).
  const roster = pickableRoster();
  const byName = new Map(roster.map((player) => [player.name.toLocaleLowerCase(), player]));
  const unknown = [...namesA, ...namesB].find((name) => !byName.has(name.toLocaleLowerCase()));
  if (unknown) {
    const hint = roster.filter((player) => player.name.toLocaleLowerCase().includes(unknown.toLocaleLowerCase()));
    return setMatchDialogFeedback(hint.length === 1
      ? `“${unknown}” isn’t on today’s roster. Did you mean ${hint[0].name}?`
      : `“${unknown}” isn’t on today’s roster. Add them on the Player roster first.`);
  }
  const resolve = (name) => {
    const player = byName.get(name.toLocaleLowerCase());
    return { id: player.id, name: player.name };
  };
  const teamA = namesA.map(resolve);
  const teamB = namesB.map(resolve);
  const chosen = [...teamA, ...teamB];

  const busy = busyPlayerIds(editingMatchId);
  const clash = chosen.find((player) => busy.has(player.id));
  if (clash) return setMatchDialogFeedback(`${clash.name} is already playing on another court.`);
  const away = chosen.find((player) => !isTimedIn(byName.get(player.name.toLocaleLowerCase())));
  if (away) return setMatchDialogFeedback(`${away.name} is timed out. Time them in on the roster first.`);

  const courtName = (match ? match.court : elements.matchCourt.value.trim()) || suggestCourt();
  if (!match && round && occupiedCourts(round).has(courtName)) {
    const onCourt = round.matches[courtsInRound(round).findIndex((name, index) => name === courtName && !round.matches[index].done)];
    return setMatchDialogFeedback(onCourt && onCourt.winner
      ? `${courtName} has finished — click Done on it first to free the court.`
      : `${courtName} already has a match in progress. Pick another court.`);
  }

  const chosenIds = new Set(chosen.map((player) => player.id));
  let event;
  if (match) {
    const before = `${teamNames(match.teamA)} vs ${teamNames(match.teamB)}`;
    const benched = [...match.teamA, ...match.teamB].filter((player) => !chosenIds.has(player.id));
    match.teamA = teamA;
    match.teamB = teamB;
    round.byes = [...round.byes.filter((player) => !chosenIds.has(player.id)), ...benched];
    event = {
      kind: "match_edited",
      summary: `Round ${round.number} · ${match.court}: changed ${before} → ${teamNames(teamA)} vs ${teamNames(teamB)}`,
      details: matchDetails(round, match)
    };
  } else {
    const created = { id: makeId(), format, teamA, teamB, winner: null, bracket: "Custom", court: courtName };
    let target = round;
    if (target) {
      target.matches.push(created);
      target.byes = target.byes.filter((player) => !chosenIds.has(player.id));
    } else {
      target = {
        number: (currentRound() ? currentRound().number : 0) + 1,
        date: playDate(),
        sessionId: currentSessionId(),
        matches: [created],
        byes: rosterPlayers().filter((player) => !chosenIds.has(player.id))
      };
      state.rounds.push(target);
    }
    event = {
      kind: "custom_match",
      summary: `Round ${target.number} · ${courtName}: ${teamNames(teamA)} vs ${teamNames(teamB)} (picked by hand)`,
      details: matchDetails(target, created)
    };
  }
  saveState(event);
  elements.matchDialog.close();
  render();
}

function recordWinner(matchId, winner) {
  const round = currentRound();
  const match = round && round.matches.find((item) => item.id === matchId);
  if (!match || match.winner === winner) return;
  const changed = Boolean(match.winner);

  if (match.winner) {
    const previousWinners = match.winner === "A" ? match.teamA : match.teamB;
    const previousLosers = match.winner === "A" ? match.teamB : match.teamA;
    updateRecord(previousWinners, "wins", -1);
    updateRecord(previousLosers, "losses", -1);
  }

  match.winner = winner;
  match.playedAt = new Date().toISOString();
  const winningTeam = winner === "A" ? match.teamA : match.teamB;
  const losingTeam = winner === "A" ? match.teamB : match.teamA;
  updateRecord(winningTeam, "wins", 1);
  updateRecord(losingTeam, "losses", 1);
  const court = match.court || `Court ${round.matches.indexOf(match) + 1}`;
  saveState({
    kind: changed ? "result_changed" : "match_result",
    summary: `Round ${round.number} · ${court}: ${teamNames(winningTeam)} ${changed ? "now marked as beating" : "beat"} ${teamNames(losingTeam)}`,
    details: matchDetails(round, match)
  });
  render();
}

function updateRecord(team, key, amount) {
  for (const matchPlayer of team) {
    const player = state.players.find((item) => item.id === matchPlayer.id);
    if (player) player[key] = Math.max(0, (player[key] || 0) + amount);
  }
}

// ---- add players one at a time (member / non-member)

function setNewPlayerType(type) {
  newPlayerType = type === "member" ? "member" : "guest";
  elements.playerTypeButtons.forEach((button) => {
    const selected = button.dataset.playerType === newPlayerType;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function rosterFeedback(message, isError = false) {
  elements.rosterFeedback.textContent = message;
  elements.rosterFeedback.classList.toggle("error", isError);
}

let hideSuggestTimer = null;

// syncType: while typing, a full existing name sets the switch to what that person is. When the
// switch itself is clicked, the choice stands (e.g. Member on a non-member's name = make them a member).
function showPlayerSuggestions({ syncType = true } = {}) {
  // Clicking the Member / Non-member switch blurs the input; don't let that hide the fresh list.
  clearTimeout(hideSuggestTimer);
  const query = elements.playerInput.value.trim().toLocaleLowerCase();
  const list = elements.playerSuggest;
  const existing = state.players.find((player) => player.name.toLocaleLowerCase() === query);
  if (existing && syncType) setNewPlayerType(isMember(existing) ? "member" : "guest");
  // Only people of the selected type: Member → members, Non-member → non-members.
  const wantMember = newPlayerType === "member";
  const matches = query
    ? state.players
      .filter((player) => player.name.toLocaleLowerCase().includes(query) && !isTimedIn(player) && isMember(player) === wantMember)
      .sort((a, b) => (b.name.toLocaleLowerCase().startsWith(query) - a.name.toLocaleLowerCase().startsWith(query))
        || a.name.localeCompare(b.name))
      .slice(0, 8)
    : [];
  if (!matches.length && query) {
    // Nothing of this type — but say so if the other type has matches.
    const others = state.players.filter((player) => player.name.toLocaleLowerCase().includes(query) && !isTimedIn(player) && isMember(player) !== wantMember).length;
    if (others) {
      list.innerHTML = `<li class="suggest-empty">No ${wantMember ? "members" : "non-members"} match “${escapeHtml(elements.playerInput.value.trim())}”. ${others} ${wantMember ? (others === 1 ? "non-member does" : "non-members do") : (others === 1 ? "member does" : "members do")} — switch to ${wantMember ? "Non-member" : "Member"} to see ${others === 1 ? "them" : "them"}.</li>`;
      list.hidden = false;
      elements.playerInput.setAttribute("aria-expanded", "true");
      return;
    }
  }
  if (!matches.length || (matches.length === 1 && matches[0] === existing)) {
    list.hidden = true;
    list.innerHTML = "";
    elements.playerInput.setAttribute("aria-expanded", "false");
    return;
  }
  list.innerHTML = matches.map((player, index) => `<li class="suggest-item${index === 0 ? " active" : ""}" role="option" id="player-suggest-${index}"
      aria-selected="${index === 0}" data-pick-player="${escapeHtml(player.id)}">
      <span class="player-avatar">${escapeHtml(initials(player.name))}</span>
      <span class="suggest-name">${highlightMatch(player.name, query)}</span>
      <span class="type-tag ${isMember(player) ? "type-member" : "type-guest"}">${isMember(player) ? "Member" : "Non-member"}</span>
    </li>`).join("");
  list.hidden = false;
  elements.playerInput.setAttribute("aria-expanded", "true");
}

function hidePlayerSuggestions() {
  elements.playerSuggest.hidden = true;
  elements.playerSuggest.innerHTML = "";
  elements.playerInput.setAttribute("aria-expanded", "false");
}

function pickSuggestedPlayer(id) {
  const player = state.players.find((item) => item.id === id);
  if (!player) return;
  elements.playerInput.value = player.name;
  setNewPlayerType(isMember(player) ? "member" : "guest");
  hidePlayerSuggestions();
  elements.playerInput.focus();
}

// Adds (or times back in) one player. An existing non-member marked "Member" becomes a member.
function addOnePlayer(name, type) {
  const existing = state.players.find((player) => player.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  const now = new Date().toISOString();
  if (existing) {
    if (isTimedIn(existing) && todaysRosterIds().has(existing.id)) return { error: `${existing.name} is already here.` };
    if (type === "member" && !isMember(existing)) makeMember(existing);
    setPresence([existing], "in");
    return { message: `${existing.name} is in (${isMember(existing) ? "member" : "non-member"}).` };
  }
  const player = { id: makeId(), name, wins: 0, losses: 0, status: "in", timeIn: now, timeOut: null };
  if (type === "member") player.memberSince = now;
  state.players.push(player);
  // Mid-round arrivals join the waiting list, so they can fill an open court right away.
  const round = activeRound();
  if (round) round.byes.push({ id: player.id, name: player.name });
  saveState({
    kind: "players_added",
    summary: `Added ${type === "member" ? "member" : "non-member"}: ${player.name}`,
    details: { players: [player.name], member: type === "member" }
  });
  return { message: `${player.name} added as a ${type === "member" ? "member" : "non-member"}.` };
}

elements.addPlayerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canEdit()) return;
  const name = elements.playerInput.value.trim().slice(0, 40);
  if (!name) {
    rosterFeedback("Type a player name to add.", true);
    elements.playerInput.focus();
    return;
  }
  const result = addOnePlayer(name, newPlayerType);
  rosterFeedback(result.error || result.message, Boolean(result.error));
  if (!result.error) {
    elements.playerInput.value = "";
    setNewPlayerType("guest");
  }
  hidePlayerSuggestions();
  render();
  elements.playerInput.focus();
});

elements.playerInput.addEventListener("input", () => showPlayerSuggestions());
elements.playerInput.addEventListener("keydown", (event) => {
  const items = [...elements.playerSuggest.querySelectorAll(".suggest-item")];
  if (elements.playerSuggest.hidden || !items.length) return;
  const current = items.findIndex((item) => item.classList.contains("active"));
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const next = (current + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items.forEach((item, index) => {
      item.classList.toggle("active", index === next);
      item.setAttribute("aria-selected", String(index === next));
    });
  } else if (event.key === "Enter" && current >= 0) {
    event.preventDefault();
    pickSuggestedPlayer(items[current].dataset.pickPlayer);
  } else if (event.key === "Escape") {
    hidePlayerSuggestions();
  }
});
elements.playerInput.addEventListener("blur", () => {
  clearTimeout(hideSuggestTimer);
  hideSuggestTimer = setTimeout(hidePlayerSuggestions, 150);
});
elements.playerSuggest.addEventListener("mousedown", (event) => {
  const item = event.target.closest("[data-pick-player]");
  if (!item) return;
  event.preventDefault();
  pickSuggestedPlayer(item.dataset.pickPlayer);
});
// Switching Member / Non-member refreshes the suggestions to that type.
elements.playerTypeButtons.forEach((button) => button.addEventListener("click", () => {
  setNewPlayerType(button.dataset.playerType);
  if (elements.playerInput.value.trim()) {
    showPlayerSuggestions({ syncType: false });
    elements.playerInput.focus();
  }
}));

// Payments on the roster: Mark paid → choose method → Paid (Undo to reverse).
elements.playerList.addEventListener("click", (event) => {
  const open = event.target.closest("[data-pay-open]");
  const method = event.target.closest("[data-pay-method]");
  const cancel = event.target.closest("[data-pay-cancel]");
  const undo = event.target.closest("[data-unpay]");
  if (!open && !method && !cancel && !undo) return;
  if (!canEdit()) return;
  if (open) payingPlayerId = open.dataset.payOpen;
  if (cancel) payingPlayerId = null;
  if (method) {
    markPaid(method.dataset.payPlayer, method.dataset.payMethod);
    payingPlayerId = null;
  }
  if (undo) markUnpaid(undo.dataset.unpay);
  render();
});

elements.matchesList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-match-id]");
  if (button && canEdit()) recordWinner(button.dataset.matchId, button.dataset.winner);
  const startButton = event.target.closest("[data-start-court]");
  if (startButton && canEdit()) startRandomOnCourt(startButton.dataset.startCourt);
  const pickButton = event.target.closest("[data-pick-court]");
  if (pickButton) openMatchDialog({ court: pickButton.dataset.pickCourt });
  const editButton = event.target.closest("[data-edit-match]");
  if (editButton) openMatchDialog({ matchId: editButton.dataset.editMatch });
  const clearButton = event.target.closest("[data-clear-match]");
  if (clearButton && canEdit()) clearCourt(clearButton.dataset.clearMatch);
  const doneButton = event.target.closest("[data-done-match]");
  if (doneButton && canEdit()) markCourtDone(doneButton.dataset.doneMatch);
});

elements.addCourtForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canEdit()) return;
  const names = elements.courtInput.value.split(/[,\n]+/).map((name) => name.trim()).filter(Boolean);
  const round = currentRound();
  const existing = clubCourts();
  const known = new Set(existing.map((court) => court.name.toLocaleLowerCase()));

  // A club's first courts: keep the ones the current round is already playing on,
  // otherwise "Court 1" would vanish from the next round.
  const carried = [];
  if (!existing.length && round) {
    const names = courtsInRound(round);
    for (const name of new Set(names)) {
      known.add(name.toLocaleLowerCase());
      // Keep the game type that court is already playing.
      carried.push({ id: makeId(), name, format: matchFormat(round.matches[names.indexOf(name)]) });
    }
  }

  const added = [];
  for (const name of names) {
    const key = name.toLocaleLowerCase();
    if (known.has(key)) continue;
    known.add(key);
    added.push({ id: makeId(), name: name.slice(0, 40), format: clubFormat() });
  }
  if (!names.length) {
    // Blank submit adds the next numbered court, so "Add court" works with one click.
    let number = existing.length + carried.length + 1;
    while (known.has(`court ${number}`)) number += 1;
    added.push({ id: makeId(), name: `Court ${number}`, format: clubFormat() });
  }
  if (!added.length && !carried.length) {
    elements.courtFeedback.textContent = "That court is already on the list.";
    elements.courtFeedback.classList.add("error");
    return;
  }

  const newCourts = [...carried, ...added];
  state.courts = [...existing, ...newCourts];
  saveState({
    kind: "court_added",
    summary: `Added ${newCourts.length === 1 ? "court" : "courts"}: ${newCourts.map((court) => court.name).join(", ")}`,
    details: { courts: newCourts.map((court) => court.name) }
  });

  // Mid-round: put players who are sitting out straight onto the new courts.
  const placed = [];
  if (round && !allMatchesPlayed(round)) {
    for (const court of added) {
      const match = addCourtToRound(court.name);
      if (!match) break;
      placed.push(`${match.court}: ${teamNames(match.teamA)} vs ${teamNames(match.teamB)}`);
    }
  }

  const addedNames = added.map((court) => court.name).join(", ");
  const carriedNote = carried.length ? `${carried.map((court) => court.name).join(", ")} (already in use) and ` : "";
  let message = `${carriedNote}${addedNames || "courts"} added.`;
  if (placed.length) {
    message += ` Now playing — ${placed.join(" · ")}.`;
  } else if (round && !allMatchesPlayed(round) && added.length) {
    const waiting = round.byes.length;
    const needed = matchSize(courtFormat(added[0].name)) - waiting;
    message += ` It’s open on the match board — ${needed} more ${needed === 1 ? "player" : "players"} needed to start a match there.`;
  } else {
    message += ` New rounds use up to ${state.courts.length} ${state.courts.length === 1 ? "court" : "courts"}.`;
  }
  elements.courtInput.value = "";
  elements.courtFeedback.textContent = message;
  elements.courtFeedback.classList.remove("error");
  render();
});

elements.presenceAll.forEach((button) => {
  button.addEventListener("click", () => {
    if (!canEdit()) return;
    const status = button.dataset.presenceAll;
    // Only today's roster; anyone else is added by typing their name in "Add players".
    const changed = setPresence(todaysRoster(), status);
    elements.rosterFeedback.textContent = changed.length
      ? `${changed.length} ${changed.length === 1 ? "player" : "players"} timed ${status}.`
      : "";
    elements.rosterFeedback.classList.remove("error");
    render();
  });
});

elements.sortHeads.forEach((head) => {
  head.addEventListener("click", () => {
    // Clicking the active ranking again goes back to roster order.
    rosterSort = rosterSort === head.dataset.sort ? "roster" : head.dataset.sort;
    renderPlayers();
  });
});

elements.matchDialogClose.addEventListener("click", () => elements.matchDialog.close());
elements.matchDialogCancel.addEventListener("click", () => elements.matchDialog.close());
elements.matchDialogForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveHandPickedMatch();
});

elements.matchCourt.addEventListener("input", syncDialogToCourt);

// Player suggestions: open from the first letter typed.
elements.matchDialog.addEventListener("input", (event) => {
  if (event.target.classList.contains("slot-input")) showSuggestions(event.target);
});

elements.matchDialog.addEventListener("keydown", (event) => {
  const input = event.target;
  if (!input.classList || !input.classList.contains("slot-input")) return;
  const list = suggestListFor(input);
  const open = list && !list.hidden;
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    if (!open) showSuggestions(input);
    else moveSuggestion(input, event.key === "ArrowDown" ? 1 : -1);
  } else if (event.key === "Enter" && open) {
    const active = list.querySelector(".suggest-item.active");
    if (active) {
      event.preventDefault();
      chooseSuggestion(input, active.dataset.name);
    }
  } else if (event.key === "Escape" && open) {
    // Close the suggestions, not the whole dialog.
    event.preventDefault();
    hideSuggestions(input);
  }
});

// mousedown (not click) so the choice lands before the box loses focus.
elements.matchDialog.addEventListener("mousedown", (event) => {
  // Clicking a timed-out name does nothing (and keeps the list open).
  if (event.target.closest(".suggest-away")) {
    event.preventDefault();
    return;
  }
  const item = event.target.closest(".suggest-item");
  if (!item) return;
  event.preventDefault();
  chooseSuggestion(item.closest(".slot-wrap").querySelector(".slot-input"), item.dataset.name);
});

// Clicking into a player box lists today's roster straight away.
elements.matchDialog.addEventListener("focusin", (event) => {
  if (event.target.classList && event.target.classList.contains("slot-input")) showSuggestions(event.target);
});

elements.matchDialog.addEventListener("focusout", (event) => {
  if (event.target.classList && event.target.classList.contains("slot-input")) hideSuggestions(event.target);
});

elements.formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const format = button.dataset.format;
    if (format === clubFormat() || !canEdit()) return;
    state.format = format;
    const round = currentRound();
    const midRound = round && !allMatchesPlayed(round);
    saveState({
      kind: "format_changed",
      summary: `Switched to ${FORMATS[format].label.toLowerCase()}`,
      details: { format }
    });
    elements.formatFeedback.textContent = midRound
      ? `${FORMATS[format].label} from now on. Matches already on the board stay as they are.`
      : `${FORMATS[format].label} it is — the next round uses ${matchSize()} players per court.`;
    render();
  });
});


elements.logMore.addEventListener("click", () => {
  logLimit += LOG_PAGE;
  loadLog();
});

// Per-court game type.
elements.courtList.addEventListener("click", (event) => {
  const option = event.target.closest("[data-court-format]");
  if (!option || !canEdit()) return;
  const format = option.dataset.courtFormat;
  const court = (state.courts || []).find((item) => item.id === option.dataset.courtId);
  if (!court || courtFormat(court.name) === format) return;
  court.format = format;
  saveState({
    kind: "format_changed",
    summary: `${court.name} switched to ${FORMATS[format].label.toLowerCase()}`,
    details: { court: court.name, format }
  });
  const round = currentRound();
  const playing = round && !allMatchesPlayed(round) && round.matches.some((match, index) => courtsInRound(round)[index] === court.name && !match.winner);
  elements.courtFeedback.textContent = playing
    ? `${court.name} is ${FORMATS[format].label.toLowerCase()} from its next match. The match on it now stays as it is.`
    : `${court.name} is now a ${FORMATS[format].label.toLowerCase()} court (${matchSize(format)} players).`;
  elements.courtFeedback.classList.remove("error");
  render();
});

elements.courtList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove-court]");
  if (!button || !canEdit()) return;
  const removedCourt = clubCourts().find((court) => court.id === button.dataset.removeCourt);
  state.courts = clubCourts().filter((court) => court.id !== button.dataset.removeCourt);
  saveState({
    kind: "court_removed",
    summary: `Removed court: ${removedCourt ? removedCourt.name : "unknown"}`,
    details: { court: removedCourt ? removedCourt.name : null }
  });
  elements.courtFeedback.textContent = state.courts.length
    ? "Court removed. Matches already on the board keep their court."
    : "No courts set, so rounds use as many courts as needed.";
  elements.courtFeedback.classList.remove("error");
  render();
});

// Time a player in or out (from the roster or the Members page).
function handlePresenceClick(event) {
  const toggle = event.target.closest("[data-presence-set]");
  if (!toggle || !canEdit()) return;
  const player = state.players.find((item) => item.id === toggle.dataset.player);
  const status = toggle.dataset.presenceSet;
  // Already in that state (e.g. clicking "In" on someone who's in): nothing to change.
  if (!player || isTimedIn(player) === (status === "in")) return;
  setPresence([player], status);
  const live = activeRound();
  const onCourt = live && live.matches.some((match) => !match.winner && [...match.teamA, ...match.teamB].some((p) => p.id === player.id));
  elements.rosterFeedback.textContent = status === "out" && onCourt
    ? `${player.name} timed out — they’re still on court for their current match, but won’t be picked again.`
    : `${player.name} timed ${status} at ${formatClock(new Date().toISOString())}.`;
  elements.rosterFeedback.classList.remove("error");
  render();
}
elements.playerList.addEventListener("click", handlePresenceClick);
elements.membersBody.addEventListener("click", (event) => {
  // "1 unpaid" → Payments page, searched to that person.
  const owes = event.target.closest("[data-view-pay]");
  if (owes) {
    elements.paySearch.value = owes.dataset.viewPay;
    return; // the link's #payments opens the page
  }
  const edit = event.target.closest("[data-edit-member]");
  if (edit && canEdit()) {
    const member = state.players.find((item) => item.id === edit.dataset.editMember);
    if (member) startEditingMember(member);
    return;
  }
  const button = event.target.closest("[data-make-member]");
  if (!button || !canEdit()) return;
  const player = state.players.find((item) => item.id === button.dataset.makeMember);
  if (makeMember(player)) {
    elements.memberFeedback.textContent = `${player.name} is now a member. Their game history comes with them.`;
    elements.memberFeedback.classList.remove("error");
    render();
  }
});

// Members page: add a member (name, address, contact number) or edit one.
function memberFeedback(message, isError = false) {
  elements.memberFeedback.textContent = message;
  elements.memberFeedback.classList.toggle("error", isError);
}

function resetMemberForm() {
  editingMemberId = null;
  elements.addMemberForm.reset();
  elements.memberFormTitle.textContent = "NEW MEMBER";
  elements.memberSubmit.textContent = "Add member";
  elements.memberCancelEdit.hidden = true;
}

function startEditingMember(player) {
  editingMemberId = player.id;
  elements.memberInput.value = player.name;
  elements.memberAddress.value = player.address || "";
  elements.memberContact.value = player.contact || "";
  elements.memberFormTitle.textContent = `EDIT MEMBER · ${player.name.toUpperCase()}`;
  elements.memberSubmit.textContent = "Save changes";
  elements.memberCancelEdit.hidden = false;
  memberFeedback("");
  elements.addMemberForm.scrollIntoView({ block: "nearest", behavior: "smooth" });
  elements.memberInput.focus();
}

elements.addMemberForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canEdit()) return;
  const result = saveMember({
    name: elements.memberInput.value,
    address: elements.memberAddress.value,
    contact: elements.memberContact.value
  }, editingMemberId);
  memberFeedback(result.error || result.message, Boolean(result.error));
  if (result.error) {
    (result.field === "contact" ? elements.memberContact : elements.memberInput).focus();
    return;
  }
  resetMemberForm();
  render();
  elements.memberInput.focus();
});
elements.memberCancelEdit.addEventListener("click", () => {
  resetMemberForm();
  memberFeedback("");
});

// Board / Game History / Members.
// Game History and Members open over the format choice; the Board needs an open play first,
// so going to it without one brings the choice back.
function goToView(view) {
  if (view === "board" && !state.session && !readOnly && club) {
    showView("board");
    showModePicker();
    return;
  }
  if (!elements.modePicker.hidden && view !== "board") hideModePicker();
  showView(view);
}
window.addEventListener("hashchange", () => goToView(viewFromHash()));
// Clicking the page you're already on doesn't change the address, so handle clicks directly too.
document.querySelectorAll("[data-view], [data-go-view]").forEach((link) => {
  link.addEventListener("click", () => goToView(link.dataset.view || link.dataset.goView));
});
// Payments page: filters and late payments.
[elements.payFrom, elements.payTo].forEach((input) => input.addEventListener("change", () => {
  payFilter.from = elements.payFrom.value;
  payFilter.to = elements.payTo.value;
  if (payFilter.from && payFilter.to && payFilter.from > payFilter.to) {
    if (input === elements.payTo) payFilter.from = payFilter.to;
    else payFilter.to = payFilter.from;
  }
  renderPayments();
}));
elements.payPresets.forEach((chip) => chip.addEventListener("click", () => {
  [payFilter.from, payFilter.to] = datePresetRange(chip.dataset.payPreset);
  renderPayments();
}));
elements.payMethodChips.forEach((chip) => chip.addEventListener("click", () => {
  payFilter.method = chip.dataset.payFilter;
  renderPayments();
}));
elements.paySearch.addEventListener("input", renderPayments);
elements.unpaidList.addEventListener("click", (event) => {
  const open = event.target.closest("[data-late-open]");
  const method = event.target.closest("[data-late-method]");
  const cancel = event.target.closest("[data-late-cancel]");
  if (!open && !method && !cancel) return;
  if (!canEdit()) return;
  if (open) payingLaterKey = open.dataset.lateOpen;
  if (cancel) payingLaterKey = null;
  if (method) {
    const [sessionId, playerId] = method.dataset.lateKey.split("|");
    markPaidLater(sessionId, playerId, method.dataset.lateMethod);
    payingLaterKey = null;
  }
  render();
});

// Game History date filter.
[elements.historyFrom, elements.historyTo].forEach((input) => input.addEventListener("change", () => {
  setHistoryRange(elements.historyFrom.value, elements.historyTo.value, input === elements.historyTo ? "to" : "from");
}));
elements.datePresets.forEach((chip) => chip.addEventListener("click", () => {
  setHistoryRange(...datePresetRange(chip.dataset.datePreset));
}));
// Searching, switching Members/Guests or re-sorting starts again at page 1.
elements.memberSearch.addEventListener("input", () => {
  memberPage = 1;
  renderMembers();
});
elements.memberFilters.forEach((chip) => chip.addEventListener("click", () => {
  memberFilter = chip.dataset.memberFilter;
  memberPage = 1;
  renderMembers();
}));
elements.memberSortHeads.forEach((head) => head.addEventListener("click", () => {
  memberSort = head.dataset.memberSort;
  memberPage = 1;
  renderMembers();
}));
elements.membersPager.addEventListener("click", (event) => {
  const button = event.target.closest("[data-member-page]");
  if (!button || button.disabled) return;
  memberPage = Number(button.dataset.memberPage);
  renderMembers();
  document.querySelector("#members-view .view-toolbar").scrollIntoView({ block: "start", behavior: "smooth" });
});

// Format choice and open play setup.
elements.chooseOpenPlay.addEventListener("click", openSessionDialog);
elements.sessionFormatButtons.forEach((button) => button.addEventListener("click", () => setSessionFormat(button.dataset.sessionFormat)));
elements.sessionStepButtons.forEach((button) => button.addEventListener("click", () => {
  elements.sessionCourts.value = Math.min(20, Math.max(1, sessionCourtCount() + Number(button.dataset.step)));
}));
elements.sessionDate.addEventListener("input", updateSessionNote);
[elements.sessionFeeMember, elements.sessionFeeGuest].forEach((input) => input.addEventListener("input", updateFeeHint));
// Closing or going back returns to the format choice; the dashboard opens only after setup.
[elements.sessionClose, elements.sessionBack].forEach((button) => button.addEventListener("click", () => elements.sessionDialog.close()));
elements.sessionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!canEdit()) return;
  // While an open play is running this only updates it — never starts a second one.
  const date = state.session ? state.session.date : elements.sessionDate.value;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    elements.sessionFeedback.textContent = "Pick the open play date.";
    elements.sessionFeedback.classList.add("error");
    return;
  }
  const venue = elements.sessionVenue.value.trim();
  const startTime = elements.sessionStart.value;
  const endTime = elements.sessionEnd.value;
  const memberFee = typedFee(elements.sessionFeeMember);
  const guestFee = typedFee(elements.sessionFeeGuest);
  const badFee = (fee) => !Number.isFinite(fee) || fee < 0;
  const problem = !venue ? "Enter the venue name."
    : badFee(memberFee) ? "Member fee must be 0 or more (leave it empty for free)."
      : badFee(guestFee) ? "Non-member fee must be 0 or more (leave it empty for free)."
        : !startTime || !endTime ? "Set the start and end time."
          : endTime <= startTime ? "The end time needs to be after the start time."
            : "";
  if (problem) {
    elements.sessionFeedback.textContent = problem;
    elements.sessionFeedback.classList.add("error");
    return;
  }
  const fees = { member: Math.round(memberFee * 100) / 100, guest: Math.round(guestFee * 100) / 100 };
  if (elements.sessionFeeDefault.checked) setClubDefaultFees(fees);
  startOpenPlay({ format: sessionFormat, courtCount: sessionCourtCount(), date, venue, startTime, endTime, feeMember: fees.member, feeGuest: fees.guest });
  elements.sessionDialog.close();
  hideModePicker();
  render();
});
// Banner "Change": edit the running open play's setup.
elements.sessionChange.addEventListener("click", () => {
  if (canEdit()) openSessionDialog();
});
// Choice screen: carry on with the open play that's still running…
elements.runningContinue.addEventListener("click", () => {
  hideModePicker();
  if (location.hash !== "#board") location.hash = "board";
  else showView("board");
});
// …or finish it there, then set up the next one.
elements.runningFinish.addEventListener("click", async () => {
  if (!canEdit() || !(await confirmFinishOpenPlay()) || !finishOpenPlay()) return;
  logEvents = [];
  logHasMore = false;
  render();
  showModePicker();
});
elements.sessionFinish.addEventListener("click", async () => {
  if (!canEdit() || !(await confirmFinishOpenPlay()) || !finishOpenPlay()) return;
  // Board starts clean: no games, results, or log entries until the next open play begins.
  logEvents = [];
  logHasMore = false;
  render();
  // Straight to setting up the next open play.
  showModePicker();
});

showView(viewFromHash());
boot();

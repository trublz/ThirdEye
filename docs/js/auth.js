/* ThirdEye — login page + visitor/seeker counter (Firebase).
 *
 * SETUP (Firebase console, ~5 min, one time):
 *  1. console.firebase.google.com → Add project → name it "ThirdEye" (Analytics off is fine).
 *  2. Build → Authentication → Sign-in method → enable "Email/Password".
 *  3. Build → Firestore Database → Create database → production mode → pick a region.
 *  4. Firestore → Rules tab → paste the rules from the comment at the bottom of this file → Publish.
 *  5. Project settings (gear) → Your apps → Web (</>) → copy the firebaseConfig block.
 *     In the app's login page you'll find a one-time "connect the cloud" box —
 *     paste it there. It stays in the phone's own storage; it is never sent anywhere.
 * Until the config is pasted, the login page shows in preview mode with an "enter anyway" bypass.
 */

const TE_FIREBASE_CONFIG = {
  apiKey: "PASTE_YOURS_HERE",
  authDomain: "PASTE_YOURS_HERE",
  projectId: "PASTE_YOURS_HERE",
  appId: "PASTE_YOURS_HERE",
};
/* The phone's own saved config wins over the baked-in placeholder. */
function teStoredConfig() {
  try {
    const raw = localStorage.getItem("te_firebase_config");
    if (!raw) return null;
    const c = JSON.parse(raw);
    if (c && c.apiKey && c.apiKey !== "PASTE_YOURS_HERE") return c;
  } catch (e) {}
  return null;
}
function teActiveConfig() { return teStoredConfig() || TE_FIREBASE_CONFIG; }
const TE_FIREBASE_READY = teActiveConfig().apiKey !== "PASTE_YOURS_HERE";

let teUser = null;
let teAuthResolved = false;
let teAuthMode = "login"; // or "signup"
let teStats = { visits: 0, seekers: 0 };
let teStatsUnsub = null;

function teLoadScript(src) {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

async function teInitFirebase() {
  if (!TE_FIREBASE_READY) { teAuthResolved = true; return; }
  try {
    await teLoadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
    await teLoadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js");
    await teLoadScript("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js");
    firebase.initializeApp(teActiveConfig());
    const auth = firebase.auth();
    auth.onAuthStateChanged((u) => {
      teUser = u;
      teAuthResolved = true;
      if (u) teEnsureSeeker(u);
      render();
    });
    // safety: never leave the splash hanging if auth state never fires
    setTimeout(() => { if (!teAuthResolved) { teAuthResolved = true; render(); } }, 9000);
    teBumpVisit();
    teWatchStats();
  } catch (e) {
    teAuthResolved = true; // offline / blocked: fall through to the login page with an error on submit
    render();
  }
}

function teDb() {
  try { return firebase.firestore(); } catch (e) { return null; }
}

/* Every app open counts as one visit — even before login. */
function teBumpVisit() {
  const db = teDb();
  if (!db) return;
  const ref = db.doc("stats/global");
  db.runTransaction(async (t) => {
    const snap = await t.get(ref);
    const d = snap.exists ? snap.data() : {};
    t.set(ref, { visits: (d.visits || 0) + 1, seekers: d.seekers || 0 }, { merge: true });
  }).catch(() => {});
}

/* First-ever login for this account counts as one new seeker. */
function teEnsureSeeker(u) {
  const db = teDb();
  if (!db) return;
  const uref = db.doc("users/" + u.uid);
  uref.get().then((snap) => {
    if (!snap.exists) {
      uref.set({ email: u.email || "", createdAt: firebase.firestore.FieldValue.serverTimestamp() }).catch(() => {});
      const sref = db.doc("stats/global");
      sref.get().then((s) => {
        const d = s.exists ? s.data() : {};
        sref.set({ visits: d.visits || 0, seekers: (d.seekers || 0) + 1 }, { merge: true }).catch(() => {});
      }).catch(() => {});
    }
  }).catch(() => {});
}

function teWatchStats() {
  const db = teDb();
  if (!db) return;
  try {
    if (teStatsUnsub) teStatsUnsub();
    teStatsUnsub = db.doc("stats/global").onSnapshot((snap) => {
      if (snap.exists) {
        teStats = snap.data();
        const el = document.getElementById("teStats");
        if (el) el.innerHTML = teStatsHTML();
        const f = document.getElementById("teFootStats");
        if (f) f.textContent = "👁️ " + (teStats.visits || 0) + " visits · 🔥 " + (teStats.seekers || 0) + " seekers";
      }
    }, () => {});
  } catch (e) {}
}

function teStatsHTML() {
  if (!TE_FIREBASE_READY) return `<p class="sub">📊 The live counter wakes up when the cloud connects.</p>`;
  return `<p style="margin:6px 0;font-size:18px">👁️ <b>${teStats.visits || 0}</b> visits &nbsp;·&nbsp; 🔥 <b>${teStats.seekers || 0}</b> seekers</p>
  <p class="sub" style="margin:0">Every soul that opened the eye, counted.</p>`;
}

/* Gate: called at the top of render(). Returns HTML to show instead of the
 * route, "" when it redirected (hashchange will re-render), null to proceed. */
function teGate() {
  const h = location.hash || "#/";
  const onLogin = /^#\/login/.test(h);
  if (TE_FIREBASE_READY) {
    if (!teAuthResolved) {
      return `<div style="text-align:center;padding:90px 20px"><div style="font-size:60px">👁️</div><p class="sub">Opening the third eye…</p></div>`;
    }
    if (!teUser && !onLogin) { location.hash = "#/login"; return ""; }
    return null;
  }
  // preview mode (cloud not wired yet): login page shows, one-tap bypass
  if (!store.get("te_preview") && !onLogin) { location.hash = "#/login"; return ""; }
  return null;
}

function teSetMode(m) { teAuthMode = m; render(); }
function tePreview() { store.set("te_preview", 1); location.hash = "#/"; render(); }
/* One-time cloud connect: he pastes his own Firebase web config; it is saved
 * in the phone's own localStorage and never leaves the device. */
function teSaveConfig() {
  const el = document.getElementById("teCfg");
  const errBox = document.getElementById("teCfgErr");
  const err = (m) => { if (errBox) errBox.innerHTML = `<div class="warn">${m}</div>`; };
  let raw = (el.value || "").trim();
  if (!raw) { err("Paste your config first."); return; }
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) { err("That doesn't look like a config — copy the {...} block from Firebase."); return; }
  try {
    // Firebase shows it as a JS object (unquoted keys) — normalize to JSON.
    const json = m[0]
      .replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":')
      .replace(/,\s*}/g, "}")
      .replace(/,\s*]/g, "]");
    const c = JSON.parse(json);
    if (!c.apiKey || !c.projectId) { err("Config's missing pieces — copy the full block and try again."); return; }
    localStorage.setItem("te_firebase_config", JSON.stringify(c));
    location.reload();
  } catch (e) { err("Couldn't read that — make sure it's the full {...} block."); }
}
function teLogout() {
  try { if (window.firebase) firebase.auth().signOut(); } catch (e) {}
  teUser = null;
  location.hash = "#/login";
  render();
}

function teSubmit() {
  const emailEl = document.getElementById("teEmail");
  const passEl = document.getElementById("tePass");
  const errBox = document.getElementById("teErr");
  const err = (m) => { if (errBox) errBox.innerHTML = `<div class="warn">${m}</div>`; };
  const email = (emailEl.value || "").trim();
  const pass = passEl.value || "";
  if (!TE_FIREBASE_READY) { err("The login cloud isn't connected yet — tap “Enter the app for now” above."); return; }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { err("That email doesn't look right."); return; }
  if (pass.length < 6) { err("Password needs 6+ characters."); return; }
  const auth = firebase.auth();
  const go = teAuthMode === "login"
    ? auth.signInWithEmailAndPassword(email, pass)
    : auth.createUserWithEmailAndPassword(email, pass);
  go.then(() => { location.hash = "#/"; })
    .catch((e) => {
      const map = {
        "auth/user-not-found": "No account with that email — create one below.",
        "auth/invalid-credential": "Wrong email or password. Try again.",
        "auth/wrong-password": "Wrong password. Try again.",
        "auth/email-already-in-use": "That email already walks the path — log in instead.",
        "auth/invalid-email": "That email doesn't look right.",
        "auth/weak-password": "Password needs 6+ characters.",
        "auth/too-many-requests": "Too many tries — breathe, wait a minute, try again.",
        "auth/network-request-failed": "No connection — check your signal and try again.",
      };
      err(map[e.code] || "Hmm — that didn't work. Try again.");
    });
}

/* Google / Facebook login through Firebase. The matching provider must be
 * switched on in the Firebase console (Authentication → Sign-in method). */
function teSocialLogin(which) {
  const errBox = document.getElementById("teErr");
  const err = (m) => { if (errBox) errBox.innerHTML = `<div class="warn">${m}</div>`; };
  if (!TE_FIREBASE_READY) { err("Connect the cloud first — paste your config in the box above."); return; }
  let prov = null;
  try {
    if (which === "google") prov = new firebase.auth.GoogleAuthProvider();
    else if (which === "facebook") prov = new firebase.auth.FacebookAuthProvider();
  } catch (e) { prov = null; }
  if (!prov) { err("Couldn't start that login — try again."); return; }
  firebase.auth().signInWithPopup(prov)
    .then(() => { location.hash = "#/"; })
    .catch((e) => {
      const map = {
        "auth/popup-blocked": "Your browser blocked the popup — allow popups and try again.",
        "auth/popup-closed-by-user": "The login window closed before finishing — try again.",
        "auth/account-exists-with-different-credential": "That account already exists with a different login — use the way you signed up first.",
        "auth/operation-not-allowed": "That login isn't switched on in the Firebase console yet.",
        "auth/cancelled-popup-request": "Try again.",
        "auth/network-request-failed": "No connection — check your signal and try again.",
      };
      err(map[e.code] || "Hmm — that didn't work. Try again.");
    });
}

function vLogin() {
  const statsCard = `<div class="card" style="text-align:center"><div id="teStats">${teStatsHTML()}</div></div>`;
  if (TE_FIREBASE_READY && teUser) {
    return `<h2>👤 Your account</h2>
    <div class="card"><p class="sub" style="margin:0">Walking the path as</p>
      <h3 style="margin:4px 0 12px">${teUser.email}</h3>
      <button class="btn btn-ghost btn-block" onclick="teLogout()">🚪 Log out</button></div>
    ${statsCard}`;
  }
  const setup = TE_FIREBASE_READY ? "" :
    `<div class="card gold"><h3>🔌 One-time cloud connect</h3>
     <p class="sub">Paste your Firebase web config below — the <span style="font-family:monospace">firebaseConfig = {...}</span> block from your Firebase console. It stays on your phone only, never sent anywhere.</p>
     <textarea id="teCfg" rows="6" style="width:100%;box-sizing:border-box" placeholder="Paste your firebaseConfig {...} block here"></textarea>
     <div id="teCfgErr"></div>
     <button class="btn btn-gold btn-block" onclick="teSaveConfig()">Connect the cloud →</button>
     <p class="sub" style="text-align:center;margin:10px 0 0">Not yet? <a href="javascript:void(0)" onclick="tePreview()" style="color:var(--gold)">Enter the app for now →</a></p></div>`;
  const isLogin = teAuthMode === "login";
  return `<div style="max-width:430px;margin:26px auto">
    <div style="text-align:center;margin-bottom:14px"><div style="font-size:64px">👁️</div>
      <h1 style="margin:6px 0 2px">ThirdEye</h1>
      <p class="sub">Log in to walk the path.<br>Your progress, journal and streaks ride with your account.</p></div>
    ${setup}
    <div class="card"><h3>${isLogin ? "🔑 Log in" : "✨ Create account"}</h3>
      <div id="teErr"></div>
      <p class="sub" style="margin:0 0 2px">Email</p>
      <input id="teEmail" type="email" placeholder="you@example.com" autocomplete="email">
      <p class="sub" style="margin:10px 0 2px">Password</p>
      <input id="tePass" type="password" placeholder="6+ characters" autocomplete="${isLogin ? "current-password" : "new-password"}" onkeydown="if(event.key==='Enter'){teSubmit()}">
      <button class="btn btn-gold btn-block" onclick="teSubmit()">${isLogin ? "Log in →" : "Create account →"}</button>
      <p class="sub" style="text-align:center;margin:12px 0 0">${isLogin
        ? `New here? <a href="javascript:void(0)" onclick="teSetMode('signup')" style="color:var(--gold)">Create an account</a>`
        : `Already walking? <a href="javascript:void(0)" onclick="teSetMode('login')" style="color:var(--gold)">Log in</a>`}</p>
      <p class="sub" style="text-align:center;margin:14px 0 6px">— or continue with —</p>
      <div style="display:flex;gap:8px">
        <button class="btn btn-ghost" style="flex:1" onclick="teSocialLogin('google')">G&nbsp; Google</button>
        <button class="btn btn-ghost" style="flex:1" onclick="teSocialLogin('facebook')">f&nbsp; Facebook</button>
      </div>
    </div>
    ${statsCard}
  </div>`;
}

teInitFirebase();

/* Firestore Rules (paste into Firebase console → Firestore → Rules → Publish):
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /stats/global {
      allow read: if true;
      allow create: if true;
      allow update: if (request.resource.data.visits == resource.data.visits + 1
                       && request.resource.data.seekers == resource.data.seekers)
                    || (request.resource.data.seekers == resource.data.seekers + 1
                       && request.resource.data.visits == resource.data.visits);
    }
    match /users/{uid} {
      allow read, create: if request.auth != null && request.auth.uid == uid;
    }
  }
}
*/

/* ThirdEye — login page + visitor/seeker counter (Firebase).
 *
 * SETUP (Firebase console, ~5 min, one time):
 *  1. console.firebase.google.com → Add project → name it "ThirdEye" (Analytics off is fine).
 *  2. Build → Authentication → Sign-in method → enable "Email/Password".
 *  3. Build → Firestore Database → Create database → production mode → pick a region.
 *  4. Firestore → Rules tab → paste the rules from the comment at the bottom of this file → Publish.
 *  5. Project settings (gear) → Your apps → Web (</>) → copy the firebaseConfig values
 *     into TE_FIREBASE_CONFIG below (they are public-by-design client keys, not secrets).
 * Until the config is pasted, the login page shows in preview mode with an "enter anyway" bypass.
 */

const TE_FIREBASE_CONFIG = {
  apiKey: "PASTE_YOURS_HERE",
  authDomain: "PASTE_YOURS_HERE",
  projectId: "PASTE_YOURS_HERE",
  appId: "PASTE_YOURS_HERE",
};
const TE_FIREBASE_READY = TE_FIREBASE_CONFIG.apiKey !== "PASTE_YOURS_HERE";

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
    firebase.initializeApp(TE_FIREBASE_CONFIG);
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
    `<div class="card gold"><h3>🔌 Cloud not connected yet</h3>
     <p class="sub">This is the real login page — it goes live the moment the cloud keys are in. For now:</p>
     <button class="btn btn-gold btn-block" onclick="tePreview()">Enter the app for now →</button></div>`;
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

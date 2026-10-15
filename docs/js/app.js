/* ThirdEye — app logic. Vanilla JS router, tone generator, journal, streaks. */

const $ = (s) => document.querySelector(s);
const app = $("#view");

/* ---------- tone generator (Web Audio) ---------- */
let actx = null, osc = null, osc2 = null, gainNode = null, currentHz = 0, currentLabel = "";
function toneHz(hz, label) {
  stopTone();
  actx = actx || new (window.AudioContext || window.webkitAudioContext)();
  osc = actx.createOscillator();
  gainNode = actx.createGain();
  osc.type = "sine";
  osc.frequency.value = hz;
  gainNode.gain.value = 0.0001;
  osc.connect(gainNode); gainNode.connect(actx.destination);
  osc.start();
  gainNode.gain.exponentialRampToValueAtTime(0.375, actx.currentTime + 1.5);
  currentHz = hz; currentLabel = label || (hz + " Hz");
  renderToneState();
}
function toneBinaural(base, diff, label) {
  stopTone();
  actx = actx || new (window.AudioContext || window.webkitAudioContext)();
  gainNode = actx.createGain();
  gainNode.gain.value = 0.0001;
  gainNode.connect(actx.destination);
  const mk = (freq, pan) => {
    const o = actx.createOscillator(), p = actx.createStereoPanner();
    o.type = "sine"; o.frequency.value = freq; p.pan.value = pan;
    o.connect(p); p.connect(gainNode); o.start();
    return o;
  };
  osc = mk(base, -1); osc2 = mk(base + diff, 1);
  gainNode.gain.exponentialRampToValueAtTime(0.33, actx.currentTime + 1.5);
  currentHz = diff; currentLabel = label + " (binaural " + diff + " Hz)";
  renderToneState();
}
function stopTone() {
  if (osc) {
    try { gainNode.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + 0.5); osc.stop(actx.currentTime + 0.6); if (osc2) osc2.stop(actx.currentTime + 0.6); } catch (e) {}
    osc = null; osc2 = null; currentHz = 0; currentLabel = "";
  }
  renderToneState();
}
function renderToneState() {
  const el = $("#toneState");
  if (el) el.innerHTML = currentHz
    ? `<div class="hz">${currentLabel}</div><p class="sub">playing… breathe slow · headphones on</p><button class="btn btn-ghost btn-block" onclick="stopTone()">⏹ Stop</button>`
    : `<p class="sub">Pick a frequency below and press play.</p>`;
}

/* ---------- storage ---------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem("te_" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("te_" + k, JSON.stringify(v)); } catch (e) {} },
};
function todayStr() { return new Date().toISOString().slice(0, 10); }

/* ---------- views ---------- */
const TILES = [
  { h: "#/path", icon: "🛤️", t: "The Path", d: "7 stages of awakening, beginner to embodied" },
  { h: "#/frequencies", icon: "🔊", t: "Frequency Lab", d: "Playable healing tones incl. Schumann" },
  { h: "#/chakras", icon: "🌈", t: "Chakras", d: "All 7 energy centers explained" },
  { h: "#/luminaries", icon: "🪐", t: "7 Luminaries", d: "Planets, metals, days & your body" },
  { h: "#/fingers", icon: "🤲", t: "Mudra Library", d: "10 hand positions \u2014 every finger\u2019s chakra, with photos" },
  { h: "#/points", icon: "📍", t: "Pressure Points", d: "12 key acupressure points" },
  { h: "#/astral", icon: "🌌", t: "Astral Projection", d: "4 techniques, step by step" },
  { h: "#/pineal", icon: "👁️", t: "Pineal Protocol", d: "Decalcify & activate the third eye" },
  { h: "#/hearth", icon: "🔥", t: "The Hearth", d: "Celestial University teachings, decoded — free" },
  { h: "#/hearth/pineal-deep", icon: "👁️", t: "Pineal Gland", d: "What it is, its history, decalcification — full guide" },
  { h: "#/labels", icon: "🏷️", t: "The Labels", d: "Every disorder: spiritual, pineal & awakening links" },
  { h: "#/diet", icon: "🥗", t: "Diet", d: "Dr. Sebi, electric foods & the proper diet" },
  { h: "#/tesla", icon: "\u26A1", t: "Tesla", d: "The man, his research, 3-6-9 & the lost machines" },
  { h: "#/shilajit", icon: "🧱", t: "Shilajit", d: "The rock you eat: minerals, power & safe use" },
  { h: "#/manifest", icon: "🧲", t: "Manifestation", d: "How it works, the pineal link & the daily protocol" },
  { h: "#/bible", icon: "\uD83D\uDCDA", t: "The Bible", d: "The metaphor manual: decode it, enter the inner chamber" },
  { h: "#/scripture", icon: "\uD83D\uDCD6", t: "Scripture", d: "Bible + Apocrypha in order, KJV text with decoded notes" },
  { h: "#/sos", icon: "🆘", t: "Grounding SOS", d: "When it's too much — use this NOW" },
  { h: "#/journal", icon: "📓", t: "Journal", d: "Log signs, dreams & synchronicities" },
  { h: "#/practice", icon: "🔥", t: "Daily Practice", d: "Streaks & non-negotiable habits" },
];

function vHome() {
  return `<h1>👁️ ThirdEye</h1>
  <p class="sub">Your field guide to awakening — from first questions to full embodiment. Purple skies, gold truth.</p>
  <div class="section-grid">${TILES.map(t =>
    `<a class="tile" href="${t.h}"><div class="icon">${t.icon}</div><h3>${t.t}</h3><p>${t.d}</p></a>`).join("")}</div>
  <div class="card gold"><h3>🔥 Start here</h3><p class="sub">New? Walk <a href="#/path" style="color:var(--gold)">The Path</a> in order. Overwhelmed? Hit <a href="#/sos" style="color:var(--gold)">Grounding SOS</a> first — no shame, that's what it's for.</p></div>`;
}

function vPath() {
  return `<h2>🛤️ The Path</h2><p class="sub"><div class="card gold"><h3>😕 Confused? Start here.</h3><p class="sub">What awakening IS, why 7 stages, why you prepare, what they do for you — and whether you even have to. <a href='#/hearth/path-explained' style='color:var(--gold)'>Read the plain-English explainer →</a></p></div><p class="sub">The 7 stages of awakening. Read in order — each one prepares you for the next.</p>` +
    PATH_STAGES.map(s => `<div class="card ${s.warning ? "" : ""}">
      ${s.warning ? `<div class="warn"><b>⚠️ Go gently.</b> If this stage feels dangerous, talk to someone you trust or a professional. Seeking help is strength.</div>` : ""}
      <h3>${s.icon} ${s.n}. ${s.title}</h3><p class="sub">${s.body}</p>
      ${s.deep ? `<p><a href="#/hearth/${s.deep}" style="color:var(--gold)">📖 Go deeper: the full breakdown \u2192</a></p>` : ""}
      <b style="font-size:13px;color:var(--gold)">PRACTICES</b>
      <ul class="clean">${s.practices.map(p => `<li>${p}</li>`).join("")}</ul></div>`).join("");
}

function vFrequencies() {
  return `<h2>🔊 Frequency Lab</h2><p class="sub">Real tones, generated live on your device. Use headphones, sit comfortably, breathe slow.</p>
  <div class="card gold tone-now" id="toneState"><p class="sub">Pick a frequency below and press play.</p></div>` +
    FREQUENCIES.map((f, i) => `<div class="card"><h3>${f.hz} Hz — ${f.name}</h3>
      <p class="sub">${f.use}</p><p class="sub">🎯 <b>How to use it:</b> ${f.how}</p><p class="sub" style="color:var(--gold)">✦ ${f.chakra} chakra</p>
      <button class="btn btn-gold btn-block" onclick="toneHz(${f.hz})">▶ Play ${f.hz} Hz</button></div>`).join("") +
    `<div class="card"><h3>📻 About Schumann</h3><p class="sub">7.83 Hz is the Earth's electromagnetic heartbeat — the fundamental standing wave in the cavity between the Earth's surface and the ionosphere, a shell of charged air that lightning keeps striking like a bell. Physicist Winfried Schumann worked out the math in 1952; Nikola Tesla had predicted the resonance decades earlier. It is not alone: the cavity rings at harmonics too — roughly 14.3, 20.8, 27.3 and 33.8 Hz — and all three of the first tones are in this lab. It sits below human hearing, so you will not 'hear' it; the app renders it as a slow pulse you feel as deep calm. Why meditators care: the bottom edge of human brainwaves (deep relaxation, the drift toward sleep) lives in this same neighborhood, and some researchers have suggested our biology evolved bathed in this pulse — an intriguing idea, not a proven one. Traditionally used for grounding and deep meditation; scientifically, a measured fact of the planet you live on.</p></div>
  <h2 style="margin-top:26px">🎧 Binaural Lab</h2><p class="sub">Two tones, one per ear — your brain hears the DIFFERENCE as a pulse. Headphones required. Pick your brainwave.</p>` +
    BINAURAL.map(b => `<div class="card"><h3>${b.name}</h3>
      <p class="sub">${b.use}</p><p class="sub">🎯 <b>How to use it:</b> ${b.how}</p>
      <button class="btn btn-gold btn-block" onclick="toneBinaural(${b.base}, ${b.diff}, '${b.name}')">▶ Play (${b.base}/${b.base + b.diff} Hz)</button></div>`).join("") +
    `<div class="card"><h3>⚡ Rife Frequencies</h3><p class="sub">Royal Raymond Rife was a 1930s inventor who claimed his ultra-powerful microscopes let him watch living pathogens — and that specific radio frequencies could shatter them like a singer breaking glass. His lab was raided, his work was buried in lawsuits and institutional hostility, and he died obscure in 1971. Whether he was a suppressed genius or a brilliant self-deceiver is still argued; what is certain is that the establishment of his day did not give him a fair hearing. The teaching keeps his frequency lists alive in underground manuals passed hand to hand. We do not list medical-target frequencies here (that is practitioner territory, and targeting disease with sound is not something to self-administer from an app) — but know the lineage: frequency as medicine is the oldest new idea in the world, and Rife is its patron saint.</p></div>
  <div class="card" style="padding:10px"><h3>🎬 Frequency & Manifestation</h3><p class="sub">How the frequency you broadcast shapes what returns — the video guide.</p><video src="${typeof VIDEOS !== "undefined" ? VIDEOS["manifest-video"] : ""}" controls playsinline preload="metadata" style="width:100%;border-radius:12px;display:block;background:#000"></video><p class="sub" style="text-align:center;margin:8px 0 2px;font-size:11px;opacity:.75">🎬 @teslawaves3 on TikTok</p></div>
  <div class="card"><h3>🎼 432 vs 440</h3><p class="sub">A=432 Hz was the common concert pitch through much of the classical era; A=440 was standardized by international conferences in the 20th century (ISO 1955). Advocates of 432 say it sounds warmer and measurably relaxes listeners more — and small studies have found 432 Hz music slightly lowers heart rate and blood pressure versus 440. You will also hear a darker story: that 440 was imposed by sinister forces, even named as a Goebbels decree. The honest note: that tale is unproven lore — 440 won through dull committees, not conspiracies. The useful part survives the debunking: run the experiment yourself. Play 432 above, then any 440-tuned song, and feel the difference in your own body. Your nervous system gets a vote.</p></div>`;
}

function vChakras() {
  return `<h2>🌈 The 7 Chakras</h2><p class="sub">Energy centers running up your spine. Tap one to go deep.</p>` +
    CHAKRAS.map(c => `<a class="tile" href="#/chakra/${c.id}" style="border-left:4px solid ${c.color}">
      <h3><span class="chakra-dot" style="background:${c.color};color:${c.color}"></span>${c.name}</h3>
      <p>${c.sanskrit} · ${c.location} · ${c.freq}</p></a>`).join("") +
    `<a class="tile" href="#/hearth/color-magic" style="border-left:4px solid #c084fc"><div class="icon">🎨</div><h3>Color Magic</h3><p>What to wear, how to paint your home & feng shui for your chakras</p></a>`;
}

function vChakra(id) {
  const c = CHAKRAS.find(x => x.id === id) || CHAKRAS[0];
  return `<h2><span class="chakra-dot" style="background:${c.color};color:${c.color}"></span>${c.name}</h2>
  <p class="sub">${c.sanskrit} · ${c.location} · ${c.element} · Finger: ${c.finger} · Tone: ${c.freq}</p>
  <div class="card" style="border-color:${c.color}"><p>${c.theme}</p></div>
  ${c.photo && typeof PHOTOS !== "undefined" && PHOTOS[c.photo] ? `<div class="card" style="padding:10px;border-color:${c.color}"><img src="${PHOTOS[c.photo]}" alt="${c.name} — color and body location" style="width:100%;border-radius:12px;display:block"><p class="sub" style="text-align:center;margin:8px 0 2px">${c.name} · ${c.location} · traditional art</p></div>` : ""}
  <div class="card gold"><h3>🧘 Your practice for this chakra</h3>
  <p class="sub">🔊 <b>Mantra:</b> <span style="font-size:1.5em;color:var(--gold)">${c.mantra}</span><br>Chant it on the exhale for 5–10 minutes \u2014 inhale normally, then voice the mantra slowly on the out-breath, ending with lips closed in a nasal hum. Feel the vibration at the chakra's location (${c.location.toLowerCase()}). The sound IS the tuning fork.</p>
  <p class="sub">🗣️ <b>How to say it:</b> ${c.say}</p>
  <p class="sub">🪑 <b>Position:</b> ${c.position} <a href="#/hearth/positions" style="color:var(--gold)">(see the Positions guide)</a></p>
  <p class="sub">🌬️ <b>Breath:</b> ${c.breath} <a href="#/hearth/breath-pairing" style="color:var(--gold)">(see the Pairing guide)</a></p>
  <p class="sub">🤲 <b>Hand mudra:</b> <a href="#/mudra/${c.mudra[0]}" style="color:var(--gold)">${c.mudra[1]}</a> — full photo guide in the Mudra Library.</p></div>
  <div class="card"><h3>⚠️ Signs it's blocked</h3><ul class="clean">${c.blocked.map(b => `<li>${b}</li>`).join("")}</ul></div>
  <div class="card"><h3>✨ How to balance it</h3><ul class="clean">${c.balance.map(b => `<li>${b}</li>`).join("")}</ul>
  <button class="btn btn-gold btn-block" onclick="toneHz(${parseFloat(c.freq)})">▶ Play its tone (${c.freq})</button></div>
  <div class="card gold tone-now" id="toneState"><p class="sub">Tone controls appear here.</p></div>
  <a class="btn btn-ghost btn-block" href="#/chakras">← All chakras</a>`;
}

function vLuminaries() {
  return `<h2>🪐 The 7 Luminaries</h2><p class="sub">The 7 visible wanderers of the ancient sky. The 7-day week is named after them — Sunday is literally the Sun's day, Monday the Moon's, and so on — and each day carries its luminary's frequency. Each one rules a day of your week, a metal, a chakra, and a part of your body — this is the clock you were built for. Real photos: amateur telescopes & Earth-based shots \u2014 no space-agency imagery.</p>` +
    LUMINARIES.map(l => `<div class="card" style="border-left:4px solid ${l.color}">
      <h3>${l.planet} — ${l.day}</h3>
      ${typeof PHOTOS !== "undefined" && PHOTOS[l.photo] ? `<img src="${PHOTOS[l.photo]}" alt="${l.planet}" style="width:100%;max-width:280px;border-radius:50%;display:block;margin:10px auto;aspect-ratio:1;object-fit:cover">` : ""}
      ${typeof PHOTO_CREDITS !== "undefined" && PHOTO_CREDITS[l.photo] ? `<p class="sub" style="text-align:center;font-size:11px;opacity:.75">📷 ${PHOTO_CREDITS[l.photo]}</p>` : ""}
      <p class="sub"><b style="color:var(--gold)">What it IS:</b> ${l.astro}</p>
      <p class="sub"><b style="color:var(--gold)">The myth:</b> ${l.myth}</p>
      <p class="sub"><b style="color:var(--gold)">Why this day:</b> ${l.daywhy}</p>
      ${l.polarity ? `<p class="sub"><b style="color:var(--gold)">Polarity:</b> ${l.polarity}</p>` : ""}
      <p class="sub"><b style="color:var(--gold)">What it rules in you:</b> ${l.rules}</p>
      <p class="sub"><b style="color:var(--gold)">How it connects to your body:</b> ${l.body}</p>
      <p class="sub"><b style="color:var(--gold)">How to work with it:</b> ${l.practice}</p>
      <p class="sub">Metal: <b style="color:var(--gold)">${l.metal}</b> · Chakra: ${l.chakra}</p></div>`).join("");
}

function vFingers() {
  return `<h2>🤲 The Mudra Library</h2>
  <p class="sub">In the yogic tradition every finger carries an element and a chakra \u2014 and every hand position (mudra) is a switch that routes energy through them. Below: each finger picked apart (its chakra, what it does, how to activate it), then the full library of 10 hand positions, each with its own photo.</p>
  <div class="card">${DIAGRAMS["mudra-handmap"]}</div>` +
    MUDRAS.map(m => `<div class="card" style="border-left:4px solid ${m.color}"><h3>${m.finger} \u2014 ${m.element}</h3>
      <p class="sub">Chakra: <b style="color:var(--gold)">${m.chakra}</b></p>
      <p class="sub"><b>What this chakra does:</b> ${m.does}</p>
      <p class="sub"><b>How to activate it:</b> ${m.activate}</p></div>`).join("") +
    `<h3 style="color:var(--gold);margin:26px 0 4px">🤲 All 10 hand positions</h3>
    <p class="sub">Tap any mudra for the exact hand position photo, what it activates, and how to verify it's working.</p>` +
    MUDRA_LIB.map(m => `<a class="tile" href="#/mudra/${m.id}"><div class="icon">${m.icon}</div><h3>${m.title}</h3><p>${m.intro.slice(0, 95)}\u2026</p></a>`).join("");
}

function vMudra(id) {
  const l = MUDRA_LIB.find(x => x.id === id) || MUDRA_LIB[0];
  const readMin = Math.max(2, Math.round(l.steps.reduce((a, s) => a + s.t.length + s.d.length, 0) / 900));
  return `<p class="sub"><a href="#/fingers" style="color:var(--gold)">\u2190 Mudra Library</a></p>
    <h2>${l.icon} ${l.title}</h2>
    <p class="sub">🤲 ${l.steps.length} sections \u00b7 ~${readMin} min \u00b7 FREE</p>
    <div class="card gold"><p>${l.intro}</p></div>
    ${typeof PHOTOS !== "undefined" && PHOTOS[id] ? `<div class="card" style="padding:10px"><img src="${PHOTOS[id]}" alt="${l.title} hand position photo" style="width:100%;border-radius:12px;display:block"><p class="sub" style="text-align:center;margin:10px 0 2px">👆 Hold your hand up and match this position exactly.</p></div>` : ""}` +
    l.steps.map(s => s.d ? `<div class="card"><h3>${s.t}</h3><p class="sub">${s.d}</p></div>`
      : `<h3 style="color:var(--gold);margin:22px 0 4px">${s.t}</h3>`).join("") +
    `<div class="card"><p class="sub">📓 <i>Practice it now \u2014 then write in your <a href="#/journal" style="color:var(--gold)">awakening journal</a> what you felt. Teaching it back is how it becomes yours.</i></p></div>`;
}

function vPoints() {
  return `<h2>📍 Pressure Points</h2><p class="sub">12 key acupressure points. Firm pressure, slow breathing, 1–2 minutes each. Tap any point for the full deep lesson.</p>` +
    PRESSURE_POINTS.map(p => { const slug = (p.code || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const lid = "point-" + ({"ex-hn3":"yintang","gv20":"baihui","li4":"hegu","pc6":"neiguan","lv3":"taichong","ki1":"yongquan","st36":"zusanli","ht7":"shenmen","gb20":"fengchi","pc8":"laogong","ex-hn5":"taiyang","sp6":"sanyinjiao"}[slug] || slug);
      return `<a class="card" href="#/point/${lid}" style="display:block;border-left:4px solid ${p.color};text-decoration:none;color:inherit">
      <h3>${p.name}</h3><p class="sub">${p.code} · ${p.loc}</p>
      <p class="sub"><b>How:</b> ${p.how}</p><p class="sub"><b>For:</b> ${p.for}</p>
      <p style="color:var(--gold);font-size:12px;margin-top:8px">📖 Full deep lesson →</p></a>`; }).join("");
}

function vPointLesson(id) {
  const l = PRESSURE_LESSONS.find(x => x.id === id) || PRESSURE_LESSONS[0];
  const readMin = Math.max(2, Math.round(l.steps.reduce((a, s) => a + s.t.length + s.d.length, 0) / 900));
  return `<p class="sub"><a href="#/points" style="color:var(--gold)">← Pressure Points</a></p>
    <h2>${l.icon} ${l.title}</h2>
    <p class="sub">📖 ${l.steps.length} sections · ~${readMin} min read · FREE</p>
    <div class="card gold"><p>${l.intro}</p></div>
    ${l.photo && typeof PHOTOS !== "undefined" ? (Array.isArray(l.photo) ? l.photo : [l.photo]).map(p => PHOTOS[p] ? `<div class="card" style="padding:10px"><img src="${PHOTOS[p]}" alt="Photo for ${l.title}" style="width:100%;border-radius:12px;display:block">${typeof PHOTO_CREDITS !== "undefined" && PHOTO_CREDITS[p] ? `<p class="sub" style="text-align:center;margin:8px 0 2px;font-size:11px;opacity:.75">📷 ${PHOTO_CREDITS[p]}</p>` : ""}</div>` : "").join("") : ""}
    ${l.diagram && !l.photo && typeof DIAGRAMS !== "undefined" && DIAGRAMS[l.diagram] ? `<div class="card">${DIAGRAMS[l.diagram]}</div>` : ""}` +
    l.steps.map(s => s.d ? `<div class="card"><h3>${s.t}</h3><p class="sub">${s.d}</p></div>`
      : `<h3 style="color:var(--gold);margin:22px 0 4px">${s.t}</h3>`).join("") +
    `<div class="card"><p class="sub">📓 <i>Write in your <a href="#/journal" style="color:var(--gold)">awakening journal</a> what clicked for you. Teaching it back is how it becomes yours.</i></p></div>`;
}

function vAstral() {
  return `<h2>🌌 Astral Projection</h2><p class="sub">Consciousness leaving the body — the most direct proof you're more than flesh. 4 techniques, easiest first. Never practice exhausted or afraid; ground after.</p>` +
    ASTRAL_TECHS.map(a => `<div class="card"><h3>${a.name}</h3>
      <p class="sub">By ${a.by} · <b style="color:var(--gold)">${a.level}</b></p>
      <ol class="steps">${a.steps.map(s => `<li>${s}</li>`).join("")}</ol></div>`).join("") +
    `<div class="warn"><b>🛡️ Safety:</b> Set a clear intention before every attempt. If fear spikes, press your feet together / wiggle toes to return. After any attempt, ground: cold water, food, bare feet on earth.</div>`;
}

function vPineal() {
  return `<h2>👁️ Pineal Protocol</h2><p class="sub">The pineal gland — your inner antenna. It calcifies with age and fluoride; this is how you reverse it. Give it 30 days.</p>` +
    PINEAL_PROTOCOL.map((p, i) => `<div class="card"><h3>${i + 1}. ${p.t}</h3><p class="sub">${p.d}</p></div>`).join("") +
    `<div class="card gold"><h3>🔊 852 Hz activation</h3><p class="sub">Dark room, 852 Hz tone, soft gaze at a candle flame. Start 5 minutes.</p>
    <button class="btn btn-gold btn-block" onclick="toneHz(852)">▶ Play 852 Hz</button></div>
    <div class="card gold tone-now" id="toneState"><p class="sub">Tone controls appear here.</p></div>`;
}

function vHearth() {
  return `<h2>🔥 The Hearth</h2><p class="sub">The teachings of Celestial University — picked apart and explained plainly, step by step, so anyone can get it. Free forever. We don't sell his book; we teach the knowledge.</p>` +
    HEARTH_LESSONS.map(l => `<a class="tile" href="#/hearth/${l.id}">
      <div class="icon">${l.icon}</div><h3>${l.title}</h3><p>${l.intro.slice(0, 90)}…</p>
      <p style="color:var(--gold);font-size:12px;margin-top:8px">FREE · ${l.steps.length} steps →</p></a>`).join("");
}

function vHearthLesson(id) {
  const l = HEARTH_LESSONS.find(x => x.id === id) || HEARTH_LESSONS[0];
  const readMin = Math.max(2, Math.round(l.steps.reduce((a, s) => a + s.t.length + s.d.length, 0) / 900));
  return `<p class="sub"><a href="#/hearth" style="color:var(--gold)">← The Hearth</a></p>
    <h2>${l.icon} ${l.title}</h2>
    <p class="sub">📖 ${l.steps.length} sections · ~${readMin} min read · FREE</p>
    <div class="card gold"><p>${l.intro}</p></div>
    ${l.photo && typeof PHOTOS !== "undefined" ? (Array.isArray(l.photo) ? l.photo : [l.photo]).map(p => PHOTOS[p] ? `<div class="card" style="padding:10px"><img src="${PHOTOS[p]}" alt="Photo for ${l.title}" style="width:100%;border-radius:12px;display:block">${typeof PHOTO_CREDITS !== "undefined" && PHOTO_CREDITS[p] ? `<p class="sub" style="text-align:center;margin:8px 0 2px;font-size:11px;opacity:.75">📷 ${PHOTO_CREDITS[p]}</p>` : ""}</div>` : "").join("") : ""}
    ${l.video && typeof VIDEOS !== "undefined" && VIDEOS[l.video] ? `<div class="card" style="padding:10px"><video src="${VIDEOS[l.video]}" controls playsinline preload="metadata" style="width:100%;border-radius:12px;display:block;background:#000"></video>${typeof VIDEO_CREDITS !== "undefined" && VIDEO_CREDITS[l.video] ? `<p class="sub" style="text-align:center;margin:8px 0 2px;font-size:11px;opacity:.75">🎬 ${VIDEO_CREDITS[l.video]}</p>` : ""}</div>` : ""}
    ${l.diagram && !l.photo && typeof DIAGRAMS !== "undefined" && DIAGRAMS[l.diagram] ? `<div class="card">${DIAGRAMS[l.diagram]}</div>` : ""}` +
    l.steps.map(s => s.d ? `<div class="card"><h3>${s.t}</h3><p class="sub">${s.d}</p></div>`
      : `<h3 style="color:var(--gold);margin:22px 0 4px">${s.t}</h3>`).join("") +
    `<div class="card"><p class="sub">📓 <i>Write in your <a href="#/journal" style="color:var(--gold)">awakening journal</a> what clicked for you. Teaching it back is how it becomes yours.</i></p></div>`;
}

function vShilajit() {
  const ids = ["shilajit", "shilajit-power", "shilajit-guide", "shilajit-sourcing"];
  const ls = ids.map(id => HEARTH_LESSONS.find(l => l.id === id)).filter(Boolean);
  return `<h2>🧱 The Shilajit Section</h2>
  <p class="sub">The natural mineral from the Earth \u2014 what it is, what it actually does, and how to use it safely. Knowledge should be free.</p>` +
    ls.map(l => `<a class="tile" href="#/hearth/${l.id}"><div class="icon">${l.icon}</div><h3>${l.title}</h3><p>${l.intro.slice(0, 95)}\u2026</p></a>`).join("");
}

function vTesla() {
  const ids = ["tesla-life", "tesla-research", "tesla369", "tesla-369", "tesla-generators", "tesla-practice", "tesla-workshop", "living-369", "ether", "scalar"];
  const ls = ids.map(id => HEARTH_LESSONS.find(l => l.id === id)).filter(Boolean);
  return `<h2>\u26A1 The Tesla Section</h2>
  <p class="sub">Nikola Tesla \u2014 the man, his documented research picked apart, the 3-6-9 teaching with legend separated from record, and the lost machines. Knowledge should be free.</p>` +
    ls.map(l => `<a class="tile" href="#/hearth/${l.id}"><div class="icon">${l.icon}</div><h3>${l.title}</h3><p>${l.intro.slice(0, 95)}\u2026</p></a>`).join("");
}

function vDiet() {
  const ids = ["drsebi", "sebi-foods", "sebi-food-guide", "sebi-herbs", "sebi-sourcing", "diet-proper", "diet", "dead-flesh", "energy-pyramid", "water", "deephealth"];
  const ls = ids.map(id => HEARTH_LESSONS.find(l => l.id === id)).filter(Boolean);
  return `<h2>🥗 The Diet Section</h2>
  <p class="sub">Everything the teaching says about food: Dr. Sebi's method, the electric food list, the daily protocol \u2014 plus water, energy eating, and deep health.</p>` +
    ls.map(l => `<a class="tile" href="#/hearth/${l.id}"><div class="icon">${l.icon}</div><h3>${l.title}</h3><p>${l.intro.slice(0, 95)}\u2026</p></a>`).join("");
}

function vManifest() {
  const ids = ["manifestation", "manifest-how", "manifest-pineal", "manifest-frequency", "manifest-blocks"];
  const ls = ids.map(id => HEARTH_LESSONS.find(l => l.id === id)).filter(Boolean);
  return `<h2>🧲 The Manifestation Section</h2>
  <p class="sub">How manifestation actually works: the physics of thought, the daily protocol, the pineal connection, the frequency you broadcast — and why it fails. Knowledge should be free.</p>` +
    ls.map(l => `<a class="tile" href="#/hearth/${l.id}"><div class="icon">${l.icon}</div><h3>${l.title}</h3><p>${l.intro.slice(0, 95)}\u2026</p></a>`).join("");
}

function vBible() {
  const ids = ["bible-decoded", "bible-metaphors", "bible-inner-chamber", "bible-prophets-one", "bible-ot", "bible-nt", "bible-apocrypha", "bible-enoch", "removed-books", "removed-books-2"];
  const ls = ids.map(id => HEARTH_LESSONS.find(l => l.id === id)).filter(Boolean);
  return `<h2>\uD83D\uDCDA The Bible Section</h2>
  <p class="sub">The Bible as a metaphor manual for inner work: how to decode it, the inner chamber, the one teaching behind Jesus, Muhammad and Buddha — plus the Old Testament, New Testament and lost books, decoded.</p>` +
    ls.map(l => `<a class="tile" href="#/hearth/${l.id}"><div class="icon">${l.icon}</div><h3>${l.title}</h3><p>${l.intro.slice(0, 95)}\u2026</p></a>`).join("");
}

function vLabels() {
  return `<h2>🏷️ The Labels</h2>
  <p class="sub">Every major diagnosis, examined through three lenses: what psychiatry says, what it may mean spiritually, what the pineal gland has to do with it — and what it could have to do with an awakening. Education, not diagnosis. Nothing here replaces professional help.</p>
  <div class="warn"><b>⚠️ Read this first:</b> mental suffering is real whatever lens you use. The teaching's reframes are meant to add understanding, not to replace care. Never stop prescribed medication because of a lesson — that's a doctor conversation.</div>` +
    DISORDERS.map(d => `<a class="tile" href="#/label/${d.id}">
      <div class="icon">${d.icon}</div><h3>${d.name}</h3><p>${d.spiritual.slice(0, 95)}…</p></a>`).join("");
}

function vLabel(id) {
  const d = DISORDERS.find(x => x.id === id) || DISORDERS[0];
  const lens = [["🏥 Psychiatry says", d.clinical], ["🕊️ The spiritual reframe", d.spiritual], ["👁️ The pineal connection", d.pineal], ["⚡ The awakening link", d.awakening]];
  return `<p class="sub"><a href="#/labels" style="color:var(--gold)">← The Labels</a></p>
    <h2>${d.icon} ${d.name}</h2>` +
    lens.map(l => `<div class="card"><h3>${l[0]}</h3><p class="sub">${l[1]}</p></div>`).join("") +
    `<div class="card gold"><h3>🧭 What to do</h3><p class="sub">${d.do}</p></div>
    <div class="warn"><b>If it gets dark:</b> US 988 · Canada 1-833-456-4566 · UK/Ireland 116 123. Seeking help is strength — the teaching says so too.</div>
    <a class="btn btn-ghost btn-block" href="#/labels">← All labels</a>`;
}

function vSos() {
  return `<h2>🆘 Grounding SOS</h2><p class="sub">Too much, too fast? Do this now, in order. You are safe. This passes.</p>` +
    SOS_STEPS.map((s, i) => `<div class="card"><h3>${i + 1}. ${s.t}</h3><p class="sub">${s.d}</p></div>`).join("") +
    `<div class="warn"><b>If it stays dark:</b> talk to someone you trust, or a professional. Spiritual crisis is real and help is strength — the national crisis line in the US is 988, in Canada 1-833-456-4566.</div>`;
}

function vJournal() {
  const entries = store.get("journal", []);
  const prompt = JOURNAL_PROMPTS[new Date().getDate() % JOURNAL_PROMPTS.length];
  return `<h2>📓 Awakening Journal</h2>
  <div class="card gold"><h3>What IS an awakening journal?</h3>
  <p class="sub">It's not a diary. It's a <b>lab notebook for your consciousness</b>. When awakening starts, strange things happen — vivid dreams, coincidences, body sensations, insights that vanish by morning. If you don't write them down, you'll convince yourself they didn't happen. Written down, patterns emerge over weeks: your dreams get clearer before your intuition sharpens; your symptoms spike before breakthroughs. The journal is how you prove to yourself it's real.</p>
  <p class="sub"><b>What to write:</b> dreams (every fragment), synchronicities (what happened + the timing), body sensations during practice (where exactly), insights and the beliefs they replaced, moon phase + energy level, what you created that day.</p></div>
  <div class="card"><h3>💡 Today's prompt</h3><p class="sub"><i>"${prompt}"</i></p>
  <label class="f-label">New entry</label>
  <textarea id="jtext" rows="4" placeholder="Write freely — no one reads this but you."></textarea>
  <button class="btn btn-gold btn-block" onclick="saveJournal()">Save entry</button></div>` +
    (entries.length ? entries.slice().reverse().map(e => `<div class="journal-entry"><div class="date">${e.d}</div><p>${e.t}</p></div>`).join("")
    : `<div class="card"><p class="sub"><i>No entries yet. Your first one: write what brought you here — what happened that made you download this app?</i></p></div>`);
}
function saveJournal() {
  const t = $("#jtext").value.trim();
  if (!t) return;
  const entries = store.get("journal", []);
  entries.push({ d: new Date().toLocaleString(), t: t.replace(/</g, "&lt;") });
  store.set("journal", entries);
  location.hash = "#/journal"; render();
}

function vPractice() {
  const days = store.get("streak", []);
  const t = todayStr();
  const done = days.includes(t);
  let streak = 0;
  const d = new Date();
  while (days.includes(d.toISOString().slice(0, 10))) { streak++; d.setDate(d.getDate() - 1); }
  return `<h2>🔥 Daily Practice</h2><p class="sub">One non-negotiable practice a day keeps the awakening on track. Check in to keep your streak.</p>
  <div class="card" style="text-align:center"><div class="streak-ring">${streak}</div>
  <p class="sub">day streak</p>
  ${done ? `<p style="color:var(--gold)">✅ Checked in today. See you tomorrow.</p>`
    : `<button class="btn btn-gold btn-block" onclick="checkIn()">✓ I practiced today</button>`}</div>
  <div class="card"><h3>Pick your non-negotiable</h3><ul class="clean">
  <li>🧘 10 min silent sitting</li><li>🔊 One frequency session</li><li>🚶 Barefoot grounding 10 min</li>
  <li>📓 Journal one page</li><li>🌬️ 5 rounds box breathing</li></ul></div>`;
}
function checkIn() {
  const days = store.get("streak", []);
  const t = todayStr();
  if (!days.includes(t)) days.push(t);
  store.set("streak", days);
  render();
}

/* ---------- scripture reader ---------- */
function vScripture() {
  const books = [...SCRIPTURE].sort((a, b) => a.order - b.order);
  return `<h2>\uD83D\uDCDA Scripture Reader</h2>
  <p class="sub">The Bible and the Apocrypha in canonical order, King James text (public domain) — with the metaphor decoded verse by verse. Tap \uD83D\uDD0D on any verse to see what it means.</p>` +
    books.map(b => `<a class="tile" href="#/scripture/${b.id}"><div class="icon">\uD83D\uDCD6</div><h3>${b.name}</h3><p>${b.intro.slice(0, 95)}\u2026</p></a>`).join("");
}
function vScriptureBook(id) {
  const b = SCRIPTURE.find(x => x.id === id);
  if (!b) return `<h2>Not found</h2>`;
  return `<h2>\uD83D\uDCD6 ${b.name}</h2><p class="sub">${b.intro}</p>` +
    b.chapters.map(c => `<a class="tile" href="#/scripture/${b.id}/${c.n}"><div class="icon">\uD83D\uDCC4</div><h3>Chapter ${c.n}</h3><p>${c.verses.length} verses with notes</p></a>`).join("");
}
function vScriptureChapter(bookId, chN) {
  const b = SCRIPTURE.find(x => x.id === bookId);
  const c = b && b.chapters.find(x => x.n === Number(chN));
  if (!c) return `<h2>Not found</h2>`;
  const verses = c.verses.map(v => `
    <div class="card" style="margin-bottom:8px">
      <p><b style="color:var(--gold)">${v.n}</b> ${v.t}</p>
      ${v.note ? `<a href="javascript:void(0)" onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'" style="color:var(--gold);font-size:14px">\uD83D\uDD0D what this means</a><div style="display:none;margin-top:8px;padding:10px;border-left:3px solid var(--gold);background:rgba(255,215,0,.06);border-radius:8px"><p class="sub" style="margin:0">${v.note}</p><p style="margin:8px 0 0"><a href="#/hearth/bible-metaphors" style="color:var(--gold);font-size:13px">Learn the decoding method \u2192</a></p></div>` : ""}
    </div>`).join("");
  return `<h2>${b.name} ${c.n} <span class="sub">KJV</span></h2>
  <p class="sub"><a href="#/scripture/${b.id}" style="color:var(--gold)">\u2190 ${b.name}</a> · <a href="#/scripture" style="color:var(--gold)">All books</a></p>${verses}`;
}

/* ---------- router ---------- */
const routes = [
  [/^#\/?$/, vHome],
  [/^#\/path$/, vPath],
  [/^#\/frequencies$/, vFrequencies],
  [/^#\/chakras$/, vChakras],
  [/^#\/chakra\/([\w-]+)$/, (m) => vChakra(m[1])],
  [/^#\/luminaries$/, vLuminaries],
  [/^#\/fingers$/, vFingers],
  [/^#\/mudra\/([\w-]+)$/, (m) => vMudra(m[1])],
  [/^#\/points$/, vPoints],
  [/^#\/point\/([a-z0-9-]+)$/, (m) => vPointLesson(m[1])],
  [/^#\/astral$/, vAstral],
  [/^#\/pineal$/, vPineal],
  [/^#\/hearth$/, vHearth],
  [/^#\/hearth\/([\w-]+)$/, (m) => vHearthLesson(m[1])],
  [/^#\/labels$/, vLabels],
  [/^#\/label\/([\w-]+)$/, (m) => vLabel(m[1])],
  [/^#\/diet$/, vDiet],
  [/^#\/tesla$/, vTesla],
  [/^#\/shilajit$/, vShilajit],
  [/^#\/manifest$/, vManifest],
  [/^#\/bible$/, vBible],
  [/^#\/scripture$/, vScripture],
  [/^#\/scripture\/([\w-]+)$/, (m) => vScriptureBook(m[1])],
  [/^#\/scripture\/([\w-]+)\/(\d+)$/, (m) => vScriptureChapter(m[1], m[2])],
  [/^#\/sos$/, vSos],
  [/^#\/journal$/, vJournal],
  [/^#\/practice$/, vPractice],
];
function render() {
  stopTone();
  const h = location.hash || "#/";
  for (const [re, fn] of routes) {
    const m = h.match(re);
    if (m) { app.innerHTML = fn(m); break; }
  }
  window.scrollTo(0, 0);
  document.querySelectorAll("#mainNav a").forEach(a =>
    a.classList.toggle("active", a.getAttribute("href") === h));
  $("#mainNav").classList.remove("open");
}
window.addEventListener("hashchange", render);

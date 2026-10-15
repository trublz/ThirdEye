/* ThirdEye — hand-drawn SVG diagrams for the Hearth wing. */

const DIAGRAMS = {

"chakra-column": `<svg viewBox="0 0 200 460" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:260px;display:block;margin:0 auto">
<ellipse cx="100" cy="60" rx="34" ry="40" fill="none" stroke="#b9a8d6" stroke-width="2"/>
<path d="M100 100 L100 400" stroke="#b9a8d6" stroke-width="3"/>
<path d="M60 180 L140 180 M70 260 L130 260" stroke="#b9a8d6" stroke-width="2"/>
<path d="M100 400 L78 448 M100 400 L122 448" stroke="#b9a8d6" stroke-width="2"/>
${[["b366ff","52","Crown","963"],["6a5cff","108","Third Eye","852"],["4da3ff","160","Throat","741"],["3ddc84","216","Heart","639"],["ffcf4d","272","Solar Plexus","528"],["f4842b","324","Sacral","417"],["e63946","376","Root","396"]].map(c=>
`<circle cx="100" cy="${c[1]}" r="17" fill="${c[0]}" opacity="0.85"><animate attributeName="r" values="15;18;15" dur="3s" repeatCount="indefinite"/></circle>
<text x="126" y="${+c[1]-2}" fill="#f4eefb" font-size="11" font-family="sans-serif">${c[2]}</text>
<text x="126" y="${+c[1]+12}" fill="#e8b94a" font-size="10" font-family="sans-serif">${c[3]} Hz</text>`).join("")}
</svg>`,

"torus": `<svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<defs><radialGradient id="tg" cx="50%" cy="50%" r="50%">
<stop offset="0%" stop-color="#e8b94a" stop-opacity="0.9"/><stop offset="100%" stop-color="#e8b94a" stop-opacity="0"/></radialGradient></defs>
<ellipse cx="150" cy="170" rx="120" ry="140" fill="none" stroke="#b366ff" stroke-width="2" opacity="0.7"/>
<ellipse cx="150" cy="170" rx="88" ry="104" fill="none" stroke="#6a5cff" stroke-width="2" opacity="0.55"/>
<ellipse cx="150" cy="170" rx="56" ry="68" fill="none" stroke="#4da3ff" stroke-width="2" opacity="0.4"/>
<ellipse cx="150" cy="60" rx="26" ry="30" fill="none" stroke="#f4eefb" stroke-width="2"/>
<line x1="150" y1="90" x2="150" y2="260" stroke="#f4eefb" stroke-width="3"/>
<line x1="150" y1="140" x2="118" y2="170" stroke="#f4eefb" stroke-width="2"/>
<line x1="150" y1="140" x2="182" y2="170" stroke="#f4eefb" stroke-width="2"/>
<line x1="150" y1="260" x2="134" y2="300" stroke="#f4eefb" stroke-width="2"/>
<line x1="150" y1="260" x2="166" y2="300" stroke="#f4eefb" stroke-width="2"/>
<circle cx="150" cy="150" r="16" fill="url(#tg)"/>
<text x="150" y="150" text-anchor="middle" dy="4" font-size="11" fill="#0e0618" font-family="sans-serif" font-weight="bold">♥</text>
<path d="M150 40 Q170 90 150 140" fill="none" stroke="#e8b94a" stroke-width="2" marker-end="url(#ah)"/>
<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#e8b94a" stroke-width="1.5"/></marker></defs>
<text x="150" y="330" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">energy rises through the center, fountains out, returns below</text>
</svg>`,

"tesla369": `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto">
<circle cx="150" cy="150" r="100" fill="none" stroke="#3a2458" stroke-width="2"/>
${[[150,50,"1"],[237,100,"2"],[237,200,"4"],[150,250,"8"],[63,200,"7"],[63,100,"5"]].map(p=>
`<circle cx="${p[0]}" cy="${p[1]}" r="20" fill="#1e1035" stroke="#e8b94a" stroke-width="2"/>
<text x="${p[0]}" y="${p[1]}" text-anchor="middle" dy="6" fill="#f4eefb" font-size="16" font-family="sans-serif" font-weight="bold">${p[2]}</text>`).join("")}
<path d="M150 70 L220 108 M248 130 L248 170 M220 192 L168 240 M132 240 L80 192 M52 170 L52 130 M80 108 L132 70" stroke="#e8b94a" stroke-width="1.5" fill="none" opacity="0.7"/>
<text x="150" y="14" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif" font-weight="bold">3 · 6 · 9</text>
<text x="150" y="292" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">govern from outside the doubling pattern</text>
</svg>`,

"luminaries": `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:330px;display:block;margin:0 auto">
${[["☀️","Sun","Gold","#ffcf4d",0],["🌙","Moon","Silver","#c0c8e8",51.4],["♂️","Mars","Iron","#e63946",102.8],["☿️","Mercury","Quicksilver","#4da3ff",154.3],["♃","Jupiter","Tin","#3ddc84",205.7],["♀️","Venus","Copper","#f4842b",257.1],["♄","Saturn","Lead","#8a7fa8",308.6]].map(p=>{
const a=(p[4]-90)*Math.PI/180, x=160+118*Math.cos(a), y=160+118*Math.sin(a);
return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="26" fill="#1e1035" stroke="${p[3]}" stroke-width="2"/>
<text x="${x.toFixed(0)}" y="${(y-4).toFixed(0)}" text-anchor="middle" font-size="15">${p[0]}</text>
<text x="${x.toFixed(0)}" y="${(y+12).toFixed(0)}" text-anchor="middle" fill="#f4eefb" font-size="8" font-family="sans-serif">${p[1]}</text>
<text x="${x.toFixed(0)}" y="${(y+22).toFixed(0)}" text-anchor="middle" fill="${p[3]}" font-size="7" font-family="sans-serif">${p[2]}</text>`}).join("")}
<circle cx="160" cy="160" r="34" fill="#e8b94a" opacity="0.15" stroke="#e8b94a" stroke-width="2"/>
<text x="160" y="156" text-anchor="middle" font-size="14">🧍</text>
<text x="160" y="172" text-anchor="middle" fill="#e8b94a" font-size="9" font-family="sans-serif">YOU</text>
<text x="160" y="312" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">as above, so below — the week is a ritual</text>
</svg>`,

"saturn-cube": `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto">
<g transform="translate(75,30)">
<polygon points="75,10 130,42 130,108 75,140 20,108 20,42" fill="none" stroke="#8a7fa8" stroke-width="2"/>
<line x1="75" y1="10" x2="75" y2="75" stroke="#8a7fa8" stroke-width="1.5"/>
<line x1="20" y1="42" x2="75" y2="75" stroke="#8a7fa8" stroke-width="1.5"/>
<line x1="130" y1="42" x2="75" y2="75" stroke="#8a7fa8" stroke-width="1.5"/>
<line x1="75" y1="75" x2="75" y2="140" stroke="#8a7fa8" stroke-width="1.5"/>
<text x="75" y="165" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">the cube of matter — 6 sides</text>
</g>
<g transform="translate(215,55)">
<polygon points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16" fill="none" stroke="#e8b94a" stroke-width="2"/>
<polygon points="0,32 28,16 28,-16 0,-32 -28,-16 -28,16" fill="none" stroke="#e8b94a" stroke-width="2" opacity="0.6"/>
<text x="0" y="58" text-anchor="middle" fill="#e8b94a" font-size="13" font-family="sans-serif" font-weight="bold">6·6·6</text>
<text x="0" y="74" text-anchor="middle" fill="#b9a8d6" font-size="10" font-family="sans-serif">6 points · 6 triangles · 6 sides</text>
</g>
<text x="150" y="245" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">carbon: 6 protons · 6 neutrons · 6 electrons</text>
</svg>`,

"pineal-brain": `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<path d="M60 110 C60 50 110 25 150 25 C190 25 240 50 240 110 C240 165 195 195 150 195 C105 195 60 165 60 110 Z" fill="none" stroke="#b9a8d6" stroke-width="2"/>
<path d="M85 110 C85 70 115 50 150 50" fill="none" stroke="#3a2458" stroke-width="1.5"/>
<path d="M215 110 C215 70 185 50 150 50" fill="none" stroke="#3a2458" stroke-width="1.5"/>
<circle cx="150" cy="118" r="10" fill="#6a5cff"><animate attributeName="r" values="8;11;8" dur="3s" repeatCount="indefinite"/></circle>
<circle cx="150" cy="118" r="18" fill="none" stroke="#6a5cff" stroke-width="1" opacity="0.5"/>
<text x="150" y="160" text-anchor="middle" fill="#6a5cff" font-size="12" font-family="sans-serif" font-weight="bold">pineal gland</text>
<text x="150" y="176" text-anchor="middle" fill="#b9a8d6" font-size="10" font-family="sans-serif">the holy of holies — geometric center of the brain</text>
<text x="52" y="60" fill="#b9a8d6" font-size="10" font-family="sans-serif">temples →</text>
<line x1="70" y1="58" x2="95" y2="70" stroke="#b9a8d6" stroke-width="1"/>
</svg>`,

"firmament": `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;display:block;margin:0 auto">
<rect x="10" y="190" width="300" height="40" fill="#1e5c3a" opacity="0.5"/>
<path d="M20 190 A140 140 0 0 1 300 190" fill="none" stroke="#4da3ff" stroke-width="3"/>
<path d="M20 190 A140 140 0 0 1 300 190" fill="#4da3ff" opacity="0.08"/>
<text x="160" y="60" text-anchor="middle" font-size="22">☀️</text>
<text x="110" y="100" text-anchor="middle" font-size="16">🌙</text>
<text x="215" y="95" text-anchor="middle" font-size="10" fill="#f4eefb">✦ ✦ ✦</text>
<path d="M30 175 Q160 150 290 175" stroke="#8a7fa8" stroke-width="6" fill="none" opacity="0.6"/>
<text x="160" y="215" text-anchor="middle" fill="#f4eefb" font-size="11" font-family="sans-serif">the enclosed garden — lights within the dome</text>
</svg>`,

"temple-body": `<svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;display:block;margin:0 auto">
<ellipse cx="150" cy="55" rx="30" ry="36" fill="none" stroke="#b9a8d6" stroke-width="2"/>
<path d="M150 91 L150 280 M110 140 L190 140 M120 280 L180 280" stroke="#b9a8d6" stroke-width="2"/>
<path d="M150 280 L132 350 M150 280 L168 350" stroke="#b9a8d6" stroke-width="2"/>
<rect x="96" y="20" width="108" height="46" fill="none" stroke="#b366ff" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="210" y="36" fill="#b366ff" font-size="10" font-family="sans-serif">holy of holies</text>
<text x="210" y="50" fill="#b9a8d6" font-size="10" font-family="sans-serif">pineal — God within</text>
<rect x="96" y="100" width="108" height="90" fill="none" stroke="#4da3ff" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="210" y="140" fill="#4da3ff" font-size="10" font-family="sans-serif">inner court</text>
<text x="210" y="154" fill="#b9a8d6" font-size="10" font-family="sans-serif">the mind</text>
<rect x="80" y="200" width="140" height="160" fill="none" stroke="#e8b94a" stroke-width="1.5" stroke-dasharray="4,3"/>
<text x="226" y="270" fill="#e8b94a" font-size="10" font-family="sans-serif">outer court</text>
<text x="226" y="284" fill="#b9a8d6" font-size="10" font-family="sans-serif">the body</text>
</svg>`,

"masks": `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:330px;display:block;margin:0 auto">
<circle cx="160" cy="130" r="42" fill="#e8b94a" opacity="0.85"/>
<text x="160" y="138" text-anchor="middle" font-size="22">☀️</text>
${[["✝️","Jesus",52],["𓂀","Horus",104],["🔥","Mithra",156],["🕉️","Krishna",208]].map(m=>
`<circle cx="${m[2]}" cy="222" r="24" fill="#1e1035" stroke="#b9a8d6" stroke-width="2"/>
<text x="${m[2]}" y="230" text-anchor="middle" font-size="18">${m[0]}</text>
<text x="${m[2]}" y="258" text-anchor="middle" fill="#b9a8d6" font-size="9" font-family="sans-serif">${m[1]}</text>
<line x1="160" y1="172" x2="${m[2]}" y2="200" stroke="#e8b94a" stroke-width="1" opacity="0.5"/>`).join("")}
<text x="160" y="30" text-anchor="middle" fill="#e8b94a" font-size="13" font-family="sans-serif" font-weight="bold">one story, many masks</text>
</svg>`,

"ether-waves": `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:330px;display:block;margin:0 auto">
${[90,70,50,30].map((r,i)=>`<circle cx="160" cy="110" r="${r}" fill="none" stroke="#4da3ff" stroke-width="2" opacity="${0.25+i*0.2}"/>`).join("")}
<circle cx="160" cy="110" r="8" fill="#e8b94a"/>
<text x="160" y="114" text-anchor="middle" font-size="9" fill="#0e0618" font-weight="bold">✦</text>
<text x="160" y="200" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">thought ripples through the medium</text>
<text x="160" y="20" text-anchor="middle" fill="#4da3ff" font-size="13" font-family="sans-serif" font-weight="bold">the ether: the pond everything swims in</text>
</svg>`,

"manifest": `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:330px;display:block;margin:0 auto">
<circle cx="80" cy="90" r="38" fill="#1e1035" stroke="#4da3ff" stroke-width="2"/>
<text x="80" y="98" text-anchor="middle" font-size="22">🧠</text>
<text x="80" y="146" text-anchor="middle" fill="#4da3ff" font-size="10" font-family="sans-serif">thoughts = ELECTRIC</text>
<circle cx="240" cy="90" r="38" fill="#1e1035" stroke="#e63946" stroke-width="2"/>
<text x="240" y="98" text-anchor="middle" font-size="22">❤️</text>
<text x="240" y="146" text-anchor="middle" fill="#e63946" font-size="10" font-family="sans-serif">emotions = MAGNETIC</text>
<path d="M118 90 L160 90 M160 90 L160 160 M160 160 L202 90 M118 90 L202 90" fill="none" stroke="#e8b94a" stroke-width="2"/>
<circle cx="160" cy="185" r="30" fill="#e8b94a" opacity="0.2" stroke="#e8b94a" stroke-width="2"/>
<text x="160" y="192" text-anchor="middle" font-size="20">🌍</text>
<text x="160" y="228" text-anchor="middle" fill="#e8b94a" font-size="11" font-family="sans-serif">coherence → reality</text>
</svg>`,

"plate": `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<circle cx="160" cy="105" r="85" fill="none" stroke="#b9a8d6" stroke-width="2"/>
<path d="M160 105 L160 20 A85 85 0 0 1 245 105 Z" fill="#3ddc84" opacity="0.35"/>
<path d="M160 105 L245 105 A85 85 0 0 1 160 190 Z" fill="#3ddc84" opacity="0.25"/>
<path d="M160 105 L160 190 A85 85 0 0 1 75 105 Z" fill="#e8b94a" opacity="0.3"/>
<path d="M160 105 L75 105 A85 85 0 0 1 160 20 Z" fill="#3ddc84" opacity="0.35"/>
<text x="160" y="60" text-anchor="middle" font-size="20">🥬</text>
<text x="205" y="130" text-anchor="middle" font-size="20">🍎</text>
<text x="115" y="130" text-anchor="middle" font-size="20">🥑</text>
<text x="160" y="200" text-anchor="middle" fill="#3ddc84" font-size="12" font-family="sans-serif" font-weight="bold">80% alkaline-forming · 20% everything else</text>
</svg>`,

"terrain": `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:330px;display:block;margin:0 auto">
<text x="60" y="50" font-size="26">☀️</text>
<text x="240" y="55" font-size="24">💧</text>
<rect x="20" y="170" width="280" height="50" fill="#1e5c3a" opacity="0.5"/>
<ellipse cx="160" cy="60" rx="28" ry="34" fill="none" stroke="#f4eefb" stroke-width="2"/>
<line x1="160" y1="94" x2="160" y2="160" stroke="#f4eefb" stroke-width="3"/>
<line x1="160" y1="160" x2="145" y2="192" stroke="#f4eefb" stroke-width="2"/>
<line x1="160" y1="160" x2="175" y2="192" stroke="#f4eefb" stroke-width="2"/>
<line x1="145" y1="192" x2="145" y2="205" stroke="#e8b94a" stroke-width="2"/>
<line x1="175" y1="192" x2="175" y2="205" stroke="#e8b94a" stroke-width="2"/>
<text x="160" y="232" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">clean the terrain — sun, water, earth, food, sleep, movement</text>
</svg>`,

"moonphases": `<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:360px;display:block;margin:0 auto">
${[["🌑",30],["🌒",72],["🌓",114],["🌔",156],["🌕",198],["🌖",240],["🌗",282],["🌘",324]].map(m=>
`<text x="${m[1]}" y="55" text-anchor="middle" font-size="26">${m[0]}</text>`).join("")}
<text x="170" y="100" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">track your energy against her phases for one cycle</text>
</svg>`,

"blackmirror": `<svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:240px;display:block;margin:0 auto">
<rect x="70" y="20" width="100" height="200" rx="16" fill="#0a0a12" stroke="#3a2458" stroke-width="3"/>
<rect x="80" y="32" width="80" height="176" rx="8" fill="#000"/>
<path d="M120 120 m-35 0 a35 35 0 1 0 70 0 a35 35 0 1 0 -70 0" fill="none" stroke="#b366ff" stroke-width="2" opacity="0.8"/>
<path d="M120 120 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" fill="none" stroke="#6a5cff" stroke-width="2" opacity="0.6"/>
<path d="M120 120 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" fill="none" stroke="#e8b94a" stroke-width="2" opacity="0.8"/>
<text x="120" y="255" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">the portal: who programs</text>
<text x="120" y="270" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">what comes through?</text>
</svg>`,

"letter-i": `<svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:240px;display:block;margin:0 auto">
<text x="120" y="230" text-anchor="middle" font-size="200" fill="none" stroke="#e8b94a" stroke-width="3" font-family="serif">I</text>
<line x1="120" y1="80" x2="120" y2="210" stroke="#6a5cff" stroke-width="2" stroke-dasharray="5,4"/>
<text x="150" y="100" fill="#6a5cff" font-size="10" font-family="sans-serif">the spine</text>
<circle cx="120" cy="70" r="14" fill="none" stroke="#6a5cff" stroke-width="2"/>
<text x="150" y="66" fill="#6a5cff" font-size="10" font-family="sans-serif">the brain</text>
<text x="120" y="285" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">the letter is a diagram of YOU</text>
</svg>`,

"thought-to-thing": `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:330px;display:block;margin:0 auto">
<ellipse cx="70" cy="60" rx="45" ry="32" fill="none" stroke="#4da3ff" stroke-width="2"/>
<text x="70" y="68" text-anchor="middle" font-size="20">💭</text>
<circle cx="130" cy="60" r="5" fill="#4da3ff" opacity="0.6"/>
<circle cx="148" cy="60" r="4" fill="#4da3ff" opacity="0.4"/>
<path d="M162 60 L210 60" stroke="#e8b94a" stroke-width="3" marker-end="url(#ah2)"/>
<defs><marker id="ah2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="#e8b94a" stroke-width="1.5"/></marker></defs>
<text x="250" y="70" text-anchor="middle" font-size="28">✏️</text>
<text x="70" y="115" text-anchor="middle" fill="#4da3ff" font-size="10" font-family="sans-serif">thought</text>
<text x="250" y="115" text-anchor="middle" fill="#e8b94a" font-size="10" font-family="sans-serif">thing</text>
<text x="160" y="145" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">everything physical was mental first</text>
</svg>`,

"dimensions": `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<circle cx="160" cy="150" r="130" fill="none" stroke="#b366ff" stroke-width="2" opacity="0.6"/>
<circle cx="160" cy="150" r="92" fill="none" stroke="#4da3ff" stroke-width="2" opacity="0.7"/>
<circle cx="160" cy="150" r="54" fill="none" stroke="#e8b94a" stroke-width="2" opacity="0.8"/>
<circle cx="160" cy="150" r="16" fill="#e8b94a" opacity="0.25"/>
<text x="160" y="34" text-anchor="middle" fill="#b366ff" font-size="12" font-family="sans-serif" font-weight="bold">5D · unity</text>
<text x="160" y="72" text-anchor="middle" fill="#4da3ff" font-size="12" font-family="sans-serif" font-weight="bold">4D · time / astral</text>
<text x="160" y="112" text-anchor="middle" fill="#e8b94a" font-size="12" font-family="sans-serif" font-weight="bold">3D · physical</text>
<text x="160" y="154" text-anchor="middle" font-size="14">🧍</text>
<text x="160" y="290" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">ascension isn't going somewhere — it's tuning</text>
</svg>`,

"grounding": `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto">
<rect x="0" y="240" width="320" height="60" fill="#1e5c3a" opacity="0.6"/>
<text x="160" y="282" text-anchor="middle" fill="#3ddc84" font-size="12" font-family="sans-serif" font-weight="bold">EARTH · reservoir of free electrons (−)</text>
<ellipse cx="160" cy="130" rx="60" ry="90" fill="none" stroke="#e8b94a" stroke-width="2" opacity="0.7"/>
<ellipse cx="160" cy="130" rx="38" ry="62" fill="none" stroke="#b366ff" stroke-width="2" opacity="0.5"/>
<circle cx="160" cy="100" r="14" fill="none" stroke="#f4eefb" stroke-width="2"/>
<line x1="160" y1="114" x2="160" y2="190" stroke="#f4eefb" stroke-width="3"/>
<line x1="160" y1="190" x2="150" y2="240" stroke="#f4eefb" stroke-width="2"/>
<line x1="160" y1="190" x2="170" y2="240" stroke="#f4eefb" stroke-width="2"/>
<circle cx="130" cy="220" r="4" fill="#4da3ff"/><circle cx="175" cy="200" r="4" fill="#4da3ff"/>
<circle cx="150" cy="255" r="4" fill="#4da3ff"/><circle cx="190" cy="235" r="4" fill="#4da3ff"/>
<circle cx="115" cy="245" r="4" fill="#4da3ff"/>
<text x="160" y="30" text-anchor="middle" fill="#e8b94a" font-size="12" font-family="sans-serif" font-weight="bold">your field plugs into the Earth's field</text>
</svg>`,

"matrix": `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
${Array.from({length:6},(_,r)=>`<line x1="40" y1="${40+r*32}" x2="280" y2="${40+r*32}" stroke="#3a2458" stroke-width="1.5"/>`).join("")}
${Array.from({length:8},(_,c)=>`<line x1="${40+c*34}" y1="40" x2="${40+c*34}" y2="200" stroke="#3a2458" stroke-width="1.5"/>`).join("")}
<rect x="142" y="120" width="36" height="80" fill="#0e0618" stroke="#e8b94a" stroke-width="2"/>
<text x="160" y="145" text-anchor="middle" font-size="16">🚪</text>
<text x="160" y="228" text-anchor="middle" fill="#e8b94a" font-size="11" font-family="sans-serif">the exit was always there</text>
</svg>`,

"dreams": `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<text x="60" y="140" font-size="44">😴</text>
<ellipse cx="190" cy="60" rx="55" ry="38" fill="none" stroke="#4da3ff" stroke-width="2"/>
<ellipse cx="230" cy="110" rx="42" ry="30" fill="none" stroke="#b366ff" stroke-width="2" opacity="0.7"/>
<ellipse cx="195" cy="150" rx="30" ry="22" fill="none" stroke="#e8b94a" stroke-width="2" opacity="0.5"/>
<circle cx="105" cy="115" r="4" fill="#4da3ff"/><circle cx="120" cy="100" r="3" fill="#4da3ff"/>
<text x="160" y="192" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">every night you travel — start remembering</text>
</svg>`,

"heart-field": `<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto">
<circle cx="150" cy="120" r="90" fill="none" stroke="#e63946" stroke-width="2" opacity="0.3"/>
<circle cx="150" cy="120" r="65" fill="none" stroke="#e63946" stroke-width="2" opacity="0.5"/>
<circle cx="150" cy="120" r="40" fill="none" stroke="#e63946" stroke-width="2" opacity="0.7"/>
<text x="150" y="135" text-anchor="middle" font-size="34">❤️</text>
<text x="150" y="225" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">the heart broadcasts further than the brain</text>
</svg>`,

"meditation": `<svg viewBox="0 0 240 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:240px;display:block;margin:0 auto">
<line x1="120" y1="60" x2="120" y2="210" stroke="#e8b94a" stroke-width="3"/>
<circle cx="120" cy="48" r="16" fill="none" stroke="#f4eefb" stroke-width="2"/>
<path d="M120 100 L70 150 M120 100 L170 150" stroke="#f4eefb" stroke-width="2"/>
<path d="M120 210 L80 250 M120 210 L160 250" stroke="#f4eefb" stroke-width="2"/>
<circle cx="120" cy="130" r="5" fill="#b366ff"><animate attributeName="r" values="5;9;5" dur="3s" repeatCount="indefinite"/></circle>
<text x="120" y="275" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">spine straight · breath slow · watch</text>
</svg>`,

"siddhis": `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<circle cx="160" cy="110" r="34" fill="none" stroke="#e8b94a" stroke-width="2"/>
<text x="160" y="122" text-anchor="middle" font-size="26">👁️</text>
${[0,45,90,135,180,225,270,315].map(a=>{const r1=44,r2=80,x1=160+r1*Math.cos(a*Math.PI/180),y1=110+r1*Math.sin(a*Math.PI/180),x2=160+r2*Math.cos(a*Math.PI/180),y2=110+r2*Math.sin(a*Math.PI/180);return `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="#b366ff" stroke-width="2" opacity="0.7"/>`}).join("")}
<text x="160" y="225" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">powers are byproducts — not the goal</text>
</svg>`,

"veil": `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<rect x="30" y="30" width="120" height="160" fill="#1e1035" stroke="#4da3ff" stroke-width="2"/>
<text x="90" y="105" text-anchor="middle" fill="#4da3ff" font-size="11" font-family="sans-serif">ordinary</text>
<text x="90" y="122" text-anchor="middle" fill="#4da3ff" font-size="11" font-family="sans-serif">world</text>
<rect x="170" y="30" width="120" height="160" fill="#1e1035" stroke="#b366ff" stroke-width="2"/>
<text x="230" y="105" text-anchor="middle" fill="#b366ff" font-size="11" font-family="sans-serif">the rest</text>
<line x1="150" y1="30" x2="150" y2="190" stroke="#e8b94a" stroke-width="2" stroke-dasharray="6,5"/>
<text x="150" y="210" text-anchor="middle" fill="#e8b94a" font-size="11" font-family="sans-serif">the veil (it thins)</text>
</svg>`,

"yinyang": `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:240px;display:block;margin:0 auto">
<circle cx="120" cy="120" r="90" fill="#0e0618" stroke="#b9a8d6" stroke-width="2"/>
<path d="M120 30 A90 90 0 0 1 120 210 A45 45 0 0 1 120 120 A45 45 0 0 0 120 30" fill="#f4eefb" opacity="0.85"/>
<circle cx="120" cy="75" r="12" fill="#0e0618"/>
<circle cx="120" cy="165" r="12" fill="#f4eefb" opacity="0.9"/>
<text x="120" y="228" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">masculine + feminine: the inner marriage</text>
</svg>`,

"binary": `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<text x="80" y="80" text-anchor="middle" font-size="44" fill="#4da3ff" font-family="monospace">1</text>
<text x="240" y="80" text-anchor="middle" font-size="44" fill="#b366ff" font-family="monospace">0</text>
<text x="80" y="115" text-anchor="middle" fill="#4da3ff" font-size="10" font-family="sans-serif">the One · consciousness</text>
<text x="240" y="115" text-anchor="middle" fill="#b366ff" font-size="10" font-family="sans-serif">the void · potential</text>
<text x="160" y="145" text-anchor="middle" fill="#e8b94a" font-size="11" font-family="sans-serif">creation = 1 meeting 0</text>
</svg>`,

"kundalini": `<svg viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:220px;display:block;margin:0 auto">
<line x1="120" y1="30" x2="120" y2="270" stroke="#e8b94a" stroke-width="3"/>
<path d="M120 270 Q90 250 110 230 Q130 210 110 190 Q90 170 110 150" fill="none" stroke="#e63946" stroke-width="4"/>
<circle cx="120" cy="30" r="12" fill="none" stroke="#b366ff" stroke-width="2"/>
<text x="120" y="295" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">the serpent rises when the nest is ready</text>
</svg>`,

"shadow": `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto">
<circle cx="150" cy="90" r="30" fill="#f4eefb" opacity="0.9"/>
<ellipse cx="150" cy="200" rx="70" ry="16" fill="#000" opacity="0.7"/>
<path d="M150 120 L110 190 M150 120 L190 190" stroke="#f4eefb" stroke-width="8" opacity="0.25"/>
<text x="150" y="45" text-anchor="middle" fill="#e8b94a" font-size="11" font-family="sans-serif">what you bury still casts a shadow</text>
</svg>`,

"sebi-plate": `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<circle cx="160" cy="105" r="85" fill="none" stroke="#3ddc84" stroke-width="2"/>
<text x="110" y="80" text-anchor="middle" font-size="24">🥬</text>
<text x="200" y="85" text-anchor="middle" font-size="24">🍎</text>
<text x="160" y="130" text-anchor="middle" font-size="24">🥑</text>
<text x="120" y="140" text-anchor="middle" font-size="20">🌰</text>
<text x="200" y="135" text-anchor="middle" font-size="20">🍇</text>
<text x="160" y="205" text-anchor="middle" fill="#3ddc84" font-size="12" font-family="sans-serif" font-weight="bold">electric foods only: seeded · natural · alive</text>
</svg>`,

"christos-cycle": `<svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;display:block;margin:0 auto">
<circle cx="150" cy="170" r="110" fill="none" stroke="#e8b94a" stroke-width="2" stroke-dasharray="6 4"/>
<text x="150" y="52" text-anchor="middle" font-size="22">🌙</text>
<text x="150" y="72" text-anchor="middle" fill="#e8b94a" font-size="10" font-family="sans-serif">moon enters your</text>
<text x="150" y="84" text-anchor="middle" fill="#e8b94a" font-size="10" font-family="sans-serif">Sun sign: seed born</text>
<text x="262" y="150" text-anchor="middle" font-size="20">\u2B07</text>
<text x="266" y="185" text-anchor="middle" fill="#b9a8d6" font-size="10" font-family="sans-serif">descent</text>
<text x="150" y="292" text-anchor="middle" font-size="22">\u26B0</text>
<text x="150" y="312" text-anchor="middle" fill="#b9a8d6" font-size="10" font-family="sans-serif">the tomb: 2.5 days</text>
<text x="38" y="150" text-anchor="middle" font-size="20">\u2B06</text>
<text x="34" y="185" text-anchor="middle" fill="#b9a8d6" font-size="10" font-family="sans-serif">ascent</text>
<text x="150" y="170" text-anchor="middle" font-size="20">💧</text>
<text x="150" y="190" text-anchor="middle" fill="#e8b94a" font-size="10" font-family="sans-serif">33 vertebrae</text>
<text x="150" y="330" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">every month: 12 resurrections a year</text>
</svg>`,

"tesla-coil": `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;display:block;margin:0 auto">
<rect x="130" y="200" width="40" height="30" fill="#3a2d5c" stroke="#e8b94a" stroke-width="2"/>
<rect x="143" y="120" width="14" height="82" fill="#3a2d5c" stroke="#e8b94a" stroke-width="2"/>
<ellipse cx="150" cy="112" rx="34" ry="12" fill="none" stroke="#e8b94a" stroke-width="3"/>
<path d="M116 100 Q80 60 60 90 M184 100 Q220 60 240 90 M128 96 Q110 40 90 55 M172 96 Q190 40 210 55" fill="none" stroke="#7fd4ff" stroke-width="2"/>
<text x="150" y="252" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">resonance: the coil that threw lightning</text>
</svg>`,

"vortex-369": `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:320px;display:block;margin:0 auto">
<circle cx="160" cy="150" r="95" fill="none" stroke="#e8b94a" stroke-width="2"/>
<circle cx="160" cy="55" r="20" fill="#2a1f4d" stroke="#7fd4ff" stroke-width="2"/><text x="160" y="62" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">1</text>
<circle cx="242" cy="102" r="20" fill="#2a1f4d" stroke="#7fd4ff" stroke-width="2"/><text x="242" y="109" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">2</text>
<circle cx="242" cy="198" r="20" fill="#2a1f4d" stroke="#7fd4ff" stroke-width="2"/><text x="242" y="205" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">4</text>
<circle cx="160" cy="245" r="20" fill="#2a1f4d" stroke="#7fd4ff" stroke-width="2"/><text x="160" y="252" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">8</text>
<circle cx="78" cy="198" r="20" fill="#2a1f4d" stroke="#7fd4ff" stroke-width="2"/><text x="78" y="205" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">7</text>
<circle cx="78" cy="102" r="20" fill="#2a1f4d" stroke="#7fd4ff" stroke-width="2"/><text x="78" y="109" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">5</text>
<text x="160" y="150" text-anchor="middle" fill="#e8b94a" font-size="28" font-weight="bold" font-family="sans-serif">9</text>
<text x="160" y="172" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">3 &#8596; 6</text>
<text x="160" y="292" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">doubling: 1-2-4-8-7-5 \u2014 3, 6, 9 never appear</text>
</svg>`,

"wardenclyffe": `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;display:block;margin:0 auto">
<rect x="120" y="240" width="60" height="24" fill="#3a2d5c" stroke="#e8b94a" stroke-width="2"/>
<path d="M135 240 L145 130 M165 240 L155 130" stroke="#e8b94a" stroke-width="3"/>
<path d="M138 210 L162 210 M140 185 L160 185 M142 160 L158 160" stroke="#e8b94a" stroke-width="2"/>
<ellipse cx="150" cy="118" rx="30" ry="14" fill="none" stroke="#e8b94a" stroke-width="3"/>
<path d="M120 108 Q90 70 70 85 M180 108 Q210 70 230 85 M132 104 Q115 55 100 60 M168 104 Q185 55 200 60" fill="none" stroke="#7fd4ff" stroke-width="2"/>
<text x="150" y="292" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">Wardenclyffe, 1901 \u2014 wireless power for all</text>
</svg>`,

"shilajit": `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:280px;display:block;margin:0 auto">
<path d="M40 220 L110 80 L150 140 L190 60 L260 220 Z" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2"/>
<path d="M110 80 L125 100 M190 60 L178 85" stroke="#fff" stroke-width="3" opacity="0.5"/>
<ellipse cx="150" cy="185" rx="26" ry="14" fill="#1a1a1a" stroke="#e8b94a" stroke-width="2"/>
<path d="M150 171 Q148 160 150 150" stroke="#e8b94a" stroke-width="2" fill="none"/>
<text x="150" y="248" text-anchor="middle" fill="#b9a8d6" font-size="11" font-family="sans-serif">centuries of mountain, compressed into resin</text>
</svg>`,





















"mudra-handmap": `<svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><rect x="82" y="40" width="26" height="78" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="95" cy="40" r="6" fill="#5a4a7a"/><rect x="122" y="30" width="26" height="88" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="135" cy="30" r="6" fill="#5a4a7a"/><rect x="162" y="36" width="26" height="82" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="175" cy="36" r="6" fill="#5a4a7a"/><rect x="202" y="58" width="26" height="60" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="215" cy="58" r="6" fill="#5a4a7a"/><rect x="82" y="112" width="156" height="104" rx="30" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><line x1="92" y1="192" x2="52" y2="132" stroke="#2a1f4d" stroke-width="30" stroke-linecap="round"/><line x1="92" y1="192" x2="52" y2="132" stroke="#5a4a7a" stroke-width="30" stroke-linecap="round" fill="none" opacity="0.35"/><circle cx="52" cy="132" r="8" fill="#5a4a7a"/><text x="95" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Index</text><text x="135" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Middle</text><text x="175" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Ring</text><text x="215" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Pinky</text><text x="46" y="180" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Thumb</text><text x="160" y="18" text-anchor="middle" fill="#e8b94a" font-size="14" font-family="sans-serif">Every finger: an element + a chakra</text><text x="60" y="272" fill="#b9a8d6" font-size="13" font-family="sans-serif">🔥  Thumb</text><text x="150" y="272" fill="#e8b94a" font-size="13" font-family="sans-serif">Fire</text><text x="230" y="272" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Solar Plexus</text><text x="60" y="296" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌬️  Index</text><text x="150" y="296" fill="#e8b94a" font-size="13" font-family="sans-serif">Air</text><text x="230" y="296" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Heart</text><text x="60" y="320" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌌  Middle</text><text x="150" y="320" fill="#e8b94a" font-size="13" font-family="sans-serif">Ether</text><text x="230" y="320" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Throat</text><text x="60" y="344" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌍  Ring</text><text x="150" y="344" fill="#e8b94a" font-size="13" font-family="sans-serif">Earth</text><text x="230" y="344" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Root</text><text x="60" y="368" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌊  Pinky</text><text x="150" y="368" fill="#e8b94a" font-size="13" font-family="sans-serif">Water</text><text x="230" y="368" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Sacral</text></svg>`,
"mudra-gyan": `<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="64" y1="300" x2="148" y2="178" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="64" y1="300" x2="148" y2="178" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="196" y1="16" x2="172" y2="142" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="196" y1="16" x2="172" y2="142" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><circle cx="160" cy="160" r="26.0" fill="#ffd700" opacity="0.14"/><circle cx="160" cy="160" r="17.0" fill="#ffd700" opacity="0.30"/><circle cx="160" cy="160" r="10.0" fill="#ffd700" opacity="0.95"/><line x1="144.0" y1="160" x2="176.0" y2="160" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><line x1="160" y1="144.0" x2="160" y2="176.0" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><text x="64" y="330" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Thumb</text><text x="256" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Index</text><text x="160" y="318" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif">Thumb tip × Index fingertip</text></svg>`,
"mudra-shuni": `<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="64" y1="300" x2="148" y2="178" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="64" y1="300" x2="148" y2="178" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="196" y1="16" x2="172" y2="142" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="196" y1="16" x2="172" y2="142" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><circle cx="160" cy="160" r="26.0" fill="#ffd700" opacity="0.14"/><circle cx="160" cy="160" r="17.0" fill="#ffd700" opacity="0.30"/><circle cx="160" cy="160" r="10.0" fill="#ffd700" opacity="0.95"/><line x1="144.0" y1="160" x2="176.0" y2="160" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><line x1="160" y1="144.0" x2="160" y2="176.0" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><text x="64" y="330" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Thumb</text><text x="256" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Middle</text><text x="160" y="318" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif">Thumb tip × Middle fingertip</text></svg>`,
"mudra-prithvi": `<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="64" y1="300" x2="148" y2="178" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="64" y1="300" x2="148" y2="178" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="196" y1="16" x2="172" y2="142" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="196" y1="16" x2="172" y2="142" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><circle cx="160" cy="160" r="26.0" fill="#ffd700" opacity="0.14"/><circle cx="160" cy="160" r="17.0" fill="#ffd700" opacity="0.30"/><circle cx="160" cy="160" r="10.0" fill="#ffd700" opacity="0.95"/><line x1="144.0" y1="160" x2="176.0" y2="160" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><line x1="160" y1="144.0" x2="160" y2="176.0" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><text x="64" y="330" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Thumb</text><text x="256" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Ring</text><text x="160" y="318" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif">Thumb tip × Ring fingertip</text></svg>`,
"mudra-buddhi": `<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="64" y1="300" x2="148" y2="178" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="64" y1="300" x2="148" y2="178" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="196" y1="16" x2="172" y2="142" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="196" y1="16" x2="172" y2="142" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><circle cx="160" cy="160" r="26.0" fill="#ffd700" opacity="0.14"/><circle cx="160" cy="160" r="17.0" fill="#ffd700" opacity="0.30"/><circle cx="160" cy="160" r="10.0" fill="#ffd700" opacity="0.95"/><line x1="144.0" y1="160" x2="176.0" y2="160" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><line x1="160" y1="144.0" x2="160" y2="176.0" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><text x="64" y="330" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Thumb</text><text x="256" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Pinky</text><text x="160" y="318" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif">Thumb tip × Pinky fingertip</text></svg>`,
"mudra-prana": `<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="160" y1="310" x2="160" y2="196" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="160" y1="310" x2="160" y2="196" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="108" y1="14" x2="128" y2="138" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="108" y1="14" x2="128" y2="138" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="212" y1="14" x2="192" y2="138" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="212" y1="14" x2="192" y2="138" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><circle cx="160" cy="162" r="32.5" fill="#ffd700" opacity="0.14"/><circle cx="160" cy="162" r="21.25" fill="#ffd700" opacity="0.30"/><circle cx="160" cy="162" r="12.5" fill="#ffd700" opacity="0.95"/><line x1="140.0" y1="162" x2="180.0" y2="162" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><line x1="160" y1="142.0" x2="160" y2="182.0" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><text x="160" y="332" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Thumb</text><text x="66" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Ring</text><text x="254" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Pinky</text><text x="160" y="318" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif">Thumb tip × Ring tip × Pinky tip</text></svg>`,
"mudra-apana": `<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="160" y1="310" x2="160" y2="196" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="160" y1="310" x2="160" y2="196" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="108" y1="14" x2="128" y2="138" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="108" y1="14" x2="128" y2="138" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><line x1="212" y1="14" x2="192" y2="138" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="212" y1="14" x2="192" y2="138" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><circle cx="160" cy="162" r="32.5" fill="#ffd700" opacity="0.14"/><circle cx="160" cy="162" r="21.25" fill="#ffd700" opacity="0.30"/><circle cx="160" cy="162" r="12.5" fill="#ffd700" opacity="0.95"/><line x1="140.0" y1="162" x2="180.0" y2="162" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><line x1="160" y1="142.0" x2="160" y2="182.0" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><text x="160" y="332" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Thumb</text><text x="66" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Middle</text><text x="254" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Ring</text><text x="160" y="318" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif">Thumb tip × Middle tip × Ring tip</text></svg>`,
"mudra-surya": `<svg viewBox="0 0 320 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="196" y1="16" x2="176" y2="120" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="196" y1="16" x2="176" y2="120" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><path d="M 236 44 Q 216 96 186 128" stroke="#e8b94a" stroke-width="3" fill="none" opacity="0.8"/><polygon points="186,128 174,118 178,134" fill="#e8b94a" opacity="0.8"/><line x1="64" y1="300" x2="150" y2="170" stroke="#e8b94a" stroke-width="62" stroke-linecap="round" opacity="0.85"/><line x1="64" y1="300" x2="150" y2="170" stroke="#2a1f4d" stroke-width="54" stroke-linecap="round"/><circle cx="163" cy="148" r="29.9" fill="#ffd700" opacity="0.14"/><circle cx="163" cy="148" r="19.549999999999997" fill="#ffd700" opacity="0.30"/><circle cx="163" cy="148" r="11.5" fill="#ffd700" opacity="0.95"/><line x1="144.6" y1="148" x2="181.4" y2="148" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><line x1="163" y1="129.6" x2="163" y2="166.4" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/><text x="64" y="330" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Thumb presses</text><text x="256" y="60" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Ring (folded)</text><text x="160" y="318" text-anchor="middle" fill="#e8b94a" font-size="15" font-family="sans-serif">Ring finger folds down — thumb presses over it</text></svg>`,
"mudra-handmap": `<svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><line x1="92" y1="192" x2="52" y2="132" stroke="#2a1f4d" stroke-width="30" stroke-linecap="round"/><line x1="92" y1="192" x2="52" y2="132" stroke="#5a4a7a" stroke-width="30" stroke-linecap="round" fill="none" opacity="0.35"/><circle cx="52" cy="132" r="8" fill="#5a4a7a"/><rect x="82" y="40" width="26" height="78" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="95" cy="40" r="6" fill="#5a4a7a"/><rect x="122" y="30" width="26" height="88" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="135" cy="30" r="6" fill="#5a4a7a"/><rect x="162" y="36" width="26" height="82" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="175" cy="36" r="6" fill="#5a4a7a"/><rect x="202" y="58" width="26" height="60" rx="13" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><circle cx="215" cy="58" r="6" fill="#5a4a7a"/><rect x="82" y="112" width="156" height="104" rx="30" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><text x="95" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Index</text><text x="135" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Middle</text><text x="175" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Ring</text><text x="215" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Pinky</text><text x="40" y="240" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Thumb</text><text x="160" y="18" text-anchor="middle" fill="#e8b94a" font-size="14" font-family="sans-serif">Every finger: an element + a chakra</text><text x="60" y="272" fill="#b9a8d6" font-size="13" font-family="sans-serif">🔥  Thumb</text><text x="150" y="272" fill="#e8b94a" font-size="13" font-family="sans-serif">Fire</text><text x="230" y="272" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Solar Plexus</text><text x="60" y="296" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌬️  Index</text><text x="150" y="296" fill="#e8b94a" font-size="13" font-family="sans-serif">Air</text><text x="230" y="296" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Heart</text><text x="60" y="320" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌌  Middle</text><text x="150" y="320" fill="#e8b94a" font-size="13" font-family="sans-serif">Ether</text><text x="230" y="320" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Throat</text><text x="60" y="344" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌍  Ring</text><text x="150" y="344" fill="#e8b94a" font-size="13" font-family="sans-serif">Earth</text><text x="230" y="344" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Root</text><text x="60" y="368" fill="#b9a8d6" font-size="13" font-family="sans-serif">🌊  Pinky</text><text x="150" y="368" fill="#e8b94a" font-size="13" font-family="sans-serif">Water</text><text x="230" y="368" text-anchor="middle" fill="#b9a8d6" font-size="13" font-family="sans-serif">Sacral</text></svg>`,
"mudra-dhyana": `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><ellipse cx="160" cy="150" rx="86" ry="40" fill="#2a1f4d" stroke="#5a4a7a" stroke-width="1.5"/><ellipse cx="160" cy="164" rx="66" ry="30" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><rect x="132" y="112" width="20" height="36" rx="10" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5" transform="rotate(-16 142 130)"/><rect x="168" y="112" width="20" height="36" rx="10" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5" transform="rotate(16 178 130)"/><circle cx="160" cy="112" r="26" fill="#ffd700" opacity="0.12"/><circle cx="160" cy="112" r="17" fill="#ffd700" opacity="0.28"/><circle cx="160" cy="112" r="10" fill="#ffd700" opacity="0.95"/><text x="160" y="236" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Right hand rests in the left, thumbs touch</text><text x="160" y="272" text-anchor="middle" fill="#e8b94a" font-size="14" font-family="sans-serif">Dhyana Mudra — the meditation seal</text></svg>`,
"mudra-anjali": `<svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><rect x="62" y="80" width="62" height="120" rx="26" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><rect x="70" y="40" width="14" height="48" rx="7" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2"/><rect x="87" y="40" width="14" height="48" rx="7" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2"/><rect x="104" y="40" width="14" height="48" rx="7" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2"/><rect x="196" y="80" width="62" height="120" rx="26" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><rect x="204" y="40" width="14" height="48" rx="7" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2"/><rect x="221" y="40" width="14" height="48" rx="7" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2"/><rect x="238" y="40" width="14" height="48" rx="7" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2"/><line x1="160" y1="36" x2="160" y2="204" stroke="#ffd700" stroke-width="3" opacity="0.7"/><text x="160" y="232" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Palms pressed at the heart center</text><text x="160" y="268" text-anchor="middle" fill="#e8b94a" font-size="14" font-family="sans-serif">Anjali Mudra — the prayer seal</text></svg>`,
"mudra-hakini": `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:300px;display:block;margin:0 auto"><circle cx="86" cy="70" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><circle cx="234" cy="70" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><line x1="86" y1="70" x2="234" y2="70" stroke="#ffd700" stroke-width="2" opacity="0.45"/><circle cx="160" cy="70.0" r="6" fill="#ffd700" opacity="0.9"/><circle cx="76" cy="112" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><circle cx="244" cy="112" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><line x1="76" y1="112" x2="244" y2="112" stroke="#ffd700" stroke-width="2" opacity="0.45"/><circle cx="160" cy="112.0" r="6" fill="#ffd700" opacity="0.9"/><circle cx="74" cy="154" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><circle cx="246" cy="154" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><line x1="74" y1="154" x2="246" y2="154" stroke="#ffd700" stroke-width="2" opacity="0.45"/><circle cx="160" cy="154.0" r="6" fill="#ffd700" opacity="0.9"/><circle cx="80" cy="196" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><circle cx="240" cy="196" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><line x1="80" y1="196" x2="240" y2="196" stroke="#ffd700" stroke-width="2" opacity="0.45"/><circle cx="160" cy="196.0" r="6" fill="#ffd700" opacity="0.9"/><circle cx="94" cy="234" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><circle cx="226" cy="234" r="9" fill="#2a1f4d" stroke="#e8b94a" stroke-width="2.5"/><line x1="94" y1="234" x2="226" y2="234" stroke="#ffd700" stroke-width="2" opacity="0.45"/><circle cx="160" cy="234.0" r="6" fill="#ffd700" opacity="0.9"/><text x="40" y="154" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Left</text><text x="280" y="154" text-anchor="middle" fill="#b9a8d6" font-size="12" font-family="sans-serif">Right</text><text x="160" y="292" text-anchor="middle" fill="#e8b94a" font-size="14" font-family="sans-serif">All five fingertip pairs touching</text></svg>`
};

const JOURNAL_PROMPTS = [
  "What did you dream last night? Write every fragment, even single images.",
  "Describe a coincidence from today in detail. What was the timing?",
  "What physical sensations did you notice during practice? Where exactly?",
  "What belief did you question today? What replaced it?",
  "What are you afraid to admit you perceive? Write it without editing.",
  "Track the Moon: what phase is it, and how is your energy?",
  "What did you create today? How did it feel during vs. after?",
  "Write a letter to your future awakened self. What do you ask?",
];

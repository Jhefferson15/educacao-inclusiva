/* ===== CHARACTER GENERATORS & SVG TEMPLATES ===== */

function person(o) {
  o = o || {};
  const skin = o.skin || "#E8B68C",
        hair = o.hair || "#2b2330",
        shirt = o.shirt || "#27A39B",
        pants = o.pants || "#3b5072",
        shoe = o.shoe || "#2b2330",
        scale = o.scale || 1,
        expr = o.expr || "neutral",
        style = o.hairStyle || "messy",
        beard = !!o.beard,
        scarf = o.scarf || null,
        cls = o.cls || "";

  const HAIR = {
    messy: `M22 54 Q18 20 42 18 Q46 10 56 16 Q62 8 70 16 Q78 12 84 20 Q100 24 98 54 Q92 36 82 34 Q84 26 78 24 Q76 32 70 30 Q70 22 64 24 Q62 32 56 30 Q54 22 48 26 Q48 34 42 32 Q34 32 30 40 Q26 44 22 54 Z`,
    neat: `M22 56 Q20 20 60 18 Q100 20 98 56 Q94 34 60 33 Q46 33 42 44 Q48 32 64 32 Q44 28 30 40 Q24 46 22 56 Z`,
    adult: `M26 54 Q26 24 60 22 Q94 24 94 54 Q88 36 60 35 Q34 36 26 54 Z`,
    bun: `M22 54 Q20 22 60 20 Q100 22 98 54 Q92 34 60 33 Q34 34 22 54 Z`,
    curly: `M24 54 Q22 30 34 24 Q34 16 44 22 Q50 14 60 20 Q70 14 76 22 Q86 16 86 26 Q98 30 96 54 Q92 42 84 44 Q90 34 82 32 Q84 42 74 40 Q78 30 68 34 Q70 24 60 30 Q52 24 52 34 Q44 30 46 40 Q36 34 38 44 Q30 42 24 54 Z`
  };

  const hairPath = HAIR[style] || HAIR.messy;
  let irisDY = 0, eRX = 7.4, eRY = 9, irisR = 4.2, sparkle = "", tear = "";
  let brows, mouth;

  const B = {
    straight: `<path d="M40 42 L52 41"/><path d="M68 41 L80 42"/>`,
    raised: `<path d="M39 41 Q46 36 53 40"/><path d="M67 40 Q74 36 81 41"/>`,
    worried: `<path d="M40 43 L52 38"/><path d="M68 38 L80 43"/>`,
    high: `<path d="M39 38 Q46 33 53 37"/><path d="M67 37 Q74 33 81 38"/>`
  };

  const M = {
    smile: `<path d="M47 75 Q60 88 73 75" fill="none" stroke="#7a3b2e" stroke-width="3" stroke-linecap="round"/>`,
    open: `<path d="M48 74 Q60 96 72 74 Z" fill="#7a3b2e"/><path d="M55 84 Q60 91 65 84 Z" fill="#E8748F"/>`,
    gentle: `<path d="M53 79 Q60 84 67 79" fill="none" stroke="#7a3b2e" stroke-width="3" stroke-linecap="round"/>`,
    frown: `<path d="M50 84 Q60 75 70 84" fill="none" stroke="#7a3b2e" stroke-width="3" stroke-linecap="round"/>`,
    o: `<ellipse cx="60" cy="80" rx="5" ry="6.5" fill="#7a3b2e"/>`
  };

  switch (expr) {
    case "happy":
      brows = B.raised; mouth = M.smile;
      break;
    case "excited":
      brows = B.high; mouth = M.open;
      sparkle = `<path d="M82 38 l1.7 4.2 4.2 1.7 -4.2 1.7 -1.7 4.2 -1.7-4.2 -4.2-1.7 4.2-1.7z" fill="#FDE9A7"/>`;
      break;
    case "surprised":
      eRX = 8.6; eRY = 10; irisR = 3.5; brows = B.high; mouth = M.o;
      break;
    case "sad":
      irisDY = 2.4; brows = B.worried; mouth = M.frown;
      break;
    case "cry":
      irisDY = 2.6; brows = B.worried; mouth = M.frown;
      tear = `<path d="M46 60 q-3 6 0 9 q3 -3 0 -9z" fill="#7fc7e8" stroke="none"/>`;
      break;
    default:
      brows = B.straight; mouth = M.gentle;
  }

  const eye = (cx) => `<ellipse cx="${cx}" cy="54" rx="${eRX}" ry="${eRY}" fill="#fff" stroke="none"/>
    <g class="pupil" style="transform-origin: ${cx}px ${54 + irisDY}px; transition: transform 0.4s ease-out;">
      <circle cx="${cx}" cy="${54 + irisDY}" r="${irisR}" fill="#3a2b3a" stroke="none"/>
      <circle cx="${cx - 1.6}" cy="${52 + irisDY}" r="1.6" fill="#fff" stroke="none"/>
    </g>`;

  const blush = beard ? "" : `<ellipse cx="38" cy="66" rx="6.5" ry="3.6" fill="#E8748F" opacity=".4" stroke="none"/><ellipse cx="82" cy="66" rx="6.5" ry="3.6" fill="#E8748F" opacity=".4" stroke="none"/>`;
  const beardP = beard ? `<path d="M28 56 Q30 90 60 94 Q90 90 92 56 Q86 74 76 76 Q80 64 60 67 Q40 64 44 76 Q34 74 28 56 Z" fill="${hair}"/>` : "";
  const scarfP = scarf ? `<path d="M42 104 Q60 118 78 104 L82 120 Q60 132 38 120 Z" fill="${scarf}"/>` : "";

  return `<svg class="ch ${cls}" viewBox="0 0 120 200" width="${72 * scale}" height="${120 * scale}" aria-hidden="true">
    <ellipse cx="60" cy="192" rx="32" ry="6" fill="rgba(0,0,0,.18)" stroke="none"/>
    <g stroke="#3a2f3a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
      <g class="leg-l" style="transform-origin: 53.5px 150px; transition: transform 0.4s ease-out;">
        <rect x="48" y="150" width="11" height="34" rx="5.5" fill="${pants}"/>
        <ellipse cx="51" cy="186" rx="9" ry="5.5" fill="${shoe}"/>
      </g>
      <g class="leg-r" style="transform-origin: 66.5px 150px; transition: transform 0.4s ease-out;">
        <rect x="61" y="150" width="11" height="34" rx="5.5" fill="${pants}"/>
        <ellipse cx="69" cy="186" rx="9" ry="5.5" fill="${shoe}"/>
      </g>
      <g class="arm-l" style="transform-origin: 33.5px 114.5px; transition: transform 0.4s ease-out;">
        <rect x="27" y="108" width="13" height="42" rx="6.5" fill="${shirt}"/>
        <circle cx="33.5" cy="150" r="7.5" fill="${skin}"/>
      </g>
      <g class="arm-r" style="transform-origin: 86.5px 114.5px; transition: transform 0.4s ease-out;">
        <rect x="80" y="108" width="13" height="42" rx="6.5" fill="${shirt}"/>
        <circle cx="86.5" cy="150" r="7.5" fill="${skin}"/>
      </g>
      <path d="M36 110 Q36 102 44 102 L76 102 Q84 102 84 110 L84 150 Q84 158 76 158 L44 158 Q36 158 36 150 Z" fill="${shirt}"/>
      ${scarfP}<rect x="54" y="90" width="12" height="16" rx="5" fill="${skin}"/>
      ${cls.includes("char-rajan") ? `
      <!-- Muletas do Rajan -->
      <g class="crutches" stroke="#8d5a3c" stroke-width="3" fill="none">
        <g class="crutch-l" style="transform-origin: 28px 102px; transition: transform 0.4s ease;">
          <line x1="28" y1="98" x2="28" y2="188" />
          <line x1="22" y1="98" x2="34" y2="98" stroke="#5c3d26" stroke-width="5.5" />
          <line x1="20" y1="134" x2="32" y2="134" stroke="#5c3d26" stroke-width="4.5" />
        </g>
        <g class="crutch-r" style="transform-origin: 92px 102px; transition: transform 0.4s ease;">
          <line x1="92" y1="98" x2="92" y2="188" />
          <line x1="86" y1="98" x2="98" y2="98" stroke="#5c3d26" stroke-width="5.5" />
          <line x1="88" y1="134" x2="100" y2="134" stroke="#5c3d26" stroke-width="4.5" />
        </g>
      </g>` : ""}
    </g>
    <g class="head-group" style="transform-origin: 60px 90px; transition: transform 0.4s ease-out;">
      <g stroke="#3a2f3a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <circle cx="22" cy="58" r="6" fill="${skin}"/><circle cx="98" cy="58" r="6" fill="${skin}"/>
        <circle cx="60" cy="56" r="38" fill="${skin}"/>${beardP}<path d="${hairPath}" fill="${hair}"/>
      </g>
      <g stroke="none">${eye(47)}${eye(73)}${blush}${tear}</g>
      <g stroke="${hair}" stroke-width="3" stroke-linecap="round" fill="none">${brows}</g>
      <g class="mouth">${mouth}</g>${sparkle}
    </g>
  </svg>`;
}

const ishaan = (e, s) => person({ skin: "#E8B68C", hair: "#241a22", hairStyle: "messy", shirt: "#27A39B", pants: "#34507a", expr: e || "neutral", scale: s || 1, cls: "char-ishaan" });
const nikumbh = (e, s) => person({ skin: "#C68A5E", hair: "#1d1820", hairStyle: "adult", beard: true, shirt: "#F4B63E", scarf: "#E2533B", pants: "#5a4632", shoe: "#4a3a28", expr: e || "happy", scale: s || 1.16, cls: "char-nikumbh" });
const brother = (e, s) => person({ skin: "#E8B68C", hair: "#3a2a1c", hairStyle: "neat", shirt: "#5a86c4", pants: "#2f3c52", expr: e || "excited", scale: s || .92, cls: "char-brother" });
const mateA = (e, s) => person({ skin: "#C68A5E", hair: "#241a22", hairStyle: "curly", shirt: "#E2533B", pants: "#3b5072", expr: e || "happy", scale: s || .82, cls: "char-mateA" });
const mateB = (e, s) => person({ skin: "#8d5a3c", hair: "#1d1820", hairStyle: "bun", shirt: "#9B8BD6", pants: "#34507a", expr: e || "happy", scale: s || .82, cls: "char-mateB" });
const father = (e, s) => person({ skin: "#C68A5E", hair: "#2b2330", hairStyle: "neat", shirt: "#c0566f", pants: "#2f3c52", expr: e || "neutral", scale: s || 1.15, cls: "char-father" });
const principal = (e, s) => person({ skin: "#E8B68C", hair: "#5c544d", hairStyle: "adult", shirt: "#4b447e", pants: "#2b2330", expr: e || "neutral", scale: s || 1.18, cls: "char-principal" });
const rajan = (e, s) => person({ skin: "#C68A5E", hair: "#241a22", hairStyle: "neat", shirt: "#27A39B", pants: "#34507a", expr: e || "neutral", scale: s || .86, scarf: "#F4B63E", cls: "char-rajan" });
const strictTeacher = (e, s) => person({ skin: "#C68A5E", hair: "#3a2a1c", hairStyle: "neat", shirt: "#3a2f3a", pants: "#222", expr: e || "neutral", scale: s || 1.15, cls: "char-strict" });

function fcard(n, c, d) {
  return `<div class="fcard" style="animation-delay:${d}s"><div class="av" style="background:linear-gradient(135deg,${c},#fff)"></div><small>${n}</small></div>`;
}

const PORTRAIT = {
  einstein: `<svg viewBox="0 0 72 72"><circle cx="36" cy="40" r="17" fill="#E8C9A8"/><path d="M14 38 Q9 18 24 18 Q26 8 36 12 Q46 8 48 18 Q63 18 58 38 Q52 26 44 27 Q40 21 36 23 Q32 21 28 27 Q20 26 14 38Z" fill="#EAEAEF"/><circle cx="15" cy="36" r="6" fill="#EAEAEF"/><circle cx="57" cy="36" r="6" fill="#EAEAEF"/><circle cx="30" cy="40" r="2.2" fill="#2a2330"/><circle cx="42" cy="40" r="2.2" fill="#2a2330"/><path d="M27 50 Q36 57 45 50 Q40 53 36 52 Q32 53 27 50Z" fill="#DADADF"/></svg>`,
  picasso: `<svg viewBox="0 0 72 72"><rect x="16" y="56" width="40" height="16" fill="#fff"/><rect x="16" y="56" width="40" height="4" fill="#3E7BD4"/><rect x="16" y="64" width="40" height="4" fill="#3E7BD4"/><circle cx="36" cy="34" r="18" fill="#D9A877"/><circle cx="18" cy="36" r="3.4" fill="#D9A877"/><circle cx="54" cy="36" r="3.4" fill="#D9A877"/><circle cx="29" cy="33" r="3" fill="#2a2330"/><circle cx="43" cy="33" r="3" fill="#2a2330"/><path d="M30 45 Q36 49 42 45" stroke="#7a3b2e" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`,
  davinci: `<svg viewBox="0 0 72 72"><circle cx="36" cy="36" r="17" fill="#E3BE97"/><path d="M22 40 Q24 64 36 66 Q48 64 50 40 Q44 52 36 52 Q28 52 22 40Z" fill="#CFC9C0"/><path d="M19 30 Q16 46 25 50 L25 38 Q21 34 19 30Z" fill="#CFC9C0"/><path d="M53 30 Q56 46 47 50 L47 38 Q51 34 53 30Z" fill="#CFC9C0"/><path d="M17 28 Q36 12 55 28 Q36 22 17 28Z" fill="#6b4a2e"/><circle cx="30" cy="36" r="2.2" fill="#2a2330"/><circle cx="42" cy="36" r="2.2" fill="#2a2330"/></svg>`,
  christie: `<svg viewBox="0 0 72 72"><path d="M16 40 Q12 16 36 14 Q60 16 56 40 Q58 52 49 56 L49 40 Q42 34 36 34 Q30 34 23 40 L23 56 Q14 52 16 40Z" fill="#9A7B5A"/><circle cx="36" cy="38" r="16" fill="#E8C9A8"/><path d="M22 31 Q29 25 36 27 Q43 25 50 31 Q43 28 36 30 Q29 28 22 31Z" fill="#9A7B5A"/><circle cx="30" cy="38" r="2.2" fill="#2a2330"/><circle cx="42" cy="38" r="2.2" fill="#2a2330"/><path d="M31 46 Q36 49 41 46" stroke="#b3506a" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="36" cy="62" r="2.4" fill="#fff" stroke="#cbb" stroke-width="1"/></svg>`
};

const ART = {
  einstein: `<svg viewBox="0 0 56 56"><rect width="56" height="56" rx="4" fill="#1F2A44"/><text x="28" y="26" font-family="Fredoka" font-weight="700" font-size="13" fill="#fff" text-anchor="middle">E=mc²</text><g fill="none" stroke="#79E0D0" stroke-width="1.5"><ellipse cx="28" cy="40" rx="15" ry="5.5"/><ellipse cx="28" cy="40" rx="15" ry="5.5" transform="rotate(60 28 40)"/><ellipse cx="28" cy="40" rx="15" ry="5.5" transform="rotate(120 28 40)"/></g><circle cx="28" cy="40" r="2.4" fill="#fff"/></svg>`,
  picasso: `<svg viewBox="0 0 56 56"><rect width="56" height="56" rx="4" fill="#F1EBDA"/><path d="M12 14 L30 11 L26 30 L13 27Z" fill="#3E7BD4"/><path d="M30 11 L45 17 L41 35 L26 30Z" fill="#F4B63E"/><path d="M13 27 L26 30 L23 45 L15 42Z" fill="#E2533B"/><path d="M26 30 L41 35 L37 46 L23 45Z" fill="#27A39B"/><circle cx="24" cy="22" r="2.2" fill="#1a1620"/><circle cx="34" cy="25" r="2.2" fill="#1a1620"/></svg>`,
  davinci: `<svg viewBox="0 0 56 56"><rect width="56" height="56" rx="4" fill="#6b4a2e"/><rect x="6" y="6" width="44" height="44" rx="2" fill="#9A8253"/><circle cx="28" cy="24" r="8" fill="#CAA77F"/><path d="M15 48 Q17 33 28 33 Q39 33 41 48Z" fill="#3A2F2A"/><path d="M22 40 Q28 44 34 40" stroke="#5a4636" stroke-width="1.5" fill="none"/></svg>`,
  christie: `<svg viewBox="0 0 56 56"><rect width="56" height="56" rx="4" fill="#F1EBDA"/><rect x="12" y="9" width="30" height="38" rx="3" fill="#7A2E3A"/><rect x="16" y="13" width="22" height="30" fill="#F1EBDA"/><text x="27" y="35" font-family="Fredoka" font-weight="700" font-size="20" fill="#7A2E3A" text-anchor="middle">?</text><circle cx="41" cy="40" r="7" fill="none" stroke="#2a2740" stroke-width="3"/><line x1="46" y1="45" x2="51" y2="50" stroke="#2a2740" stroke-width="3" stroke-linecap="round"/></svg>`
};

function famous(p, name, art, lbl) {
  return `<div class="fcol"><div class="fcard"><div class="port">${p}</div><small>${name}</small></div><div class="artmini">${art}<small>${lbl}</small></div></div>`;
}

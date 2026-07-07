/* ===== SCENE 9 STRICT SCHOOL TIMELINE & INTERACTIVE EFFECTS ===== */

let strictSchoolTimeouts = [];
let strictLetterStormActive = false;

function cleanupStrictSchoolTimeline() {
  strictSchoolTimeouts.forEach(clearTimeout);
  strictSchoolTimeouts = [];

  // Reset classmates
  const classmates = document.querySelectorAll(".strict-classmate-char");
  classmates.forEach((mate, index) => {
    mate.classList.remove("laughing", "staring");
    const charType = index % 2 === 0 ? mateA : mateB;
    mate.innerHTML = charType("neutral", 0.72);
  });

  // Reset Ishaan
  const heroGroup = document.querySelector(".strict-ishaan-desk-group");
  if (heroGroup) {
    heroGroup.classList.remove("sitting", "standing");
    heroGroup.classList.add("sitting");
  }
  const hero = document.getElementById("hero");
  if (hero) {
    hero.classList.remove("talking", "gesture-scared", "shivering", "cower", "gesture-tremble-l", "gesture-tremble-r");
    hero.innerHTML = ishaan("sad", 0.82);
  }

  // Reset Teacher
  const teacher = document.getElementById("bro");
  if (teacher) {
    teacher.classList.remove("talking", "gesture-rage-point", "gesture-point", "gesture-explain", "pacing", "slamming");
    teacher.innerHTML = strictTeacher("neutral", 1.15);
  }

  // Clear tears
  const tears = document.getElementById("ishaan-tears");
  if (tears) tears.innerHTML = "";

  // Clear words and letter storm
  const storm = document.getElementById("nightmareLetterStorm");
  if (storm) storm.innerHTML = "";
  strictLetterStormActive = false;

  const floatWords = document.getElementById("strictWords");
  if (floatWords) floatWords.innerHTML = "";

  // Reset camera/scene
  const sceneEl = stage.querySelector('.scene');
  if (sceneEl) {
    sceneEl.classList.remove("shaking", "cam-zoom-shake");
  }
}

function runStrictSchoolTimeline() {
  cleanupStrictSchoolTimeline();

  const sceneEl = stage.querySelector('.scene');
  const heroGroup = document.querySelector(".strict-ishaan-desk-group");
  const teacher = document.getElementById("bro");
  const storm = document.getElementById("nightmareLetterStorm");
  const hero = document.getElementById("hero");

  if (!sceneEl || !heroGroup || !teacher) return;

  // 0ms: Initial state: Ishaan is sitting, studying and worried. Rain background.
  heroGroup.classList.add("sitting");
  if (hero) {
    hero.innerHTML = ishaan("sad", 0.82);
    hero.classList.add("shivering");
  }

  // 1200ms: Teacher paces behind. Class is dead quiet.
  strictSchoolTimeouts.push(setTimeout(() => {
    teacher.classList.add("pacing");
    if (typeof playNote === "function") {
      playNote(48, 0.08, 0.9);
    }
  }, 1200));

  // 3500ms: Teacher approaches Ishaan's desk and slams ruler. Screen shakes.
  // Speech bubble: "Fique de pé! Como não consegue ler este texto simples?"
  strictSchoolTimeouts.push(setTimeout(() => {
    teacher.classList.remove("pacing");
    teacher.classList.add("slamming", "talking", "gesture-rage-point");
    
    sceneEl.classList.add("shaking");
    setTimeout(() => sceneEl.classList.remove("shaking"), 600);

    const bubble = ensureBubble();
    bubble.innerHTML = `
      <div class="bubble-header" style="background: ${BUBCOLOR.strict || '#c0566f'};">Professor</div>
      <div class="bubble-content">Fique de pé! Como não consegue ler este texto simples?</div>
    `;
    bubble.style.left = "65%";
    bubble.style.top = "12%";
    bubble.classList.add("show");

    if (typeof playNote === "function") {
      playNote(36, 0.3, 0.5); // Deep slam chord
      setTimeout(() => playNote(43, 0.25, 0.4), 100);
    }
  }, 3500));

  // 6500ms: Ishaan stands up, trembling. Speech bubble: "As letras... elas fogem..."
  // Letter storm starts to spin around Ishaan's head. Tears flow.
  strictSchoolTimeouts.push(setTimeout(() => {
    hideBubble();
    teacher.classList.remove("talking", "gesture-rage-point");
    teacher.innerHTML = strictTeacher("sad", 1.15);

    heroGroup.classList.remove("sitting");
    heroGroup.classList.add("standing");
    if (hero) {
      hero.classList.remove("shivering");
      hero.innerHTML = ishaan("cry", 0.82);
      hero.classList.add("gesture-scared");
    }

    const bubble = ensureBubble();
    bubble.innerHTML = `
      <div class="bubble-header" style="background: ${BUBCOLOR.ishaan || 'var(--teal)'};">Ishaan</div>
      <div class="bubble-content">As letras... elas fogem...</div>
    `;
    bubble.style.left = "35%";
    bubble.style.top = "20%";
    bubble.classList.add("show");

    // Start shedding tears
    const tears = document.getElementById("ishaan-tears");
    if (tears) {
      tears.innerHTML = "";
      for (let n = 0; n < 12; n++) {
        const tearDrop = document.createElement("span");
        tearDrop.className = "tear-drop";
        tearDrop.style.left = `${38 + Math.random() * 24}%`;
        tearDrop.style.animationDelay = `${n * 0.25}s`;
        tears.appendChild(tearDrop);
      }
    }

    if (storm) {
      generateStrictLetterStorm(storm);
    }

    if (typeof playNote === "function") {
      playNote(67, 0.15, 0.8);
      setTimeout(() => playNote(71, 0.15, 0.8), 200);
    }
  }, 6500));

  // 9500ms: Classmates turn and stare at Ishaan, pointing and laughing.
  // Floating words: "Zero!", "Burro!", "Sem futuro!".
  // Screen shakes as the pressure peaks.
  strictSchoolTimeouts.push(setTimeout(() => {
    hideBubble();
    if (hero) hero.classList.add("cower");

    const classmates = document.querySelectorAll(".strict-classmate-char");
    classmates.forEach((mate, index) => {
      mate.classList.add("staring", "laughing");
      const charType = index % 2 === 0 ? mateA : mateB;
      mate.innerHTML = charType("happy", 0.72);
    });

    spawnStrictSchoolWord("Zero!", "45%", "25%", "red");
    spawnStrictSchoolWord("Burro!", "25%", "35%", "red");
    spawnStrictSchoolWord("Preguiçoso!", "55%", "15%", "red");
    spawnStrictSchoolWord("Incapaz!", "32%", "18%", "black");

    sceneEl.classList.add("shaking");

    if (typeof playNote === "function") {
      playNote(39, 0.25, 0.6);
      setTimeout(() => playNote(42, 0.25, 0.6), 150);
    }
  }, 9500));

  // 12500ms: Tone darkens. Teacher walks back, Ishaan sits and covers face. Dialogue hides.
  strictSchoolTimeouts.push(setTimeout(() => {
    hideBubble();
    sceneEl.classList.remove("shaking");
    
    heroGroup.classList.remove("standing");
    heroGroup.classList.add("sitting");
    if (hero) {
      hero.classList.remove("gesture-scared", "cower");
      hero.innerHTML = ishaan("sad", 0.82);
    }

    const classmates = document.querySelectorAll(".strict-classmate-char");
    classmates.forEach((mate, index) => {
      mate.classList.remove("laughing");
      const charType = index % 2 === 0 ? mateA : mateB;
      mate.innerHTML = charType("neutral", 0.72);
    });

    if (typeof playNote === "function") {
      playNote(45, 0.15, 1.2);
    }
  }, 12500));
}

function spawnStrictSchoolWord(text, left, top, colorClass = "red") {
  const container = document.getElementById("strictWords");
  if (!container) return;

  const span = document.createElement("span");
  span.className = `floaty-word strict-word-${colorClass}`;
  span.textContent = text;
  span.style.left = left;
  span.style.top = top;
  container.appendChild(span);

  setTimeout(() => span.remove(), 2500);
}

function generateStrictLetterStorm(container) {
  container.innerHTML = "";
  const chars = "XYZF0%#&@?AaBbCc";
  const colors = ["#d32f2f", "#111111", "#424242", "#c62828", "#37474f"];
  strictLetterStormActive = true;

  for (let i = 0; i < 20; i++) {
    const span = document.createElement("span");
    span.className = `strict-nightmare-letter orbit-${(i % 5) + 1}`;
    span.textContent = chars[Math.floor(Math.random() * chars.length)];
    span.style.color = colors[Math.floor(Math.random() * colors.length)];

    const leftOffset = 22 + Math.random() * 26;
    const topOffset = 15 + Math.random() * 35;
    span.style.left = `${leftOffset}%`;
    span.style.top = `${topOffset}%`;
    span.style.animationDelay = `${Math.random() * 1.5}s`;

    span.addEventListener("click", (e) => {
      e.stopPropagation();
      span.classList.add("clicked");
      if (typeof playNote === "function") {
        playNote(72 + Math.floor(Math.random() * 12), 0.15, 0.5);
      }
      setTimeout(() => span.remove(), 500);
    });

    container.appendChild(span);
  }
}

function setupStrictSchoolInteractions() {
  const teacher = document.getElementById("bro");
  const hero = document.getElementById("hero");
  const desk = document.getElementById("strict-desk");

  if (teacher) {
    teacher.onclick = (e) => {
      e.stopPropagation();
      teacher.classList.remove("talking", "gesture-rage-point", "slamming");
      void teacher.offsetWidth;
      teacher.classList.add("talking", "gesture-rage-point", "slamming");

      const sceneEl = stage.querySelector('.scene');
      if (sceneEl) {
        sceneEl.classList.remove("shaking");
        void sceneEl.offsetWidth;
        sceneEl.classList.add("shaking");
        setTimeout(() => sceneEl.classList.remove("shaking"), 600);
      }

      const reprimands = [
        "Preste atenção!",
        "Silêncio absoluto!",
        "Leia o texto agora!",
        "Sem desculpas!",
        "Ficará de castigo!"
      ];
      const text = reprimands[Math.floor(Math.random() * reprimands.length)];

      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background: ${BUBCOLOR.strict || '#c0566f'};">Professor</div>
        <div class="bubble-content">${text}</div>
      `;
      bubble.style.left = "65%";
      bubble.style.top = "12%";
      bubble.classList.add("show");

      spawnStrictSchoolWord(text.toUpperCase(), "50%", "20%", "red");

      if (typeof playNote === "function") {
        playNote(38, 0.25, 0.6);
      }

      setTimeout(() => {
        teacher.classList.remove("talking", "gesture-rage-point", "slamming");
        hideBubble();
      }, 2200);
    };
  }

  if (hero) {
    hero.onclick = (e) => {
      e.stopPropagation();
      hero.classList.remove("talking", "gesture-scared", "shivering");
      void hero.offsetWidth;
      hero.classList.add("talking", "gesture-scared");

      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background: ${BUBCOLOR.ishaan || 'var(--teal)'};">Ishaan</div>
        <div class="bubble-content">(Tudo se move... eu não consigo!)</div>
      `;
      bubble.style.left = "35%";
      bubble.style.top = "20%";
      bubble.classList.add("show");

      // Spawn fresh tears
      const tears = document.getElementById("ishaan-tears");
      if (tears) {
        tears.innerHTML = "";
        for (let n = 0; n < 6; n++) {
          const tearDrop = document.createElement("span");
          tearDrop.className = "tear-drop";
          tearDrop.style.left = `${38 + Math.random() * 24}%`;
          tearDrop.style.animationDelay = `${n * 0.2}s`;
          tears.appendChild(tearDrop);
        }
      }

      spawnStrictSchoolWord("FUGIR...", "25%", "25%", "black");

      if (typeof playNote === "function") {
        playNote(72, 0.12, 0.6);
        setTimeout(() => playNote(70, 0.12, 0.6), 180);
      }

      setTimeout(() => {
        hero.classList.remove("talking", "gesture-scared");
        hero.classList.add("shivering");
        hideBubble();
      }, 2500);
    };
  }

  if (desk) {
    desk.onclick = (e) => {
      e.stopPropagation();
      const storm = document.getElementById("nightmareLetterStorm");
      if (storm) {
        generateStrictLetterStorm(storm);
      }
      if (typeof playNote === "function") {
        playNote(65, 0.1, 0.4);
        playNote(68, 0.1, 0.4);
      }
    };
  }
}

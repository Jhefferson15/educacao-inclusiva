/* ===== SCENE 5 COMPARISON TIMELINE & INTERACTIONS ===== */

let compareTimeouts = [];

function cleanupCompareTimeline() {
  compareTimeouts.forEach(clearTimeout);
  compareTimeouts = [];

  const yohanBox = document.getElementById("bro");
  if (yohanBox) {
    yohanBox.innerHTML = brother("excited", 1.0);
    yohanBox.classList.remove("talking", "gesture-raise", "gesture-explain", "gesture-wave");
    const stars = document.getElementById("yohan-stars");
    if (stars) stars.innerHTML = "";
  }

  const hero = document.getElementById("hero");
  if (hero) {
    hero.innerHTML = ishaan("sad", 0.82);
    hero.classList.remove("talking", "gesture-scared", "gesture-sigh", "gesture-explain");
    const tears = document.getElementById("ishaan-tears");
    if (tears) tears.innerHTML = "";
  }

  const stampMachine = document.getElementById("stamp-machine");
  if (stampMachine) {
    stampMachine.classList.remove("stamping");
  }

  const stampMark = document.getElementById("stamp-mark");
  if (stampMark) {
    stampMark.classList.remove("stamped-active");
  }

  const floating = document.getElementById("compareFloating");
  if (floating) {
    floating.innerHTML = "";
  }

  const sceneEl = stage.querySelector('.scene');
  if (sceneEl) {
    sceneEl.classList.remove("shaking");
  }
}

function runCompareTimeline() {
  cleanupCompareTimeline();

  const sceneEl = stage.querySelector('.scene');
  const yohanBox = document.getElementById("bro");
  const hero = document.getElementById("hero");
  const stampMachine = document.getElementById("stamp-machine");
  const stampMark = document.getElementById("stamp-mark");

  if (!sceneEl || !yohanBox || !hero || !stampMachine || !stampMark) return;

  // 1200ms: Yohan brags, arms raised, gold stars float up
  compareTimeouts.push(setTimeout(() => {
    yohanBox.classList.add("talking", "gesture-raise");
    
    // Auto-generate some stars
    const starsContainer = document.getElementById("yohan-stars");
    if (starsContainer) {
      starsContainer.innerHTML = "";
      for (let n = 0; n < 6; n++) {
        const star = document.createElement("span");
        star.className = "gold-star-particle";
        star.textContent = "★";
        star.style.left = `${10 + Math.random() * 80}%`;
        star.style.animationDelay = `${n * 0.25}s`;
        starsContainer.appendChild(star);
      }
    }
  }, 1200));

  // 4200ms: Yohan stops speaking. Stamp machine piston slams down.
  compareTimeouts.push(setTimeout(() => {
    yohanBox.classList.remove("talking", "gesture-raise");
    yohanBox.innerHTML = brother("excited", 1.0);

    stampMachine.classList.add("stamping");
  }, 4200));

  // 4700ms: Stamp strikes Ishaan's area. Screen shakes, sound plays, red label slams.
  compareTimeouts.push(setTimeout(() => {
    sceneEl.classList.add("shaking");
    stampMark.classList.add("stamped-active");

    if (typeof playNote === "function") {
      playNote(36, 0.35, 0.95); // Low ominous hit
      setTimeout(() => playNote(43, 0.25, 0.75), 180);
    }

    setTimeout(() => {
      sceneEl.classList.remove("shaking");
    }, 450);
  }, 4700));

  // 5600ms: Ishaan reacts. Starts crying, shivers, tears start falling.
  compareTimeouts.push(setTimeout(() => {
    hero.innerHTML = ishaan("cry", 0.82);
    hero.classList.add("gesture-scared");

    const tearsContainer = document.getElementById("ishaan-tears");
    if (tearsContainer) {
      tearsContainer.innerHTML = "";
      for (let n = 0; n < 8; n++) {
        const tear = document.createElement("span");
        tear.className = "tear-drop";
        tear.style.left = `${35 + Math.random() * 30}%`;
        tear.style.animationDelay = `${n * 0.35}s`;
        tearsContainer.appendChild(tear);
      }
    }
  }, 5600));

  // Interactive events binding
  // 1. Click on Yohan (Brother)
  yohanBox.onclick = (e) => {
    yohanBox.classList.remove("talking", "gesture-raise");
    void yohanBox.offsetWidth;
    yohanBox.classList.add("talking", "gesture-raise");

    const bubble = ensureBubble();
    bubble.innerHTML = `
      <div class="bubble-header" style="background: ${BUBCOLOR.brother || '#5a86c4'};">Yohan</div>
      <div class="bubble-content">Estudei e consegui mais uma nota 10!</div>
    `;
    bubble.style.left = "38%";
    bubble.style.top = "18%";
    bubble.classList.add("show");

    // Spawn stars
    const starsContainer = document.getElementById("yohan-stars");
    if (starsContainer) {
      starsContainer.innerHTML = "";
      for (let n = 0; n < 8; n++) {
        const star = document.createElement("span");
        star.className = "gold-star-particle";
        star.textContent = "★";
        star.style.left = `${10 + Math.random() * 80}%`;
        star.style.animationDelay = `${n * 0.15}s`;
        starsContainer.appendChild(star);
      }
    }

    if (typeof playNote === "function") {
      playNote(67, 0.1, 0.6);
      playNote(72, 0.1, 0.5);
      playNote(76, 0.2, 0.5);
    }

    setTimeout(() => {
      yohanBox.classList.remove("talking", "gesture-raise");
      hideBubble();
    }, 2800);

    e.stopPropagation();
  };

  // 2. Click on Ishaan
  hero.onclick = (e) => {
    hero.classList.remove("gesture-sigh", "talking");
    void hero.offsetWidth;
    hero.classList.add("gesture-sigh", "talking");
    hero.innerHTML = ishaan("cry", 0.82);

    const bubble = ensureBubble();
    bubble.innerHTML = `
      <div class="bubble-header" style="background: ${BUBCOLOR.ishaan || 'var(--teal)'};">Ishaan</div>
      <div class="bubble-content">(Por que não consigo ser inteligente como ele?...)</div>
    `;
    bubble.style.left = "62%";
    bubble.style.top = "36%";
    bubble.classList.add("show");

    // Spawn tears
    const tearsContainer = document.getElementById("ishaan-tears");
    if (tearsContainer) {
      tearsContainer.innerHTML = "";
      for (let n = 0; n < 8; n++) {
        const tear = document.createElement("span");
        tear.className = "tear-drop";
        tear.style.left = `${35 + Math.random() * 30}%`;
        tear.style.animationDelay = `${n * 0.2}s`;
        tearsContainer.appendChild(tear);
      }
    }

    if (typeof playNote === "function") {
      playNote(52, 0.15, 0.4);
      playNote(55, 0.2, 0.4);
    }

    setTimeout(() => {
      hero.classList.remove("gesture-sigh", "talking");
      hideBubble();
    }, 3000);

    e.stopPropagation();
  };

  // 3. Click on the Stamping Machine
  stampMachine.onclick = (e) => {
    stampMachine.classList.remove("stamping");
    stampMark.classList.remove("stamped-active");
    void stampMachine.offsetWidth;
    void stampMark.offsetWidth;

    stampMachine.classList.add("stamping");

    setTimeout(() => {
      sceneEl.classList.remove("shaking");
      void sceneEl.offsetWidth;
      sceneEl.classList.add("shaking");
      stampMark.classList.add("stamped-active");

      // Generate flying crushed/rejection marks
      const floatContainer = document.getElementById("compareFloating");
      if (floatContainer) {
        const terms = ["D", "F", "0", "✘", "REP"];
        const term = terms[Math.floor(Math.random() * terms.length)];
        const floatWord = document.createElement("span");
        floatWord.className = "floaty-word red-term";
        floatWord.textContent = term;
        floatWord.style.left = `${60 + Math.random() * 15}%`;
        floatWord.style.top = `40%`;
        floatContainer.appendChild(floatWord);
        setTimeout(() => floatWord.remove(), 1800);
      }

      if (typeof playNote === "function") {
        playNote(36, 0.3, 0.9);
      }
    }, 500);

    e.stopPropagation();
  };
}

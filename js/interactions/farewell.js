/* ===== SCENE 7 FAREWELL TIMELINE & INTERACTIONS ===== */

let farewellTimeouts = [];

function cleanupFarewellTimeline() {
  farewellTimeouts.forEach(clearTimeout);
  farewellTimeouts = [];

  const gate = document.getElementById("farewell-gate");
  if (gate) {
    gate.className = "farewell-gate farewell-gate-open";
    gate.style.transform = "";
  }

  const taxi = document.getElementById("farewell-taxi");
  if (taxi) {
    taxi.className = "taxi-car";
    taxi.style.transform = "";
    taxi.style.opacity = "";
    const headlight = taxi.querySelector(".taxi-headlight");
    if (headlight) headlight.style.fill = "#fff";
  }

  const hero = document.getElementById("hero");
  if (hero) {
    hero.innerHTML = ishaan("sad", .82);
    hero.className = "ishaan-farewell-style";
    hero.style.left = "25%";
    hero.style.transform = "";
    hero.style.opacity = "";
    const tears = document.getElementById("ishaan-tears");
    if (tears) tears.innerHTML = "";
  }

  const mother = document.getElementById("mate");
  if (mother) {
    mother.innerHTML = mateB("sad", .95);
    mother.className = "mother-farewell-style";
    mother.style.left = "56%";
    mother.style.transform = "";
    mother.style.opacity = "";
    const tears = document.getElementById("mother-tears");
    if (tears) tears.innerHTML = "";
  }

  const fatherEl = document.getElementById("bro");
  if (fatherEl) {
    fatherEl.innerHTML = father("neutral", 1.1);
    fatherEl.className = "father-farewell-style";
    fatherEl.style.left = "70%";
    fatherEl.style.transform = "";
    fatherEl.style.opacity = "";
  }
}

function runFarewellTimeline() {
  cleanupFarewellTimeline();

  const sceneEl = stage.querySelector('.scene');
  const gate = document.getElementById("farewell-gate");
  const taxi = document.getElementById("farewell-taxi");
  const hero = document.getElementById("hero");
  const mother = document.getElementById("mate");
  const fatherEl = document.getElementById("bro");

  if (!sceneEl || !gate || !taxi || !hero || !mother || !fatherEl) return;

  // Bind interactive clicks
  bindFarewellClicks();

  // 1500ms: Ishaan starts pleading (Dialogue 1)
  farewellTimeouts.push(setTimeout(() => {
    hero.innerHTML = ishaan("cry", .82);
    hero.classList.add("talking", "pose-farewell-plead");

    // Dynamic crying tears
    const tears = document.getElementById("ishaan-tears");
    if (tears) {
      tears.innerHTML = "";
      for (let n = 0; n < 8; n++) {
        const tearDrop = document.createElement("span");
        tearDrop.className = "tear-drop";
        tearDrop.style.left = `${38 + Math.random() * 24}%`;
        tearDrop.style.animationDelay = `${n * 0.35}s`;
        tears.appendChild(tearDrop);
      }
    }
  }, 1500));

  // 3500ms: Mother talks and reaches out to Ishaan (Dialogue 2)
  farewellTimeouts.push(setTimeout(() => {
    hero.classList.remove("talking", "pose-farewell-plead");
    
    mother.innerHTML = mateB("cry", .95);
    mother.classList.add("talking", "pose-mother-reach");

    // Mother's tears
    const motherTears = document.getElementById("mother-tears");
    if (motherTears) {
      motherTears.innerHTML = "";
      for (let n = 0; n < 6; n++) {
        const tearDrop = document.createElement("span");
        tearDrop.className = "tear-drop";
        tearDrop.style.left = `${38 + Math.random() * 24}%`;
        tearDrop.style.animationDelay = `${n * 0.4}s`;
        motherTears.appendChild(tearDrop);
      }
    }
  }, 3500));

  // 5000ms: Father speaks and drags Mother towards taxi (Dialogue 3)
  farewellTimeouts.push(setTimeout(() => {
    mother.classList.remove("talking", "pose-mother-reach");
    mother.classList.add("pose-mother-weep");

    fatherEl.innerHTML = father("sad", 1.1);
    fatherEl.classList.add("talking", "pose-father-drag");

    // Move parents towards taxi
    fatherEl.style.transition = "left 1.4s ease-in-out";
    mother.style.transition = "left 1.4s ease-in-out";
    
    fatherEl.style.left = "78%";
    mother.style.left = "65%";
  }, 5000));

  // 6200ms: Gate slides closed between Ishaan and parents, metallic impact
  farewellTimeouts.push(setTimeout(() => {
    fatherEl.classList.remove("talking");

    // Close the gate
    gate.classList.remove("farewell-gate-open");
    gate.classList.add("farewell-gate-closed");
    
    // Gate clank shake
    gate.classList.add("gate-clank-shake");
    setTimeout(() => gate.classList.remove("gate-clank-shake"), 800);

    // Play metallic lock sound if synthesizer is on
    if (typeof playNote === "function") {
      playNote(36, 0.4, 1.2);
      setTimeout(() => playNote(43, 0.3, 0.8), 100);
    }

    // Ishaan runs to the gate
    hero.style.transition = "left 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)";
    hero.style.left = "42%";
  }, 6200));

  // 6800ms: Ishaan reaches the closed gate, holds the bars and cries (Dialogue 4)
  farewellTimeouts.push(setTimeout(() => {
    hero.classList.add("pose-farewell-hold");
    
    // Double tears
    const tears = document.getElementById("ishaan-tears");
    if (tears) {
      for (let n = 0; n < 8; n++) {
        const tearDrop = document.createElement("span");
        tearDrop.className = "tear-drop";
        tearDrop.style.left = `${38 + Math.random() * 24}%`;
        tearDrop.style.animationDelay = `${n * 0.25}s`;
        tears.appendChild(tearDrop);
      }
    }
  }, 6800));

  // 7800ms: Parents get in the taxi (they shrink/fade) and headlights turn on
  farewellTimeouts.push(setTimeout(() => {
    fatherEl.style.transition = "transform 0.8s ease-in, opacity 0.8s ease-in";
    mother.style.transition = "transform 0.8s ease-in, opacity 0.8s ease-in";
    
    fatherEl.style.transform = "scale(0.2) translateY(30px)";
    fatherEl.style.opacity = "0";
    
    mother.style.transform = "scale(0.2) translateY(30px)";
    mother.style.opacity = "0";

    // Activate taxi headlights
    taxi.classList.add("taxi-active");
    if (typeof playNote === "function") {
      playNote(48, 0.15, 0.5);
      playNote(55, 0.15, 0.5);
    }
  }, 7800));

  // 9000ms: Taxi drives off into the rain
  farewellTimeouts.push(setTimeout(() => {
    taxi.classList.add("taxi-drive-away");
    
    // Simulated engine rumble sound
    if (typeof playNote === "function") {
      playNote(33, 0.2, 1.8);
      setTimeout(() => playNote(29, 0.15, 2.0), 300);
    }
  }, 9000));
}

function bindFarewellClicks() {
  const taxi = document.getElementById("farewell-taxi");
  const gate = document.getElementById("farewell-gate");
  const hero = document.getElementById("hero");
  const mother = document.getElementById("mate");
  const fatherEl = document.getElementById("bro");

  if (taxi) {
    taxi.onclick = (e) => {
      e.stopPropagation();
      taxi.classList.remove("taxi-headlight-flash");
      void taxi.offsetWidth;
      taxi.classList.add("taxi-headlight-flash");
      setTimeout(() => taxi.classList.remove("taxi-headlight-flash"), 500);

      // Play synthesized horn
      if (typeof playNote === "function") {
        playNote(58, 0.25, 0.2);
        setTimeout(() => playNote(58, 0.25, 0.25), 140);
      }

      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background:#555;">Táxi</div>
        <div class="bubble-content">BIIIIP BIIIP!</div>
      `;
      bubble.style.left = "80%";
      bubble.style.top = "30%";
      bubble.classList.add("show");
      setTimeout(hideBubble, 1500);
    };
  }

  if (gate) {
    gate.onclick = (e) => {
      e.stopPropagation();
      gate.classList.remove("gate-clank-shake");
      void gate.offsetWidth;
      gate.classList.add("gate-clank-shake");
      setTimeout(() => gate.classList.remove("gate-clank-shake"), 600);

      // Play metallic clank sound
      if (typeof playNote === "function") {
        playNote(40, 0.3, 0.7);
      }
    };
  }

  if (hero) {
    hero.onclick = (e) => {
      e.stopPropagation();
      hero.classList.remove("talking", "pose-farewell-plead");
      void hero.offsetWidth;
      hero.classList.add("talking", "pose-farewell-plead");

      // Sad piano notes
      if (typeof playNote === "function") {
        playNote(60, 0.2, 1.6);
        playNote(63, 0.2, 1.6);
      }

      // Add extra tears
      const tears = document.getElementById("ishaan-tears");
      if (tears) {
        for (let n = 0; n < 4; n++) {
          const tearDrop = document.createElement("span");
          tearDrop.className = "tear-drop";
          tearDrop.style.left = `${38 + Math.random() * 24}%`;
          tearDrop.style.animationDelay = `${n * 0.3}s`;
          tears.appendChild(tearDrop);
        }
      }

      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background:var(--teal);">Ishaan</div>
        <div class="bubble-content">Mãe! Não me deixa aqui!</div>
      `;
      
      const rEl = hero.getBoundingClientRect();
      const rSc = stage.querySelector('.scene').getBoundingClientRect();
      const x = rEl.left + rEl.width / 2 - rSc.left;
      const y = rEl.top - rSc.top;
      bubble.style.left = Math.min(Math.max(x, 80), rSc.width - 80) + 'px';
      bubble.style.top = (y - 12) + 'px';
      bubble.classList.add("show");

      setTimeout(() => {
        hero.classList.remove("talking", "pose-farewell-plead");
        hideBubble();
      }, 2000);
    };
  }

  if (mother) {
    mother.onclick = (e) => {
      e.stopPropagation();
      mother.classList.remove("talking", "pose-mother-weep");
      void mother.offsetWidth;
      mother.classList.add("talking", "pose-mother-weep");

      if (typeof playNote === "function") {
        playNote(65, 0.18, 1.8);
      }

      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background:var(--pink);">Mãe</div>
        <div class="bubble-content">Perdoe-me, meu querido...</div>
      `;
      
      const rEl = mother.getBoundingClientRect();
      const rSc = stage.querySelector('.scene').getBoundingClientRect();
      const x = rEl.left + rEl.width / 2 - rSc.left;
      const y = rEl.top - rSc.top;
      bubble.style.left = Math.min(Math.max(x, 80), rSc.width - 80) + 'px';
      bubble.style.top = (y - 12) + 'px';
      bubble.classList.add("show");

      setTimeout(() => {
        mother.classList.remove("talking", "pose-mother-weep");
        hideBubble();
      }, 2000);
    };
  }

  if (fatherEl) {
    fatherEl.onclick = (e) => {
      e.stopPropagation();
      fatherEl.classList.remove("talking", "pose-father-stern");
      void fatherEl.offsetWidth;
      fatherEl.classList.add("talking", "pose-father-stern");

      if (typeof playNote === "function") {
        playNote(48, 0.22, 1.2);
      }

      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background:#c0566f;">Pai</div>
        <div class="bubble-content">É para o seu próprio bem, Ishaan.</div>
      `;
      
      const rEl = fatherEl.getBoundingClientRect();
      const rSc = stage.querySelector('.scene').getBoundingClientRect();
      const x = rEl.left + rEl.width / 2 - rSc.left;
      const y = rEl.top - rSc.top;
      bubble.style.left = Math.min(Math.max(x, 80), rSc.width - 80) + 'px';
      bubble.style.top = (y - 12) + 'px';
      bubble.classList.add("show");

      setTimeout(() => {
        fatherEl.classList.remove("talking", "pose-father-stern");
        hideBubble();
      }, 2000);
    };
  }
}

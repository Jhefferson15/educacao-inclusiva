/* ===== SCENE 6 FATHER ANGER TIMELINE & INTERACTIVE EFFECTS ===== */

let fatherAngerTimeouts = [];

function cleanupFatherAngerTimeline() {
  fatherAngerTimeouts.forEach(clearTimeout);
  fatherAngerTimeouts = [];

  const fatherGroup = document.getElementById("bro");
  if (fatherGroup) {
    fatherGroup.classList.remove("talking", "gesture-rage-point", "gesture-sigh", "step-forward", "shouting");
    const fatherChar = fatherGroup.querySelector(".char-father");
    if (fatherChar) {
      fatherGroup.innerHTML = father("sad", 1.15);
    }
  }

  const ishaanGroup = document.getElementById("hero");
  if (ishaanGroup) {
    ishaanGroup.classList.remove("talking", "gesture-scared", "shivering", "cower");
    const ishaanChar = ishaanGroup.querySelector(".char-ishaan");
    if (ishaanChar) {
      ishaanGroup.innerHTML = ishaan("sad", 0.82);
    }
  }

  const reportCard = document.getElementById("sc6-report-card");
  if (reportCard) {
    reportCard.classList.remove("report-glow", "letter-shake");
  }

  const tears = document.getElementById("ishaan-tears");
  if (tears) tears.innerHTML = "";

  const words = document.getElementById("angerWords");
  if (words) words.innerHTML = "";

  const gloomCloud = document.getElementById("gloomCloud6");
  if (gloomCloud) {
    gloomCloud.classList.remove("gloom-active");
    gloomCloud.innerHTML = "";
  }

  const sceneEl = stage.querySelector('.scene');
  if (sceneEl) {
    sceneEl.classList.remove("shaking");
  }
}

function runFatherAngerTimeline() {
  cleanupFatherAngerTimeline();

  const sceneEl = stage.querySelector('.scene');
  const fatherGroup = document.getElementById("bro");
  const ishaanGroup = document.getElementById("hero");
  const reportCard = document.getElementById("sc6-report-card");
  const gloomCloud = document.getElementById("gloomCloud6");
  const words = document.getElementById("angerWords");

  if (!sceneEl || !fatherGroup || !ishaanGroup || !reportCard) return;

  // 500ms: Father steps forward aggressively, shouts at Ishaan
  fatherAngerTimeouts.push(setTimeout(() => {
    fatherGroup.classList.add("step-forward", "shouting", "talking", "gesture-rage-point");
    reportCard.classList.add("report-glow");
    
    // Spawn initial aggressive words
    spawnAngerWord("ESTUDE!", "35%", "25%");
    spawnAngerWord("VERGONHA!", "45%", "15%");

    if (typeof playNote === "function") {
      playNote(40, 0.15, 0.8);
    }
  }, 500));

  // 3000ms: Father stops shouting, stands in disappointment (sighs). Ishaan cowers and starts crying.
  fatherAngerTimeouts.push(setTimeout(() => {
    fatherGroup.classList.remove("talking", "shouting", "gesture-rage-point");
    fatherGroup.classList.add("gesture-sigh");

    ishaanGroup.classList.add("cower", "shivering", "talking");
    
    // Start shedding tears
    const tears = document.getElementById("ishaan-tears");
    if (tears) {
      tears.innerHTML = "";
      for (let n = 0; n < 10; n++) {
        const tearDrop = document.createElement("span");
        tearDrop.className = "tear-drop";
        tearDrop.style.left = `${38 + Math.random() * 24}%`;
        tearDrop.style.animationDelay = `${n * 0.3}s`;
        tears.appendChild(tearDrop);
      }
    }

    // Camera shakes from emotional impact
    sceneEl.classList.add("shaking");

    if (typeof playNote === "function") {
      playNote(48, 0.2, 0.5);
      setTimeout(() => playNote(45, 0.2, 0.4), 250);
    }
  }, 3000));

  // 5500ms: Narrator speaks, gloom cloud activates, heavy psychological atmosphere
  fatherAngerTimeouts.push(setTimeout(() => {
    ishaanGroup.classList.remove("talking");
    sceneEl.classList.remove("shaking");
    
    if (gloomCloud) {
      gloomCloud.classList.add("gloom-active");
      gloomCloud.innerHTML = `
        <span class="gloomy-word" style="left:12%; top:15%; animation-delay: 0.1s">INCOMPREENSÃO</span>
        <span class="gloomy-word" style="left:30%; top:22%; animation-delay: 0.7s">PRESSÃO</span>
        <span class="gloomy-word" style="left:5%; top:45%; animation-delay: 1.4s">COBRANÇA</span>
      `;
    }
  }, 5500));
}

function spawnAngerWord(text, left, top) {
  const container = document.getElementById("angerWords");
  if (!container) return;
  
  const span = document.createElement("span");
  span.className = "floaty-word red-term";
  span.textContent = text;
  span.style.left = left;
  span.style.top = top;
  container.appendChild(span);
  
  setTimeout(() => span.remove(), 2000);
}

// Attach interactivity handlers to scene elements
function setupFatherAngerInteractions() {
  const fatherGroup = document.getElementById("bro");
  const ishaanGroup = document.getElementById("hero");
  const reportCard = document.getElementById("sc6-report-card");
  const pictureFrame = document.getElementById("sc6-picture-frame");
  
  if (reportCard) {
    reportCard.onclick = (e) => {
      e.stopPropagation();
      reportCard.classList.remove("letter-shake");
      void reportCard.offsetWidth;
      reportCard.classList.add("letter-shake");
      
      const terms = ["F", "ZERO", "SEM FUTURO", "REPROVADO", "PREGUIÇA"];
      const term = terms[Math.floor(Math.random() * terms.length)];
      spawnAngerWord(term, `${30 + Math.random() * 20}%`, "35%");
      
      if (fatherGroup) {
        fatherGroup.classList.remove("talking", "gesture-rage-point", "gesture-sigh");
        void fatherGroup.offsetWidth;
        fatherGroup.classList.add("talking", "gesture-rage-point");
        
        const bubble = ensureBubble();
        bubble.innerHTML = `
          <div class="bubble-header" style="background: ${BUBCOLOR.father || '#c0566f'};">Pai</div>
          <div class="bubble-content">Olhe para isso! Que vergonha!</div>
        `;
        bubble.style.left = "42%";
        bubble.style.top = "18%";
        bubble.classList.add("show");
        
        setTimeout(() => {
          fatherGroup.classList.remove("talking", "gesture-rage-point");
          hideBubble();
        }, 2200);
      }
      
      if (typeof playNote === "function") {
        playNote(36, 0.25, 0.9);
      }
    };
  }
  
  if (fatherGroup) {
    fatherGroup.onclick = (e) => {
      e.stopPropagation();
      fatherGroup.classList.remove("talking", "gesture-rage-point", "shouting");
      void fatherGroup.offsetWidth;
      fatherGroup.classList.add("talking", "gesture-rage-point", "shouting");
      
      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background: ${BUBCOLOR.father || '#c0566f'};">Pai</div>
        <div class="bubble-content">Você só quer saber de brincadeira!</div>
      `;
      bubble.style.left = "45%";
      bubble.style.top = "16%";
      bubble.classList.add("show");
      
      spawnAngerWord("ESTUDE!", "38%", "20%");
      
      if (ishaanGroup) {
        ishaanGroup.classList.remove("shivering");
        void ishaanGroup.offsetWidth;
        ishaanGroup.classList.add("shivering");
      }
      
      const sceneEl = stage.querySelector('.scene');
      if (sceneEl) {
        sceneEl.classList.remove("shaking");
        void sceneEl.offsetWidth;
        sceneEl.classList.add("shaking");
        setTimeout(() => sceneEl.classList.remove("shaking"), 800);
      }
      
      if (typeof playNote === "function") {
        playNote(38, 0.2, 0.6);
      }
      
      setTimeout(() => {
        fatherGroup.classList.remove("talking", "gesture-rage-point", "shouting");
        hideBubble();
      }, 2200);
    };
  }
  
  if (ishaanGroup) {
    ishaanGroup.onclick = (e) => {
      e.stopPropagation();
      ishaanGroup.classList.remove("talking", "gesture-scared");
      void ishaanGroup.offsetWidth;
      ishaanGroup.classList.add("talking", "gesture-scared");
      
      const bubble = ensureBubble();
      bubble.innerHTML = `
        <div class="bubble-header" style="background: ${BUBCOLOR.ishaan || 'var(--teal)'};">Ishaan</div>
        <div class="bubble-content">Eu... eu juro que tentei ler...</div>
      `;
      bubble.style.left = "65%";
      bubble.style.top = "30%";
      bubble.classList.add("show");
      
      const tears = document.getElementById("ishaan-tears");
      if (tears) {
        tears.innerHTML = "";
        for (let n = 0; n < 6; n++) {
          const tearDrop = document.createElement("span");
          tearDrop.className = "tear-drop";
          tearDrop.style.left = `${50 + Math.random() * 24}%`;
          tearDrop.style.animationDelay = `${n * 0.25}s`;
          tears.appendChild(tearDrop);
        }
      }
      
      if (typeof playNote === "function") {
        playNote(72, 0.12, 0.7);
        setTimeout(() => playNote(75, 0.15, 0.8), 200);
      }
      
      setTimeout(() => {
        ishaanGroup.classList.remove("talking", "gesture-scared");
        hideBubble();
      }, 2500);
    };
  }

  if (pictureFrame) {
    pictureFrame.onclick = (e) => {
      e.stopPropagation();
      pictureFrame.classList.remove("frame-tilt");
      void pictureFrame.offsetWidth;
      pictureFrame.classList.add("frame-tilt");
      
      if (typeof playNote === "function") {
        playNote(57, 0.1, 0.5);
      }
      
      spawnAngerWord("TENSÃO", "20%", "25%");
    };
  }
}

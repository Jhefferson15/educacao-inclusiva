/* ===== SCENE 4 COMPLAINT TIMELINE & INTERACTIONS ===== */

let complaintTimeouts = [];

function cleanupComplaintTimeline() {
  complaintTimeouts.forEach(clearTimeout);
  complaintTimeouts = [];
  
  const principalEl = document.getElementById("teach");
  if (principalEl) {
    principalEl.innerHTML = principal("neutral", 1.15);
    principalEl.classList.remove(
      "talking", "gesture-point", "gesture-explain", "gesture-sigh",
      "act-stamp", "principal-point-accuse", "principal-cross-arms", "principal-dismiss"
    );
  }
  
  const fatherEl = document.getElementById("bro");
  if (fatherEl) {
    fatherEl.innerHTML = father("sad", 1.12);
    fatherEl.classList.remove(
      "talking", "gesture-point", "gesture-explain", "gesture-plead", "gesture-sigh",
      "father-shocked", "father-plead-speak", "father-despair"
    );
  }
  
  const heroGroup = document.querySelector(".ishaan-complaint-group");
  const hero = document.getElementById("hero");
  if (heroGroup) {
    heroGroup.classList.remove("cry");
    const tears = document.getElementById("ishaan-tears");
    if (tears) tears.innerHTML = "";
  }
  if (hero) {
    hero.innerHTML = ishaan("sad", .85);
    hero.classList.remove(
      "talking", "gesture-scared", "gesture-sigh", "gesture-plead",
      "ishaan-look-up", "ishaan-shiver-cry", "ishaan-cover-ears"
    );
  }
  
  const stageEl = document.getElementById("stage");
  if (stageEl) {
    const sceneEl = stageEl.querySelector('.scene');
    if (sceneEl) {
      sceneEl.classList.remove("cam-shake-brief", "cam-focus-ishaan");
      // Certificar que a câmera padrão de complaint é re-adicionada
      sceneEl.classList.add("cam-complaint");
    }
  }
  
  const gloomCloud = document.getElementById("gloomCloud");
  if (gloomCloud) {
    gloomCloud.classList.remove("gloom-active");
    gloomCloud.innerHTML = "";
  }
  const words = document.getElementById("complaintWords");
  if (words) {
    words.innerHTML = "";
  }
  
  const letter = document.getElementById("complaint-letter");
  if (letter) {
    letter.classList.remove("letter-glow", "letter-shake");
  }

  if (typeof hideBubble === "function") {
    hideBubble();
  }
}

function runComplaintTimeline() {
  cleanupComplaintTimeline();
  
  const sceneEl = stage.querySelector('.scene');
  const principalEl = document.getElementById("teach");
  const fatherEl = document.getElementById("bro");
  const hero = document.getElementById("hero");
  const letter = document.getElementById("complaint-letter");
  const gloomCloud = document.getElementById("gloomCloud");
  
  if (!sceneEl || !principalEl || !fatherEl || !hero || !letter) return;
  
  // -- 0ms: Estado Inicial
  // Ishaan olha para cima e para a direita preocupado.
  hero.classList.add("ishaan-look-up");
  
  // -- 1000ms: Diretor levanta o braço para o carimbo
  complaintTimeouts.push(setTimeout(() => {
    principalEl.classList.add("act-stamp");
  }, 1000));
  
  // -- 1400ms: Impacto do Carimbo! Tremor de câmera, marca vermelha brilha, Pai se assusta
  complaintTimeouts.push(setTimeout(() => {
    letter.classList.add("letter-glow");
    
    // Forçar reflow para reiniciar animação de shake
    sceneEl.classList.remove("cam-shake-brief");
    void sceneEl.offsetWidth;
    sceneEl.classList.add("cam-shake-brief");
    
    fatherEl.classList.add("father-shocked");
    
    // Efeito sonoro do impacto do carimbo (batida seca e grave)
    if (typeof playNote === "function") {
      playNote(36, 0.1, 0.85); // Tom grave encorpado
      setTimeout(() => playNote(41, 0.08, 0.5), 60); // Ressonância metálica sutil
    }
  }, 1400));
  
  // -- 1700ms: Diretor começa a apontar de forma autoritária e fala
  complaintTimeouts.push(setTimeout(() => {
    principalEl.classList.remove("act-stamp");
    fatherEl.classList.remove("father-shocked");
    
    principalEl.classList.add("talking", "principal-point-accuse");
    
    if (typeof showBubble === "function") {
      showBubble(["principal", "O Ishaan não acompanha a turma. Sugiro que procurem outra escola."]);
    }
  }, 1700));
  
  // -- 4500ms: Diretor cruza os braços friamente. Pai gesticula implorando
  complaintTimeouts.push(setTimeout(() => {
    principalEl.classList.remove("talking", "principal-point-accuse");
    principalEl.classList.add("principal-cross-arms");
    
    fatherEl.classList.add("talking", "father-plead-speak");
    
    if (typeof showBubble === "function") {
      showBubble(["father", "Mas diretor, deve haver alguma solução..."]);
    }
  }, 4500));
  
  // -- 7500ms: Diretor gesticula dispensa. Pai cai em desespero e desânimo
  complaintTimeouts.push(setTimeout(() => {
    fatherEl.classList.remove("talking", "father-plead-speak");
    fatherEl.classList.add("father-despair");
    
    principalEl.classList.remove("principal-cross-arms");
    principalEl.classList.add("principal-dismiss");
    
    if (typeof hideBubble === "function") {
      hideBubble();
    }
  }, 7500));
  
  // -- 8200ms: Nuvem de desespero ativa e palavras tristes começam a flutuar
  complaintTimeouts.push(setTimeout(() => {
    principalEl.classList.remove("principal-dismiss");
    
    if (gloomCloud) {
      gloomCloud.classList.add("gloom-active");
      gloomCloud.innerHTML = `
        <span class="gloomy-word" style="left:15%; top:15%; animation-delay: 0.1s">INCOMPREENSÃO</span>
        <span class="gloomy-word" style="left:5%; top:45%; animation-delay: 0.8s">FALTA DE APOIO</span>
        <span class="gloomy-word" style="left:28%; top:25%; animation-delay: 1.5s">REJEIÇÃO</span>
        <span class="gloomy-word" style="left:35%; top:50%; animation-delay: 2.2s">EXCLUSÃO</span>
      `;
    }
  }, 8200));
  
  // -- 8800ms: Ishaan desmorona. Ele chora, treme, cobre os ouvidos. Câmera faz zoom nele.
  complaintTimeouts.push(setTimeout(() => {
    hero.classList.remove("ishaan-look-up");
    hero.innerHTML = ishaan("cry", .85);
    hero.classList.add("ishaan-shiver-cry", "ishaan-cover-ears");
    
    // Zoom dramático focado em Ishaan
    sceneEl.classList.remove("cam-complaint");
    sceneEl.classList.add("cam-focus-ishaan");
    
    // Aciona lágrimas caírem
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
    
    if (typeof showBubble === "function") {
      showBubble(["ishaan", "(Eu só quero ir para casa...)"]);
    }
    
    // Toca acordes tristes em tons menores
    if (typeof playNote === "function") {
      playNote(48, 0.25, 0.6); // Dó grave
      setTimeout(() => playNote(51, 0.25, 0.5), 250); // Mib grave
      setTimeout(() => playNote(55, 0.3, 0.5), 500); // Sol
      setTimeout(() => playNote(58, 0.4, 0.4), 750); // Sib (C minor 7th)
    }
  }, 8800));
}

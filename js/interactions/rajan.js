/* ===== SCENE 10 RAJAN TIMELINE & INTERACTIVE CLINIC ===== */

let rajanTimeouts = [];
let leavesInterval = null;

function cleanupRajanTimeline() {
  // Limpar timeouts
  rajanTimeouts.forEach(clearTimeout);
  rajanTimeouts = [];
  
  if (leavesInterval) {
    clearInterval(leavesInterval);
    leavesInterval = null;
  }

  // Resetar personagens para estado padrão
  const rajanGroup = document.getElementById("mate");
  if (rajanGroup) {
    rajanGroup.classList.remove("talking", "act-rajan-walk", "pose-rajan-wave", "pose-rajan-sit");
    rajanGroup.style.left = "";
    rajanGroup.style.transition = "";
    rajanGroup.innerHTML = rajan("neutral", 0.9);
  }

  const ishaanGroup = document.getElementById("hero");
  if (ishaanGroup) {
    ishaanGroup.classList.remove("talking", "pose-ishaan-alone", "pose-ishaan-sit", "pose-ishaan-look-up-surprise", "pose-ishaan-greet");
    ishaanGroup.style.left = "";
    ishaanGroup.innerHTML = ishaan("sad", 0.85);
  }

  // Limpar folhas caindo
  const leavesContainer = document.getElementById("sc10-leaves");
  if (leavesContainer) {
    leavesContainer.innerHTML = "";
  }

  // Resetar classes da cena
  const sceneEl = stage.querySelector('.scene');
  if (sceneEl) {
    sceneEl.classList.remove("cam-zoom-cinematic");
  }
}

function runRajanTimeline() {
  cleanupRajanTimeline();

  const sceneEl = stage.querySelector('.scene');
  const rajanGroup = document.getElementById("mate");
  const ishaanGroup = document.getElementById("hero");
  const treeEl = document.getElementById("sc10-tree");
  const benchEl = document.getElementById("sc10-bench");
  const butterflyEl = document.getElementById("sc10-butterfly");

  if (!sceneEl || !rajanGroup || !ishaanGroup) return;

  // ===== CONFIGURAÇÃO DA LINHA DO TEMPO NARRATIVA =====

  // [0ms] Estado inicial: Ishaan triste no banco, Rajan fora da tela
  ishaanGroup.classList.add("pose-ishaan-alone");
  
  rajanGroup.style.left = "-20%";
  rajanGroup.classList.add("act-rajan-walk");
  
  // Forçar reflow
  void rajanGroup.offsetWidth;
  
  // Iniciar caminhada com muletas até o banco
  rajanGroup.style.transition = "left 2.6s linear";
  rajanGroup.style.left = "31%";

  // [2600ms] Rajan chega, para, olha e acena para Ishaan
  rajanTimeouts.push(setTimeout(() => {
    rajanGroup.classList.remove("act-rajan-walk");
    rajanGroup.classList.add("pose-rajan-wave");
    rajanGroup.innerHTML = rajan("happy", 0.9);
    
    if (typeof playNote === "function") {
      playNote(64, 0.1, 0.4);
    }
  }, 2600));

  // [5000ms] Ishaan ouve Rajan, olha para cima surpreso (câmera aproxima)
  rajanTimeouts.push(setTimeout(() => {
    ishaanGroup.classList.remove("pose-ishaan-alone");
    ishaanGroup.classList.add("pose-ishaan-look-up-surprise");
    ishaanGroup.innerHTML = ishaan("surprised", 0.85);
    
    // Zoom cinemático lento e sutil focado no banco
    sceneEl.classList.add("cam-zoom-cinematic");
    
    if (typeof playNote === "function") {
      playNote(67, 0.15, 0.3);
    }
  }, 5000));

  // [6200ms] Ishaan sorri e cumprimenta Rajan de volta
  rajanTimeouts.push(setTimeout(() => {
    ishaanGroup.classList.remove("pose-ishaan-look-up-surprise");
    ishaanGroup.classList.add("pose-ishaan-greet");
    ishaanGroup.innerHTML = ishaan("happy", 0.85);
  }, 6200));

  // [7800ms] Rajan se senta no banco ao lado de Ishaan e apoia as muletas
  rajanTimeouts.push(setTimeout(() => {
    rajanGroup.classList.remove("pose-rajan-wave");
    rajanGroup.classList.add("pose-rajan-sit");
    
    rajanGroup.style.transition = "left 0.8s ease-out, bottom 0.8s ease-out";
    rajanGroup.style.left = "37%";
    
    if (typeof playNote === "function") {
      playNote(60, 0.2, 0.3);
    }
  }, 7800));

  // [9200ms] Momento de amizade: folhas começam a cair e os dois conversam
  rajanTimeouts.push(setTimeout(() => {
    ishaanGroup.classList.remove("pose-ishaan-greet");
    ishaanGroup.classList.add("pose-ishaan-sit"); // Posição sentada feliz e integrada
    ishaanGroup.innerHTML = ishaan("happy", 0.85);
    
    // Trigger queda automática de algumas folhas
    for (let i = 0; i < 3; i++) {
      setTimeout(() => triggerLeafFall(), i * 800);
    }
  }, 9200));


  // ===== BIND DE EVENTOS INTERATIVOS (CLIQUE) =====

  // 1. Clique na Árvore: Faz folhas caírem e toca notas musicais
  if (treeEl) {
    treeEl.addEventListener("click", () => {
      // Queda de 4 folhas
      for (let i = 0; i < 4; i++) {
        setTimeout(() => triggerLeafFall(), i * 250);
      }
      
      // Som arpejo de harpa
      if (typeof actx !== "undefined" && actx && typeof pluck === "function") {
        const notes = [72, 76, 79, 84];
        notes.forEach((note, index) => {
          setTimeout(() => {
            pluck(midiF(note + Math.floor(Math.random() * 4)));
          }, index * 80);
        });
      }
    });
  }

  // 2. Clique no Banco: Faz o passarinho pular e piar
  if (benchEl) {
    benchEl.addEventListener("click", (e) => {
      // Evitar propagação se clicou nos personagens
      if (e.target.closest("#hero") || e.target.closest("#mate")) return;
      
      const bird = document.getElementById("sc10-bird");
      if (bird) {
        bird.classList.remove("hop");
        void bird.offsetWidth;
        bird.classList.add("hop");
        setTimeout(() => bird.classList.remove("hop"), 500);
      }
      
      // Som de piado de pássaro
      if (typeof actx !== "undefined" && actx && typeof playNote === "function") {
        playNote(88, 0.05, 0.25);
        setTimeout(() => playNote(93, 0.05, 0.25), 60);
      }
    });
  }

  // 3. Clique na Borboleta: Faz ela dar um giro acrobático
  if (butterflyEl) {
    butterflyEl.addEventListener("click", () => {
      butterflyEl.classList.remove("butterfly-spin");
      void butterflyEl.offsetWidth;
      butterflyEl.classList.add("butterfly-spin");
      setTimeout(() => butterflyEl.classList.remove("butterfly-spin"), 800);

      // Som suave
      if (typeof actx !== "undefined" && actx && typeof playNote === "function") {
        playNote(79, 0.15, 0.15);
      }
    });
  }

  // 4. Clique em Ishaan: Reação de cumprimento amigável
  if (ishaanGroup) {
    ishaanGroup.addEventListener("click", () => {
      const wasAlone = ishaanGroup.classList.contains("pose-ishaan-alone");
      const wasSittingHappy = ishaanGroup.classList.contains("pose-ishaan-sit");
      if (wasAlone || wasSittingHappy) {
        ishaanGroup.classList.remove("pose-ishaan-alone", "pose-ishaan-sit");
        ishaanGroup.classList.add("pose-ishaan-greet");
        ishaanGroup.innerHTML = ishaan("happy", 0.85);
        
        if (typeof playNote === "function") {
          playNote(72, 0.1, 0.3);
        }
        
        setTimeout(() => {
          if (stage.querySelector('.scene-rajan')) {
            ishaanGroup.classList.remove("pose-ishaan-greet");
            if (wasAlone) {
              ishaanGroup.classList.add("pose-ishaan-alone");
              ishaanGroup.innerHTML = ishaan("sad", 0.85);
            } else {
              ishaanGroup.classList.add("pose-ishaan-sit");
              ishaanGroup.innerHTML = ishaan("happy", 0.85);
            }
          }
        }, 1500);
      }
    });
  }

  // 5. Clique em Rajan: Reação de aceno amigável
  if (rajanGroup) {
    rajanGroup.addEventListener("click", () => {
      const isSitting = rajanGroup.classList.contains("pose-rajan-sit");
      if (isSitting) {
        rajanGroup.classList.remove("pose-rajan-sit");
        rajanGroup.classList.add("pose-rajan-wave");
        rajanGroup.innerHTML = rajan("excited", 0.9);
        
        if (typeof playNote === "function") {
          playNote(76, 0.1, 0.3);
        }

        setTimeout(() => {
          if (stage.querySelector('.scene-rajan')) {
            rajanGroup.classList.remove("pose-rajan-wave");
            rajanGroup.classList.add("pose-rajan-sit");
            rajanGroup.innerHTML = rajan("happy", 0.9);
          }
        }, 1500);
      }
    });
  }
}

// Função auxiliar para criar e animar uma folha caindo
function triggerLeafFall() {
  const leavesContainer = document.getElementById("sc10-leaves");
  if (!leavesContainer) return;

  const leaf = document.createElement("div");
  leaf.className = "falling-leaf";
  
  // Posição inicial randômica na folhagem da árvore (centro da copa)
  const treeLeft = 68; // % do container scene
  const leafX = treeLeft + 2 + Math.random() * 20; 
  const leafY = 30 + Math.random() * 20; // % do topo

  leaf.style.left = `${leafX}%`;
  leaf.style.top = `${leafY}%`;
  
  // Cores de outono variadas para a árvore
  const autumnColors = ["#00796b", "#00897b", "#26a69a", "#80cbc4", "#ffd54f", "#ffb300"];
  leaf.style.backgroundColor = autumnColors[Math.floor(Math.random() * autumnColors.length)];
  
  // Duração e rotação inicial randômica
  const duration = 3.5 + Math.random() * 1.5;
  leaf.style.animationDuration = `${duration}s`;
  
  leavesContainer.appendChild(leaf);
  
  // Remover a folha após o término da animação
  setTimeout(() => leaf.remove(), duration * 1000);
}

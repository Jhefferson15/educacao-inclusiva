/* ===== DOM NODE REFERENCES ===== */

const stage = document.getElementById("stage"),
      dots = document.getElementById("dots"),
      counter = document.getElementById("counter"),
      prev = document.getElementById("prev"),
      next = document.getElementById("next"),
      notes = document.getElementById("notes"),
      movie = document.getElementById("movie"),
      music = document.getElementById("music"),
      voice = document.getElementById("voice");

/* ===== RENDER ENGINE ===== */

function render(i) {
  clearVisualDialogues();
  clearSpeakerAnimations();
  if (typeof hideBubble === 'function') hideBubble();

  const s = scenes[i];
  let h = '<div class="slide active">';
  if (s.type === "intro") {
    h += `<div class="eyebrow">${s.eyebrow}</div>
      <div class="scene" style="height:auto;margin-bottom:.4em"><div class="book cover wobble"><div class="covertitle">
        <div class="dance"><span style="color:var(--vermilion);animation-delay:0s">E</span><span style="color:var(--teal);animation-delay:.18s">d</span><span style="color:var(--marigold);animation-delay:.36s">u</span><span style="color:var(--lilac);animation-delay:.1s">c</span><span style="color:var(--green);animation-delay:.5s">a</span><span style="color:var(--pink);animation-delay:.28s">ç</span><span style="color:var(--vermilion);animation-delay:.12s">ã</span><span style="color:var(--teal);animation-delay:.4s">o</span></div>
        <div class="dance"><span style="color:var(--marigold);animation-delay:.2s">I</span><span style="color:var(--lilac);animation-delay:.05s">n</span><span style="color:var(--green);animation-delay:.33s">c</span><span style="color:var(--pink);animation-delay:.15s">l</span><span style="color:var(--vermilion);animation-delay:.45s">u</span><span style="color:var(--teal);animation-delay:.25s">s</span><span style="color:var(--marigold);animation-delay:.1s">i</span><span style="color:var(--lilac);animation-delay:.38s">v</span><span style="color:var(--green);animation-delay:.5s">a</span></div>
      </div></div></div>
      <h1>${s.title}</h1><div class="sub">${s.sub}</div><p class="desc">${s.desc}</p>`;
  } else if (s.type === "close") {
    h += `<div class="eyebrow">${s.eyebrow}</div>
      <div class="closewall">
        <div class="warmdoor"></div>
        <div class="heroor">${ishaan("happy", 1)}</div>
        ${s.barriers.map((b, k) => `<div class="barrier bz${k}">${b}</div>`).join("")}
      </div>
      <h2>${s.title}</h2><div class="sub">${s.sub}</div>`;
  } else {
    h += `<div class="eyebrow">Cena ${s.num} de ${scenes.filter(sc => sc.num).length}</div>${buildArt(s)}
      <h2>${s.title}</h2><p class="desc">${s.desc}</p>
      <div class="lenswrap">${s.lens.map(l => `<span class="lens ${l[0]}">${l[1]}</span>`).join("")}</div>`;
  }
  h += `<div class="narration ${notesOn ? 'show' : ''}">${s.narration}</div>`;
  if (i === 0) h += `<div style="text-align:center"><button class="start" id="go">Começar a história ›</button></div>`;
  h += '</div>';
  stage.innerHTML = h;

  document.body.classList.remove("warm", "cold");
  if (s.body) document.body.classList.add(s.body);
  dots.innerHTML = scenes.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join("");
  counter.textContent = (i + 1) + " / " + scenes.length;
  prev.disabled = i === 0;
  next.innerHTML = i === scenes.length - 1 
    ? `<span class="btn-text">Reiniciar</span><span class="material-symbols-rounded">replay</span>` 
    : `<span class="btn-text">Avançar</span><span class="material-symbols-rounded">chevron_right</span>`;
  const go = document.getElementById("go");
  if (go) go.onclick = () => nav(1);

  // Apply cinematic camera effects
  const sceneEl = stage.querySelector('.scene');
  if (sceneEl && s.art) {
    const camClass = CAMERAMAP[s.art];
    if (camClass) {
      sceneEl.classList.add(camClass);
      if (camClass === 'cam-zoom-shake') {
        setTimeout(() => {
          if (stage.querySelector('.scene') === sceneEl) {
            sceneEl.classList.add('shaking');
          }
        }, 1200);
      }
    }
  }

  runChoreo(s.art);
  
  if (s.art === "classroom") {
    runClassroomTimeline();
  } else {
    cleanupClassroomTimeline();
  }
  
  if (s.art === "complaint") {
    runComplaintTimeline();
  } else {
    cleanupComplaintTimeline();
  }
  
  if (s.art === "compare") {
    runCompareTimeline();
  } else {
    if (typeof cleanupCompareTimeline === "function") cleanupCompareTimeline();
  }
  
  if (s.art === "father_anger") {
    runFatherAngerTimeline();
    if (typeof setupFatherAngerInteractions === "function") {
      setupFatherAngerInteractions();
    }
  } else {
    cleanupFatherAngerTimeline();
  }
  
  if (s.art === "farewell") {
    runFarewellTimeline();
  } else {
    if (typeof cleanupFarewellTimeline === "function") {
      cleanupFarewellTimeline();
    }
  }
  
  if (s.art === "strict_school") {
    if (typeof runStrictSchoolTimeline === "function") {
      runStrictSchoolTimeline();
      setupStrictSchoolInteractions();
    }
  } else {
    if (typeof cleanupStrictSchoolTimeline === "function") {
      cleanupStrictSchoolTimeline();
    }
  }

  if (s.art === "rajan") {
    if (typeof runRajanTimeline === "function") runRajanTimeline();
  } else {
    if (typeof cleanupRajanTimeline === "function") cleanupRajanTimeline();
  }
  
  // Bind interactive mouse parallax effect for Scene 1
  if (s.art === "wonder" && sceneEl) {
    sceneEl.addEventListener('mousemove', e => {
      const rect = sceneEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const layers = sceneEl.querySelectorAll('.parallax-layer');
      layers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
        const dx = x * depth * rect.width * 0.22;
        const dy = y * depth * rect.height * 0.22;
        layer.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    });
    
    sceneEl.addEventListener('mouseleave', () => {
      const layers = sceneEl.querySelectorAll('.parallax-layer');
      layers.forEach(layer => {
        layer.style.transform = '';
      });
    });
  }

  if (s.art === "streets" && sceneEl) {
    // Parallax effect for Scene 2
    sceneEl.addEventListener('mousemove', e => {
      const rect = sceneEl.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const layers = sceneEl.querySelectorAll('.parallax-layer');
      layers.forEach(layer => {
        if (layer.id === 'hero' && (layer.classList.contains('pose-kneel') || layer.classList.contains('pose-point-r') || layer.classList.contains('pose-excited'))) return;
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
        const dx = x * depth * rect.width * 0.25;
        const dy = y * depth * rect.height * 0.25;
        layer.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    });
    
    sceneEl.addEventListener('mouseleave', () => {
      const layers = sceneEl.querySelectorAll('.parallax-layer');
      layers.forEach(layer => {
        if (layer.id === 'hero') return;
        layer.style.transform = '';
      });
    });

    // Click on Puddle
    const puddle = document.getElementById('street-puddle');
    const hero = document.getElementById('hero');
    if (puddle) {
      puddle.onclick = (e) => {
        puddle.classList.remove('ripple-active');
        void puddle.offsetWidth;
        puddle.classList.add('ripple-active');
        setTimeout(() => puddle.classList.remove('ripple-active'), 3200);
        
        if (hero) {
          hero.classList.remove("pose-walk", "pose-point-down", "pose-kneel", "pose-point-r", "pose-excited");
          hero.classList.add("pose-kneel");
          
          const refl = document.getElementById('hero-reflection');
          if (refl) {
            refl.style.transform = 'scaleY(-0.7) scaleX(0.92) translate(80px, -60px) skewX(-2deg)';
          }
          
          if (typeof playNote === 'function') {
            playNote(65, 0.1, 0.4);
            playNote(72, 0.2, 0.3);
          }
        }
        e.stopPropagation();
      };
    }
    
    // Click on Dog
    const dog = document.getElementById('street-dog');
    const barkBubble = document.getElementById('dog-bark-bubble');
    if (dog) {
      dog.onclick = (e) => {
        dog.classList.remove('dog-barking');
        void dog.offsetWidth;
        dog.classList.add('dog-barking');
        if (barkBubble) barkBubble.classList.add('show');
        
        if (hero) {
          hero.classList.remove("pose-walk", "pose-point-down", "pose-kneel", "pose-point-r", "pose-excited");
          hero.classList.add("pose-point-r");
        }
        
        if (typeof playNote === 'function') {
          playNote(48, 0.05, 0.6);
          setTimeout(() => playNote(48, 0.05, 0.6), 150);
        }
        
        setTimeout(() => {
          dog.classList.remove('dog-barking');
          if (barkBubble) barkBubble.classList.remove('show');
        }, 1500);
        
        e.stopPropagation();
      };
    }
    
    // Click on Butterflies
    const bf1 = document.getElementById('street-bf-1');
    const bf2 = document.getElementById('street-bf-2');
    const handleBfClick = (bfEl, color) => {
      return (e) => {
        const rect = sceneEl.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        const splat = document.createElement('div');
        splat.className = 'paint-splat';
        splat.style.left = (clickX - 16) + 'px';
        splat.style.top = (clickY - 16) + 'px';
        splat.style.background = color;
        sceneEl.appendChild(splat);
        setTimeout(() => splat.remove(), 800);
        
        if (hero) {
          hero.classList.remove("pose-walk", "pose-point-down", "pose-kneel", "pose-point-r", "pose-excited");
          hero.classList.add("pose-excited");
          setTimeout(() => hero.classList.remove("pose-excited"), 2000);
        }
        
        if (typeof playNote === 'function') {
          playNote(76, 0.1, 0.5);
          playNote(81, 0.2, 0.4);
        }
        
        e.stopPropagation();
      };
    };
    if (bf1) bf1.onclick = handleBfClick(bf1, 'var(--vermilion)');
    if (bf2) bf2.onclick = handleBfClick(bf2, 'var(--teal)');
  }

  if (s.art === "complaint" && sceneEl) {
    const letter = document.getElementById('complaint-letter');
    const teach = document.getElementById('teach');
    const fatherBox = document.getElementById('bro');
    const ishaanBox = document.getElementById('hero');
    const wordsContainer = document.getElementById('complaintWords');
    
    if (letter) {
      letter.onclick = (e) => {
        letter.classList.remove('letter-shake');
        void letter.offsetWidth;
        letter.classList.add('letter-shake');
        
        const terms = ["INCAPAZ", "FORA DO PADRÃO", "REJEITADO", "SEM VAGAS"];
        const term = terms[Math.floor(Math.random() * terms.length)];
        const floatWord = document.createElement("span");
        floatWord.className = "floaty-word red-term";
        floatWord.textContent = term;
        floatWord.style.left = `${30 + Math.random() * 20}%`;
        floatWord.style.top = `30%`;
        if (wordsContainer) wordsContainer.appendChild(floatWord);
        setTimeout(() => floatWord.remove(), 2000);
        
        if (ishaanBox) {
          ishaanBox.classList.remove("ishaan-shiver-cry", "ishaan-cover-ears");
          void ishaanBox.offsetWidth;
          ishaanBox.classList.add("ishaan-shiver-cry", "ishaan-cover-ears");
          setTimeout(() => ishaanBox.classList.remove("ishaan-shiver-cry", "ishaan-cover-ears"), 2000);
        }
        
        if (typeof playNote === 'function') {
          playNote(48, 0.1, 0.4);
          playNote(54, 0.15, 0.4);
        }
        e.stopPropagation();
      };
    }
    
    if (teach) {
      teach.onclick = (e) => {
        teach.classList.remove("principal-point-accuse", "talking");
        void teach.offsetWidth;
        teach.classList.add("principal-point-accuse", "talking");
        
        const bubble = ensureBubble();
        bubble.innerHTML = `
          <div class="bubble-header" style="background: ${BUBCOLOR.principal || 'var(--marigold)'};">Diretor</div>
          <div class="bubble-content">Ele não pode continuar aqui.</div>
        `;
        bubble.style.left = "40%";
        bubble.style.top = "15%";
        bubble.classList.add("show");
        
        if (typeof playNote === 'function') {
          playNote(45, 0.2, 0.5);
        }
        
        setTimeout(() => {
          teach.classList.remove("principal-point-accuse", "talking");
          hideBubble();
        }, 2200);
        e.stopPropagation();
      };
    }
    
    if (fatherBox) {
      fatherBox.onclick = (e) => {
        fatherBox.classList.remove("father-plead-speak", "talking");
        void fatherBox.offsetWidth;
        fatherBox.classList.add("father-plead-speak", "talking");
        
        const bubble = ensureBubble();
        bubble.innerHTML = `
          <div class="bubble-header" style="background: ${BUBCOLOR.father || '#c0566f'};">Pai</div>
          <div class="bubble-content">Para onde vamos levar o menino?</div>
        `;
        bubble.style.left = "60%";
        bubble.style.top = "18%";
        bubble.classList.add("show");
        
        if (typeof playNote === 'function') {
          playNote(50, 0.2, 0.4);
        }
        
        setTimeout(() => {
          fatherBox.classList.remove("father-plead-speak", "talking");
          hideBubble();
        }, 2200);
        e.stopPropagation();
      };
    }
    
    if (ishaanBox) {
      ishaanBox.onclick = (e) => {
        ishaanBox.classList.remove("ishaan-shiver-cry", "ishaan-cover-ears", "talking");
        void ishaanBox.offsetWidth;
        ishaanBox.classList.add("ishaan-shiver-cry", "ishaan-cover-ears", "talking");
        
        const bubble = ensureBubble();
        bubble.innerHTML = `
          <div class="bubble-header" style="background: ${BUBCOLOR.ishaan || 'var(--teal)'};">Ishaan</div>
          <div class="bubble-content">(Eu só quero ir para casa...)</div>
        `;
        bubble.style.left = "22%";
        bubble.style.top = "35%";
        bubble.classList.add("show");
        
        const tears = document.getElementById("ishaan-tears");
        if (tears) {
          tears.innerHTML = "";
          for (let n = 0; n < 5; n++) {
            const tearDrop = document.createElement("span");
            tearDrop.className = "tear-drop";
            tearDrop.style.left = `${38 + Math.random() * 24}%`;
            tearDrop.style.animationDelay = `${n * 0.3}s`;
            tears.appendChild(tearDrop);
          }
        }
        
        if (typeof playNote === 'function') {
          playNote(72, 0.15, 0.3);
          playNote(75, 0.2, 0.3);
        }
        
        setTimeout(() => {
          ishaanBox.classList.remove("ishaan-shiver-cry", "ishaan-cover-ears", "talking");
          hideBubble();
        }, 2500);
        e.stopPropagation();
      };
    }
  }

  if (s.art === "gate" || s.art === "depression" || s.art === "farewell") makeRain();
  if (s.art === "teacher" || s.art === "bum_bum_bole") {
    const b = document.getElementById("burstFx");
    if (b) requestAnimationFrame(() => b.classList.add("go"));
  }
  if (s.art === "easel" || s.art === "paintings_reveal" || s.art === "final_hug") {
    setTimeout(() => confetti(130), 1300);
    setTimeout(() => confetti(100), 3000);
  }
  if (s.type === "intro" || s.type === "close") shootStar();
  setMood(s.mus);

  if (voiceOn) {
    speakScene(i);
  } else {
    playVisualDialogues(i);
  }
}

/* ===== NAVIGATION CONTROLS ===== */

function schedule() {
  clearTimeout(timer);
  if (playing && !voiceOn) {
    timer = setTimeout(() => {
      if (idx < scenes.length - 1) nav(1);
      else stopMovie();
    }, scenes[idx].dur || 7000);
  }
}

function nav(d) {
  const t = scenes[Math.min(Math.max(idx + d, 0), scenes.length - 1)]?.tint;
  doWipe(t);
  idx += d;
  if (idx < 0) idx = 0;
  if (idx >= scenes.length) idx = 0;
  render(idx);
  schedule();
}

function stopMovie() {
  playing = false;
  clearTimeout(timer);
  movie.innerHTML = `<span class="material-symbols-rounded">play_arrow</span><span class="btn-text">Modo filme</span>`;
  movie.classList.add("play");
}

function startMovie() {
  playing = true;
  if (idx >= scenes.length - 1) idx = 0;
  movie.innerHTML = `<span class="material-symbols-rounded">pause</span><span class="btn-text">Pausar</span>`;
  movie.classList.remove("play");
  render(idx);
  schedule();
}

/* ===== EVENT ATTACHMENTS ===== */

next.onclick = () => nav(1);
prev.onclick = () => nav(-1);
movie.onclick = () => playing ? stopMovie() : startMovie();
music.onclick = toggleMusic;
voice.onclick = toggleVoice;

notes.onclick = () => {
  notesOn = !notesOn;
  notes.innerHTML = notesOn 
    ? `<span class="material-symbols-rounded">visibility_off</span><span class="btn-text">Ocultar</span>` 
    : `<span class="material-symbols-rounded">menu_book</span><span class="btn-text">Narração</span>`;
  document.querySelector(".narration")?.classList.toggle("show", notesOn);
};

document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    nav(1);
  }
  if (e.key === "ArrowLeft") nav(-1);
});

/* Ambient background stars element generator */
const sf = document.getElementById("stars");
for (let n = 0; n < 70; n++) {
  const s = document.createElement("i");
  s.style.left = Math.random() * 100 + "%";
  s.style.top = Math.random() * 100 + "%";
  s.style.animationDelay = (Math.random() * 3.6) + "s";
  const z = 1 + Math.random() * 2.6;
  s.style.width = s.style.height = z + "px";
  s.style.opacity = (.3 + Math.random() * .5);
  sf.appendChild(s);
}

/* Ambient color blobs generator */
const bl = document.getElementById("blobs");
const bc = ["#F4B63E", "#E2533B", "#27A39B", "#9B8BD6"];
for (let n = 0; n < 5; n++) {
  const b = document.createElement("i");
  const sz = 120 + Math.random() * 160;
  b.style.width = b.style.height = sz + "px";
  b.style.left = Math.random() * 90 + "%";
  b.style.top = Math.random() * 80 + "%";
  b.style.background = bc[n % bc.length];
  b.style.animationDelay = (Math.random() * 8) + "s";
  bl.appendChild(b);
}

/* Run initial state */
render(0);
setTimeout(shootStar, 800);

/* ===== TTS VOICE NARRATION (SpeechSynthesis) ===== */

let voiceOn = false;
let ptVoice = null;
let voiceA = null;
let voiceB = null;
let currentUtter = null;
let currentAudio = null;
let allVoices = [];
let speakSession = 0;

const VOICEMAP = {
  narrator: { pitch: 1.0, rate: 1.06, v: 0 },
  ishaan: { pitch: 1.5, rate: 1.18, v: 0 },
  nikumbh: { pitch: .82, rate: 1.0, v: 1 },
  brother: { pitch: 1.25, rate: 1.22, v: 0 },
  strict: { pitch: .78, rate: 1.2, v: 1 },
  turma: { pitch: 1.35, rate: 1.22, v: 0 },
  father: { pitch: .72, rate: 1.1, v: 1 },
  principal: { pitch: .74, rate: 0.95, v: 1 },
  rajan: { pitch: 1.4, rate: 1.1, v: 0 },
  mateB: { pitch: 1.35, rate: 1.05, v: 0 }
};

const BUBCOLOR = { 
  ishaan: "var(--teal)", 
  nikumbh: "var(--marigold)", 
  brother: "#5a86c4", 
  strict: "#c0566f", 
  turma: "var(--lilac)",
  father: "#c0566f",
  principal: "#9B8BD6",
  rajan: "#27A39B",
  mateB: "var(--pink)"
};

const BUBEL = { 
  ishaan: "hero", 
  nikumbh: "teach", 
  brother: "bro", 
  strict: "bro", 
  turma: "mate",
  father: "bro",
  principal: "teach",
  rajan: "mate",
  mateB: "mate"
};

function scoreVoice(v) {
  let s = 0;
  const n = (v.name || '').toLowerCase(), l = (v.lang || '').toLowerCase();
  if (/pt[-_]?br/.test(l)) s += 100;
  else if (/^pt/.test(l)) s += 55;
  if (/natural|neural|online|enhanced|premium/.test(n)) s += 45;
  if (/google/.test(n)) s += 30;
  if (/luciana|francisca|maria|thalita|camila|vit[oó]ria|hortense|fernanda/.test(n)) s += 12;
  if (/compact|eloquence|robot|cellos|zarvox|grandma/.test(n)) s -= 40;
  return s;
}

function pickVoice() {
  if (!allVoices.length) return;
  let best = null, bs = -1e9;
  allVoices.forEach(v => {
    const sc = scoreVoice(v);
    if (sc > bs) {
      bs = sc;
      best = v;
    }
  });
  if (best) ptVoice = best;
}

function setAB() {
  voiceA = ptVoice;
  voiceB = allVoices.filter(v => /^pt/i.test(v.lang) && v.name !== (ptVoice && ptVoice.name)).sort((a, b) => scoreVoice(b) - scoreVoice(a))[0] || ptVoice;
}

function buildVoiceMenu() {
  const el = document.getElementById('voicePick');
  if (!el) return;
  let list = allVoices.filter(v => /^pt/i.test(v.lang));
  if (!list.length) list = allVoices.slice();
  list.sort((a, b) => scoreVoice(b) - scoreVoice(a));
  el.innerHTML = list.map(v => `<option value="${v.name}">${v.name.replace(/Microsoft|Google/g, '').trim()}${/pt[-_]?br/i.test(v.lang) ? ' (BR)' : ''}</option>`).join('') || '<option>voz padrão</option>';
  if (ptVoice) el.value = ptVoice.name;
  el.onchange = () => {
    ptVoice = allVoices.find(v => v.name === el.value) || ptVoice;
    setAB();
    if (voiceOn) speakScene(idx);
  };
}

function loadVoices() {
  try {
    allVoices = speechSynthesis.getVoices() || [];
  } catch (e) {
    allVoices = [];
  }
  if (allVoices.length) {
    if (!ptVoice) pickVoice();
    setAB();
    buildVoiceMenu();
  }
}

if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}

function ensureBubble() {
  let b = document.getElementById('bubble');
  if (!b) {
    b = document.createElement('div');
    b.id = 'bubble';
    b.className = 'bubble';
  }
  const sc = document.querySelector('.scene');
  if (sc) {
    if (b.parentElement !== sc) sc.appendChild(b);
  } else {
    if (b.parentElement !== document.body) document.body.appendChild(b);
  }
  return b;
}

const SPEAKERNAMES = {
  ishaan: "Ishaan",
  nikumbh: "Prof. Nikumbh",
  strict: "Professor",
  father: "Pai",
  brother: "Irmão (Yohan)",
  principal: "Diretor",
  rajan: "Rajan",
  turma: "Colegas",
  mateB: "Mãe"
};

function ensureNarratorCard() {
  let c = document.getElementById('narrator-card');
  if (!c) {
    c = document.createElement('div');
    c.id = 'narrator-card';
    c.className = 'narrator-card';
  }
  const sc = document.querySelector('.scene');
  if (sc) {
    if (c.parentElement !== sc) sc.appendChild(c);
  } else {
    if (c.parentElement !== document.body) document.body.appendChild(c);
  }
  return c;
}

function showBubble(line) {
  if (line[0] === 'narrator') {
    const b = document.getElementById('bubble');
    if (b) b.classList.remove('show');
    
    const c = ensureNarratorCard();
    c.textContent = line[1];
    c.classList.remove('show');
    void c.offsetWidth;
    c.classList.add('show');
    return;
  }
  
  const c = document.getElementById('narrator-card');
  if (c) c.classList.remove('show');
  
  const b = ensureBubble();
  const speakerKey = line[0];
  const speakerName = SPEAKERNAMES[speakerKey] || speakerKey.toUpperCase();
  
  b.innerHTML = `
    <div class="bubble-header" style="background: ${BUBCOLOR[speakerKey] || 'var(--marigold)'};">
      ${speakerName}
    </div>
    <div class="bubble-content">${line[1]}</div>
  `;
  
  b.style.setProperty('--bubble-border', BUBCOLOR[speakerKey] || 'var(--paper)');
  
  let el = document.querySelector(`.scene .char-${speakerKey}`);
  if (!el) {
    el = document.getElementById(BUBEL[speakerKey] || '');
  }
  const sc = document.querySelector('.scene');
  
  let left = '50%', top = '30%';
  let tailOffset = '50%';
  if (el && sc) {
    const rEl = el.getBoundingClientRect();
    const rSc = sc.getBoundingClientRect();
    
    const x = rEl.left + rEl.width / 2 - rSc.left;
    const y = rEl.top - rSc.top;
    
    const bubbleX = Math.min(Math.max(x, 80), rSc.width - 80);
    left = bubbleX + 'px';
    top = (y - 12) + 'px';
    
    const diff = x - bubbleX;
    tailOffset = `calc(50% + ${diff}px)`;
  }
  
  b.style.position = 'absolute';
  b.style.left = left;
  b.style.top = top;
  b.style.transform = '';
  b.style.display = '';
  b.style.setProperty('--tail-offset', tailOffset);
  
  b.classList.remove('show');
  void b.offsetWidth;
  b.classList.add('show');
}

function hideBubble() {
  const b = document.getElementById('bubble');
  if (b) b.classList.remove('show');
  const c = document.getElementById('narrator-card');
  if (c) c.classList.remove('show');
}

function buildQueue(i) {
  const s = scenes[i];
  const L = (typeof LINES !== 'undefined') && LINES[s.art];
  if (L && L.length) return L;
  return [["narrator", s.narration.replace(/<[^>]+>/g, '').replace(/[“”]/g, '"')]];
}

function speakLine(line, sceneKey, lineIdx, done) {
  const speaker = line[0];
  const text = line[1];
  
  showBubble(line);
  
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch(e) {}
    currentAudio = null;
  }
  
  // Caminho do arquivo estático de áudio
  const audioUrl = `audio/voices/${sceneKey}_${lineIdx}_${speaker}.mp3`;
  const audio = new Audio(audioUrl);
  currentAudio = audio;
  
  let fallbackTimeout = setTimeout(() => {
    console.warn(`Arquivo de áudio estático não pôde ser carregado rapidamente: ${audioUrl}. Usando síntese de voz (TTS).`);
    playFallbackSpeech(line, done);
  }, 1200); // 1.2 segundos de limite para carregar o arquivo estático antes do fallback
  
  audio.oncanplaythrough = () => {
    clearTimeout(fallbackTimeout);
    
    // Calcula a duração do áudio em milissegundos
    const durationMs = (audio.duration || 3) * 1000;
    
    if (speaker !== 'narrator') {
      if (typeof animateSpeaker === 'function') {
        animateSpeaker(speaker, text, durationMs);
      }
    } else {
      if (typeof clearSpeakerAnimations === 'function') {
        clearSpeakerAnimations();
      }
    }
  };
  
  audio.onended = () => {
    hideBubble();
    if (typeof clearSpeakerAnimations === 'function') {
      clearSpeakerAnimations();
    }
    currentAudio = null;
    done && done();
  };
  
  audio.onerror = () => {
    clearTimeout(fallbackTimeout);
    console.warn(`Erro ao reproduzir áudio estático: ${audioUrl}. Usando síntese de voz (TTS).`);
    playFallbackSpeech(line, done);
  };
  
  audio.play().catch(err => {
    clearTimeout(fallbackTimeout);
    console.warn(`Interação necessária ou erro ao tocar áudio: ${audioUrl}. Usando síntese de voz (TTS).`, err);
    playFallbackSpeech(line, done);
  });
}

function playFallbackSpeech(line, done) {
  if (!('speechSynthesis' in window)) {
    console.error("SpeechSynthesis não suportada neste navegador.");
    done && done();
    return;
  }
  
  const speaker = line[0];
  const text = line[1];
  const m = VOICEMAP[speaker] || VOICEMAP.narrator;
  const u = new SpeechSynthesisUtterance(text);
  const vv = (m.v === 1 ? voiceB : voiceA) || ptVoice;
  
  if (vv) {
    u.voice = vv;
    u.lang = vv.lang || 'pt-BR';
  } else {
    u.lang = 'pt-BR';
  }
  u.pitch = m.pitch;
  u.rate = m.rate;
  
  if (speaker !== 'narrator') {
    const approxDuration = Math.max(2500, text.split(' ').length * 360 + 1000);
    if (typeof animateSpeaker === 'function') {
      animateSpeaker(speaker, text, approxDuration);
    }
  } else {
    if (typeof clearSpeakerAnimations === 'function') {
      clearSpeakerAnimations();
    }
  }
  
  u.onend = () => {
    hideBubble();
    if (typeof clearSpeakerAnimations === 'function') {
      clearSpeakerAnimations();
    }
    currentUtter = null;
    done && done();
  };
  
  currentUtter = u;
  speechSynthesis.speak(u);
}

function speakScene(i) {
  if (!voiceOn) return;
  
  // Para qualquer síntese em andamento
  try {
    speechSynthesis.cancel();
  } catch (e) {}
  
  // Para qualquer áudio estático em andamento
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch(e) {}
    currentAudio = null;
  }
  
  hideBubble();
  const session = ++speakSession;
  const s = scenes[i];
  const sceneKey = s.art || s.type; // Identificador da cena (ex: wonder, intro)
  const q = buildQueue(i);
  let qi = 0;
  
  (function step() {
    if (session !== speakSession) return;
    if (qi >= q.length) {
      if (playing && voiceOn) {
        if (idx < scenes.length - 1) nav(1);
        else stopMovie();
      }
      return;
    }
    
    const currentLineIdx = qi;
    speakLine(q[qi], sceneKey, currentLineIdx, () => {
      qi++;
      step();
    });
  })();
}

function setDuck() {
  if (actx && musOn) {
    master.gain.linearRampToValueAtTime(voiceOn ? .22 : .5, actx.currentTime + .4);
  }
}

function toggleVoice() {
  voiceOn = !voiceOn;
  if (voiceOn) {
    voice.classList.add("on");
    voice.innerHTML = `<span class="material-symbols-rounded">mic</span><span class="btn-text">Voz</span>`;
    clearTimeout(timer);
    if (typeof clearVisualDialogues === 'function') {
      clearVisualDialogues();
    }
    setDuck();
    speakScene(idx);
  } else {
    voice.classList.remove("on");
    voice.innerHTML = `<span class="material-symbols-rounded">mic_off</span><span class="btn-text">Voz</span>`;
    speakSession++;
    
    // Para qualquer síntese em andamento
    try {
      speechSynthesis.cancel();
    } catch (e) {}
    
    // Para qualquer áudio estático em andamento
    if (currentAudio) {
      try {
        currentAudio.pause();
      } catch(e) {}
      currentAudio = null;
    }
    
    hideBubble();
    if (typeof clearSpeakerAnimations === 'function') {
      clearSpeakerAnimations();
    }
    setDuck();
    if (typeof playVisualDialogues === 'function') {
      playVisualDialogues(idx);
    }
    if (playing) schedule();
  }
}

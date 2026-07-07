/* ===== TIMED CHOREOGRAPHY DEFINITIONS ===== */

const CHOREO = {
  wonder: { 
    b: ishaan, 
    sc: 1, 
    steps: [
      [0, "happy", false, "pose-look-up"],
      [1200, "happy", false, "pose-point-l"],
      [2600, "happy", false, "pose-point-r"],
      [3800, "excited", true, "pose-excited"],
      [5800, "happy", false, "pose-wonder"]
    ] 
  },
  streets: { 
    b: ishaan, 
    sc: 1, 
    steps: [
      [0, "happy", false, "pose-walk"],
      [2500, "surprised", false, "pose-point-down"],
      [4500, "excited", false, "pose-kneel"],
      [7500, "happy", false, "pose-point-r"],
      [9500, "excited", true, "pose-excited"]
    ] 
  },
  classroom: { b: ishaan, sc: 1, steps: [[1100, "surprised", true], [2900, "sad"]] },
  complaint: { b: ishaan, sc: .85, steps: [[1200, "sad"]] },
  compare: { b: ishaan, sc: .82, steps: [[1500, "sad"]] },
  farewell: { b: ishaan, sc: .82, steps: [[1500, "cry", true]] },
  gate: { b: ishaan, sc: .84, gray: true, steps: [[1800, "cry"]] },
  strict_school: { b: ishaan, sc: .82, steps: [[1100, "surprised", true], [2500, "cry"]] },
  rajan: { b: ishaan, sc: .85, steps: [] },
  depression: { b: ishaan, sc: .8, gray: true, steps: [[1800, "sad"]] },
  teacher: { b: ishaan, sc: .82, steps: [[1700, "surprised", true], [3300, "happy"]] },
  bum_bum_bole: { b: ishaan, sc: .8, steps: [[1800, "sad"]] },
  empty_notebook: { b: ishaan, sc: .8, steps: [[1800, "sad"]] },
  parents_house: { b: ishaan, sc: .8, steps: [[1800, "sad"]] },
  father_meeting: { b: ishaan, sc: .8, steps: [[1800, "sad"]] },
  principal_office: { b: ishaan, sc: .8, steps: [[1800, "happy"]] },
  tutoring: { b: ishaan, sc: .9, steps: [[2200, "happy", true]] },
  sand_writing: { b: ishaan, sc: .9, steps: [[1500, "happy", true]] },
  cards: { b: ishaan, sc: .8, steps: [[1400, "excited", true]] },
  easel: { b: ishaan, sc: .95, steps: [[1900, "excited", true]] },
  paintings_reveal: { b: ishaan, sc: .95, steps: [[1500, "excited", true]] },
  final_hug: { b: ishaan, sc: 1.0, steps: [[1500, "excited", true]] }
};

/* ===== CINEMATIC CAMERA MAP ===== */
const CAMERAMAP = {
  wonder: "cam-zoom",
  streets: "cam-pan-l",
  classroom: "cam-zoom",
  complaint: "cam-complaint",
  compare: "cam-zoom",
  father_anger: "cam-zoom-shake",
  farewell: "cam-zoom",
  gate: "cam-zoom",
  strict_school: "cam-zoom-shake",
  rajan: "cam-zoom-cinematic",
  depression: "cam-zoom",
  teacher: "cam-zoom",
  bum_bum_bole: "cam-zoom",
  empty_notebook: "cam-zoom",
  parents_house: "cam-zoom",
  father_meeting: "cam-zoom",
  principal_office: "cam-zoom",
  tutoring: "cam-zoom",
  sand_writing: "cam-zoom",
  cards: "cam-pan-r",
  easel: "cam-zoom",
  paintings_reveal: "cam-zoom",
  final_hug: "cam-zoom"
};

/* ===== GESTURES & DIALOGUE SEQUENCER ===== */
let dialogTimer = null;
let gestureTimers = [];
let actTimers = [];

function getSpeakerGesture(speakerId, text) {
  const t = (text || '').toLowerCase();
  if (speakerId === 'ishaan') {
    if (t.includes('estrelas') || t.includes('espelho') || t.includes('cores') || t.includes('consegui') || t.includes('li') || t.includes('praia')) {
      return 'gesture-wave';
    }
    if (t.includes('dançando') || t.includes('juro') || t.includes('deixa') || t.includes('voltar') || t.includes('peso') || t.includes('fogem')) {
      return 'gesture-scared';
    }
    if (idx === 23) {
      return 'gesture-hug';
    }
    return 'gesture-explain';
  }
  if (speakerId === 'strict' || speakerId === 'father') {
    if (t.includes('leia') || t.includes('presta') || t.includes('procurem') || t.includes('brincadeira') || t.includes('vergonha') || t.includes('fique') || t.includes('zero') || t.includes('como') || t.includes('burro')) {
      if (typeof idx !== 'undefined' && idx === 5) {
        return 'gesture-rage-point';
      }
      return 'gesture-point';
    }
    return 'gesture-explain';
  }
  if (speakerId === 'nikumbh') {
    if (t.includes('bum') || t.includes('cantar') || t.includes('pintar') || t.includes('voe') || t.includes('alto') || t.includes('salvou')) {
      return 'gesture-raise';
    }
    if (idx === 23) {
      return 'gesture-hug';
    }
    return 'gesture-explain';
  }
  if (speakerId === 'rajan') {
    return 'gesture-wave';
  }
  return 'gesture-explain';
}

function animateSpeaker(speakerId, text, duration) {
  clearSpeakerAnimations();
  const charSvg = document.querySelector(`.scene .char-${speakerId}`);
  let el = charSvg ? charSvg.parentElement : null;
  if (!el) {
    const targetId = BUBEL[speakerId];
    el = targetId ? document.getElementById(targetId) : null;
  }
  if (!el) return;

  const gestureClass = getSpeakerGesture(speakerId, text);
  el.classList.add("talking");
  if (gestureClass) el.classList.add(gestureClass);

  const t = setTimeout(() => {
    el.classList.remove("talking", "gesture-wave", "gesture-explain", "gesture-raise", "gesture-point", "gesture-rage-point", "gesture-scared", "gesture-hug");
  }, duration - 150);
  gestureTimers.push(t);
}

function clearSpeakerAnimations() {
  gestureTimers.forEach(clearTimeout);
  gestureTimers = [];
  const ids = ["hero", "teach", "bro", "mate"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("talking", "gesture-wave", "gesture-explain", "gesture-raise", "gesture-point", "gesture-rage-point", "gesture-scared", "gesture-hug");
    }
  });
}

function playVisualDialogues(i) {
  clearVisualDialogues();
  if (voiceOn) return;

  const s = scenes[i];
  if (!s || !s.art) return;
  const q = LINES[s.art];
  if (!q || !q.length) return;

  let qi = 0;
  const totalDur = s.dur || 7000;
  const timePerLine = Math.max(2200, totalDur / q.length);

  function step() {
    if (qi >= q.length) {
      hideBubble();
      clearSpeakerAnimations();
      return;
    }
    const line = q[qi++];
    showBubble(line);
    if (line[0] !== 'narrator') {
      animateSpeaker(line[0], line[1], timePerLine);
    } else {
      clearSpeakerAnimations();
    }
    dialogTimer = setTimeout(step, timePerLine);
  }
  step();
}

function clearVisualDialogues() {
  clearTimeout(dialogTimer);
  dialogTimer = null;
}

function runChoreo(art) {
  actTimers.forEach(clearTimeout);
  actTimers = [];
  const c = CHOREO[art];
  if (!c) return;
  c.steps.forEach(([ms, expr, pop, poseClass]) => {
    actTimers.push(setTimeout(() => {
      const el = document.getElementById("hero");
      if (!el) return;
      el.innerHTML = c.b(expr, c.sc);
      
      // Reset and apply choreography pose classes
      el.classList.remove("pose-look-up", "pose-point-l", "pose-point-r", "pose-excited", "pose-wonder", "pose-walk", "pose-point-down", "pose-kneel");
      if (poseClass) {
        el.classList.add(poseClass);
      }
      
      if (c.gray) el.style.filter = "grayscale(.55)";
      if (pop) {
        el.classList.remove("shakeit");
        void el.offsetWidth;
        el.classList.add("shakeit");
      }
      if ((art === "easel" || art === "paintings_reveal" || art === "final_hug") && expr === "excited") {
        el.classList.add("act-hop");
      }
      
      // Trigger special cinematic effects for Scene 1 (wonder)
      if (art === "wonder" && expr === "excited") {
        if (typeof shootStar === "function") shootStar();
        const sceneEl = stage.querySelector('.scene');
        if (sceneEl && typeof sparkleStars === "function") {
          sparkleStars(sceneEl, 12);
        }
      }

      // Trigger custom position animations for Scene 2 (streets)
      if (art === "streets") {
        if (ms === 0) {
          el.style.transition = 'none';
          el.style.left = '-15%';
          el.style.bottom = '6%';
          const refl = document.getElementById('hero-reflection');
          if (refl) refl.style.transform = 'scaleY(-0.7) scaleX(0.85) translate(80px, -70px)';
          void el.offsetWidth;
          el.style.transition = 'left 2.5s linear, bottom 1.2s ease-out';
          el.style.left = '38%';
        } else if (ms === 2500) {
          el.style.left = '38%';
        } else if (ms === 4500) {
          const refl = document.getElementById('hero-reflection');
          if (refl) {
            refl.style.transform = 'scaleY(-0.7) scaleX(0.92) translate(80px, -60px) skewX(-2deg)';
          }
        } else if (ms === 7500) {
          el.style.transition = 'left 1.5s ease-out, bottom 1.2s ease-out';
          el.style.left = '46%';
        }
      }
    }, ms));
  });
}

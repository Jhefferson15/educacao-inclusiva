/* ===== PROCEDURAL MUSIC SYNTHESIZER ===== */

let actx = null;
let master = null;
let padA = null;
let padB = null;
let padG = null;
let arpTimer = null;
let musOn = false;
let curChord = [60, 64, 67, 72];
let arpDelay = 560;
let arpStep = 0;

const midiF = m => 440 * Math.pow(2, (m - 69) / 12);

function startAudio() {
  actx = new (window.AudioContext || window.webkitAudioContext)();
  master = actx.createGain();
  master.gain.value = 0;
  master.connect(actx.destination);
  padG = actx.createGain();
  padG.gain.value = .05;
  padG.connect(master);
  padA = actx.createOscillator();
  padB = actx.createOscillator();
  padA.type = "sine";
  padB.type = "sine";
  padB.detune.value = 7;
  padA.connect(padG);
  padB.connect(padG);
  padA.start();
  padB.start();
  setMood(scenes[idx].mus, true);
}

function setMood(m, instant) {
  if (!actx || !m) return;
  curChord = m.chord;
  arpDelay = m.tempo;
  const t = actx.currentTime + (instant ? 0 : .05), tt = instant ? 0 : .9;
  padA.frequency.linearRampToValueAtTime(midiF(m.chord[0] - 12), t + tt);
  padB.frequency.linearRampToValueAtTime(midiF(m.chord[1] - 12), t + tt);
}

function pluck(f) {
  const o = actx.createOscillator(), gg = actx.createGain(), t = actx.currentTime;
  o.type = "triangle";
  o.frequency.value = f;
  gg.gain.setValueAtTime(0, t);
  gg.gain.linearRampToValueAtTime(.12, t + .03);
  gg.gain.exponentialRampToValueAtTime(.001, t + .95);
  o.connect(gg);
  gg.connect(master);
  o.start(t);
  o.stop(t + 1);
}

function playNote(midi, gain = 0.12, duration = 0.95) {
  if (!actx || !musOn) return;
  const f = midiF(midi);
  const o = actx.createOscillator(), gg = actx.createGain(), t = actx.currentTime;
  o.type = "triangle";
  o.frequency.value = f;
  gg.gain.setValueAtTime(0, t);
  gg.gain.linearRampToValueAtTime(gain, t + .03);
  gg.gain.exponentialRampToValueAtTime(.001, t + duration);
  o.connect(gg);
  gg.connect(master);
  o.start(t);
  o.stop(t + duration);
}

function arp() {
  clearTimeout(arpTimer);
  if (!musOn) return;
  const idx2 = arpStep % (curChord.length * 2);
  const base = curChord[idx2 % curChord.length] + (idx2 >= curChord.length ? 12 : 0);
  pluck(midiF(base));
  arpStep++;
  arpTimer = setTimeout(arp, arpDelay);
}

function toggleMusic() {
  if (!actx) {
    startAudio();
  }
  musOn = !musOn;
  if (musOn) {
    music.classList.add("on");
    music.innerHTML = `<span class="material-symbols-rounded">volume_up</span><span class="btn-text">Música</span>`;
    master.gain.cancelScheduledValues(actx.currentTime);
    master.gain.linearRampToValueAtTime(.5, actx.currentTime + .6);
    arp();
  } else {
    music.classList.remove("on");
    music.innerHTML = `<span class="material-symbols-rounded">volume_off</span><span class="btn-text">Música</span>`;
    master.gain.linearRampToValueAtTime(0, actx.currentTime + .4);
    clearTimeout(arpTimer);
  }
}

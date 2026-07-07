/* ===== SCENE 3 CLASSROOM TIMELINE & INTERACTIVE LETRAS ===== */

let classroomTimeouts = [];
let letterStormActive = false;

function cleanupClassroomTimeline() {
  classroomTimeouts.forEach(clearTimeout);
  classroomTimeouts = [];
  
  // Reset classmates laughing classes
  for (let i = 0; i < 4; i++) {
    const seat = document.getElementById(i === 2 ? "mate" : `student${i}`);
    if (seat) {
      seat.classList.remove("laughing");
      const classmateChar = seat.querySelector(".classmate-char");
      if (classmateChar) {
        classmateChar.innerHTML = (i % 2 ? mateB : mateA)("neutral", 0.7);
      }
    }
  }
  
  // Reset Ishaan
  const heroGroup = document.querySelector(".ishaan-desk-group");
  if (heroGroup) {
    heroGroup.classList.remove("sitting", "standing");
    heroGroup.classList.add("sitting"); // Default sitting
  }
  
  // Reset Teacher
  const teacher = document.getElementById("bro");
  if (teacher) {
    teacher.innerHTML = strictTeacher("neutral", 1.15);
    teacher.classList.remove("gesture-point", "gesture-explain");
  }
  
  // Clear letter storm
  const storm = document.getElementById("letterStorm");
  if (storm) {
    storm.innerHTML = "";
  }
  letterStormActive = false;
  
  // Reset scene classes
  const sceneEl = stage.querySelector('.scene');
  if (sceneEl) {
    sceneEl.classList.remove("shaking", "cam-zoom-shake");
  }
}

function runClassroomTimeline() {
  cleanupClassroomTimeline();
  
  const sceneEl = stage.querySelector('.scene');
  const heroGroup = document.querySelector(".ishaan-desk-group");
  const teacher = document.getElementById("bro");
  const storm = document.getElementById("letterStorm");
  
  if (!sceneEl || !heroGroup || !teacher || !storm) return;
  
  // 0ms: Initial State
  // Ishaan is sitting, worried.
  heroGroup.classList.add("sitting");
  const hero = document.getElementById("hero");
  if (hero) hero.innerHTML = ishaan("sad", 1.0);
  
  // 1000ms: Teacher calls Ishaan. Teacher points and is angry.
  classroomTimeouts.push(setTimeout(() => {
    teacher.innerHTML = strictTeacher("sad", 1.15);
    teacher.classList.add("gesture-point");
  }, 1000));
  
  // 3200ms: Ishaan stands up, holds book, looks surprised/frightened.
  classroomTimeouts.push(setTimeout(() => {
    heroGroup.classList.remove("sitting");
    heroGroup.classList.add("standing");
    if (hero) {
      hero.innerHTML = ishaan("surprised", 1.0);
      hero.classList.add("gesture-scared");
    }
    
    // Start letter storm
    generateLetterStorm(storm);
  }, 3200));
  
  // 6200ms: Classmates turn around and laugh.
  classroomTimeouts.push(setTimeout(() => {
    for (let i = 0; i < 4; i++) {
      const seat = document.getElementById(i === 2 ? "mate" : `student${i}`);
      if (seat) {
        seat.classList.add("laughing");
        const classmateChar = seat.querySelector(".classmate-char");
        if (classmateChar) {
          classmateChar.innerHTML = (i % 2 ? mateB : mateA)("happy", 0.7);
        }
        
        // Add click listener to student seats for extra laugh
        seat.addEventListener("click", () => {
          seat.classList.remove("laughing");
          void seat.offsetWidth;
          seat.classList.add("laughing");
          
          // pop a haha bubble
          const hahaSpans = sceneEl.querySelectorAll(".haha");
          const randomHaha = hahaSpans[Math.floor(Math.random() * hahaSpans.length)];
          if (randomHaha) {
            randomHaha.classList.remove("haha-pop");
            void randomHaha.offsetWidth;
            randomHaha.classList.add("haha-pop");
          }
          
          if (typeof actx !== "undefined" && actx && typeof pluck === "function") {
            pluck(midiF(55 + Math.random() * 12));
          }
        });
      }
    }
    
    // Zoom and shake camera
    sceneEl.classList.remove("cam-zoom");
    sceneEl.classList.add("cam-zoom-shake");
    setTimeout(() => {
      if (stage.querySelector('.scene') === sceneEl) {
        sceneEl.classList.add("shaking");
      }
    }, 800);
  }, 6200));
  
  // 10500ms: Teacher steps closer, Ishaan starts crying, letters fall down.
  classroomTimeouts.push(setTimeout(() => {
    if (hero) {
      hero.classList.remove("gesture-scared");
      hero.innerHTML = ishaan("cry", 1.0);
    }
    
    // Make letters fall down
    const letters = storm.querySelectorAll(".storm-letter");
    letters.forEach(letter => {
      letter.classList.add("falling");
    });
    
    // Teacher looks even angrier
    teacher.innerHTML = strictTeacher("sad", 1.15);
    teacher.classList.remove("gesture-point");
    teacher.classList.add("gesture-explain");
  }, 10500));
}

function generateLetterStorm(container) {
  container.innerHTML = "";
  const chars = "abzqpdegstyxmwnr";
  const colors = ["var(--marigold)", "var(--vermilion)", "var(--teal)", "var(--lilac)", "var(--pink)"];
  
  // Generate 18 floating letters
  for (let i = 0; i < 18; i++) {
    const span = document.createElement("span");
    span.className = `storm-letter orbit-${(i % 4) + 1}`;
    span.textContent = chars[Math.floor(Math.random() * chars.length)];
    span.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    const leftOffset = 18 + Math.random() * 24; 
    const topOffset = 12 + Math.random() * 32;
    span.style.left = `${leftOffset}%`;
    span.style.top = `${topOffset}%`;
    
    span.style.animationDelay = `${Math.random() * 1.5}s`;
    
    span.addEventListener("click", () => {
      span.classList.add("clicked");
      if (typeof actx !== "undefined" && actx && typeof pluck === "function") {
        const note = 72 + Math.floor(Math.random() * 18); 
        pluck(midiF(note));
      }
      setTimeout(() => span.remove(), 500);
    });
    
    container.appendChild(span);
  }
}

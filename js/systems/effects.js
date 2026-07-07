/* ===== SPECIAL EFFECTS ===== */

function makeRain() {
  const sc = document.getElementById("rainScene");
  if (!sc) return;
  for (let n = 0; n < 34; n++) {
    const r = document.createElement("span");
    r.style.cssText = `position:absolute;top:-10%;left:${Math.random() * 100}%;width:2px;height:16px;border-radius:2px;background:linear-gradient(rgba(155,139,214,0),rgba(200,212,240,.85));animation:rain ${0.5 + Math.random() * 0.5}s linear ${Math.random()}s infinite`;
    sc.appendChild(r);
  }
}

const CC = ["#F4B63E", "#E2533B", "#27A39B", "#9B8BD6", "#E87FA6", "#FDE9A7", "#7FBF6A"];
function confetti(n) {
  for (let i = 0; i < n; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = CC[i % CC.length];
    c.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
    c.style.animationDelay = (Math.random() * .5) + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    if (Math.random() > .5) c.style.borderRadius = "50%";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 3600);
  }
}

function shootStar() {
  const s = document.getElementById("shoot");
  s.classList.remove("go");
  void s.offsetWidth;
  s.classList.add("go");
}

function doWipe(tint) {
  const w = document.getElementById("wipe");
  w.style.setProperty("--swipe", tint || "#F4B63E");
  w.classList.remove("go");
  void w.offsetWidth;
  w.classList.add("go");
}

function sparkleStars(container, count) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "sparkle-star";
    s.textContent = Math.random() > 0.5 ? "✦" : "★";
    s.style.left = (12 + Math.random() * 76) + "%";
    s.style.top = (8 + Math.random() * 45) + "%";
    s.style.color = ["var(--marigold)", "var(--pink)", "var(--teal)", "var(--lilac)", "#fff"][i % 5];
    s.style.fontSize = (0.9 + Math.random() * 1.0) + "rem";
    s.style.animation = `pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${Math.random() * 0.7}s backwards, floaty 4s ease-in-out infinite`;
    container.appendChild(s);
    setTimeout(() => s.remove(), 4000);
  }
}

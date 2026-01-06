/* ===================== STAR DUST ===================== */

const canvas = document.getElementById('dust');
const ctx = canvas.getContext('2d');

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 140 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.4 + 0.3,
  s: Math.random() * 0.25 + 0.05,
  drift: Math.random() * 0.3 - 0.15
}));

function drawDust() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,190,210,0.85)';

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();

    star.y -= star.s;
    star.x += star.drift;

    if (star.y < -5) star.y = h + 5;
    if (star.x < -5) star.x = w + 5;
    if (star.x > w + 5) star.x = -5;
  });

  requestAnimationFrame(drawDust);
}

drawDust();

/* ===================== JEALOUS THOUGHTS ===================== */

const thoughts = [
  "why them, not me",
  "I saw you smile at someone else",
  "I pretend I don’t care",
  "I hate that I want you",
  "you were mine first",
  "don’t replace me",
  "I feel stupid for missing you",
  "I imagine you happier without me",
  "I get quiet when I’m scared",
  "I shouldn’t feel this"
];

function spawnThought() {
  const el = document.createElement('div');
  el.className = 'jealous-thought';
  el.textContent = thoughts[Math.floor(Math.random() * thoughts.length)];

  el.style.left = Math.random() * (window.innerWidth - 240) + 'px';
  el.style.top = Math.random() * (window.innerHeight - 120) + 'px';

  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 6000);
}

setInterval(spawnThought, 2600);

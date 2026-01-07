/* ===== AUDIO + LYRICS ===== */

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const lyrics = document.querySelectorAll('.lyrics span');

let lyricsStarted = false;

playBtn.addEventListener('click', () => {
  audio.play();
});

audio.addEventListener('timeupdate', () => {
  // слова песни появляются с 11 секунды
  if (audio.currentTime >= 11 && !lyricsStarted) {
    lyricsStarted = true;

    lyrics.forEach((line, i) => {
      setTimeout(() => {
        line.style.opacity = 1;
      }, i * 900);
    });
  }
});

/* ===== STAR DUST ===== */

const canvas = document.getElementById('dust');
const ctx = canvas.getContext('2d');

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.2 + 0.3,
  s: Math.random() * 0.25 + 0.05
}));

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,190,210,0.8)';

  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();

    star.y -= star.s;
    if (star.y < 0) star.y = h;
  });

  requestAnimationFrame(draw);
}
draw();

/* ===== JEALOUS THOUGHTS ===== */

const baseThoughts = [
  "why them, not me",
  "I pretend I don’t care",
  "I hate that I want you",
  "don’t replace me",
  "I feel stupid for missing you"
];

function spawnThought(text) {
  const el = document.createElement('div');
  el.className = 'jealous-thought';
  el.textContent =
    text || baseThoughts[Math.floor(Math.random() * baseThoughts.length)];

  el.style.left = Math.random() * (window.innerWidth - 220) + 'px';
  el.style.top = Math.random() * (window.innerHeight - 140) + 'px';

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}

/* мысли лезут СРАЗУ при загрузке сайта */
spawnThought();
setInterval(() => spawnThought(), 3400);

/* ===== FRIEND INTERACTION ===== */
/* ТОЛЬКО КЛИК, НИКАКОГО HOVER */

document.querySelectorAll('.friends-list li').forEach(item => {
  item.addEventListener('click', () => {
    spawnThought(`I get attached to ${item.textContent}`);
  });
});

/* ===== DRAGGABLE IMAGE (FINAL, FIXED) ===== */

const floating = document.getElementById('floating');

let dragging = false;
let startX = 0;
let startY = 0;
let imgX = 0;
let imgY = 0;

/* старт */
function startDrag(e) {
  e.preventDefault();
  dragging = true;
  floating.style.cursor = 'grabbing';

  const touch = e.touches ? e.touches[0] : e;
  startX = touch.clientX;
  startY = touch.clientY;

  const rect = floating.getBoundingClientRect();
  imgX = rect.left;
  imgY = rect.top;
}

/* движение */
function moveDrag(e) {
  if (!dragging) return;

  const touch = e.touches ? e.touches[0] : e;
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;

  floating.style.left = imgX + dx + 'px';
  floating.style.top = imgY + dy + 'px';
}

/* конец */
function endDrag() {
  dragging = false;
  floating.style.cursor = 'grab';
}

/* мышь */
floating.addEventListener('mousedown', startDrag);
window.addEventListener('mousemove', moveDrag);
window.addEventListener('mouseup', endDrag);

/* тач */
floating.addEventListener('touchstart', startDrag, { passive: false });
window.addEventListener('touchmove', moveDrag, { passive: false });
window.addEventListener('touchend', endDrag);

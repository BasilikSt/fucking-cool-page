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
const friends = document.querySelectorAll('.friends-list li');

friends.forEach(item => {
  item.addEventListener('click', () => {

    // общая мысль
    spawnThought(`i'm totally obessed with ${item.textContent}`);

    // очистить старые эффекты
    friends.forEach(i => {
      i.className = i.className.replace(/-active/g, '');
    });

    // индивидуальный эффект
    const user = item.dataset.user;

    if (user === 'edwan') item.classList.add('edwan-active');
    if (user === 'fedya') item.classList.add('fedya-active');
    if (user === 'rc') item.classList.add('rc-active');
    if (user === 'cole') item.classList.add('cole-active');
    if (user === 'radish') item.classList.add('radish-active');

    // эффект не навсегда
    setTimeout(() => {
      item.className = item.className.replace(/-active/g, '');
    }, 2200);
  });
});

/* ===== DRAGGABLE IMAGE ===== */

const floating = document.getElementById('floating');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

/* подготовка координат */
function normalizePosition() {
  const rect = floating.getBoundingClientRect();
  floating.style.left = rect.left + 'px';
  floating.style.top = rect.top + 'px';
  floating.style.right = 'auto';
}
normalizePosition();

/* старт */
function dragStart(e) {
  isDragging = true;
  floating.style.cursor = 'grabbing';

  const rect = floating.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  offsetX = clientX - rect.left;
  offsetY = clientY - rect.top;
}

/* движение */
function dragMove(e) {
  if (!isDragging) return;

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  floating.style.left = clientX - offsetX + 'px';
  floating.style.top = clientY - offsetY + 'px';
}

/* конец */
function dragEnd() {
  isDragging = false;
  floating.style.cursor = 'grab';
}

/* мышь */
floating.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', dragMove);
document.addEventListener('mouseup', dragEnd);

/* тач */
floating.addEventListener('touchstart', dragStart);
document.addEventListener('touchmove', dragMove, { passive: false });
document.addEventListener('touchend', dragEnd);

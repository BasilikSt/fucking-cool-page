/* ===================== AUDIO + LYRICS ===================== */

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const lyrics = document.querySelectorAll('.lyrics span');

playBtn.addEventListener('click', () => {
  audio.play();
  lyrics.forEach((line, i) => {
    setTimeout(() => line.style.opacity = 1, i * 1100);
  });
});

/* ===================== SMOOTH DRAGGABLE ===================== */

const floating = document.getElementById('floating');
let dragging = false;
let offsetX = 0;
let offsetY = 0;

floating.addEventListener('mousedown', (e) => {
  dragging = true;
  floating.classList.add('dragging');
  offsetX = e.clientX - floating.offsetLeft;
  offsetY = e.clientY - floating.offsetTop;
});

document.addEventListener('mouseup', () => {
  dragging = false;
  floating.classList.remove('dragging');
});

document.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  floating.style.left = e.clientX - offsetX + 'px';
  floating.style.top = e.clientY - offsetY + 'px';
});

/* ===================== FRIEND INTERACTION ===================== */

document.querySelectorAll('.friends-list li').forEach(item => {
  item.addEventListener('click', () => {
    spawnThought(`I get weirdly attached to ${item.textContent}`);
  });
});

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

const stars = Array.from({ length: 130 }, () => ({
  x: Math.random() * w,
  y: Math.random() * h,
  r: Math.random() * 1.4 + 0.3,
  s: Math.random() * 0.25 + 0.05,
  drift: Math.random() * 0.3 - 0.15
}));

function draw() {
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

  requestAnimationFrame(draw);
}
draw();

/* ===================== JEALOUS THOUGHTS ===================== */

const baseThoughts = [
  "why them, not me",
  "I pretend I don’t care",
  "I hate that I want you",
  "don’t replace me",
  "I feel stupid for missing you"
];

function spawnThought(customText) {
  const el = document.createElement('div');
  el.className = 'jealous-thought';
  el.textContent = customText || baseThoughts[Math.floor(Math.random() * baseThoughts.length)];

  el.style.left = Math.random() * (window.innerWidth - 220) + 'px';
  el.style.top = Math.random() * (window.innerHeight - 120) + 'px';

  document.body.appendChild(el);

  setTimeout(() => el.remove(), 6000);
}

setInterval(() => spawnThought(), 3200);

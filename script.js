// ── DATA ─────────────────────────────────────────────────────────────────────
// ✏️ Customize your quiz questions and answers here

const quizData = [
  {
    q: "What is our absolute favorite thing to do together?",
    opts: ["Watch movies all night", "Go on spontaneous adventures", "Cook and eat together", "All of the above, obviously"],
    answer: 3,
    fb: "You know us too well! 😄"
  },
  {
    q: "What word best describes our friendship / relationship?",
    opts: ["Chaotic (in the best way)", "Wholesome", "Legendary", "Irreplaceable"],
    answer: 2,
    fb: "Legendary is right! ✨"
  },
  {
    q: "What is the birthday person's love language?",
    opts: ["Words of affirmation", "Quality time", "Acts of service", "Gifts and surprises"],
    answer: 1,
    fb: "Quality time above all else! 💙"
  },
  {
    q: "Which of these best describes the birthday person?",
    opts: ["The planner of all plans", "The wildcard energy", "The heart of every group", "The one who always has snacks"],
    answer: 2,
    fb: "The heart of the group — always! 🥰"
  },
  {
    q: "What's our go-to celebration move?",
    opts: ["Fancy dinner out", "Homemade cake + movies", "Spontaneous road trip", "All the food, always"],
    answer: 3,
    fb: "All the food, always — you know it! 🍕"
  }
];

// ── DATA ─────────────────────────────────────────────────────────────────────
// ✏️ Customize your playlist here

const playlist = [
  { title: "Add Your Song Here", artist: "Your Favorite Artist", dur: "3:24" },
  { title: "A Song That Means Something", artist: "Replace With Real Track", dur: "4:01" },
  { title: "Your Anthem", artist: "The Artist You Love", dur: "3:47" },
  { title: "The Song That Always Plays", artist: "On Every Road Trip", dur: "3:12" },
  { title: "Happy Birthday to You", artist: "Everyone, Always", dur: "0:30" },
];


// ── PARTICLES ────────────────────────────────────────────────────────────────

(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 35; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 3 + 1,
      speed: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.4 + 0.05,
      color: Math.random() > 0.5 ? '#bee3f8' : '#2b6cb0'
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      p.y -= p.speed;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
})();


// ── WELCOME STARS ─────────────────────────────────────────────────────────────

(function () {
  const container = document.getElementById('welcomeStars');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation-duration:${1.5 + Math.random() * 3}s;
      animation-delay:${Math.random() * 3}s;
    `;
    container.appendChild(s);
  }
})();


// ── WELCOME ────────────────────────────────────────────────────────────────────

function startJourney() {
  document.getElementById('welcome').classList.add('hide');
  setTimeout(() => {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('surpriseHint').classList.add('show');
    setTimeout(() => document.getElementById('surpriseHint').classList.remove('show'), 4000);
  }, 900);
}


// ── NAV DOTS ──────────────────────────────────────────────────────────────────

const sections = document.querySelectorAll('section[data-nav]');
const navDotsEl = document.getElementById('navDots');

sections.forEach((sec) => {
  const dot = document.createElement('div');
  dot.className = 'nav-dot';
  dot.title = sec.id;
  dot.onclick = () => sec.scrollIntoView({ behavior: 'smooth' });
  navDotsEl.appendChild(dot);
});

const dots = navDotsEl.querySelectorAll('.nav-dot');

function updateDots() {
  sections.forEach((sec, i) => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      dots.forEach(d => d.classList.remove('active'));
      dots[i].classList.add('active');
    }
  });
}


// ── SCROLL ANIMATIONS ─────────────────────────────────────────────────────────

const revealEls = document.querySelectorAll('.reveal, .tl-item');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));
window.addEventListener('scroll', updateDots);
updateDots();


// ── MODAL ─────────────────────────────────────────────────────────────────────

function openModal(title, body) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').textContent  = body;
  document.getElementById('modal').classList.add('open');
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
}

document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});


// ── QUIZ ──────────────────────────────────────────────────────────────────────

let quizIdx = 0, score = 0, answered = false;

function renderQuiz() {
  const box = document.getElementById('quizBox');
  if (quizIdx >= quizData.length) {
    const pct = Math.round(score / quizData.length * 100);
    let msg = pct === 100 ? "Perfect score! You know us like no one else does. 💙"
            : pct >= 60  ? "Pretty good! You clearly pay attention. 😄"
                         : "Ha! Maybe we need to spend more time together. 😂";
    box.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-score">${score}/${quizData.length}</div>
        <p class="quiz-result-msg">${msg}</p>
        <button class="quiz-btn" style="margin-top:2rem" onclick="quizIdx=0;score=0;renderQuiz()">Play Again ↺</button>
      </div>`;
    return;
  }
  const q = quizData[quizIdx];
  box.innerHTML = `
    <div class="quiz-q-num">Question ${quizIdx + 1} of ${quizData.length}</div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="quizOpts">
      ${q.opts.map((o, i) => `<button class="quiz-opt" onclick="selectOpt(${i})">${o}</button>`).join('')}
    </div>
    <div class="quiz-feedback" id="quizFb"></div>
    <div class="quiz-nav">
      <span class="quiz-score">Score: ${score}</span>
      <button class="quiz-btn" id="quizNext" style="display:none" onclick="nextQ()">Next →</button>
    </div>`;
  answered = false;
}

function selectOpt(i) {
  if (answered) return;
  answered = true;
  const q    = quizData[quizIdx];
  const opts = document.querySelectorAll('.quiz-opt');
  opts[i].classList.add(i === q.answer ? 'correct' : 'wrong');
  opts[q.answer].classList.add('correct');
  if (i === q.answer) score++;
  document.getElementById('quizFb').textContent = q.fb;
  document.getElementById('quizNext').style.display = 'block';
}

function nextQ() { quizIdx++; renderQuiz(); }

renderQuiz();


// ── MUSIC PLAYER ──────────────────────────────────────────────────────────────

let currentTrack = -1, playing = false, progress = 0, interval;

function buildTrackList() {
  const tl = document.getElementById('trackList');
  tl.innerHTML = playlist.map((t, i) => `
    <div class="track ${i === currentTrack ? 'active' : ''}" onclick="selectTrack(${i})">
      <span class="track-num">${i === currentTrack && playing ? '♪' : i + 1}</span>
      <div class="track-info">
        <div class="track-name">${t.title}</div>
        <div class="track-artist">${t.artist}</div>
      </div>
      <span class="track-dur">${t.dur}</span>
    </div>`).join('');
}

function selectTrack(i) {
  currentTrack = i;
  progress = 0;
  playing = true;
  document.getElementById('playBtn').textContent = '⏸';
  document.getElementById('nowPlaying').textContent = `♪ Now playing: ${playlist[i].title}`;
  buildTrackList();
  clearInterval(interval);
  interval = setInterval(tickProgress, 200);
}

function togglePlay() {
  if (currentTrack < 0) { selectTrack(0); return; }
  playing = !playing;
  document.getElementById('playBtn').textContent = playing ? '⏸' : '▶';
  if (playing) interval = setInterval(tickProgress, 200);
  else clearInterval(interval);
}

function tickProgress() {
  progress = (progress + 0.033) % 100;
  document.getElementById('progressFill').style.width = progress + '%';
  if (progress < 0.1 && playing) nextTrack();
}

function nextTrack() {
  selectTrack((currentTrack + 1) % playlist.length);
}

function prevTrack() {
  selectTrack((currentTrack - 1 + playlist.length) % playlist.length);
}

function seekTrack(e) {
  const bar = e.currentTarget;
  progress = (e.offsetX / bar.offsetWidth) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

buildTrackList();


// ── CONFETTI ──────────────────────────────────────────────────────────────────

function launchCelebration() {
  const colors = ['#bee3f8', '#2b6cb0', '#1a3a5c', '#c9a84c', '#63b3ed', '#ebf8ff'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: -20px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        animation-duration: ${1.5 + Math.random() * 2}s;
        animation-delay: 0s;
      `;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 3500);
    }, i * 30);
  }
}


// ── KONAMI CODE EASTER EGG ───────────────────────────────────────────────────

let konamiSeq = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', e => {
  konamiSeq.push(e.keyCode);
  if (konamiSeq.length > 10) konamiSeq.shift();
  if (JSON.stringify(konamiSeq) === JSON.stringify(konamiCode)) {
    openModal(
      '🎉 Secret Unlocked!',
      'You found the hidden easter egg! Add your own secret message here — something only the birthday person would know to look for. Maybe a heartfelt note, a funny confession, or a surprise announcement. Happy Birthday! 💙'
    );
    launchCelebration();
  }
});
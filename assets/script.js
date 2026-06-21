/* ===================
    Start of Nav Highlight
   =================== */

// Highlight the nav link matching the current page, on every page load
(function highlightActiveNavLink() {
  const navLinks = document.querySelectorAll('nav ul li a');
  if (!navLinks.length) return;

  // Get current page filename (defaults to home.html if path ends in /)
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage) currentPage = 'home.html';

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
})();

// End of Nav Highlight

/* ===================
    Start of Letter Modal
   =================== */

if (document.getElementById('letter-modal')) {

  // ─── Letter Content ───────────────────────────────────────────
  // Replace these placeholder values with the real letter whenever ready.
  const letterGreeting = "Dear Jes,";
  const letterParagraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a placeholder letter — swap this text out whenever you're ready with the real one.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Until then, just know that every word here will be replaced with something written just for you."
  ];
  const letterSignoff = "With love,<br>Me";

  // ─── DOM References ────────────────────────────────────────────
  const letterModal      = document.getElementById('letter-modal');
  const openLetterBtn     = document.getElementById('open-letter-btn');
  const letterModalClose  = document.getElementById('letter-modal-close');
  const letterGreetingEl  = document.getElementById('letter-greeting');
  const letterBodyEl      = document.getElementById('letter-body');
  const letterSignoffEl   = document.getElementById('letter-signoff');

  // Populate letter content from the data above
  letterGreetingEl.textContent = letterGreeting;
  letterBodyEl.innerHTML = letterParagraphs.map(p => `<p>${p}</p>`).join('');
  letterSignoffEl.innerHTML = letterSignoff;

  function openLetterModal() {
    letterModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLetterModal() {
    letterModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openLetterBtn.addEventListener('click', openLetterModal);
  letterModalClose.addEventListener('click', closeLetterModal);

  // Close on backdrop click
  letterModal.addEventListener('click', (e) => {
    if (e.target === letterModal) closeLetterModal();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLetterModal();
  });

}

// End of Letter Modal


/* ===================
    Start of Memories
   =================== */
 
if (document.getElementById('memories-grid')) {
 
  // ─── Memory Data ─────────────────────────────────────────────
  // type: "image" or "video"
  // src:  path to the file e.g. "assets/images/memories/memory_1.jpg"
  //       or "assets/videos/memory1.mp4"
 
  const memories = [
    {
      type:    "image",
      src:     "assets/images/memories/memory_1.jpg",                              // e.g. "assets/images/memories/memory_1.jpg"
      date:    "January 1, 2024",
      caption: "Caption for this memory goes here."
    },
    {
      type:    "image",
      src:     "assets/images/memories/memory_2.jpg",
      date:    "February 14, 2024",
      caption: "Caption for this memory goes here."
    },
    {
      type:    "image",
      src:     "assets/images/memories/memory_3.jpg",
      date:    "March 20, 2024",
      caption: "Caption for this memory goes here."
    },
    {
      type:    "image",
      src:     "assets/images/memories/memory_4.jpg",
      date:    "April 5, 2024",
      caption: "Caption for this memory goes here."
    },
    {
      type:    "video",
      src:     "assets/images/memories/memory_5.mp4",                              // e.g. "assets/videos/memory1.mp4"
      date:    "May 18, 2024",
      caption: "Caption for this memory goes here."
    },
    {
      type:    "image",
      src:     "assets/images/memories/memory_6.jpg",
      date:    "June 21, 2024",
      caption: "Caption for this memory goes here."
    },
  ];
 
  // ─── DOM References ──────────────────────────────────────────
  const grid       = document.getElementById('memories-grid');
  const modal      = document.getElementById('memory-modal');
  const modalMedia = document.getElementById('modal-media');
  const modalDate  = document.getElementById('modal-date');
  const modalCap   = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');
 
  // ─── Scrapbook Styling Helpers ────────────────────────────────
  const stickers = [
    { src: "assets/images/memories/butterfly_graphics.png",  corner: "corner-br", rotate: -6,  size: 124 },
    { src: "assets/images/memories/flower_1_graphics.png",   corner: "corner-tl", rotate: 4,   size: 94 },
    { src: "assets/images/memories/star_graphics.png",       corner: "corner-bl", rotate: -8,  size: 108 },
    { src: "assets/images/memories/flower_2_graphics.png",   corner: "corner-br", rotate: 5,   size: 108 },
    { src: "assets/images/memories/letter_graphics.png",     corner: "corner-tr", rotate: -8,  size: 86 },
    { src: "assets/images/memories/headset_graphics.png",    corner: "corner-br", rotate: 36,   size: 104 },
    { src: "assets/images/memories/stuff_toy_graphics.png",  corner: "corner-bl", rotate: -4,  size: 86 }
  ];
  const cardRotations = [-1.8, 1.4, -1.2, 1.8, -1.5, 1.1];
  const tapeRotations = [-5, 4, -3, 6, -4, 3];
 
  // ─── Build Grid ──────────────────────────────────────────────
  memories.forEach((mem, i) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.style.setProperty('--rotate', `${cardRotations[i % cardRotations.length]}deg`);
    card.style.setProperty('--tape-rotate', `${tapeRotations[i % tapeRotations.length]}deg`);
 
    const photo = document.createElement('div');
    photo.className = 'memory-photo';
 
    if (mem.src) {
      if (mem.type === 'video') {
        photo.innerHTML = `<video src="${mem.src}" muted playsinline preload="metadata" class="memory-thumb"></video>`;
      } else {
        photo.innerHTML = `<img src="${mem.src}" alt="Memory ${i + 1}" class="memory-thumb">`;
      }
    } else {
      // Placeholder when no src
      photo.innerHTML = `<div class="memory-placeholder"><span></span></div>`;
    }
 
    const stickerData = stickers[i % stickers.length];
    const sticker = document.createElement('img');
    sticker.className = `memory-sticker ${stickerData.corner}`;
    sticker.src = stickerData.src;
    sticker.alt = '';
    sticker.style.width = `${stickerData.size}px`;
    sticker.style.transform = `rotate(${stickerData.rotate}deg)`;
 
    card.appendChild(photo);
    card.appendChild(sticker);
 
    card.addEventListener('click', () => openModal(mem));
    grid.appendChild(card);
  });
 
  // ─── Open Modal ──────────────────────────────────────────────
  function openModal(mem) {
    modalDate.textContent = mem.date;
    modalCap.textContent  = mem.caption;
 
    modalMedia.innerHTML = '';
    if (mem.src) {
      if (mem.type === 'video') {
        modalMedia.innerHTML = `<video src="${mem.src}" controls class="modal-media-el"></video>`;
      } else {
        modalMedia.innerHTML = `<img src="${mem.src}" alt="Memory" class="modal-media-el">`;
      }
    } else {
      modalMedia.innerHTML = `<div class="modal-placeholder"><span></span></div>`;
    }
 
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
 
  // ─── Close Modal ─────────────────────────────────────────────
  function closeModal() {
    modal.classList.remove('active');
    modalMedia.innerHTML = ''; // stop video if playing
    document.body.style.overflow = '';
  }
 
  modalClose.addEventListener('click', closeModal);
 
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
 
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
 
} // End of Memories


/* ===================
    Start of Song
   =================== */

// ─── Song Data ───────────────────────────────────────────────────

if (document.getElementById('play-btn')) {

const songs = [
  {
    title:   "Bawat Piyesa",
    artist:  "Munimuni",
    cover:   "assets/images/songs/bawat_piyesa.jpg",
    audio:   "assets/audios/bawat_piyesa.mp3",
    meaning: "This song reminds me of us because we're the kind of people who hold on to moments a little longer than everyone else. We stay in conversations, memories, and feelings because we already know how much they'll mean someday. Every time I hear this song, it feels like a reminder of all the little moments with you that I never want to rush through."
  },
  {
    title:   "Last Night On Earth",
    artist:  "Green Day",
    cover:   "assets/images/songs/last_night_on_earth.jpg",
    audio:   "assets/audios/last_night_on_earth.mp3",
    meaning: "Whenever I listen to this song, I think about how easy it is to take ordinary days for granted—until you're with someone who makes them feel extraordinary. Being with you makes me want to appreciate every moment, every conversation, every late-night call, and every memory we create. If every night were my last, I'd still want to spend it with you."
  },
  {
    title:   "Kabisado",
    artist:  "IV of Spades",
    cover:   "assets/images/songs/kabisado.jpg",
    audio:   "assets/audios/kabisado.mp3",
    meaning: "Somewhere along the way, knowing you stopped being something I had to try to do—it just happened naturally. I know the little things about you, the habits you don't even notice, the way you react to certain things, and the small details that make you who you are. You've become someone I know by heart, and that's one of my favorite things about us."
  },
  {
    title:   "Secret Door",
    artist:  "Arctic Monkeys",
    cover:   "assets/images/songs/secret_door.jpg",
    audio:   "assets/audios/secret_door.mp3",
    meaning: "What I love about you is that you're completely yourself, even when the world expects something different. Being with you feels like stepping away from all the noise and expectations around us. It's like we've created our own little space where nothing else matters, and honestly, that's where I feel most at peace."
  },
  {
    title:   "Until I Found You",
    artist:  "Stephen Sanchez",
    cover:   "assets/images/songs/until_i_found_you.jpg",
    audio:   "assets/audios/until_i_found_you.mp3",
    meaning: "Before you, there were things I was still trying to figure out, feelings I couldn't quite explain, and pieces of myself that felt unfinished. Then you came into my life, and somehow everything felt a little clearer. This song reminds me that finding you wasn't something I'll ever take for granted, because you're one of the best things that's ever happened to me."
  }
];
 
// ─── State ───────────────────────────────────────────────────────
let current   = 0;
let isPlaying = false;
 
// ─── Audio Engine ────────────────────────────────────────────────
const audio = new Audio();
 
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progressFill.style.width    = (audio.currentTime / audio.duration * 100) + '%';
  currentTimeEl.textContent   = formatTime(audio.currentTime);
});
 
audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration);
});
 
audio.addEventListener('ended', () => {
  goTo(current + 1, true);
});
 
function playAudio() {
  if (!songs[current].audio) return;
  audio.play().then(() => {
    isPlaying = true;
    updatePlayBtn();
  }).catch(() => {
    isPlaying = false;
    updatePlayBtn();
  });
}
 
function pauseAudio() {
  playOnReady = false;
  audio.pause();
  isPlaying = false;
  updatePlayBtn();
}
 
function updatePlayBtn() {
  playBtn.innerHTML = isPlaying ? '&#9646;&#9646;' : '&#9654;';
  playBtn.title     = isPlaying ? 'Pause' : 'Play';
}
 
function formatTime(secs) {
  if (isNaN(secs) || secs === Infinity) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
 
// ─── DOM References ──────────────────────────────────────────────
const albumImg      = document.getElementById('album-img');
const songTitleEl   = document.getElementById('song-title');
const songArtistEl  = document.getElementById('song-artist');
const meaningTitle  = document.getElementById('meaning-title');
const meaningText   = document.getElementById('meaning-text');
const playlistEl    = document.getElementById('playlist');
const prevBtn       = document.getElementById('prev-btn');
const nextBtn       = document.getElementById('next-btn');
const playBtn       = document.getElementById('play-btn');
const progressBar   = document.getElementById('progress-bar');
const progressFill  = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl   = document.getElementById('total-time');
 
progressBar.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});
 
// ─── Build Playlist ──────────────────────────────────────────────
songs.forEach((song, i) => {
  const li = document.createElement('li');
  li.className     = 'playlist-item';
  li.dataset.index = i;
  li.innerHTML = `
    <span class="playlist-num">${i + 1}</span>
    <span class="playlist-info">
      <span class="playlist-song-title">${song.title}</span>
      <span class="playlist-song-artist">${song.artist}</span>
    </span>`;
  li.addEventListener('click', () => {
    pauseAudio();
    goTo(i, false);
  });
  playlistEl.appendChild(li);
});
 
// ─── Go To Song ──────────────────────────────────────────────────
function goTo(index, autoplay = false) {
  current = (index + songs.length) % songs.length;
  const song = songs[current];
 
  if (song.cover) {
    albumImg.src           = song.cover;
    albumImg.style.display = 'block';
  } else {
    albumImg.src           = '';
    albumImg.style.display = 'none';
  }
 
  songTitleEl.textContent  = song.title;
  songArtistEl.textContent = song.artist;
  meaningTitle.textContent = song.title;
  meaningText.textContent  = song.meaning;
 
  progressFill.style.width  = '0%';
  currentTimeEl.textContent = '0:00';
  totalTimeEl.textContent   = '0:00';
 
  document.querySelectorAll('.playlist-item').forEach((el, i) => {
    el.classList.toggle('active', i === current);
  });
 
  if (song.audio) {
    audio.src = song.audio;
    audio.load();
    if (autoplay) {
      audio.addEventListener('canplaythrough', function handler() {
        audio.removeEventListener('canplaythrough', handler);
        audio.play().then(() => {
          isPlaying = true;
          updatePlayBtn();
        }).catch(() => {
          isPlaying = false;
          updatePlayBtn();
        });
      });
    }
  }
}
 
// ─── Controls ────────────────────────────────────────────────────
prevBtn.addEventListener('click', () => {
  pauseAudio();
  goTo(current - 1, false);
});
 
nextBtn.addEventListener('click', () => {
  pauseAudio();
  goTo(current + 1, false);
});
 
playBtn.addEventListener('click', () => {
  if (isPlaying) pauseAudio();
  else playAudio();
});
 
// ─── Init ────────────────────────────────────────────────────────
goTo(0);

// End of Song

}

/* ===================
    Start of Quiz
   =================== */

if (document.getElementById('intro-btn')) {

// SECTION 1: How Well Do You Know Us?  (6 questions, mix of mc/tf)

const section1 = {

  title: "How Well Do You Know Us?",
  desc:  "Answer these questions and see how well you really know us!",
  questions: [
    {
      type:    "mc",
      question: "something",
      choices:  ["A", "B", "C", "D"],
      answer:   "C"        
    },
    {
      type:    "mc",
      question: "something",
      choices:  ["A", "B", "C", "D"],
      answer:   "C"
    },
    {
      type:    "tf",
      question: "something",
      choices:  ["True", "False"],
      answer:   "True"
    },
    {
      type:    "mc",
      question: "something",
      choices:  ["A", "B", "C", "D"],
      answer:   "C"
    },
    {
      type:    "tf",
      question: "something",
      choices:  ["True", "False"],
      answer:   "True"
    },
    {
      type:    "mc",
      question: "something",
      choices:  ["A", "B", "C", "D"],
      answer:   "C"
    },
  ]
};

// SECTION 2: Guess the Memory  (4 questions with photos)

const section2 = {
  title: "Guess the Memory",
  desc:  "Look at the photo and answer the question about this memory!",
  questions: [
    {
      type:    "mc",
      photo:   "assets/images/bawat_piyesa.jpg",
     question: "something",
      choices:  ["A", "B", "C", "D"],
      answer:   "C"
    },
    {
      type:    "tf",
      photo:   "assets/images/.jpg",
      question: "This photo was taken on a special occasion.",
      choices:  ["True", "False"],
      answer:   "True"
    },
    {
      type:    "mc",
      photo:   "assets/images/.jpg",
     question: "something",
      choices:  ["A", "B", "C", "D"],
      answer:   "C"
    },
    {
      type:    "mc",
      photo:   "assets/images/.jpg",
     question: "something",
      choices:  ["A", "B", "C", "D"],
      answer:   "C"
    },
  ]
};

// Result Messages

function getResultMessage(score, total) {
  const pct = score / total;
  if (pct === 1)   return "Perfect score! You know us better than we know ourselves! 🎉";
  if (pct >= 0.8)  return "Amazing! You clearly pay attention! 💛";
  if (pct >= 0.6)  return "Not bad! You know quite a bit about us! 😊";
  if (pct >= 0.4)  return "Getting there! We need more quality time together 😄";
  return                  "Looks like someone hasn't been paying attention! 😂";
}
 

// State

const sections   = [section1, section2];
let sectionIndex = 0;
let questionIndex = 0;
let score        = 0;
let answered     = false;
 
// Flatten for total count
const totalQuestions = sections.reduce((n, s) => n + s.questions.length, 0);
let globalIndex = 0;



// DOM References

const introCard      = document.getElementById('quiz-intro');
const introTag       = document.getElementById('intro-tag');
const introTitle     = document.getElementById('intro-title');
const introDesc      = document.getElementById('intro-desc');
const introBtn       = document.getElementById('intro-btn');
const quizCard       = document.getElementById('quiz-card');
const quizCounter    = document.getElementById('quiz-counter');
const quizScoreEl    = document.getElementById('quiz-score');
const quizSectionLbl = document.getElementById('quiz-section-label');
const quizQuestion   = document.getElementById('quiz-question');
const quizChoices    = document.getElementById('quiz-choices');
const quizPhotoWrap  = document.getElementById('quiz-photo-wrap');
const quizPhoto      = document.getElementById('quiz-photo');
const quizResults    = document.getElementById('quiz-results');
const resultsScore   = document.getElementById('results-score');
const resultsMsg     = document.getElementById('results-message');
const restartBtn     = document.getElementById('restart-btn');



// Show Section Intro

function showIntro(idx) {
  const sec = sections[idx];
  introTag.textContent   = `Section ${idx + 1} of ${sections.length}`;
  introTitle.textContent = sec.title;
  introDesc.textContent  = sec.desc;
 
  quizCard.style.display    = 'none';
  quizResults.style.display = 'none';
  introCard.style.display   = 'flex';
}
 

// Render Question

function renderQuestion() {
  answered = false;
  const sec = sections[sectionIndex];
  const q   = sec.questions[questionIndex];
 
  quizCounter.textContent    = `Question ${globalIndex + 1} of ${totalQuestions}`;
  quizScoreEl.textContent    = `Score: ${score}`;
  quizSectionLbl.textContent = `Section ${sectionIndex + 1}: ${sec.title}`;
  quizQuestion.textContent   = q.question;
 
  // Photo (Section 2)
  if (q.photo) {
    quizPhoto.src             = q.photo;
    quizPhotoWrap.style.display = 'block';
  } else {
    quizPhotoWrap.style.display = 'none';
  }
 
  // Choices
  quizChoices.innerHTML = '';
  q.choices.forEach(choice => {
    const li       = document.createElement('li');
    li.className   = 'quiz-choice';
    li.textContent = choice;
    li.addEventListener('click', () => selectAnswer(li, choice, q.answer));
    quizChoices.appendChild(li);
  });
}
 

// Handle Answer

function selectAnswer(el, chosen, correct) {
  if (answered) return;
  answered = true;
 
  if (chosen === correct) score++;
 
  document.querySelectorAll('.quiz-choice').forEach(li => {
    li.classList.add('disabled');
    if (li.textContent === correct)        li.classList.add('correct');
    else if (li === el && chosen !== correct) li.classList.add('wrong');
  });
 
  quizScoreEl.textContent = `Score: ${score}`;
 
  setTimeout(() => {
    questionIndex++;
    globalIndex++;
 
    const sec = sections[sectionIndex];
 
    if (questionIndex < sec.questions.length) {
      // More questions in this section
      renderQuestion();
    } else if (sectionIndex + 1 < sections.length) {
      // Move to next section intro
      sectionIndex++;
      questionIndex = 0;
      quizCard.style.display = 'none';
      showIntro(sectionIndex);
    } else {
      // All done
      showResults();
    }
  }, 900);
}

// Results

function showResults() {
  quizCard.style.display    = 'none';
  introCard.style.display   = 'none';
  quizResults.style.display = 'flex';
  resultsScore.textContent  = `You scored ${score} / ${totalQuestions}`;
  resultsMsg.textContent    = getResultMessage(score, totalQuestions);
}
 

// Restart

restartBtn.addEventListener('click', () => {
  sectionIndex  = 0;
  questionIndex = 0;
  globalIndex   = 0;
  score         = 0;
  answered      = false;
  showIntro(0);
});
 

// Intro Button → Start Section

introBtn.addEventListener('click', () => {
  introCard.style.display  = 'none';
  quizCard.style.display   = 'flex';
  renderQuestion();
});
 

// Init

showIntro(0);

}  

// End of Quiz


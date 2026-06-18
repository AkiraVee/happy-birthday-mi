/* ===================
    Start of Song
   =================== */

// ─── Song Data ───────────────────────────────────────────────────

const songs = [
  {
    title:   "Bawat Piyesa",
    artist:  "Munimuni",
    cover:   "assets/images/bawat_piyesa.jpg",
    audio:   "assets/audios/bawat_piyesa.mp3",
    meaning: "This song reminds me of the first time we laughed until we cried. Every time it plays, it takes me back to that exact moment."
  },
  {
    title:   "Last Night On Earth",
    artist:  "Green Day",
    cover:   "",
    audio:   "assets/audios/last_night_on_earth.mp3",
    meaning: "This one came on during one of our late-night drives. The lyrics felt like they were written just for us."
  },
  {
    title:   "Song Title 3",
    artist:  "Artist Name",
    cover:   "",
    audio:   "assets/audios/.mp3",
    meaning: "I heard this and immediately thought of you. It captures everything I struggle to put into words."
  },
  {
    title:   "Song Title 4",
    artist:  "Artist Name",
    cover:   "",
    audio:   "assets/audios/.mp3",
    meaning: "This song was playing the day everything changed. It holds a very special place in my heart."
  },
  {
    title:   "Song Title 5",
    artist:  "Artist Name",
    cover:   "",
    audio:   "assets/audios/.mp3",
    meaning: "A song that perfectly describes how grateful I am to have you in my life. Here's to many more memories."
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

/* ===================
    Start of Quiz
   =================== */
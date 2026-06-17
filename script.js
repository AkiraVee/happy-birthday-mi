// ─── Song Data ───────────────────────────────────────────────────

const songs = [
  {
    title:   "Song Title 1",
    artist:  "Artist Name",
    cover:   "assets/images/bawat_piyesa.jpg",
    audio:   "assets/audios/bawat_piyesa.mp3",
    meaning: "This song reminds me of the first time we laughed until we cried. Every time it plays, it takes me back to that exact moment."
  },
  {
    title:   "Song Title 2",
    artist:  "Artist Name",
    cover:   "",
    audio:   "assets/music/song2.mp3",
    meaning: "This one came on during one of our late-night drives. The lyrics felt like they were written just for us."
  },
  {
    title:   "Song Title 3",
    artist:  "Artist Name",
    cover:   "",
    audio:   "assets/music/song3.mp3",
    meaning: "I heard this and immediately thought of you. It captures everything I struggle to put into words."
  },
  {
    title:   "Song Title 4",
    artist:  "Artist Name",
    cover:   "",
    audio:   "assets/music/song4.mp3",
    meaning: "This song was playing the day everything changed. It holds a very special place in my heart."
  },
  {
    title:   "Song Title 5",
    artist:  "Artist Name",
    cover:   "",
    audio:   "assets/music/song5.mp3",
    meaning: "A song that perfectly describes how grateful I am to have you in my life. Here's to many more memories."
  }
];
 
// ─── State ───────────────────────────────────────────────────────
let current   = 0;
let isPlaying = false;
 
// ─── Audio Engine ────────────────────────────────────────────────
const audio = new Audio();
 
audio.addEventListener('ended', () => {
  goTo(current + 1); // auto-advance to next song
  playAudio();
});
 
function playAudio() {
  if (!songs[current].audio) return;
  audio.play().then(() => {
    isPlaying = true;
    updatePlayBtn();
  }).catch(() => {
    // Autoplay blocked — user must tap play
  });
}
 
function pauseAudio() {
  audio.pause();
  isPlaying = false;
  updatePlayBtn();
}
 
function updatePlayBtn() {
  playBtn.innerHTML = isPlaying ? '&#9646;&#9646;' : '&#9654;';
  playBtn.title     = isPlaying ? 'Pause' : 'Play';
}
 
// ─── DOM References ──────────────────────────────────────────────
const albumImg     = document.getElementById('album-img');
const songTitle    = document.getElementById('song-title');
const songArtist   = document.getElementById('song-artist');
const meaningTitle = document.getElementById('meaning-title');
const meaningText  = document.getElementById('meaning-text');
const playlistEl   = document.getElementById('playlist');
const prevBtn      = document.getElementById('prev-btn');
const nextBtn      = document.getElementById('next-btn');
const playBtn      = document.getElementById('play-btn');
 
// ─── Build Playlist ──────────────────────────────────────────────
songs.forEach((song, i) => {
  const li = document.createElement('li');
  li.className    = 'playlist-item';
  li.dataset.index = i;
  li.innerHTML = `
    <span class="playlist-num">${i + 1}</span>
    <span class="playlist-info">
      <span class="playlist-song-title">${song.title}</span>
      <span class="playlist-song-artist">${song.artist}</span>
    </span>`;
  li.addEventListener('click', () => {
    goTo(i);
    playAudio();
  });
  playlistEl.appendChild(li);
});
 
// ─── Go To Song ──────────────────────────────────────────────────
function goTo(index) {
  const wasPlaying = isPlaying;
 
  pauseAudio();
  current = (index + songs.length) % songs.length;
  const song = songs[current];
 
  // Album art
  if (song.cover) {
    albumImg.src          = song.cover;
    albumImg.style.display = 'block';
  } else {
    albumImg.src          = '';
    albumImg.style.display = 'none';
  }
 
  // Left panel
  songTitle.textContent  = song.title;
  songArtist.textContent = song.artist;
 
  // Middle card
  meaningTitle.textContent = song.title;
  meaningText.textContent  = song.meaning;
 
  // Playlist highlight
  document.querySelectorAll('.playlist-item').forEach((el, i) => {
    el.classList.toggle('active', i === current);
  });
 
  // Load new audio source
  if (song.audio) {
    audio.src = song.audio;
    audio.load();
  }
 
  // Resume playback if it was playing before
  if (wasPlaying) playAudio();
}
 
// ─── Controls ────────────────────────────────────────────────────
prevBtn.addEventListener('click', () => {
  goTo(current - 1);
  if (isPlaying) playAudio();
});
 
nextBtn.addEventListener('click', () => {
  goTo(current + 1);
  if (isPlaying) playAudio();
});
 
playBtn.addEventListener('click', () => {
  if (isPlaying) pauseAudio();
  else playAudio();
});
 
// ─── Init ────────────────────────────────────────────────────────
goTo(0);
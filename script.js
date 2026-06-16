



/* Songs Script */

const songs = [
  {
    title: "Song Title 1",
    artist: "Artist Name",
    cover: "",          // e.g. "assets/images/cover1.jpg"
    meaning: "Song Explanation: This song reminds me of the first time we laughed until we cried. Every time it plays, it takes me back to that exact moment."
  },
  {
    title: "Song Title 2",
    artist: "Artist Name",
    cover: "",
    meaning: "Song Explanation: This one came on during one of our late-night drives. The lyrics felt like they were written just for us."
  },
  {
    title: "Song Title 3",
    artist: "Artist Name",
    cover: "",
    meaning: "Song Explanation: I heard this and immediately thought of you. It captures everything I struggle to put into words."
  },
  {
    title: "Song Title 4",
    artist: "Artist Name",
    cover: "",
    meaning: "Song Explanation: This song was playing the day everything changed. It holds a very special place in my heart."
  },
  {
    title: "Song Title 5",
    artist: "Artist Name",
    cover: "",
    meaning: "Song Explanation: A song that perfectly describes how grateful I am to have you in my life. Here's to many more memories."
  }
];
 
let current = 0;
 
const albumImg    = document.getElementById('album-img');
const songTitle   = document.getElementById('song-title');
const songArtist  = document.getElementById('song-artist');
const meaningTitle = document.getElementById('meaning-title');
const meaningText  = document.getElementById('meaning-text');
const playlistEl   = document.getElementById('playlist');
const prevBtn      = document.getElementById('prev-btn');
const nextBtn      = document.getElementById('next-btn');

// Build playlist
songs.forEach((song, i) => {
  const li = document.createElement('li');
  li.className = 'playlist-item';
  li.dataset.index = i;
  li.innerHTML = `
    <span class="playlist-num">${i + 1}</span>
    <span class="playlist-info">
      <span class="playlist-song-title">${song.title}</span>
      <span class="playlist-song-artist">${song.artist}</span>
    </span>
  `;
  li.addEventListener('click', () => goTo(i));
  playlistEl.appendChild(li);
});
 
function goTo(index) {
  current = (index + songs.length) % songs.length;
  const song = songs[current];

  // Update album art
  if (song.cover) {
    albumImg.src = song.cover;
    albumImg.style.display = 'block';
  } else {
    albumImg.src = '';
    albumImg.style.display = 'none';
  }
 
  // Update left panel
  songTitle.textContent  = song.title;
  songArtist.textContent = song.artist;
 
  // Update middle card
  meaningTitle.textContent = song.title;
  meaningText.textContent  = song.meaning;
 
  // Update active playlist item
  document.querySelectorAll('.playlist-item').forEach((el, i) => {
    el.classList.toggle('active', i === current);
  });
}
 
prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));
 
// Init
goTo(0);
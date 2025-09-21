const playlist = [
    {
        title: "Jugarfiya",
        src: "songs/song1.mp3",
        image: "images/Song1-art.jpg"
    },
    {
        title: "Die with a smile",
        src: "songs/song2.mp3",
        image: "images/Song2-art.jpg"
    },
    {
        title: "Finding her",
        src: "songs/song3.mp3",
        image: "images/Song3-art.jpg"
    },
    {
        title: "Pal pal",
        src: "songs/song4.mp3",
        image: "images/Song4-art.jpg"
    },
    {
        title: "Kya hua tera wada",
        src: "songs/song5.mp3",
        image: "images/Song5-art.jpg"
    },
    {
        title: "Itna mujhe pyaar badha",
        src: "songs/song6.mp3",
        image: "images/Song6-art.jpg"
    },
    {
        title: "Aaj bhi",
        src: "songs/song7.mp3",
        image: "images/Song7-art.jpg"
    },
    {
        title: "Decay",
        src: "songs/song8.mp3",
        image: "images/Song8-art.jpg"
    },
    {
        title: "Azul",
        src: "songs/song9.mp3",
        image: "images/Song9-art.jpg"
    },
    {
        title: "Billo Rani",
        src: "songs/song10.mp3",
        image: "images/Song10-art.jpg"
    }
];

// Get HTML elements
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const songTitle = document.querySelector(".song-title");
const albumArt = document.getElementById("album-art");
const progressContainer = document.getElementById("progress-container");
const progressLine = document.getElementById("progress-line");
const body = document.body;

let currentSongIndex = 0;
let isPlaying = false;

// Function to load a song
function loadSong(song) {
    songTitle.textContent = song.title;
    albumArt.src = song.image;
    audioPlayer.src = song.src;
    progressLine.style.width = '0%';
}

// Play or Pause the song
function playPauseSong() {
    if (isPlaying) {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        body.classList.remove('playing');
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        body.classList.add('playing');
    }
    isPlaying = !isPlaying;
}

// Play the next song
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Play the previous song
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(playlist[currentSongIndex]);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressLine.style.width = `${progressPercent}%`;
}

// Set progress on click
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Event listeners
playPauseBtn.addEventListener("click", playPauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audioPlayer.addEventListener("timeupdate", updateProgress);
audioPlayer.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);

// Load the first song when the page loads
loadSong(playlist[currentSongIndex]);

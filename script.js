// This is your playlist. 
const playlist = [
    {
        title: "Jugarfiya",
        artist: "Unknown",
        src: "songs/Jugarfiya.mp3",
        image: "images/Jugarfiya-art.jpg"
    },
    {
        title: "Die with a smile",
        artist: "Unknown",
        src: "songs/Die-with-a-smile.mp3",
        image: "images/Die-with-a-smile-art.jpg"
    },
    {
        title: "Finding her",
        artist: "Unknown",
        src: "songs/Finding-her.mp3",
        image: "images/Finding-her-art.jpg"
    },
    {
        title: "Pal pal",
        artist: "Unknown",
        src: "songs/Pal-pal.mp3",
        image: "images/Pal-pal-art.jpg"
    },
    {
        title: "Kya hua tera wada",
        artist: "Unknown",
        src: "songs/Kya-hua-tera-wada.mp3",
        image: "images/Kya-hua-tera-wada-art.jpg"
    },
    {
        title: "Itna mujhe pyaar badha",
        artist: "Unknown",
        src: "songs/Itna-mujhe-pyaar-badha.mp3",
        image: "images/Itna-mujhe-pyaar-badha-art.jpg"
    },
    {
        title: "Aaj bhi",
        artist: "Unknown",
        src: "songs/Aaj-bhi.mp3",
        image: "images/Aaj-bhi-art.jpg"
    },
    {
        title: "Decay",
        artist: "Unknown",
        src: "songs/Decay.mp3",
        image: "images/Decay-art.jpg"
    },
    {
        title: "Azul",
        artist: "Unknown",
        src: "songs/Azul.mp3",
        image: "images/Azul-art.jpg"
    },
    {
        title: "Billo Rani",
        artist: "Unknown",
        src: "songs/Billo-Rani.mp3",
        image: "images/Billo-Rani-art.jpg"
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

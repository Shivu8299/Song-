// This is your playlist. 
const playlist = [
    {
        title: "Song 1 Title",
        artist: "Artist 1", // Removed from HTML, but good to keep for a playlist
        src: "songs/Song1.mp3",
        image: "images/Song1-art.jpg" // CHANGE THIS TO YOUR IMAGE PATH
    },
    {
        title: "Song 2 Title",
        artist: "Artist 2",
        src: "songs/Song2.mp3",
        image: "images/Song2-art.jpg"
    },
    {
        title: "Song 3 Title",
        artist: "Artist 3",
        src: "songs/Song3.mp3",
        image: "images/Song3-art.jpg"
    },
    {
        title: "Song 4 Title",
        artist: "Artist 4",
        src: "songs/Song4.mp3",
        image: "images/Song4-art.jpg"
    },
    {
        title: "Song 5 Title",
        artist: "Artist 5",
        src: "songs/Song5.mp3",
        image: "images/Song5-art.jpg"
    },
    {
        title: "Song 6 Title",
        artist: "Artist 6",
        src: "songs/Song6.mp3",
        image: "images/Song6-art.jpg"
    },
    {
        title: "Song 7 Title",
        artist: "Artist 7",
        src: "songs/Song7.mp3",
        image: "images/Song7-art.jpg"
    },
    {
        title: "Song 8 Title",
        artist: "Artist 8",
        src: "songs/Song8.mp3",
        image: "images/Song8-art.jpg"
    },
    {
        title: "Song 9 Title",
        artist: "Artist 9",
        src: "songs/Song9.mp3",
        image: "images/Song9-art.jpg"
    },
    {
        title: "Song 10 Title",
        artist: "Artist 10",
        src: "songs/Song10.mp3",
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

const playlist = [
    {
        title: "Ehsaas",
        src: "Song/song1.mp3",
        image: "Cover/Song1-art.jpg"
    },
    {
        title: "Jugarfiya",
        src: "Song/song2.mp3",
        image: "Cover/Song2-art.jpg"
    },
    {
        title: "Die with a smile",
        src: "Song/song3.mp3",
        image: "Cover/Song3-art.jpg"
    },
    {
        title: "Finding her",
        src: "Song/song4.mp3",
        image: "Cover/Song4-art.jpg"
    },
    {
        title: "Pal pal",
        src: "Song/song5.mp3",
        image: "Cover/Song5-art.jpg"
    },
    {
        title: "Kya hua tera wada",
        src: "Song/song6.mp3",
        image: "Cover/Song6-art.jpg"
    },
    {
        title: "Itna mujhe pyaar badha",
        src: "Song/song7.mp3",
        image: "Cover/Song7-art.jpg"
    },
    {
        title: "Aaj bhi",
        src: "Song/song8.mp3",
        image: "Cover/Song8-art.jpg"
    },
    {
        title: "Decay",
        src: "Song/song9.mp3",
        image: "Cover/Song9-art.jpg"
    },
    {
        title: "Azul",
        src: "Song/song10.mp3",
        image: "Cover/Song10-art.jpg"
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
const frequencyWave = document.querySelector(".frequency-wave"); // NEW: Get the wave element
const body = document.body;

let currentSongIndex = 0;
let isPlaying = false;
let heartInterval; // Variable to store the interval for hearts

// Function to create and animate a single heart image
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-image');
    
    const heartImage = Math.random() < 0.5 ? 'animation1.jpg' : 'animation2.jpg';
    heart.style.backgroundImage = `url('${heartImage}')`;

    const startX = Math.random() * 100;
    heart.style.left = `${startX}vw`;

    const size = Math.random() * 30 + 30;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    
    body.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

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
        body.classList.remove('background-animation');
        frequencyWave.classList.remove('playing'); // Stop wave animation
        clearInterval(heartInterval);
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        body.classList.add('background-animation');
        frequencyWave.classList.add('playing'); // Start wave animation
        heartInterval = setInterval(createHeart, 150);
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

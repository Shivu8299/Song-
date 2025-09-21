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
const body = document.body;

let currentSongIndex = 0;
let isPlaying = false;
let heartInterval; // Variable to store the interval for hearts

// Function to create and animate a single heart image
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-image'); // New class for image hearts
    
    // Randomly choose between animation1.jpg and animation2.jpg
    const heartImage = Math.random() < 0.5 ? 'Cover/animation1.jpg' : 'Cover/animation2.jpg';
    heart.style.backgroundImage = `url('${heartImage}')`;

    // Randomize starting position horizontally
    const startX = Math.random() * 100; // 0-100vw
    heart.style.left = `${startX}vw`;

    // Randomize initial size for variation
    const size = Math.random() * 30 + 30; // Hearts between 30px and 60px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    
    // Set unique animation duration for a natural look
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's'; // Between 6s and 10s
    
    // Add heart to body
    body.appendChild(heart);

    // Remove heart after its animation ends to prevent memory leak
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
        body.classList.remove('background-animation'); // Stop background color animation
        clearInterval(heartInterval); // Stop creating hearts
    } else {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        body.classList.add('background-animation'); // Start background color animation
        // Start creating hearts every 150ms
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

const artistInfo = {
    "sonu-nigam": {
        name: "Sonu Nigam",
        img: "assets/sonu-nigam.jpg",
        followers: "10,239,177 monthly listeners",
        bio: "Sonu Nigam is one of India's most versatile playback singers, known for his soulful voice and numerous Bollywood hits."
    },
    "atif-aslam": {
        name: "Atif Aslam",
        img: "assets/atif-aslam.jpg",
        followers: "8,120,000 monthly listeners",
        bio: "Atif Aslam is a Pakistani singer and actor, famous for his powerful vocals and chart-topping Bollywood songs."
    },
    "kk": {
        name: "KK",
        img: "assets/kk.jpg",
        followers: "7,500,000 monthly listeners",
        bio: "KK (Krishnakumar Kunnath) was an acclaimed Indian playback singer, celebrated for his emotive voice and timeless hits."
    },
    "arijit-singh": {
        name: "Arijit Singh",
        img: "assets/Arjit.png",
        followers: "15,000,000 monthly listeners",
        bio: "Arijit Singh is one of the most popular Indian singers, known for his soulful and romantic tracks in Bollywood."
    }
};

const audio = document.getElementById('main-audio');
window.addEventListener('DOMContentLoaded', () => {
    audio.volume = 0.7;
});

const playPauseBtn = document.getElementById('play-pause-btn');
let isPlaying = false;
const playPauseIcon = playPauseBtn.querySelector('svg');

function setPlayPauseIcon(isPlaying) {
    playPauseIcon.innerHTML = isPlaying
        ? `<image href="assets/pause_icon.png" width="16" height="16" />`
        : `<image href="assets/player_icon3.png" width="16" height="16" />`;
}

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        setPlayPauseIcon(true);
    } else {
        audio.pause();
        isPlaying = false;
        setPlayPauseIcon(false);
    }
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    setPlayPauseIcon(false);
});

setPlayPauseIcon(false);

const playBtn = document.getElementById('play-btn');
playBtn.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    setPlayPauseIcon(true);
});

const progressFill = document.getElementById('progress-fill');
const currentTimeSpan = document.getElementById('current-time');
const totalTimeSpan = document.getElementById('total-time');
audio.addEventListener('loadedmetadata', () => {
    totalTimeSpan.textContent = formatTime(audio.duration);
});
audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = percent + '%';
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});
function formatTime(sec) {
    sec = Math.floor(sec);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
}

const muteBtn = document.getElementById('mute-btn');
muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
});

document.querySelector('.progress-bar').addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audio.currentTime = percent * audio.duration;
});

document.querySelector('.volume-bar').addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = x / rect.width;
    audio.volume = percent;
    document.getElementById('volume-fill').style.width = (percent * 100) + '%';
});

const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingArtist = document.getElementById('now-playing-artist');
const nowPlayingImg = document.getElementById('now-playing-img');
const playerSongImg = document.getElementById('player-song-img');
const playerSongTitle = document.getElementById('player-song-title');
const playerSongArtist = document.getElementById('player-song-artist');
const topResultImg = document.getElementById('top-result-img');
const topResultTitle = document.getElementById('top-result-title');
const topResultArtist = document.getElementById('top-result-artist');

const aboutArtistImg = document.getElementById('about-artist-img');
const aboutArtistName = document.getElementById('about-artist-name');
const aboutArtistFollowers = document.getElementById('about-artist-followers');
const aboutArtistBio = document.getElementById('about-artist-bio');

function updateAboutArtist(artistKey) {
    if (artistInfo[artistKey]) {
        aboutArtistImg.src = artistInfo[artistKey].img;
        aboutArtistImg.alt = artistInfo[artistKey].name;
        aboutArtistName.textContent = artistInfo[artistKey].name;
        aboutArtistFollowers.textContent = artistInfo[artistKey].followers;
        aboutArtistBio.textContent = artistInfo[artistKey].bio;
    } else {
        aboutArtistImg.src = "assets/sonu-nigam.jpg";
        aboutArtistImg.alt = "Sonu Nigam";
        aboutArtistName.textContent = "Sonu Nigam";
        aboutArtistFollowers.textContent = "10,239,177 monthly listeners";
        aboutArtistBio.textContent = "Sonu Nigam is one of India's most versatile playback singers, known for his soulful voice and numerous Bollywood hits.";
    }
}

document.querySelectorAll('.song-item .song-name').forEach(songNameEl => {
    songNameEl.addEventListener('click', function () {
        const songItem = this.closest('.song-item');
        const src = songItem.getAttribute('data-src');
        const title = songItem.getAttribute('data-title');
        const artist = songItem.getAttribute('data-artist');
        const img = songItem.getAttribute('data-img');
        const duration = songItem.getAttribute('data-duration');
        const artistKey = songItem.getAttribute('data-artist-key');

        if (audio.src !== location.origin + '/' + src && audio.src !== src) {
            audio.src = src;
        }
        audio.currentTime = 0;
        audio.play();

        nowPlayingTitle.textContent = title;
        nowPlayingArtist.textContent = artist;
        nowPlayingImg.src = img;

        playerSongImg.src = img;
        playerSongTitle.textContent = title;
        playerSongArtist.textContent = artist;

        topResultImg.src = img;
        topResultTitle.textContent = title;
        topResultArtist.textContent = "Song • " + artist;

        if (duration) {
            totalTimeSpan.textContent = formatTime(duration);
        }

        updateAboutArtist(artistKey);
    });
});

updateAboutArtist("sonu-nigam");

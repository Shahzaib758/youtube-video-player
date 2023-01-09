const video = document.querySelector("video");
const videoContainer = document.querySelector(".video-container");

const playPauseButton = document.querySelector(".play-pause-btn");
const theaterButton = document.querySelector(".theater-btn");
const fullScreenButton = document.querySelector(".full-screen-btn");
const miniPlayerButton = document.querySelector(".mini-player-btn");

const muteButton = document.querySelector(".mute-btn");
const volumeSlider = document.querySelector(".volume-slider");


function togglePlay() {
    video.paused ? video.play() : video.pause();
}

// Play/Pause
playPauseButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

window.addEventListener("keydown", e => {
    // for active element using tab

    const tagName = document.activeElement.tagName;
    if (tagName === "input") return;


    switch (e.key.toLowerCase()) {
        case " ":
            if (tagName === "button") return;
        case "k":
            togglePlay();
            break;

        case "f":
            toggleFullScreenMode();
            break;

        case "t":
            toggleTheaterMode();
            break;
        case "m":
            toggleMute();
            break;
    }

    if (e.key === "k" || e.key === " ") {

    } else {
        return;
    }
})

video.addEventListener("play", () => {
    videoContainer.classList.remove("pause");
})

video.addEventListener("pause", () => {
    videoContainer.classList.add("pause");
})


// Mute

muteButton.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", e => {
    video.volume = e.target.value;
    video.muted = e.target.value == 0;
})

function toggleMute() {
    video.muted = !video.muted;
}

video.addEventListener("volumechange", _ => {
    let volumeLevel;

    volumeSlider.value = video.volume;

    if (volumeSlider.vlaue === 0 || video.muted) {
        volumeLevel = `muted`;
        volumeSlider.value = 0;
    } else if (video.volume >= 0.5) {
        volumeLevel = `high`;

    } else {
        volumeLevel = "low";
    }
    videoContainer.dataset.volumeLevel = volumeLevel
})


// View Mode
theaterButton.addEventListener("click", toggleTheaterMode);
fullScreenButton.addEventListener("click", toggleFullScreenMode);
miniPlayerButton.addEventListener("click", toggleMiniPlayerMode);

function toggleTheaterMode() {
    videoContainer.classList.toggle("theater");
}

function toggleFullScreenMode() {
    // if document.fullscreenElement is returning null then it is in full screen mode
    if (document.fullscreenElement === null) {
        videoContainer.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    videoContainer.classList.toggle("full-screen", document.fullscreenElement)
})


function toggleMiniPlayerMode() {
    if (videoContainer.classList.contains("mini-player")) {
        document.exitPictureInPicture();
    } else {
        video.requestPictureInPicture();
    }
}

video.addEventListener("enterpictureinpicture", () => {
    videoContainer.classList.add("mini-player");
})

video.addEventListener("leavepictureinpicture", () => {
    videoContainer.classList.remove("mini-player");
})
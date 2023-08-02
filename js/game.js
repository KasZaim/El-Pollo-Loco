let keyboard = new Keyboard();
let canvas;
let world;
let globalVolume = 0.2;
let intervalIds = [];
gameStop = false;
gameMute = false;

BACKGROUND_MUSIC = new Audio('audio/Background-music.mp3');
GAMEOVER_MUSIC = new Audio('audio/game-over.mp3');
GAMEWON_MUSIC = new Audio('audio/won.mp3');
WALKING_SOUND = new Audio('audio/Walking.mp3');
HIT_SOUND = new Audio('audio/ouch.mp3');
DEAD_SOUND = new Audio('audio/dead-sound.mp3');

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push({ id, fn, time });
}

function clearStoppableIntervals() {
    intervalIds.forEach((interval) => clearInterval(interval.id));
    BACKGROUND_MUSIC.pause();
}

function continueGame() {
    intervalIds.forEach((interval) => {
        const { fn, time } = interval;
        setStoppableInterval(fn, time);
    });
    BACKGROUND_MUSIC.play();
}
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    showGameOver();
}
function init() {
    detectPhonePosition();
    loadDesktopControlEvents();
    loadMobileControlEvents();
}
function showStartScreen() {
    let muteBtn = document.getElementById('mute-btn');
    let fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.style.cssText = 'background: content-box; right: 5px;'
    muteBtn.style.cssText = 'background: content-box; right: 70px; left: unset;';
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('start-screen').classList.add('d-none');
}

function startGame() {
    initLevel();
    initGame();
    showStartScreen();
    BACKGROUND_MUSIC.volume = globalVolume;
    BACKGROUND_MUSIC.play();

}

function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, this)

    console.log('My Character is', world.character)
}

function playSoundVolume() {
    if (gameMute) {
        return 0;
    } else {
        return 0.3;
    }
}

function mute() {
    let muteImg = document.getElementById('mute-img');
    if (globalVolume == 0) {
        globalVolume = 0.2;
        muteImg.src = 'img/ICONS/speaker-48.png';
        gameMute = false;
    } else {
        globalVolume = 0;
        muteImg.src = 'img/ICONS/mute-2-48.png';
        gameMute = true;
    }
    setVolumeOfSounds(globalVolume);
}
function setVolumeOfSounds(globalVolume) {
    BACKGROUND_MUSIC.volume = globalVolume;
    GAMEOVER_MUSIC.volume = globalVolume;
    GAMEWON_MUSIC.volume = globalVolume;
    WALKING_SOUND.volume = globalVolume;
    HIT_SOUND.volume = globalVolume;
    DEAD_SOUND.volume = globalVolume;
}

function openFullScreen() {
    let content = document.getElementById('content');
    if (content.requestFullscreen) {
        content.requestFullscreen();
    } else if (content.mozRequestFullScreen) {
        content.mozRequestFullScreen();
    } else if (content.webkitRequestFullscreen) {
        content.webkitRequestFullscreen();
    } else if (content.msRequestFullscreen) {
        content.msRequestFullscreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

function toggleFullScreen() {
    let fullscreenIcon = document.getElementById("fullscreen-icon");
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        exitFullScreen();
        fullscreenIcon.src = "img/ICONS/fit-to-width-64.png";
    } else {
        openFullScreen();
        fullscreenIcon.src = "img/ICONS/fullscreen-exit-48.png";
    }
}

function detectPhonePosition() {
    window.addEventListener("resize", function () {
        document.getElementById('rotate-device').classList.add('d-none');
        document.getElementById('tutorial').classList.remove('d-none');
        document.getElementById('overlay-bottom').classList.add('d-none');
        addResponsiveDesign();
    });
}
function addResponsiveDesign(){
    if (window.innerWidth < 1000) {
        document.getElementById('tutorial').classList.add('d-none');
        if (window.matchMedia("(orientation: landscape)").matches && window.innerWidth < 950) {
            document.getElementById('overlay-bottom').classList.remove('d-none');

        } else if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 950) {
            document.getElementById('overlay-bottom').classList.add('d-none');
            document.getElementById('rotate-device').classList.remove('d-none');
        }
    }
}

function showGameOver() {
    BACKGROUND_MUSIC.pause();
    GAMEOVER_MUSIC.currentTime = 13;
    GAMEOVER_MUSIC.volume = globalVolume;
    if (world.character.gameOver) {
        showGameLostScreen();
    } else {
        showYouWonScreen();
    }
    gameStop = true;
}
function showGameLostScreen() {
    let youLost = document.getElementById('you-lost');
    youLost.classList.remove('fade-out');
    youLost.classList.add('fade-in');
    GAMEOVER_MUSIC.play();
}
function showYouWonScreen() {
    let gameOver = document.getElementById('you-won');
    gameOver.classList.remove('fade-out');
    gameOver.classList.add('fade-in');
    GAMEWON_MUSIC.play();
}
function restartGame() {
    location.reload();
}


let keyboard = new Keyboard();
let canvas;
let world;
let globalVolume = 0.2;
let intervalIds = [];
gameStop = false;
BACKGROUND_MUSIC = new Audio('audio/Background-music.mp3');
GAMEOVER_MUSIC = new Audio('audio/game-over.mp3');
GAMEWON_MUSIC = new Audio('audio/won.mp3');


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
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('fullscreen-btn').style.background = 'content-box';
    document.getElementById('fullscreen-btn').style.right = '5px'
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
function loadDesktopControlEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (e.keyCode == 32 && !keyboard.SPACE) {
            keyboard.SPACE = true;
            world.checkThrowObject();
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }
    });
}

function loadMobileControlEvents() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!keyboard.SPACE) {
            keyboard.SPACE = true;
            world.checkThrowObject();
        }
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
}

function mute() {
    if (globalVolume == 0) {
        globalVolume = 0.2;
        document.getElementById('mute-img').src = 'img/ICONS/speaker-48.png';
    } else {
        globalVolume = 0;
        document.getElementById('mute-img').src = 'img/ICONS/mute-2-48.png';
    }
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
        if (window.innerWidth < 1000) {
            if (window.matchMedia("(orientation: landscape)").matches && window.innerWidth < 950) {
                document.getElementById('overlay-bottom').classList.remove('d-none');
                document.getElementById('tutorial').classList.add('d-none');
            } else if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 950) {
                document.getElementById('overlay-bottom').classList.add('d-none');
                document.getElementById('rotate-device').classList.remove('d-none');
            }
        }
    });
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


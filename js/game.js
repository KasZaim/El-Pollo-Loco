let canvas;
let keyboard = new Keyboard();
let world;
BACKGROUND_MUSIC = new Audio('audio/Background-music.mp3');
let globalVolume = 0.2;
gameStop = false;


function init() {
    detectPhonePosition();
    loadDesktopControlEvents();
    loadMobileControlEvents();
}
function showStartScreen(){
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('fullscreen-btn').style.background = 'content-box';
    document.getElementById('fullscreen-btn').style.right = '5px'
}

function startGame() {
    
    initLevel();
    initGame();
    
    showStartScreen();
    this.BACKGROUND_MUSIC.volume = globalVolume;
    this.BACKGROUND_MUSIC.play();
    
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
        globalVolume = 0.3;
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
        if (window.innerWidth < 1000) {
            if (window.matchMedia("(orientation: landscape)").matches) {
                // Landscape mode
                document.getElementById('overlay-bottom').classList.remove('d-none');
            } else {
                // Portrait mode
                document.getElementById('overlay-bottom').classList.add('d-none');
            }
        }
    });
}

function showGameOver(){
    let gameOver = document.getElementById('game-over');
    let youLost = document.getElementById('you-lost');
    if (world.character.gameOver) {
        youLost.classList.remove('d-none');
    } else {
        gameOver.classList.remove('d-none');
    }
    gameStop = true;
}


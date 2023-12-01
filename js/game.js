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

/**
 * Sets a stoppable interval that executes the given function repeatedly at the specified time interval.
 * @param {Function} fn - The function to be executed.
 * @param {number} time - The time interval for the function execution in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push({ id, fn, time });
}
/**
 * Clears all previously set stoppable intervals.
 */
function clearStoppableIntervals() {
    intervalIds.forEach((interval) => clearInterval(interval.id));
    BACKGROUND_MUSIC.pause();
}
/**
 * Continues the game by resuming previously set stoppable intervals and playing background music.
 */
function continueGame() {
    intervalIds.forEach((interval) => {
        const { fn, time } = interval;
        setStoppableInterval(fn, time);
    });
    BACKGROUND_MUSIC.play();
}
/**
 * Clears all intervals and stops the game.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
    showGameOver();
}
/**
 * Initializes the game by detecting the device type and loading the respective control events.
 */
function init() {
    // detectPhonePosition();
    loadDesktopControlEvents();
    loadMobileControlEvents();
}
/**
 * Shows the start screen and hides the overlay and start screen elements.
 */
function showStartScreen() {
    let muteBtn = document.getElementById('mute-btn');
    let fullscreenBtn = document.getElementById('fullscreen-btn');
    fullscreenBtn.style.cssText = 'background: content-box; right: 5px;'
    muteBtn.style.cssText = 'background: content-box; right: 70px; left: unset;';
    document.getElementById('overlay').classList.add('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('overlay-bottom').style.display='flex';
    
}
/**
 * Starts the game by initializing the level, game, and playing the background music.
 */
function startGame() {
    initLevel();
    initGame();
    showStartScreen();
    BACKGROUND_MUSIC.volume = globalVolume;
    BACKGROUND_MUSIC.play();

}
/**
 * Initializes the game and sets the canvas and world.
 */
function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, this)

    console.log('My Character is', world.character)
}
/**
 * Sets the volume level for sounds based on the global volume setting.
 * @returns {number} - The volume level for sounds.
 */
function playSoundVolume() {
    if (gameMute) {
        return 0;
    } else {
        return 0.3;
    }
}
/**
 * Toggles the game's mute state and adjusts the volume of sounds accordingly.
 */
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
/**
 * Sets the volume level for all sounds based on the global volume setting.
 * @param {number} globalVolume - The volume level for all sounds.
 */
function setVolumeOfSounds(globalVolume) {
    BACKGROUND_MUSIC.volume = globalVolume;
    GAMEOVER_MUSIC.volume = globalVolume;
    GAMEWON_MUSIC.volume = globalVolume;
    WALKING_SOUND.volume = globalVolume;
    HIT_SOUND.volume = globalVolume;
    DEAD_SOUND.volume = globalVolume;
}
/**
 * Requests and opens the fullscreen mode for the game.
 */
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
/**
 * Exits the fullscreen mode if it's active.
 */
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}
/**
 * Toggles between fullscreen and normal mode and updates the fullscreen icon accordingly.
 */
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
/**
 * Detects the phone's orientation and adds responsive design elements based on the screen size and orientation.
 */
// function detectPhonePosition() {
//     window.addEventListener("resize", function () {
//         document.getElementById('rotate-device').classList.add('d-none');
//         document.getElementById('tutorial').classList.remove('d-none');
//         document.getElementById('overlay-bottom').classList.add('d-none');
//         addResponsiveDesign();
//     });
// }
/**
 * Adds responsive design elements based on the screen size and orientation.
 */
// function addResponsiveDesign(){
//     if (window.innerWidth < 1000) {
//         document.getElementById('tutorial').classList.add('d-none');
//         if (window.matchMedia("(orientation: landscape)").matches && window.innerWidth < 950) {
//             document.getElementById('overlay-bottom').classList.remove('d-none');

//         } else if (window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 950) {
//             document.getElementById('overlay-bottom').classList.add('d-none');
//             document.getElementById('rotate-device').classList.remove('d-none');
//         }
//     }
// }
/**
 * Shows the game over screen based on whether the character has won or lost the game.
 */
function showGameOver() {
    BACKGROUND_MUSIC.pause();
    GAMEOVER_MUSIC.currentTime = 13;
    GAMEOVER_MUSIC.volume = globalVolume;
    document.getElementById('overlay-bottom').classList.add('d-none')
    if (world.character.gameOver) {
        showGameLostScreen();
    } else {
        showYouWonScreen();
        
    }
    gameStop = true;
}
/**
 * Shows the "you lost" screen when the character loses the game.
 */
function showGameLostScreen() {
    let youLost = document.getElementById('you-lost');
    youLost.classList.remove('fade-out');
    youLost.classList.add('fade-in');
    GAMEOVER_MUSIC.play();
}
/**
 * Shows the "you won" screen when the character wins the game.
 */
function showYouWonScreen() {
    let gameOver = document.getElementById('you-won');
    gameOver.classList.remove('fade-out');
    gameOver.classList.add('fade-in');
    GAMEWON_MUSIC.play();
}
/**
 * Restarts the game by reloading the page.
 */
function restartGame() {
    location.reload();
}


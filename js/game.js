let canvas;
let keyboard = new Keyboard();
let world;
BACKGROUND_MUSIC = new Audio('audio/Background-music.mp3');


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyboard)

    console.log('My Character is', world.character)
}
function startGame(){
    document.getElementById('start-screen').classList.add('d-none');
    initLevel();
    this.BACKGROUND_MUSIC.volume = 0.7;
    this.BACKGROUND_MUSIC.play();
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38){
        keyboard.UP = true;
    }
    if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = false;
    }
});
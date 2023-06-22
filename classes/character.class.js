class Character extends MovableObject {
    height = 280;
    width = 180;
    y = 150;
    speed = 10;
    IMAGES_PEPE_WALKING = [
        '/img/2_character_pepe/2_walk/W-21.png',
        '/img/2_character_pepe/2_walk/W-22.png',
        '/img/2_character_pepe/2_walk/W-23.png',
        '/img/2_character_pepe/2_walk/W-24.png',
        '/img/2_character_pepe/2_walk/W-25.png',
        '/img/2_character_pepe/2_walk/W-26.png'
    ];
    walking_sound = new Audio('audio/Walking.mp3');

    world;

    constructor() {
        super().loadImg('/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_PEPE_WALKING)

        this.animate();
    }
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.World.keyboard.RIGHT && this.x < this.World.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.World.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.World.camera_x = -this.x +100;
        }, 1000 / 60)

        setInterval(() => {
            if (this.World.keyboard.RIGHT || this.World.keyboard.LEFT) {

                //Walking animation
                this.playAnimation(this.IMAGES_PEPE_WALKING)
            }
        }, 40);
    }

    jump() {

    }
}
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

    world;

    constructor() {
        super().loadImg('/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_PEPE_WALKING)

        this.animate();
    }
    animate() {
        setInterval(() => {
            if (this.World.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }
            if (this.World.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
        }, 1000 / 60)

        setInterval(() => {
            if (this.World.keyboard.RIGHT || this.World.keyboard.LEFT) {

                //Walking animation
                let i = this.currrentImage % this.IMAGES_PEPE_WALKING.length;
                let path = this.IMAGES_PEPE_WALKING[i];
                this.img = this.imageCache[path];
                this.currrentImage++;
            }
        }, 40);
    }

    jump() {

    }
}
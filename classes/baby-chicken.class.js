class BabyChicken extends chicken{
    y = 340;
    x = 600;
    height = 90;
    width = 90;
    energy = 100;
    IMAGES_ENEMIES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    offset = {
        x: 10,
        y: 10,
        width:10,
        height: 10 
    };

    IMAGE_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
    CHICKEN_DEAD_SOUND = new Audio('audio/chick tweeting.mp3');

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_ENEMIES_WALKING);
        this.x = this.x + Math.random() * 1200;
        this.speed = 0.20 + Math.random() * 0.3;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ENEMIES_WALKING)
        }, 200)
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

        setInterval(() => {
            if (this.isDead() == true) {
                this.playAnimation(this.IMAGE_DEAD);
            }
        }, 100);
    }
}
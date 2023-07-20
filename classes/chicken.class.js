class chicken extends MovableObject {
    y = 320;
    x = 1200;
    height = 110;
    width = 110;
    energy = 100;
    IMAGES_ENEMIES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGE_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
    CHICKEN_DEAD_SOUND = new Audio('audio/chicken-dead.mp3');
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_ENEMIES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = this.x + Math.random() * 3000;
        this.speed = 0.20 + Math.random() * 0.3
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 20)
        
        // setStoppableInterval(this.moveLeft(), 1000/60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_ENEMIES_WALKING)
            if (this.isDead() == true) {
                this.playAnimation(this.IMAGE_DEAD);
            }
        }, 200)
        
    }
}
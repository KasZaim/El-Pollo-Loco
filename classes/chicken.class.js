class chicken extends MovableObject {
    y = 320;
    x = 400;
    height = 110;
    width = 110;
    IMAGES_ENEMIES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_ENEMIES_WALKING)
        this.x = this.x + Math.random() * 2000;
        this.speed = 0.20 + Math.random() * 0.3
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ENEMIES_WALKING)
        }, 200)
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)

    }
}
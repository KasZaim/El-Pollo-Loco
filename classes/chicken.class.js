/**
 * Represents the Chicken class that extends MovableObject.
 */
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
    /**
     * Move the chicken to the left.
     * This function is used in the animation loop.
     */
    moveLeftFn() {
        if (this.isDead()) return;
        this.moveLeft();
    }
    /**
     * Play the walking animation and, if dead, play the death animation.
     * This function is used in the animation loop.
     */

    playAnimationFn() {
        this.playAnimation(this.IMAGES_ENEMIES_WALKING)
        if (this.isDead()) {
            this.playAnimation(this.IMAGE_DEAD);
        }
    }
     /**
     * Animate the chicken's movement and appearance.
     * This function sets up stoppable intervals for movement and animation.
     */
    animate() {
        setStoppableInterval(this.moveLeftFn.bind(this), 1000 / 60);
        setStoppableInterval(this.playAnimationFn.bind(this), 200);
    }
}
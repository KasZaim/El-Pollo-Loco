class ThrowableObjects extends MovableObject {

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    IMAGE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    bottleDestroyed = false;

    constructor(x, y) {
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 90;
        this.throw();
        this.acceleration = 3;
    }

    throw() {
        this.speedY = 22;
        this.applyGravity();
        this.animate();
    }

    animate() {
        this.x += 5;
        this.playAnimation(this.IMAGES)
        if (this.bottleDestroyed) {
            this.splash();
            
        } else {
            requestAnimationFrame(() => this.animate());
        }
        
    }
    splash() {
        this.playAnimation(this.IMAGE_SPLASH);
            setTimeout(() => {
                this.splash();
            }, 1000);
    }
}
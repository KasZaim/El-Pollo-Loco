class Character extends MovableObject {

    IMAGES_PEPE_WALKING = [
        '/img/2_character_pepe/2_walk/W-21.png',
        '/img/2_character_pepe/2_walk/W-22.png',
        '/img/2_character_pepe/2_walk/W-23.png',
        '/img/2_character_pepe/2_walk/W-24.png',
        '/img/2_character_pepe/2_walk/W-25.png',
        '/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        '/img/2_character_pepe/3_jump/J-31.png',
        '/img/2_character_pepe/3_jump/J-32.png',
        '/img/2_character_pepe/3_jump/J-33.png',
        '/img/2_character_pepe/3_jump/J-34.png',
        '/img/2_character_pepe/3_jump/J-35.png',
        '/img/2_character_pepe/3_jump/J-36.png',
        '/img/2_character_pepe/3_jump/J-37.png',
        '/img/2_character_pepe/3_jump/J-38.png',
        '/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    walking_sound = new Audio('audio/Walking.mp3');
    HIT_SOUND = new Audio('audio/ouch.mp3');
    height = 240;
    width = 150;
    y = 190;
    speed = 10;
    energy = 100;
    collectedBottles = 0;
    

    constructor() {
        super().loadImg('/img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_PEPE_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.World.keyboard.RIGHT && this.x < this.World.level.level_end_x) {
                this.moveRight();
                this.walking_sound.play();
            }
            if (this.World.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }
            if (this.World.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }
            this.World.camera_x = -this.x + 100;
        }, 1000 / 60)

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            }
            else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
            else {
                if (this.World.keyboard.RIGHT || this.World.keyboard.LEFT) {
                    //Walking animation
                    this.playAnimation(this.IMAGES_PEPE_WALKING);
                }
            }

        }, 50);
    }

}
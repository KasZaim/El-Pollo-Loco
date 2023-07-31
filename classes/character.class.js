class Character extends MovableObject {

    IMAGES_PEPE_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
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
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    
    height = 240;
    width = 150;
    y = 190;
    speed = 9;
    energy = 100;
    collectedBottles = 0;
    state = "IDLE";
    isJumping = false;
    isDeadSoundPlayed = false;
    time = new Date().getTime();
    offset = {
        x: 20,
        y: 94,
        width: 30,
        height: 5
    };


    constructor() {
        super().loadImg('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_PEPE_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }
    moveRightFn() {
        if (this.World.keyboard.RIGHT && this.x < this.World.level.level_end_x) {
            this.moveRight();
            WALKING_SOUND.play();
        }
    }

    moveLeftFn() {
        if (this.World.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            WALKING_SOUND.play();
        }
    }

    jumpFn() {
        if (this.World.keyboard.UP && !this.isAboveGround() && !this.isJumping) {
            this.jump();
            this.isJumping = true;
            WALKING_SOUND.pause();
        } else if (!this.World.keyboard.UP) {
            this.isJumping = false;
        }
    }

    animate() {
        setStoppableInterval(this.moveRightFn.bind(this), 1000 / 60);
        setStoppableInterval(this.moveLeftFn.bind(this), 1000 / 60);
        setStoppableInterval(this.jumpFn.bind(this), 1000 / 60);
        
        setStoppableInterval(() => {
            this.World.camera_x = -this.x + 50;
        }, 1000 / 60);
        
        setStoppableInterval(() => {
           WALKING_SOUND.pause();
        }, 200);

        setStoppableInterval(() => {
            if (this.isDead() && !this.isDeadSoundPlayed) {
                DEAD_SOUND.play();
                this.isDeadSoundPlayed = true;
                this.state = "DEAD";
                this.gameOver = true;
                this.playAnimation(this.IMAGES_DEAD);
                setInterval(() => {
                    this.y+=6; 
                },1000/60);

            } else if (this.isHurt()) {
                this.state = "HURT";
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                if (this.state != "JUMPING") {
                    this.state = "JUMPING";
                    this.currrentImage = 0;
                }
                if (this.currrentImage < 7) {
                    this.playAnimation(this.IMAGES_JUMPING);
                }
            } else if (this.World.keyboard.RIGHT || this.World.keyboard.LEFT) {
                this.state = "WALKING";
                this.playAnimation(this.IMAGES_PEPE_WALKING);
            }
        }, 100);

        setStoppableInterval(() => {
            if (
                !this.World.keyboard.RIGHT ||
                !this.World.keyboard.LEFT ||
                !this.isAboveGround() ||
                !this.isHurt()
            ) {
                if (
                    this.World.keyboard.RIGHT ||
                    this.World.keyboard.LEFT ||
                    this.World.keyboard.UP
                ) {
                    this.time = new Date().getTime(); // Zeit zurücksetzen
                }

                let passedTime = new Date().getTime() - this.time;
                passedTime = passedTime / 1000;

                if (passedTime > 4) {
                    this.playAnimation(this.IMAGES_IDLE);
                    this.state = "IDLE";
                }
                if (passedTime > 8) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                    this.state = "IDLE";
                }
            }
        }, 1000);
    }
}

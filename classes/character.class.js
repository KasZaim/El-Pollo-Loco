/**
 * A class representing a character that extends from MovableObject.
 */
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
    flipBottle = false;
    state = "IDLE";
    isJumping = false;
    isDeadSoundPlayed = false;
    time = 0;
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
        this.time = new Date().getTime();
    }
    /**
 * Moves the character to the right if the right key is pressed.
 * Plays the walking sound while moving.
 */
    moveRightFn() {
        if (this.World.keyboard.RIGHT && this.x < this.World.level.level_end_x) {
            this.moveRight();
            WALKING_SOUND.play();
        }
    }
    /**
     * Moves the character to the left if the left key is pressed.
     * Sets the character's otherDirection and flipBottle properties to true.
     * Plays the walking sound while moving.
     */
    moveLeftFn() {
        if (this.World.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.flipBottle = true;
            WALKING_SOUND.play();
        }
    }
    /**
     * Makes the character jump if the up key is pressed and it is not above the ground.
     * Pauses the walking sound while jumping.
     * Resets the isJumping property if the up key is not pressed.
     */
    jumpFn() {
        if (this.World.keyboard.UP && !this.isAboveGround() && !this.isJumping) {
            this.jump();
            this.isJumping = true;
            WALKING_SOUND.pause();
        } else if (!this.World.keyboard.UP) {
            this.isJumping = false;
        }
    }
    /**
     * Animates the character based on its current state and input from the keyboard.
     */
    animate() {
        setStoppableInterval(this.moveRightFn.bind(this), 1000 / 60);
        setStoppableInterval(this.moveLeftFn.bind(this), 1000 / 60);
        setStoppableInterval(this.jumpFn.bind(this), 1000 / 60);

        /**
        * Sets a stoppable interval to update the camera position on the x-axis based on the character's position.
        */
        setStoppableInterval(() => {
            this.World.camera_x = -this.x + 50;
        }, 1000 / 60);

        /**
         * Sets a stoppable interval to pause the walking sound after a certain duration.
         */
        setStoppableInterval(() => {
            WALKING_SOUND.pause();
        }, 200);


        // Sets a stoppable interval to update the character's animation based on its state and input from the keyboard.
        setStoppableInterval(() => {
            if (this.isDead() && !this.isDeadSoundPlayed) {
                // If the character is dead and the dead sound hasn't been played yet, play the dead animation.
                this.playDeadAnimation();
            } else if (this.isHurt()) {
                // If the character is hurt, set its state to "HURT" and play the hurt animation.
                this.state = "HURT";
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                // If the character is above the ground (jumping), play the jump animation.
                this.playJumpAnimation();
            } else if (this.World.keyboard.RIGHT || this.World.keyboard.LEFT) {
                // If the right or left keys are pressed, set the character's state to "WALKING" and play the walking animation and sound.
                this.state = "WALKING";
                this.playAnimation(this.IMAGES_PEPE_WALKING);
            } else {
                // If no other condition is met, set the character's state to "IDLE" and play the idle animation.
                this.state = "IDLE";
                this.playAnimation(this.IMAGES_IDLE);
            }
            this.chekIfCharacterIsSleeping; 
        }, 100);

    }

    chekIfCharacterIsSleeping() {
        let currentTime = new Date().getTime();
        let passedTime = (currentTime - this.time) / 1000;
        if (!this.World.keyboard.RIGHT && !this.World.keyboard.LEFT && !this.isJumping && !this.isAboveGround()) {
            if (passedTime > 5 && this.state !== "LONG_IDLE") {
                this.state = "LONG_IDLE";
                this.playAnimation(this.IMAGES_LONG_IDLE);
            }
        } else {
            this.time = currentTime;
        }
    }
    playDeadAnimation() {
        DEAD_SOUND.play();
        this.isDeadSoundPlayed = true;
        this.state = "DEAD";
        this.gameOver = true;
        this.playAnimation(this.IMAGES_DEAD);
        setInterval(() => {
            this.y += 6;
        }, 1000 / 60);
    }
    playJumpAnimation() {
        if (this.state != "JUMPING") {
            this.state = "JUMPING";
            this.currrentImage = 0;
        }
        if (this.currrentImage < 7 && this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }
}


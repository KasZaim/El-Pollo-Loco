/**
 * A class representing a movable object that extends from DrawableObjects.
 */
class MovableObject extends DrawableObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    gameOver = false;
    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };
    /**
     * Applies gravity to the movable object, making it fall if above the ground.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }
    /**
     * Checks if the movable object is above the ground or not.
     * @returns {boolean} True if the object is above the ground; otherwise, false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObjects) { //throwableobject should always fall
            return true
        }else{
            return this.y < 190
    }}
    
    // x = left
    // y=up 
    // width = right 
    // height = down

    /**
     * Checks if the movable object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the objects are colliding; otherwise, false.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.width > mo.x + mo.offset.x &&
               this.y + this.height - this.offset.height > mo.y + mo.offset.y &&
               this.x + this.offset.x < mo.x + mo.width - mo.offset.x &&
               this.y + this.offset.y < mo.y + mo.height - mo.offset.y; 
    }
    /**
     * Reduces the energy of the movable object when hit and updates the last hit time.
     */
    hitted(){
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }
     /**
     * Checks if the movable object is hurt based on the time passed since the last hit.
     * @returns {boolean} True if the object is hurt; otherwise, false.
     */
    isHurt(){
        let timePassed = new Date().getTime()- this.lastHit;
        timePassed = timePassed / 1000; // wird in Sekunden angezeigt
        return timePassed < 1;
    }
    /**
     * Checks if the movable object is dead (energy is zero).
     * @returns {boolean} True if the object is dead; otherwise, false.
     */
    isDead() {
        return this.energy == 0;
    }
    /**
     * Moves the movable object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }
    /**
     * Moves the movable object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }
    /**
     * Makes the movable object jump by updating its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }
    /**
     * Plays an animation for the movable object by updating its image.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currrentImage % images.length;// wie oft passt images.length in currentimage rein = restwert || z.b 11 % 5 = 1;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currrentImage++;
    }
    
}
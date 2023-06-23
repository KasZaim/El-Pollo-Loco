class MovableObject extends DrawableObjects {
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;
    

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }

        }, 1000 / 25)
    }
    isAboveGround() {
        if (this instanceof ThrowableObjects) { //throwableobject should always fall
            return true
        }else{
            return this.y < 150
    }}

    
    
    isColliding(mo) {
        return this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x &&
        this.y < mo.y + mo.height;
    }
    hitted() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }else{
            this.lastHit = new Date().getTime();
        }
    }
    isHurt(){
        let timePassed = new Date().getTime()- this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }
    isDead() {
        return this.energy == 0;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
    }
    jump() {
        this.speedY = 30;
    }
    playAnimation(images) {
        let i = this.currrentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currrentImage++;
    }
   
}
/**
 * A class representing the game world.
 */
class World {
    ctx;
    canvas;
    game;
    keyboard;
    camera_x = 0;
    level = level1;
    character = new Character();
    endbossBar = new EndbossBar();
    statusBar = new Statusbar();
    coinsBar = new Coinsbar();
    bottlesBar = new Bottlesbar();
    endboss = this.level.endboss[0];
    throwableObjects = [];

    /**
     * Creates a new instance of World.
     * @param {HTMLCanvasElement} canvas - The canvas element used for drawing.
     * @param {Keyboard} keyboard - The keyboard object for handling user input.
     * @param {Game} game - The main game object.
     */
    constructor(canvas, keyboard, game) {
        this.canvas = canvas; //übergibt der canvas; variable den parameter canvas
        this.keyboard = keyboard;
        this.game = game;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
    }
    /**
     * Draws all objects and the background on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // Canvas wird entleert
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        if (this.endboss.hadFirstContact) {
            this.addToMap(this.endbossBar);
        }
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(function () {
            self.draw();
        })
        let self = this;
    }
    /**
     * Adds an array of objects to the canvas to be drawn.
     * @param {Array} objects - The array of objects to be added to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });

    }
    /**
     * Adds a movable object to the canvas to be drawn.
     * @param {MovableObject} mo - The movable object to be added to the canvas.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)}
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx)
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    /**
     * Flips the image of a movable object horizontally on the canvas.
     * @param {MovableObject} mo - The movable object whose image to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }
    /**
     * Restores the image of a movable object after it has been flipped.
     * @param {MovableObject} mo - The movable object whose image to restore.
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
    /**
     * Sets the reference to the World object for the character and endboss.
     */
    setWorld() {
        this.character.World = this;
        this.endboss.world = this;
    }
    /**
     * Starts a interval to check collisions in the game world.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 100);
    }
    /**
     * Checks if the character is falling (moving upwards and not above the ground).
     */
    isFalling() {
        if (this.character.speedY < 0 && this.character.isAboveGround()) {
            return true
        }
    }

    /**
     * Throws a bottle if the character has collected bottles and the endboss is not hurt.
     */
    throwBottle() {
        if (this.character.collectedBottles > 0 && !this.endboss.isHurt()) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles--
            this.bottlesBar.collected -= 10;
            this.bottlesBar.setPercentage(this.bottlesBar.collected);
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies (chickens).
     */
    checkCollisions() {
        this.checkChickenCollision();
        this.checkCollectiblesCollision(this.level.coins, this.coinsBar);
        this.checkCollectiblesCollision(this.level.bottles, this.bottlesBar);
        this.checkEndbossCollision();
        this.checkIfBottleHitChicken();
        this.checkIfBottleHitEndboss();
    }

    /**
     * Checks for collisions between throwable objects and enemies (chickens).
     */
    checkIfBottleHitChicken() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.deleteChickenAfterCollision(enemy);
                    this.deleteBottleAfterCollision(bottle);
                    setTimeout(() => {
                        this.deleteAfterCollected(this.level.enemies, enemy);
                    }, 600);
                }
            });
        });
    }
    /**
     * Checks for collisions between throwable objects and the endboss.
     */
    checkIfBottleHitEndboss() {
        this.level.endboss.forEach((endboss) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(endboss)) {
                    this.deleteBottleAfterCollision(bottle);
                    if (!endboss.isHurt()) {
                        endboss.hitted();
                    }
                    this.stopGameIfEndbossIsDead(endboss);
                    this.endbossBar.setPercentage(this.endboss.energy);
                }
            });
        });
    }
    /**
     * Stops the game if the endboss is dead (game over).
     */
    stopGameIfEndbossIsDead(endboss) {
        if (endboss.isDead()) {
            endboss.speed = 0;
            setTimeout(() => {
                clearAllIntervals();
            }, 1000);
        }
    }
    /**
     * Stops the game if the character is dead (game over).
     */
    stopGameIfCharacterIsDead(){
        if (this.character.gameOver) {
            setTimeout(() => {
                clearAllIntervals();
            }, 1500);
        }
    }
    /**
     * Checks for collisions between the character and chickens.
     */
    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            this.ifCharacterHitChickeninAir(enemy);
            this.ifChickenHitCharacter(enemy);
            this.stopGameIfCharacterIsDead();
        });
    }
    /**
     * Handles the collision between the character and a chicken while the character is in the air.
     * @param {MovableObject} enemy - The chicken object colliding with the character.
     */
    ifCharacterHitChickeninAir(enemy) {
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.isHurt()) {
            this.deleteChickenAfterCollision(enemy);
            this.character.jump();
            setTimeout(() => {
                this.deleteAfterCollected(this.level.enemies, enemy);
            }, 600);
        }
    }
     /**
     * Handles the collision between the character and a chicken while the character is on the ground.
     * @param {MovableObject} enemy - The chicken object colliding with the character.
     */
    ifChickenHitCharacter(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
            if (!this.character.isHurt()) {
                this.character.hitted();
            }
            this.statusBar.setPercentage(this.character.energy);
            HIT_SOUND.play();
        }
    }
    /**
     * Checks for collisions between the character and the endboss.
     */
    checkEndbossCollision() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hitted();
                this.statusBar.setPercentage(this.character.energy)
                HIT_SOUND.play();
            }
        })
    }
    /**
     * Checks for collisions between the character and collectible objects (coins or bottles).
     * @param {Array} collectiblesArray - The array of collectible objects to check collisions with.
     * @param {Statusbar} bar - The status bar associated with the collectible objects.
     */
    checkCollectiblesCollision(collectiblesArray, bar) {
        collectiblesArray.forEach((collectible) => {
            if (this.character.isColliding(collectible)) {
                bar.collected += 10;
                bar.setPercentage(bar.collected);
                this.deleteAfterCollected(collectiblesArray, collectible);
                bar.COLLECTING_SOUND.volume = playSoundVolume();
                bar.COLLECTING_SOUND.play();
                if (collectiblesArray == this.level.bottles) {
                    this.character.collectedBottles++
                }
            }
        });
    }
    /**
     * Deletes a chicken after a collision (when the character throws a bottle at it).
     * @param {MovableObject} enemy - The chicken object to be deleted.
     */
    deleteChickenAfterCollision(enemy) {
        enemy.energy -= 100;
        enemy.CHICKEN_DEAD_SOUND.volume = playSoundVolume();
        enemy.CHICKEN_DEAD_SOUND.play();
    }
    /**
     * Deletes a bottle after a collision (when the character throws it).
     * @param {ThrowableObjects} bottle - The bottle object to be deleted.
     */
    deleteBottleAfterCollision(bottle) {
        bottle.bottleDestroyed = true;
        bottle.splash();
    }
    /**
     * Deletes an object from an array after it has been collected by the character.
     * @param {Array} object - The array from which to delete the item.
     * @param {Object} item - The item to be deleted from the array.
     */
    deleteAfterCollected(object, item) {
        object.splice(object.indexOf(item), 1);
    }

    

}
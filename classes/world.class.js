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

    constructor(canvas, keyboard, game) {
        this.canvas = canvas; //übergibt der canvas; variable den parameter canvas
        this.keyboard = keyboard;
        this.game = game;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.World = this;
        this.endboss.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 100);
    }
    isFalling() {
        if (this.character.speedY < 0 && this.character.isAboveGround()) {
            return true
        }
    }


    checkThrowObject() {
        if (this.character.collectedBottles > 0) {
            let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.threwbottle = bottle;
            this.character.collectedBottles--
            this.bottlesBar.collected -= 10;
            this.bottlesBar.setPercentage(this.bottlesBar.collected);
        }
    }

    checkCollisions() {
        this.checkChickenCollision();
        this.checkCollectiblesCollision(this.level.coins, this.coinsBar);
        this.checkCollectiblesCollision(this.level.bottles, this.bottlesBar);
        this.checkEndbossCollision();
        this.checkIfBottleHitChicken();
        this.checkIfBottleHitEndboss();
    }

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
    

    checkIfBottleHitEndboss() {
        this.level.endboss.forEach((endboss) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(endboss)) {
                    this.deleteBottleAfterCollision(bottle);
                    if (!endboss.isHurt()) {
                        endboss.hitted();
                    }
                    if (endboss.gameOver) {
                        endboss.speed = 0; 
                        setTimeout(() => {
                            clearAllIntervals();
                        }, 1000);
                    }
                    this.endbossBar.setPercentage(this.endboss.energy);
                }
            });
        });

    }

    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead()) { return }
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.isHurt()) {
                this.deleteChickenAfterCollision(enemy);
                this.character.jump();
                
                setTimeout(() => {
                    this.deleteAfterCollected(this.level.enemies, enemy);
                }, 600);

            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                if (!this.character.isHurt()) {
                    this.character.hitted();
                }
                this.statusBar.setPercentage(this.character.energy);
                HIT_SOUND.play();
            }
            if (this.character.gameOver) {
                setTimeout(() => {
                    clearAllIntervals();
                }, 1500);
            }
        });
    }

    checkEndbossCollision() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hitted();
                this.statusBar.setPercentage(this.character.energy)
                HIT_SOUND.play();
            }
        })
    }

    checkCollectiblesCollision(collectiblesArray, bar) {
        collectiblesArray.forEach((collectible) => {
            if (this.character.isColliding(collectible)) {
                bar.collected += 10;
                bar.setPercentage(bar.collected);
                this.deleteAfterCollected(collectiblesArray, collectible);
                bar.COLLECTING_SOUND.volume= playSoundVolume();
                bar.COLLECTING_SOUND.play();
                if (collectiblesArray == this.level.bottles) {
                    this.character.collectedBottles++
                }
            }
        });
    }
    

    deleteChickenAfterCollision(enemy){
        enemy.energy -= 100;
        enemy.CHICKEN_DEAD_SOUND.volume = playSoundVolume();
        enemy.CHICKEN_DEAD_SOUND.play();
    }
    deleteBottleAfterCollision(bottle) {
        bottle.bottleDestroyed = true;
        bottle.splash();
    }

    deleteAfterCollected(object, item) {
        object.splice(object.indexOf(item), 1);
    }

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
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });

    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx)

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1)
        mo.x = mo.x * -1;
    }
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

}
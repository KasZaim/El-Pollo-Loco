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
        }, 50);
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
            this.bottlesBar.bottlesToShow -= 10;
            this.bottlesBar.setPercentage(this.bottlesBar.bottlesToShow);
        }
    }

    checkCollisions() {
        this.checkChickenCollision();
        this.checkCoinCollision();
        this.checkEndbossCollision();
        this.checkBottlesCollection();
        this.checkIfBottleHitChicken();
        this.checkIfBottleHitEndboss();
    }

    checkIfBottleHitChicken() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    enemy.energy -= 100;
                    enemy.CHICKEN_DEAD_SOUND.play();
                    bottle.bottleDestroyed = true;
                    bottle.splash();
                    setTimeout(() => {
                        this.deleteAfterCollected(this.level.enemies, enemy);
                    }, 300);
                }
            });
        });
    }

    checkIfBottleHitEndboss() {
        this.level.endboss.forEach((endboss) => {
            this.throwableObjects.forEach((bottle) => {
                if (bottle.isColliding(endboss)) {
                    bottle.bottleDestroyed = true;
                    bottle.splash();
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
            if (this.character.isColliding(enemy) && this.character.isAboveGround() && !this.character.isHurt()) {
                enemy.energy -= 100;
                this.character.jump();
                enemy.CHICKEN_DEAD_SOUND.play();
                setTimeout(() => {
                    this.deleteAfterCollected(this.level.enemies, enemy);
                }, 1000);


            } else if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                if (!this.character.isHurt()) {
                    this.character.hitted();
                }
                this.statusBar.setPercentage(this.character.energy);
                this.character.HIT_SOUND.volume = 0.3;
                this.character.HIT_SOUND.play();
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
                this.character.HIT_SOUND.volume = 0.3;
                this.character.HIT_SOUND.play();
            }
        })
    }

    checkCoinCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsBar.collected += 10;
                this.coinsBar.setPercentage(this.coinsBar.collected);
                this.deleteAfterCollected(this.level.coins, coin);
                this.coinsBar.COLLECTING_SOUND.volume = 0.2;
                this.coinsBar.COLLECTING_SOUND.play();
            }
        })
    }

    checkBottlesCollection() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottlesBar.bottlesToShow += 10;
                this.character.collectedBottles++
                this.bottlesBar.setPercentage(this.bottlesBar.bottlesToShow);
                this.deleteAfterCollected(this.level.bottles, bottle);
                this.bottlesBar.COLLECTING_SOUND.volume = 0.3;
                this.bottlesBar.COLLECTING_SOUND.play();
            }
        })
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
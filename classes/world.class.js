class World {
    ctx;
    canvas;
    character = new Character();
    keyboard;
    camera_x = 0;
    level = level1;
    statusbar = new Statusbar();
    coinsbar = new Coinsbar();
    bottlesbar = new Bottlesbar();
    endboss = this.level.endboss[0];
    throwableObjects = [];
    bottlethrew = false;
    

    constructor(canvas, keyboard) {
        this.canvas = canvas; //übergibt der canvas; variable den parameter canvas
        this.keyboard = keyboard,
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
            this.checkThrowObject();
        }, 200);
    }

    checkThrowObject() {
        if (this.keyboard.SPACE && this.character.collectedBottles > 0) {
            let bottle = new ThrowableObjects(this.character.x + 200, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.collectedBottles--
            this.bottlesbar.bottlesToShow -= 20;
            this.bottlesbar.setPercentage(this.bottlesbar.bottlesToShow);

            this.checkIfBottleHitEndboss(bottle)
            this.checkIfBottleHitChicken(bottle);
        }
    }

    checkIfBottleHitChicken(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (bottle.isColliding(enemy)) {
                bottle.splash();
                bottle.bottleDestroyed = true;
            }
        });
    }

    checkIfBottleHitEndboss(bottle) {
        if (bottle.isColliding(this.level.endboss[0])) {
            bottle.splash(this.level.endboss[0].x, this.level.endboss[0].y);
            bottle.bottleDestroyed = true;
        };
    }

    checkCollisions() {
        this.checkChickenCollision();
        this.checkCoinCollision();
        this.checkEndbossCollision();
        this.checkBottlesCollection();
    }

    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hitted();
                this.statusbar.setPercentage(this.character.energy)
                this.character.HIT_SOUND.play();
            }
        })
    }
    checkEndbossCollision() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hitted();
                this.statusbar.setPercentage(this.character.energy)
                this.character.HIT_SOUND.play();
            }
        })
    }

    checkCoinCollision() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinsbar.collected += 10;
                this.coinsbar.setPercentage(this.coinsbar.collected);
                this.deleteAfterCollected(this.level.coins, coin);
                this.coinsbar.COLLECTING_SOUND.play();
            }
        })
    }
    checkBottlesCollection() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottlesbar.bottlesToShow += 20;
                this.character.collectedBottles++
                this.bottlesbar.setPercentage(this.bottlesbar.bottlesToShow);
                this.deleteAfterCollected(this.level.bottles, bottle);
                this.bottlesbar.COLLECTING_SOUND.play();
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
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinsbar);
        this.addToMap(this.bottlesbar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
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
        mo.drawFrame(this.ctx)

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
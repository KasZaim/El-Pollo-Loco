class World {
    ctx;
    canvas;
    character = new Character();
    keyboard;
    camera_x = 0;
    level = level1;
    statusbar = new Statusbar();
    throwableObjects = [new ThrowableObjects()];

    constructor(canvas, keyboard) {
        this.canvas = canvas; //übergibt der canvas; variable den parameter canvas
        this.keyboard = keyboard,
            this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld() {
        this.character.World = this;
    }
    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hitted();
                    this.statusbar.setPercentage(this.character.energy)
                }
            }
            )
        }, 200);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // Canvas wird entleert
       
        this.ctx.translate(this.camera_x, 0); 
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusbar)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character)
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
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
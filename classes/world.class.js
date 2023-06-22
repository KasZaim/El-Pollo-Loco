class World {
    ctx;
    canvas;
    character = new Character();
    keyboard;
    camera_x = 0;
    level = level1;

    constructor(canvas,keyboard) {
        this.canvas = canvas; //übergibt der canvas; variable den parameter canvas
        this.keyboard = keyboard,
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.World = this;
    }

    draw() {
        let self = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // Canvas wird entleert
        this.ctx.translate(this.camera_x, 0);
        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character) // 'this.' weil die funktion außerhalb von draw() ist
        this.addObjectsToMap(this.level.enemies);
        
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(function () {
            self.draw();
        })
    }
    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
        });

    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1)
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        if (mo.otherDirection) {
            this.ctx.restore();
            mo.x = mo.x * -1;
        }
    }
}
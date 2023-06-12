class World {
    ctx;
    canvas;
    character = new Character();
    enemies = [
        new chicken(),
        new chicken(),
        new chicken(),
    ];
    clouds = [
        new cloud()
    ];
    backgroundObjects = [
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 0)
    ];

    constructor(canvas) {
        this.canvas = canvas; //übergibt der canvas; variable den parameter canvas
        this.ctx = canvas.getContext('2d');
        this.draw();
    }



    draw() {
        let self = this;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // Canvas wird entleert

        this.addToMap(this.character) // 'this.' weil die funktion außerhalb von draw() ist
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.backgroundObjects);

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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }
}
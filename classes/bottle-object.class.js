class Bottles extends MovableObject {
    height = 110;
    width = 110;
    y = 330;

    offset = {
        x: 30,
        y: 25,
        width: 34,
        height: 10
    };

    IMAGE = ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png',]

    constructor(x) {
        super().loadImg(this.IMAGE);
        this.x = x + Math.random() * 1500;
    }
}
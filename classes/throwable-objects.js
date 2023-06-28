class ThrowableObjects extends MovableObject{

    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    constructor(x , y){
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.height = 90;
        this.width = 90;
        this.throw();
    }
    
    throw(){
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 20;
            this.playAnimation(this.IMAGES)

        }, 20);
    }
}
class chicken extends MovableObject{
    y = 320;
    height = 110;
    width = 110;
    IMAGES_ENEMIES_WALKING =[
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.IMAGES_ENEMIES_WALKING)
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.3
        this.animate();
    }

    animate(){
        setInterval( () =>{
        let i = this.currrentImage % this.IMAGES_ENEMIES_WALKING.length;
        let path = this.IMAGES_ENEMIES_WALKING[i];
        this.img = this.imageCache[path];
        this.currrentImage++;
    }, 100)
    this.moveLeft();
    }
}
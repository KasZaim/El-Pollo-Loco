class chicken extends MovableObject{
    y = 320;
    height = 110;
    width = 110;
    constructor(){
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.x = 200 + Math.random() * 500;
    }

}
class cloud extends MovableObject{
    y = 20;
    height = 300;
    width = 500;
    constructor(x){
        super().loadImg('img/5_background/layers/4_clouds/1.png')
        this.x = x;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}
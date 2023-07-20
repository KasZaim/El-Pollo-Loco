class Coins extends MovableObject {
    height = 150;
    width = 150;
    y = 100
    
    offset = {
        x: 50,
        y: 50,
        width: 50,
        height: 50
    };

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(x,y) {
        super().loadImg(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.coinsAnimation();
        this.x = x;
        this.y = y + Math.random() * 200;
    }

    

    coinsAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}
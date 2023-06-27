class Coins extends MovableObject {
    height = 150;
    width = 150;
    y = 100

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor(x) {
        super().loadImg(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.coinsAnimation();
        this.generateRandomPosition(x);
    }

    coinsAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES)
        }, 300);
    }
}
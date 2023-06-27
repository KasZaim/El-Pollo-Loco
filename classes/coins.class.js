class Coins extends MovableObject {
    y = 150;
    x = 150;
    height = 150;
    width = 150;

    coinsAreColliding;

    IMAGES_COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ]

    constructor() {
        super().loadImg(this.IMAGES_COINS[0]);
        this.loadImages(this.IMAGES_COINS);
        this.coinsAnimation();
        // this.checkCollisionWithOtherCoins();
        this.generateRandomPosition();
    }

    generateRandomPosition() {
        this.x = 500 + Math.random() * 500;
        this.y = 150 + Math.random() * 200;
    }
    coinsAnimation() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS)
        }, 300);
    }
    // checkCollisionWithOtherCoins() {
    //     for (let i = 0; i < this.World.level.coins.length; i++) {
    //         const coin = this.World.level.coins[i];

    //         if (this.isColliding(coin)) {
    //             this.coinsAreColliding = true;
    //             generateRandomPosition();
    //         } else {
    //             this.coinsAreColliding = false;
    //         }
    //     }

    // }
}
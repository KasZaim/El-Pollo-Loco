class Coinsbar extends Statusbar{

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ]

    collected = 0;
    COLLECTING_SOUND = new Audio('audio/coin.mp3')

    constructor(){
        super();
        this.loadImages(this.IMAGES)
        this.setPercentage(0);
        this.x = 50;
        this.y = 50;
        this.height = 70;
        this.width = 220;
    }
}
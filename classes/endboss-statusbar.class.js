class EndbossBar extends Statusbar{

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png',
    ]

    life = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES)
        this.setPercentage(this.life);
        this.x = 300;
        this.y = -12;
        this.height = 70;
        this.width = 220;
    }


}
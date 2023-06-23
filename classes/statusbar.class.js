class Statusbar extends DrawableObjects{

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    life = 100;

    constructor(){
        super();
        this.loadImages(this.IMAGES)
        this.setPercentage(100);
        this.x = 50;
        this.y = -10;
        this.height = 70;
        this.width = 220;
    }

    setPercentage(life){
        this.life = life;
        let imagePath = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath]
    }

    resolveImageIndex(){
            if (this.life == 100) {
                return 5;
            }
            else if (this.life > 80) {
                return 4;
            }
            else if (this.life > 60) {
                return 3;
            }
            else if (this.life > 40) {
                return 2;
            }
            else if (this.life > 20) {
                return 1;
            }
            else{
                return 0;
            }
        }
}
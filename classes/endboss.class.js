class Endboss extends MovableObject{
    height = 450;
    width = 400;
    y = 5;
    IMAGES_ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    constructor(){
        super().loadImg(this.IMAGES_ENDBOSS_WALKING[0]);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.x = 2400;
        this.animate();

    }
    animate(){
        setInterval( () =>{
            this.playAnimation(this.IMAGES_ENDBOSS_WALKING)
    }, 200)
    }
}
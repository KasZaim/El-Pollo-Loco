class Endboss extends MovableObject{
    height = 450;
    width = 400;
    y = 5;
    energy = 100;
    IMAGES_ENDBOSS_SPAWNING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    IMAGES_ENDBOSS_WALKING = [
      'img/4_enemie_boss_chicken/1_walk/G1.png',  
      'img/4_enemie_boss_chicken/1_walk/G2.png',  
      'img/4_enemie_boss_chicken/1_walk/G3.png', 
      'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hadFirstContact = false;
    world;
    constructor(){
        super().loadImg(this.IMAGES_ENDBOSS_SPAWNING[0]);
        this.loadImages(this.IMAGES_ENDBOSS_SPAWNING);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.x = 3700;
        this.speed = 0.03;
        this.animate();   
    }

    offset = {
        x: 25,
        y: 80,
        width:30,
        height: 15 
    };
    
    animate(){
        let i = 0;
        setInterval( () =>{
            if (i < 8) {
                    this.playAnimation(this.IMAGES_ENDBOSS_SPAWNING);
            } else if (this.hadFirstContact) {
                this.playAnimation(this.IMAGES_ENDBOSS_WALKING)
                setInterval(() => {
                    this.moveLeft();
                }, 1000 / 80)
            } 
            i++;
            if (this.world.character.x > 3400 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
    }, 200)
    
    }
}
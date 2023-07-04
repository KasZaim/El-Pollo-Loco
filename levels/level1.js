let level1;

function initLevel(){
level1 = new Level([
    new chicken(),
    new chicken(),
    new chicken(),
    new chicken(),
    
],
    [
        new cloud()
    ],
    [
        new BackgroundObjects('img/5_background/layers/air.png', -719),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObjects('img/5_background/layers/air.png', 0),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObjects('img/5_background/layers/air.png', 719),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObjects('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObjects('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ],

    [
        new Coins(50),
        new Coins(200),
        new Coins(550),
        new Coins(450),
        new Coins(650),
        new Coins(570),
        new Coins(100),
        new Coins(900),
        new Coins(800),
        new Coins(700)
        
    ],
    [
        new Bottles(106),
        new Bottles(508),
        new Bottles(401),
        new Bottles(806),
        new Bottles(357),
    ],[
        new Endboss()
    ]

);}
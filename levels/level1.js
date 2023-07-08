let level1;

function initLevel() {
    level1 = new Level([
        new chicken(),
        new chicken(),
        new chicken(),
        new chicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),
        new BabyChicken(),

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

            new BackgroundObjects('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObjects('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObjects('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObjects('img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundObjects('img/5_background/layers/air.png', 719 * 5),
            new BackgroundObjects('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundObjects('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundObjects('img/5_background/layers/1_first_layer/2.png', 719 * 5),
        ],

        [
            new Coins(1000),
            new Coins(800),
            new Coins(650),
            new Coins(450),
            new Coins(650),
            new Coins(2000),
            new Coins(1000),
            new Coins(900),
            new Coins(800),
            new Coins(1500)

        ],
        [
            new Bottles(1000),
            new Bottles(508),
            new Bottles(1500),
            new Bottles(806),
            new Bottles(100),
        ],
        [
            new Endboss()
        ],

    );
}
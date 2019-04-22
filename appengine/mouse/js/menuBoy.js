class menuBoy extends Phaser.Scene {

    constructor() {
        super({
            key: 'menuBoy'
        });
    }

    preload() {
        // console.log('asdasdads');
        // this.load.image('arrow', 'assets/sprites/longarrow.png');
    }

    create(data) {
        
        //Background
        var background = this.add.image(400, 300, 'background').setScale(0.35);
        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(220, 80, "Select a Place", textConfig);

        //Boy Karachi
        var karachi = this.add.image(150, 300, 'karachiBoy').setInteractive();
        karachi.setScale(0.08);
        karachi.on('pointerover', function(event) {
            karachi.setScale(0.075);
            karachi.alpha = 0.8;
        });
        karachi.on('pointerout', function(event) {
            karachi.setScale(0.08);
            karachi.alpha = 1;
        });
        karachi.on('pointerdown', function(event) {
            this.scene.start('karachiBoy');
        }, this);

        this.add.text(60, 420, "Karachi", textConfig);

        //Boy London
        var london = this.add.image(400, 300, 'londonBoy').setInteractive();
        london.setScale(0.08);
        london.on('pointerover', function(event) {
            london.setScale(0.075);
            london.alpha = 0.8;
        });
        london.on('pointerout', function(event) {
            london.setScale(0.08);
            london.alpha = 1;
        });
        london.on('pointerdown', function(event) {
            this.scene.start('londonBoy');
        }, this);

        this.add.text(320, 420, "London", textConfig);

        //Boy Turkey
        var turkey = this.add.image(650, 300, 'turkeyBoy').setInteractive();
        turkey.setScale(0.08);
        turkey.on('pointerover', function(event) {
            turkey.setScale(0.075);
            turkey.alpha = 0.8;
        });
        turkey.on('pointerout', function(event) {
            turkey.setScale(0.08);
            turkey.alpha = 1;
        });
        turkey.on('pointerdown', function(event) {
            this.scene.start('turkeyBoy');
        }, this);

        this.add.text(575, 420, "Turkey", textConfig);





    }

    update() {
        // this.arrow.rotation += 0.01;
    }

}
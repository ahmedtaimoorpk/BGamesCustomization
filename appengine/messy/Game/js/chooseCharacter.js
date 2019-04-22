goog.provide('MesseyActicityChooseCharacter');

class chooseCharacter extends Phaser.Scene {

    constructor() {
        super({
            key: 'chooseCharacter'
        });
    }

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        progressBox.fillRect(width /2 -160, height / 2 - 30, 320, 50);
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });

        assetText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width /2 -150, height / 2 - 20, 300 * value, 30);
        });

        this.load.on('fileprogress', function(file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function() {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.image('boyRobot', 'assets/Boy-Robot/5.png');
        this.load.image('girlRobot', 'assets/Girl-Robot/f-1-01.png');
        this.load.image('background', 'assets/background.jpg');

        //Karachi boy
        this.load.image("karachiBoy", "assets/Boy-Rooms/Karachi/Karachi-Boy Messy-Room-01.jpg");
        this.load.image("londonBoy", "assets/Boy-Rooms/London/London Boy-Messy-Room-01.jpg");
        this.load.image("turkeyBoy", "assets/Boy-Rooms/Turkey/Turkey-Boy messy-Room-01.jpg");


        this.load.image("karachiGirl", "assets/Girl-Room/Karachi/Karachi-Girl Messy-Room-01.jpg");
        this.load.image("londonGirl", "assets/Girl-Room/London/London Girl Messy-Room-01.jpg");
        this.load.image("turkeyGirl", "assets/Girl-Room/Turkey/Turkey-Girl Messy-Room-01.jpg");

        // for (var i = 0; i < 500; i++) {
        //     this.load.image('logo'+i, 'zenvalogo.png');
        // }
    }

    create() {

        this.scene.start('karachiBoy');
        // this.scene.start('londonBoy');





        //Background
        var background = this.add.image(400, 300, 'background').setScale(0.35);
        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(150, 80, "Select your Character", textConfig);

        //Boy robot
        var boyRobot = this.add.image(200, 300, 'boyRobot').setInteractive();
        boyRobot.setScale(0.2);
        boyRobot.on('pointerover', function(event) {
            boyRobot.setScale(0.19);
            boyRobot.alpha = 0.8;
        });
        boyRobot.on('pointerout', function(event) {
            boyRobot.setScale(0.2);
            boyRobot.alpha = 1;
        });
        boyRobot.on('pointerdown', function(event) {
            this.scene.start('menuBoy');
        }, this);

        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(160, 420, "BOY", textConfig);

        //Girl robot
        var girlRobot = this.add.image(600, 300, 'girlRobot').setInteractive();
        girlRobot.setScale(0.2);
        girlRobot.on('pointerover', function(event) {
            girlRobot.setScale(0.19);
            girlRobot.alpha = 0.8;
        });
        girlRobot.on('pointerout', function(event) {
            girlRobot.setScale(0.2);
            girlRobot.alpha = 1;
        });
        girlRobot.on('pointerdown', function(event) {
            this.scene.start('menuGirl');
        }, this);

        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(560, 420, "GIRL", textConfig);
    }
    update() {
        // Move sprite up and down smoothly for show
        // var tStep = Math.sin( counter ) ;
        // sprite.y = (game.height/2) + tStep * 30 ;
        // sprite.rotation += Phaser.Math.degToRad( 0.1 * tStep ) ;
        // counter += step ;
    }

    render() {

        // Input debug info
        this.debug.inputInfo(32, 32);
        // this.debug.spriteInputInfo(sprite, 32, 130);
        this.debug.pointer(this.input.activePointer);

    }

}
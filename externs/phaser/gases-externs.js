var Phaser;
var level;


var game = new Phaser.Game(400, 340, Phaser.CANVAS, 'game_gases', {


    preload: function () {
        this.game.load.crossOrigin = true;
        this.stage.backgroundColor = "#ececec";
        // this.scale.pageAlignHorizontally = true;
        // this.scale.pageAlignVertically = true;
        // this.load.crossOrigin = 'anonymous';

        this.game.load.image('background', 'gases/Part-2/Grade-6/assets/background.png');
        this.game.load.image('footer', 'gases/Part-2/Grade-6/assets/footer.png');
        this.game.load.image('img1', 'gases/Part-2/Grade-6/assets/wheel-1.png');
        this.game.load.image('img2', 'gases/Part-2/Grade-6/assets/img2.png');
        this.game.load.image('img3', 'gases/Part-2/Grade-6/assets/img3.png');
        this.game.load.image('img4', 'gases/Part-2/Grade-6/assets/img4.png');
        this.game.load.image('img5', 'gases/Part-2/Grade-6/assets/img5.png');
        this.game.load.image('img6', 'gases/Part-2/Grade-6/assets/img6.png');
        this.game.load.image('img7', 'gases/Part-2/Grade-6/assets/img7.png');

        // this.game.load.image('flecha', flechaURI);
    },


    create: function () {
        // this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // this.game.scale.pageAlignHorizontally = true;
        // this.game.scale.pageAlignVertically = true;
        //
        //
        // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.background = this.add.sprite(40, 40, 'background');
        this.background.scale.setTo(0.5, 0.5);

        console.log("height:" + this.background.height);
        console.log("width:" + this.background.width);

        this.footer = this.add.sprite(0, 210, 'footer');


        this.img1 = this.game.add.sprite(95 + this.background.x, 104.5 + this.background.y, 'img1');
        this.img1.scale.setTo(0.5, 0.5);
        // img1.anchor.setTo(1.4, 3.52);
        this.img1.visible = false;
        this.game.physics.arcade.enable(this.img1);
        this.img1.tint = 0xff00ff;

        GasesGame.item1 = this.game.add.sprite(50, 280, this.img1.key, this.img1.frame);
        GasesGame.item1.scale.setTo(0.5, 0.5);
        GasesGame.item1.anchor.x = 0.5;
        this.game.physics.arcade.enable(GasesGame.item1);
        GasesGame.item1.inputEnabled = true;
        GasesGame.item1.input.enableDrag();
        GasesGame.item1.input.draggable = false;
        GasesGame.item1.originalPosition = GasesGame.item1.position.clone();
        GasesGame.item1.events.onDragStop.add(function (currentSprite) {
            this.stopDrag(currentSprite, this.img1);
        }, this);
        GasesGame.item1.alpha = 0.5;

        // var tween = game.add.tween(item1).to( { alpha: 1 }, 2000, "Linear", true, 0, -1);
        // tween.yoyo(true, 3000);

        //img2

        this.img2 = this.game.add.sprite(82.5 + this.background.x, 48 + this.background.y, 'img2');
        this.img2.scale.setTo(0.5, 0.5);
        // this.img2.anchor.setTo(4.7, 10.1);
        this.img2.visible = false;
        this.game.physics.arcade.enable(this.img2);
        this.img2.tint = 0xff00ff;

        GasesGame.item2 = this.game.add.sprite(100, 300, this.img2.key, this.img2.frame);
        GasesGame.item2.scale.setTo(0.5, 0.5);
        GasesGame.item2.anchor.x = 0.5;
        this.game.physics.arcade.enable(GasesGame.item2);
        GasesGame.item2.inputEnabled = true;
        GasesGame.item2.input.enableDrag();
        GasesGame.item2.input.draggable = false;
        GasesGame.item2.originalPosition = GasesGame.item2.position.clone();
        GasesGame.item2.events.onDragStop.add(function (currentSprite) {
            this.stopDrag(currentSprite, this.img2);
        }, this);
        GasesGame.item2.alpha = 0.5;


        //img3

        this.img3 = this.game.add.sprite(18 + this.background.x, 77 + this.background.y, 'img3');
        this.img3.scale.setTo(0.5, 0.5);
        // this.img3.anchor.setTo(5.48, 6.46);
        this.img3.visible = false;
        this.game.physics.arcade.enable(this.img3);
        this.img3.tint = 0xff00ff;

        GasesGame.item3 = this.game.add.sprite(150, 300, this.img3.key, this.img3.frame);
        GasesGame.item3.scale.setTo(0.5, 0.5);
        GasesGame.item3.anchor.x = 0.5;
        this.game.physics.arcade.enable(GasesGame.item3);
        GasesGame.item3.inputEnabled = true;
        GasesGame.item3.input.enableDrag();
        GasesGame.item3.input.draggable = false;
        GasesGame.item3.originalPosition = GasesGame.item3.position.clone();
        GasesGame.item3.events.onDragStop.add(function (currentSprite) {
            this.stopDrag(currentSprite, this.img3);
        }, this);
        GasesGame.item3.alpha = 0.5;


        //img4

        this.img4 = this.game.add.sprite(117 + this.background.x, 161 + this.background.y, 'img4');
        this.img4.scale.setTo(0.5, 0.5);
        // this.img4.anchor.setTo(2, 6.30);
        this.img4.visible = false;
        this.game.physics.arcade.enable(this.img4);
        this.img4.tint = 0xff00ff;

        GasesGame.item4 = this.game.add.sprite(200, 300, this.img4.key, this.img4.frame);
        GasesGame.item4.scale.setTo(0.5, 0.5);
        GasesGame.item4.anchor.x = 0.5;
        this.game.physics.arcade.enable(GasesGame.item4);
        GasesGame.item4.inputEnabled = true;
        GasesGame.item4.input.enableDrag();
        GasesGame.item4.input.draggable = false;
        GasesGame.item4.originalPosition = GasesGame.item4.position.clone();
        GasesGame.item4.events.onDragStop.add(function (currentSprite) {
            this.stopDrag(currentSprite, this.img4);
        }, this);
        GasesGame.item4.alpha = 0.5;


        //img5

        this.img5 = this.game.add.sprite(228 + this.background.x, 49 + this.background.y, 'img5');
        this.img5.scale.setTo(0.5, 0.5);
        // this.img5.anchor.setTo(-0.61, 4.65);
        this.img5.visible = false;
        this.game.physics.arcade.enable(this.img5);
        this.img5.tint = 0xff00ff;

        GasesGame.item5 = this.game.add.sprite(250, 280, this.img5.key, this.img5.frame);
        GasesGame.item5.scale.setTo(0.5, 0.5);
        GasesGame.item5.anchor.x = 0.5;
        this.game.physics.arcade.enable(GasesGame.item5);
        GasesGame.item5.inputEnabled = true;
        GasesGame.item5.input.enableDrag();
        GasesGame.item5.input.draggable = false;
        GasesGame.item5.originalPosition = GasesGame.item5.position.clone();
        GasesGame.item5.events.onDragStop.add(function (currentSprite) {
            this.stopDrag(currentSprite, this.img5);
        }, this);
        GasesGame.item5.alpha = 0.5;


        //img6

        this.img6 = this.game.add.sprite(133 + this.background.x, 26 + this.background.y, 'img6');
        this.img6.scale.setTo(0.5, 0.5);
        // this.img6.anchor.setTo(1.32, 8.44);
        this.img6.visible = false;
        this.game.physics.arcade.enable(this.img6);
        this.img6.tint = 0xff00ff;

        GasesGame.item6 = this.game.add.sprite(300, 300, this.img6.key, this.img6.frame);
        GasesGame.item6.scale.setTo(0.5, 0.5);
        GasesGame.item6.anchor.x = 0.5;
        this.game.physics.arcade.enable(GasesGame.item6);
        GasesGame.item6.inputEnabled = true;
        GasesGame.item6.input.enableDrag();
        GasesGame.item6.input.draggable = false;
        GasesGame.item6.originalPosition = GasesGame.item6.position.clone();
        GasesGame.item6.events.onDragStop.add(function (currentSprite) {
            this.stopDrag(currentSprite, this.img6);
        }, this);
        GasesGame.item6.alpha = 0.5;


        //img7

        this.img7 = this.game.add.sprite(58 + this.background.x, 22 + this.background.y, 'img7');
        this.img7.scale.setTo(0.5, 0.5);
        // this.img7.anchor.setTo(1, 1);
        this.img7.visible = false;
        this.game.physics.arcade.enable(this.img7);
        this.img7.tint = 0xff00ff;

        GasesGame.item7 = this.game.add.sprite(350, 300, this.img7.key, this.img7.frame);
        GasesGame.item7.scale.setTo(0.5, 0.5);
        GasesGame.item7.anchor.x = 0.5;
        this.game.physics.arcade.enable(GasesGame.item7);
        GasesGame.item7.inputEnabled = true;
        GasesGame.item7.input.enableDrag();
        GasesGame.item7.input.draggable = false;
        GasesGame.item7.originalPosition = GasesGame.item7.position.clone();
        GasesGame.item7.events.onDragStop.add(function (currentSprite) {
            this.stopDrag(currentSprite, this.img7);
        }, this);
        GasesGame.item7.alpha = 0.5;

        if (level === 1) {
            this.inst1();
        }

    },

    inst1: function () {
        ins1S.play();
        game.add.tween(this.img1).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1, true);
        game.add.tween(this.img2).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1, true);
        game.add.tween(this.img3).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1, true);
        game.add.tween(this.img4).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1, true);
        game.add.tween(this.img5).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1, true);
        game.add.tween(this.img6).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1, true);
        game.add.tween(this.img7).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 1, true);
    },

    stopDrag: function (currentSprite, endSprite) {
        if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function () {
            currentSprite.input.draggable = false;
            currentSprite.position.copyFrom(endSprite.position);
            currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
            itemsAttached += 1;
            if (itemsAttached == 7) {
                // GasesGame.scheduleFinish(true);
                // BlocklyInterface.saveToLocalStorage();

                document.getElementById('game_completed').style.display = 'block';
                document.getElementById('game_gases').getElementsByTagName('canvas')[0].style.display = 'none';

                // setTimeout(BlocklyDialogs.congratulations, 1000);
                // document.getElementById('game_completed').style.display = 'block';
                // document.getElementById('game_gases').getElementsByTagName('canvas')[0].style.display = 'none';

            }

        })) {
            currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
    }


});
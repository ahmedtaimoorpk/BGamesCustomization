var score = 0;
var items;
var text, timer;
var min = 0;
var sec = 0;
var previousScene, currentScene;
var user;
var scorrect, swrong;
var gameHeight, gameWidth;
var selectedTool = null;
var gameOver = false;


class industryLvl1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryLvl1',
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    // gravity: { x: 5 }
                }
            },
        });
    }

    create() {
        currentScene = 'industryLvl1';
        // this.scene.pause();
        // this.scene.launch('industryLvl1Instructions2');
        // this.scene.sendToBack();

        /* set game time
        *  min,sec */
        min = 5;
        sec = 0;
        score = 0;

        var background = this.add.image(-10, 0, 'SS', 'background').setScale(0.255).setOrigin(0).setInteractive();
        var fTools = this.physics.add.group();

        this.add.image(300, 320, 'SS', 'roboticArm').setScale(0.23).setOrigin(0);
        this.add.image(428, 429, 'SS', 'tool5').setScale(0.03).setOrigin(0).setDepth(1);

        scorrect = this.sound.add('scorrect');
        swrong = this.sound.add('swrong');
        var stool1 = this.sound.add('stool1');

        /*
        * Tools on left side of the screen
        * */

        // TOOL1
        var ctool1 = this.physics.add.image(50, 200, 'SS', 'c/cTool1').setScale(0.2).setInteractive().setCircle(170);
        ctool1.name = 'tool1';
        ctool1.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool1.cur) 45 4, auto');
        });

        // TOOL2
        var ctool2 = this.physics.add.image(50, 280, 'SS', 'c/cTool2').setScale(0.2).setInteractive().setCircle(170);
        ctool2.name = 'tool2';
        ctool2.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool2.cur) 45 4, auto');
        });

        // TOOL3
        var ctool3 = this.physics.add.image(50, 360, 'SS', 'c/cTool3').setScale(0.2).setInteractive().setCircle(170);
        ctool3.name = 'tool3';
        ctool3.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool3.cur) 37 4, auto');
        });

        // OIL
        var coil = this.physics.add.image(50, 440, 'SS', 'c/cOil').setScale(0.2).setInteractive().setCircle(170);
        coil.name = 'oil';
        coil.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/oil.cur) 20 4, auto');
        });

        /*
        * Tools on right side of the screen
        * */

        // TOOL5
        var ctool5 = this.physics.add.image(gameWidth - 50, 200, 'SS', 'c/cTool5').setScale(0.2).setInteractive().setCircle(170);
        ctool5.name = 'tool5';
        ctool5.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool5.png) 32 32, auto');
        });

        var tool5_b = this.physics.add.image(373, 490, 'SS', 'tool5_b2').setScale(0.26, 0.23).setDepth(1);
        tool5_b.tool = false;
        var tool5_f = fTools.create(372, 490, 'SS', 'tool5').setScale(0.048).setAlpha(0.01).setInteractive().setDepth(1);
        tool5_f.tool2_fixed = false;
        tool5_f.fixed = false;
        tool5_f.on('pointerdown', function () {
            if (selectedTool.name === 'tool2') {
                if (!tool5_f.tool2_fixed) {
                    tool5_b.tool = true;
                    tool5_f.tool2_fixed = true;
                    this.scene.toolRotateAnim('tool2', tool5_b, 370, 490, 100, stool1);
                    this.setAlpha(0.4);
                }
            } else if (tool5_b.tool) {
                if (selectedTool.name === 'tool5') {
                    if (!tool5_f.fixed) {
                        tool5_f.fixed = true;
                        this.setAlpha(1);
                        tool5_b.destroy();
                        scorrect.play();
                        score += 5;
                    }
                } else {
                    swrong.play();
                }
            } else {
                swrong.play();
            }
            // this.scene.ctoggle(selectedTool, null);
        });

        var tool5_oil = this.physics.add.image(383, 347, 'SS', 'tool5_b').setScale(0.025).setDepth(1);
        var tool5_oil_f = fTools.create(383, 347, 'SS', 'tool5').setScale(0.03).setAlpha(0.01).setInteractive().setDepth(1);
        tool5_oil_f.fixed = false;
        tool5_oil_f.on('pointerdown', function () {
            if (selectedTool.name === 'oil') {
                if (!tool5_oil_f.fixed) {
                    tool5_oil_f.fixed = true;
                    var oilDrop = this.scene.physics.add.sprite(383, 325).setScale(0.3);
                    var oilBox = this.scene.physics.add.sprite(400, 250, 'SS', 'oil').setScale(0.08);
                    oilBox.rotation += 180;
                    oilDrop.anims.play('oilDrop');
                    oilDrop.on('animationcomplete', function () {
                        oilDrop.destroy();
                        this.setAlpha(1);
                        tool5_oil.destroy();
                        oilBox.destroy();
                        scorrect.play();
                        score += 5;
                    }, this);
                }
            } else {
                swrong.play();
            }
            // this.scene.ctoggle(selectedTool, null);
        });

        // PLUG
        var cplug = this.physics.add.image(gameWidth - 50, 280, 'SS', 'c/cPlug').setScale(0.2).setInteractive().setCircle(170);
        cplug.name = 'plug';
        cplug.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/plug.cur) 30 15, auto');
        });

        var fplug = fTools.create(544, 403, 'SS', 'plug').setScale(0.24).setAlpha(0.01).setInteractive();
        fplug.fixed = false;
        fplug.on('pointerdown', function () {
            if (selectedTool.name === 'plug') {
                if (!fplug.fixed) {
                    fplug.fixed = true;
                    this.setAlpha(1);
                    scorrect.play();
                    score += 5;
                }
            } else {
                swrong.play();
            }
            // this.scene.ctoggle(selectedTool, null);
        });

        // ARM1
        var carm1 = this.physics.add.image(gameWidth - 50, 360, 'SS', 'c/cArm1').setScale(0.2).setInteractive().setCircle(170);
        carm1.name = 'arm1';
        carm1.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/arm1.cur) 40 40, auto');
        });

        var barm1 = this.physics.add.image(336, 621, 'SS', 'barm1').setScale(0.26, 0.23).setDepth(1);
        barm1.tool = false;
        var farm1 = fTools.create(336, 621, 'SS', 'arm1').setScale(0.24).setAlpha(0.01).setInteractive();
        farm1.tool1_fixed = false;
        farm1.fixed = false;
        farm1.on('pointerdown', function () {
            if (selectedTool.name === 'tool1') {
                if (!farm1.tool1_fixed) {
                    farm1.tool1_fixed = true;
                    barm1.tool = true;
                    this.scene.toolRotateAnim('tool1', barm1, 320, 621, 50, stool1);
                    this.setAlpha(0.4);
                    scorrect.play();
                }
            } else if (barm1.tool) {
                if (selectedTool.name === 'arm1') {
                    if (!farm1.fixed) {
                        farm1.fixed = true;
                        this.setAlpha(1);
                        barm1.destroy();
                        scorrect.play();
                        score += 10;
                    }
                } else {
                    swrong.play();
                }
            } else {
                swrong.play();
            }
            // this.scene.ctoggle(selectedTool, null);
        });

        // WIRE3
        var cwire3 = this.physics.add.image(gameWidth - 50, 440, 'SS', 'c/cWire3').setScale(0.2).setInteractive().setCircle(170);
        cwire3.name = 'wire3';
        cwire3.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/wire3.cur) 23 18, auto');
        });

        var wire3_b_image = this.add.image(410, 405, 'SS', 'wire3_b').setScale(0.23).setAlpha(1);
        var wire3_f = fTools.create(410, 405, 'SS', 'wire3_f').setScale(0.23).setAlpha(0.01);
        var wire3_b = this.physics.add.image(390, 405).setScale(4, 2.5).setInteractive().setDepth(1);
        wire3_b.tool = false;
        wire3_b.fixed = false;
        wire3_b.on('pointerdown', function () {
            if (selectedTool.name === 'tool3') {
                if (!wire3_b.fixed) {
                    wire3_b.fixed = true;
                    wire3_b.tool = true;
                    this.scene.toolRotateAnim('tool3', wire3_b_image, 386, 388, 50, stool1);
                    wire3_f.setAlpha(0.4);
                }
            } else if (wire3_b.tool) {
                if (selectedTool.name === 'wire3') {
                    wire3_f.setAlpha(1);
                    wire3_b.destroy();
                    scorrect.play();
                    score += 10;
                } else {
                    swrong.play();
                }
            } else {
                swrong.play();
            }
            // this.scene.ctoggle(selectedTool, null);
        });


        background.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, null);
            this.scene.input.setDefaultCursor('auto');
        });


        /*
        * Animations Code
        * */
        // OIL
        var frames = this.anims.generateFrameNames('SS', {frames: ['anims/oilDrop1.1', 'anims/oilDrop1.2', 'anims/oilDrop1.3', 'anims/oilDrop1.4']});
        this.anims.create({key: 'oilDrop', frames: frames, frameRate: 10, repeat: 1});


        /*
        * Add text in left and right buttons
        */
        // SCORE
        text = this.add.text(32, 32);
        text.setStyle({color: '#ffffff', fontSize: '30px'});

        // CLOCK
        timer = this.add.text(gameWidth / 2, 32).setOrigin(0.5, 0);
        timer.setStyle({color: '#ffffff', fontSize: '30px'});
        this.time.addEvent({
            delay: 1000, callback: function () {
                if (sec === 0) {
                    if (min === 0) {
                        this.gameOver();
                    } else {
                        sec = 60;
                        min += -1;
                    }
                }
                sec += -1;
            }, callbackScope: this, loop: true
        });

        // HELP BUTTON
        this.physics.add.image(gameWidth - 80, 50, 'SS', 'UI/btnHelp').setScale(0.5).setInteractive().on('pointerdown', function () {
            this.setScale(0.49);
            game.scene.pause('industryLvl1');
            game.scene.start('industryLvl1Help');
            game.scene.sendToBack('industryLvl1');

        }).on('pointerup', function () {
            this.setScale(0.5);
        });

        // HINT BUTTON
        var allowHint = true;
        this.physics.add.image(gameWidth - 220, 50, 'SS', 'UI/btnHint').setScale(0.5).setInteractive().on('pointerdown', function () {
            this.setScale(0.49);
            if (allowHint) {
                allowHint = false;
                fTools.getChildren().forEach(function (obj) {
                    if (obj.alpha !== 1) {
                        // obj.setTintFill(0xffffff);
                        var alpha = obj.alpha;
                        this.scene.add.tween({
                            targets: obj,
                            ease: 'Sine.easeInOut',
                            duration: 1000,
                            delay: 0,
                            alpha: {
                                getStart: () => alpha,
                                getEnd: () => 1
                            },
                            onComplete: () => {
                                this.scene.add.tween({
                                    targets: obj,
                                    ease: 'Sine.easeInOut',
                                    duration: 1000,
                                    delay: 0,
                                    alpha: {
                                        getStart: () => 1,
                                        getEnd: () => alpha
                                    },
                                    onComplete: () => {
                                        allowHint = true;
                                    }
                                });
                            }
                        });
                    }
                }, this);
            }
        }).on('pointerup', function () {
            this.setScale(0.5);
        });

    }

    ctoggle(previous, current) {
        if (previous != null) {
            previous.setScale(0.2);
            previous.setAlpha(1);
        }
        if (current != null) {
            current.setScale(0.15);
            current.setAlpha(0.6);
        } else {
            selectedTool = null;
        }
    }

    toolRotateAnim(toolName, sprite, width, height, AngleLength, sound) {
        var tempSprite = this.physics.add.sprite(width, height, 'SS', toolName).setDepth(1);
        tempSprite.left = true;
        tempSprite.mid = true;
        tempSprite.right = false;
        sound.play();
        var timer = this.time.addEvent({
            delay: 250,
            callback: function () {
                if (tempSprite.left) {
                    tempSprite.left = false;
                    tempSprite.rotation -= AngleLength;
                    tempSprite.right = true;
                } else if (tempSprite.right) {
                    tempSprite.right = false;
                    tempSprite.rotation += AngleLength;
                    tempSprite.left = true;
                }
                if (timer.getRepeatCount() === 0) {
                    sound.stop();
                    scorrect.play();
                    score += 5;
                    tempSprite.destroy();
                    timer.destroy();
                    sprite.destroy();
                }
            },
            callbackScope: this,
            repeat: 5
        });
    }

    gameOver() {
        this.scene.start('industryGameOver');
        this.scene.stop('industryLvl1');
    }

    update() {
        if (score === 50 && !gameOver) {
            gameOver = true;
            this.gameOver();
        }
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');

        // var pointer = this.input.activePointer;
        // text.setText('X: ' + pointer.worldX + '\nY:' + pointer.worldY);
    }

}

class industryGameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryGameOver',
        });
    }

    create() {
        this.input.setDefaultCursor('pointer');
        this.add.image(0, 0, 'SS', 'background').setScale(0.255).setOrigin(0.01, 0).setAlpha(0.5);

        this.add.text(gameWidth / 2, 50, "CONGRATULATIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.text(gameWidth / 2, 110, "You have completed the Activity", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.text(gameWidth / 2, 200, "YOUR SCORE", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.text(gameWidth / 2, 300, score, {
            fontSize: '200px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.image(gameWidth - 150, gameHeight - 70, 'SS', 'UI/btnRestart').setScale(0.8).setInteractive().on('pointerdown', function () {
            this.setScale(0.79);
            gameOver = false;
            game.scene.start('industryLvl1');
            game.scene.stop('industryGameOver');
        });
    }
}

class industryLvl1Help extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryLvl1Help',
        });
    }

    create() {
        this.add.image(0, 0, 'SS', 'background').setTint(0x000000).setScale(0.255).setOrigin(0).setAlpha(0.99);

        this.add.text(gameWidth / 2, 50, "INSTRUCTIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        //Instruction 1
        this.add.image(60, 250, 'SS', 'tool2').setScale(1).setOrigin(0.5);
        this.add.image(115, 250, 'SS', 'UI/arrowR').setScale(0.3).setOrigin(0.5);
        this.add.image(200, 250, 'SS', 'tool5_b2').setScale(0.3);
        this.add.text(20, 350, "1) Use 'Spanner' to remove \nthe broken gear.", {
            fontSize: '22px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0, 0);

        //Instruction 2
        this.add.image(350, 250, 'SS', 'tool3').setScale(1).setOrigin(0.5);
        this.add.image(400, 250, 'SS', 'UI/arrowR').setScale(0.3).setOrigin(0.5);
        this.add.image(480, 250, 'SS', 'wire3_b').setScale(0.2);
        this.add.text(325, 350, "2) Use 'Pliers' to cut \nthe damaged wire.", {
            fontSize: '22px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0, 0);

        //Instruction 3
        this.add.image(600, 250, 'SS', 'tool1').setScale(1).setOrigin(0.5);
        this.add.image(645, 250, 'SS', 'UI/arrowR').setScale(0.3).setOrigin(0.5);
        this.add.image(700, 250, 'SS', 'barm1').setScale(0.4).setOrigin(0.5);
        this.add.image(720, 235, 'SS', 'arm1').setScale(0.4).setOrigin(0.5);
        this.add.text(560, 350, "3) Use 'screwdriver' to \nremove the broken \nrobotic arm.", {
            fontSize: '22px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0, 0);

        //Instruction 4
        this.add.image(820, 250, 'SS', 'oil').setScale(0.05).setOrigin(0.5);
        this.add.image(880, 250, 'SS', 'UI/arrowR').setScale(0.3).setOrigin(0.5);
        this.add.image(950, 250, 'SS', 'tool5_b').setScale(0.03).setOrigin(0.5);
        this.add.text(810, 350, "3) Use 'oil' to \nfix the rusted \ngear.", {
            fontSize: '22px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0, 0);


        this.add.image(gameWidth - 150, gameHeight - 70, 'SS', 'UI/btnClose').setScale(0.8).setInteractive().on('pointerdown', function () {
            this.setScale(0.79);
            game.scene.resume('industryLvl1');
            game.scene.stop('industryLvl1Help');
        });

    }

}

class industryLvl1Instructions2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryLvl1Instructions2',
        });
    }

    create() {
        if (currentScene === 'industryGirlLvl1') {
            this.add.image(0, 0, 'gbackground').setScale(0.3).setTint(0x000000).setOrigin(0.01, 0).setAlpha(0.9);
            this.add.image(50, 300, 'girl').setScale(0.25).setOrigin(0, 0);
        } else {
            this.add.image(0, 0, 'bbackground').setScale(0.3).setTint(0x000000).setOrigin(0.01, 0).setAlpha(0.9);
            this.add.image(50, 300, 'boy').setScale(0.15).setOrigin(0, 0);

        }

        var ins1 = this.add.image(500, 190, 'lvl1Ins2').setScale(0.6);
        var ins1Flag = false;
        this.time.addEvent({
            delay: 500, callback: function () {
                if (ins1Flag) {
                    ins1.y += -2;
                    ins1Flag = false;
                } else {
                    ins1.y += 2;
                    ins1Flag = true;
                }
            }, callbackScope: this, loop: true
        });

        this.input.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                this.scene.resume(currentScene);
                this.scene.stop();
            }
        }, this);


    }

}

class industryChooseCharacter extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryChooseCharacter',
            debug: true,

        });
    }

    preload() {
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);

        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);
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

        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        this.load.multiatlas('SS', './assets/Animations/SS.json', './assets/Animations');

        // Cursors
        this.input.setDefaultCursor('url(assets/cursors/tool1.cur) 45 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/tool2.cur) 45 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/tool3.cur) 37 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/tool4.cur) 42 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/oil.cur) 20 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/tool5.png) 32 32, auto');
        this.input.setDefaultCursor('url(assets/cursors/plug.cur) 30 15, auto');
        this.input.setDefaultCursor('url(assets/cursors/arm1.cur) 40 40, auto');
        this.input.setDefaultCursor('url(assets/cursors/wire3.cur) 23 18, auto');
        this.input.setDefaultCursor('auto');


        // Sounds Assets
        this.load.audio('stool1', './assets/sounds/tool1.mp3', {instances: 1});
        this.load.audio('scorrect', './assets/sounds/correct.mp3', {instances: 1});
        this.load.audio('swrong', './assets/sounds/wrong.mp3', {instances: 1});


    }

    create() {
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        this.scene.start('industryLvl1');

        // this.scene.pause();
        // this.scene.launch('industryLvl1Instructions1');

        gameWidth = this.game.config.width;
        gameHeight = this.game.config.height;

        //Background
        this.add.image(0, 0, 'introBackground').setScale(0.656).setOrigin(0, 0);
        var textConfig = {
            fontSize: '60px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(gameWidth / 2 - 290, 80, "Select your Character", textConfig);
        /*
        * Full Screen Code
        * */
        var fullScreen = this.add.image(gameWidth - 40, 30, 'fullscreen', 0).setInteractive().setScale(0.1);
        fullScreen.on('pointerup', function () {
            fullScreen.setScale(0.1);
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        }, this);
        fullScreen.on('pointerover', function (event) {
            fullScreen.setScale(0.09);
        });
        fullScreen.on('pointerout', function (event) {
            fullScreen.setScale(0.1);
        });

        //Boy
        var boy = this.add.image(gameWidth / 2 - 250, 350, 'cboy').setInteractive();
        boy.setScale(0.7);
        boy.on('pointerover', function (event) {
            boy.setScale(0.69);
        });
        boy.on('pointerout', function (event) {
            boy.setScale(0.7);
        });
        boy.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                // event.buttons
                user = 'boy';
                this.scene.start('industryLvl1');
                this.scene.stop();
            }
        }, this);

        var textConfig = {
            fontSize: '60px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(gameWidth / 2 - 300, 490, "BOY", textConfig);

        //Girl robot
        var girlRobot = this.add.image(gameWidth / 2 + 250, 350, 'cgirl').setInteractive();
        girlRobot.setScale(0.7);
        girlRobot.on('pointerover', function (event) {
            girlRobot.setScale(0.69);
        });
        girlRobot.on('pointerout', function (event) {
            girlRobot.setScale(0.7);
        });
        girlRobot.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                user = 'girl';
                this.scene.start('industryLvl1');
                this.scene.stop();
            }
        }, this);

        var textConfig = {
            fontSize: '60px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(gameWidth / 2 + 200, 490, "GIRL", textConfig);
    }

}


var config = {
    type: Phaser.AUTO,
    // pixelArt: true,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        resolution: 1,
        width: 1024,
        height: 685

    },
    scene: [
        industryChooseCharacter,
        industryLvl1Help,
        industryLvl1Instructions2,
        industryLvl1,
        industryGameOver,

    ],
    autoResize: true,
};

var game = new Phaser.Game(config);

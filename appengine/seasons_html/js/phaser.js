var score = 0;
var items;
var text, timer;
var min = 0;
var sec = 0;
var previousScene, currentScene;
var user;

var gameHeight, gameWidth;
var selectedTool = null;


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

        // this.events.on('pause', function () {
        //     // this.scene.sendToBack();
        //     console.log('Scene A paused');
        // });
        // this.events.on('resume', function () {
        //     // this.scene.moveUp();
        //     console.log('Scene A resumed');
        // });

        /* set game time
        *  min,sec */
        min = 2;
        sec = 30;
        score = 0;

        var background = this.add.image(-10, 0, 'SS', 'background').setScale(0.255).setOrigin(0).setInteractive();
        if (user === 'girl') {
            // this.add.image(0, 330, 'girl').setScale(0.15).setOrigin(0);
        } else {
            // this.add.image(0, 330, 'boy').setScale(0.15).setOrigin(0);
        }

        this.add.image(300, 320, 'SS', 'roboticArm').setScale(0.23).setOrigin(0);
        this.add.image(428, 429, 'SS', 'tool5').setScale(0.03).setOrigin(0).setDepth(1);

        // this.sound.add('bubblePop');

        /*
        * Tools on left side of the screen
        * */

        // TOOL1
        var ctool1 = this.physics.add.image(50, 120, 'SS', 'c/cTool1').setScale(0.2).setInteractive().setCircle(170);
        ctool1.name = 'tool1';
        ctool1.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool1.cur) 45 4, auto');
        });

        // TOOL2
        var ctool2 = this.physics.add.image(50, 200, 'SS', 'c/cTool2').setScale(0.2).setInteractive().setCircle(170);
        ctool2.name = 'tool2';
        ctool2.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool2.cur) 45 4, auto');
        });

        // TOOL3
        var ctool3 = this.physics.add.image(50, 280, 'SS', 'c/cTool3').setScale(0.2).setInteractive().setCircle(170);
        ctool3.name = 'tool3';
        ctool3.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool3.cur) 37 4, auto');
        });

        // TOOL4
        var ctool4 = this.physics.add.image(50, 360, 'SS', 'c/cTool4').setScale(0.2).setInteractive().setCircle(170);
        ctool4.name = 'tool4';
        ctool4.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool4.cur) 42 4, auto');
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
        var ctool5 = this.physics.add.image(gameWidth - 50, 120, 'SS', 'c/cTool5').setScale(0.2).setInteractive().setCircle(170);
        ctool5.name = 'tool5';
        ctool5.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/tool5.png) 32 32, auto');
        });

        var tool5_b = this.physics.add.image(373, 490, 'SS', 'tool5_b2').setScale(0.26, 0.23).setDepth(1);
        tool5_b.tool2 = false;
        var tool5_f = this.physics.add.image(372, 490, 'SS', 'tool5').setScale(0.048).setAlpha(0.01).setInteractive().setDepth(1);
        tool5_f.on('pointerdown', function () {
            if (selectedTool.name === 'tool2') {
                tool5_b.tool2 = true;
                this.scene.toolRotateAnim('tool2', tool5_b, 370, 490, 100);
                this.setAlpha(0.4);
            }
            if (tool5_b.tool2) {
                if (selectedTool.name === 'tool5') {
                    this.setAlpha(1);
                    tool5_b.destroy();
                }
            }
            this.scene.ctoggle(selectedTool, null);
        });

        var tool5_oil = this.physics.add.image(383, 347, 'SS', 'tool5_b').setScale(0.025).setDepth(1);
        var tool5_oil_f = this.physics.add.image(383, 347, 'SS', 'tool5').setScale(0.03).setAlpha(0.01).setInteractive().setDepth(1);
        tool5_oil_f.on('pointerdown', function () {
            if (selectedTool.name === 'oil') {
                var oilDrop = this.scene.physics.add.sprite(383, 325).setScale(0.3);
                oilDrop.anims.play('oilDrop');
                oilDrop.on('animationcomplete', function () {
                    oilDrop.destroy();
                    this.setAlpha(1);
                    tool5_oil.destroy();
                }, this);

            }
            this.scene.ctoggle(selectedTool, null);
        });

        // PLUG
        var cplug = this.physics.add.image(gameWidth - 50, 200, 'SS', 'c/cPlug').setScale(0.2).setInteractive().setCircle(170);
        cplug.name = 'plug';
        cplug.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/plug.cur) 30 15, auto');
        });

        var fplug = this.physics.add.image(547, 421, 'SS', 'plug').setScale(0.24).setAlpha(0.01).setInteractive();
        fplug.on('pointerdown', function () {
            if (selectedTool.name === 'plug') {
                this.setAlpha(1);
            }
            this.scene.ctoggle(selectedTool, null);
        });

        // ARM1
        var carm1 = this.physics.add.image(gameWidth - 50, 280, 'SS', 'c/cArm1').setScale(0.2).setInteractive().setCircle(170);
        carm1.name = 'arm1';
        carm1.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/arm1.cur) 40 40, auto');
        });

        var farm1 = this.physics.add.image(325, 600, 'SS', 'arm1').setScale(0.24).setAlpha(0.01).setInteractive();
        farm1.on('pointerdown', function () {
            if (selectedTool.name === 'arm1') {
                this.setAlpha(1);
            }
            this.scene.ctoggle(selectedTool, null);
        });

        // WIRE3
        var cwire3 = this.physics.add.image(gameWidth - 50, 360, 'SS', 'c/cWire3').setScale(0.2).setInteractive().setCircle(170);
        cwire3.name = 'wire3';
        cwire3.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/wire3.cur) 23 18, auto');
        });

        var wire3_b_image = this.add.image(410, 405, 'SS', 'wire3_b').setScale(0.23).setAlpha(1);
        var wire3_f = this.add.image(410, 405, 'SS', 'wire3_f').setScale(0.23).setAlpha(0.01);
        var wire3_b = this.physics.add.image(390, 405).setScale(4, 2.5).setInteractive().setDepth(1);
        wire3_b.tool3 = false;
        wire3_b.on('pointerdown', function () {
            if (selectedTool.name === 'tool3') {
                wire3_b.tool3 = true;
                this.scene.toolRotateAnim('tool3', wire3_b_image, 386, 388, 50);
                wire3_f.setAlpha(0.4);
            }
            if (wire3_b.tool3) {
                if (selectedTool.name === 'wire3') {
                    wire3_f.setAlpha(1);
                    wire3_b.destroy();
                }
            }
            this.scene.ctoggle(selectedTool, null);
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
        this.add.image(75, 40, 'btnb').setScale(0.22).setAlpha(1);
        text = this.add.text(32, 32);
        text.setStyle({color: '#ffffff'});
        // text.fontWeight = 'bold';

        this.add.image(720, 40, 'btnb').setScale(0.22).setAlpha(1);
        timer = this.add.text(700, 32);
        timer.setStyle({color: '#ffffff'});

        // this.time.addEvent({delay: 1000, callback: this.createBlocks, callbackScope: this, loop: true});
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

    toolRotateAnim(toolName, sprite, width, height, AngleLength) {
        var tempSprite = this.physics.add.sprite(width, height, 'SS', toolName).setDepth(1);
        tempSprite.left = true;
        tempSprite.mid = true;
        tempSprite.right = false;
        var timer = this.time.addEvent({
            delay: 250,
            callback: function () {
                // console.log(tempSprite.rotation);
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
        // this.scene.stop();
        // this.scene.start('industryNextLevel');
        // this.scene.start('industryBoyGameOver');

    }

    update() {
        // text.setText('Score: ' + score);

        // var pointer = this.input.activePointer;
        // text.setText('X: ' + pointer.worldX + '\nY:' + pointer.worldY);
        // timer.setText(min + ':' + sec + 's');
    }

}

class industryBoyLvl2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryBoyLvl2',
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                    // gravity: { y: 100 }
                }
            },
        });
    }

    create() {
        currentScene = 'industryBoyLvl2';
        this.scene.pause();
        this.scene.launch('industryLvl2Instructions1');
        this.scene.sendToBack();

        /* set game time
        *  min,sec */
        min = 0;
        sec = 30;
        score = 0;

        this.input.setDefaultCursor('url(./assets/boy.cur), pointer');
        this.add.image(0, 0, 'bbackground').setScale(0.3).setOrigin(0.01, 0);
        this.add.image(0, 430, 'bubble-shooter-boy').setScale(0.2).setOrigin(0.01, 0);
        this.sound.add('bubblePop');
        var mouseUp = this.add.image(400, 45, 'mouseAnimation', '1').setScale(0.2);
        var mouseDown = this.add.image(400, 45, 'mouseAnimation', '2').setScale(0.2);

        this.input.on('pointerdown', function () {
            if (event.buttons === 1) {
                mouseUp.visible = false;
                mouseDown.visible = true;
            }
        }, this);
        this.input.on('pointerup', function () {
            mouseUp.visible = true;
            mouseDown.visible = false;
        }, this);

        items = this.physics.add.group();

        this.time.addEvent({delay: 1000, callback: this.createBlocks, callbackScope: this, loop: true});
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

        this.add.image(75, 40, 'btnb').setScale(0.22).setAlpha(1);
        text = this.add.text(32, 32);
        text.setStyle({color: '#ffffff'});

        this.add.image(720, 40, 'btnb').setScale(0.22).setAlpha(1);
        timer = this.add.text(700, 32);
        timer.setStyle({color: '#ffffff'});

    }

    createBlocks() {
        var pos = Phaser.Geom.Rectangle.Random(this.physics.world.bounds);

        var block = items.create(80, 500, 'circle').setScale(0.01).setInteractive();
        block.setVelocity(0, 0);
        block.setCircle(320);
        block.setBounce(1).setCollideWorldBounds(true);

        this.time.delayedCall(0, function () {
            block.setVelocity(10, -(Phaser.Math.Between(1, 300)));
            block.setScale((0.02));
        }, [], this);
        this.time.delayedCall(500, function () {
            block.setVelocity(20, -(Phaser.Math.Between(1, 200)));
            block.setScale((0.04));
        }, [], this);
        this.time.delayedCall(700, function () {
            block.setVelocity(30, -(Phaser.Math.Between(1, 100)));
            block.setScale((0.06));
        }, [], this);
        this.time.delayedCall(800, function () {
            block.setVelocity(40, -(Phaser.Math.Between(1, 50)));
            block.setScale((0.07));
        }, [], this);
        this.time.delayedCall(900, function () {
            block.setScale((0.08));
        }, [], this);
        this.time.delayedCall(1000, function () {
            block.setVelocity(30, -30);
            block.setScale(0.09);
        }, [], this);

        this.time.delayedCall(1000, function () {

            block.setScale(0.12);
            var clicked = false;
            block.on('pointerdown', function (event) {
                if (event.buttons === 1) {
                    if (clicked) {
                        score += 2;
                        this.scene.sound.play('bubblePop');

                        var text = this.scene.add.text(this.x, this.y);
                        text.setStyle({color: '#000000'});
                        text.setText('+2');

                        this.scene.time.delayedCall(100, function () {
                            text.y += -2;
                        });
                        this.scene.time.delayedCall(200, function () {
                            text.y += -2;
                        });
                        this.scene.time.delayedCall(300, function () {
                            text.y += -2;
                            text.setAlpha(0.9);
                        });
                        this.scene.time.delayedCall(400, function () {
                            text.y += -2;
                            text.setAlpha(0.9);
                        });
                        this.scene.time.delayedCall(500, function () {
                            text.y += -2;
                            text.setAlpha(0.8);
                        });
                        this.scene.time.delayedCall(600, function () {
                            text.y += -2;
                            text.setAlpha(0.8);
                        });
                        this.scene.time.delayedCall(700, function () {
                            text.y += -2;
                            text.setAlpha(0.7);
                        });
                        this.scene.time.delayedCall(800, function () {
                            text.y += -2;
                            text.setAlpha(0.6);
                        });
                        this.scene.time.delayedCall(900, function () {
                            text.y += -2;
                            text.setAlpha(0.5);
                        });
                        this.scene.time.delayedCall(1000, function () {
                            text.y += -2;
                            text.destroy();
                        });

                        this.destroy();
                    } else {
                        clicked = true;
                        this.scene.time.delayedCall(500, function () {
                            clicked = false;
                        }, [], this);
                    }
                }

            });
            // }

            block.body.velocity.x += 10;
            if (Phaser.Math.Between(1, 100) > 50) {
                block.body.velocity.y += Phaser.Math.Between(1, 50);
            } else {
                block.body.velocity.y -= Phaser.Math.Between(1, 50);
            }

            // this.physics.add.collider(block, items);
            // block.play(Phaser.Math.RND.pick(anims));
        }, [], this);
    }

    gameOver() {
        this.scene.stop();
        this.scene.start('industryBoyGameOver');

    }

    update() {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');
    }
}

class industryBoyGameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryBoyGameOver',
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                }
            },
        });
    }

    create() {

        this.input.setDefaultCursor('url(./assets/boy.cur), pointer');
        this.add.image(0, 0, 'bbackground').setScale(0.3).setOrigin(0.01, 0);
        this.add.image(0, 430, 'bubble-shooter-boy').setScale(0.2).setOrigin(0.01, 0);
        this.sound.add('bubblePop');
        items = this.physics.add.group();

        this.time.addEvent({delay: 500, callback: this.createBlocks, callbackScope: this, loop: true});

        this.add.text(250, 100, "GAME OVER", {
            fontSize: '60px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });

        this.add.text(295, 160, "Your Score is", {
            fontSize: '30px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });
        this.add.text(360, 220, score, {
            fontSize: '100px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });
        // this.time.delayedCall(30000, this.gameOver, [], this);
        var reset = this.add.image(390, 500, 'btnb').setScale(0.3).setInteractive();

        var rsttxt = this.add.text(340, 485, "Restart", {
            fontSize: '30px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });

        reset.on('pointerover', function (event) {
            reset.setScale(0.29);
            rsttxt.setScale(0.99);
        });
        reset.on('pointerout', function (event) {
            reset.setScale(0.3);
            rsttxt.setScale(1);
        });
        reset.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                this.scene.stop();
                this.scene.start('industryChooseCharacter');
                // previousScene.restart();
            }
        }, this);


    }

    createBlocks() {
        var pos = Phaser.Geom.Rectangle.Random(this.physics.world.bounds);

        var block = items.create(80, 500, 'circle').setScale(0.01).setInteractive();
        block.setVelocity(0, 0);
        block.setCircle(320);
        block.setAlpha(0.5);
        // block.setBounce(1).setCollideWorldBounds(true);

        this.time.delayedCall(0, function () {
            block.setVelocity(10, -200);
            block.setScale((0.02));
        }, [], this);
        this.time.delayedCall(500, function () {
            block.setVelocity(20, -150);
            block.setScale((0.04));
        }, [], this);
        this.time.delayedCall(700, function () {
            block.setVelocity(30, -100);
            block.setScale((0.06));
        }, [], this);
        this.time.delayedCall(800, function () {
            block.setVelocity(40, -50);
            block.setScale((0.07));
        }, [], this);
        this.time.delayedCall(900, function () {
            block.setScale((0.08));
        }, [], this);
        this.time.delayedCall(1000, function () {
            block.setVelocity(30, -30);
            block.setScale(0.09);
        }, [], this);

        this.time.delayedCall(1000, function () {

            block.body.velocity.x += 10;
            if (Phaser.Math.Between(1, 100) > 50) {
                block.body.velocity.y += Phaser.Math.Between(1, 20);
            } else {
                block.body.velocity.y -= Phaser.Math.Between(1, 20);
            }
        }, [], this);
    }
}


class industryLvl1Instructions1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryLvl1Instructions1',
        });
    }

    create() {
        if (currentScene === 'industryGirlLvl1') {
            this.add.image(0, 0, 'gbackground').setTint(0x000000).setScale(0.3).setOrigin(0.01, 0).setAlpha(0.9);
        } else {
            this.add.image(0, 0, 'bbackground').setTint(0x000000).setScale(0.3).setOrigin(0.01, 0).setAlpha(0.9);
        }

        this.add.text(230, 50, "INSTRUCTIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });

        var ins1 = this.add.text(255, 500, "Press the Left button", {
            fontSize: '30px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });
        var ins1Flag = false;
        this.time.addEvent({
            delay: 500, callback: function () {
                if (ins1Flag) {
                    ins1.y = 500;
                    ins1Flag = false;
                } else {
                    ins1.y = 505;
                    ins1Flag = true;
                }
            }, callbackScope: this, loop: true
        });

        var mouse = this.add.sprite(400, 300, 'mouseAnimation', '1').setScale(0.7);

        var frameNames = this.anims.generateFrameNames('mouseAnimation', {
            frames: [1, 2, 5, 6, 7, 8]
            // start: 3, end: 8, zeroPad: 1,
            // prefix: '', suffix: ''
        });

        this.anims.create({key: 'clickMouse', frames: frameNames, frameRate: 3, repeat: -1});
        mouse.anims.play('clickMouse');

        this.input.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                ins1.x = 270;
                ins1.setText('HURRAY, You did it!');
                this.time.addEvent({
                    delay: 1000, callback: function () {
                        this.scene.resume('industryChooseCharacter');
                        this.scene.stop();
                    }, callbackScope: this, loop: false
                });
            }
        }, this);

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

class industryLvl2Instructions1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryLvl2Instructions1',
        });
    }

    create() {
        if (currentScene === 'industryGirlLvl2') {
            this.add.image(0, 0, 'gbackground').setTint(0x000000).setScale(0.3).setOrigin(0.01, 0).setAlpha(0.9);
        } else {
            this.add.image(0, 0, 'bbackground').setTint(0x000000).setScale(0.3).setOrigin(0.01, 0).setAlpha(0.9);
        }

        this.add.text(300, 50, "LEVEL 2", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });

        this.add.text(230, 100, "INSTRUCTIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });

        var ins1 = this.add.text(220, 500, "Press the left button (twice)", {
            fontSize: '30px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });
        var ins1Flag = false;
        this.time.addEvent({
            delay: 500, callback: function () {
                if (ins1Flag) {
                    ins1.y = 500;
                    ins1Flag = false;
                } else {
                    ins1.y = 505;
                    ins1Flag = true;
                }
            }, callbackScope: this, loop: true
        });

        var mouse = this.add.sprite(400, 300, 'mouseAnimation', '1').setScale(0.7);

        var frameNames = this.anims.generateFrameNames('mouseAnimation', {
            frames: [1, 2, 3, 4, 5, 6, 7, 8]
        });

        this.anims.create({key: 'clickMouseDouble', frames: frameNames, frameRate: 4, repeat: -1});
        mouse.anims.play('clickMouseDouble');

        var clicked = false;
        var ins2;
        this.input.on('pointerdown', function () {
            if (event.buttons === 1) {
                if (clicked) {
                    ins1.x = 270;
                    ins1.setText('HURRAY, You did it!');
                    this.time.addEvent({
                        delay: 1000, callback: function () {
                            this.scene.launch('industryLvl2Instructions2');
                            this.scene.stop();
                        }, callbackScope: this, loop: false
                    });
                } else {
                    clicked = true;
                    ins1.setText("Press the left button (twice)\n" + "        Oops ! Try again.");
                    this.time.delayedCall(500, function () {
                        clicked = false;
                    }, [], this);
                    this.time.delayedCall(1000, function () {
                        ins1.setText("Press the left button (twice)");
                    }, [], this);
                }
            }
        }, this);
    }
}

class industryLvl2Instructions2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryLvl2Instructions2',
        });
    }

    create() {
        if (currentScene === 'industryGirlLvl2') {
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

class industryNextLevel extends Phaser.Scene {

    constructor() {
        super({
            key: 'industryNextLevel',
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                }
            },
        });
    }

    create() {
        if (currentScene === 'industryGirlLvl1') {
            this.input.setDefaultCursor('url(./assets/girl.cur), pointer');
            this.add.image(0, 0, 'gbackground').setScale(0.3).setOrigin(0.01, 0);
            this.add.image(0, 430, 'bubble-shooter-girl').setScale(0.2).setOrigin(0.01, 0);
        } else {
            this.input.setDefaultCursor('url(./assets/boy.cur), pointer');
            this.add.image(0, 0, 'bbackground').setScale(0.3).setOrigin(0.01, 0);
            this.add.image(0, 430, 'bubble-shooter-boy').setScale(0.2).setOrigin(0.01, 0);
        }

        this.sound.add('bubblePop');
        items = this.physics.add.group();

        this.time.addEvent({delay: 500, callback: this.createBlocks, callbackScope: this, loop: true});

        if (currentScene === 'industryGirlLvl1') {
            this.add.text(250, 100, "GAME OVER", {
                fontSize: '60px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister, cursive'
            });

            this.add.text(295, 160, "Your Score is", {
                fontSize: '30px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister, cursive'
            });
            this.add.text(350, 220, score, {
                fontSize: '100px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister, cursive'
            });

            var reset = this.add.image(390, 500, 'btng').setScale(0.4).setInteractive();
        } else {
            this.add.text(250, 100, "GAME OVER", {
                fontSize: '60px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister, cursive'
            });

            this.add.text(295, 160, "Your Score is", {
                fontSize: '30px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister, cursive'
            });
            this.add.text(350, 220, score, {
                fontSize: '100px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister, cursive'
            });

            var reset = this.add.image(390, 500, 'btnb').setScale(0.4).setInteractive();
        }

        var rsttxt = this.add.text(320, 485, "Next Level", {
            fontSize: '30px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister, cursive'
        });

        reset.on('pointerover', function (event) {
            reset.setScale(0.39);
            rsttxt.setScale(0.99);
        });
        reset.on('pointerout', function (event) {
            reset.setScale(0.4);
            rsttxt.setScale(1);
        });
        reset.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                score = 0;
                if (currentScene === 'industryGirlLvl1') {
                    this.scene.start('industryGirlLvl2');
                } else {
                    this.scene.start('industryBoyLvl2');
                }
                this.scene.stop();
                // previousScene.restart();
            }
        }, this);


    }

    createBlocks() {
        var pos = Phaser.Geom.Rectangle.Random(this.physics.world.bounds);

        var block = items.create(80, 500, 'circle').setScale(0.01).setInteractive();
        block.setVelocity(0, 0);
        block.setCircle(320);
        block.setAlpha(0.5);
        // block.setBounce(1).setCollideWorldBounds(true);

        this.time.delayedCall(0, function () {
            block.setVelocity(10, -200);
            block.setScale((0.02));
        }, [], this);
        this.time.delayedCall(500, function () {
            block.setVelocity(20, -150);
            block.setScale((0.04));
        }, [], this);
        this.time.delayedCall(700, function () {
            block.setVelocity(30, -100);
            block.setScale((0.06));
        }, [], this);
        this.time.delayedCall(800, function () {
            block.setVelocity(40, -50);
            block.setScale((0.07));
        }, [], this);
        this.time.delayedCall(900, function () {
            block.setScale((0.08));
        }, [], this);
        this.time.delayedCall(1000, function () {
            block.setVelocity(30, -30);
            block.setScale(0.09);
        }, [], this);

        this.time.delayedCall(1000, function () {

            block.body.velocity.x += 10;
            if (Phaser.Math.Between(1, 100) > 50) {
                block.body.velocity.y += Phaser.Math.Between(1, 20);
            } else {
                block.body.velocity.y -= Phaser.Math.Between(1, 20);
            }
        }, [], this);
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

        this.load.image('background', './assets/factory_soil.png');
        this.load.image('introBackground', './assets/smoke_background.png');
        this.load.image('cboy', './assets/b.png');
        this.load.image('boy', './assets/boy1.png');
        this.load.image('cgirl', './assets/g.png');
        this.load.image('girl', './assets/girl1.png');
        this.load.image('cStrawberrySeed', './assets/game industry/strawberry seed.png');
        this.load.image('cSunflowerSeed', './assets/game industry/sunflower seed.png');
        this.load.image('c', './assets/c.png');

        // this.load.audio('bubblePop', './assets/Pop-sound-effect.mp3', {instances: 1});
        this.load.multiatlas('SS', './assets/Animations/SS.json', './assets/Animations');
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
        industryLvl1Instructions1,
        industryLvl1Instructions2,
        industryLvl1,
        industryLvl2Instructions1,
        industryLvl2Instructions2,
        industryBoyLvl2,
        industryBoyGameOver,
        industryNextLevel
    ],
    autoResize: true,
};

var game = new Phaser.Game(config);

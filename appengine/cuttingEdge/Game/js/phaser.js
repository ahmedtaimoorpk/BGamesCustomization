var score = 0;
var items;
var text, timer;
var min = 0;
var sec = 0;
var previousScene, currentScene;
var user;

var gameHeight, gameWidth;
var selectedTool = null;
// Sound Var
var sbg;

class CELvl1Pre extends Phaser.Scene {

    constructor() {
        super({
            key: 'CELvl1Pre',
        });
    }

    create() {
        this.add.image(0, 0, 'SS', 'lvl1/b').setTint(0x000000).setScale(1).setOrigin(0.01, 0).setAlpha(0.9);

        if (user === 'girl') {
            this.add.image(10, gameHeight - 10, 'SS', 'char/girl').setScale(0.3).setOrigin(0.01, 1);
        } else {
            this.add.image(10, gameHeight - 10, 'SS', 'char/boy').setScale(0.3).setOrigin(0.01, 1);
        }

        this.add.text(gameWidth / 2, 50, "INSTRUCTIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.text(gameWidth / 2, 100, "LEVEL 1", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.image(gameWidth - 150, gameHeight - 70, 'SS', 'UI/btnStart').setScale(1.5).setInteractive().on('pointerdown', function () {
            this.setScale(0.9);
            game.scene.resume(currentScene);
            game.scene.sendToBack('CELvl1Pre');
            game.scene.stop('CELvl1Pre');
        });

    }

}

class CELvl1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'CELvl1',
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
        // currentScene = 'CELvl1';
        // this.scene.pause();
        // this.scene.launch('CELvl1Pre');
        // this.scene.sendToBack();

        /*
        * set game time min,sec
        */
        min = 2;
        sec = 0;
        score = 0;

        var background = this.add.image(0, 0, 'SS', 'lvl1/b').setOrigin(0).setInteractive();

        /*
        * Tools on left side of the screen
        * */
        var items = this.physics.add.group();
        var sprite;

        sprite = items.create(439, 437, 'SS', 'bcr').setScale(0.5).setInteractive();
        sprite.color = 'red';
        sprite = items.create(516, 437, 'SS', 'bcr').setScale(0.5).setInteractive();
        sprite.color = 'red';
        sprite = items.create(758, 437, 'SS', 'bcr').setScale(0.5).setInteractive();
        sprite.color = 'blue';
        sprite = items.create(800, 437, 'SS', 'bcr').setScale(0.5).setInteractive();
        sprite.color = 'blue';


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
        * Fill the Shapes with required shape
        * */

        this.input.setHitArea(items.getChildren()).on('gameobjectdown', function (pointer, gameObject) {
            if (gameObject.color === 'red') {
                console.log('red');
            } else if (gameObject.color === 'blue') {
                console.log('blue');
            }


            // var lvlCompleted = true;
            // items.getChildren().forEach(function (obj) {
            //     if (obj.alpha !== 1) {
            //         lvlCompleted = false;
            //     }
            // });
            // if (lvlCompleted) {
            //     this.scene.input.setDefaultCursor('pointer');
            //     this.scene.gameOver();
            // }
        });


        // this.time.addEvent({delay: 3000, callback: this.createCars, callbackScope: this, loop: true});


        /*
        * Add text in left and right buttons
        */
        this.physics.add.image(gameWidth - 80, 50, 'SS', 'UI/btnHint').setScale(0.5).setAlpha(1).setInteractive().on('pointerdown', function () {
            this.setScale(0.48);

            items.getChildren().forEach(function (obj) {
                if (obj.alpha !== 1) {
                    // obj.setTintFill(0xffffff);
                    this.scene.add.tween({
                        targets: obj,
                        ease: 'Sine.easeInOut',
                        duration: 1000,
                        delay: 0,
                        alpha: {
                            getStart: () => 0.01,
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
                                    getEnd: () => 0.01
                                },
                                onComplete: () => {
                                    //handle completion
                                }
                            });
                        }
                    });
                }
            }, this);

        }).on('pointerup', function () {
            this.setScale(0.5);
        });
        text = this.add.text(32, 32);
        text.setStyle({color: '#ffffff'});
        // text.fontWeight = 'bold';

        timer = this.add.text(gameWidth / 2, 32).setOrigin(0.5, 0);
        timer.setStyle({color: '#ffffff', fontSize: '30px'});

        // this.time.addEvent({delay: 1000, callback: this.createBlocks, callbackScope: this, loop: true});
        this.time.addEvent({
            delay: 1000, callback: function () {
                if (sec === 0) {
                    if (min === 0) {
                        this.gameOver(true);
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
            previous.setScale(0.4);
            previous.setAlpha(1);
        }
        if (current != null) {
            current.setScale(0.35);
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

    createCars() {
        if (Phaser.Math.Between(1, 100) < 50) {
            if (Phaser.Math.Between(1, 100) < 50) {
                if (Phaser.Math.Between(1, 100) < 50) {
                    this.physics.add.sprite(-200, 605, 'SS', 'UI/fcar1').setVelocity(150, 0);
                } else {
                    this.physics.add.sprite(-200, 605, 'SS', 'UI/fcar2').setVelocity(150, 0);
                }
            } else {
                if (Phaser.Math.Between(1, 100) < 60) {
                    this.physics.add.sprite(1024, 635, 'SS', 'UI/bcar1').setVelocity(-150, 0).setDepth(1).setScale(0.9);
                } else {
                    this.physics.add.sprite(1024, 635, 'SS', 'UI/bcar2').setVelocity(-150, 0).setDepth(1).setScale(1.5);
                }
            }
        }
    }

    gameOver(timesUp = false) {
        this.scene.start('CELvl1Post', timesUp);
        this.scene.stop();
    }

    update() {
        // text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');

        var pointer = this.input.activePointer;
        text.setText('X: ' + pointer.worldX + '\nY:' + pointer.worldY);

    }

}

class CELvl1Post extends Phaser.Scene {

    constructor() {
        super({
            key: 'CELvl1Post',
        });
    }

    create(timesUp) {
        console.log(timesUp);
        this.add.image(0, 0, 'SS', 'lvl2/b').setScale(0.82).setOrigin(0.01, 0).setAlpha(0.5);

        if (user === 'girl') {
            this.add.image(10, gameHeight - 10, 'SS', 'char/girl').setScale(0.3).setOrigin(0.01, 1);
        } else {
            this.add.image(10, gameHeight - 10, 'SS', 'char/boy').setScale(0.3).setOrigin(0.01, 1);
        }

        this.add.text(gameWidth / 2, 50, "CONGRATULATIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.text(gameWidth / 2, 110, "You have completed Level 1", {
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

        this.add.image(gameWidth - 150, gameHeight - 70, 'SS', 'UI/btnNextLevel').setScale(1.5).setInteractive().on('pointerdown', function () {
            this.setScale(0.9);
            game.scene.start('CELvl2');
            game.scene.sendToBack('CELvl1Post');
            game.scene.stop('CELvl1Post');
        });
    }
}

class CELvl2Pre extends Phaser.Scene {

    constructor() {
        super({
            key: 'CELvl2Pre',
        });
    }

    create() {

        this.add.image(0, 0, 'SS', 'lvl2/b').setTint(0x000000).setScale(1).setOrigin(0.01, 0).setAlpha(0.9);

        if (user === 'girl') {
            this.add.image(10, gameHeight - 10, 'SS', 'char/girl').setScale(0.3).setOrigin(0.01, 1);
        } else {
            this.add.image(10, gameHeight - 10, 'SS', 'char/boy').setScale(0.3).setOrigin(0.01, 1);
        }

        this.add.text(gameWidth / 2, 50, "INSTRUCTIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.text(gameWidth / 2, 100, "LEVEL 2", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister, cursive'
        }).setOrigin(0.5, 0);

        this.add.image(gameWidth - 150, gameHeight - 70, 'SS', 'UI/btnStart').setScale(1.5).setInteractive().on('pointerdown', function () {
            this.setScale(0.9);
            game.scene.resume(currentScene);
            game.scene.sendToBack('CELvl2Pre');
            game.scene.stop('CELvl2Pre');
        });

    }

}

class CELvl2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'CELvl2',
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
        currentScene = 'CELvl2';
        this.scene.pause();
        this.scene.launch('CELvl2Pre');
        this.scene.sendToBack();

        /*
        * set game time min,sec
        */
        min = 2;
        sec = 0;
        score = 0;

        var background = this.add.image(-190, 0, 'SS', 'lvl2/b').setScale(0.82).setOrigin(0).setInteractive();
        var shapes = this.physics.add.group();

        /*
        * Tools on left side of the screen
        * */
        // TOOL1
        var ccircle = this.physics.add.image(50, 120, 'SS', 'c/clvl2rwrect').setScale(0.4).setInteractive().setCircle(80);
        ccircle.name = 'wrect';
        ccircle.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/wrect.png) 45 6, auto');
        });

        shapes.create(939, 361, 'SS', 'shapes/rwrect').setScale(1.2).setAlpha(0.01).shape = 'wrect';
        shapes.create(939, 414, 'SS', 'shapes/rwrect').setScale(1.2).setAlpha(0.01).shape = 'wrect';
        shapes.create(939, 491, 'SS', 'shapes/rwrect').setScale(1.2).setAlpha(0.01).shape = 'wrect';
        shapes.create(939, 568, 'SS', 'shapes/rwrect').setScale(1.2).setAlpha(0.01).shape = 'wrect';

        // TOOL2
        var hcyl = this.physics.add.image(50, 200, 'SS', 'c/clvl2hcyl').setScale(0.4).setInteractive().setCircle(80);
        hcyl.name = 'hcyl';
        hcyl.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/hcyl25x25.png) 12 12, auto');
        });

        shapes.create(169, 343, 'SS', 'shapes/hcyl').setScale(0.86, 0.87).setAlpha(0.01).shape = 'hcyl';
        shapes.create(191, 381, 'SS', 'shapes/hcyl').setScale(0.86, 0.87).setAlpha(0.01).shape = 'hcyl';
        shapes.create(213, 420, 'SS', 'shapes/hcyl').setScale(0.86, 0.87).setAlpha(0.01).shape = 'hcyl';
        shapes.create(191, 458, 'SS', 'shapes/hcyl').setScale(0.86, 0.87).setAlpha(0.01).shape = 'hcyl';


        // TOOL3
        var cocta = this.physics.add.image(50, 280, 'SS', 'c/clvl2octa').setScale(0.4).setInteractive().setCircle(80);
        cocta.name = 'octa';
        cocta.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/octa33x33.png) 16 16, auto');
        });

        shapes.create(532.5, 251.5, 'SS', 'shapes/octa').setScale(0.82).setAlpha(0.01).shape = 'octa';
        shapes.create(600.5, 204.5, 'SS', 'shapes/octa').setScale(0.82).setAlpha(0.01).shape = 'octa';
        shapes.create(663.5, 252.5, 'SS', 'shapes/octa').setScale(0.82).setAlpha(0.01).shape = 'octa';
        shapes.create(663.5, 347.5, 'SS', 'shapes/octa').setScale(0.82).setAlpha(0.01).shape = 'octa';

        // TOOL4
        var chrect = this.physics.add.image(50, 360, 'SS', 'c/clvl2rhrect').setScale(0.4).setInteractive().setCircle(80);
        chrect.name = 'hrect';
        chrect.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, this);
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/hrect.png) 32 32, auto');
        });

        shapes.create(875, 361, 'SS', 'shapes/rhrect').setScale(0.8).setAlpha(0.01).shape = 'hrect';
        shapes.create(999, 465, 'SS', 'shapes/rhrect').setScale(0.8).setAlpha(0.01).shape = 'hrect';

        background.on('pointerdown', function () {
            this.scene.ctoggle(selectedTool, null);
            this.scene.input.setDefaultCursor('auto');
        });


        /*
        * Animations Code
        * */
        // OIL
        this.time.addEvent({delay: 3000, callback: this.createCars, callbackScope: this, loop: true});


        /*
        * Fill the Shapes with required shape
        * */
        this.input.setHitArea(shapes.getChildren()).on('gameobjectdown', function (pointer, gameObject) {
            if (selectedTool != null && gameObject.alpha !== 1) {
                if (selectedTool.name === 'wrect' && gameObject.shape === 'wrect') {
                    gameObject.setAlpha(1);
                    score += 5;
                } else if (selectedTool.name === 'hcyl' && gameObject.shape === 'hcyl') {
                    gameObject.setAlpha(1);
                    score += 5;
                } else if (selectedTool.name === 'octa' && gameObject.shape === 'octa') {
                    gameObject.setAlpha(1);
                    score += 5;
                } else if (selectedTool.name === 'hrect' && gameObject.shape === 'hrect') {
                    gameObject.setAlpha(1);
                    score += 5;
                }
            }
            var lvlCompleted = true;
            shapes.getChildren().forEach(function (obj) {
                if (obj.alpha !== 1) {
                    lvlCompleted = false;
                }
            });
            if (lvlCompleted) {
                this.scene.input.setDefaultCursor('pointer');
                this.scene.gameOver();
            }
        });


        /*
        * Add text in left and right buttons
        */
        // HINT
        this.physics.add.image(gameWidth - 80, 50, 'SS', 'UI/btnHint').setScale(1).setAlpha(1).setInteractive().on('pointerdown', function () {
            this.setScale(0.9);

            shapes.getChildren().forEach(function (obj) {
                if (obj.alpha !== 1) {
                    // obj.setTintFill(0xffffff);
                    this.scene.add.tween({
                        targets: obj,
                        ease: 'Sine.easeInOut',
                        duration: 1000,
                        delay: 0,
                        alpha: {
                            getStart: () => 0.01,
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
                                    getEnd: () => 0.01
                                },
                                onComplete: () => {
                                    //handle completion
                                }
                            });
                        }
                    });
                }
            }, this);

        }).on('pointerup', function () {
            this.setScale(1);
        });


        text = this.add.text(32, 32);
        text.setStyle({color: '#ffffff'});

        // this.add.image(720, 40, 'btnb').setScale(0.22).setAlpha(1);
        timer = this.add.text(gameWidth / 2, 32).setOrigin(0.5, 0);
        timer.setStyle({color: '#ffffff', fontSize: '30px'});

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
            previous.setScale(0.4);
            previous.setAlpha(1);
        }
        if (current != null) {
            current.setScale(0.35);
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
        this.scene.start('CEgameOver');
        this.scene.stop();
    }

    createCars() {
        if (Phaser.Math.Between(1, 100) < 50) {
            if (Phaser.Math.Between(1, 100) < 50) {
                if (Phaser.Math.Between(1, 100) < 50) {
                    this.physics.add.sprite(-200, 605, 'SS', 'UI/fcar1').setVelocity(150, 0);
                } else {
                    this.physics.add.sprite(-200, 605, 'SS', 'UI/fcar2').setVelocity(150, 0);
                }
            } else {
                if (Phaser.Math.Between(1, 100) < 60) {
                    this.physics.add.sprite(1024, 635, 'SS', 'UI/bcar1').setVelocity(-150, 0).setDepth(1).setScale(0.9);
                } else {
                    this.physics.add.sprite(1024, 635, 'SS', 'UI/bcar2').setVelocity(-150, 0).setDepth(1).setScale(1.5);
                }
            }
        }
    }

    update() {
        // text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');

        // var pointer = this.input.activePointer;
        // text.setText('X: ' + pointer.worldX + '\nY:' + pointer.worldY);

    }

}

class CEgameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'CEgameOver',
        });
    }

    create() {

        this.add.image(0, 0, 'SS', 'lvl2/b').setScale(0.82).setOrigin(0.01, 0).setAlpha(0.5);

        if (user === 'girl') {
            this.add.image(10, gameHeight - 10, 'SS', 'char/girl').setScale(0.3).setOrigin(0.01, 1);
        } else {
            this.add.image(10, gameHeight - 10, 'SS', 'char/boy').setScale(0.3).setOrigin(0.01, 1);
        }

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

        this.add.image(gameWidth - 150, gameHeight - 70, 'SS', 'UI/btnRestart').setScale(1.5).setInteractive().on('pointerdown', function () {
            this.setScale(0.9);
            game.scene.start('CEChooseCharacter');
            game.scene.sendToBack('CEgameOver');
            game.scene.stop('CEgameOver');
        });
    }
}

class CEChooseCharacter extends Phaser.Scene {

    constructor() {
        super({
            key: 'CEChooseCharacter',
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

        // SpriteSheet
        this.load.multiatlas('SS', './assets/Animations/SS.json', './assets/Animations');

        // SOUNDS
        this.load.audio('bg', './assets/sounds/background.ogg', {instances: 50});

        //Load Cursors
        this.input.setDefaultCursor('url(assets/cursors/circle.cur) 45 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/rect.cur) 45 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/sqr.cur) 45 4, auto');
        this.input.setDefaultCursor('url(assets/cursors/tri.cur) 45 4, auto');
        this.input.setDefaultCursor('auto');

    }

    create() {
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        this.scene.start('CELvl1');

        // this.scene.pause();
        // this.scene.launch('CELvl1Instructions1');

        gameWidth = this.game.config.width;
        gameHeight = this.game.config.height;

        //Sound
        // sbg = this.sound.add('bg');
        // sbg.play();
        // sbg.setVolume(0.2);

        //Background
        this.add.image(0, 0, 'SS', 'lvl1/b').setScale(1).setOrigin(0, 0).setAlpha(1);
        var textConfig = {
            fontSize: '60px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(gameWidth / 2, 80, "SELECT YOUR CHARACTER", textConfig).setOrigin(0.5, 0);
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
        var boy = this.add.image(gameWidth / 2 - 250, 350, 'SS', 'char/boy').setInteractive().setScale(0.2);
        boy.on('pointerover', function (event) {
            boy.setScale(0.19);
            this.scene.input.setDefaultCursor('pointer');
        }).on('pointerout', function (event) {
            boy.setScale(0.2);
            this.scene.input.setDefaultCursor('default');
        }).on('pointerdown', function (event) {
            if (event.buttons === 1) {
                user = 'boy';
                this.scene.start('CELvl1');
                this.scene.stop();
            }
        }, this);

        var textConfig = {
            fontSize: '60px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(gameWidth / 2 - 300, 490, "BOY", textConfig);

        //Girl
        var girl = this.add.image(gameWidth / 2 + 250, 350, 'SS', 'char/girl').setInteractive().setScale(0.2);
        girl.on('pointerover', function (event) {
            girl.setScale(0.19);
            this.scene.input.setDefaultCursor('pointer');
        }).on('pointerout', function (event) {
            girl.setScale(0.2);
            this.scene.input.setDefaultCursor('default');
        }).on('pointerdown', function (event) {
            if (event.buttons === 1) {
                user = 'girl';
                this.scene.start('CELvl1');
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
        CEChooseCharacter,
        CELvl1Pre,
        CELvl1,
        CELvl1Post,
        CELvl2Pre,
        CELvl2,
        CEgameOver,
    ],
    autoResize: true,
};

var game = new Phaser.Game(config);

var score = 0;
var items;
var text, timer;
var min = 0;
var sec = 0;
var previousScene, currentScene;
var user;

var keySpace;
var bullets;
var shooter;
var ship;
var speed;
var stats;
var cursors;
var lastFired = 0;

class lKLvl1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'lKLvl1',
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
        currentScene = 'lKLvl1';
        this.scene.pause();
        this.scene.launch('lvl1ins1');
        this.scene.sendToBack();

        /* set game time
        *  min,sec */
        min = 0;
        sec = 30;

        if (user === 'girl') {
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

        this.time.addEvent({delay: 700, callback: this.createBlocks, callbackScope: this, loop: true});

        /*
        * Score and Timer Button
        * */
        if (user === 'girl') {
            this.add.image(75, 40, 'btng').setScale(0.22).setAlpha(1);
            text = this.add.text(32, 32);
            text.setStyle({color: '#ffffff'});

            this.add.image(720, 40, 'btng').setScale(0.22).setAlpha(1);
            timer = this.add.text(700, 32);
            timer.setStyle({color: '#ffffff'});
        } else {
            this.add.image(75, 40, 'btnb').setScale(0.22).setAlpha(1);
            text = this.add.text(32, 32);
            text.setStyle({color: '#ffffff'});

            this.add.image(720, 40, 'btnb').setScale(0.22).setAlpha(1);
            timer = this.add.text(700, 32);
            timer.setStyle({color: '#ffffff'});
        }
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

        // this.input.keyboard.on('keydown_A', function (event) {console.log('a')});

    }

    createBlocks() {
        var pos = Phaser.Geom.Rectangle.Random(this.physics.world.bounds);

        var block = this.add.image(0, 0, 'circle').setScale(0.01);

        var key = Phaser.Math.RND.pick(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']);

        var bubbleColor = this.getRandomColor();
        var style = {
            font: "32px Love Ya Like A Sister",
            fill: bubbleColor,
            wordWrap: true,
            wordWrapWidth: block.width,
            align: "center"
        };
        var bubbleText = this.add.text(-10, -15, key, style);
        bubbleText.setAlpha(0);
        // bubbleText.setText('A').setStyle({font:'50px;'});

        var container = this.add.container(80, 500, [block, bubbleText]);
        container.setSize(60, 60);
        this.physics.world.enable(container);
        container.setInteractive();

        container.body.setVelocity(0, 0);
        container.body.setCircle(30);
        container.body.setBounce(1).setCollideWorldBounds(true);

        this.time.delayedCall(0, function () {
            container.body.setVelocity(10, -(Phaser.Math.Between(1, 300)));
            block.setScale((0.02));
        }, [], this);
        this.time.delayedCall(500, function () {
            container.body.setVelocity(20, -(Phaser.Math.Between(1, 200)));
            block.setScale((0.04));
        }, [], this);
        this.time.delayedCall(700, function () {
            container.body.setVelocity(30, -(Phaser.Math.Between(1, 100)));
            block.setScale((0.06));
        }, [], this);
        this.time.delayedCall(800, function () {
            container.body.setVelocity(40, -(Phaser.Math.Between(1, 50)));
            block.setScale((0.07));
        }, [], this);
        this.time.delayedCall(900, function () {
            block.setScale((0.08));
        }, [], this);
        this.time.delayedCall(1000, function () {
            container.body.setVelocity(30, -30);
            block.setScale(0.09);
            bubbleText.setAlpha(1);
            bubbleText.setScale(0.9);
        }, [], this);

        this.time.delayedCall(1000, function () {
            this.input.keyboard.once('keydown_' + key, function () {
                score += 2;
                this.scene.sound.play('bubblePop');
                var text = this.scene.add.text(container.x, container.y);
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
                container.destroy();
            });

            container.body.velocity.x += 10;
            if (Phaser.Math.Between(1, 100) > 50) {
                container.body.velocity.y += Phaser.Math.Between(1, 50);
            } else {
                container.body.velocity.y -= Phaser.Math.Between(1, 50);
            }
        }, [], this);
    }

    gameOver() {
        this.scene.stop();
        this.scene.start('NextLevel');

    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    update() {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');
    }

}

class lKLvl2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'lKLvl2',
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
        currentScene = 'lKLvl2';
        this.scene.pause();
        this.scene.launch('lvl2ins1');
        this.scene.sendToBack();

        /* set game time
        *  min,sec */
        min = 0;
        sec = 30;
        score = 0;

        if (user === 'girl') {
            this.input.setDefaultCursor('url(./assets/girl.cur), pointer');
            this.add.image(0, 0, 'gbackground').setScale(0.3).setOrigin(0.01, 0);
            shooter = this.physics.add.image(0, 430, 'bubble-shooter-girl').setScale(0.2).setOrigin(0.01, 0).setImmovable();
            shooter.body.setSize(shooter.body.width - 150, shooter.body.height - 200, 0, 0);
        } else {
            this.input.setDefaultCursor('url(./assets/boy.cur), pointer');
            this.add.image(0, 0, 'bbackground').setScale(0.3).setOrigin(0.01, 0);
            shooter = this.physics.add.image(0, 430, 'bubble-shooter-boy').setScale(0.2).setOrigin(0.01, 0).setImmovable();
            shooter.body.setSize(shooter.body.width - 150, shooter.body.height - 200, 0, 0);
        }

        this.sound.add('bubblePop');

        keySpace = this.input.keyboard.addKey('Space');

        items = this.physics.add.group();

        /*
        * Add text in left and right buttons
        */
        if (user === 'girl') {
            this.add.image(75, 40, 'btng').setScale(0.22).setAlpha(1);
            text = this.add.text(32, 32);
            text.setStyle({color: '#ffffff'});

            this.add.image(720, 40, 'btng').setScale(0.22).setAlpha(1);
            timer = this.add.text(700, 32);
            timer.setStyle({color: '#ffffff'});
        } else {
            this.add.image(75, 40, 'btnb').setScale(0.22).setAlpha(1);
            text = this.add.text(32, 32);
            text.setStyle({color: '#ffffff'});

            this.add.image(720, 40, 'btnb').setScale(0.22).setAlpha(1);
            timer = this.add.text(700, 32);
            timer.setStyle({color: '#ffffff'});
        }


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

        var Bullet = new Phaser.Class({
            Extends: Phaser.GameObjects.Image,
            initialize: function Bullet(scene) {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'circle');

                this.speed = Phaser.Math.GetSpeed(400, 1);
            },

            fire: function (x, y) {
                this.setPosition(x, y - 50);

                this.setActive(true);
                this.setVisible(true);
                this.setScale(0.02);
                this.setTint(0x000000);
            },

            update: function (time, delta) {
                this.y -= this.speed * delta;

                if (this.y < -50) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
        });

        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 1,
            runChildUpdate: true
        });

        if (user === 'girl') {
            ship = this.physics.add.sprite(400, 540, 'girl').setDepth(1).setScale(0.05);
        } else {
            ship = this.physics.add.sprite(400, 540, 'boy').setDepth(1).setScale(0.04);
        }

        ship.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();

        speed = Phaser.Math.GetSpeed(300, 1);

        // this.physics.add.collider(shooter, ship, null,function () {
        //     console.log('asd');
        // },null,0);

        this.physics.add.overlap(bullets, items, function (bullet, bubble) {
            score += 2;
            this.sound.play('bubblePop');

            var text = this.add.text(bubble.x, bubble.y);
            text.setStyle({color: '#000000'});
            text.setText('+2');

            this.time.delayedCall(100, function () {
                text.y += -2;
            });
            this.time.delayedCall(200, function () {
                text.y += -2;
            });
            this.time.delayedCall(300, function () {
                text.y += -2;
                text.setAlpha(0.9);
            });
            this.time.delayedCall(400, function () {
                text.y += -2;
                text.setAlpha(0.9);
            });
            this.time.delayedCall(500, function () {
                text.y += -2;
                text.setAlpha(0.8);
            });
            this.time.delayedCall(600, function () {
                text.y += -2;
                text.setAlpha(0.8);
            });
            this.time.delayedCall(700, function () {
                text.y += -2;
                text.setAlpha(0.7);
            });
            this.time.delayedCall(800, function () {
                text.y += -2;
                text.setAlpha(0.6);
            });
            this.time.delayedCall(900, function () {
                text.y += -2;
                text.setAlpha(0.5);
            });
            this.time.delayedCall(1000, function () {
                text.y += -2;
                text.destroy();
            });

            bullet.destroy();
            bubble.destroy();
        }, null, this);
        this.physics.add.collider(ship, shooter);


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
            // block.setVelocity(Phaser.Math.Between(10, 25), Phaser.Math.Between(10, 25));

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
        this.scene.start('gameOver');
        // this.scene.restart();

    }

    update(time, delta) {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');

        if (cursors.left.isDown && ship.x >= 170) {
            ship.x -= speed * delta;
        } else if (cursors.right.isDown) {
            ship.x += speed * delta;
        }

        if (keySpace.isDown && time > lastFired) {
            var bullet = bullets.get();

            if (bullet) {
                bullet.fire(ship.x, ship.y);

                lastFired = time + 50;
            }
        }
    }

}

class gameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameOver',
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
        if (user === 'girl') {
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

        if (user === 'girl') {
            this.add.text(250, 100, "GAME OVER", {
                fontSize: '60px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister'
            });

            this.add.text(295, 160, "Your Score is", {
                fontSize: '30px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister'
            });
            this.add.text(360, 220, score, {
                fontSize: '100px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister'
            });

            var reset = this.add.image(390, 500, 'btng').setScale(0.5, 0.4).setInteractive();
        } else {
            this.add.text(250, 100, "GAME OVER", {
                fontSize: '60px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister'
            });

            this.add.text(295, 160, "Your Score is", {
                fontSize: '30px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister'
            });
            this.add.text(360, 220, score, {
                fontSize: '100px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister'
            });

            var reset = this.add.image(390, 500, 'btnb').setScale(0.5, 0.4).setInteractive();
        }

        var rsttxt = this.add.text(295, 490, "Restart (Press enter)", {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        this.input.keyboard.once('keydown_' + 'ENTER', function (event) {
            score = 0;
            this.scene.start('lKChooseCharacter');
            this.scene.stop();
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
            // block.setVelocity(Phaser.Math.Between(10, 25), Phaser.Math.Between(10, 25));

            // block.on('pointerdown', function (block) {
            //     score += 2;
            //     this.scene.sound.play('bubblePop');
            //     this.disableBody(true, true);
            // });

            block.body.velocity.x += 10;
            if (Phaser.Math.Between(1, 100) > 50) {
                block.body.velocity.y += Phaser.Math.Between(1, 20);
            } else {
                block.body.velocity.y -= Phaser.Math.Between(1, 20);
            }

            // this.physics.add.collider(block, items);
            // block.play(Phaser.Math.RND.pick(anims));
        }, [], this);
    }
}

class gameStartIns extends Phaser.Scene {

    constructor() {
        super({
            key: 'gameStartIns',
        });
    }

    create() {
        if (currentScene === 'learningMouseGirlLvl1') {
            this.add.image(0, 0, 'gbackground').setTint(0x000000).setScale(0.3).setOrigin(0.01, 0).setAlpha(0.9);
        } else {
            this.add.image(0, 0, 'bbackground').setTint(0x000000).setScale(0.3).setOrigin(0.01, 0).setAlpha(0.9);
        }

        this.add.text(230, 50, "INSTRUCTIONS", {
            fontSize: '60px',
            fontFamily: 'Love Ya Like A Sister'
        });

        var ins1 = this.add.text(140, 500, "Press the (Enter) Key from the Keyboard", {
            fontSize: '30px',
            fontFamily: 'Love Ya Like A Sister'
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

        var kb = this.add.sprite(400, 350, 'kbAnimation', 'enter-1').setScale(0.7);

        var frameNames = this.anims.generateFrameNames('kbAnimation', {frames: ['enter-1', 'enter-2']});

        this.anims.create({key: 'kbanim', frames: frameNames, frameRate: 1, repeat: -1});
        kb.anims.play('kbanim');

        this.input.keyboard.once('keydown_' + 'ENTER', function (event) {
            ins1.x = 270;
            ins1.setText('HURRAY, You did it!');
            this.time.delayedCall(1000, function () {
                this.scene.resume('lKChooseCharacter');
                this.scene.stop();
            }, [], this);
        }, this);
    }
}

class NextLevel extends Phaser.Scene {

    constructor() {
        super({
            key: 'NextLevel',
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
        if (user === 'girl') {
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

        if (user === 'girl') {
            this.add.text(250, 100, "GAME OVER", {
                fontSize: '60px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister'
            });

            this.add.text(295, 160, "Your Score is", {
                fontSize: '30px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister'
            });
            this.add.text(360, 220, score, {
                fontSize: '100px',
                color: '#ffffff',
                fontFamily: 'Love Ya Like A Sister'
            });

            var reset = this.add.image(390, 500, 'btng').setScale(0.5, 0.4).setInteractive();
        } else {
            this.add.text(250, 100, "GAME OVER", {
                fontSize: '60px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister'
            });

            this.add.text(295, 160, "Your Score is", {
                fontSize: '30px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister'
            });
            this.add.text(360, 220, score, {
                fontSize: '100px',
                color: '#000000',
                fontFamily: 'Love Ya Like A Sister'
            });

            var reset = this.add.image(390, 500, 'btnb').setScale(0.5, 0.4).setInteractive();
        }

        var rsttxt = this.add.text(280, 490, "Next Level (Press enter)", {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        this.input.keyboard.once('keydown_' + 'ENTER', function (event) {
            score = 0;
            this.scene.start('lKLvl2');
            this.scene.stop();
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
            // block.setVelocity(Phaser.Math.Between(10, 25), Phaser.Math.Between(10, 25));

            // block.on('pointerdown', function (block) {
            //     score += 2;
            //     this.scene.sound.play('bubblePop');
            //     this.disableBody(true, true);
            // });

            block.body.velocity.x += 10;
            if (Phaser.Math.Between(1, 100) > 50) {
                block.body.velocity.y += Phaser.Math.Between(1, 20);
            } else {
                block.body.velocity.y -= Phaser.Math.Between(1, 20);
            }

            // this.physics.add.collider(block, items);
            // block.play(Phaser.Math.RND.pick(anims));
        }, [], this);
    }
}

class lvl1ins1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'lvl1ins1',
        });
    }

    create() {
        if (user === 'girl') {
            this.add.image(0, 0, 'gbackground').setScale(0.3).setTint(0x000000).setOrigin(0.01, 0).setAlpha(0.9);
            this.add.image(50, 300, 'girl').setScale(0.25).setOrigin(0, 0);
        } else {
            this.add.image(0, 0, 'bbackground').setScale(0.3).setTint(0x000000).setOrigin(0.01, 0).setAlpha(0.9);
            this.add.image(50, 300, 'boy').setScale(0.15).setOrigin(0, 0);

        }

        // var ins1 = this.add.image(500, 190, 'lvl1Ins2').setScale(0.6).setAlpha(0.5);
        // ins1.setTint(0xFFFFFF);

        this.add.text(230, 40, "INSTRUCTIONS", {
            fontSize: '60px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        var ins1 = this.add.text(32, 140, " Lets pop some bubbles, You have \n 30 seconds to pop as many bubbles\n" +
            " as you can using the keyboard \n keys.", {
            fontSize: '23px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });
        var ins = this.add.text(390, 300, "- To pop the bubbles press the keys displayed\n                  inside the bubbles.", {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        var ins2 = this.add.text(450, 550, " Press (ENTER) Key to continue...", {
            fontSize: '23px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

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

        var kb = this.add.sprite(580, 230, 'kbAnimation', 'ke-1').setScale(0.4);

        var frameNames = this.anims.generateFrameNames('kbAnimation', {frames: ['ke-1', 'ke-2']});

        this.anims.create({key: 'kbanim', frames: frameNames, frameRate: 1, repeat: -1});
        kb.anims.play('kbanim');

        this.input.keyboard.once('keydown_' + 'ENTER', function (event) {
            ins2.x = 550;
            ins2.setText('HURRAY, You did it!');
            this.time.delayedCall(1000, function () {
                this.scene.resume(currentScene);
                this.scene.stop();
            }, [], this);
        }, this);
    }
}

class lvl2ins1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'lvl2ins1',
        });
    }

    create() {
        if (user === 'girl') {
            this.add.image(0, 0, 'gbackground').setScale(0.3).setTint(0x000000).setOrigin(0.01, 0).setAlpha(0.9);
            this.add.image(50, 300, 'girl').setScale(0.25).setOrigin(0, 0);
        } else {
            this.add.image(0, 0, 'bbackground').setScale(0.3).setTint(0x000000).setOrigin(0.01, 0).setAlpha(0.9);
            this.add.image(50, 300, 'boy').setScale(0.15).setOrigin(0, 0);

        }

        // var ins1 = this.add.image(500, 190, 'lvl1Ins2').setScale(0.6).setAlpha(0.5);
        // ins1.setTint(0xFFFFFF);

        this.add.text(300, 20, "LEVEL 2", {
            fontSize: '60px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        this.add.text(230, 70, "INSTRUCTIONS", {
            fontSize: '60px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        var ins1 = this.add.text(32, 150, " Lets pop some bubbles, You have 30 seconds to pop as many bubbles\n" +
            " as you can.\n Shoot the bubbles to pop them.", {
            fontSize: '23px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        var ins2 = this.add.text(450, 550, " Press (ENTER) Key to continue...", {
            fontSize: '23px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

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

        var kb = this.add.sprite(450, 320, 'kbAnimation', 'ke-1').setScale(0.27);

        var frameNames = this.anims.generateFrameNames('kbAnimation', {frames: ['left-1-02', 'left-2-02', 'right-1', 'right-2']});

        this.anims.create({key: 'kbanim2', frames: frameNames, frameRate: 1, repeat: -1});
        kb.anims.play('kbanim2');

        var ins = this.add.text(350, 400, "Use left and right arrow keys\n       to move the player!", {
            fontSize: '15px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        var kb = this.add.sprite(680, 320, 'kbAnimation', 'ke-1').setScale(0.27);

        var frameNames = this.anims.generateFrameNames('kbAnimation', {frames: ['space-1', 'space -2']});

        this.anims.create({key: 'kbanim3', frames: frameNames, frameRate: 1, repeat: -1});
        kb.anims.play('kbanim3');

        var ins = this.add.text(580, 400, "             Use SpaceBar\n       to shoot the bubbles!", {
            fontSize: '15px',
            color: '#ffffff',
            fontFamily: 'Love Ya Like A Sister'
        });

        this.input.keyboard.once('keydown_' + 'ENTER', function (event) {
            ins2.x = 550;
            ins2.setText('HURRAY, You did it!');
            this.time.delayedCall(1000, function () {
                this.scene.resume(currentScene);
                this.scene.stop();
            }, [], this);
        }, this);
    }
}

class lKChooseCharacter extends Phaser.Scene {

    constructor() {
        super({
            key: 'lKChooseCharacter'
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

        this.load.image('circle', './assets/bubble.png');
        this.load.image('boy', './assets/boy.png');
        this.load.image('girl', './assets/girl.png');
        this.load.image('gbackground', './assets/girl_background.png');
        this.load.image('bubble-shooter-girl', './assets/bubble-shooter-girl.png');
        this.load.image('bbackground', './assets/boy_background.jpg');
        this.load.image('bubble-shooter-boy', './assets/bubble-shooter-boy.png');
        this.load.image('fullscreen', './assets/fullscreen.png');
        this.load.audio('bubblePop', './assets/Pop-sound-effect.mp3', {instances: 1});
        this.load.multiatlas('kbAnimation', './assets/Animations/keyboardAnimationsSS.json', './assets/Animations');
        this.load.image('restBtn', './assets/restBtn.png');
        this.load.image('btnb', './assets/btnb.png');
        this.load.image('btng', './assets/btng.png');
        this.load.image('lvl1Ins2', './assets/lvl1Instruction.png');
    }

    create() {
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        // user = 'boy';
        // this.scene.start('lvl2ins1');

        this.scene.pause();
        this.scene.launch('gameStartIns');

        //Background
        this.add.image(0, 0, 'bbackground').setScale(0.3).setOrigin(0.01, 0);
        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister'
        };
        this.add.text(150, 80, "Select your Character", textConfig);
        /*
        * Full Screen Code
        * */
        var fullScreen = this.add.image(800 - 40, 30, 'fullscreen', 0).setInteractive().setScale(0.1);
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

        //Boy robot
        var boyRobot = this.add.image(200, 300, 'boy').setInteractive();
        boyRobot.setScale(0.07);

        this.input.keyboard.once('keydown_' + 'B', function (event) {
            boyRobot.setScale(0.08);
            girlRobot.setAlpha(0.5);
            this.time.delayedCall(1000, function () {
                user = 'boy';
                this.scene.start('lKLvl1');
                this.scene.stop();
            }, [], this);
        }, this);

        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister'
        };
        this.add.text(160, 420, "BOY", textConfig);

        var textConfig = {
            fontSize: '22px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister'
        };
        var boytxt = this.add.text(120, 480, "Press (B) for Boy", textConfig);

        //Girl robot
        var girlRobot = this.add.image(600, 300, 'girl').setInteractive();
        girlRobot.setScale(0.1);

        this.input.keyboard.once('keydown_' + 'G', function (event) {
            girlRobot.setScale(0.12);
            boyRobot.setAlpha(0.5);
            this.time.delayedCall(1000, function () {
                user = 'girl';
                this.scene.start('lKLvl1');
                this.scene.stop();
            }, [], this);
        }, this);

        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister'
        };
        this.add.text(560, 420, "GIRL", textConfig);

        var textConfig = {
            fontSize: '22px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister'
        };
        var girltxt = this.add.text(530, 480, "Press (G) for Girl", textConfig);

        var ins1Flag = false;
        this.time.addEvent({
            delay: 500, callback: function () {
                if (ins1Flag) {
                    boytxt.y += -2;
                    girltxt.y += -2;
                    ins1Flag = false;
                } else {
                    boytxt.y += 2;
                    girltxt.y += 2;
                    ins1Flag = true;
                }
            }, callbackScope: this, loop: true
        });
    }

}


var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    // pixelArt: true,
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        resolution: 1,
        width: 800,
        height: 600,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 800,
            height: 600
        },

    },
    scene: [
        lKChooseCharacter,
        gameStartIns,
        lKLvl1,
        NextLevel,
        lvl1ins1,
        lvl2ins1,
        lKLvl2,
        gameOver
    ]
};

var game = new Phaser.Game(config);

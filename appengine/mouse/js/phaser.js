var score = 0;
var items;
var text, timer;
var min = 0;
var sec = 0;
var previousScene, currentScene;
var user;

class learningMouseGirlLvl1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseGirlLvl1',
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
        currentScene = 'learningMouseGirlLvl1';
        this.scene.pause();
        this.scene.launch('learningMouseLvl1Instructions2');
        this.scene.sendToBack();

        /* set game time
        *  min,sec */
        min = 0;
        sec = 30;
        score = 0;

        this.input.setDefaultCursor('url(./assets/girl.cur), pointer');
        this.add.image(0, 0, 'gbackground').setScale(0.3).setOrigin(0.01, 0);
        this.add.image(0, 430, 'bubble-shooter-girl').setScale(0.2).setOrigin(0.01, 0);
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

        this.add.image(75, 40, 'btng').setScale(0.22).setAlpha(1);
        text = this.add.text(32, 32);

        this.add.image(720, 40, 'btng').setScale(0.22).setAlpha(1);
        timer = this.add.text(700, 32);

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

            block.on('pointerdown', function (block) {
                if (block.buttons === 1) {
                    score += 2;
                    this.scene.sound.play('bubblePop');

                    var text = this.scene.add.text(this.x, this.y);
                    text.setStyle({color: '#ffffff'});
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
                }
            });

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
        // this.scene.restart();
        previousScene = this.scene;
        this.scene.start('learningMouseNextLevel');
        // this.scene.start('learningMouseGirlGameOver');

    }

    update() {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');
    }

}

class learningMouseGirlLvl2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseGirlLvl2',
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
        currentScene = 'learningMouseGirlLvl2';
        this.scene.pause();
        this.scene.launch('learningMouseLvl2Instructions1');
        this.scene.sendToBack();

        /* set game time
        *  min,sec */
        min = 0;
        sec = 30;
        score = 0;

        this.input.setDefaultCursor('url(./assets/girl.cur), pointer');
        this.add.image(0, 0, 'gbackground').setScale(0.3).setOrigin(0.01, 0);
        this.add.image(0, 430, 'bubble-shooter-girl').setScale(0.2).setOrigin(0.01, 0);
        this.sound.add('bubblePop');

        var mouseUp = this.add.image(400, 40, 'mouseAnimation', '1').setScale(0.2);
        var mouseDown = this.add.image(400, 40, 'mouseAnimation', '2').setScale(0.2);

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

        this.add.image(75, 40, 'btng').setScale(0.22).setAlpha(1);
        text = this.add.text(32, 32);

        this.add.image(720, 40, 'btng').setScale(0.22).setAlpha(1);
        timer = this.add.text(700, 32);

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
                        text.setStyle({color: '#ffffff'});
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

                // this.timeUp = parseInt(Date.now() / 1000);
                // if (this.timeUp === this.previousTapTime) {
                //     //  Yes, let's dispatch the signal then with the 2nd parameter set to true
                //     score += 5;
                //     this.scene.sound.play('bubblePop');
                //     this.disableBody(true, true);
                // } else {
                //     this.previousTapTime = this.timeUp;
                // }
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
        this.scene.start('learningMouseGirlGameOver');

    }

    update() {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');
    }
}

class learningMouseBoyLvl1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseBoyLvl1',
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
        currentScene = 'learningMouseBoyLvl1';
        this.scene.pause();
        this.scene.launch('learningMouseLvl1Instructions2');
        this.scene.sendToBack();

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
        min = 0;
        sec = 30;
        score = 0;

        this.input.setDefaultCursor('url(./assets/boy.cur), pointer');
        this.add.image(0, 0, 'bbackground').setScale(0.3).setOrigin(0.01, 0);
        this.add.image(0, 430, 'bubble-shooter-boy').setScale(0.2).setOrigin(0.01, 0);
        this.sound.add('bubblePop');

        /*
        * live mouse animation at top center of the screen
        */
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

            block.on('pointerdown', function (block) {
                if (block.buttons === 1) {
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
                }
            });

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
        this.scene.start('learningMouseNextLevel');
        // this.scene.start('learningMouseBoyGameOver');

    }

    update() {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');
    }

}

class learningMouseBoyLvl2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseBoyLvl2',
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
        currentScene = 'learningMouseBoyLvl2';
        this.scene.pause();
        this.scene.launch('learningMouseLvl2Instructions1');
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
        this.scene.start('learningMouseBoyGameOver');

    }

    update() {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');
    }
}

class learningMouseBoyGameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseBoyGameOver',
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
                this.scene.start('learningMouseChooseCharacter');
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

class learningMouseGirlGameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseGirlGameOver',
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

        this.input.setDefaultCursor('url(./assets/girl.cur), pointer');
        this.add.image(0, 0, 'gbackground').setScale(0.3).setOrigin(0.01, 0);
        this.add.image(0, 430, 'bubble-shooter-boy').setScale(0.2).setOrigin(0.01, 0);
        this.sound.add('bubblePop');
        items = this.physics.add.group();

        this.time.addEvent({delay: 500, callback: this.createBlocks, callbackScope: this, loop: true});

        this.add.text(250, 100, "GAME OVER", {fontSize: '60px', fontFamily: 'Love Ya Like A Sister, cursive'});

        this.add.text(295, 160, "Your Score is", {fontSize: '30px', fontFamily: 'Love Ya Like A Sister, cursive'});
        this.add.text(360, 220, score, {fontSize: '100px', fontFamily: 'Love Ya Like A Sister, cursive'});
        // this.time.delayedCall(30000, this.gameOver, [], this);
        var reset = this.add.image(390, 500, 'btng').setScale(0.3).setInteractive();

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
                this.scene.start('learningMouseChooseCharacter');
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

class learningMouseLvl1Instructions1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseLvl1Instructions1',
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
                        this.scene.resume('learningMouseChooseCharacter');
                        this.scene.stop();
                    }, callbackScope: this, loop: false
                });
            }
        }, this);

    }

}

class learningMouseLvl1Instructions2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseLvl1Instructions2',
        });
    }

    create() {
        if (currentScene === 'learningMouseGirlLvl1') {
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

class learningMouseLvl2Instructions1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseLvl2Instructions1',
        });
    }

    create() {
        if (currentScene === 'learningMouseGirlLvl2') {
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
                            this.scene.launch('learningMouseLvl2Instructions2');
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

class learningMouseLvl2Instructions2 extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseLvl2Instructions2',
        });
    }

    create() {
        if (currentScene === 'learningMouseGirlLvl2') {
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

class learningMouseNextLevel extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseNextLevel',
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
        if (currentScene === 'learningMouseGirlLvl1') {
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

        if (currentScene === 'learningMouseGirlLvl1') {
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
                if (currentScene === 'learningMouseGirlLvl1') {
                    this.scene.start('learningMouseGirlLvl2');
                } else {
                    this.scene.start('learningMouseBoyLvl2');
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

class learningMouseChooseCharacter extends Phaser.Scene {

    constructor() {
        super({
            key: 'learningMouseChooseCharacter'
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
        this.load.multiatlas('mouseAnimation', './assets/Animations/mouseAnimationSS.json', './assets/Animations');
        this.load.image('restBtn', './assets/restBtn.png');
        this.load.image('btnb', './assets/btnb.png');
        this.load.image('btng', './assets/btng.png');
        this.load.image('lvl1Ins2', './assets/lvl1Instruction.png');
    }

    create() {
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        // this.scene.start('learningMouseNextLevel');

        this.scene.pause();
        this.scene.launch('learningMouseLvl1Instructions1');

        //Background
        this.add.image(0, 0, 'bbackground').setScale(0.3).setOrigin(0.01, 0);
        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(150, 80, "Select your Character", textConfig);
        /*
        * Full Screen Code
        * */
        var fullScreen = this.add.image(800-40, 30, 'fullscreen', 0).setInteractive().setScale(0.1);
        fullScreen.on('pointerup', function () {
            fullScreen.setScale(0.1);
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
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
        boyRobot.on('pointerover', function (event) {
            boyRobot.setScale(0.08);
        });
        boyRobot.on('pointerout', function (event) {
            boyRobot.setScale(0.07);
        });
        boyRobot.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                // event.buttons
                user = 'Boy';
                this.scene.start('learningMouseBoyLvl1');
                this.scene.stop();
            }
        }, this);

        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(160, 420, "BOY", textConfig);

        //Girl robot
        var girlRobot = this.add.image(600, 300, 'girl').setInteractive();
        girlRobot.setScale(0.1);
        girlRobot.on('pointerover', function (event) {
            girlRobot.setScale(0.12);
        });
        girlRobot.on('pointerout', function (event) {
            girlRobot.setScale(0.1);
        });
        girlRobot.on('pointerdown', function (event) {
            if (event.buttons === 1) {
                user = 'Girl';
                this.scene.start('learningMouseGirlLvl1');
                this.scene.stop();
            }
        }, this);

        var textConfig = {
            fontSize: '50px',
            color: '#000000',
            fontFamily: 'Love Ya Like A Sister, cursive'
        };
        this.add.text(560, 420, "GIRL", textConfig);
    }

}


var config = {
    type: Phaser.AUTO,
    // pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        resolution: 1,
        width: 800,
        height: 600
    },
    scene: [
        learningMouseChooseCharacter,
        learningMouseLvl1Instructions1,
        learningMouseLvl1Instructions2,
        learningMouseBoyLvl1,
        learningMouseLvl2Instructions1,
        learningMouseLvl2Instructions2,
        learningMouseBoyLvl2,
        learningMouseGirlLvl1,
        learningMouseGirlLvl2,
        learningMouseBoyGameOver,
        learningMouseGirlGameOver,
        learningMouseNextLevel
    ],
    autoResize: true,
};

var game = new Phaser.Game(config);

var score = 0, min = 0, sec = 0;
var text, timer;
var previousScene, currentScene;
var gameHeight, gameWidth;
var user, plantsGrown;
var selectedTool = null;

class plantsLvl1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'plantsLvl1',
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
        currentScene = 'plantsLvl1';
        // this.scene.pause();
        // this.scene.launch('plantsLvl1Instructions2');
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

        plantsGrown = 0;

        var background = this.add.image(-10, 0, 'SS', 'lvl1Background').setScale(0.52).setOrigin(0).setInteractive();
        if (user === 'girl') {
            this.add.image(0, 330, 'SS', 'girl').setScale(0.5).setOrigin(0);
        } else {
            this.add.image(0, 330, 'SS', 'boy').setScale(0.5).setOrigin(0);
        }
        /*
        * Create Sounds
        * */
        var clockS = this.sound.add('clockS');
        clockS.playingCount = 0;

        /*
        * Tools on right side of the screen
        * */
        var ctool1 = this.physics.add.image(gameWidth - 50, 80, 'SS', '5').setScale(0.2).setInteractive();
        ctool1.setCollideWorldBounds(true).setOrigin();
        ctool1.setCircle(170);
        ctool1.name = 'tool1';
        ctool1.on('pointerdown', function () {
            this.setScale(0.15);
            this.setAlpha(0.6);
            if (selectedTool != null) {
                selectedTool.setScale(0.2);
                selectedTool.setAlpha(1);

                sunflowerTween.stop(0);
                sunflowerTween.restart();
                sunflowerTween.pause();

                strawberryTween.stop(0);
                strawberryTween.restart();
                strawberryTween.pause();

                apppleTween.stop(0);
                apppleTween.restart();
                apppleTween.pause();
            }
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(assets/cursors/5.cur), pointer');
        });

        var sunflowerSeed = this.physics.add.image(gameWidth - 50, 160, 'SS', 'cSunflower').setScale(0.2).setInteractive();
        sunflowerSeed.setCollideWorldBounds(true).setOrigin();
        sunflowerSeed.setCircle(170);
        sunflowerSeed.name = 'sunflowerSeed';
        sunflowerSeed.on('pointerdown', function () {
            this.setScale(0.15);
            this.setAlpha(0.6);
            if (selectedTool != null) {
                selectedTool.setScale(0.2);
                selectedTool.setAlpha(1);
            }
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(./assets/cursors/seed1.cur), pointer');
        });

        var strawberrySeed = this.physics.add.image(gameWidth - 50, 160, 'SS', 'cStrawberry').setScale(0.2).setInteractive();
        strawberrySeed.setCollideWorldBounds(true).setOrigin();
        strawberrySeed.setCircle(170);
        strawberrySeed.name = 'strawberrySeed';
        strawberrySeed.on('pointerdown', function () {
            this.setScale(0.15);
            this.setAlpha(0.6);
            if (selectedTool != null) {
                selectedTool.setScale(0.2);
                selectedTool.setAlpha(1);
            }
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(./assets/cursors/seed2.cur), pointer');
        });

        var appleSeed = this.physics.add.image(gameWidth - 50, 160, 'SS', 'cApple').setScale(0.2).setInteractive();
        appleSeed.setCollideWorldBounds(true).setOrigin();
        appleSeed.setCircle(170);
        appleSeed.name = 'appleSeed';
        appleSeed.on('pointerdown', function () {
            this.setScale(0.15);
            this.setAlpha(0.6);
            if (selectedTool != null) {
                selectedTool.setScale(0.2);
                selectedTool.setAlpha(1);
            }
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(./assets/cursors/seed3.cur), pointer');
        });

        var sunflowerTween = this.tweens.add({
            targets: sunflowerSeed,
            x: gameWidth - 120,
            duration: 100,
            ease: 'Power1',
            paused: true
        });

        var strawberryTween = this.tweens.add({
            targets: strawberrySeed,
            x: gameWidth - 195,
            duration: 100,
            ease: 'Power1',
            paused: true
        });

        var apppleTween = this.tweens.add({
            targets: appleSeed,
            x: gameWidth - 270,
            duration: 100,
            ease: 'Power1',
            paused: true
        });


        var seedsMarker = this.physics.add.image(gameWidth - 50, 160, 'SS', 'sunflowerSeed').setScale(0.2).setInteractive();
        seedsMarker.setCircle(175);
        seedsMarker.setDepth(1);
        seedsMarker.on('pointerdown', function () {
            this.setScale(0.15);
            this.setAlpha(0.6);
            sunflowerTween.restart();
            strawberryTween.restart();
            apppleTween.restart();
            if (selectedTool != null) {
                selectedTool.setScale(0.2);
                selectedTool.setAlpha(1);
            }
            selectedTool = this;
        });

        background.on('pointerdown', function () {
            if (sunflowerTween != null) {
                seedsMarker.setAlpha(1);
                seedsMarker.setScale(0.2);

                sunflowerTween.stop(0);
                sunflowerTween.restart();
                sunflowerTween.pause();

                strawberryTween.stop(0);
                strawberryTween.restart();
                strawberryTween.pause();

                apppleTween.stop(0);
                apppleTween.restart();
                apppleTween.pause();
            }
            if (selectedTool != null) {
                selectedTool.setScale(0.2);
                selectedTool.setAlpha(1);
            }
            this.scene.input.setDefaultCursor('pointer');

        });

        var fertilizer = this.physics.add.image(gameWidth - 50, 240, 'SS', 'fertilizer').setScale(0.2).setInteractive();
        fertilizer.setCollideWorldBounds(true).setOrigin();
        fertilizer.setCircle(170);
        fertilizer.name = 'fertilizer';
        fertilizer.on('pointerdown', function () {
            this.setScale(0.15);
            this.setAlpha(0.6);
            if (selectedTool != null) {
                selectedTool.setScale(0.2);
                selectedTool.setAlpha(1);

                sunflowerTween.stop(0);
                sunflowerTween.restart();
                sunflowerTween.pause();

                strawberryTween.stop(0);
                strawberryTween.restart();
                strawberryTween.pause();

                apppleTween.stop(0);
                apppleTween.restart();
                apppleTween.pause();
            }
            selectedTool = this;
            this.scene.input.setDefaultCursor('url(./assets/cursors/fertilizerr.cur), pointer');
        });

        if (user === "girl") {
            var gwater = this.physics.add.image(gameWidth - 50, 320, 'SS', 'gwater').setScale(0.2).setInteractive();
            gwater.setCollideWorldBounds(true).setOrigin();
            gwater.setCircle(170);
            gwater.name = 'water';
            gwater.on('pointerdown', function () {
                this.setScale(0.15);
                this.setAlpha(0.6);
                if (selectedTool != null) {
                    selectedTool.setScale(0.2);
                    selectedTool.setAlpha(1);

                    sunflowerTween.stop(0);
                    sunflowerTween.restart();
                    sunflowerTween.pause();

                    strawberryTween.stop(0);
                    strawberryTween.restart();
                    strawberryTween.pause();

                    apppleTween.stop(0);
                    apppleTween.restart();
                    apppleTween.pause();
                }
                selectedTool = this;
                this.scene.input.setDefaultCursor('url(./assets/cursors/gwater.cur), pointer');
            });
        } else {
            var bwater = this.physics.add.image(gameWidth - 50, 320, 'SS', 'bwater').setScale(0.2).setInteractive();
            bwater.setCollideWorldBounds(true).setOrigin();
            bwater.setCircle(170);
            bwater.name = 'water';
            bwater.on('pointerdown', function () {
                this.setScale(0.15);
                this.setAlpha(0.6);
                if (selectedTool != null) {
                    selectedTool.setScale(0.2);
                    selectedTool.setAlpha(1);

                    sunflowerTween.stop(0);
                    sunflowerTween.restart();
                    sunflowerTween.pause();

                    strawberryTween.stop(0);
                    strawberryTween.restart();
                    strawberryTween.pause();

                    apppleTween.stop(0);
                    apppleTween.restart();
                    apppleTween.pause();
                }
                selectedTool = this;
                this.scene.input.setDefaultCursor('url(./assets/cursors/bwater.cur), pointer');
            });
        }

        /*
        * Animations Code
        * */
        // TOOL1
        var frames = this.anims.generateFrameNames('SS', {frames: ['anims/tool1.1', 'anims/tool1.2']});
        this.anims.create({key: 'tool1Animation', frames: frames, frameRate: 2, repeat: 2});

        // FERTILIZER
        frames = this.anims.generateFrameNames('SS', {frames: ['anims/fertilizer1.2', 'anims/fertilizer1.3', 'anims/fertilizer1.3', 'anims/fertilizer1.4']});
        this.anims.create({key: 'fertilizerAnim', frames: frames, frameRate: 2, repeat: 0});

        // SUNFLOWERSEEDS
        frames = this.anims.generateFrameNames('SS', {frames: ['anims/Sunflower_seeds/1', 'anims/Sunflower_seeds/2', 'anims/Sunflower_seeds/3', 'anims/Sunflower_seeds/4', 'anims/Sunflower_seeds/5', 'anims/Sunflower_seeds/6']});
        this.anims.create({key: 'sunflowerSeedsAnim', frames: frames, frameRate: 10, repeat: 0});

        // STRAWBERRYSEEDS
        frames = this.anims.generateFrameNames('SS', {frames: ['anims/strawberry_seeds/1', 'anims/strawberry_seeds/2', 'anims/strawberry_seeds/3', 'anims/strawberry_seeds/4', 'anims/strawberry_seeds/5', 'anims/strawberry_seeds/6']});
        this.anims.create({key: 'strawberrySeedsAnim', frames: frames, frameRate: 10, repeat: 0});

        // APPLESEEDS
        frames = this.anims.generateFrameNames('SS', {frames: ['anims/apple_seeds/1', 'anims/apple_seeds/2', 'anims/apple_seeds/3', 'anims/apple_seeds/4', 'anims/apple_seeds/5', 'anims/apple_seeds/6']});
        this.anims.create({key: 'appleSeedsAnim', frames: frames, frameRate: 10, repeat: 0});

        // WATER
        if (user === 'girl') {
            frames = this.anims.generateFrameNames('SS', {frames: ['anims/gwater1.1', 'anims/gwater1.2']});
        } else {
            frames = this.anims.generateFrameNames('SS', {frames: ['anims/bwater1', 'anims/bwater2']});
        }
        this.anims.create({key: 'waterAnim', frames: frames, frameRate: 2, repeat: 1});

        // SUNFLOWER
        frames = this.anims.generateFrameNames('SS', {frames: ['sunflower1', 'sunflower2', 'anims/sunflower4']});
        this.anims.create({key: 'sunflowerAnim', frames: frames, frameRate: 0.3, repeat: 0});

        // STRAWBERRY
        frames = this.anims.generateFrameNames('SS', {frames: ['anims/strewberry1', 'anims/strewberry2', 'anims/strewberry3']});
        this.anims.create({key: 'strawberryAnim', frames: frames, frameRate: 0.3, repeat: 0});

        // APPLE TREE
        frames = this.anims.generateFrameNames('SS', {frames: ['anims/apple1', 'anims/apple2', 'anims/apple3']});
        this.anims.create({key: 'appleAnim', frames: frames, frameRate: 0.3, repeat: 0});

        // CLOCK
        frames = this.anims.generateFrameNames('SS', {frames: ['clock/1', 'clock/2', 'clock/3', 'clock/4', 'clock/5', 'clock/6', 'clock/7', 'clock/8', 'clock/9', 'clock/10', 'clock/11', 'clock/12', 'clock/13']});
        this.anims.create({key: 'clock', frames: frames, frameRate: 1.8, repeat: 0});

        /*
        * GROUND-1 CODE
        * */
        this.physics.add.sprite(200, 620, 'SS', 'groundPatch').setScale(0.6, 0.48).setInteractive().setAlpha(1);
        var ground1 = this.physics.add.sprite(200, 600, 'SS').setScale(2.2, 1).setInteractive().setAlpha(0.1);
        ground1.clock = this.physics.add.sprite(200, 430).setScale(0.5).setAlpha(1).setDepth(1);
        ground1.sparkle = this.physics.add.sprite(210, 620, 'SS', 'anims/sparkle1.3').setScale(0.4).setAlpha(0);
        ground1.sparkle2 = this.physics.add.sprite(190, 620, 'SS', 'anims/sparkle1.3').setScale(0.4).setAlpha(0);
        ground1.sparkle2.flipY = true;

        ground1.seedType = null;
        ground1.tool1 = false;
        ground1.seed = false;
        ground1.fertilizer = false;
        ground1.water = false;
        ground1.empty = true;

        ground1.toolAnm = this.physics.add.sprite(200, 550, 'SS', 'anims/tool1.1').setScale(0.5);
        ground1.toolAnm.visible = false;
        ground1.toolAnm.on('animationcomplete', function () {
            ground1.toolAnm.visible = false;
        }, this);

        ground1.grow = this.physics.add.sprite(200, 580, 'SS').setScale(0.4);
        ground1.grow.visible = false;

        ground1.on('pointerdown', function () {
            if (ground1.toolAnm.visible === false && ground1.empty) {
                if (selectedTool != null) {
                    if (selectedTool.name === "tool1") {
                        ground1.tool1 = true;
                        ground1.toolAnm.visible = true;
                        ground1.toolAnm.setScale(0.7);
                        ground1.toolAnm.anims.play('tool1Animation');

                    } else if (selectedTool.name === "sunflowerSeed" || selectedTool.name === "strawberrySeed" || selectedTool.name === "appleSeed") {
                        ground1.seed = true;
                        ground1.seedType = selectedTool.name;
                        ground1.toolAnm.visible = true;
                        ground1.toolAnm.setScale(0.7);
                        if (selectedTool.name === "sunflowerSeed") {
                            ground1.toolAnm.anims.play('sunflowerSeedsAnim');
                        }
                        if (selectedTool.name === "strawberrySeed") {
                            ground1.toolAnm.anims.play('strawberrySeedsAnim');
                        }
                        if (selectedTool.name === "appleSeed") {
                            ground1.toolAnm.anims.play('appleSeedsAnim');
                        }
                        sunflowerTween.stop(0);
                        sunflowerTween.restart();
                        sunflowerTween.pause();

                        strawberryTween.stop(0);
                        strawberryTween.restart();
                        strawberryTween.pause();

                        apppleTween.stop(0);
                        apppleTween.restart();
                        apppleTween.pause();

                    } else if (selectedTool.name === "fertilizer") {
                        ground1.fertilizer = true;
                        ground1.toolAnm.visible = true;
                        ground1.toolAnm.setScale(1);
                        ground1.toolAnm.anims.play('fertilizerAnim').on('animationcomplete', function () {
                            if (ground1.tool1 && ground1.seed) {
                                this.scene.add.tween({
                                    targets: ground1.sparkle,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true,
                                    hold: 1500,
                                    alpha: {
                                        getStart: () => 0,
                                        getEnd: () => 1
                                    },
                                    loop: -1,
                                });
                                this.scene.add.tween({
                                    targets: ground1.sparkle2,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true,
                                    hold: 1500,
                                    alpha: {
                                        getStart: () => 1,
                                        getEnd: () => 0
                                    },
                                    loop: -1
                                });
                            }
                        });

                    } else if (selectedTool.name === "water") {
                        ground1.water = true;
                        ground1.toolAnm.visible = true;
                        if (user === 'girl') {
                            ground1.toolAnm.setScale(0.3);
                        } else {
                            ground1.toolAnm.setScale(0.3);
                        }
                        ground1.toolAnm.anims.play('waterAnim');
                    }

                    if (ground1.tool1) {
                        if (ground1.seed) {
                            if (ground1.fertilizer) {
                                if (ground1.water) {
                                    ground1.toolAnm.on('animationcomplete', function () {
                                        ground1.sparkle.destroy();
                                        ground1.sparkle2.destroy();

                                        ground1.grow.visible = true;
                                        if (ground1.seedType === "strawberrySeed") {
                                            ground1.grow.anims.play('strawberryAnim');
                                        } else if (ground1.seedType === "sunflowerSeed") {
                                            ground1.clock.y = 390;
                                            ground1.grow.anims.play('sunflowerAnim');
                                        } else if (ground1.seedType === "appleSeed") {
                                            ground1.grow.setScale(1);
                                            ground1.clock.y = 300;
                                            ground1.grow.anims.play('appleAnim');
                                        }
                                        clockS.play();
                                        clockS.playingCount += 1;
                                        var scene = this.scene;
                                        ground1.clock.anims.play('clock').on('animationcomplete', function () {
                                            ground1.clock.destroy();
                                            clockS.playingCount -= 1;
                                            if (clockS.playingCount === 0)
                                                clockS.stop();
                                            plantsGrown += 1;
                                            score+=10;
                                            if (plantsGrown === 3)
                                                scene.gameOver();
                                        });
                                        ground1.toolAnm.destroy();
                                        ground1.destroy();
                                    }, this);
                                }
                            } else {
                                ground1.water = false;
                            }
                        } else {
                            ground1.fertilizer = false;
                            ground1.water = false;
                        }
                    } else {
                        ground1.seed = false;
                        ground1.fertilizer = false;
                        ground1.water = false;
                    }

                    this.scene.input.setDefaultCursor('pointer');
                    selectedTool.setScale(0.2);
                    selectedTool.setAlpha(1);
                    selectedTool = null;
                }
            }
        });


        /*
        * GROUND-2 CODE
        * */
        this.physics.add.sprite(530, 620, 'SS', 'groundPatch').setScale(0.6, 0.48).setInteractive().setAlpha(1);
        var ground2 = this.physics.add.sprite(530, 600, 'SS').setScale(2.2, 1).setInteractive().setAlpha(0.1);
        ground2.clock = this.physics.add.sprite(530, 430).setScale(0.5).setAlpha(1).setDepth(1);
        ground2.sparkle = this.physics.add.sprite(530, 620, 'SS', 'anims/sparkle1.3').setScale(0.4).setAlpha(0);
        ground2.sparkle2 = this.physics.add.sprite(530, 620, 'SS', 'anims/sparkle1.3').setScale(0.4).setAlpha(0);
        ground2.sparkle2.flipY = true;

        ground2.seedType = null;
        ground2.tool1 = false;
        ground2.seed = false;
        ground2.fertilizer = false;
        ground2.water = false;
        ground2.empty = true;

        ground2.toolAnm = this.physics.add.sprite(530, 550, 'SS', 'anims/tool1.1').setScale(0.5);
        ground2.toolAnm.visible = false;
        ground2.toolAnm.on('animationcomplete', function () {
            ground2.toolAnm.visible = false;
        }, this);

        ground2.grow = this.physics.add.sprite(530, 580, 'SS').setScale(0.4);
        ground2.grow.visible = false;

        ground2.on('pointerdown', function () {
            if (ground2.toolAnm.visible === false && ground2.empty) {
                if (selectedTool != null) {
                    if (selectedTool.name === "tool1") {
                        ground2.tool1 = true;
                        ground2.toolAnm.visible = true;
                        ground2.toolAnm.setScale(0.7);
                        ground2.toolAnm.anims.play('tool1Animation');

                    } else if (selectedTool.name === "sunflowerSeed" || selectedTool.name === "strawberrySeed" || selectedTool.name === "appleSeed") {
                        ground2.seed = true;
                        ground2.seedType = selectedTool.name;
                        ground2.toolAnm.visible = true;
                        ground2.toolAnm.setScale(0.7);
                        if (selectedTool.name === "sunflowerSeed") {
                            ground2.toolAnm.anims.play('sunflowerSeedsAnim');
                        }
                        if (selectedTool.name === "strawberrySeed") {
                            ground2.toolAnm.anims.play('strawberrySeedsAnim');
                        }
                        if (selectedTool.name === "appleSeed") {
                            ground2.toolAnm.anims.play('appleSeedsAnim');
                        }
                        sunflowerTween.stop(0);
                        sunflowerTween.restart();
                        sunflowerTween.pause();

                        strawberryTween.stop(0);
                        strawberryTween.restart();
                        strawberryTween.pause();

                        apppleTween.stop(0);
                        apppleTween.restart();
                        apppleTween.pause();

                    } else if (selectedTool.name === "fertilizer") {
                        ground2.fertilizer = true;
                        ground2.toolAnm.visible = true;
                        ground2.toolAnm.setScale(1);
                        ground2.toolAnm.anims.play('fertilizerAnim').on('animationcomplete', function () {
                            if (ground2.tool1 && ground2.seed) {
                                this.scene.add.tween({
                                    targets: ground2.sparkle,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true,
                                    hold: 1500,
                                    alpha: {
                                        getStart: () => 0,
                                        getEnd: () => 1
                                    },
                                    loop: -1,
                                });
                                this.scene.add.tween({
                                    targets: ground2.sparkle2,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true,
                                    hold: 1500,
                                    alpha: {
                                        getStart: () => 1,
                                        getEnd: () => 0
                                    },
                                    loop: -1
                                });
                            }
                        });

                    } else if (selectedTool.name === "water") {
                        ground2.water = true;
                        ground2.toolAnm.visible = true;
                        if (user === 'girl') {
                            ground2.toolAnm.setScale(0.3);
                        } else {
                            ground2.toolAnm.setScale(0.3);
                        }
                        ground2.toolAnm.anims.play('waterAnim');
                    }

                    if (ground2.tool1) {
                        if (ground2.seed) {
                            if (ground2.fertilizer) {
                                if (ground2.water) {
                                    ground2.toolAnm.on('animationcomplete', function () {
                                        ground2.sparkle.destroy();
                                        ground2.sparkle2.destroy();

                                        ground2.grow.visible = true;
                                        if (ground2.seedType === "strawberrySeed") {
                                            ground2.grow.anims.play('strawberryAnim');
                                        } else if (ground2.seedType === "sunflowerSeed") {
                                            ground2.clock.y = 390;
                                            ground2.grow.anims.play('sunflowerAnim');
                                        } else if (ground2.seedType === "appleSeed") {
                                            ground2.clock.y = 300;
                                            ground2.grow.setScale(1);
                                            ground2.grow.anims.play('appleAnim');
                                        }
                                        clockS.play();
                                        clockS.playingCount += 1;
                                        var scene = this.scene;
                                        ground2.clock.anims.play('clock').on('animationcomplete', function () {
                                            ground2.clock.destroy();
                                            clockS.playingCount -= 1;
                                            if (clockS.playingCount === 0)
                                                clockS.stop();
                                            plantsGrown += 1;
                                            score+=10;
                                            if (plantsGrown === 3)
                                                scene.gameOver();
                                        });
                                        ground2.toolAnm.destroy();
                                        ground2.destroy();
                                    }, this);
                                }
                            } else {
                                ground2.water = false;
                            }
                        } else {
                            ground2.fertilizer = false;
                            ground2.water = false;
                        }
                    } else {
                        ground2.seed = false;
                        ground2.fertilizer = false;
                        ground2.water = false;
                    }

                    this.scene.input.setDefaultCursor('pointer');
                    selectedTool.setScale(0.2);
                    selectedTool.setAlpha(1);
                    selectedTool = null;
                }
            }
        });


        /*
        * GROUND-3 CODE
        * */
        this.physics.add.sprite(850, 620, 'SS', 'groundPatch').setScale(0.6, 0.48).setInteractive().setAlpha(1);
        var ground3 = this.physics.add.sprite(850, 600, 'SS').setScale(2.2, 1).setInteractive().setAlpha(0.1);
        ground3.clock = this.physics.add.sprite(850, 430).setScale(0.5).setAlpha(1).setDepth(1);
        ground3.sparkle = this.physics.add.sprite(850, 620, 'SS', 'anims/sparkle1.3').setScale(0.4).setAlpha(0);
        ground3.sparkle2 = this.physics.add.sprite(850, 620, 'SS', 'anims/sparkle1.3').setScale(0.4).setAlpha(0);
        ground3.sparkle2.flipY = true;

        ground3.seedType = null;
        ground3.tool1 = false;
        ground3.seed = false;
        ground3.fertilizer = false;
        ground3.water = false;
        ground3.empty = true;

        ground3.toolAnm = this.physics.add.sprite(850, 550, 'SS', 'anims/tool1.1').setScale(0.5);
        ground3.toolAnm.visible = false;
        ground3.toolAnm.on('animationcomplete', function () {
            ground3.toolAnm.visible = false;
        }, this);

        ground3.grow = this.physics.add.sprite(850, 580, 'SS').setScale(0.4);
        ground3.grow.visible = false;

        ground3.on('pointerdown', function () {
            if (ground3.toolAnm.visible === false && ground3.empty) {
                if (selectedTool != null) {
                    if (selectedTool.name === "tool1") {
                        ground3.tool1 = true;
                        ground3.toolAnm.visible = true;
                        ground3.toolAnm.setScale(0.7);
                        ground3.toolAnm.anims.play('tool1Animation');

                    } else if (selectedTool.name === "sunflowerSeed" || selectedTool.name === "strawberrySeed" || selectedTool.name === "appleSeed") {
                        ground3.seed = true;
                        ground3.seedType = selectedTool.name;
                        ground3.toolAnm.visible = true;
                        ground3.toolAnm.setScale(0.7);
                        if (selectedTool.name === "sunflowerSeed") {
                            ground3.toolAnm.anims.play('sunflowerSeedsAnim');
                        }
                        if (selectedTool.name === "strawberrySeed") {
                            ground3.toolAnm.anims.play('strawberrySeedsAnim');
                        }
                        if (selectedTool.name === "appleSeed") {
                            ground3.toolAnm.anims.play('appleSeedsAnim');
                        }
                        sunflowerTween.stop(0);
                        sunflowerTween.restart();
                        sunflowerTween.pause();

                        strawberryTween.stop(0);
                        strawberryTween.restart();
                        strawberryTween.pause();

                        apppleTween.stop(0);
                        apppleTween.restart();
                        apppleTween.pause();

                    } else if (selectedTool.name === "fertilizer") {
                        ground3.fertilizer = true;
                        ground3.toolAnm.visible = true;
                        ground3.toolAnm.setScale(1);
                        ground3.toolAnm.anims.play('fertilizerAnim').on('animationcomplete', function () {
                            if (ground3.tool1 && ground3.seed) {
                                this.scene.add.tween({
                                    targets: ground3.sparkle,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true,
                                    hold: 1500,
                                    alpha: {
                                        getStart: () => 0,
                                        getEnd: () => 1
                                    },
                                    loop: -1,
                                });
                                this.scene.add.tween({
                                    targets: ground3.sparkle2,
                                    ease: 'Sine.easeInOut',
                                    duration: 2000,
                                    yoyo: true,
                                    hold: 1500,
                                    alpha: {
                                        getStart: () => 1,
                                        getEnd: () => 0
                                    },
                                    loop: -1
                                });
                            }
                        });
                        ;

                    } else if (selectedTool.name === "water") {
                        ground3.water = true;
                        ground3.toolAnm.visible = true;
                        if (user === 'girl') {
                            ground3.toolAnm.setScale(0.3);
                        } else {
                            ground3.toolAnm.setScale(0.3);
                        }
                        ground3.toolAnm.anims.play('waterAnim');
                    }

                    if (ground3.tool1) {
                        if (ground3.seed) {
                            if (ground3.fertilizer) {
                                if (ground3.water) {
                                    ground3.sparkle.destroy();
                                    ground3.sparkle2.destroy();

                                    ground3.toolAnm.on('animationcomplete', function () {
                                        ground3.grow.visible = true;
                                        if (ground3.seedType === "strawberrySeed") {
                                            ground3.grow.anims.play('strawberryAnim');
                                        } else if (ground3.seedType === "sunflowerSeed") {
                                            ground3.clock.y = 390;
                                            ground3.grow.anims.play('sunflowerAnim');
                                        } else if (ground3.seedType === "appleSeed") {
                                            ground3.clock.y = 300;
                                            ground3.grow.setScale(1);
                                            ground3.grow.anims.play('appleAnim');
                                        }
                                        clockS.play();
                                        clockS.playingCount += 1;
                                        var scene = this.scene;
                                        ground3.clock.anims.play('clock').on('animationcomplete', function (event) {
                                            ground3.clock.destroy();
                                            clockS.playingCount -= 1;
                                            if (clockS.playingCount === 0) {
                                                clockS.stop();
                                            }
                                            plantsGrown += 1;
                                            score+=10;
                                            if (plantsGrown === 3) {
                                                scene.gameOver();
                                            }
                                        });
                                        ground3.toolAnm.destroy();
                                        ground3.destroy();
                                    }, this);
                                }
                            } else {
                                ground3.water = false;
                            }
                        } else {
                            ground3.fertilizer = false;
                            ground3.water = false;
                        }
                    } else {
                        ground3.seed = false;
                        ground3.fertilizer = false;
                        ground3.water = false;
                    }

                    this.scene.input.setDefaultCursor('pointer');
                    selectedTool.setScale(0.2);
                    selectedTool.setAlpha(1);
                    selectedTool = null;
                }
            }
        });


        // this.input.on('pointerdown', function () {
        //     if (selectedTool != null) {
        //         this.physics.add.overlap(selectedTool, ground, function (bullet, bubble) {
        //
        //         });
        //     }
        // });


        // this.input.setDraggable(cStrawberrySeed);
        //
        // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        //
        //
        //
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        //
        // });


        /*
        * Add text in left and right buttons
        */
        text = this.add.text(32, 32);
        text.setStyle({color: '#000000', fontSize: '30px'});

        timer = this.add.text(gameWidth / 2, 32).setOrigin(0.5, 0);
        timer.setStyle({color: '#000000', fontSize: '30px'});

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


    gameOver() {
        console.log('asd');
        this.scene.stop();
        this.scene.start('plantsGameOver');
        // this.scene.start('plantsBoyGameOver');

    }

    update() {
        text.setText('Score: ' + score);
        timer.setText(min + ':' + sec + 's');
    }

}

class plantsGameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'plantsGameOver',
        });
    }

    create() {

        this.add.image(-10, 0, 'SS', 'lvl1Background').setScale(0.52).setOrigin(0);

        if (user === 'girl') {
            this.add.image(10, gameHeight - 10, 'SS', 'girl').setScale(0.8).setOrigin(0.01, 1);
        } else {
            this.add.image(10, gameHeight - 10, 'SS', 'boy').setScale(0.8).setOrigin(0.01, 1);
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

        this.add.image(gameWidth - 150, gameHeight - 70, 'SS', 'UI/btnRestart').setScale(0.8).setInteractive().on('pointerdown', function () {
            this.setScale(0.79);
            game.scene.start('plantsChooseCharacter');
            game.scene.sendToBack('plantsGameOver');
            game.scene.stop('plantsGameOver');
        });
    }
}

class plantsChooseCharacter extends Phaser.Scene {

    constructor() {
        super({
            key: 'plantsChooseCharacter',
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
        this.load.audio('clockS', './assets/sounds/clockS.mp3', {instances: 1});
    }

    create() {
        game.canvas.oncontextmenu = function (e) {
            e.preventDefault();
        };

        // this.scene.start('plantsGameOver');

        // this.scene.pause();
        // this.scene.launch('plantsLvl1Instructions1');

        gameWidth = this.game.config.width;
        gameHeight = this.game.config.height;

        //Background
        this.add.image(-10, 0, 'SS', 'smoke_background').setScale(0.68).setOrigin(0);
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
        var boy = this.add.image(gameWidth / 2 - 250, 350, 'SS', 'bwater').setInteractive();
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
                this.scene.start('plantsLvl1');
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
        var girlRobot = this.add.image(gameWidth / 2 + 250, 350, 'SS', 'gwater').setInteractive();
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
                this.scene.start('plantsLvl1');
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
        plantsChooseCharacter,
        plantsLvl1,
        plantsGameOver
    ],
    autoResize: true,
};

var game = new Phaser.Game(config);

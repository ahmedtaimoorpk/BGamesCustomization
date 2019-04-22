/**
 * Blockly Games: JavaScript Blocks
 *
 * Copyright 2016 Google Inc.
 * https://github.com/google/blockly-games
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Constant for Colors and other things.
 * Will define three type of color scheme initially.
 * @author ahmedtaimoorpk@gmail.com (Ahmed Taimoor)
 */
'use strict';

goog.provide('MessyActivityGame');

// goog.require('BlocklyDialogs');
// goog.require('BlocklyInterface');

// goog.require('MesseyActicityChooseCharacter');
// goog.require('MesseyActicitykarachiBoy');
// goog.require('MesseyActicitymenuBoy');

MessyActivityGame = {};
MessyActivityGame.game = null;
//GOTO : Declaration Points

var game;
var cursors;
var keySpace;
var player;
var items;
var allowedToCollect = false;
var c_books, c_pencil_glass, c_rocket, c_pillow;
var textConfig = {
    fontSize: '38px',
    color: '#000000',
    fontFamily: 'Love Ya Like A Sister, cursive'
};
var score = 0;
var scoreToBeAdded = 0;
var itemCount = 0;
var scoreText;

// var moveLeft;


class karachiBoy extends Phaser.Scene {

    constructor() {
        super({
            key: 'karachiBoy',
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
        });
    }

    preload() {
        // console.log('asdasdads');
        this.load.tilemapTiledJSON('karachiBoyMap', 'messy/Game/assets/Boy-Rooms/Karachi/temp.json');
        this.load.image('Kbackground', 'messy/Game/assets/Boy-Rooms/Karachi/Karachi-Boy Blank-Room-01.jpg');
        this.load.image('pencil', 'messy/Game/assets/Boy-Rooms/Karachi/Messy-Room%20Objects/pencil.png');
        this.load.multiatlas('SS', 'messy/Game/assets/Boy-Rooms/Karachi/RobotBoyKarachi_SS.json', 'messy/Game/assets/Boy-Rooms/Karachi/');

    }

    create() {

        // this.physics.startSystem(Phaser.Physics.ARCADE);
        cursors = this.input.keyboard.createCursorKeys();
        keySpace = this.input.keyboard.addKey('Space');

        var height = game.config.height;
        var width = game.config.width;
        this.add.image(0, 0, 'Kbackground').setOrigin(0).setDisplaySize(width, height);


        // sprites[0].x = 400;
        // sprites[0].y = 300;
        // sprites[0].setScale(0.8);

        // sprites[0].displayWidth =800;
        // sprites[0].displayHeight =600;


        // sprites2 = map.createFromObjects('pencil',2, { key: 'pencil' });
        // sprites2 = sprites2[0];
        // map.setCollision(2);

        // physics.enable(sprites2);
        // sprites2.setInteractive();
        // sprites2.on('pointerdown', function(event) {console.log('asdasd');});

        items = this.physics.add.group();

        console.log(width + ',' + height);

        var books_2 = items.create((340 / 800) * width, (530 / 600) * height, 'SS', 'Messy-Room Objects/books-2.png').setScale(0.6);

        var books_3 = items.create((560 / 800) * width, (236 / 600) * height, 'SS', 'Messy-Room Objects/books-3.png').setScale(0.6);

        var chair = this.physics.add.image((110 / 800) * width, (455 / 600) * height, 'SS', 'Messy-Room Objects/chair.png').setScale(0.6).setImmovable();
        chair.body.setSize(chair.body.width, chair.body.height - 30, 0, 0);

        var darpe_1 = this.add.image((35 / 800) * width, (417 / 600) * height, 'SS', 'Messy-Room Objects/darpe-1.png').setScale(0.6);

        var darpe_2 = items.create((710 / 800) * width, (575 / 600) * height, 'SS', 'Messy-Room Objects/darpe-2.png').setScale(0.6);

        var papers = this.add.image((610 / 800) * width, (525 / 600) * height, 'SS', 'Messy-Room Objects/papers.png').setScale(0.6);

        var pencil_glass = items.create((475 / 800) * width, (545 / 600) * height, 'SS', 'Messy-Room Objects/pencil-glass.png').setScale(0.6);

        var pencil = this.add.image((660 / 800) * width, (530 / 600) * height, 'SS', 'Messy-Room Objects/pencil.png').setScale(0.6);

        var pillow_2 = this.add.image((660 / 800) * width, (398 / 600) * height, 'SS', 'Messy-Room Objects/pillow-2.png').setScale(0.6);

        var pillow = items.create((350 / 800) * width, (480 / 600) * height, 'SS', 'Messy-Room Objects/pillow.png').setScale(0.6);

        var pin_2 = items.create((580 / 800) * width, (540 / 600) * height, 'SS', 'Messy-Room Objects/pin-2.png').setScale(0.6);

        var pin = items.create((260 / 800) * width, (560 / 600) * height, 'SS', 'Messy-Room Objects/pin.png').setScale(0.6);

        var rocket = items.create((240 / 800) * width, (520 / 600) * height, 'SS', 'Messy-Room Objects/rocket.png').setScale(0.6);

        var rubber = this.add.image((640 / 800) * width, (535 / 600) * height, 'SS', 'Messy-Room Objects/rubber.png').setScale(0.6);

        var scale = this.add.image((650 / 800) * width, (542 / 600) * height, 'SS', 'Messy-Room Objects/scale.png').setScale(0.6);

        var school_bag = items.create((450 / 800) * width, (480 / 600) * height, 'SS', 'Messy-Room Objects/school-bag.png').setScale(0.6);

        var sock = items.create((640 / 800) * width, (570 / 600) * height, 'SS', 'Messy-Room Objects/sock.png').setScale(0.6);

        var sticky_note = items.create((187 / 800) * width, (570 / 600) * height, 'SS', 'Messy-Room Objects/sticky-note.png').setScale(0.6);

        var c_book = this.physics.add.sprite((540 / 800) * width, (180 / 600) * height, 'SS', 'Cleaned-Room Objects/book.png').setScale(0.6);

        c_books = this.physics.add.sprite((580 / 800) * width, (240 / 600) * height, 'SS', 'Cleaned-Room Objects/books.png').setScale(0.6);
        c_books.disableBody(true, true);

        c_pencil_glass = this.physics.add.sprite((555 / 800) * width, (148 / 600) * height, 'SS', 'Cleaned-Room Objects/pencils-glass.png').setScale(0.6);
        c_pencil_glass.disableBody(true, true);

        c_rocket = this.physics.add.sprite((600 / 800) * width, (142 / 600) * height, 'SS', 'Cleaned-Room Objects/c-rocket.png').setScale(0.6);
        c_rocket.disableBody(true, true);

        c_pillow = this.physics.add.sprite((600 / 800) * width, (400 / 600) * height, 'SS', 'Messy-Room Objects/pillow.png').setScale(0.6);
        c_pillow.disableBody(true, true);


        player = this.physics.add.sprite((60 / 800) * width, (530 / 600) * height, 'SS', 'Boy-Robot/5.png').setScale(0.3);
        player.setCollideWorldBounds(true);
        player.body.setSize(player.body.width / 2, 50, 0, 0);
        player.body.offset.x = 70;
        player.body.offset.y = 350;


        this.physics.add.overlap(player, items, this.collect, null, 0);


        // var rect = new Phaser.Geom.Rectangle(250, 500, 300, 200);
        // var graphics = this.add.graphics({ fillStyle: { color: 0x0000ff } });

        // graphics.fillRectShape(rect);

        var obstacle = this.physics.add.sprite(0, 0, null).setImmovable();
        obstacle.body.setSize(width, (500 / 600) * height, 0, 0);
        obstacle.visible = false;

        this.physics.add.collider(player, obstacle);
        this.physics.add.collider(player, chair);

        // player.input.boundsRect = rect;


        // this.physics.add.overlap(player, sprites2, this.collisionHandler, null, this);

        // sprites2[0].x = 400;
        // sprites2[0].inputEnabled = true;
        // sprites2[0].input.enableDrag();


        // var sprites = map.createFromObjects('background');

        // var villain = this.add.sprite(50, 50, 'karachiBoyMap', 'background');

        // var layer = map.createDynamicLayer(26);

        // console.log(player);
        // var layer = map.createStaticLayer(layerID, tileset);


        // layer = map.createLayer('books-2');
        // var layer = map.createStaticLayer('books-2','books-2');
        // var coins = map.createFromObjects('books-2', 3, { key: 'books-2' });
        // var tileset = map.addTilesetImage('temp', 'books_2');
        // var blocklayer = map.createDynamicLayer('background', tileset, 0, 0);

        // layer = map.createLayer('background');

        // this.map.resizeWorld();

        // var books_2 = map.addTilesetImage('books-2');

        // map.createStaticLayer('background');

        // var textConfig = {
        //     fontSize: '50px',
        //     color: '#000000',
        //     fontFamily: 'Love Ya Like A Sister, cursive'
        // };
        // this.add.text(220, 80, "Select a Place", textConfig);


        // The function generateFrameNames() creates a whole bunch of frame names by creating zero-padded numbers between start and end,
        //surrounded by prefix and suffix). 1 is the start index, 8 the end index and the 1 is the number of digits to use:

        var upFrames = this.anims.generateFrameNames('SS', {
            start: 1, end: 4, zeroPad: 1,
            prefix: 'Boy-Robot/', suffix: '.png'
        });

        var downFrames = this.anims.generateFrameNames('SS', {
            start: 5, end: 8, zeroPad: 1,
            prefix: 'Boy-Robot/', suffix: '.png'
        });

        var leftFrames = this.anims.generateFrameNames('SS', {
            start: 9, end: 14, zeroPad: 1,
            prefix: 'Boy-Robot/', suffix: '.png'
        });

        var rightFrames = this.anims.generateFrameNames('SS', {
            start: 15, end: 20, zeroPad: 1,
            prefix: 'Boy-Robot/', suffix: '.png'
        });


        // Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'up',
            frames: upFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: downFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: leftFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: rightFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stop',
            frames: [{key: 'SS', frame: 'Boy-Robot/5.png'}],
            frameRate: 20
        });
        scoreText = this.add.text(32, 32, "Score : " + score, textConfig);

    }

    update() {

        allowedToCollect = keySpace.isDown;
        score = parseInt(scoreToBeAdded) * itemCount;
        scoreText.setText('Score: ' + score);
    }

    // noinspection JSMethodCanBeStatic
    collect(obj1, obj2) {

        if (allowedToCollect) {
            try {
                obj2.disableBody(true, true);
                console.log(obj2.frame.name);
                if (obj2.frame.name === 'Messy-Room Objects/pillow.png') {
                    c_books.visible = true;
                }
                if (obj2.frame.name === 'Messy-Room Objects/books-2.png') {
                    c_pillow.visible = true;
                }
                if (obj2.frame.name === 'Messy-Room Objects/rocket.png') {
                    c_rocket.visible = true;
                }
                if (obj2.frame.name === 'Messy-Room Objects/pencil-glass.png') {
                    c_pencil_glass.visible = true;
                }
                itemCount++;

            }
            catch (e) {
                console.log(e);
                // ignore
            }

        }
    }

    // noinspection JSMethodCanBeStatic
    moveLeft() {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    };

    // noinspection JSMethodCanBeStatic
    updateScorePerItem(scorePerItem) {
        scoreToBeAdded = scorePerItem;
    };

    // noinspection JSMethodCanBeStatic
    moveRight() {
        player.setVelocityX(160);
        player.anims.play('right', true);
    };

    // noinspection JSMethodCanBeStatic
    moveUp() {
        player.setVelocityY(-160);
        player.anims.play('up', true);
    }

    // noinspection JSMethodCanBeStatic
    moveDown() {
        player.setVelocityY(160);
        player.anims.play('down', true);
    }

    // noinspection JSMethodCanBeStatic
    stop() {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('stop');
    }

    render() {

        // Input debug info
        this.debug.inputInfo(32, 32);
        // this.debug.spriteInputInfo(sprite, 32, 130);
        this.debug.pointer(this.input.activePointer);

    }

}


var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 771,
    height: 570,
    scene: [karachiBoy]
};


MessyActivityGame.gameInit = function () {
    game = new Phaser.Game(config);
    MessyActivityGame.game = new karachiBoy();
};

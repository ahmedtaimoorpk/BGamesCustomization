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

goog.provide('GasesGame');

// goog.require('Phaser');
// goog.require('Gases');
goog.require('BlocklyDialogs');
goog.require('BlocklyInterface');


GasesGame = {};

GasesGame.item1 = 0;
GasesGame.item2 = 0;
GasesGame.item3 = 0;
GasesGame.item4 = 0;
GasesGame.item5 = 0;
GasesGame.item6 = 0;
GasesGame.item7 = 0;
var itemsAttached = 0;
var engine_sound, tool_fixing_sound, game, ins1S, ins2S, ins3S, ins4S, ins5S, ins6S, ins7S, ins8S, ins9S, ins10S;
GasesGame.itemsAttached = false;

GasesGame.gameInit = function (func, level) {
    game = new Phaser.Game(400, 340, Phaser.AUTO, 'game_gases', {

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
            game.load.audio('engine_sound', ['gases/Sounds/engine_sound.mp3', 'gases/Sounds/engine_sound.ogg']);
            game.load.audio('tool_fixing_sound', ['gases/Sounds/tool_fixing_sound.wav', 'gases/Sounds/tool_fixing_sound.ogg']);

            game.load.audio('ins1S', ['gases/Sounds/ins1S.ogg']);
            game.load.audio('ins2S', ['gases/Sounds/ins2S.mp3']);
            game.load.audio('ins3S', ['gases/Sounds/ins3S.mp3']);
            game.load.audio('ins4S', ['gases/Sounds/ins4S.mp3']);
            game.load.audio('ins5S', ['gases/Sounds/ins5S.mp3']);
            game.load.audio('ins6S', ['gases/Sounds/ins6S.mp3']);
            game.load.audio('ins7S', ['gases/Sounds/ins7S.mp3']);
            game.load.audio('ins8S', ['gases/Sounds/ins8S.mp3']);
            game.load.audio('ins9S', ['gases/Sounds/ins9S.mp3']);
            game.load.audio('ins10S', ['gases/Sounds/ins10S.mp3']);

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
            this.game.physics.arcade.enable(this.img1);
            this.img1.alpha = 0;

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
            this.game.physics.arcade.enable(this.img2);
            this.img2.alpha = 0;

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
            this.game.physics.arcade.enable(this.img3);
            this.img3.alpha = 0;

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
            this.game.physics.arcade.enable(this.img4);
            this.img4.alpha = 0;

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
            this.game.physics.arcade.enable(this.img5);
            this.img5.alpha = 0;

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
            this.game.physics.arcade.enable(this.img6);
            this.img6.alpha = 0;

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
            this.game.physics.arcade.enable(this.img7);
            this.img7.alpha = 0;

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

            engine_sound = game.add.audio('engine_sound');
            tool_fixing_sound = game.add.audio('tool_fixing_sound');

            ins1S = game.add.audio('ins1S');
            ins2S = game.add.audio('ins2S');
            ins3S = game.add.audio('ins3S');
            ins4S = game.add.audio('ins4S');
            ins5S = game.add.audio('ins5S');
            ins6S = game.add.audio('ins6S');
            ins7S = game.add.audio('ins7S');
            ins8S = game.add.audio('ins8S');
            ins9S = game.add.audio('ins9S');
            ins10S = game.add.audio('ins10S');

            func();

            if (level === 1) {
                this.inst1();
            }

        },

        inst1: function () {
            // ins1S.play();
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
                tool_fixing_sound.play();

                tool_fixing_sound.play();
                if (itemsAttached == 7) {
                    // GasesGame.scheduleFinish(true);
                    // BlocklyInterface.saveToLocalStorage();
                    engine_sound.play();
                    document.getElementById('game_completed').style.display = 'block';
                    document.getElementById('game_gases').getElementsByTagName('canvas')[0].style.display = 'none';

                    setTimeout(BlocklyDialogs.congratulations, 1000);
                    document.getElementById('game_completed').style.display = 'block';
                    document.getElementById('game_gases').getElementsByTagName('canvas')[0].style.display = 'none';

                }

            })) {
                currentSprite.position.copyFrom(currentSprite.originalPosition);
            }
        }


    });


};

GasesGame.gameResize = function (width = 800, height = 600) {
    if (width === undefined) {
        width = 400;
    }
    if (height === undefined) {
        height = 340;
    }
    // debugger;
    // game.scale.setGameSize(width, height);
    // // game.scale.setupScale(width, height);
    // game.renderer.resize(width, height);
    // // game.world.setBounds(0, 0, width, height);
    // // game.camera.setSize(width, height);
    // // game.camera.setBoundsToWorld();
    // game.scale.setShowAll();
    game.scale.refresh();

};


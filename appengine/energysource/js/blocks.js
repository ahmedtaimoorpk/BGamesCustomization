/**
 * Blockly Games: Puzzle Blocks
 *
 * Copyright 2013 Google Inc.
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
 * @fileoverview Blocks for Blockly's Puzzle application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Energysource.Blocks');

goog.require('Blockly');
goog.require('BlocklyGames');


/**
 * Common HSV hue for all animal blocks.
 */
Energysource.Blocks.ANIMAL_HUE = 120;

/**
 * Common HSV hue for all picture blocks.
 */
Energysource.Blocks.PICTURE_HUE = 30;

/**
 * Common HSV hue for all trait blocks.
 */
Energysource.Blocks.TRAIT_HUE = 290;

Blockly.Blocks['animal'] = {
    /**
     * Block to represent an animal.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Energysource.Blocks.ANIMAL_HUE);
        this.appendDummyInput()
            .appendField('', 'NAME');
        this.appendStatementInput('PIC')
            .appendField(BlocklyGames.getMsg('Puzzle_picture'));
        this.setInputsInline(false);
    },
    /**
     * Save the animal number.
     * @this Blockly.Block
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        container.setAttribute('animal', this.animal);
        return container;
    },
    /**
     * Restore the animal number.
     * @this Blockly.Block
     */
    domToMutation: function (xmlElement) {
        this.populate(parseInt(xmlElement.getAttribute('animal'), 10));
    },
    animal: 0,
    answer: '',
    /**
     * Set the animal.
     * @this Blockly.Block
     */
    populate: function (n) {
        this.animal = n;
        this.answer = BlocklyGames.getMsgOrNull('Puzzle_answer' + n);
        this.setFieldValue(BlocklyGames.getMsg('Puzzle_animal' + n) === "--" ? "" : BlocklyGames.getMsg('Puzzle_animal' + n), 'NAME');
        this.setColour(BlocklyGames.getMsgOrNull('Puzzle_block' + n + '_color'));
        // this.setColour('');
        this.helpUrl = BlocklyGames.getMsg('Puzzle_animal' + n + 'HelpUrl');
        this.setMovable(false);

        this.setPosition(n);
    },

    setPosition: function (n) {
        let x = BlocklyGames.getMsgOrNull('Puzzle_animal' + n + 'xPos');
        let y = BlocklyGames.getMsgOrNull('Puzzle_animal' + n + 'yPos');

        this.moveBy(x == null ? 1700 : x, y == null ? 500: y);
    },


    getWeightage: function(){
        return BlocklyGames.getMsgOrNull('Puzzle_weight'+this.animal);
    },
    /**
     * Evaluate the correctness of this block.
     * @this Blockly.Block
     */
    isCorrect: function () {
        // return this.getFieldValue('LEGS') == this.animal;
        return true;
    }
};

Blockly.Blocks['picture'] = {
    /**
     * Block to represent a picture.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Energysource.Blocks.PICTURE_HUE);
        this.appendDummyInput('PIC');
        // this.setOutput(true);
        this.setPreviousStatement(true);
        this.setTooltip('');
    },
    mutationToDom: Blockly.Blocks['animal'].mutationToDom,
    domToMutation: Blockly.Blocks['animal'].domToMutation,
    animal: 0,
    answer: '',
    /**
     * Set the animal and picture.
     * @this Blockly.Block
     */
    populate: function (n) {
        this.animal = n;
        this.answer = BlocklyGames.getMsgOrNull('Puzzle_answer' + n);
        var pic = 'energysource/' + BlocklyGames.getMsg('Puzzle_animal' + n + 'Pic');
        var picHeight = BlocklyGames.getMsg('Puzzle_animal' + n + 'PicHeight');
        var picWidth = BlocklyGames.getMsg('Puzzle_animal' + n + 'PicWidth');
        this.getInput('PIC')
            .appendField(new Blockly.FieldImage(pic, picWidth, picHeight));
        this.setPosition(n);
    },


    setPosition: function (n) {
        let x = BlocklyGames.getMsgOrNull('Puzzle_power' + n + 'PicxPos');
        let y = BlocklyGames.getMsgOrNull('Puzzle_power' + n + 'PicyPos');

        this.moveBy(x == null ? 1330 : x, y == null ? 10 : y);
    },
    getWeightage: function(){
        return BlocklyGames.getMsgOrNull('Puzzle_weight'+this.animal);
    },
    /**
     * Evaluate the correctness of this block.
     * @this Blockly.Block
     */
    isCorrect: function () {

        var parent = this.getParent();
        return parent && (parent.answer === this.answer);
    }
};

// Blockly.Blocks['trait'] = {
//   /**
//    * Block to represent a trait.
//    * @this Blockly.Block
//    */
//   init: function() {
//     this.setColour(Energysource.Blocks.TRAIT_HUE);
//     this.appendDummyInput().appendField('', 'NAME');
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//   },
//   /**
//    * Save the animal and trait numbers.
//    * @this Blockly.Block
//    */
//   mutationToDom: function() {
//     var container = document.createElement('mutation');
//     container.setAttribute('animal', this.animal);
//     container.setAttribute('trait', this.trait);
//     return container;
//   },
//   /**
//    * Restore the animal and trait numbers.
//    * @this Blockly.Block
//    */
//   domToMutation: function(xmlElement) {
//     this.populate(parseInt(xmlElement.getAttribute('animal'), 10),
//                   parseInt(xmlElement.getAttribute('trait'), 10));
//   },
//   animal: 0,
//   trait: 0,
//   /**
//    * Set the animal and trait.
//    * @this Blockly.Block
//    */
//   populate: function(n, m) {
//     this.animal = n;
//     this.trait = m;
//     // Set the trait name.
//     this.setFieldValue(BlocklyGames.getMsg(
//         'Puzzle_animal' + n + 'Trait' + m), 'NAME');
//   },
//   /**
//    * Evaluate the correctness of this block.
//    * @this Blockly.Block
//    */
//   isCorrect: function() {
//     var parent = this.getSurroundParent();
//     return parent && (parent.animal == this.animal);
//   }
// };

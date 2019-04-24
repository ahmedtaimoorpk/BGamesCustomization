/**
 * Blockly Games: Gases Blocks
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Blocks for Blockly's Gases application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Gases.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');
goog.require('Constants');


/**
 * Common HSV hue for all movement blocks.
 */
// Gases.Blocks.MOVEMENT_HUE = 290;
// Gases.Blocks.MOVEMENT_HUE = '#F3D250';
Gases.Blocks.MOVEMENT_HUE = Constants.Color["blocksColor1"];

/**
 * HSV hue for loop block.
 */
// Gases.Blocks.LOOPS_HUE = 120;
// Gases.Blocks.LOOPS_HUE = '#F78888';
Gases.Blocks.LOOPS_HUE = Constants.Color["blocksColor2"];

/**
 * Common HSV hue for all logic blocks.
 */
// Gases.Blocks.LOGIC_HUE = 210;
Gases.Blocks.LOGIC_HUE = Constants.Color["blocksColor3"];


/**
 * Left turn arrow to be appended to messages.
 */
Gases.Blocks.LEFT_TURN = ' \u21BA';

/**
 * Left turn arrow to be appended to messages.
 */
Gases.Blocks.RIGHT_TURN = ' \u21BB';

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['gases_moveForward'] = {
  /**
   * Block for moving forward.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('Gases_moveForward'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Gases.Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('Gases_moveForwardTooltip')
    });
  }
};

Blockly.JavaScript['gases_moveForward'] = function(block) {
  // Generate JavaScript for moving forward.
  return 'moveForward(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['gases_turn'] = {
  /**
   * Block for turning left or right.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Gases_turnLeft'), 'turnLeft'],
         [BlocklyGames.getMsg('Gases_turnRight'), 'turnRight']];
    // Append arrows to direction messages.
    DIRECTIONS[0][0] += Gases.Blocks.LEFT_TURN;
    DIRECTIONS[1][0] += Gases.Blocks.RIGHT_TURN;
    this.setColour(Gases.Blocks.MOVEMENT_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Gases_turnTooltip'));
  },
  getDirection(){
    var direction = this.getFieldValue('DIR');
    if (direction==='turnLeft'){
      return 'left';
    }
    else{
      return 'right';
    }
  }
};

Blockly.JavaScript['gases_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var dir = block.getFieldValue('DIR');
  return dir + '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['gases_if'] = {
  /**
   * Block for 'if' conditional if there is a path.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Gases_pathAhead'), 'isPathForward'],
         [BlocklyGames.getMsg('Gases_pathLeft'), 'isPathLeft'],
         [BlocklyGames.getMsg('Gases_pathRight'), 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Gases.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Gases.Blocks.RIGHT_TURN;
    this.setColour(Gases.Blocks.LOGIC_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField(BlocklyGames.getMsg('Gases_doCode'));
    this.setTooltip(BlocklyGames.getMsg('Gases_ifTooltip'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['gases_if'] = function(block) {
  // Generate JavaScript for 'if' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  var code = 'if (' + argument + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Blocks['gases_ifElse'] = {
  /**
   * Block for 'if/else' conditional if there is a path.
   * @this Blockly.Block
   */
  init: function() {
    var DIRECTIONS =
        [[BlocklyGames.getMsg('Gases_pathAhead'), 'isPathForward'],
         [BlocklyGames.getMsg('Gases_pathLeft'), 'isPathLeft'],
         [BlocklyGames.getMsg('Gases_pathRight'), 'isPathRight']];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] += Gases.Blocks.LEFT_TURN;
    DIRECTIONS[2][0] += Gases.Blocks.RIGHT_TURN;
    this.setColour(Gases.Blocks.LOGIC_HUE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.appendStatementInput('DO')
        .appendField(BlocklyGames.getMsg('Gases_doCode'));
    this.appendStatementInput('ELSE')
        .appendField(BlocklyGames.getMsg('Gases_elseCode'));
    this.setTooltip(BlocklyGames.getMsg('Gases_ifelseTooltip'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.JavaScript['gases_ifElse'] = function(block) {
  // Generate JavaScript for 'if/else' conditional if there is a path.
  var argument = block.getFieldValue('DIR') +
      '(\'block_id_' + block.id + '\')';
  var branch0 = Blockly.JavaScript.statementToCode(block, 'DO');
  var branch1 = Blockly.JavaScript.statementToCode(block, 'ELSE');
  var code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n';
  return code;
};

Blockly.Blocks['gases_forever'] = {
  /**
   * Block for repeat loop.
   * @this Blockly.Block
   */
  init: function() {
    this.setColour(Gases.Blocks.LOOPS_HUE);
    this.appendDummyInput()
        .appendField(BlocklyGames.getMsg('Gases_repeatUntil'))
        .appendField(new Blockly.FieldImage(Gases.SKIN.marker, 12, 16));
    this.appendStatementInput('DO')
        .appendField(BlocklyGames.getMsg('Gases_doCode'));
    this.setPreviousStatement(true);
    this.setTooltip(BlocklyGames.getMsg('Gases_whileTooltip'));
  }
};

Blockly.JavaScript['gases_forever'] = function(block) {
  // Generate JavaScript for repeat loop.
  var branch = Blockly.JavaScript.statementToCode(block, 'DO');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'block_id_' + block.id + '\'') + branch;
  }
  return 'while (notDone()) {\n' + branch + '}\n';
};

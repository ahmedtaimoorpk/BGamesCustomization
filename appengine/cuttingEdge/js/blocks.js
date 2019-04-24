/**
 * Blockly Games: Messy Blocks
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
 * @fileoverview Blocks for Blockly's Messy application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Messy.Blocks');

goog.require('Blockly');
goog.require('Blockly.Blocks.colour');
goog.require('Blockly.Blocks.logic');
goog.require('Blockly.Blocks.loops');
goog.require('Blockly.Blocks.math');
goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.Blocks.texts');
goog.require('Blockly.Blocks.variables');
goog.require('Blockly.JavaScript');
goog.require('Blockly.JavaScript.colour');
goog.require('Blockly.JavaScript.logic');
goog.require('Blockly.JavaScript.loops');
goog.require('Blockly.JavaScript.math');
goog.require('Blockly.JavaScript.procedures');
goog.require('Blockly.JavaScript.texts');
goog.require('Blockly.JavaScript.variables');
goog.require('BlocklyGames');


/**
 * Common HSV hue for all shape blocks.
 */
Messy.Blocks.SHAPE_HUE = 160;

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['messy_circle'] = {
    /**
     * Block for drawing a circle.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Messy.Blocks.SHAPE_HUE);
        this.appendValueInput('X')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_circleDraw'))
            .appendField(BlocklyGames.getMsg('Messy_x'));
        this.appendValueInput('Y')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_y'));
        this.appendValueInput('RADIUS')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_radius'));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(BlocklyGames.getMsg('Messy_circleTooltip'));
    }
};

Blockly.JavaScript['messy_circle'] = function (block) {
    // Generate JavaScript for drawing a circle.
    var x = Blockly.JavaScript.valueToCode(block, 'X',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var radius = Blockly.JavaScript.valueToCode(block, 'RADIUS',
        Blockly.JavaScript.ORDER_NONE) || '0';
    return 'circle(' + x + ', ' + y + ', ' + radius + ');\n';
};

Blockly.Blocks['messy_rect'] = {
    /**
     * Block for drawing a rectangle.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Messy.Blocks.SHAPE_HUE);
        this.appendValueInput('X')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_rectDraw'))
            .appendField(BlocklyGames.getMsg('Messy_x'));
        this.appendValueInput('Y')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_y'));
        this.appendValueInput('WIDTH')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_width'));
        this.appendValueInput('HEIGHT')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_height'));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(BlocklyGames.getMsg('Messy_rectTooltip'));
    }
};

Blockly.JavaScript['messy_rect'] = function (block) {
    // Generate JavaScript for drawing a rectangle.
    var x = Blockly.JavaScript.valueToCode(block, 'X',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var y = Blockly.JavaScript.valueToCode(block, 'Y',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var height = Blockly.JavaScript.valueToCode(block, 'HEIGHT',
        Blockly.JavaScript.ORDER_NONE) || '0';
    return 'rect(' + x + ', ' + y + ', ' + width + ', ' + height + ');\n';
};

Blockly.Blocks['messy_line'] = {
    /**
     * Block for drawing a line.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Messy.Blocks.SHAPE_HUE);
        this.appendValueInput('X1')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_lineDraw'))
            .appendField(BlocklyGames.getMsg('Messy_x1'));
        this.appendValueInput('Y1')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_y1'));
        this.appendValueInput('X2')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_x2'));
        this.appendValueInput('Y2')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_y2'));
        this.appendValueInput('WIDTH')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(BlocklyGames.getMsg('Messy_width'));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(BlocklyGames.getMsg('Messy_rectTooltip'));
    }
};

Blockly.JavaScript['messy_line'] = function (block) {
    // Generate JavaScript for drawing a line.
    var x1 = Blockly.JavaScript.valueToCode(block, 'X1',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var y1 = Blockly.JavaScript.valueToCode(block, 'Y1',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var x2 = Blockly.JavaScript.valueToCode(block, 'X2',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var y2 = Blockly.JavaScript.valueToCode(block, 'Y2',
        Blockly.JavaScript.ORDER_NONE) || '0';
    var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
        Blockly.JavaScript.ORDER_NONE) || '0';
    return 'line(' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y2 + ', ' +
        width + ');\n';
};


Blockly.Blocks['messy_time'] = {
    /**
     * Block for getting the current time value.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Msg['VARIABLES_HUE']);
        this.appendDummyInput()
            .appendField('time (0\u2192100)');
        this.setOutput(true, 'Number');
        this.setTooltip(BlocklyGames.getMsg('Messy_timeTooltip'));
    }
};

Blockly.JavaScript['messy_time'] = function (block) {
    // Generate JavaScript for getting the current time value.
    var code = 'time()';
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Blocks['messy_colour'] = {
    /**
     * Block for setting the colour.
     * @this Blockly.Block
     */
    init: function () {
        this.setColour(Blockly.Msg['COLOUR_HUE']);
        this.appendValueInput('COLOUR')
            .setCheck('Colour')
            .appendField(BlocklyGames.getMsg('Messy_setColour'));
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(BlocklyGames.getMsg('Messy_colourTooltip'));
    }
};

Blockly.JavaScript['messy_colour'] = function (block) {
    // Generate JavaScript for setting the colour.
    var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
        Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
    return 'penColour(' + colour + ');\n';
};


Blockly.Blocks['motion_moveforward'] = {
    /**
     * Block to send a broadcast.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "id": "motion_moveforward",
            "message0": "%1",
            "colour": "#4c97ff",
            "args0": [
                {
                    "type": "field_label",
                    "text": "move forward"
                }
            ],
            "previousStatement": null,
        });
    },
    value: function () {
        return 'up';
    }
};

Blockly.Blocks['motion_movebackward'] = {
    /**
     * Block to send a broadcast.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "id": "motion_movebackward",
            "message0": "%1",
            "colour": "#4c97ff",
            "args0": [
                {
                    "type": "field_label",
                    "text": "move backward"
                }
            ],
            "previousStatement": null,
        });
    },
    value: function () {
        return 'down';
    }
};

Blockly.Blocks['motion_moveleft'] = {
    /**
     * Block to send a broadcast.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "id": "motion_moveleft",
            "message0": "%1",
            "colour": "#4c97ff",
            "args0": [
                {
                    "type": "field_label",
                    "text": "move left"
                }
            ],
            "previousStatement": null,
        });
    },
    value: function () {
        return 'left';
    }
};


Blockly.Blocks['motion_moveright'] = {

    /**
     * Block to send a broadcast.
     * @this Blockly.Block
     */
    init: function () {

        this.jsonInit({
            "id": "motion_moveright",
            "message0": "%1",
            "colour": "#4c97ff",
            "args0": [
                {
                    "type": "field_label",
                    "text": "move right"
                }
            ],
            "previousStatement": null,
        });
    },
    value: function () {
        return 'right';
    }
};


Blockly.Blocks['motion_pickup'] = {
    /**
     * Block to send a broadcast.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "id": "motion_pickup",
            "message0": "%1",
            "colour": "#4c97ff",
            "args0": [
                {
                    "type": "field_label",
                    "text": "pick up"
                }
            ],
            "previousStatement": null,
        });
    }
    ,
    value: function () {
        return 'pickup';
    }
};


Blockly.Blocks['event_whenkeypressed'] = {
    init: function () {
        this.setColour('#ffbf00');
        this.appendDummyInput()
            .appendField('when')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldDropdown([
                ['Space', 'Space'],
                ['Up Arrow', 'ArrowUp'],
                ['Down Arrow', 'ArrowDown'],
                ['Right Arrow', 'ArrowRight'],
                ['Left Arrow', 'ArrowLeft'],
                ['a', 'KeyA'],
                ['b', 'KeyB'],
                ['c', 'KeyC'],
                ['d', 'KeyD'],
                ['e', 'KeyE'],
                ['f', 'KeyF'],
                ['g', 'KeyG'],
                ['h', 'KeyH'],
                ['i', 'KeyI'],
                ['j', 'KeyJ'],
                ['k', 'KeyK'],
                ['l', 'KeyL'],
                ['m', 'KeyM'],
                ['n', 'KeyN'],
                ['o', 'KeyO'],
                ['p', 'KeyP'],
                ['q', 'KeyQ'],
                ['r', 'KeyR'],
                ['s', 'KeyS'],
                ['t', 'KeyT'],
                ['u', 'KeyU'],
                ['v', 'KeyV'],
                ['w', 'KeyW'],
                ['x', 'KeyX'],
                ['y', 'KeyY'],
                ['z', 'KeyZ'],
                ['0', 'Digit0'],
                ['1', 'Digit1'],
                ['2', 'Digit2'],
                ['3', 'Digit3'],
                ['4', 'Digit4'],
                ['5', 'Digit5'],
                ['6', 'Digit6'],
                ['7', 'Digit7'],
                ['8', 'Digit8'],
                ['9', 'Digit9']
            ]), 'KEY_OPTION')
            .appendField('key pressed');
        this.appendStatementInput('TRAITS')
        this.setInputsInline(false);
    },
};
Blockly.Blocks['event_scoreupdate'] = {
    init: function () {
        this.setColour('#ffbf00');
        this.appendDummyInput()
            .appendField('When Item Picked')
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendStatementInput('TRAITS')
        this.setInputsInline(false);
    },
};
Blockly.Blocks['event_addScore'] = {
    init: function () {
        this.setColour('#4c97ff');
        this.appendDummyInput()
            .appendField('Add Score')
            .appendField(new Blockly.FieldNumber('5', 0, 100, 2), 'scorePerItem')

            .setAlign(Blockly.ALIGN_RIGHT);
        this.setPreviousStatement(true, 'Mouse');

    },
};


Blockly.JavaScript['event_scoreupdate'] = function (block) {
    if (this.childBlocks_.length > 0) {
        var scorePerItem = this.childBlocks_[0].getFieldValue('scorePerItem');
        if (!isNaN(scorePerItem)) {
            return 'opts-setScore-' + scorePerItem;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }

};


Blockly.JavaScript['event_whenkeypressed'] = function (block) {
    var childs = [];
    for (let i = 0; i < this.childBlocks_.length; i++) {
        childs.push(this.childBlocks_[i]);
    }
    var command = 'event-' + this.getFieldValue('KEY_OPTION');
    if (childs.length === 1) {
        command += '-' + childs[0].value();
        return command;

    }
    else {
        console.log('Command is not right');
        return null;
    }
};


Blockly.JavaScript['motion_moveright'] = function (block) {
    return null;
};

Blockly.JavaScript['motion_moveleft'] = function (block) {
    return null;
};

Blockly.JavaScript['motion_moveforward'] = function (block) {
    return null;
};
Blockly.JavaScript['motion_pickup'] = function (block) {
    return null;
};

Blockly.JavaScript['motion_movebackward'] = function (block) {
    return null;
};


// Blockly.Extensions.register('warning_on_change', function() {
//   // Example validation upon block change:
//   this.setOnChange(function(changeEvent) {
//     if (this.getInput('NUM').connection.targetBlock()) {
//       this.setWarningText(null);
//     } else {
//       this.setWarningText('Must have an input block.');
//     }
//   });
// });
/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Fred Lin.
 * https://github.com/gasolin/BlocklyDuino
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
 * @fileoverview Helper functions for generating Arduino blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

//To support syntax defined in http://arduino.cc/en/Reference/HomePage

goog.provide('Blockly.Blocks.base');

goog.require('Blockly.Blocks');
Blockly.Blocks.base.Color = '#14A098';


Blockly.Blocks['base_delay'] = {
    helpUrl: 'http://arduino.cc/en/Reference/delay',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);
        this.appendValueInput("DELAY_TIME", 'Number')
            .appendField(Blockly.Msg.CONTROL_DELAY)
            .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.base_delay_Tooltip);
    }
};

Blockly.Blocks['base_map'] = {
    helpUrl: 'http://arduino.cc/en/Reference/map',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);
        this.appendValueInput("NUM", 'Number')
            .appendField(Blockly.Msg.MATH_Map)
            .setCheck('Number');
        this.appendValueInput("DMAX", 'Number')
            .appendField(Blockly.Msg.MATH_MapValueTo)
            .setCheck('Number');
        this.appendDummyInput()
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.base_map_Tooltip);
    }
};

Blockly.Blocks['inout_buildin_led'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);

        this.appendDummyInput()
            .appendField(Blockly.Msg.inout_buildin_led_Field)
            .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.inout_buildin_led_Tooltip);
    }
};

Blockly.Blocks['inout_digital_write'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.DigitalWrite_PIN_no)
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField("Stat")
            .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.inout_digital_write_Tooltip);
    }
};


Blockly.Blocks['inout_digital_read'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalRead',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);

        this.appendDummyInput()
            .appendField(Blockly.Msg.DigitalRead_PIN_no)
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setOutput(true, 'Boolean');
        this.setTooltip('');
    }
};

Blockly.Blocks['inout_analog_write'] = {
    helpUrl: 'http://arduino.cc/en/Reference/AnalogWrite',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);

        this.appendDummyInput()
            .appendField(Blockly.Msg.AnalogWrite_PIN_no)
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendValueInput("NUM", 'Number')
            .appendField(Blockly.Msg.VALUE)
            .setCheck('Number');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.inout_analog_write_Tooltip);
    }
};

Blockly.Blocks['inout_analog_read'] = {
    helpUrl: 'http://arduino.cc/en/Reference/AnalogRead',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.inout_analog_read_AnalogRead_pin)
            .appendField(new Blockly.FieldDropdown(profile.default.analog), "PIN");
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.inout_analog_read_Tooltip);
    }
};

Blockly.Blocks['inout_tone'] = {
    helpUrl: 'http://www.arduino.cc/en/Reference/Tone',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);

        this.appendDummyInput()
            .appendField(Blockly.Msg.inout_tone_FIELD)
            .appendField(new Blockly.FieldTextInput(''), 'NUM');
        // .appendValueInput("NUM", 'Number')
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.inout_tone_Tooltip);
    }
};

Blockly.Blocks['inout_notone'] = {
    helpUrl: 'http://www.arduino.cc/en/Reference/NoTone',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.inout_notone_FIELD)
            // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.inout_notone_Tooltip);
    }
};

Blockly.Blocks['inout_highlow'] = {
    helpUrl: 'http://arduino.cc/en/Reference/Constants',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL')
        this.setOutput(true, 'Boolean');
        this.setTooltip('');
    }
};

//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks['servo_move'] = {
    helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
    init: function () {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("Servo Motor")
            .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/EMAX%20Servo.jpg", 64, 64));
        this.appendDummyInput()
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
        this.appendValueInput("DEGREE", 'Number')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.servo_move_FIELD_DEGREE);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.servo_move_Tooltip);
    }
};

Blockly.Blocks['servo_read_degrees'] = {
    helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
    init: function () {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("Servo Motor")
            .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/EMAX%20Servo.jpg", 64, 64));
        this.appendDummyInput()
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.servo_read_degrees_FIELD_DEGREE)
        this.setOutput(true, 'Number');
        this.setTooltip(Blockly.Msg.servo_read_degrees_Tooltip);
    }
};

Blockly.Blocks['serial_print'] = {
    helpUrl: 'http://www.arduino.cc/en/Serial/Print',
    init: function () {
        this.setColour(Blockly.Blocks.base.Color);
        this.appendValueInput("CONTENT", 'String')
            .appendField(Blockly.Msg.serial_print_FIELD);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.serial_print_Tooltip);
    }
};


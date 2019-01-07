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

goog.provide('Blockly.Blocks.robotwala');

goog.require('Blockly.Blocks');
Blockly.Blocks.robotwala.Color = '#6b356b';


Blockly.Blocks['inout_led'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField("LED PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField("Stat")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
    }
};


Blockly.Blocks['inout_fan'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField("FAN PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField("Stat")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Write digital value to a specific Port');
    }
};


Blockly.Blocks['inout_line_sensor'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField("Line Sensor - ")
            // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField("Sense")
            .appendField(new Blockly.FieldDropdown([["BLACK", "BLACK"], ["WHITE", "WHITE"]]), "STAT");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true);

        this.setTooltip('Write digital value to a specific Port');
    }
};


Blockly.Blocks['inout_fire_sensor'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField("Flame Sensor - PIN #")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true);

        this.setTooltip('Write digital value to a specific Port');
    }
};


//UltraSonic

//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks['ultrasonic_read_distance'] = {
    helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField("Ultrasonic: ")
            .appendField("Trigger#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "trigger");
        this.appendDummyInput()
            .appendField("Ultrasonic: ")
            .appendField("Echo#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "echo");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Read Distance");
        this.setOutput(true);
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setTooltip('return that degree with the last servo move.');
    }
};


//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks['ultrasonic_read_distance_robotwala'] = {
    helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField("Ultrasonic Distance: ");

        this.setOutput(true);
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setTooltip('return that degree with the last servo move.');
    }
};


//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks['servo_move_robotwala'] = {
    helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField("Servo")
            .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/EMAX%20Servo.jpg", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField("Steps")
            .appendField(new Blockly.FieldTextInput(''), "Steps")
            .appendField("Delay (Millisecods)")
            .appendField(new Blockly.FieldTextInput(''), "delay");
        this.appendValueInput("DEGREE", 'Number')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Degree (0~180)");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('move between 0~180 degree');
    }
};


Blockly.Blocks['motor_turn_robotwala'] = {
    helpUrl: 'http://www.seeedstudio.com/wiki/Motor_Shield',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);

        this.appendDummyInput()
            .appendField("Turn Robot")
            .appendField(new Blockly.FieldImage("../../media/motor.png", 64, 64));

        this.appendDummyInput()
            .appendField("Turn Motor")
            .appendField(new Blockly.FieldAngle(0), "ANGEL");

        this.appendDummyInput().appendField("Direction")
            .appendField(new Blockly.FieldDropdown([["Right", "right"], ["Left", "left"]]), "DIRECTION");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Drive two brushed DC motors');
    }
};


Blockly.Blocks['grove_motor_robotwala'] = {
    helpUrl: 'http://www.seeedstudio.com/wiki/Motor_Shield',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()


            .appendField("Motor")
            .appendField(new Blockly.FieldImage("../../media/motor.png", 64, 64))
            .appendField(new Blockly.FieldDropdown([["Stop", "stop"], ["Forward", "forward"], ["Right", "right"], ["Left", "left"], ["Backward", "backward"]]), "DIRECTION");
        this.appendDummyInput().appendField("Speed motor a")
            .appendField(new Blockly.FieldTextInput('150',
                Blockly.FieldTextInput.numberValidator), 'SPEEDA');
        this.appendDummyInput().appendField("Speed motor b")
            .appendField(new Blockly.FieldTextInput('150',
                Blockly.FieldTextInput.numberValidator), 'SPEEDB');

        // this.appendValueInput("SPEEDA", 'Number')
        //      .setCheck('Number')
        //      .setAlign(Blockly.ALIGN_RIGHT)
        //      .appendField("Speed motor a");
        //      this.appendValueInput("SPEEDB", 'Number')
        //      .setCheck('Number')
        //      .setAlign(Blockly.ALIGN_RIGHT)
        //      .appendField("Speed motor b");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip('Drive two brushed DC motors');
    }
};
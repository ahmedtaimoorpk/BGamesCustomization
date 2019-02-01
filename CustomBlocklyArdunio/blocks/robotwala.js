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
Blockly.Blocks.robotwala.Color = 290;


Blockly.Blocks['inout_led'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(176);
        this.appendDummyInput()
            .appendField("LED")
            // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            // .appendField("Stat")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.inout_led_Tooltip);
    }
};


Blockly.Blocks['inout_fan'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
            this.setColour(176);
        this.appendDummyInput()
            .appendField("FAN PIN#")
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField("Stat")
            .appendField(new Blockly.FieldDropdown([["ON", "ON"], ["OFF", "OFF"]]), "STAT");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.inout_led_Tooltip);
    }
};


Blockly.Blocks['inout_line_sensor'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.inout_line_sensor_Field_lineSensor)
            // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField(new Blockly.FieldImage("../../media/Line senor-01.png", 64, 64));
        this.appendDummyInput()
            .appendField(Blockly.Msg.Sense)
            .appendField(new Blockly.FieldDropdown([["BLACK", "BLACK"], ["WHITE", "WHITE"]]), "STAT");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true);

        this.setTooltip(Blockly.Msg.inout_led_Tooltip);
    }
};


Blockly.Blocks['inout_fire_sensor'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.inout_fire_sensor_Field)
            // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
        .appendField(new Blockly.FieldImage("../../media/FLAME-SENSOR-01 V2.png", 64, 64))
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true);

        this.setTooltip(Blockly.Msg.inout_led_Tooltip);
    }
};
/**
 * Moisture Sensor
 * @type {{init: Blockly.Blocks.inout_moisture_sensor.init, helpUrl: string}}
 */
Blockly.Blocks['inout_moisture_sensor'] = {
    helpUrl: 'http://arduino.cc/en/Reference/DigitalWrite',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.inout_moisture_sensor_Field)
            // .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField(Blockly.Msg.Sense)
            .appendField(new Blockly.FieldDropdown([["WET", "WET"], ["DRY", "DRY"]]), "STAT");
        this.setPreviousStatement(false, null);
        this.setNextStatement(false, null);
        this.setOutput(true);

        this.setTooltip(Blockly.Msg.inout_led_Tooltip);
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
            .appendField(Blockly.Msg.ultrasonic_read_distance_Field1)
            .appendField(Blockly.Msg.ultrasonic_read_distance_Field2)
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "trigger");
        this.appendDummyInput()
            .appendField(Blockly.Msg.ultrasonic_read_distance_Field1)
            .appendField(Blockly.Msg.ultrasonic_read_distance_Field3)
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "echo");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.ultrasonic_read_distance_Field4);
        this.setOutput(true);
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ultrasonic_read_distance_Tooltip);
    }
};


//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks['ultrasonic_read_distance_robotwala'] = {
    helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.ultrasonic_read_distance_robotwala_Field)
            .appendField(new Blockly.FieldImage("../../media/ultrasonic-sensor 1-01.png", 64, 64));

        this.setOutput(true);
        // this.setPreviousStatement(true, null);
        // this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.ultrasonic_read_distance_Tooltip);
    }
};


//servo block
//http://www.seeedstudio.com/depot/emax-9g-es08a-high-sensitive-mini-servo-p-760.html?cPath=170_171
Blockly.Blocks['servo_move_robotwala'] = {
    helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
    init: function () {
        this.setColour(Blockly.Blocks.robotwala.Color);
        this.appendDummyInput()
            .appendField(Blockly.Msg.servo_move_robotwala_Field1)
            .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/EMAX%20Servo.jpg", 64, 64))
            .appendField(Blockly.Msg.servo_move_robotwala_Field2)
            .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN")
            .appendField(Blockly.Msg.servo_move_robotwala_Field3)
            .appendField(new Blockly.FieldTextInput(''), "Steps")
            .appendField(Blockly.Msg.servo_move_robotwala_Field4)
            .appendField(new Blockly.FieldTextInput(''), "delay");
        this.appendValueInput("DEGREE", 'Number')
            .setCheck('Number')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg.servo_move_robotwala_Field5);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.servo_move_robotwala_Tooltip);
    }
};


Blockly.Blocks['motor_turn_robotwala'] = {
    helpUrl: 'http://www.seeedstudio.com/wiki/Motor_Shield',
    init: function () {
        this.setColour(190);

        this.appendDummyInput()
            .appendField(Blockly.Msg.motor_turn_robotwala_Field1)
            .appendField(new Blockly.FieldImage("../../media/motor.png", 64, 64));

        this.appendDummyInput()
            .appendField(Blockly.Msg.motor_turn_robotwala_Field2)
            .appendField(new Blockly.FieldAngle(0), "ANGEL");

        this.appendDummyInput().appendField("Direction")
            .appendField(new Blockly.FieldDropdown([["Right", "right"], ["Left", "left"]]), "DIRECTION");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip(Blockly.Msg.motor_turn_robotwala_Tooltip);
    }
};


Blockly.Blocks['grove_motor_robotwala'] = {
    helpUrl: 'http://www.seeedstudio.com/wiki/Motor_Shield',
    init: function () {
        this.setColour(190);
        this.appendDummyInput()


            .appendField(Blockly.Msg.grove_motor_robotwala_Field1)
            .appendField(new Blockly.FieldImage("../../media/motor.png", 64, 64))
            .appendField(new Blockly.FieldDropdown([["Stop", "stop"], ["Forward", "forward"], ["Right", "right"], ["Left", "left"], ["Backward", "backward"]]), "DIRECTION");
        this.appendDummyInput().appendField(Blockly.Msg.grove_motor_robotwala_Field2)
            .appendField(new Blockly.FieldTextInput('150',
                Blockly.FieldTextInput.numberValidator), 'SPEEDA');
        this.appendDummyInput().appendField(Blockly.Msg.grove_motor_robotwala_Field3)
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
        this.setTooltip(Blockly.Msg.grove_motor_robotwala_Tooltip);
    }
};
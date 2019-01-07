/**
 * Visual Blocks Language
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

goog.provide('Blockly.Arduino.robotwala');

goog.require('Blockly.Arduino');


Blockly.Arduino.inout_led = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    if (dropdown_stat === 'ON') {
        dropdown_stat = 'HIGH'
    } else {
        dropdown_stat = 'LOW'
    }
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
    return code;
};


Blockly.Arduino.inout_fan = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = this.getFieldValue('STAT');
    if (dropdown_stat === 'ON') {
        dropdown_stat = 'HIGH'
    } else {
        dropdown_stat = 'LOW'
    }
    Blockly.Arduino.setups_['setup_output_' + dropdown_pin] = 'pinMode(' + dropdown_pin + ', OUTPUT);';
    var code = 'digitalWrite(' + dropdown_pin + ', ' + dropdown_stat + ');\n'
    return code;
};

Blockly.Arduino.inout_line_sensor = function () {
    // var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_pin = 4;
    var dropdown_stat = this.getFieldValue('STAT');
    if (dropdown_stat === 'BLACK') {
        dropdown_stat = 'HIGH'
    } else {
        dropdown_stat = 'LOW'
    }
    var code = "";


    Blockly.Arduino.definitions_['define_line_sensor'] = "bool SenseLine(int pin,int status)\n" +
        "{\n" +
        "  if (digitalRead(pin)==status){return true;}\n" +
        "  else {return false;}\n" +
        "}\n\n";

    code = "SenseLine(" + dropdown_pin + ", " + dropdown_stat + ")";
    return [code, Blockly.Arduino.ORDER_ASSIGNMENT];
};

Blockly.Arduino.inout_fire_sensor = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var dropdown_stat = 'LOW';
    var code = "";

    Blockly.Arduino.definitions_['define_fire_sensor'] = "bool SenseFire(int pin,int status)\n" +
        "{\n" +
        "  if (digitalRead(pin)==status){return true;}\n" +
        "  else {return false;}\n" +
        "}\n\n";
    code = "SenseFire(" + dropdown_pin + ", " + dropdown_stat + ")";
    return [code, Blockly.Arduino.ORDER_ASSIGNMENT];
};


//Ultrasonic

Blockly.Arduino.ultrasonic_read_distance = function () {
    var trigger_pin = this.getFieldValue('trigger');
    var echo_pin = this.getFieldValue('echo');

    Blockly.Arduino.setups_["setup_ultrasonic"] = "pinMode(" + trigger_pin + ", OUTPUT);\n" +
        "pinMode(" + echo_pin + ", INPUT);\n";
    // Blockly.Arduino.definitions_['var_ultrasonic'] = 'int distance;\n long duration;';

    var code = "";

    Blockly.Arduino.definitions_['define_sonarsensor'] = "int SonarSensor(int trigPin,int echoPin)\n" +
        "{\n" +
        "  long duration;\n" +
        "  int distance;\n" +
        "  digitalWrite(trigPin, LOW);\n" +
        "  delayMicroseconds(2);\n" +
        "  digitalWrite(trigPin, HIGH);\n" +
        "  delayMicroseconds(10);\n" +
        "  digitalWrite(trigPin, LOW);\n" +
        "  duration = pulseIn(echoPin, HIGH);\n" +
        "  distance = (duration/2) / 29.1;\n" +
        "  return distance;\n" +
        "}\n\n";
    code = "SonarSensor(" + trigger_pin + ", " + echo_pin + ")";
    return [code, Blockly.Arduino.ORDER_ASSIGNMENT];
};

//Ultrasonic

Blockly.Arduino.ultrasonic_read_distance_robotwala = function () {
    var trigger_pin = 2;
    var echo_pin = 3;

    Blockly.Arduino.setups_["setup_ultrasonic"] = "pinMode(" + trigger_pin + ", OUTPUT);\n" +
        "pinMode(" + echo_pin + ", INPUT);\n";
    // Blockly.Arduino.definitions_['var_ultrasonic'] = 'int distance;\n long duration;';

    var code = "";

    Blockly.Arduino.definitions_['define_sonarsensor'] = "int SonarSensor(int trigPin,int echoPin)\n" +
        "{\n" +
        "  long duration;\n" +
        "  int distance;\n" +
        "  digitalWrite(trigPin, LOW);\n" +
        "  delayMicroseconds(2);\n" +
        "  digitalWrite(trigPin, HIGH);\n" +
        "  delayMicroseconds(10);\n" +
        "  digitalWrite(trigPin, LOW);\n" +
        "  duration = pulseIn(echoPin, HIGH);\n" +
        "  distance = (duration/2) / 29.1;\n" +
        "  return distance;\n" +
        "}\n\n";
    code = "SonarSensor(" + trigger_pin + ", " + echo_pin + ")";
    return [code, Blockly.Arduino.ORDER_ASSIGNMENT];
};


Blockly.Arduino.servo_move_robotwala = function () {
    var dropdown_pin = this.getFieldValue('PIN');
    var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
    var Steps = Blockly.Arduino.valueToCode(this, 'Steps', Blockly.Arduino.ORDER_ATOMIC);
    var delay = Blockly.Arduino.valueToCode(this, 'delay', Blockly.Arduino.ORDER_ATOMIC);

    Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
    Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
    Blockly.Arduino.definitions_['var_servo_pos' + dropdown_pin] = 'int pos_servo_' + dropdown_pin + ';\n';
    Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

    var code = 'servo_' + dropdown_pin + '.write(' + value_degree + ');\n';
    code = 'pos_servo_' + dropdown_pin + '=servo_' + dropdown_pin + '.read()'
    code += 'for(pos_servo_' + dropdown_pin + '=servo_' + dropdown_pin + '.read()'

    return code;
};


Blockly.Arduino.motor_turn_robotwala = function () {
    var dropdown_direction = this.getFieldValue('DIRECTION');
    var angle = this.getFieldValue('ANGEL');
    var speed = 150;//Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '127';
    Blockly.Arduino.setups_["setup_motor"] =
        "  pinMode(6,OUTPUT);//I2\n" +
        "  pinMode(7,OUTPUT);//speedPinA\n" +
        "  pinMode(5,OUTPUT);//I3\n" +
        "  pinMode(8,OUTPUT);//i4\n" +
        "  pinMode(9,OUTPUT);//i4\n" +
        "  pinMode(10,OUTPUT);//speedPinB\n";


    var code = "";

    if (dropdown_direction === "right") {
        Blockly.Arduino.definitions_['define_right'] = "void right()\n" +
            "{\n" +
            "  analogWrite(5," + speed + ");//input a simulation value to set the speed\n" +
            "  analogWrite(10," + speed + ");\n" +
            "  digitalWrite(6,HIGH);//turn DC Motor B move anticlockwise\n" +
            "  digitalWrite(7,LOW);\n" +
            "  digitalWrite(8,LOW);//turn DC Motor A move anticlockwise\n" +
            "  digitalWrite(9,LOW);\n" +
            "}\n\n";
        code = "right();\n";

    } else if (dropdown_direction === "left") {
        Blockly.Arduino.definitions_['define_left'] = "void left()\n" +
            "{\n" +
            "  analogWrite(5," + speed + ");//input a simulation value to set the speed\n" +
            "  analogWrite(10," + speed + ");\n" +
            "  digitalWrite(6,LOW);//turn DC Motor B move clockwise\n" +
            "  digitalWrite(7,LOW);\n" +
            "  digitalWrite(8,HIGH);//turn DC Motor A move clockwise\n" +
            "  digitalWrite(9,LOW);\n" +
            "}\n\n";
        code = "left();\n";
    }
    Blockly.Arduino.definitions_['define_stop'] = "void stop()\n" +
        "{\n" +
        "analogWrite(5,LOW);// Unenble the pin, to stop the motor. this should be done to avid damaging the motor.\n" +
        "analogWrite(10,LOW);\n" +
        "delay(1000);\n" +
        "}\n\n";


    //delay


    code +="delay(map("+angle+", 0, 360, 0, 1100));\n";
    code += "stop();\n";
    return code;
};




Blockly.Arduino.grove_motor_robotwala = function () {
    var dropdown_direction = this.getFieldValue('DIRECTION');
    var speeda = window.parseFloat(this.getFieldValue('SPEEDA'));
    var speedb = window.parseFloat(this.getFieldValue('SPEEDB'));
    Blockly.Arduino.setups_["setup_motor"] =
        "  pinMode(6,OUTPUT);//I2\n" +
        "  pinMode(7,OUTPUT);//speedPinA\n" +
        "  pinMode(5,OUTPUT);//I3\n" +
        "  pinMode(8,OUTPUT);//i4\n" +
        "  pinMode(9,OUTPUT);//i4\n" +
        "  pinMode(10,OUTPUT);//speedPinB\n";
    var code = "";
    if (dropdown_direction === "forward") {
        Blockly.Arduino.definitions_['define_forward'] = "void forward()\n" +
            "{\n" +
            "  analogWrite(5," + speeda + ");//input a simulation value to set the speed\n" +
            "  analogWrite(10," + speedb + ");\n" +
            "  digitalWrite(6,HIGH);//turn DC Motor B move clockwise\n" +
            "  digitalWrite(7,LOW);\n" +
            "  digitalWrite(8,HIGH);//turn DC Motor A move anticlockwise\n" +
            "  digitalWrite(9,LOW);\n" +
            "}\n";
        code = "forward();\n";
    } else if (dropdown_direction === "right") {
        Blockly.Arduino.definitions_['define_right'] = "void right()\n" +
            "{\n" +
            "  analogWrite(5," + speeda + ");//input a simulation value to set the speed\n" +
            "  analogWrite(10," + speedb + ");\n" +
            "  digitalWrite(6,HIGH);//turn DC Motor B move anticlockwise\n" +
            "  digitalWrite(7,LOW);\n" +
            "  digitalWrite(8,LOW);//turn DC Motor A move anticlockwise\n" +
            "  digitalWrite(9,LOW);\n" +
            "}\n\n";
        code = "right();\n";
    } else if (dropdown_direction === "left") {
        Blockly.Arduino.definitions_['define_left'] = "void left()\n" +
            "{\n" +
            "  analogWrite(5," + speeda + ");//input a simulation value to set the speed\n" +
            "  analogWrite(10," + speedb + ");\n" +
            "  digitalWrite(6,LOW);//turn DC Motor B move clockwise\n" +
            "  digitalWrite(7,LOW);\n" +
            "  digitalWrite(8,HIGH);//turn DC Motor A move clockwise\n" +
            "  digitalWrite(9,LOW);\n" +
            "}\n\n";
        code = "left();\n";
    } else if (dropdown_direction === "backward") {
        Blockly.Arduino.definitions_['define_backward'] = "void backward()\n" +
            "{\n" +
            "  analogWrite(5," + speeda + ");//input a simulation value to set the speed\n" +
            "  analogWrite(10," + speedb + ");\n" +
            "  digitalWrite(6,LOW);//turn DC Motor B move anticlockwise\n" +
            "  digitalWrite(7,HIGH);\n" +
            "  digitalWrite(8,LOW);//turn DC Motor A move clockwise\n" +
            "  digitalWrite(9,HIGH);\n" +
            "}\n\n";
        code = "backward();\n";
    } else if (dropdown_direction === "stop") {
        Blockly.Arduino.definitions_['define_stop'] = "void stop()\n" +
            "{\n" +
            "analogWrite(5,LOW);// Unenble the pin, to stop the motor. this should be done to avid damaging the motor.\n" +
            "analogWrite(10,LOW);\n" +
            "delay(1000);\n" +
            "}\n\n";
        code = "stop();\n";
    }
    return code;
};

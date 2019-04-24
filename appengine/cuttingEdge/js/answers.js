/**
 * Blockly Games: Messy Answers
 *
 * Copyright 2014 Google Inc.
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
 * @fileoverview Sample answers for Turtle levels. Used for prompts and marking.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Messy.Answers');


/**
 * Sample solutions for each level.
 * To create an answer, just solve the level in Blockly, then paste the
 * resulting JavaScript here, moving any functions to the beginning of
 * this function.
 * @param {number} f Frame number (0-100).
 */
Messy.answer = function (f) {
    function time() {
        return f;
    }

    switch (BlocklyGames.LEVEL) {
        case 1:
            // Static person.
            Messy.penColour('#ff0000');
            Messy.circle(50, 70, 10);
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 70, 5);
            Messy.line(60, 50, 80, 70, 5);
            break;
        case 2:
            // Right hand moving up.
            Messy.penColour('#ff0000');
            Messy.circle(50, 70, 10);
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 70, 5);
            Messy.line(60, 50, 80, time(), 5);
            break;
        case 3:
            // Left hand moving down.
            Messy.penColour('#ff0000');
            Messy.circle(50, 70, 10);
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 100 - time(), 5);
            Messy.line(60, 50, 80, time(), 5);
            break;
        case 4:
            // Legs cross.
            Messy.penColour('#ff0000');
            Messy.circle(50, 70, 10);
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 100 - time(), 5);
            Messy.line(60, 50, 80, time(), 5);
            Messy.line(40, 20, time(), 0, 5);
            Messy.line(60, 20, 100 - time(), 0, 5);
            break;
        case 5:
            // Right arm parabola.
            Messy.penColour('#ff0000');
            Messy.circle(50, 70, 10);
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 100 - time(), 5);
            Messy.line(60, 50, 80, Math.pow((time() - 50) / 5, 2), 5);
            Messy.line(40, 20, time(), 0, 5);
            Messy.line(60, 20, 100 - time(), 0, 5);
            break;
        case 6:
            // Hands.
            Messy.penColour('#ff0000');
            Messy.circle(50, 70, 10);
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 100 - time(), 5);
            Messy.line(60, 50, 80, Math.pow((time() - 50) / 5, 2), 5);
            Messy.line(40, 20, time(), 0, 5);
            Messy.line(60, 20, 100 - time(), 0, 5);
            Messy.penColour('#ff0000');
            Messy.circle(20, 100 - time(), 5);
            Messy.circle(80, Math.pow((time() - 50) / 5, 2), 5);
            break;
        case 7:
            // Head.
            Messy.penColour('#ff0000');
            if (time() < 50) {
                Messy.circle(50, 70, 10);
            } else {
                Messy.circle(50, 80, 20);
            }
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 100 - time(), 5);
            Messy.line(60, 50, 80, Math.pow((time() - 50) / 5, 2), 5);
            Messy.line(40, 20, time(), 0, 5);
            Messy.line(60, 20, 100 - time(), 0, 5);
            Messy.penColour('#ff0000');
            Messy.circle(20, 100 - time(), 5);
            Messy.circle(80, Math.pow((time() - 50) / 5, 2), 5);
            break;
        case 8:
            // Legs reverse.
            Messy.penColour('#ff0000');
            if (time() < 50) {
                Messy.circle(50, 70, 10);
            } else {
                Messy.circle(50, 80, 20);
            }
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 100 - time(), 5);
            Messy.line(60, 50, 80, Math.pow((time() - 50) / 5, 2), 5);
            if (time() < 50) {
                Messy.line(40, 20, time(), 0, 5);
                Messy.line(60, 20, 100 - time(), 0, 5);
            } else {
                Messy.line(40, 20, 100 - time(), 0, 5);
                Messy.line(60, 20, time(), 0, 5);
            }
            Messy.penColour('#ff0000');
            Messy.circle(20, 100 - time(), 5);
            Messy.circle(80, Math.pow((time() - 50) / 5, 2), 5);
            break;
        case 9:
            // Background.
            Messy.penColour('#00ff00');
            Messy.circle(50, time() / 2, time() / 2);
            Messy.penColour('#ff0000');
            if (time() < 50) {
                Messy.circle(50, 70, 10);
            } else {
                Messy.circle(50, 80, 20);
            }
            Messy.penColour('#3333ff');
            Messy.rect(50, 40, 20, 40);
            Messy.penColour('#000000');
            Messy.line(40, 50, 20, 100 - time(), 5);
            Messy.line(60, 50, 80, Math.pow((time() - 50) / 5, 2), 5);
            if (time() < 50) {
                Messy.line(40, 20, time(), 0, 5);
                Messy.line(60, 20, 100 - time(), 0, 5);
            } else {
                Messy.line(40, 20, 100 - time(), 0, 5);
                Messy.line(60, 20, time(), 0, 5);
            }
            Messy.penColour('#ff0000');
            Messy.circle(20, 100 - time(), 5);
            Messy.circle(80, Math.pow((time() - 50) / 5, 2), 5);
            break;
    }
};

/**
 * Validate whether the user's answer is correct.
 * @return {boolean} True if the level is solved, false otherwise.
 */
Messy.isCorrect = function () {
    if (BlocklyGames.LEVEL == BlocklyGames.MAX_LEVEL) {
        // Any non-null answer is correct.
        return BlocklyGames.workspace.getAllBlocks().length > 1;
    }
    // Check the already recorded pixel errors on every frame.
    for (var f = 0; f <= Messy.FRAMES; f++) {
        if (f == 50) {
            // Don't check the middle frame.  Makes pesky off-by-one errors go away.
            // E.g. if (time < 50) vs if (time <= 50)
            continue;
        } else if (Messy.pixelErrors[f] === undefined) {
            // Not rendered yet.
            return false;
        } else if (Messy.pixelErrors[f] > 100) {
            // Too many errors.
            console.log('Pixel errors (frame ' + f + '): ' + Messy.pixelErrors[f]);
            return false;
        }
    }
    if (BlocklyGames.LEVEL == 9) {
        // Ensure that the background is behind the figure, not in front.
        var blocks = BlocklyGames.workspace.getAllBlocks(true);
        for (var i = 0, block; (block = blocks[i]); i++) {
            if (block.type == 'messy_circle') {
                // Check that the radius on the first circle block is connected to a
                // division block.
                if (block.getInputTargetBlock('RADIUS').type != 'math_arithmetic') {
                    var content = document.getElementById('helpLayer');
                    var style = {
                        'width': '30%',
                        'left': '35%',
                        'top': '12em'
                    };
                    BlocklyDialogs.showDialog(content, null, false, true, style,
                        BlocklyDialogs.stopDialogKeyDown);
                    BlocklyDialogs.startDialogKeyDown();
                    return false;
                }
                break;
            }
        }
    }
    return true;
};

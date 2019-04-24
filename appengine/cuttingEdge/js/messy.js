/**
 * Blockly Games: Messy
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
 * @fileoverview JavaScript for Blockly's Messy application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Messy');

goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Messy.Answers');
goog.require('Messy.Blocks');
goog.require('Messy.soy');
goog.require('Constants');
goog.require('MessyActivityGame');


BlocklyGames.NAME = 'messy';

Messy.HEIGHT = 50;
Messy.WIDTH = 50;

/**
 * Number of frames in the animation.
 * First level has only one frame (#0).  The rest have 101 (#0-#100).
 * @type number
 */
Messy.FRAMES = BlocklyGames.LEVEL == 1 ? 0 : 100;

/**
 * Array of pixel errors, one per frame.
 */
Messy.pixelErrors = new Array(Messy.FRAMES);

/**
 * Has the level been solved once?
 */
Messy.success = false;

/**
 * Current frame being shown.
 */
Messy.frameNumber = 0;

Messy.command = null;
/**
 * Initialize Blockly and the messy.  Called on page load.
 */


Messy.keys = [];
Messy.commands = [];


Messy.registerKey = function (key, command) {
    if (!Messy.keys.includes(key)) {
        Messy.keys.push(key);
        Messy.commands.push(command);
    } else {
        console.log('Key already added');
    }
};
Messy.unRegisterKey = function (key) {
    Messy.keys = [];
    Messy.commands = [];
};

Messy.WorkspaceChange = function () {
    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    console.log(code);
    code = code.split("\n");
    console.log(code);
    Messy.unRegisterKey();
    for (var i = 0; i < code.length; i++) {
        var cmds = code[i].split('-');
        console.log('cmds ==> ' + cmds);
        if (cmds[0] === 'event') {
            Messy.registerKey(cmds[1], cmds[2]);

        }
        else if (cmds[0] === 'opts') {
            if (cmds[1] === 'setScore') {
                MessyActivityGame.game.updateScorePerItem(cmds[2]);
            }

        }
    }
};
Messy.AddEventListenerForKeys = function () {
    var pressedKey = [];
    document.body.onkeydown = function (e) {
        if (Messy.keys.includes(e.code)) {
            //your code
            pressedKey.push(e.code);
            var index = Messy.keys.indexOf(e.code);
            this.command = Messy.commands[index];
            console.log(e.code + ' Key pressed');
            if (this.command === 'left') {
                MessyActivityGame.game.moveLeft();
            }
            else if (this.command === 'right') {
                MessyActivityGame.game.moveRight();
            }
            else if (this.command === 'up') {
                MessyActivityGame.game.moveUp();
            }
            else if (this.command === 'down') {
                MessyActivityGame.game.moveDown();
            }
            else if (this.command === 'pickup') {
                MessyActivityGame.game.collect();
            }
        }
    };
    document.body.onkeyup = function (e) {
        if (pressedKey.includes(e.code)) {
            MessyActivityGame.game.stop();
            let index = pressedKey.indexOf(e.code)
            if (index > -1) {
                pressedKey.slice(index, 1);
            }
        }
    };
};
Messy.init = function () {
    // Render the Soy template.
    document.body.innerHTML = Messy.soy.start({}, null,
        {
            lang: BlocklyGames.LANG,
            level: BlocklyGames.LEVEL,
            scheme: Constants.ColorScheme,
            maxLevel: 3,
            html: BlocklyGames.IS_HTML
        });

    BlocklyInterface.init();
    MessyActivityGame.gameInit();

    //Event to detect if there is any keypresed
    Messy.AddEventListenerForKeys()


    var rtl = BlocklyGames.isRtl();
    var blocklyDiv = document.getElementById('blockly');
    var visualization = document.getElementById('visualization');
    var onresize = function (e) {
        var top = visualization.offsetTop;
        blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
        blocklyDiv.style.left = rtl ? '420px' : '10px';
        blocklyDiv.style.width = (window.innerWidth / 2.5) + 'px';
    };
    window.addEventListener('scroll', function () {
        onresize(null);
        Blockly.svgResize(BlocklyGames.workspace);
    });
    window.addEventListener('resize', onresize);
    onresize(null);

    if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
        Blockly.FieldColour.COLUMNS = 3;
        Blockly.FieldColour.COLOURS =
            ['#ff0000', '#ffcc33', '#ffff00',
                '#009900', '#3333ff', '#cc33cc',
                '#ffffff', '#999999', '#000000'];
    }

    var toolbox = document.getElementById('toolbox');
    BlocklyGames.workspace = Blockly.inject('blockly',
        {
            'media': 'third-party/blockly/media/',
            'rtl': rtl,
            'toolbox': toolbox,
            'trashcan': true,
            'zoom': BlocklyGames.LEVEL == BlocklyGames.MAX_LEVEL ?
                {'controls': true, 'wheel': true} : null
        });
    // Prevent collisions with user-defined functions or variables.
    Blockly.JavaScript.addReservedWords('circle,rect,line,penColour,time');

    if (document.getElementById('submitButton')) {
        BlocklyGames.bindClick('submitButton', Messy.submitToGallery);
    }

    var defaultXml = '<xml></xml>';
    BlocklyInterface.loadBlocks(defaultXml, true);

    // Messy.ctxDisplay = document.getElementById('displayy').getContext('2d');
    // Messy.ctxDisplay.globalCompositeOperation = 'source-over';
    // Messy.ctxScratch = document.getElementById('scratch').getContext('2d');
    // Messy.renderHatching_();
    // Render the frame zero answer because we need it right now.
    // Messy.renderAnswer_(0);
    // Remaining answers may be computed later without slowing down page load.
    // function renderRemainingAnswers() {
    //   debugger;
    //   for (var f = 1; f <= Messy.FRAMES; f++) {
    //     Messy.renderAnswer_(f);f
    //   }
    // }
    // setTimeout(renderRemainingAnswers, 1);
    // Messy.renderAxies_();
    // Messy.display();
    BlocklyGames.workspace.addChangeListener(Messy.WorkspaceChange);


    // Preload the win sound.
    BlocklyGames.workspace.getAudioManager().load(
        ['messy/win.mp3', 'messy/win.ogg'], 'win');
    // Lazy-load the syntax-highlighting.
    setTimeout(BlocklyInterface.importPrettify, 1);

    BlocklyGames.bindClick('helpButton', Messy.showHelp);
    if (location.hash.length < 2 &&
        !BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
            BlocklyGames.LEVEL)) {
        setTimeout(Messy.showHelp, 1000);
    }

    visualization.addEventListener('mouseover', Messy.showCoordinates);
    visualization.addEventListener('mouseout', Messy.hideCoordinates);
    visualization.addEventListener('mousemove', Messy.updateCoordinates);
};

/**
 * Show the x/y coordinates.
 * @param {!Event} e Mouse over event.
 */
Messy.showCoordinates = function (e) {
    document.getElementById('coordinates').style.display = 'block';
};

/**
 * Hide the x/y coordinates.
 * @param {Event} e Mouse out event.
 */
Messy.hideCoordinates = function (e) {
    document.getElementById('coordinates').style.display = 'none';
};

/**
 * Update the x/y coordinates.
 * @param {!Event} e Mouse move event.
 */
Messy.updateCoordinates = function (e) {
    // Get the coordinates of the mouse.
    var rtl = BlocklyGames.isRtl();
    var x = e.clientX;
    var y = e.clientY;
    if (rtl) {
        x -= window.innerWidth;
    }
    // Compensate for the location of the visualization.
    var offset = goog.style.getBounds(document.getElementById('visualization'));
    x += rtl ? offset.left : -offset.left;
    y -= offset.top;
    // The visualization is 400x400, but the coordinates are 100x100.
    x /= 4;
    y /= 4;
    // Flip the y axis so the origin is at the bottom.
    y = 100 - y;
    if (rtl) {
        x += 100;
    }
    if (BlocklyGames.LEVEL == 10) {
        // Round to the nearest integer.
        x = Math.round(x);
        y = Math.round(y);
    } else {
        // Round to the nearest 10.
        x = Math.round(x / 10) * 10;
        y = Math.round(y / 10) * 10;
    }
    if (x >= 0 && x <= 100 && y >= 0 && y <= 100) {
        document.getElementById('x').innerHTML = 'x = ' + x;
        document.getElementById('y').innerHTML = 'y = ' + y;
    } else {
        Messy.hideCoordinates();
    }
};

/**
 * Show the help pop-up.
 */
Messy.showHelp = function () {
    var help = document.getElementById('help');
    var button = document.getElementById('helpButton');
    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };

    if (BlocklyGames.LEVEL == 2) {
        var xml = '<xml><block type="messy_time" x="15" y="10"></block></xml>';
        BlocklyInterface.injectReadonly('sampleHelp2', xml);
    }

    BlocklyDialogs.showDialog(help, button, true, true, style, Messy.hideHelp);
    BlocklyDialogs.startDialogKeyDown();
};

/**
 * Hide the help pop-up.
 */
Messy.hideHelp = function () {
    BlocklyDialogs.stopDialogKeyDown();
};

/**
 * On startup draw the expected answers and save it to answer canvases.
 * @param {number} f Frame number (0-100).
 * @private
 */
Messy.renderAnswer_ = function (f) {
    var div = document.getElementById('visualization');
    Messy.ctxScratch.strokeStyle = '#000';
    Messy.ctxScratch.fillStyle = '#000';
    // Create a new canvas object for each answer.
    // <canvas id="answer1" width="400" height="400" style="display: none">
    // </canvas>
    var canvas = document.createElement('canvas');
    canvas.id = 'answer' + f;
    canvas.width = Messy.WIDTH;
    canvas.height = Messy.HEIGHT;
    canvas.style.display = 'none';
    div.appendChild(canvas);

    // Clear the scratch canvas.
    Messy.ctxScratch.canvas.width = Messy.ctxScratch.canvas.width;
    // Render the answer.
    Messy.answer(f);
    // Copy the scratch canvas to the answer canvas.
    var ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(Messy.ctxScratch.canvas, 0, 0);
};

/**
 * On startup draw hatching that will be displayed across the answers.
 * @private
 */
Messy.renderHatching_ = function () {
    var ctx = document.getElementById('hatching').getContext('2d');
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (var i = -Messy.HEIGHT; i < Messy.HEIGHT; i += 4) {
        ctx.beginPath();
        ctx.moveTo(i, -i);
        ctx.lineTo(i + Messy.HEIGHT, -i + Messy.WIDTH);
        ctx.stroke();
    }
};

/**
 * On startup draw the axis scales and save it to the axies canvas.
 * @private
 */
Messy.renderAxies_ = function () {
    var ctx = document.getElementById('axies').getContext('2d');
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#bba';
    ctx.fillStyle = '#bba';
    ctx.font = 'normal 14px sans-serif';
    var TICK_LENGTH = 9;
    var major = 1;
    for (var i = 0.1; i < 0.9; i += 0.1) {
        // Bottom edge.
        ctx.beginPath();
        ctx.moveTo(i * Messy.WIDTH, Messy.HEIGHT);
        ctx.lineTo(i * Messy.WIDTH, Messy.HEIGHT - TICK_LENGTH * major);
        ctx.stroke();
        // Left edge.
        ctx.beginPath();
        ctx.moveTo(0, i * Messy.HEIGHT);
        ctx.lineTo(TICK_LENGTH * major, i * Messy.HEIGHT);
        ctx.stroke();
        if (major == 2) {
            ctx.fillText(Math.round(i * 100), i * Messy.WIDTH + 2, Messy.HEIGHT - 4);
            ctx.fillText(Math.round(100 - i * 100), 3, i * Messy.HEIGHT - 2);
        }
        major = major == 1 ? 2 : 1;
    }
};

/**
 * Draw one frame of the messy.
 * @param {!Interpreter} interpreter A JS Interpreter loaded with user code.
 * @private
 */
Messy.drawFrame_ = function (interpreter) {
    // Clear the canvas.
    Messy.ctxScratch.canvas.width = Messy.ctxScratch.canvas.width;
    Messy.ctxScratch.strokeStyle = '#000';
    Messy.ctxScratch.fillStyle = '#000';
    // Levels 1-9 should be slightly transparent so eclipsed blocks may be seen.
    // Level 10 should be opaque so that the messy is clean.
    Messy.ctxScratch.globalAlpha =
        (BlocklyGames.LEVEL == BlocklyGames.MAX_LEVEL) ? 1 : 0.9;

    var go = true;
    for (var tick = 0; go && tick < 10000; tick++) {
        try {
            go = interpreter.step();
        } catch (e) {
            // User error, terminate in shame.
            alert(e);
            go = false;
        }
    }
};

/**
 * Copy the scratch canvas to the display canvas.
 * @param {number=} opt_frameNumber Which frame to draw (0-100).
 *     If not defined, draws the current frame.
 */
Messy.display = function (opt_frameNumber) {
    if (typeof opt_frameNumber == 'number') {
        Messy.frameNumber = opt_frameNumber;
    }
    var frameNumber = Messy.frameNumber;

    // Clear the display with white.
    Messy.ctxDisplay.beginPath();
    Messy.ctxDisplay.rect(0, 0,
        Messy.ctxDisplay.canvas.width, Messy.ctxDisplay.canvas.height);
    Messy.ctxDisplay.fillStyle = '#ffffff';
    Messy.ctxDisplay.fill();

    // Copy the answer.
    var answer = document.getElementById('answer' + frameNumber);
    if (answer) {
        Messy.ctxDisplay.globalAlpha = 0.2;
        Messy.ctxDisplay.drawImage(answer, 0, 0);
        Messy.ctxDisplay.globalAlpha = 1;
    }

    // Copy the hatching.
    var hatching = document.getElementById('hatching');
    Messy.ctxDisplay.drawImage(hatching, 0, 0);

    // Draw and copy the user layer.
    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    try {
        var interpreter = new Interpreter(code, Messy.initInterpreter);
    } catch (e) {
        // Trap syntax errors: break outside a loop, or return outside a function.
        console.error(e);
    }
    if (interpreter) {
        Messy.drawFrame_(interpreter);
    } else {
        // In the event of a syntax error, clear the canvas.
        Messy.ctxScratch.canvas.width = Messy.ctxScratch.canvas.width;
    }
    Messy.ctxDisplay.drawImage(Messy.ctxScratch.canvas, 0, 0);

    // Copy the axies.
    Messy.ctxDisplay.drawImage(document.getElementById('axies'), 0, 0);
    Messy.checkFrameAnswer();
    if (BlocklyGames.LEVEL == 1) {
        setTimeout(Messy.checkAnswers, 1000);
    }
};

/**
 * Inject the Messy API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
Messy.initInterpreter = function (interpreter, scope) {
    // API
    var wrapper;
    wrapper = function (x, y, radius) {
        Messy.circle(x, y, radius);
    };
    interpreter.setProperty(scope, 'circle',
        interpreter.createNativeFunction(wrapper));

    wrapper = function (x, y, w, h) {
        Messy.rect(x, y, w, h);
    };
    interpreter.setProperty(scope, 'rect',
        interpreter.createNativeFunction(wrapper));

    wrapper = function (x1, y1, x2, y2, w) {
        Messy.line(x1, y1, x2, y2, w);
    };
    interpreter.setProperty(scope, 'line',
        interpreter.createNativeFunction(wrapper));

    wrapper = function (colour) {
        Messy.penColour(colour);
    };
    interpreter.setProperty(scope, 'penColour',
        interpreter.createNativeFunction(wrapper));

    wrapper = function () {
        return Messy.frameNumber;
    };
    interpreter.setProperty(scope, 'time',
        interpreter.createNativeFunction(wrapper));
};

/**
 * Convert from ideal 0-100 coordinates to canvas's 0-400 coordinates.
 */
Messy.SCALE = 400 / 100;

/**
 * Draw a circle.
 * @param {number} x Horizontal location of centre (0-100).
 * @param {number} y Vertical location of centre (0-100).
 * @param {number} radius Radius of circle.
 */
Messy.circle = function (x, y, radius) {
    y = 100 - y;
    x *= Messy.SCALE;
    y *= Messy.SCALE;
    radius = Math.max(radius * Messy.SCALE, 0);
    Messy.ctxScratch.beginPath();
    Messy.ctxScratch.arc(x, y, radius, 0, 2 * Math.PI, false);
    Messy.ctxScratch.fill();
};

/**
 * Draw a rectangle.
 * @param {number} x Horizontal location of centre (0-100).
 * @param {number} y Vertical location of centre (0-100).
 * @param {number} width Width of rectangle.
 * @param {number} height Height of rectangle.
 */
Messy.rect = function (x, y, width, height) {
    y = 100 - y;
    x *= Messy.SCALE;
    y *= Messy.SCALE;
    width = Math.max(width * Messy.SCALE, 0);
    height = Math.max(height * Messy.SCALE, 0);
    Messy.ctxScratch.beginPath();
    Messy.ctxScratch.rect(x - width / 2, y - height / 2, width, height);
    Messy.ctxScratch.fill();
};

/**
 * Draw a rectangle.
 * @param {number} x1 Horizontal location of start (0-100).
 * @param {number} y1 Vertical location of start (0-100).
 * @param {number} x2 Horizontal location of end (0-100).
 * @param {number} y2 Vertical location of end (0-100).
 * @param {number} width Width of line.
 */
Messy.line = function (x1, y1, x2, y2, width) {
    y1 = 100 - y1;
    y2 = 100 - y2;
    x1 *= Messy.SCALE;
    y1 *= Messy.SCALE;
    x2 *= Messy.SCALE;
    y2 *= Messy.SCALE;
    width *= Messy.SCALE;
    Messy.ctxScratch.beginPath();
    Messy.ctxScratch.moveTo(x1, y1);
    Messy.ctxScratch.lineTo(x2, y2);
    Messy.ctxScratch.lineWidth = Math.max(width, 0);
    Messy.ctxScratch.stroke();
};

/**
 * Change the colour of the pen.
 * @param {string} colour Hexadecimal #rrggbb colour string.
 */
Messy.penColour = function (colour) {
    Messy.ctxScratch.strokeStyle = colour;
    Messy.ctxScratch.fillStyle = colour;
};

/**
 * Verify if the answer to this frame is correct.
 */
Messy.checkFrameAnswer = function () {
    // Compare the Alpha (opacity) byte of each pixel in the user's image and
    // the sample answer image.
    var answer = document.getElementById('answer' + Messy.frameNumber);
    if (!answer) {
        return;
    }
    var ctxAnswer = answer.getContext('2d');
    var answerImage = ctxAnswer.getImageData(0, 0, Messy.WIDTH, Messy.HEIGHT);
    var userImage =
        Messy.ctxScratch.getImageData(0, 0, Messy.WIDTH, Messy.HEIGHT);
    var len = Math.min(userImage.data.length, answerImage.data.length);
    var delta = 0;
    // Pixels are in RGBA format.  Only check the Alpha bytes.
    for (var i = 3; i < len; i += 4) {
        // Check the Alpha byte.
        if (Math.abs(userImage.data[i] - answerImage.data[i]) > 96) {
            delta++;
        }
    }
    Messy.pixelErrors[Messy.frameNumber] = delta;
};

/**
 * Verify if all the answers are correct.
 * If so, move on to next level.
 */
Messy.checkAnswers = function () {
    if (BlocklyGames.LEVEL > 1 && Messy.frameNumber != Messy.FRAMES) {
        // Only check answers at the end of the run.
        return;
    }
    if (Messy.isCorrect() && !Messy.success) {
        Messy.success = true;
        BlocklyInterface.saveToLocalStorage();
        window.top.FinishedTheTask();
        if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
            // No congrats for last level, it is open ended.
            BlocklyGames.workspace.getAudioManager().play('win', 0.5);
            BlocklyDialogs.congratulations();
        }
    }
};

/**
 * Send an image of the canvas to gallery.
 */
Messy.submitToGallery = function () {
    var blockCount = BlocklyGames.workspace.getAllBlocks().length;
    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    if (blockCount < 4 || code.indexOf('time()') == -1) {
        alert(BlocklyGames.getMsg('Messy_submitDisabled'));
        return;
    }
    // Draw and copy the user layer.
    var interpreter = new Interpreter(code, Messy.initInterpreter);
    var frameNumber = Messy.frameNumber;
    try {
        Messy.frameNumber = Math.round(Messy.FRAMES / 2);
        Messy.drawFrame_(interpreter);
    } finally {
        Messy.frameNumber = frameNumber;
    }
    // Encode the thumbnail.
    var thumbnail = document.getElementById('thumbnail');
    var ctxThumb = thumbnail.getContext('2d');
    ctxThumb.globalCompositeOperation = 'copy';
    ctxThumb.drawImage(Messy.ctxScratch.canvas, 0, 0, 200, 200);
    var thumbData = thumbnail.toDataURL('image/png');
    document.getElementById('galleryThumb').value = thumbData;

    // Show the dialog.
    BlocklyDialogs.showGalleryForm();
};

window.addEventListener('load', Messy.init);

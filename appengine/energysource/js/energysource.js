/**
 * Blockly Games: Puzzle
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
 * @fileoverview JavaScript for Blockly's Puzzle application.
 * @author fraser@google.com (Neil Fraser)
 * @secondAuthor arslan.inbox@outlook.com (Arslan Arshad)
 */
'use strict';
goog.provide('Energysource');
goog.require('Energysource.soy');
goog.require('Energysource.Blocks');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('goog.math');


BlocklyGames.NAME = 'puzzle';

/**
 * Initialize Blockly and the Energysource.  Called on page load.
 */
Energysource.init = function () {

    // Render the Soy template.
    document.body.innerHTML = Energysource.soy.start({}, null,
        {
            level: BlocklyGames.LEVEL,
            lang: BlocklyGames.LANG,
            maxLevel: 3,
            skin: 0,
            html: BlocklyGames.IS_HTML
        });

    BlocklyInterface.init();
    var rtl = BlocklyGames.isRtl();
    var blocklyDiv = document.getElementById('blockly');
    let images = document.getElementById('images');
    // images.innerHTML = "<img style='float:left;' width=100 height=100 src='gallery/bulb.png'><img style='float:left;' width=100 height=100 src='gallery/bulb.png'><img style='float:left;' width=100 height=100 src='gallery/bulb.png'><img style='float:left;' width=100 height=100 src='gallery/bulb.png'>"
    if (BlocklyGames.LEVEL==2){
        images.innerHTML = "<img style='float:left;' width=100 height=100 src='gallery/batterygreen.png'>";
    }
    else{

        images.innerHTML = "<img style='float:left;' width=100 height=100 src='gallery/battery.png'>";
    }
    var onresize = function (e) {
        blocklyDiv.style.width = (window.innerWidth - 20) + 'px';
        blocklyDiv.style.height =
            (window.innerHeight - blocklyDiv.offsetTop - 15) + 'px';
    };
    onresize(null);
    window.addEventListener('resize', onresize);

    BlocklyGames.workspace = Blockly.inject('blockly',
        {
            'media': 'third-party/blockly/media/',
            'rtl': rtl,
            'scrollbars': false,
            'trashcan': false
        });

    var savedBlocks =
        BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME, BlocklyGames.LEVEL);
    // Add the blocks.
    try {
        var loadOnce = window.sessionStorage.loadOnceBlocks;
    } catch (e) {
        // Firefox sometimes throws a SecurityError when accessing sessionStorage.
        // Restarting Firefox fixes this, so it looks like a bug.
        var loadOnce = null;
    }


    savedBlocks = null;
    if (loadOnce) {
        delete window.sessionStorage.loadOnceBlocks;
        var xml = Blockly.Xml.textToDom(loadOnce);
        Blockly.Xml.domToWorkspace(xml, BlocklyGames.workspace);
    } else if (savedBlocks) {
        var xml = Blockly.Xml.textToDom(savedBlocks);
        Blockly.Xml.domToWorkspace(xml, BlocklyGames.workspace);
    } else {
        // Create one of every block.
        var blocksComponents = [];
        var blocksPictures = [];
        // var blocksTraits = [];
        var i = 1;
        var block;
        while (BlocklyGames.getMsgOrNull('Puzzle_animal' + i)) {
            block = BlocklyGames.workspace.newBlock('animal');
            block.populate(i);
            blocksComponents.push(block);
            block = BlocklyGames.workspace.newBlock('picture');
            block.populate(i);
            blocksPictures.push(block);
            i++;
        }
        Energysource.shuffle(blocksComponents);
        Energysource.shuffle(blocksPictures);
        // Energysource.shuffle(blocksTraits);
        var blocks = [].concat(blocksComponents, blocksPictures);
        if (rtl) {
            blocks.reverse();
        }
        // Initialize all the blocks.
        for (var i = 0, block; (block = blocks[i]); i++) {
            block.setDeletable(false);
            block.initSvg();
            block.render();

        }
        var totalArea = 0;
        // Measure the surface area of each block.
        for (var i = 0, block; (block = blocks[i]); i++) {
            var blockBox = block.getSvgRoot().getBBox();
            block.cached_width_ = blockBox.width;
            block.cached_height_ = blockBox.height;
            block.cached_area_ = blockBox.width * blockBox.height;
            totalArea += block.cached_area_;
        }


        // Position the blocks randomly.
        var MARGIN = 50;
        Blockly.svgResize(BlocklyGames.workspace);
        var workspaceBox = Blockly.svgSize(BlocklyGames.workspace.getParentSvg());
        workspaceBox.width -= MARGIN;
        workspaceBox.height -= MARGIN;
    }

    function handleEvents(event) {
        if (event.type === Blockly.Events.BLOCK_MOVE &&
            event.newParentId !== event.oldParentId) {
            if (event.newParentId !== undefined && !Blockly.mainWorkspace.getBlockById(event.blockId).isCorrect()) {
                var messages = "This does not seem right, try another position for this resource";
                var textDiv = document.getElementById('answerMessage');
                textDiv.textContent = '';
                var line = document.createElement('div');
                line.appendChild(document.createTextNode(messages));
                textDiv.appendChild(line);
                var content = document.getElementById('answers');
                var button = document.getElementById('checkButton');
                var audio = new Audio('energysource/wrong.mp3');
                audio.play();
                var rtl = BlocklyGames.isRtl();
                var style = {
                    width: '25%',
                    left: rtl ? '5%' : '70%',
                    top: '5em'
                };
                var action = BlocklyInterface.stopDialogKeyDown;
                BlocklyDialogs.showDialog(content, button, true, true, style, action);
                BlocklyDialogs.startDialogKeyDown();
            }
            Energysource.checkAnswers()
        }
    }

    BlocklyGames.workspace.addChangeListener(handleEvents);
    BlocklyGames.workspace.clearUndo();

    BlocklyGames.bindClick('checkButton', Energysource.checkAnswers);
    BlocklyGames.bindClick('helpButton', function () {
        Energysource.showHelp(true);
    });

    if (!savedBlocks) {
        Energysource.showHelp(false);
    }

    // Make connecting blocks easier for beginners.
    Blockly.SNAP_RADIUS *= 2;
    // Preload the win sound.
    BlocklyGames.workspace.getAudioManager().load(
        ['energysource/win.mp3', 'energysource/win.ogg'], 'win');

    document.getElementsByClassName('blocklySvg')[0].style.backgroundImage = 'url("gallery/' + BlocklyGames.getMsgOrNull("Puzzle_background") + '")';
    document.getElementsByClassName('blocklySvg')[0].style.backgroundSize = '100% 981px';
};

/**
 * Shuffles the values in the specified array using the Fisher-Yates in-place
 * shuffle (also known as the Knuth Shuffle).
 * Runtime: O(n)
 * Based on Closure's goog.array.shuffle.
 * @param {!Array} arr The array to be shuffled.
 */
Energysource.shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        // Choose a random array index in [0, i] (inclusive with i).
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
};


/**
 * Count and highlight the errors.
 */
Energysource.checkAnswers = function () {
    var blocks = BlocklyGames.workspace.getAllBlocks();
    var errors = 0;
    var badBlocks = [];
    for (var b = 0, block; block = blocks[b]; b++) {
        if (!block.isCorrect() && block.type != 'animal') {
            errors++;
            block.select();
            badBlocks.push(block);
        }
    }

    var graphValue = document.getElementById('graphValue');

    let percentage = 100;
    for (var index = 0; block = badBlocks[index]; index++) {
        percentage = percentage - block.getWeightage();
    }

    setTimeout(function () {
        graphValue.style.width =
            percentage + 'px';
    }, 500);

    if (percentage === 100) {
        var messages = [BlocklyGames.getMsg('Puzzle_error2').replace('%1', percentage),
            BlocklyGames.getMsg('Puzzle_tryAgain')];
        var textDiv = document.getElementById('answerMessage');
        textDiv.textContent = '';
        for (var i = 0; i < messages.length; i++) {
            var line = document.createElement('div');
            line.appendChild(document.createTextNode(messages[i]));
            textDiv.appendChild(line);
        }
        var content = document.getElementById('answers');
        var button = document.getElementById('checkButton');
        var rtl = BlocklyGames.isRtl();
        var style = {
            width: '25%',
            left: rtl ? '5%' : '70%',
            top: '5em'
        };
        var action = errors ? BlocklyDialogs.stopDialogKeyDown :
            BlocklyInterface.stopDialogKeyDown;
        BlocklyDialogs.showDialog(content, button, true, true, style, action);
        BlocklyDialogs.startDialogKeyDown();
    }

    if (badBlocks.length) {
        // // Pick a random bad block and blink it until the dialog closes.
        // Energysource.shuffle(badBlocks);
        // var badBlock = badBlocks[0];
        // var blink = function () {
        //     badBlock.select();
        //     if (BlocklyDialogs.isDialogVisible_) {
        //         setTimeout(function () {
        //             badBlock.unselect();
        //         }, 150);
        //         setTimeout(blink, 300);
        //     }
        // };
        // blink();
    } else {
        setTimeout(Energysource.endDance, 2000);
        if (Blockly.selected) {
            Blockly.selected.unselect();
        }
    }

    // alert(percentage+"% have done correctly");

    let child = document.getElementById('images').children[0];
    let picNum = Number.parseInt(percentage / 25);
    if (BlocklyGames.LEVEL === 2) {
        if (picNum === 0) {
            child.src = 'gallery/batterygreen.png';

        }
        else {
            child.src = 'gallery/batterygreen' + picNum + '.png';

        }

    }
    else {
        if (picNum === 0) {
            child.src = 'gallery/battery.png';

        }
        else {
            child.src = 'gallery/battery' + picNum + '.png';

        }


    }

    //
    // let images = document.getElementById('images');
    // for (i = 0; i < 4; i++) {
    //     let child = images.children[i];
    //     child.src = 'gallery/bulb.png';
    // }
    // for (i = 0; i < ((blocks.length / 2) - badBlocks.length); i++) {
    //     let child = images.children[i];
    //     child.src = 'gallery/bulb2.png';
    // }

};

/**
 * All blocks correct.  Do the end dance.
 */
Energysource.endDance = function () {
    BlocklyGames.workspace.getAudioManager().play('win', 0.5);
    var blocks = BlocklyGames.workspace.getTopBlocks(false);
    for (var i = 0, block; (block = blocks[i]); i++) {
        var angle = 360 * (i / blocks.length);
        Energysource.animate(block, angle);
    }
};

/**
 * Animate a block moving around after the puzzle is complete.
 * @param {!Blockly.Block} block Block to move.
 * @param {number} angleOffset Degrees offset in circle.
 */
Energysource.animate = function (block, angleOffset) {
    if (!BlocklyDialogs.isDialogVisible_) {
        // Firefox can navigate 'back' to this page with the animation running
        // but the dialog gone.
        return;
    }
    // Collect all the metrics.
    var workspaceMetrics = BlocklyGames.workspace.getMetrics();
    var halfHeight = workspaceMetrics.viewHeight / 2;
    var halfWidth = workspaceMetrics.viewWidth / 2;
    var blockHW = block.getHeightWidth();
    var blockXY = block.getRelativeToSurfaceXY();
    if (BlocklyGames.isRtl()) {
        blockXY.x -= blockHW.width;
    }
    var radius = Math.max(175, Math.min(halfHeight, halfWidth) -
        Math.max(blockHW.height, blockHW.width) / 2);

    var ms = Date.now();
    // Rotate the blocks around the centre.
    var angle = angleOffset + (ms / 50 % 360);
    // Vary the radius sinusoidally.
    radius *= Math.sin(((ms % 5000) / 5000) * (Math.PI * 2)) / 8 + 7 / 8;
    var targetX = goog.math.angleDx(angle, radius) + halfWidth -
        blockHW.width / 2;
    var targetY = goog.math.angleDy(angle, radius) + halfHeight -
        blockHW.height / 2;
    var speed = 5;

    var distance = Math.sqrt(Math.pow(targetX - blockXY.x, 2) +
        Math.pow(targetY - blockXY.y, 2));
    if (distance < speed) {
        var dx = targetX - blockXY.x;
        var dy = targetY - blockXY.y;
    } else {
        var heading = goog.math.angle(blockXY.x, blockXY.y, targetX, targetY);
        var dx = Math.round(goog.math.angleDx(heading, speed));
        var dy = Math.round(goog.math.angleDy(heading, speed));
    }
    block.moveBy(dx, dy);
    setTimeout(Energysource.animate.bind(null, block, angleOffset), 50);
};

/**
 * Show the help pop-up.
 * @param {boolean} animate Animate the pop-up opening.
 */
Energysource.showHelp = function (animate) {
    var help = document.getElementById('help');
    var button = document.getElementById('helpButton');
    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(help, button, animate, true, style,
        BlocklyDialogs.stopDialogKeyDown);
    BlocklyDialogs.startDialogKeyDown();
};

window.addEventListener('load', Energysource.init);

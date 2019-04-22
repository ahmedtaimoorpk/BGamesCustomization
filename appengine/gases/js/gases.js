/**
 * Blockly Games: Gases
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
 * @fileoverview JavaScript for Blockly's Gases application.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Gases');

goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Gases.Blocks');
goog.require('Gases.soy');
goog.require('Constants');


goog.require('GasesGame');

BlocklyGames.NAME = 'gases';
BlocklyGames.MAX_LEVEL = 3;

var VOins3, VOins4, VOins5, VOins6, VOins7, VOins8, VOins9, VOins10 = false;


/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */
BlocklyInterface.nextLevel = function () {
    if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
        window.location = window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1) + '&maxLevel=' + BlocklyGames.MAX_LEVEL +
            '&skin=' + Gases.SKIN_ID;
    } else {
        BlocklyInterface.indexPage();
    }
};

Gases.MAX_BLOCKS = [undefined, // Level 0.
    5, 5, 10, Infinity][BlocklyGames.LEVEL];

// Crash type constants.
Gases.CRASH_STOP = 1;
Gases.CRASH_SPIN = 2;
Gases.CRASH_FALL = 3;

Gases.ITEMSCOLLECTED = false;

if (BlocklyGames.LEVEL === 1) {
    Gases.ITEM1 = false;
    Gases.ITEM2 = false;
} else if (BlocklyGames.LEVEL === 2) {
    Gases.ITEM1 = true;
    Gases.ITEM2 = true;
    Gases.ITEM3 = false;
    Gases.ITEM4 = false;
} else if (BlocklyGames.LEVEL === 3) {
    Gases.ITEM1 = true;
    Gases.ITEM2 = true;
    Gases.ITEM3 = true;
    Gases.ITEM4 = true;
    Gases.ITEM5 = false;
    Gases.ITEM6 = false;
    Gases.ITEM7 = false;
}
//  else if (BlocklyGames.LEVEL === 4) {
//     Gases.ITEM1 = true;
//     Gases.ITEM2 = true;
//     Gases.ITEM3 = true;
//     Gases.ITEM4 = true;
//     Gases.ITEM5 = true;
//     Gases.ITEM6 = false;
//     Gases.ITEM7 = false;
// }


Gases.SKINS = [
    // sprite: A 1029x51 set of 21 avatar images.
    // tiles: A 250x200 set of 20 map images.
    // marker: A 20x34 goal image.
    // background: An optional 400x450 background image, or false.
    // graph: Colour of optional grid lines, or false.
    // look: Colour of sonar-like look icon.
    // winSound: List of sounds (in various formats) to play when the player wins.
    // crashSound: List of sounds (in various formats) for player crashes.
    // crashType: Behaviour when player crashes (stop, spin, or fall).
    {
        sprite: 'gases/pegman.png',
        tiles: 'gases/tiles_pegman.png',
        marker: 'gases/marker.png',
        item1: 'gases/item3.png',
        item2: 'gases/item2.png',
        item3: 'gases/item1.png',
        item4: 'gases/item4.png',
        item5: 'gases/item5.png',
        item6: 'gases/item6.png',
        item7: 'gases/item7.png',
        background: false,
        graph: false,
        look: '#000',
        winSound: ['gases/win.mp3', 'gases/win.ogg'],
        tool_collection: ['gases/Sounds/tool_collection.wav', 'gases/Sounds/tool_collection.ogg'],
        crashSound: ['gases/fail_pegman.mp3', 'gases/fail_pegman.ogg'],
        crashType: Gases.CRASH_STOP,
        ins2: ['gases/Sounds/ins2S.ogg'],
        // ins3: ['gases/Sounds/ins3S.ogg'],
        ins4: ['gases/Sounds/ins4S.ogg'],
        ins5: ['gases/Sounds/ins5S.ogg'],
        ins6: ['gases/Sounds/ins6S.ogg'],
        ins7: ['gases/Sounds/ins7S.ogg'],
        ins8: ['gases/Sounds/ins8S.ogg'],
        ins9: ['gases/Sounds/ins9S.ogg'],
        ins10: ['gases/Sounds/ins10S.ogg'],

    }
];
Gases.SKIN_ID = BlocklyGames.getNumberParamFromUrl('skin', 0, Gases.SKINS.length);
Gases.SKIN = Gases.SKINS[Gases.SKIN_ID];

/**
 * Milliseconds between each animation frame.
 */
Gases.stepSpeed;

/**
 * The types of squares in the gases, which is represented
 * as a 2D array of SquareType values.
 * @enum {number}
 */
Gases.SquareType = {
    WALL: 0,
    OPEN: 1,
    START: 2,
    FINISH: 3,
    ITEM1: 4,
    ITEM2: 5,
    ITEM3: 6,
    ITEM4: 7,
    ITEM5: 8,
    ITEM6: 9,
    ITEM7: 10
};

// The gases square constants defined above are inlined here
// for ease of reading and writing the static gasess.
Gases.map = [
// Level 0.
    undefined,
    [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 4, 3, 0, 0, 0],
        [0, 0, 2, 5, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
    /**
     * Note, the path continues past the start and the goal in both directions.
     * This is intentionally done so users see the gases is about getting from
     * the start to the goal and not necessarily about moving over every part of
     * the gases, 'mowing the lawn' as Neil calls it.
     */
    [[0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 3, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 6, 0, 0, 0],
        [0, 0, 1, 7, 0, 0, 0, 0],
        [0, 2, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0]],

// Level 6.
    [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0, 0],
        [0, 8, 0, 0, 0, 9, 0, 0],
        [0, 1, 1, 3, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 2, 1, 1, 1, 10, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],

// Level 10.
    [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 3, 0, 1, 0],
        [0, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 10, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 9, 0, 0, 1, 0],
        [0, 2, 1, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]]
][BlocklyGames.LEVEL];

/**
 * Measure gases dimensions and set sizes.
 * ROWS: Number of tiles down.
 * COLS: Number of tiles across.
 * SQUARE_SIZE: Pixel height and width of each gases square (i.e. tile).
 */
Gases.ROWS = Gases.map.length;
Gases.COLS = Gases.map[0].length;
Gases.SQUARE_SIZE = 50;
Gases.PEGMAN_HEIGHT = 52;
Gases.PEGMAN_WIDTH = 49;

Gases.GASES_WIDTH = Gases.SQUARE_SIZE * Gases.COLS;
Gases.GASES_HEIGHT = Gases.SQUARE_SIZE * Gases.ROWS;
Gases.PATH_WIDTH = Gases.SQUARE_SIZE / 3;

/**
 * Constants for cardinal directions.  Subsequent code assumes these are
 * in the range 0..3 and that opposites have an absolute difference of 2.
 * @enum {number}
 */
Gases.DirectionType = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
};

/**
 * Outcomes of running the user program.
 */
Gases.ResultType = {
    UNSET: 0,
    SUCCESS: 1,
    FAILURE: -1,
    TIMEOUT: 2,
    ERROR: -2,
    GETITEM: 3
};

/**
 * Result of last execution.
 */
Gases.result = Gases.ResultType.UNSET;

/**
 * Starting direction.
 */
Gases.startDirection = Gases.DirectionType.EAST;

/**
 * PIDs of animation tasks currently executing.
 */
Gases.pidList = [];

// Map each possible shape to a sprite.
// Input: Binary string representing Centre/North/West/South/East squares.
// Output: [x, y] coordinates of each tile's sprite in tiles.png.
Gases.tile_SHAPES = {
    '10010': [4, 0],  // Dead ends
    '10001': [3, 3],
    '11000': [0, 1],
    '10100': [0, 2],
    '11010': [4, 1],  // Vertical
    '10101': [3, 2],  // Horizontal
    '10110': [0, 0],  // Elbows
    '10011': [2, 0],
    '11001': [4, 2],
    '11100': [2, 3],
    '11110': [1, 1],  // Junctions
    '10111': [1, 0],
    '11011': [2, 1],
    '11101': [1, 2],
    '11111': [2, 2],  // Cross
    'null0': [4, 3],  // Empty
    'null1': [3, 0],
    'null2': [3, 1],
    'null3': [0, 3],
    'null4': [1, 3]
};

/**
 * Create and layout all the nodes for the path, scenery, Pegman, and goal.
 */
Gases.drawMap = function () {
    var svg = document.getElementById('svgGases');
    var scale = Math.max(Gases.ROWS, Gases.COLS) * Gases.SQUARE_SIZE;
    svg.setAttribute('viewBox', '0 0 ' + scale + ' ' + scale);

    // Draw the outer square.
    var square = document.createElementNS(Blockly.SVG_NS, 'rect');
    square.setAttribute('width', Gases.GASES_WIDTH);
    square.setAttribute('height', Gases.GASES_HEIGHT);
    square.setAttribute('fill', '#F1EEE7');
    square.setAttribute('stroke-width', 1);
    square.setAttribute('stroke', '#CCB');
    svg.appendChild(square);

    if (Gases.SKIN.background) {
        var tile = document.createElementNS(Blockly.SVG_NS, 'image');
        tile.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.background);
        tile.setAttribute('height', Gases.GASES_HEIGHT);
        tile.setAttribute('width', Gases.GASES_WIDTH);
        tile.setAttribute('x', 0);
        tile.setAttribute('y', 0);
        svg.appendChild(tile);
    }

    if (Gases.SKIN.graph) {
        // Draw the grid lines.
        // The grid lines are offset so that the lines pass through the centre of
        // each square.  A half-pixel offset is also added to as standard SVG
        // practice to avoid blurriness.
        var offset = Gases.SQUARE_SIZE / 2 + 0.5;
        for (var k = 0; k < Gases.ROWS; k++) {
            var h_line = document.createElementNS(Blockly.SVG_NS, 'line');
            h_line.setAttribute('y1', k * Gases.SQUARE_SIZE + offset);
            h_line.setAttribute('x2', Gases.GASES_WIDTH);
            h_line.setAttribute('y2', k * Gases.SQUARE_SIZE + offset);
            h_line.setAttribute('stroke', Gases.SKIN.graph);
            h_line.setAttribute('stroke-width', 1);
            svg.appendChild(h_line);
        }
        for (var k = 0; k < Gases.COLS; k++) {
            var v_line = document.createElementNS(Blockly.SVG_NS, 'line');
            v_line.setAttribute('x1', k * Gases.SQUARE_SIZE + offset);
            v_line.setAttribute('x2', k * Gases.SQUARE_SIZE + offset);
            v_line.setAttribute('y2', Gases.GASES_HEIGHT);
            v_line.setAttribute('stroke', Gases.SKIN.graph);
            v_line.setAttribute('stroke-width', 1);
            svg.appendChild(v_line);
        }
    }

    // Draw the tiles making up the gases map.

    // Return a value of '0' if the specified square is wall or out of bounds,
    // '1' otherwise (empty, start, finish).
    var normalize = function (x, y) {
        if (x < 0 || x >= Gases.COLS || y < 0 || y >= Gases.ROWS) {
            return '0';
        }
        return (Gases.map[y][x] == Gases.SquareType.WALL) ? '0' : '1';
    };

    // Compute and draw the tile for each square.
    var tileId = 0;
    for (var y = 0; y < Gases.ROWS; y++) {
        for (var x = 0; x < Gases.COLS; x++) {
            // Compute the tile shape.
            var tileShape = normalize(x, y) +
                normalize(x, y - 1) +  // North.
                normalize(x + 1, y) +  // West.
                normalize(x, y + 1) +  // South.
                normalize(x - 1, y);   // East.

            // Draw the tile.
            if (!Gases.tile_SHAPES[tileShape]) {
                // Empty square.  Use null0 for large areas, with null1-4 for borders.
                // Add some randomness to avoid large empty spaces.
                if (tileShape == '00000' && Math.random() > 0.3) {
                    tileShape = 'null0';
                } else {
                    tileShape = 'null' + Math.floor(1 + Math.random() * 4);
                }
            }
            var left = Gases.tile_SHAPES[tileShape][0];
            var top = Gases.tile_SHAPES[tileShape][1];
            // Tile's clipPath element.
            var tileClip = document.createElementNS(Blockly.SVG_NS, 'clipPath');
            tileClip.setAttribute('id', 'tileClipPath' + tileId);
            var clipRect = document.createElementNS(Blockly.SVG_NS, 'rect');
            clipRect.setAttribute('width', Gases.SQUARE_SIZE);
            clipRect.setAttribute('height', Gases.SQUARE_SIZE);

            clipRect.setAttribute('x', x * Gases.SQUARE_SIZE);
            clipRect.setAttribute('y', y * Gases.SQUARE_SIZE);

            tileClip.appendChild(clipRect);
            svg.appendChild(tileClip);
            // Tile sprite.
            var tile = document.createElementNS(Blockly.SVG_NS, 'image');
            tile.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
                Gases.SKIN.tiles);
            // Position the tile sprite relative to the clipRect.
            tile.setAttribute('height', Gases.SQUARE_SIZE * 4);
            tile.setAttribute('width', Gases.SQUARE_SIZE * 5);
            tile.setAttribute('clip-path', 'url(#tileClipPath' + tileId + ')');
            tile.setAttribute('x', (x - left) * Gases.SQUARE_SIZE);
            tile.setAttribute('y', (y - top) * Gases.SQUARE_SIZE);
            svg.appendChild(tile);
            tileId++;
        }
    }

    // Add finish marker.
    var finishMarker = document.createElementNS(Blockly.SVG_NS, 'image');
    finishMarker.setAttribute('id', 'finish');
    finishMarker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
        Gases.SKIN.marker);
    finishMarker.setAttribute('height', 34);
    finishMarker.setAttribute('width', 20);
    svg.appendChild(finishMarker);

    if (BlocklyGames.LEVEL === 1) {
        // Add Item1 marker.
        var item1Marker = document.createElementNS(Blockly.SVG_NS, 'image');
        item1Marker.setAttribute('id', 'item1');
        item1Marker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.item1);
        item1Marker.setAttribute('height', 50);
        item1Marker.setAttribute('width', 36);
        svg.appendChild(item1Marker);

        // Add Item2 marker.
        var item2Marker = document.createElementNS(Blockly.SVG_NS, 'image');
        item2Marker.setAttribute('id', 'item2');
        item2Marker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.item2);
        item2Marker.setAttribute('height', 50);
        item2Marker.setAttribute('width', 36);
        svg.appendChild(item2Marker);
    } else if (BlocklyGames.LEVEL === 2) {

        // Add Item3 marker.
        var item3Marker = document.createElementNS(Blockly.SVG_NS, 'image');
        item3Marker.setAttribute('id', 'item3');
        item3Marker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.item3);
        item3Marker.setAttribute('height', 60);
        item3Marker.setAttribute('width', 46);
        svg.appendChild(item3Marker);

        // Add Item4 marker.
        var item4Marker = document.createElementNS(Blockly.SVG_NS, 'image');
        item4Marker.setAttribute('id', 'item4');
        item4Marker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.item4);
        item4Marker.setAttribute('height', 50);
        item4Marker.setAttribute('width', 36);
        svg.appendChild(item4Marker);

    } else if (BlocklyGames.LEVEL === 3) {

        // Add item5 marker.
        var item5Marker = document.createElementNS(Blockly.SVG_NS, 'image');
        item5Marker.setAttribute('id', 'item5');
        item5Marker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.item5);
        item5Marker.setAttribute('height', 50);
        item5Marker.setAttribute('width', 36);
        svg.appendChild(item5Marker);

        // } else if (BlocklyGames.LEVEL === 4) {

        // Add item6 marker.
        var item6Marker = document.createElementNS(Blockly.SVG_NS, 'image');
        item6Marker.setAttribute('id', 'item6');
        item6Marker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.item6);
        item6Marker.setAttribute('height', 50);
        item6Marker.setAttribute('width', 36);
        svg.appendChild(item6Marker);

        // Add item7 marker.
        var item7Marker = document.createElementNS(Blockly.SVG_NS, 'image');
        item7Marker.setAttribute('id', 'item7');
        item7Marker.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
            Gases.SKIN.item7);
        item7Marker.setAttribute('height', 50);
        item7Marker.setAttribute('width', 36);
        svg.appendChild(item7Marker);
    }

    // Pegman's clipPath element, whose (x, y) is reset by Gases.displayPegman
    var pegmanClip = document.createElementNS(Blockly.SVG_NS, 'clipPath');
    pegmanClip.setAttribute('id', 'pegmanClipPath');
    var clipRect = document.createElementNS(Blockly.SVG_NS, 'rect');
    clipRect.setAttribute('id', 'clipRect');
    clipRect.setAttribute('width', Gases.PEGMAN_WIDTH);
    clipRect.setAttribute('height', Gases.PEGMAN_HEIGHT);
    pegmanClip.appendChild(clipRect);
    svg.appendChild(pegmanClip);

    // Add Pegman.
    var pegmanIcon = document.createElementNS(Blockly.SVG_NS, 'image');
    pegmanIcon.setAttribute('id', 'pegman');
    pegmanIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
        Gases.SKIN.sprite);
    pegmanIcon.setAttribute('height', Gases.PEGMAN_HEIGHT);
    pegmanIcon.setAttribute('width', Gases.PEGMAN_WIDTH * 21); // 49 * 21 = 1029
    pegmanIcon.setAttribute('clip-path', 'url(#pegmanClipPath)');
    svg.appendChild(pegmanIcon);
};

/**
 * Initialize Blockly and the gases.  Called on page load.
 */

Gases.init = function () {

    var PhaserGameInitCallback = function () {

        if (BlocklyGames.LEVEL === 2) {
            GasesGame.item3.input.draggable = true;
            GasesGame.item3.alpha = 1;
            GasesGame.item2.input.draggable = true;
            GasesGame.item2.alpha = 1;
        } else if (BlocklyGames.LEVEL === 3) {
            GasesGame.item1.input.draggable = true;
            GasesGame.item1.alpha = 1;
            GasesGame.item2.input.draggable = true;
            GasesGame.item2.alpha = 1;
            GasesGame.item3.input.draggable = true;
            GasesGame.item3.alpha = 1;
            GasesGame.item4.input.draggable = true;
            GasesGame.item4.alpha = 1;
            // } else if (BlocklyGames.LEVEL === 4) {
            //     GasesGame.item1.input.draggable = true;
            //     GasesGame.item1.alpha = 1;
            //     GasesGame.item2.input.draggable = true;
            //     GasesGame.item2.alpha = 1;
            //     GasesGame.item3.input.draggable = true;
            //     GasesGame.item3.alpha = 1;
            //     GasesGame.item4.input.draggable = true;
            //     GasesGame.item4.alpha = 1;
            //     GasesGame.item5.input.draggable = true;
            //     GasesGame.item5.alpha = 1;
        }

        Gases.fixMachine();

    };

    GasesGame.gameInit(PhaserGameInitCallback, BlocklyGames.LEVEL);

    // Render the Soy template.
    document.body.innerHTML = Gases.soy.start({}, null,
        {
            lang: BlocklyGames.LANG,
            level: BlocklyGames.LEVEL,
            maxLevel: BlocklyGames.MAX_LEVEL,
            // max_level: BlocklyGames.MAX_LEVEL,
            skin: Gases.SKIN_ID,
            scheme: Constants.ColorScheme,
            html: BlocklyGames.IS_HTML
        });

    BlocklyInterface.init();

    // Setup the Pegman menu.
    var pegmanImg = document.querySelector('#pegmanButton>img');
    pegmanImg.style.backgroundImage = 'url(' + Gases.SKIN.sprite + ')';
    var pegmanMenu = document.getElementById('pegmanMenu');
    var handlerFactory = function (n) {
        return function () {
            Gases.changePegman(n);
        };
    };
    for (var i = 0; i < Gases.SKINS.length; i++) {
        if (i == Gases.SKIN_ID) {
            continue;
        }
        var div = document.createElement('div');
        var img = document.createElement('img');
        img.src = 'common/1x1.gif';
        img.style.backgroundImage = 'url(' + Gases.SKINS[i].sprite + ')';
        div.appendChild(img);
        pegmanMenu.appendChild(div);
        Blockly.bindEvent_(div, 'mousedown', null, handlerFactory(i));
    }
    Blockly.bindEvent_(window, 'resize', null, Gases.hidePegmanMenu);
    var pegmanButton = document.getElementById('pegmanButton');
    Blockly.bindEvent_(pegmanButton, 'mousedown', null, Gases.showPegmanMenu);
    var pegmanButtonArrow = document.getElementById('pegmanButtonArrow');
    var arrow = document.createTextNode(Blockly.FieldDropdown.ARROW_CHAR);
    pegmanButtonArrow.appendChild(arrow);

    var rtl = BlocklyGames.isRtl();
    var blocklyDiv = document.getElementById('blockly');
    var visualization = document.getElementById('visualization');
    var onresize = function (e) {
        var top = visualization.offsetTop;
        blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
        blocklyDiv.style.left = rtl ? '10px' : '420px';
        blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
    };
    window.addEventListener('scroll', function () {
        onresize(null);
        Blockly.svgResize(BlocklyGames.workspace);
    });
    window.addEventListener('resize', onresize);
    onresize(null);

    var toolbox = document.getElementById('toolbox');
    // Scale the workspace so level 1 = 1.3, and level 10 = 1.0.
    var scale = 1 + (1 - (BlocklyGames.LEVEL / BlocklyGames.MAX_LEVEL)) / 3;
    BlocklyGames.workspace = Blockly.inject('blockly',
        {
            'media': 'third-party/blockly/media/',
            'maxBlocks': Gases.MAX_BLOCKS,
            'rtl': rtl,
            'toolbox': toolbox,
            'trashcan': true,
            // 'zoom': {'startScale': scale}
        });
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.winSound, 'win');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.crashSound, 'fail');

    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins2, 'ins2');
    // BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins3, 'ins3');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins4, 'ins4');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins5, 'ins5');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins6, 'ins6');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins7, 'ins7');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins8, 'ins8');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins9, 'ins9');
    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.ins10, 'ins10');

    BlocklyGames.workspace.getAudioManager().load(Gases.SKIN.tool_collection, 'tool_collection');

    // Not really needed, there are no user-defined functions or variables.
    Blockly.JavaScript.addReservedWords('moveForward,moveBackward,' +
        'turnRight,turnLeft,isPathForward,isPathRight,isPathBackward,isPathLeft');

    Gases.drawMap();

    var defaultXml =
        '<xml>' +
        '  <block movable="' + (BlocklyGames.LEVEL != 1) + '" ' +
        'type="gases_moveForward" x="70" y="70"></block>' +
        '</xml>';
    BlocklyInterface.loadBlocks(defaultXml, false);

    // Locate the start and finish squares.
    for (var y = 0; y < Gases.ROWS; y++) {
        for (var x = 0; x < Gases.COLS; x++) {
            if (Gases.map[y][x] == Gases.SquareType.START) {
                Gases.start_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.FINISH) {
                Gases.finish_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.ITEM1) {
                Gases.item1_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.ITEM2) {
                Gases.item2_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.ITEM3) {
                Gases.item3_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.ITEM4) {
                Gases.item4_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.ITEM5) {
                Gases.item5_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.ITEM6) {
                Gases.item6_ = {x: x, y: y};
            } else if (Gases.map[y][x] == Gases.SquareType.ITEM7) {
                Gases.item7_ = {x: x, y: y};
            }
        }
    }

    Gases.reset(true);
    BlocklyGames.workspace.addChangeListener(function () {
        Gases.updateCapacity();
    });

    document.body.addEventListener('mousemove', Gases.updatePegSpin_, true);

    BlocklyGames.bindClick('runButton', Gases.runButtonClick);
    BlocklyGames.bindClick('resetButton', Gases.resetButtonClick);

    if (BlocklyGames.LEVEL == 1) {
        // Make connecting blocks easier for beginners.
        Blockly.SNAP_RADIUS *= 2;
    }
    if (BlocklyGames.LEVEL == 10) {
        if (!BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
            BlocklyGames.LEVEL)) {
            // Level 10 gets an introductory modal dialog.
            // Skip the dialog if the user has already won.
            var content = document.getElementById('dialogHelpWallFollow');
            var style = {
                'width': '30%',
                'left': '35%',
                'top': '12em'
            };
            BlocklyDialogs.showDialog(content, null, false, true, style,
                BlocklyDialogs.stopDialogKeyDown);
            BlocklyDialogs.startDialogKeyDown();
            // setTimeout(BlocklyDialogs.abortOffer, 5 * 60 * 1000);
        }
    } else {
        // All other levels get interactive help.  But wait 5 seconds for the
        // user to think a bit before they are told what to do.
        // setTimeout(function () {
        //     BlocklyGames.workspace.addChangeListener(Gases.levelHelp);
        //     Gases.levelHelp();
        // }, 5000);
    }

    // Add the spinning Pegman icon to the done dialog.
    // <img id="pegSpin" src="common/1x1.gif">
    var buttonDiv = document.getElementById('dialogDoneButtons');
    var pegSpin = document.createElement('img');
    pegSpin.id = 'pegSpin';
    pegSpin.src = 'common/1x1.gif';
    pegSpin.style.backgroundImage = 'url(' + Gases.SKIN.sprite + ')';
    buttonDiv.parentNode.insertBefore(pegSpin, buttonDiv);

    // Lazy-load the JavaScript interpreter.
    setTimeout(BlocklyInterface.importInterpreter, 1);
    // Lazy-load the syntax-highlighting.
    setTimeout(BlocklyInterface.importPrettify, 1);

    //Colors Load
    document.getElementsByClassName('blocklySvg')[0].style.backgroundColor = Constants.Color["bgColor"];
    document.getElementsByClassName('blocklyFlyoutBackground')[0].style.fill = Constants.Color["bgColorSecondary"];
    document.getElementsByTagName('body')[0].style.backgroundColor = Constants.Color["bgColor"];
    document.getElementById('runButton').style.borderColor = Constants.Color["accentColor"];
    document.getElementById('runButton').style.backgroundColor = Constants.Color["accentColor"];
    for (let i = 0; i < document.getElementsByClassName('level_completed').length; i++) {
        let thissChild = document.getElementsByClassName('level_completed')[i];
        thissChild.style.backgroundColor = Constants.Color["levelLinkColor"];
    }

    if (BlocklyGames.LEVEL == 1) {
        setTimeout(BlocklyDialogs.gasesGameStart, 1000);
    }
};

/**
 * When the workspace changes, update the help as needed.
 * @param {Blockly.Events.Abstract=} opt_event Custom data for event.
 */
Gases.levelHelp = function (opt_event) {
    if (opt_event && opt_event.type == Blockly.Events.UI) {
        // Just a change to highlighting or somesuch.
        return;
    } else if (BlocklyGames.workspace.isDragging()) {
        // Don't change helps during drags.
        return;
    } else if (Gases.result == Gases.ResultType.SUCCESS ||
        BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
            BlocklyGames.LEVEL)) {
        // The user has already won.  They are just playing around.
        return;
    }
    var rtl = BlocklyGames.isRtl();
    var userBlocks = Blockly.Xml.domToText(
        Blockly.Xml.workspaceToDom(BlocklyGames.workspace));
    var toolbar = BlocklyGames.workspace.flyout_.workspace_.getTopBlocks(true);
    var content = null;
    var origin = null;
    var style = null;
    if (BlocklyGames.LEVEL == 1) {

        console.log(BlocklyGames.workspace.getAllBlocks());

        if (BlocklyGames.workspace.getAllBlocks().length < 2) {
            content = document.getElementById('dialogHelpStack');
            style = {'width': '370px', 'top': '130px'};
            style[rtl ? 'right' : 'left'] = '215px';
            origin = toolbar[0].getSvgRoot();
        } else {
            var topBlocks = BlocklyGames.workspace.getTopBlocks(true);
            if (topBlocks.length > 1) {
                var xml = [
                    '<xml>',
                    '<block type="gases_moveForward" x="10" y="10">',
                    '<next>',
                    '<block type="gases_moveForward"></block>',
                    '</next>',
                    '</block>',
                    '</xml>'];
                BlocklyInterface.injectReadonly('sampleOneTopBlock', xml);
                content = document.getElementById('dialogHelpOneTopBlock');
                style = {'width': '360px', 'top': '120px'};
                style[rtl ? 'right' : 'left'] = '225px';
                origin = topBlocks[0].getSvgRoot();
            } else if (Gases.result == Gases.ResultType.UNSET) {
                // Show run help dialog.
                content = document.getElementById('dialogHelpRun');
                style = {'width': '360px', 'top': '410px'};
                style[rtl ? 'right' : 'left'] = '400px';
                origin = document.getElementById('runButton');
            }
        }
    } else if (BlocklyGames.LEVEL == 2) {
        if (Gases.result != Gases.ResultType.UNSET &&
            document.getElementById('runButton').style.display == 'none') {
            content = document.getElementById('dialogHelpReset');
            style = {'width': '360px', 'top': '410px'};
            style[rtl ? 'right' : 'left'] = '400px';
            origin = document.getElementById('resetButton');
        }
    } else if (BlocklyGames.LEVEL == 3) {
        if (userBlocks.indexOf('gases_forever') == -1) {
            if (BlocklyGames.workspace.remainingCapacity() == 0) {
                content = document.getElementById('dialogHelpCapacity');
                style = {'width': '430px', 'top': '310px'};
                style[rtl ? 'right' : 'left'] = '50px';
                origin = document.getElementById('capacityBubble');
            } else {
                content = document.getElementById('dialogHelpRepeat');
                style = {'width': '360px', 'top': '360px'};
                style[rtl ? 'right' : 'left'] = '425px';
                origin = toolbar[3].getSvgRoot();
            }
        }
    } else if (BlocklyGames.LEVEL == 4) {
        if (BlocklyGames.workspace.remainingCapacity() == 0 &&
            (userBlocks.indexOf('gases_forever') == -1 ||
                BlocklyGames.workspace.getTopBlocks(false).length > 1)) {
            content = document.getElementById('dialogHelpCapacity');
            style = {'width': '430px', 'top': '310px'};
            style[rtl ? 'right' : 'left'] = '50px';
            origin = document.getElementById('capacityBubble');
        } else {
            var showHelp = true;
            // Only show help if there is not a loop with two nested blocks.
            var blocks = BlocklyGames.workspace.getAllBlocks();
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                if (block.type != 'gases_forever') {
                    continue;
                }
                var j = 0;
                while (block) {
                    var kids = block.getChildren();
                    block = kids.length ? kids[0] : null;
                    j++;
                }
                if (j > 2) {
                    showHelp = false;
                    break;
                }
            }
            if (showHelp) {
                content = document.getElementById('dialogHelpRepeatMany');
                style = {'width': '360px', 'top': '360px'};
                style[rtl ? 'right' : 'left'] = '425px';
                origin = toolbar[3].getSvgRoot();
            }
        }
    } else if (BlocklyGames.LEVEL == 5) {
        if (Gases.SKIN_ID == 0 && !Gases.showPegmanMenu.activatedOnce) {
            content = document.getElementById('dialogHelpSkins');
            style = {'width': '360px', 'top': '60px'};
            style[rtl ? 'left' : 'right'] = '20px';
            origin = document.getElementById('pegmanButton');
        }
    } else if (BlocklyGames.LEVEL == 6) {
        if (userBlocks.indexOf('gases_if') == -1) {
            content = document.getElementById('dialogHelpIf');
            style = {'width': '360px', 'top': '430px'};
            style[rtl ? 'right' : 'left'] = '425px';
            origin = toolbar[4].getSvgRoot();
        }
    } else if (BlocklyGames.LEVEL == 7) {
        if (!Gases.levelHelp.initialized7_) {
            // Create fake dropdown.
            var span = document.createElement('span');
            span.className = 'helpMenuFake';
            var options =
                [BlocklyGames.getMsg('Gases_pathAhead'),
                    BlocklyGames.getMsg('Gases_pathLeft'),
                    BlocklyGames.getMsg('Gases_pathRight')];
            var prefix = Blockly.utils.commonWordPrefix(options);
            var suffix = Blockly.utils.commonWordSuffix(options);
            if (suffix) {
                var option = options[0].slice(prefix, -suffix);
            } else {
                var option = options[0].substring(prefix);
            }
            // Add dropdown arrow: "option ▾" (LTR) or "▾ אופציה" (RTL)
            span.textContent = option + ' ' + Blockly.FieldDropdown.ARROW_CHAR;
            // Inject fake dropdown into message.
            var container = document.getElementById('helpMenuText');
            var msg = container.textContent;
            container.textContent = '';
            var parts = msg.split(/%\d/);
            for (var i = 0; i < parts.length; i++) {
                container.appendChild(document.createTextNode(parts[i]));
                if (i != parts.length - 1) {
                    container.appendChild(span.cloneNode(true));
                }
            }
            Gases.levelHelp.initialized7_ = true;
        }
        // The hint says to change from 'ahead', but keep the hint visible
        // until the user chooses 'right'.
        if (userBlocks.indexOf('isPathRight') == -1) {
            content = document.getElementById('dialogHelpMenu');
            style = {'width': '360px', 'top': '430px'};
            style[rtl ? 'right' : 'left'] = '425px';
            origin = toolbar[4].getSvgRoot();
        }
    } else if (BlocklyGames.LEVEL == 9) {
        if (userBlocks.indexOf('gases_ifElse') == -1) {
            content = document.getElementById('dialogHelpIfElse');
            style = {'width': '360px', 'top': '305px'};
            style[rtl ? 'right' : 'left'] = '425px';
            origin = toolbar[5].getSvgRoot();
        }
    }
    if (content) {
        if (content.parentNode != document.getElementById('dialog')) {
            BlocklyDialogs.showDialog(content, origin, true, false, style, null);
        }
    } else {
        BlocklyDialogs.hideDialog(false);
    }
};


/**
 * Save the blocks for a one-time reload.
 */
Gases.saveToStorage = function () {
    // MSIE 11 does not support sessionStorage on file:// URLs.
    if (typeof Blockly != undefined && window.sessionStorage) {
        var xml = Blockly.Xml.workspaceToDom(BlocklyGames.workspace);
        var text = Blockly.Xml.domToText(xml);
        window.sessionStorage.loadOnceBlocks = text;
    }
};

/**
 * Display the Pegman skin-change menu.
 * @param {!Event} e Mouse, touch, or resize event.
 */
// Gases.showPegmanMenu = function (e) {
//     var menu = document.getElementById('pegmanMenu');
//     if (menu.style.display == 'block') {
//         // Menu is already open.  Close it.
//         Gases.hidePegmanMenu(e);
//         return;
//     }
//     // Prevent double-clicks or double-taps.
//     if (BlocklyInterface.eventSpam(e)) {
//         return;
//     }
//     var button = document.getElementById('pegmanButton');
//     button.classList.add('buttonHover');
//     menu.style.top = (button.offsetTop + button.offsetHeight) + 'px';
//     menu.style.left = button.offsetLeft + 'px';
//     menu.style.display = 'block';
//     Gases.pegmanMenuMouse_ =
//         Blockly.bindEvent_(document.body, 'mousedown', null, Gases.hidePegmanMenu);
//     // Close the skin-changing hint if open.
//     var hint = document.getElementById('dialogHelpSkins');
//     if (hint && hint.className != 'dialogHiddenContent') {
//         BlocklyDialogs.hideDialog(false);
//     }
//     Gases.showPegmanMenu.activatedOnce = true;
// };

/**
 * Hide the Pegman skin-change menu.
 * @param {!Event} e Mouse, touch, or resize event.
 */
// Gases.hidePegmanMenu = function (e) {
//     // Prevent double-clicks or double-taps.
//     if (BlocklyInterface.eventSpam(e)) {
//         return;
//     }
//     document.getElementById('pegmanMenu').style.display = 'none';
//     document.getElementById('pegmanButton').classList.remove('buttonHover');
//     if (Gases.pegmanMenuMouse_) {
//         Blockly.unbindEvent_(Gases.pegmanMenuMouse_);
//         delete Gases.pegmanMenuMouse_;
//     }
// };

/**
 * Reset the gases to the start position and kill any pending animation tasks.
 * @param {boolean} first True if an opening animation is to be played.
 */
Gases.reset = function (first) {
    // Kill all tasks.
    for (var i = 0; i < Gases.pidList.length; i++) {
        window.clearTimeout(Gases.pidList[i]);
    }
    Gases.pidList = [];

    // Move Pegman into position.
    Gases.pegmanX = Gases.start_.x;
    Gases.pegmanY = Gases.start_.y;

    // Reset Items
    if (BlocklyGames.LEVEL === 1) {
        Gases.ITEM1 = false;
        document.getElementById('item1').style.display = 'block';
        Gases.ITEM2 = false;
        document.getElementById('item2').style.display = 'block';
    } else if (BlocklyGames.LEVEL === 2) {
        Gases.ITEM3 = false;
        document.getElementById('item3').style.display = 'block';
        Gases.ITEM4 = false;
        document.getElementById('item4').style.display = 'block';
    } else if (BlocklyGames.LEVEL === 3) {
        Gases.ITEM5 = false;
        document.getElementById('item5').style.display = 'block';
        // } else if (BlocklyGames.LEVEL === 4) {
        Gases.ITEM6 = false;
        document.getElementById('item6').style.display = 'block';
        Gases.ITEM7 = false;
        document.getElementById('item7').style.display = 'block';
    }
    Gases.ITEMSCOLLECTED = false;

    if (first) {
        Gases.pegmanD = Gases.startDirection + 1;
        Gases.scheduleFinish(false);
        Gases.pidList.push(setTimeout(function () {
            Gases.stepSpeed = 100;
            Gases.schedule([Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4],
                [Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4 - 4]);
            Gases.pegmanD++;
        }, Gases.stepSpeed * 5));
    } else {
        Gases.pegmanD = Gases.startDirection;
        Gases.displayPegman(Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4);
    }

    // Move the finish icon into position.
    var finishIcon = document.getElementById('finish');
    finishIcon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.finish_.x + 0.5) -
        finishIcon.getAttribute('width') / 2);
    finishIcon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.finish_.y + 0.6) -
        finishIcon.getAttribute('height'));
    if (BlocklyGames.LEVEL === 1) {
        // Move the Item1 icon into position.
        var item1Icon = document.getElementById('item1');
        item1Icon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.item1_.x + 0.5) -
            item1Icon.getAttribute('width') / 2);
        item1Icon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.item1_.y + 0.6) -
            item1Icon.getAttribute('height'));

        // Move the item2 icon into position.
        var item2Icon = document.getElementById('item2');
        item2Icon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.item2_.x + 0.5) -
            item2Icon.getAttribute('width') / 2);
        item2Icon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.item2_.y + 0.6) -
            item2Icon.getAttribute('height'));
    } else if (BlocklyGames.LEVEL === 2) {
        // Move the Item3 icon into position.
        var item3Icon = document.getElementById('item3');
        item3Icon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.item3_.x + 0.5) -
            item3Icon.getAttribute('width') / 2);
        item3Icon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.item3_.y + 0.6) -
            item3Icon.getAttribute('height'));

        // Move the Item4 icon into position.
        var item4Icon = document.getElementById('item4');
        item4Icon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.item4_.x + 0.5) -
            item4Icon.getAttribute('width') / 2);
        item4Icon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.item4_.y + 0.6) -
            item4Icon.getAttribute('height'));
    } else if (BlocklyGames.LEVEL === 3) {
        // Move the Item5 icon into position.
        var item5Icon = document.getElementById('item5');
        item5Icon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.item5_.x + 0.5) -
            item5Icon.getAttribute('width') / 2);
        item5Icon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.item5_.y + 0.6) -
            item5Icon.getAttribute('height'));

        // } else if (BlocklyGames.LEVEL === 4) {
        // Move the Item6 icon into position.
        var item6Icon = document.getElementById('item6');
        item6Icon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.item6_.x + 0.5) -
            item6Icon.getAttribute('width') / 2);
        item6Icon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.item6_.y + 0.6) -
            item6Icon.getAttribute('height'));

        // Move the Item7 icon into position.
        var item7Icon = document.getElementById('item7');
        item7Icon.setAttribute('x', Gases.SQUARE_SIZE * (Gases.item7_.x + 0.5) -
            item7Icon.getAttribute('width') / 2);
        item7Icon.setAttribute('y', Gases.SQUARE_SIZE * (Gases.item7_.y + 0.6) -
            item7Icon.getAttribute('height'));
    }

// Make 'look' icon invisible and promote to top.
    var lookIcon = document.getElementById('look');
    lookIcon.style.display = 'none';
    lookIcon.parentNode.appendChild(lookIcon);
    var paths = lookIcon.getElementsByTagName('path');
    for (var i = 0, path; (path = paths[i]); i++) {
        path.setAttribute('stroke', Gases.SKIN.look);
    }

}
;

/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
Gases.runButtonClick = function (e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }
    BlocklyDialogs.hideDialog(false);
    // Only allow a single top block on level 1.
    if (BlocklyGames.LEVEL == 1 &&
        BlocklyGames.workspace.getTopBlocks(false).length > 1 &&
        Gases.result != Gases.ResultType.SUCCESS &&
        !BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
            BlocklyGames.LEVEL)) {
        // Gases.levelHelp();
        return;
    }
    var runButton = document.getElementById('runButton');
    var resetButton = document.getElementById('resetButton');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    resetButton.style.display = 'inline';
    Gases.reset(false);
    Gases.execute();
};

/**
 * Updates the document's 'capacity' element with a message
 * indicating how many more blocks are permitted.  The capacity
 * is retrieved from BlocklyGames.workspace.remainingCapacity().
 */
Gases.updateCapacity = function () {
    var cap = BlocklyGames.workspace.remainingCapacity();
    var p = document.getElementById('capacity');
    if (cap == Infinity) {
        p.style.display = 'none';
    } else {
        p.style.display = 'inline';
        p.innerHTML = '';
        cap = Number(cap);
        var capSpan = document.createElement('span');
        capSpan.className = 'capacityNumber';
        capSpan.appendChild(document.createTextNode(cap));
        if (cap == 0) {
            var msg = BlocklyGames.getMsg('Gases_capacity0');
        } else if (cap == 1) {
            var msg = BlocklyGames.getMsg('Gases_capacity1');
        } else {
            var msg = BlocklyGames.getMsg('Gases_capacity2');
        }
        var parts = msg.split(/%\d/);
        for (var i = 0; i < parts.length; i++) {
            p.appendChild(document.createTextNode(parts[i]));
            if (i != parts.length - 1) {
                p.appendChild(capSpan.cloneNode(true));
            }
        }
    }

    /*
    * IMPLEMENTATION OF ALL VO'S
    * */
    if (BlocklyGames.LEVEL == 1) {
        if (BlocklyGames.workspace.getAllBlocks().length === 2 && !VOins5) {
            VOins5 = true;
            setTimeout(function () {
                BlocklyGames.workspace.getAudioManager().play('ins5', 1);
            }, 1000);
        } else if (BlocklyGames.workspace.getAllBlocks().length === 3 && !VOins6) {
            VOins6 = true;
            setTimeout(function () {
                BlocklyGames.workspace.getAudioManager().play('ins6', 1);
            }, 1000);
        } else if (BlocklyGames.workspace.getAllBlocks().length === 4 && !VOins7) {
            VOins7 = true;
            setTimeout(function () {
                BlocklyGames.workspace.getAudioManager().play('ins5', 1);
            }, 1000);
        } else if (BlocklyGames.workspace.getAllBlocks().length === 5 && !VOins8) {
            VOins8 = true;
            setTimeout(function () {
                BlocklyGames.workspace.getAudioManager().play('ins7', 1);
            }, 1000);
        }
    }

};

/**
 * Click the reset button.  Reset the gases.
 * @param {!Event} e Mouse or touch event.
 */
Gases.resetButtonClick = function (e) {
    document.getElementById('game_completed').style.display = 'none';
    document.getElementById('game_gases').getElementsByTagName('canvas')[0].style.display = 'block';

    if (BlocklyGames.LEVEL === 1) {
        GasesGame.item1.input.draggable = false;
        GasesGame.item1.alpha = 0.5;
        GasesGame.item2.input.draggable = false;
        GasesGame.item2.alpha = 0.5;
    } else if (BlocklyGames.LEVEL === 2) {
        GasesGame.item3.input.draggable = false;
        GasesGame.item3.alpha = 0.5;
        GasesGame.item4.input.draggable = false;
        GasesGame.item4.alpha = 0.5;
    } else if (BlocklyGames.LEVEL === 3) {
        GasesGame.item5.input.draggable = false;
        GasesGame.item5.alpha = 0.5;
        // } else if (BlocklyGames.LEVEL === 4) {
        GasesGame.item6.input.draggable = false;
        GasesGame.item6.alpha = 0.5;
        GasesGame.item7.input.draggable = false;
        GasesGame.item7.alpha = 0.5;
    }
    // $("#game_gases").empty();
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }
    var runButton = document.getElementById('runButton');
    runButton.style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    BlocklyGames.workspace.highlightBlock(null);
    Gases.reset(false);
    // Gases.levelHelp();
};

/**
 * Inject the Gases API into a JavaScript interpreter.
 * @param {!Interpreter} interpreter The JS Interpreter.
 * @param {!Interpreter.Object} scope Global scope.
 */
Gases.initInterpreter = function (interpreter, scope) {
    // API
    var wrapper;
    wrapper = function (id) {
        Gases.move(0, id);
    };
    interpreter.setProperty(scope, 'moveForward',
        interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
        Gases.move(2, id);
    };
    interpreter.setProperty(scope, 'moveBackward',
        interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
        Gases.turn(0, id);
    };
    interpreter.setProperty(scope, 'turnLeft',
        interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
        Gases.turn(1, id);
    };
    interpreter.setProperty(scope, 'turnRight',
        interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
        return Gases.isPath(0, id);
    };
    interpreter.setProperty(scope, 'isPathForward',
        interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
        return Gases.isPath(1, id);
    };
    interpreter.setProperty(scope, 'isPathRight',
        interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
        return Gases.isPath(2, id);
    };
    interpreter.setProperty(scope, 'isPathBackward',
        interpreter.createNativeFunction(wrapper));
    wrapper = function (id) {
        return Gases.isPath(3, id);
    };
    interpreter.setProperty(scope, 'isPathLeft',
        interpreter.createNativeFunction(wrapper));
    wrapper = function () {
        return Gases.notDone();
    };
    interpreter.setProperty(scope, 'notDone',
        interpreter.createNativeFunction(wrapper));
};

/**
 * Execute the user's code.  Heaven help us...
 */
Gases.execute = function () {

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        setTimeout(Gases.execute, 250);
        return;
    }

    Gases.log = [];
    Blockly.selected && Blockly.selected.unselect();
    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    Gases.result = Gases.ResultType.UNSET;
    var interpreter = new Interpreter(code, Gases.initInterpreter);

    // Try running the user's code.  There are four possible outcomes:
    // 1. If pegman reaches the finish [SUCCESS], true is thrown.
    // 2. If the program is terminated due to running too long [TIMEOUT],
    //    false is thrown.
    // 3. If another error occurs [ERROR], that error is thrown.
    // 4. If the program ended normally but without solving the gases [FAILURE],
    //    no error or exception is thrown.
    try {
        var ticks = 10000;  // 10k ticks runs Pegman for about 8 minutes.
        while (interpreter.step()) {
            if (ticks-- == 0) {
                throw Infinity;
            }
        }
        Gases.result = Gases.notDone() ?
            Gases.ResultType.FAILURE : Gases.ResultType.SUCCESS;
    } catch (e) {
        // A boolean is thrown for normal termination.
        // Abnormal termination is a user error.
        if (e === Infinity) {
            Gases.result = Gases.ResultType.TIMEOUT;
        } else if (e === false) {
            Gases.result = Gases.ResultType.ERROR;
        } else {
            // Syntax error, can't happen.
            Gases.result = Gases.ResultType.ERROR;
            alert(e);
        }
    }

    // If all items are collected set ITEMSCOLLECTED to True
    if (Gases.ITEM1 && Gases.ITEM2 && Gases.ITEM3 && Gases.ITEM4 && Gases.ITEM5 && Gases.ITEM6 && Gases.ITEM6 && Gases.ITEM7) {
        Gases.ITEMSCOLLECTED = true;
    }

    // Fast animation if execution is successful.  Slow otherwise.
    if (Gases.result === Gases.ResultType.SUCCESS) {
        Gases.stepSpeed = 100;
        Gases.log.push(['finish', null]);
    } else {
        Gases.stepSpeed = 50;
    }

    // Gases.log now contains a transcript of all the user's actions.
    // Reset the gases and animate the transcript.
    Gases.reset(false);
    Gases.pidList.push(setTimeout(Gases.animate, 100));
};

/**
 * Iterate through the recorded path and animate pegman's actions.
 */
Gases.animate = function () {
    var action = Gases.log.shift();
    if (!action) {
        BlocklyInterface.highlight(null);
        // Gases.levelHelp();
        return;
    }
    BlocklyInterface.highlight(action[1]);

    switch (action[0]) {
        case 'north':
            Gases.schedule([Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4],
                [Gases.pegmanX, Gases.pegmanY - 1, Gases.pegmanD * 4]);
            Gases.pegmanY--;
            break;
        case 'east':
            Gases.schedule([Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4],
                [Gases.pegmanX + 1, Gases.pegmanY, Gases.pegmanD * 4]);
            Gases.pegmanX++;
            break;
        case 'south':
            Gases.schedule([Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4],
                [Gases.pegmanX, Gases.pegmanY + 1, Gases.pegmanD * 4]);
            Gases.pegmanY++;
            break;
        case 'west':
            Gases.schedule([Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4],
                [Gases.pegmanX - 1, Gases.pegmanY, Gases.pegmanD * 4]);
            Gases.pegmanX--;
            break;
        case 'look_north':
            Gases.scheduleLook(Gases.DirectionType.NORTH);
            break;
        case 'look_east':
            Gases.scheduleLook(Gases.DirectionType.EAST);
            break;
        case 'look_south':
            Gases.scheduleLook(Gases.DirectionType.SOUTH);
            break;
        case 'look_west':
            Gases.scheduleLook(Gases.DirectionType.WEST);
            break;
        case 'fail_forward':
            Gases.scheduleFail(true);
            break;
        case 'fail_backward':
            Gases.scheduleFail(false);
            break;
        case 'left':
            Gases.schedule([Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4],
                [Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4 - 4]);
            Gases.pegmanD = Gases.constrainDirection4(Gases.pegmanD - 1);
            break;
        case 'right':
            Gases.schedule([Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4],
                [Gases.pegmanX, Gases.pegmanY, Gases.pegmanD * 4 + 4]);
            Gases.pegmanD = Gases.constrainDirection4(Gases.pegmanD + 1);
            break;
        case 'finish':
            Gases.scheduleFinish(true);
            BlocklyInterface.saveToLocalStorage();
            if (BlocklyGames.LEVEL === 3) {
                setTimeout(BlocklyDialogs.congratulationsPartsCollected, 1000);
                Gases.fixMachine();
            } else {
                setTimeout(BlocklyDialogs.congratulations, 1000);
            }

    }

    if (action[0] == 'item1') {
        document.getElementById('item1').style.display = 'none';
        BlocklyGames.workspace.getAudioManager().play('tool_collection', 0.5);

        GasesGame.item3.input.draggable = true;
        GasesGame.item3.alpha = 1;
    }
    if (action[0] == 'item2') {
        document.getElementById('item2').style.display = 'none';
        BlocklyGames.workspace.getAudioManager().play('tool_collection', 0.5);

        GasesGame.item2.input.draggable = true;
        GasesGame.item2.alpha = 1;
    }
    if (action[0] == 'item3') {
        document.getElementById('item3').style.display = 'none';
        BlocklyGames.workspace.getAudioManager().play('tool_collection', 0.5);

        GasesGame.item1.input.draggable = true;
        GasesGame.item1.alpha = 1;
    }
    if (action[0] == 'item4') {
        document.getElementById('item4').style.display = 'none';
        BlocklyGames.workspace.getAudioManager().play('tool_collection', 0.5);

        GasesGame.item4.input.draggable = true;
        GasesGame.item4.alpha = 1;
    }
    if (action[0] == 'item5') {
        document.getElementById('item5').style.display = 'none';
        BlocklyGames.workspace.getAudioManager().play('tool_collection', 0.5);

        GasesGame.item5.input.draggable = true;
        GasesGame.item5.alpha = 1;
    }
    if (action[0] == 'item6') {
        document.getElementById('item6').style.display = 'none';
        BlocklyGames.workspace.getAudioManager().play('tool_collection', 0.5);

        GasesGame.item6.input.draggable = true;
        GasesGame.item6.alpha = 1;
    }
    if (action[0] == 'item7') {
        document.getElementById('item7').style.display = 'none';
        BlocklyGames.workspace.getAudioManager().play('tool_collection', 0.5);

        GasesGame.item7.input.draggable = true;
        GasesGame.item7.alpha = 1;
    }

    Gases.pidList.push(setTimeout(Gases.animate, Gases.stepSpeed * 5));
};

/**
 * Last level to assemble all the parts collected before.
 */
Gases.fixMachine = function () {
    // $('#blockly').remove();
    // $("#blockly").attr("disabled", "disabled").off('click');
    // $('#svgGases').remove();
    // $('#runButton').remove();
    // $('#game_gases').css("zoom", "150%");

    // GasesGame.gameResize();
};

/**
 * Point the congratulations Pegman to face the mouse.
 * @param {Event} e Mouse move event.
 * @private
 */
Gases.updatePegSpin_ = function (e) {
    if (document.getElementById('dialogDone').className ==
        'dialogHiddenContent') {
        return;
    }
    var pegSpin = document.getElementById('pegSpin');
    var bBox = BlocklyDialogs.getBBox_(pegSpin);
    var x = bBox.x + bBox.width / 2 - window.pageXOffset;
    var y = bBox.y + bBox.height / 2 - window.pageYOffset;
    var dx = e.clientX - x;
    var dy = e.clientY - y;
    var angle = Math.atan(dy / dx);
    // Convert from radians to degrees because I suck at math.
    angle = angle / Math.PI * 180;
    // 0: North, 90: East, 180: South, 270: West.
    if (dx > 0) {
        angle += 90;
    } else {
        angle += 270;
    }
    // Divide into 16 quads.
    var quad = Math.round(angle / 360 * 16);
    if (quad == 16) {
        quad = 15;
    }
    // Display correct Pegman sprite.
    pegSpin.style.backgroundPosition = (-quad * Gases.PEGMAN_WIDTH) + 'px 0px';
};

/**
 * Schedule the animations for a move or turn.
 * @param {!Array.<number>} startPos X, Y and direction starting points.
 * @param {!Array.<number>} endPos X, Y and direction ending points.
 */
Gases.schedule = function (startPos, endPos) {
    var deltas = [(endPos[0] - startPos[0]) / 4,
        (endPos[1] - startPos[1]) / 4,
        (endPos[2] - startPos[2]) / 4];
    Gases.displayPegman(startPos[0] + deltas[0],
        startPos[1] + deltas[1],
        Gases.constrainDirection16(startPos[2] + deltas[2]));
    Gases.pidList.push(setTimeout(function () {
        Gases.displayPegman(startPos[0] + deltas[0] * 2,
            startPos[1] + deltas[1] * 2,
            Gases.constrainDirection16(startPos[2] + deltas[2] * 2));
    }, Gases.stepSpeed));
    Gases.pidList.push(setTimeout(function () {
        Gases.displayPegman(startPos[0] + deltas[0] * 3,
            startPos[1] + deltas[1] * 3,
            Gases.constrainDirection16(startPos[2] + deltas[2] * 3));
    }, Gases.stepSpeed * 2));
    Gases.pidList.push(setTimeout(function () {
        Gases.displayPegman(endPos[0], endPos[1],
            Gases.constrainDirection16(endPos[2]));
    }, Gases.stepSpeed * 3));
};

/**
 * Schedule the animations and sounds for a failed move.
 * @param {boolean} forward True if forward, false if backward.
 */
Gases.scheduleFail = function (forward) {
    var deltaX = 0;
    var deltaY = 0;
    switch (Gases.pegmanD) {
        case Gases.DirectionType.NORTH:
            deltaY = -1;
            break;
        case Gases.DirectionType.EAST:
            deltaX = 1;
            break;
        case Gases.DirectionType.SOUTH:
            deltaY = 1;
            break;
        case Gases.DirectionType.WEST:
            deltaX = -1;
            break;
    }
    if (!forward) {
        deltaX = -deltaX;
        deltaY = -deltaY;
    }
    if (Gases.SKIN.crashType == Gases.CRASH_STOP) {
        // Bounce bounce.
        deltaX /= 4;
        deltaY /= 4;
        var direction16 = Gases.constrainDirection16(Gases.pegmanD * 4);
        Gases.displayPegman(Gases.pegmanX + deltaX,
            Gases.pegmanY + deltaY,
            direction16);
        BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
        Gases.pidList.push(setTimeout(function () {
            Gases.displayPegman(Gases.pegmanX,
                Gases.pegmanY,
                direction16);
        }, Gases.stepSpeed));
        Gases.pidList.push(setTimeout(function () {
            Gases.displayPegman(Gases.pegmanX + deltaX,
                Gases.pegmanY + deltaY,
                direction16);
            BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
        }, Gases.stepSpeed * 2));
        Gases.pidList.push(setTimeout(function () {
            Gases.displayPegman(Gases.pegmanX, Gases.pegmanY, direction16);
        }, Gases.stepSpeed * 3));
    } else {
        // Add a small random delta away from the grid.
        var deltaZ = (Math.random() - 0.5) * 10;
        var deltaD = (Math.random() - 0.5) / 2;
        deltaX += (Math.random() - 0.5) / 4;
        deltaY += (Math.random() - 0.5) / 4;
        deltaX /= 8;
        deltaY /= 8;
        var acceleration = 0;
        if (Gases.SKIN.crashType == Gases.CRASH_FALL) {
            acceleration = 0.01;
        }
        Gases.pidList.push(setTimeout(function () {
            BlocklyGames.workspace.getAudioManager().play('fail', 0.5);
        }, Gases.stepSpeed * 2));
        var setPosition = function (n) {
            return function () {
                var direction16 = Gases.constrainDirection16(Gases.pegmanD * 4 +
                    deltaD * n);
                Gases.displayPegman(Gases.pegmanX + deltaX * n,
                    Gases.pegmanY + deltaY * n,
                    direction16,
                    deltaZ * n);
                deltaY += acceleration;
            };
        };
        // 100 frames should get Pegman offscreen.
        for (var i = 1; i < 100; i++) {
            Gases.pidList.push(setTimeout(setPosition(i),
                Gases.stepSpeed * i / 2));
        }
    }
};

/**
 * Schedule the animations and sound for a victory dance.
 * @param {boolean} sound Play the victory sound.
 */
Gases.scheduleFinish = function (sound) {
    var direction16 = Gases.constrainDirection16(Gases.pegmanD * 4);
    Gases.displayPegman(Gases.pegmanX, Gases.pegmanY, 16);
    if (sound) {
        BlocklyGames.workspace.getAudioManager().play('win', 0.5);
    }
    Gases.stepSpeed = 150;  // Slow down victory animation a bit.
    Gases.pidList.push(setTimeout(function () {
        Gases.displayPegman(Gases.pegmanX, Gases.pegmanY, 18);
    }, Gases.stepSpeed));
    Gases.pidList.push(setTimeout(function () {
        Gases.displayPegman(Gases.pegmanX, Gases.pegmanY, 16);
    }, Gases.stepSpeed * 2));
    Gases.pidList.push(setTimeout(function () {
        Gases.displayPegman(Gases.pegmanX, Gases.pegmanY, direction16);
    }, Gases.stepSpeed * 3));
};

/**
 * Display Pegman at the specified location, facing the specified direction.
 * @param {number} x Horizontal grid (or fraction thereof).
 * @param {number} y Vertical grid (or fraction thereof).
 * @param {number} d Direction (0 - 15) or dance (16 - 17).
 * @param {number=} opt_angle Optional angle (in degrees) to rotate Pegman.
 */
Gases.displayPegman = function (x, y, d, opt_angle) {
    var pegmanIcon = document.getElementById('pegman');
    pegmanIcon.setAttribute('x',
        x * Gases.SQUARE_SIZE - d * Gases.PEGMAN_WIDTH + 1);
    pegmanIcon.setAttribute('y',
        Gases.SQUARE_SIZE * (y + 0.5) - Gases.PEGMAN_HEIGHT / 2 - 8);
    if (opt_angle) {
        pegmanIcon.setAttribute('transform', 'rotate(' + opt_angle + ', ' +
            (x * Gases.SQUARE_SIZE + Gases.SQUARE_SIZE / 2) + ', ' +
            (y * Gases.SQUARE_SIZE + Gases.SQUARE_SIZE / 2) + ')');
    } else {
        pegmanIcon.setAttribute('transform', 'rotate(0, 0, 0)');
    }

    var clipRect = document.getElementById('clipRect');
    clipRect.setAttribute('x', x * Gases.SQUARE_SIZE + 1);
    clipRect.setAttribute('y', pegmanIcon.getAttribute('y'));
};

/**
 * Display the look icon at Pegman's current location,
 * in the specified direction.
 * @param {!Gases.DirectionType} d Direction (0 - 3).
 */
Gases.scheduleLook = function (d) {
    var x = Gases.pegmanX;
    var y = Gases.pegmanY;
    switch (d) {
        case Gases.DirectionType.NORTH:
            x += 0.5;
            break;
        case Gases.DirectionType.EAST:
            x += 1;
            y += 0.5;
            break;
        case Gases.DirectionType.SOUTH:
            x += 0.5;
            y += 1;
            break;
        case Gases.DirectionType.WEST:
            y += 0.5;
            break;
    }
    x *= Gases.SQUARE_SIZE;
    y *= Gases.SQUARE_SIZE;
    var deg = d * 90 - 45;

    var lookIcon = document.getElementById('look');
    lookIcon.setAttribute('transform',
        'translate(' + x + ', ' + y + ') ' +
        'rotate(' + deg + ' 0 0) scale(.4)');
    var paths = lookIcon.getElementsByTagName('path');
    lookIcon.style.display = 'inline';
    for (var i = 0, path; (path = paths[i]); i++) {
        Gases.scheduleLookStep(path, Gases.stepSpeed * i);
    }
};

/**
 * Schedule one of the 'look' icon's waves to appear, then disappear.
 * @param {!Element} path Element to make appear.
 * @param {number} delay Milliseconds to wait before making wave appear.
 */
Gases.scheduleLookStep = function (path, delay) {
    Gases.pidList.push(setTimeout(function () {
        path.style.display = 'inline';
        setTimeout(function () {
            path.style.display = 'none';
        }, Gases.stepSpeed * 2);
    }, delay));
};

/**
 * Keep the direction within 0-3, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Gases.constrainDirection4 = function (d) {
    d = Math.round(d) % 4;
    if (d < 0) {
        d += 4;
    }
    return d;
};

/**
 * Keep the direction within 0-15, wrapping at both ends.
 * @param {number} d Potentially out-of-bounds direction value.
 * @return {number} Legal direction value.
 */
Gases.constrainDirection16 = function (d) {
    d = Math.round(d) % 16;
    if (d < 0) {
        d += 16;
    }
    return d;
};

// Core functions.

/**
 * Attempt to move pegman forward or backward.
 * @param {number} direction Direction to move (0 = forward, 2 = backward).
 * @param {string} id ID of block that triggered this action.
 * @throws {true} If the end of the gases is reached.
 * @throws {false} If Pegman collides with a wall.
 */
Gases.move = function (direction, id) {
    if (!Gases.isPath(direction, null)) {
        Gases.log.push(['fail_' + (direction ? 'backward' : 'forward'), id]);
        throw false;
    }
    // If moving backward, flip the effective direction.
    var effectiveDirection = Gases.pegmanD + direction;
    var command;

    switch (Gases.constrainDirection4(effectiveDirection)) {
        case Gases.DirectionType.NORTH:
            Gases.pegmanY--;
            command = 'north';
            break;
        case Gases.DirectionType.EAST:
            Gases.pegmanX++;
            command = 'east';
            break;
        case Gases.DirectionType.SOUTH:
            Gases.pegmanY++;
            command = 'south';
            break;
        case Gases.DirectionType.WEST:
            Gases.pegmanX--;
            command = 'west';
            break;
    }
    Gases.log.push([command, id]);

    // console.log('px:'+Gases.pegmanX);
    // console.log('py:'+Gases.pegmanY);
    //
    // console.log('ix:'+Gases.item5_.x);
    // console.log('iy:'+Gases.item5_.y);
    if (BlocklyGames.LEVEL === 1) {
        if (Gases.pegmanX === Gases.item1_.x && Gases.pegmanY === Gases.item1_.y) {
            Gases.ITEM1 = true;
            Gases.log.push(['item1', id]);
        }
        if (Gases.pegmanX === Gases.item2_.x && Gases.pegmanY === Gases.item2_.y) {
            Gases.ITEM2 = true;
            Gases.log.push(['item2', id]);
        }
    } else if (BlocklyGames.LEVEL === 2) {
        if (Gases.pegmanX === Gases.item3_.x && Gases.pegmanY === Gases.item3_.y) {
            Gases.ITEM3 = true;
            Gases.log.push(['item3', id]);
        }
        if (Gases.pegmanX === Gases.item4_.x && Gases.pegmanY === Gases.item4_.y) {
            Gases.ITEM4 = true;
            Gases.log.push(['item4', id]);
        }
    } else if (BlocklyGames.LEVEL === 3) {
        if (Gases.pegmanX === Gases.item5_.x && Gases.pegmanY === Gases.item5_.y) {
            Gases.ITEM5 = true;
            Gases.log.push(['item5', id]);
        }
        // } else if (BlocklyGames.LEVEL === 4) {
        if (Gases.pegmanX === Gases.item6_.x && Gases.pegmanY === Gases.item6_.y) {
            Gases.ITEM6 = true;
            Gases.log.push(['item6', id]);
        }
        if (Gases.pegmanX === Gases.item7_.x && Gases.pegmanY === Gases.item7_.y) {
            Gases.ITEM7 = true;
            Gases.log.push(['item7', id]);
        }
    }
};

/**
 * Turn pegman left or right.
 * @param {number} direction Direction to turn (0 = left, 1 = right).
 * @param {string} id ID of block that triggered this action.
 */
Gases.turn = function (direction, id) {
    if (direction) {
        // Right turn (clockwise).
        Gases.pegmanD++;
        Gases.log.push(['right', id]);
    } else {
        // Left turn (counterclockwise).
        Gases.pegmanD--;
        Gases.log.push(['left', id]);
    }
    Gases.pegmanD = Gases.constrainDirection4(Gases.pegmanD);
};

/**
 * Is there a path next to pegman?
 * @param {number} direction Direction to look
 *     (0 = forward, 1 = right, 2 = backward, 3 = left).
 * @param {?string} id ID of block that triggered this action.
 *     Null if called as a helper function in Gases.move().
 * @return {boolean} True if there is a path.
 */
Gases.isPath = function (direction, id) {
    var effectiveDirection = Gases.pegmanD + direction;
    var square;
    var command;
    switch (Gases.constrainDirection4(effectiveDirection)) {
        case Gases.DirectionType.NORTH:
            square = Gases.map[Gases.pegmanY - 1] &&
                Gases.map[Gases.pegmanY - 1][Gases.pegmanX];
            command = 'look_north';
            break;
        case Gases.DirectionType.EAST:
            square = Gases.map[Gases.pegmanY][Gases.pegmanX + 1];
            command = 'look_east';
            break;
        case Gases.DirectionType.SOUTH:
            square = Gases.map[Gases.pegmanY + 1] &&
                Gases.map[Gases.pegmanY + 1][Gases.pegmanX];
            command = 'look_south';
            break;
        case Gases.DirectionType.WEST:
            square = Gases.map[Gases.pegmanY][Gases.pegmanX - 1];
            command = 'look_west';
            break;
    }
    if (id) {
        Gases.log.push([command, id]);
    }
    return square !== Gases.SquareType.WALL && square !== undefined;
};

/**
 * Is the player at the finish marker?
 * @return {boolean} True if not done, false if done.
 */
Gases.notDone = function () {
    return Gases.pegmanX != Gases.finish_.x || Gases.pegmanY != Gases.finish_.y;
};

window.addEventListener('load', Gases.init);


// document.getElementById("game_gases").appendChild(fileref);
// var div = document.getElementById('game_gases');
// div.innerHTML += fileref;

// fileref.game.stopDrag('img7Copy', this.img7);
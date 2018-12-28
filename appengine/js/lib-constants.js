/**
 * Blockly Games: JavaScript Blocks
 *
 * Copyright 2016 Google Inc.
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
 * @fileoverview Constant for Colors and other things.
 * Will define three type of color scheme initially.
 * @author arslanarshad07@gmail.com (Arslan Arshad)
 */
'use strict';

goog.provide('Constants');

goog.require('BlocklyGames')


Constants = {};


Constants.ColorScheme = BlocklyGames.getStringParamFromUrl('scheme', 'initial');


Constants.Color = [];


switch (Constants.ColorScheme) {
    case 'initialGrades':
        Constants.Color["bgColor"] = '#fff';
        Constants.Color["bgColorSecondary"] = '#F5E6CC';
        Constants.Color["blocksColor1"] = '#A64AC9';
        Constants.Color["blocksColor2"] = '#FCCD04';
        Constants.Color["blocksColor3"] = '#17E9E0';
        Constants.Color["accentColor"] = '#fd6d27';
        Constants.Color["levelLinkColor"] = '#17E9E0';
        break;
    case 'midGrades':
        Constants.Color["bgColor"] = '#ECECEC';
        Constants.Color["bgColorSecondary"] = '#90CCF4';
        Constants.Color["blocksColor1"] = '#F3D250';
        Constants.Color["blocksColor2"] = '#F78888';
        Constants.Color["blocksColor3"] = '#5DA2D5';
        Constants.Color["accentColor"] = '#5DA2D5';
        Constants.Color["levelLinkColor"] = '#5DA2D5';

        break;
    default:
        Constants.Color["bgColor"] = '#ECECEC';
        Constants.Color["bgColorSecondary"] = '#90CCF4';
        Constants.Color["blocksColor1"] = '#F3D250';
        Constants.Color["blocksColor2"] = '#F78888';
        Constants.Color["blocksColor3"] = '#5DA2D5';
        Constants.Color["accentColor"] = '#5DA2D5';
        Constants.Color["levelLinkColor"] = '#5DA2D5';

        break;
}
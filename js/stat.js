'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var HEXAGRAM_DISTANCE = 50;
var HEXAGRAM_WIDTH = 40;
var HEXAGRAM_MAX_HEIGHT = 150;
var HEXAGRAM_FIRST_X = 120;
var TIME_OFFSET = -10;
var NAME_OFFSET = 16;
var COLUMN_OFFSET = 90;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getIndexOfYou = function (names) {
  var yourIndex;
  while (yourIndex === undefined) {
    for (var i = 0; i < names.length; i++) {
      if (names[i] === 'Вы') {
        yourIndex = i;
      }
    }
  }
  return yourIndex;
};

var sortArrays = function (names, times) {
  var yourIndex = getIndexOfYou(names);
  if (yourIndex !== 0) {
    var tempVarName = names[0];
    var tempVarTime = times[0];
    names[0] = names[yourIndex];
    times[0] = times[yourIndex];
    names[yourIndex] = tempVarName;
    times[yourIndex] = tempVarTime;
  }
};

var drawColumn = function (ctx, x, y, height, color) {
  ctx.fillStyle = color; // 'rgba(255, 0, 0, 1)';
  ctx.fillRect(x, y, HEXAGRAM_WIDTH, height);
};

var getBlueColors = function () {
  var color = 'hsl(240, ' + (getRandomInt(0, 100)).toString() + '%, 25%)';
  return color;
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var getMaxTime = function (times) {
  var max = times[0];
  for (var i = 1; i < times.length; i++) {
    if (max < times[i]) {
      max = times[i];
    }
  }
  return max;
};


var calculateColumnHeight = function (maxTime, value) {
  var hexagramHeight = HEXAGRAM_MAX_HEIGHT * value / maxTime;
  return hexagramHeight;
};

var calculateColumnY = function (maxTime, value) {
  var hexHeight = calculateColumnHeight(maxTime, value);
  var hexY = HEXAGRAM_MAX_HEIGHT - hexHeight + COLUMN_OFFSET;
  return hexY;
};

var drawTime = function (ctx, x, y, value) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(Math.round(value), x, y);
};

var drawName = function (ctx, x, y, value) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText(value, x, y);
};

var drawHexagram = function (ctx, maxTime, times, names) {
  for (var i = 0; i < times.length; i++) {
    var height = calculateColumnHeight(maxTime, times[i]);
    var x = HEXAGRAM_FIRST_X + (HEXAGRAM_WIDTH + HEXAGRAM_DISTANCE) * i;
    var y = calculateColumnY(maxTime, times[i]);
    var columnColor = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getBlueColors();
    drawColumn(ctx, x, y, height, columnColor);
    drawTime(ctx, x, y + TIME_OFFSET, times[i]);
    drawName(ctx, x, y + height + NAME_OFFSET, names[i]);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 120, 50);
  ctx.fillText('Список результатов:', 120, 66);
  var maxTime = getMaxTime(times);
  sortArrays(names, times);
  drawHexagram(ctx, maxTime, times, names);
};

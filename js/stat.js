'use strict';

var BACKGROUND_SHADOW_OFFSET = 10;
var barProperties = {
  BOTTOM: 250,
  GAP: 50,
  HEIGHT: 150,
  MIN_HEIGHT: 30,
  WIDTH: 40
};
var statisticBackgroundProperties = {
  HEIGHT: 270,
  WIDTH: 420,
  OFFSETX: 100,
  OFFSETY: 20
};
var textProperties = {
  GAP: 12,
  FONT: '16px PT mono'
};
var ColorEnum = {
  TEXT: '#303030',
  RED: '#ff0000',
  WHITE: 'rgb(255, 255, 255)',
  SHADOW: 'rgba(0, 0, 0, 0.7)'
};


function getRandomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function renderPlayerName(ctx, obj, color) {
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(obj.name, statisticBackgroundProperties.OFFSETX + barProperties.GAP * (obj.order + 1) + barProperties.WIDTH * obj.order, barProperties.BOTTOM + textProperties.GAP);
}

function renderPlayerScore(ctx, obj, color) {
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(obj.score, statisticBackgroundProperties.OFFSETX + barProperties.GAP * (obj.order + 1) + barProperties.WIDTH * obj.order, barProperties.BOTTOM - obj.columnHeight - textProperties.GAP);
}

function renderResultBar(ctx, obj) {
  ctx.fillStyle = obj.renderColor;
  ctx.fillRect(statisticBackgroundProperties.OFFSETX + barProperties.GAP * (obj.order + 1) + barProperties.WIDTH * obj.order, barProperties.BOTTOM, barProperties.WIDTH, -obj.columnHeight);
}

function renderStatisticBackground(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, statisticBackgroundProperties.WIDTH, statisticBackgroundProperties.HEIGHT);
}

function writeTitle(ctx, text, color, lineNumber) {
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  ctx.fillText(text, statisticBackgroundProperties.OFFSETX + textProperties.GAP * 2, statisticBackgroundProperties.OFFSETY + textProperties.GAP * lineNumber);
}

function getRandomBlueHSL() {
  return 'hsl(240, ' + getRandomInteger(100) + '%, 50%, 1)';
}

function calcBarHeight(score, minScore, maxScore, minHeight) {
  return Math.round((barProperties.HEIGHT - minHeight) * ((score - minScore) / (maxScore - minScore))) + minHeight;
}

window.renderStatistics = function (ctx, players, scores) {
  var maxScore = Math.round(Math.max.apply(null, scores));
  var minScore = Math.round(Math.min.apply(null, scores));
  ctx.font = textProperties.FONT;
  renderStatisticBackground(ctx, statisticBackgroundProperties.OFFSETX + BACKGROUND_SHADOW_OFFSET, statisticBackgroundProperties.OFFSETY + BACKGROUND_SHADOW_OFFSET, ColorEnum.SHADOW);
  renderStatisticBackground(ctx, statisticBackgroundProperties.OFFSETX, statisticBackgroundProperties.OFFSETY, ColorEnum.WHITE);

  for (var i = 0; i < players.length; i++) {
    var columnHeight = calcBarHeight(scores[i], minScore, maxScore, barProperties.MIN_HEIGHT);
    var renderColor = players[i] === 'Вы' ? renderColor = ColorEnum.RED : getRandomBlueHSL();
    var player = {name: players[i], score: Math.round(scores[i]), columnHeight: columnHeight, renderColor: renderColor, order: i};

    renderResultBar(ctx, player);
    renderPlayerName(ctx, player, ColorEnum.TEXT);
    renderPlayerScore(ctx, player, ColorEnum.TEXT);
  }

  writeTitle(ctx, 'Ура вы победили!', ColorEnum.TEXT, 1);
  writeTitle(ctx, 'Список результатов:', ColorEnum.TEXT, 3);
};

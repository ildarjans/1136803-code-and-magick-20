'use strict';

var barProperties = {
  bottom: 250,
  gap: 50,
  height: 150,
  minHeight: 30,
  width: 40
};
var statisticBackgroundProperties = {
  height: 270,
  width: 420,
  offsetX: 100,
  offsetY: 20
};
var textProperties = {
  gap: 12,
  font: '16px PT mono'
};
var ColorEnum = {
  text: '#303030',
  red: '#ff0000',
  white: 'rgb(255, 255, 255)',
  shadow: 'rgba(0, 0, 0, 0.7)'
};
var BACKGROUND_SHADOW_OFFSET = 10;

function getRandomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function renderPlayerName(ctx, obj, color) {
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(obj.name, statisticBackgroundProperties.offsetX + barProperties.gap * (obj.order + 1) + barProperties.width * obj.order, barProperties.bottom + textProperties.gap);
}

function renderPlayerScore(ctx, obj, color) {
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(obj.score, statisticBackgroundProperties.offsetX + barProperties.gap * (obj.order + 1) + barProperties.width * obj.order, barProperties.bottom - obj.columnHeight - textProperties.gap);
}

function renderResultBar(ctx, obj) {
  ctx.fillStyle = obj.renderColor;
  ctx.fillRect(statisticBackgroundProperties.offsetX + barProperties.gap * (obj.order + 1) + barProperties.width * obj.order, barProperties.bottom, barProperties.width, -obj.columnHeight);
}

function renderStatisticBackground(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, statisticBackgroundProperties.width, statisticBackgroundProperties.height);
}

function writeTitle(ctx, text, color, lineNumber) {
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  ctx.fillText(text, statisticBackgroundProperties.offsetX + textProperties.gap * 2, statisticBackgroundProperties.offsetY + textProperties.gap * lineNumber);
}

function getRandomBlueHSL() {
  return 'hsl(240, ' + getRandomInteger(100) + '%, 50%, 1)';
}

function calcBarHeight(score, minScore, maxScore, minHeight) {
  return Math.round((barProperties.height - minHeight) * ((score - minScore) / (maxScore - minScore))) + minHeight;
}

window.renderStatistics = function (ctx, players, scores) {
  var maxScore = Math.round(Math.max.apply(null, scores));
  var minScore = Math.round(Math.min.apply(null, scores));
  ctx.font = textProperties.font;
  renderStatisticBackground(ctx, statisticBackgroundProperties.offsetX + BACKGROUND_SHADOW_OFFSET, statisticBackgroundProperties.offsetY + BACKGROUND_SHADOW_OFFSET, ColorEnum.shadow);
  renderStatisticBackground(ctx, statisticBackgroundProperties.offsetX, statisticBackgroundProperties.offsetY, ColorEnum.white);

  for (var i = 0; i < players.length; i++) {
    var columnHeight = calcBarHeight(scores[i], minScore, maxScore, barProperties.minHeight);
    var renderColor = players[i] === 'Вы' ? renderColor = ColorEnum.red : getRandomBlueHSL();
    var player = {name: players[i], score: Math.round(scores[i]), columnHeight: columnHeight, renderColor: renderColor, order: i};

    renderResultBar(ctx, player);
    renderPlayerName(ctx, player, ColorEnum.text);
    renderPlayerScore(ctx, player, ColorEnum.text);
  }

  writeTitle(ctx, 'Ура вы победили!', ColorEnum.text, 1);
  writeTitle(ctx, 'Список результатов:', ColorEnum.text, 3);
};

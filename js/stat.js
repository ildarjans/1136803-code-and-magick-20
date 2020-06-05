'use strict';

var BAR = {BOTTOM: 250, GAP: 50, HEIGHT: 150, MIN_HEIGHT: 30, WIDTH: 40};
var CLOUD = {HEIGHT: 270, WIDTH: 420, OFFSETX: 100, OFFSETY: 20};
var TEXT = {GAP: 12, FONT: '16px PT mono'};
var COLOR = {DARK: '#303030', RED: '#ff0000', WHITE: 'rgb(255, 255, 255)', SHADOW_DARK: 'rgba(0, 0, 0, 0.7)'};

function randIntUntil(max) {
  var ans = Math.floor(Math.random() * (max + 1));
  return ans;
}

function renderPlayerName(ctx, obj, color) {
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(obj.name, CLOUD.OFFSETX + BAR.GAP * (obj.order + 1) + BAR.WIDTH * obj.order, BAR.BOTTOM + TEXT.GAP);
}

function renderPlayerScore(ctx, obj, color) {
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.fillText(obj.score, CLOUD.OFFSETX + BAR.GAP * (obj.order + 1) + BAR.WIDTH * obj.order, BAR.BOTTOM - obj.columnHeight - TEXT.GAP);
}

function renderResultBar(ctx, obj) {
  ctx.fillStyle = obj.renderColor;
  ctx.fillRect(CLOUD.OFFSETX + BAR.GAP * (obj.order + 1) + BAR.WIDTH * obj.order, BAR.BOTTOM, BAR.WIDTH, -obj.columnHeight);
}

function renderStatisticBackground(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.WIDTH, CLOUD.HEIGHT);
}

function writeTitle(ctx, text, color, lineNumber) {
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = color;
  ctx.fillText(text, CLOUD.OFFSETX + TEXT.GAP * 2, CLOUD.OFFSETY + TEXT.GAP * lineNumber);
}

function getRandomBlueHSL() {
  return 'hsl(240, ' + randIntUntil(100) + '%, 50%, 1)';
}

function calcBarHeight(score, minScore, maxScore, minHeight) {
  return Math.round((BAR.HEIGHT - minHeight) * ((score - minScore) / (maxScore - minScore))) + minHeight;
}

window.renderStatistics = function (ctx, players, scores) {
  var maxScore = Math.round(Math.max.apply(null, scores));
  var minScore = Math.round(Math.min.apply(null, scores));
  ctx.font = TEXT.FONT;
  renderStatisticBackground(ctx, CLOUD.OFFSETX + 10, CLOUD.OFFSETY + 10, COLOR.SHADOW_DARK);
  renderStatisticBackground(ctx, CLOUD.OFFSETX, CLOUD.OFFSETY, COLOR.WHITE);

  for (var i = 0; i < players.length; i++) {
    var columnHeight = calcBarHeight(scores[i], minScore, maxScore, BAR.MIN_HEIGHT);
    var renderColor = players[i] === 'Вы' ? renderColor = COLOR.RED : getRandomBlueHSL();
    var player = {name: players[i], score: Math.round(scores[i]), columnHeight: columnHeight, renderColor: renderColor, order: i};

    renderResultBar(ctx, player);
    renderPlayerName(ctx, player, COLOR.DARK);
    renderPlayerScore(ctx, player, COLOR.DARK);
  }

  writeTitle(ctx, 'Ура вы победили!', COLOR.DARK, 1);
  writeTitle(ctx, 'Список результатов:', COLOR.DARK, 3);
};

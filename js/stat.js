'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_OFFSETX = 100;
var CLOUD_OFFSETY = 20;
var BAR_BOTTOM = 250;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var TEXT_GAP = 16;
var TEXT_FONT = '16px PT mono';

function randomInt(min, max) {
  var ans = min + Math.floor(Math.random() * (max + 1 - min));
  return ans;
}

function renderBarsAndTheirNamesAndScores(ctx, results, textColor) {
  for (var i = 0; i < results.length; i++) {
    ctx.fillStyle = results[i].renderColor;
    ctx.fillRect(CLOUD_OFFSETX + BAR_GAP * (i + 1) + BAR_WIDTH * i, BAR_BOTTOM, BAR_WIDTH, -results[i].columnHeight);
    ctx.textBaseline = 'middle';
    ctx.fillStyle = textColor;
    ctx.fillText(results[i].name, CLOUD_OFFSETX + BAR_GAP * (i + 1) + BAR_WIDTH * i, BAR_BOTTOM + TEXT_GAP);
    ctx.fillText(results[i].score, CLOUD_OFFSETX + BAR_GAP * (i + 1) + BAR_WIDTH * i, BAR_BOTTOM - results[i].columnHeight - TEXT_GAP);
  }
}

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function writeTitle(ctx, textColor) {
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = textColor;
  ctx.fillText('Ура вы победили!', CLOUD_OFFSETX + TEXT_GAP, CLOUD_OFFSETY + TEXT_GAP);
  ctx.fillText('Список результатов:', CLOUD_OFFSETX + TEXT_GAP, CLOUD_OFFSETY + TEXT_GAP * 2.5);
}

window.renderStatistics = function (ctx, players, scores) {
  var maxScore = Math.round(Math.max.apply(null, scores));
  var minScore = Math.round(Math.min.apply(null, scores));
  var resultReports = [];
  //Loop through input arrays, and store their data in common array 'resultReports'
  for (var i = 0; i < players.length; i++) {
    var columnHeight = Math.round((BAR_HEIGHT - 30) * ((scores[i] - minScore) / (maxScore - minScore))) + 30;
    var renderColor;
    if (players[i] === 'Вы') {
      renderColor = 'rgba(255, 0, 0, 1)';
    } else {
      var randAlpha = randomInt(1, 100);
      renderColor = 'hsl(240, ' + randAlpha + '%, 50%, 1)';
    }
    var player = {name: players[i], score: Math.round(scores[i]), columnHeight: columnHeight, renderColor: renderColor};
    resultReports.push(player);
  }
  ctx.font = TEXT_FONT;
  renderCloud(ctx, CLOUD_OFFSETX + 10, CLOUD_OFFSETY + 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_OFFSETX, CLOUD_OFFSETY, 'rgb(255, 255, 255)');
  writeTitle(ctx, '#303030');
  renderBarsAndTheirNamesAndScores(ctx, resultReports, '#303030');
};


// Максимальная высота гистограммы 150 пикселей.
// Ширина колонки 40 пикселей.
// Расстояние между колонками 50 пикселей.
// Цвет колонки игрока Выrgba(255, 0, 0, 1).
// Цвет колонок других игроков — синий, а насыщенность задаётся случайным образом.

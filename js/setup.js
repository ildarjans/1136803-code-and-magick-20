'use strict';

var playerNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var playerSurnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardInnerTemplateContent = document.querySelector('#similar-wizard-template')
                                .content.querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

setup.classList.remove('hidden');
renderSetupWindow(wizardInnerTemplateContent, 4);
setupSimilar.classList.remove('hidden');

function renderSetupWindow(wizardTemplate, qty) {
  var players = getShortRandomArray(playerNames, qty);
  var coats = getShortRandomArray(wizardCoatColors, qty);
  var eyes = getShortRandomArray(wizardEyesColors, qty);
  var fullNames = concatSurnamesWithExistingNames(playerNames, players, playerSurnames);
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < qty; i++) {
    var template = wizardTemplate.cloneNode(true);
    renderWizardName(template, fullNames[i], 'p.setup-similar-label');
    renderWizardColorDetail(template, coats[i], '.wizard .wizard-coat');
    renderWizardColorDetail(template, eyes[i], '.wizard .wizard-eyes');
    documentFragment.append(template);
  }
  setupSimilarList.append(documentFragment);
}

function getShortRandomArray(names, qty) {
  if (names.length < qty) {
    return undefined;
  }
  var randomNames = [];
  while (randomNames.length < qty) {
    var guess = names[getRandomInteger(names.length - 1)];
    if (randomNames.indexOf(guess) < 0) {
      randomNames.push(guess);
    }
  }
  return randomNames;
}

function concatSurnamesWithExistingNames(names, shortNames, surnames) {
  return shortNames.map(function (name) {
    return name + ' ' + surnames[names.indexOf(name)];
  });
}

function renderWizardName(template, name, selector) {
  template.querySelector(selector).textContent = name;
}

function renderWizardColorDetail(template, color, selector) {
  template.querySelector(selector).style.fill = color;
}

function getRandomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

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
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                .content.querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

renderSetupWindow(similarWizardTemplate, 4);
// setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');

function renderSetupWindow(wizardTemplate, quantity) {
  var players = getShuffledArray(playerNames, quantity);
  var coats = getShuffledArray(wizardCoatColors, quantity);
  var eyes = getShuffledArray(wizardEyesColors, quantity);
  var fullNames = concatSurnamesWithExistingNames(playerNames, players, playerSurnames);
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < quantity; i++) {
    var template = wizardTemplate.cloneNode(true);
    template.querySelector('p.setup-similar-label').textContent = fullNames[i];
    template.querySelector('.wizard .wizard-coat').style.fill = coats[i];
    template.querySelector('.wizard .wizard-eyes').style.fill = eyes[i];
    documentFragment.append(template);
  }
  setupSimilarList.append(documentFragment);
}

function getShuffledArray(array, quantity) {
  if (array.length < quantity) {
    return undefined;
  }
  quantity = !quantity ? array.length : quantity;
  var randomNames = [];
  while (randomNames.length < quantity) {
    var guess = array[getRandomInteger(array.length - 1)];

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

function getRandomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

// ######################################################
// #####               MODULE4-TASK1                #####
// ######################################################

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setup.querySelector('.setup-close');
var wizardCoat = setup.querySelector('.wizard .wizard-coat');
var wizardEyes = setup.querySelector('.wizard .wizard-eyes');
var fireballWrap = setup.querySelector('.setup-fireball-wrap');
var fireballInputColor = fireballWrap.querySelector('input');
var usernameInput = setup.querySelector('.setup-user-name');

setupOpenButton.addEventListener('click', function () {
  openSetupModal();
});

setupOpenButton.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    openSetupModal();
  }
});

setupCloseButton.addEventListener('click', closeSetupModal);

function openSetupModal() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', closeSetupEscapeHandler);
  fireballWrap.addEventListener('click', setFireballColor);
  setupCloseButton.addEventListener('keydown', closeSetupEnterHandler);
  wizardCoat.addEventListener('click', setWizardCoatColor);
  wizardEyes.addEventListener('click', setWizardEyesColor);
}

function closeSetupModal() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', closeSetupEscapeHandler);
  fireballWrap.removeEventListener('click', setFireballColor);
  setupCloseButton.removeEventListener('keydown', closeSetupEnterHandler);
  wizardCoat.removeEventListener('click', setWizardCoatColor);
  wizardEyes.removeEventListener('click', setWizardEyesColor);
}

function closeSetupEscapeHandler(event) {
  if (event.key === 'Escape' && document.activeElement !== usernameInput) {
    closeSetupModal();
  }
}

function closeSetupEnterHandler(event) {
  if (event.key === 'Enter') {
    closeSetupModal();
  }
}

function setWizardCoatColor() {
  var currentFill = wizardCoat.style.fill;
  wizardCoat.style.fill = getNextValue(wizardCoatColors, currentFill);
}

function setWizardEyesColor() {
  var currentFill = wizardEyes.style.fill;
  wizardEyes.style.fill = getNextValue(wizardEyesColors, currentFill);
}

function setFireballColor() {
  var color = getNextValue(fireballColors, fireballInputColor.value);
  fireballWrap.style.background = color;
  fireballInputColor.value = color;
}

function getNextValue(arr, currentValue) {
  return arr[(arr.indexOf(currentValue) + 1) % arr.length];
}

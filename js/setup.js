'use strict';

var playerNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var playerSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardInnerTemplateContent = document.querySelector('template#similar-wizard-template').content.querySelector('.setup-similar-item');
var setup = document.querySelector('.setup');
var setupSimilar = setup.querySelector('.setup-similar');
var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

setup.classList.remove('hidden');
renderSetupWindow(wizardInnerTemplateContent, playerNames, playerSurnames, wizardCoatColors, wizardEyesColors, 4);
setupSimilar.classList.remove('hidden');

function renderSetupWindow(innerTemplateContent, names, surnames, coatColors, eyesColors, quantity) {
  var shortPlayerArray = getRandomArray(quantity, names);
  var shortCoatsArray = getRandomArray(quantity, coatColors);
  var shortEyesArray = getRandomArray(quantity, eyesColors);
  var playersFullNames = concatSurnamesWithExistingNames(names, shortPlayerArray, surnames);

  for (var i = 0; i < quantity; i++) {
    var templateClone = innerTemplateContent.cloneNode(true);
    renderWizardName(templateClone, playersFullNames[i], 'p.setup-similar-label');
    renderWizardColorDetail(templateClone, shortCoatsArray[i], '.wizard .wizard-coat');
    renderWizardColorDetail(templateClone, shortEyesArray[i], '.wizard .wizard-eyes');
    setupSimilarList.appendChild(templateClone);
  }
}
function getRandomArray(quantity, names) {
  var randomArray = [];
  while (randomArray.length < quantity) {
    var guess = names[randIntUntil(names.length - 1)];
    if (randomArray.indexOf(guess) < 0) {
      randomArray.push(guess);
    }
  }
  return randomArray;
}
function concatSurnamesWithExistingNames(namesFullArray, namesShortArray, surnamesFullArray) {
  return namesShortArray.map(function (name) {
    return name + ' ' + surnamesFullArray[namesFullArray.indexOf(name)];
  });
}
function renderWizardName(innerTemplateContent, name, selector) {
  var element = innerTemplateContent.querySelector(selector);
  element.textContent = name;
}
function renderWizardColorDetail(innerTemplateContent, color, selector) {
  var element = innerTemplateContent.querySelector(selector);
  element.style.fill = color;
}
function randIntUntil(max) {
  var ans = Math.floor(Math.random() * (max + 1));
  return ans;
}

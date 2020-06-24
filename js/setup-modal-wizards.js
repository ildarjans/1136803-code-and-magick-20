'use strict';

(function () {
  var getShuffledArray = window.utilities.getShuffledArray;
  var getNextValue = window.utilities.getNextValue;

  var setup = window.setupModal.getSetupModal();

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

  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

  var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

  var setupSimilar = setup.querySelector('.setup-similar');
  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');

  var wizardCoat = setup.querySelector('.wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.wizard .wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var fireballInputColor = fireballWrap.querySelector('input');

  function renderSetupModalWizards(quantity) {
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

  function concatSurnamesWithExistingNames(names, shortNames, surnames) {
    return shortNames.map(function (name) {
      return name + ' ' + surnames[names.indexOf(name)];
    });
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

  function addWizardEventListeners() {
    fireballWrap.addEventListener('click', setFireballColor);
    wizardCoat.addEventListener('click', setWizardCoatColor);
    wizardEyes.addEventListener('click', setWizardEyesColor);
  }

  function removeWizardEventListeners() {
    fireballWrap.removeEventListener('click', setFireballColor);
    wizardCoat.removeEventListener('click', setWizardCoatColor);
    wizardEyes.removeEventListener('click', setWizardEyesColor);
  }

  // setupSimilar.classList.remove('hidden');
  renderSetupModalWizards(4);

  window.setupModalWizards = {
    addWizardEventListeners: addWizardEventListeners,
    removeWizardEventListeners: removeWizardEventListeners,
  };
})();

'use strict';

(function () {
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

  var getShuffledArray = window.utilities.getShuffledArray;

  renderSetupModal(similarWizardTemplate, 4);
  // setup.classList.remove('hidden');
  setupSimilar.classList.remove('hidden');

  function renderSetupModal(wizardTemplate, quantity) {
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
  window.setupModal = {
    wizardCoatColors: wizardCoatColors,
    wizardEyesColors: wizardEyesColors
  };

})();

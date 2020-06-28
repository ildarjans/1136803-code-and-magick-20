'use strict';

(function () {
  var getShuffledArray = window.utilities.getShuffledArray;
  var getNextValue = window.utilities.getNextValue;
  var setup = window.setupModal.getSetupModal();
  // #######################################
  // ######       MODULE6-TASK2       ######
  // #######################################
  var getPopupMessage = window.setupModal.getPopupMessage;
  var url = 'https://javascript.pages.academy/code-and-magick/data';
  var wizards = null;
  window.backend.load(successHandler, errorHandler, url);
  // #######################################

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

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                  .content.querySelector('.setup-similar-item');
  var setupSimilar = setup.querySelector('.setup-similar');
  var setupSimilarList = setupSimilar.querySelector('.setup-similar-list');
  var wizardCoat = setup.querySelector('.wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.wizard .wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var fireballInputColor = fireballWrap.querySelector('input');

  setupSimilar.classList.remove('hidden');

  function renderSetupModalSimilarWizards(wizardTemplate, quantity) {
    var wizardsShortRandom = getShuffledArray(wizards, quantity);
    var documentFragment = document.createDocumentFragment();

    for (var i = 0; i < quantity; i++) {
      var template = wizardTemplate.cloneNode(true);
      template.querySelector('p.setup-similar-label').textContent = wizardsShortRandom[i].name;
      template.querySelector('.wizard .wizard-coat').style.fill = wizardsShortRandom[i].colorCoat;
      template.querySelector('.wizard .wizard-eyes').style.fill = wizardsShortRandom[i].colorEyes;
      documentFragment.append(template);
    }
    setupSimilarList.append(documentFragment);
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
  // #######################################
  // ######       MODULE6-TASK2       ######
  // #######################################

  function successHandler(data) {
    wizards = data;
    renderSetupModalSimilarWizards(similarWizardTemplate, 4);
  }

  function errorHandler(message) {
    getPopupMessage(message, 4000);
  }
  // =======================================

  window.setupModalWizard = {
    addWizardEventListeners: addWizardEventListeners,
    removeWizardEventListeners: removeWizardEventListeners
  };

})();

'use strict';

(function () {
  var POPUP_FADEOUT_DELAY = 4000;
  var URL = 'https://javascript.pages.academy/code-and-magick/data';
  var WIZARDSLIST_CAPACITY = 4;
  var DEBOUNCE_DELAY = 500;

  var getShuffledArray = window.utilities.getShuffledArray;
  var getNextValue = window.utilities.getNextValue;
  var setup = window.setupModal.getSetupModal();
  var renderPopupMessage = window.setupModal.renderPopupMessage;
  var wizardsLoader = window.ajax.load;

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

  var header = document.querySelector('header');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                  .content.querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var wizardCoat = setup.querySelector('.wizard .wizard-coat');
  var wizardCoatInput = setup.querySelector('.setup-wizard-appearance input[name="coat-color"]');
  var wizardEyes = setup.querySelector('.wizard .wizard-eyes');
  var wizardEyesInput = setup.querySelector('.setup-wizard-appearance input[name="eyes-color"]');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var fireballInputColor = fireballWrap.querySelector('input');

  var wizards = null;
  wizardsLoader(URL, successCallback, errorCallback);

  function renderSetupModalSimilarWizards(wizardsShortArray, wizardTemplate) {
    var documentFragment = document.createDocumentFragment();

    for (var i = 0; i < wizardsShortArray.length; i++) {
      var template = wizardTemplate.cloneNode(true);
      template.querySelector('p.setup-similar-label').textContent = wizardsShortArray[i].name;
      template.querySelector('.wizard .wizard-coat').style.fill = wizardsShortArray[i].colorCoat;
      template.querySelector('.wizard .wizard-eyes').style.fill = wizardsShortArray[i].colorEyes;
      documentFragment.append(template);
    }
    setupSimilarList.append(documentFragment);
  }

  function setWizardCoatColor() {
    var currentFill = wizardCoat.style.fill;
    var nextFill = getNextValue(wizardCoatColors, currentFill);
    wizardCoat.style.fill = nextFill;
    wizardCoatInput.value = nextFill;
    debounce(updateSimilarWizards, DEBOUNCE_DELAY);
  }

  function setWizardEyesColor() {
    var currentFill = wizardEyes.style.fill;
    var nextFill = getNextValue(wizardEyesColors, currentFill);
    wizardEyes.style.fill = nextFill;
    wizardEyesInput.value = nextFill;
    debounce(updateSimilarWizards, DEBOUNCE_DELAY);
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

  function successCallback(data) {
    wizards = data;
    var wizardsShortRandom = getShuffledArray(wizards, 4);
    renderSetupModalSimilarWizards(wizardsShortRandom, similarWizardTemplate);
  }

  function errorCallback(message) {
    renderPopupMessage(header, message, POPUP_FADEOUT_DELAY);
  }

  function getWizardColors() {
    return {
      colorCoat: wizardCoat.style.fill,
      colorEyes: wizardEyes.style.fill
    };
  }

  function getSimilarWizardsArray(length) {
    var comparedWizard = getWizardColors();
    wizards.forEach(function (wizard) {
      wizard.award = 0;
      wizard.award = wizard.colorEyes === comparedWizard.colorEyes ? wizard.award + 1 : wizard.award;
      wizard.award = wizard.colorCoat === comparedWizard.colorCoat ? wizard.award + 2 : wizard.award;
    });
    wizards.sort(function (current, next) {
      return current.award > next.award ? -1 : 1;
    });
    return wizards.slice(0, length);
  }

  function updateSimilarWizards() {
    var currentWizardsItems = setupSimilarList.querySelectorAll('.setup-similar-item');
    currentWizardsItems.forEach(function (wizard) {
      wizard.remove();
    });
    var shortWizards = getSimilarWizardsArray(WIZARDSLIST_CAPACITY);
    renderSetupModalSimilarWizards(shortWizards, similarWizardTemplate);

  }

  function debounce(fn, delay) {
    var timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay);
    }();
  }

  window.setupModalWizard = {
    addWizardEventListeners: addWizardEventListeners,
    removeWizardEventListeners: removeWizardEventListeners
  };

})();

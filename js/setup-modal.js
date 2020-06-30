'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setup.querySelector('.setup-close');
  var usernameInput = setup.querySelector('.setup-user-name');

  // #######################################
  // ######       MODULE6-TASK2       ######
  // #######################################

  var POPUP_FADEOUT_DELAY = 4000;
  var url = 'https://javascript.pages.academy/code-and-magick';
  var header = document.querySelector('header');
  var formUploader = window.ajax.save;
  var setupForm = setup.querySelector('.setup-wizard-form');

  setupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(setupForm);
    formUploader(url, successCallback, errorCallback, formData);
  });

  function errorCallback(message) {
    renderPopupMessage(message, POPUP_FADEOUT_DELAY);
  }

  function successCallback() {
    closeSetupModal();
  }

  function renderPopupMessage(message, delay) {
    var htmlElement = document.createElement('div');
    var styles = 'position: absolute; top: 50%; left: 50%;' +
    'transform: translate(-50%, -50%); width: 75%; height: 50%;' +
    'background: #fff; border-radius: 3px; box-shadow: 3px 3px 10px #000;' +
    'display: flex; align-items: center; justify-content: center;' +
    'font-size: 32px; color: #963131; z-index: 100; padding: 20px;';
    htmlElement.style = styles;
    htmlElement.innerText = message;
    header.append(htmlElement);

    setTimeout(function () {
      htmlElement.remove();
    }, delay);
  }

  // =======================================

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
    setup.removeAttribute('style');
    document.addEventListener('keydown', closeSetupEscapeHandler);
    setupCloseButton.addEventListener('keydown', closeSetupEnterHandler);
    window.setupModalWizard.addWizardEventListeners();
  }

  function closeSetupModal() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', closeSetupEscapeHandler);
    setupCloseButton.removeEventListener('keydown', closeSetupEnterHandler);
    window.setupModalWizard.removeWizardEventListeners();
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

  function getSetupModal() {
    return setup;
  }

  window.setupModal = {
    getSetupModal: getSetupModal,
    renderPopupMessage: renderPopupMessage
  };

})();

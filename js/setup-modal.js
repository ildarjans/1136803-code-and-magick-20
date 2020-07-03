'use strict';

(function () {
  var POPUP_FADEOUT_DELAY = 4000;
  var URL = 'https://javascript.pages.academy/code-and-magick';

  var formUploader = window.ajax.save;
  var renderPopupMessage = window.popupMessage.renderPopupMessage;

  var header = document.querySelector('header');
  var setup = document.querySelector('.setup');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setup.querySelector('.setup-close');
  var setupForm = setup.querySelector('.setup-wizard-form');
  var usernameInput = setup.querySelector('.setup-user-name');

  setupForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(setupForm);
    formUploader(URL, successCallback, errorCallback, formData);
  });

  setupOpenButton.addEventListener('click', function () {
    openSetupModal();
  });

  setupOpenButton.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      openSetupModal();
    }
  });

  setupCloseButton.addEventListener('click', closeSetupModal);

  function errorCallback(message) {
    renderPopupMessage(header, message, POPUP_FADEOUT_DELAY);
  }

  function successCallback() {
    closeSetupModal();
  }

  function openSetupModal() {
    setup.classList.remove('hidden');
    setupSimilar.classList.remove('hidden');
    setup.removeAttribute('style');
    document.addEventListener('keydown', closeSetupEscapeHandler);
    setupCloseButton.addEventListener('keydown', closeSetupEnterHandler);
    window.setupModalWizard.addWizardEventListeners();
  }

  function closeSetupModal() {
    setup.classList.add('hidden');
    setupSimilar.classList.add('hidden');
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

'use strict';

(function () {
// ######################################################
// #####               MODULE4-TASK1                #####
// ######################################################
  var setup = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setup.querySelector('.setup-close');
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

    // ADDED IN MODULE5-TASK1
    setup.removeAttribute('style');
    document.addEventListener('keydown', closeSetupEscapeHandler);
    setupCloseButton.addEventListener('keydown', closeSetupEnterHandler);
    window.setupModalWizards.addWizardEventListeners();
  }

  function closeSetupModal() {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', closeSetupEscapeHandler);
    setupCloseButton.removeEventListener('keydown', closeSetupEnterHandler);
    window.setupModalWizards.removeWizardEventListeners();
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
    getSetupModal: getSetupModal
  };
})();

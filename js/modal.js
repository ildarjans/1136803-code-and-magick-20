'use strict';

(function () {
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
  var setup = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open');
  var setupCloseButton = setup.querySelector('.setup-close');
  var wizardCoat = setup.querySelector('.wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.wizard .wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');
  var fireballInputColor = fireballWrap.querySelector('input');
  var usernameInput = setup.querySelector('.setup-user-name');

  var getNextValue = window.utilities.getNextValue;

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
    wizardCoat.style.fill = getNextValue(window.setupModal.wizardCoatColors, currentFill);
  }

  function setWizardEyesColor() {
    var currentFill = wizardEyes.style.fill;
    wizardEyes.style.fill = getNextValue(window.setupModal.wizardEyesColors, currentFill);
  }

  function setFireballColor() {
    var color = getNextValue(fireballColors, fireballInputColor.value);
    fireballWrap.style.background = color;
    fireballInputColor.value = color;
  }


  // ######################################################
  // #####               MODULE5-TASK1                #####
  // ######################################################

  var userAvatar = setup.querySelector('.upload');

  userAvatar.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var start = {
      x: event.clientX,
      y: event.clientY
    };

    var dragged = false;

    userAvatar.addEventListener('mousemove', mousemoveHandler);
    userAvatar.addEventListener('mouseup', mouseupHandler);
    userAvatar.addEventListener('mouseleave', mouseleaveHandler);

    function mousemoveHandler(eventMove) {
      eventMove.preventDefault();
      dragged = true;

      var shift = {
        x: start.x - eventMove.clientX,
        y: start.y - eventMove.clientY
      };

      start = {
        x: eventMove.clientX,
        y: eventMove.clientY
      };

      setup.style.left = setup.offsetLeft - shift.x + 'px';
      setup.style.top = setup.offsetTop - shift.y + 'px';
    }

    function mouseupHandler(eventUp) {
      eventUp.preventDefault();
      userAvatar.removeEventListener('mouseup', mouseupHandler);
      userAvatar.removeEventListener('mousemove', mousemoveHandler);
      userAvatar.removeEventListener('mouseleave', mouseleaveHandler);

      if (dragged) {
        userAvatar.addEventListener('click', clickHandler);
      }

    }

    function mouseleaveHandler(eventLeave) {
      eventLeave.preventDefault();
      userAvatar.removeEventListener('mousemove', mousemoveHandler);
      userAvatar.removeEventListener('mouseup', mouseupHandler);
      userAvatar.removeEventListener('mouseleave', mouseleaveHandler);
    }

    function clickHandler(eventClick) {
      eventClick.preventDefault();
      userAvatar.removeEventListener('click', clickHandler);
    }

  });

})();

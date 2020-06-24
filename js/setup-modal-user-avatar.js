'use strict';

(function () {

  // ######################################################
  // #####               MODULE5-TASK1                #####
  // ######################################################
  var setup = window.setupModal.getSetupModal();

  var userAvatar = setup.querySelector('.upload');

  var dragged = false;
  var userAvatarCoordinates = {
    x: null,
    y: null,
  };

  userAvatar.addEventListener('mousedown', function (event) {
    event.preventDefault();

    userAvatarCoordinates.x = event.clientX;
    userAvatarCoordinates.y = event.clientY;

    userAvatar.addEventListener('mousemove', mousemoveHandler);
    userAvatar.addEventListener('mouseup', mouseupHandler);
    userAvatar.addEventListener('mouseleave', mouseleaveHandler);

  });

  function mousemoveHandler(event) {
    event.preventDefault();
    dragged = true;

    var shift = {
      x: userAvatarCoordinates.x - event.clientX,
      y: userAvatarCoordinates.y - event.clientY
    };

    userAvatarCoordinates = {
      x: event.clientX,
      y: event.clientY
    };

    setup.style.left = setup.offsetLeft - shift.x + 'px';
    setup.style.top = setup.offsetTop - shift.y + 'px';
  }

  function mouseupHandler(event) {
    event.preventDefault();
    userAvatar.removeEventListener('mouseup', mouseupHandler);
    userAvatar.removeEventListener('mousemove', mousemoveHandler);
    userAvatar.removeEventListener('mouseleave', mouseleaveHandler);

    if (dragged) {
      userAvatar.addEventListener('click', clickHandler);
    }
  }

  function mouseleaveHandler(event) {
    event.preventDefault();
    userAvatar.removeEventListener('mousemove', mousemoveHandler);
    userAvatar.removeEventListener('mouseup', mouseupHandler);
    userAvatar.removeEventListener('mouseleave', mouseleaveHandler);
  }

  function clickHandler(event) {
    event.preventDefault();
    userAvatar.removeEventListener('click', clickHandler);
  }
})();

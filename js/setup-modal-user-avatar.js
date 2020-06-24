'use strict';

(function () {
  var setup = window.setupModal.getSetupModal();
  var userAvatar = setup.querySelector('.upload');

  var startPosition = {
    x: null,
    y: null
  };

  var avatarDragged = false;

  userAvatar.addEventListener('mousedown', function (event) {
    event.preventDefault();

    startPosition = {
      x: event.clientX,
      y: event.clientY
    };

    avatarDragged = false;

    userAvatar.addEventListener('mousemove', mousemoveHandler);
    userAvatar.addEventListener('mouseup', mouseupHandler);
    userAvatar.addEventListener('mouseleave', mouseleaveHandler);

  });

  function mousemoveHandler(eventMove) {
    eventMove.preventDefault();
    avatarDragged = true;

    var shiftPosition = {
      x: startPosition.x - eventMove.clientX,
      y: startPosition.y - eventMove.clientY
    };

    startPosition = {
      x: eventMove.clientX,
      y: eventMove.clientY
    };

    setup.style.left = setup.offsetLeft - shiftPosition.x + 'px';
    setup.style.top = setup.offsetTop - shiftPosition.y + 'px';
  }

  function mouseupHandler(eventUp) {
    eventUp.preventDefault();
    userAvatar.removeEventListener('mouseup', mouseupHandler);
    userAvatar.removeEventListener('mousemove', mousemoveHandler);
    userAvatar.removeEventListener('mouseleave', mouseleaveHandler);

    if (avatarDragged) {
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

})();


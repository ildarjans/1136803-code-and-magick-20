'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var LOAD_URL = 'https://javascript.pages.academy/code-and-magick/data';
  var UPLOAD_URL = 'https://javascript.pages.academy/code-and-magick';
  var errorMessages = {
    statusError: function (xhr) {
      return 'Код ошибки ' + xhr.status + ', ' + xhr.statusText +
      '!\n\nПовторите попытку позже.';
    },
    unknownError: 'Произошла не предвиденная ошибка.\n\nПовторите попытку позже.',
    timeoutExpired: 'Время ожидания запроса истекло.\n\nПовторите попытку позже.',
  };

  function loadHandler(successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = 'json';
    xhr.open('GET', LOAD_URL);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler(errorMessages.statusError(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(errorMessages.unknownError);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(errorMessages.timeoutExpired);
    });
  }

  function uploadHandler(successHandler, errorHandler, formData) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', UPLOAD_URL);
    xhr.send(formData);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(JSON.parse(xhr.response));
      } else {
        errorHandler(errorMessages.statusError(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(errorMessages.unknownError);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(errorMessages.timeoutExpired);
    });
  }

  window.backend = {
    load: loadHandler,
    save: uploadHandler
  };

})();

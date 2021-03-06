'use strict';

(function () {
  var TIMEOUT = 10000;
  var errorMessages = {
    statusError: function (xhr) {
      return 'Код ошибки ' + xhr.status + ', ' + xhr.statusText +
      '!\n\nПовторите попытку позже.';
    },
    unknownError: 'Произошла не предвиденная ошибка.\n\nПовторите попытку позже.',
    timeoutExpired: 'Время ожидания запроса истекло.\n\nПовторите попытку позже.',
  };

  function createXHR(url, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successCallback(xhr.response);
      } else {
        errorCallback(errorMessages.statusError(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      errorCallback(errorMessages.unknownError);
    });

    xhr.addEventListener('timeout', function () {
      errorCallback(errorMessages.timeoutExpired);
    });
  }

  function uploadXHR(url, successCallback, errorCallback, formData) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.open('POST', url);
    xhr.send(formData);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successCallback(JSON.parse(xhr.response));
      } else {
        errorCallback(errorMessages.statusError(xhr));
      }
    });

    xhr.addEventListener('error', function () {
      errorCallback(errorMessages.unknownError);
    });

    xhr.addEventListener('timeout', function () {
      errorCallback(errorMessages.timeoutExpired);
    });
  }

  window.ajax = {
    load: createXHR,
    upload: uploadXHR
  };

})();

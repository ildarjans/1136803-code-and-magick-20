'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;

  function loadHandler(successHandler, errorHandler, url) {
    var xhr = new XMLHttpRequest();

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(xhr.response);
      } else {
        errorHandler('Код ошибки ' + xhr.status + ', ' + xhr.statusText +
        '!\n\nНе удалось получить данные с сервера.\nПовторите попытку позже.');
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла не предвиденная ошибка.\nПовторите попытку позже.');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Время ожидания запроса истекло.\nПовторите попытку позже.');
    });
  }

  function uploadHandler(successHandler, errorHandler, formData) {
    var xhr = new XMLHttpRequest();
    var url = ' https://javascript.pages.academy/code-and-magick';
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', url);
    xhr.send(formData);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        successHandler(JSON.parse(xhr.response));
      } else {
        errorHandler('Код ошибки ' + xhr.status + ', ' + xhr.statusText +
        '!\n\nДанные не отправлены. Повторите попытку позже.');
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла не предвиденная ошибка.\nПовторите попытку позже.');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Время ожидания запроса истекло.\nПовторите попытку позже.');
    });
  }

  window.backend = {
    load: loadHandler,
    save: uploadHandler
  };

})();

'use strict';

(function () {
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageClone = errorMessageTemplate.cloneNode(true);

  var loadSuccessHandler = function (dataOffers) {
    window.data.offers = dataOffers;

  };

  var loadErrorHandler = function () {
    document.body.insertAdjacentElement('afterbegin', errorMessageClone);
  };

  var makeRequest = function (onSuccess, onError, request) {
    request.responseType = 'json';

    request.addEventListener('load', function () {
      if (request.status === 200) {
        onSuccess(request.response);
        if (!window.form.map.classList.contains('map--faded')) {
          window.map.mapPins.appendChild(window.form.makeMarks(window.data.offers)); // создает и выводит метки
        }
      } else {
        onError();
      }
    });
    request.addEventListener('error', function () {
      onError();
    });
    request.addEventListener('timeout', function () {
      onError();
    });
    request.timeout = 10000;
  };

  window.backend = {
    load: function (onSuccess, onError) { // загрузка с сервера
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('GET', URL);
      xhr.send();
    },

  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);
})();

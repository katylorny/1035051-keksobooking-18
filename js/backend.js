'use strict';

(function () {
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageClone = errorMessageTemplate.cloneNode(true);

  var loadSuccessHandler = function (dataOffers) {
    window.data.offers = dataOffers;

  };

  var sendSuccessHandler = function () {
    window.form.adForm.reset();
    // console.log(1);
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
        console.log();
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

    send: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      console.log(URL);
      console.log(xhr);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    sendSuccessHandler: sendSuccessHandler,
    loadErrorHandler: loadErrorHandler,

  };

  window.backend.load(loadSuccessHandler, loadErrorHandler);
})();

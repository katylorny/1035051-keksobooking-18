'use strict';

(function () {
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageClone = errorMessageTemplate.cloneNode(true);

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessageClone = successMessageTemplate.cloneNode(true);

  var loadSuccessHandler = function (dataOffers) {
    window.data.offers = dataOffers;
    window.map.mapPins.appendChild(window.form.makeMarks(window.data.offers)); // создает и выводит метки
  };

  var showSuccessMessage = function (message) {
    document.body.insertAdjacentElement('afterbegin', message);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.map.ESC_KEYCODE) {
        document.body.removeChild(message);
      }
    }, {once: true});
    document.addEventListener('click', function () {
      document.body.removeChild(message);
    }, {once: true});
  };

  var sendSuccessHandler = function () {
    window.form.adForm.reset();
    showSuccessMessage(successMessageClone);

    window.form.deactivateForm();
  };

  var loadErrorHandler = function () {
    document.body.insertAdjacentElement('afterbegin', errorMessageClone);
  };

  var makeRequest = function (onSuccess, onError, request) {
    request.responseType = 'json';

    request.addEventListener('load', function () {
      if (request.status === 200) {
        onSuccess(request.response);
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

    send: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/keksobooking';
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('POST', URL);
      xhr.send(data);
    },

    loadSuccessHandler: loadSuccessHandler,
    sendSuccessHandler: sendSuccessHandler,
    loadErrorHandler: loadErrorHandler,
  };

  // window.backend.load(loadSuccessHandler, loadErrorHandler);
})();

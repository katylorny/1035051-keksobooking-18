'use strict';

(function () {
  var REQUEST_STATUS_SUCCESS = 200;
  var TIMEOUT_LOAD = 10000;
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageClone = errorMessageTemplate.cloneNode(true);

  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessageClone = successMessageTemplate.cloneNode(true);

  var loadSuccessHandler = function (dataOffers) {
    window.serverData = dataOffers;
    window.offers = dataOffers;
    window.form.showMarks();
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
      if (request.status === REQUEST_STATUS_SUCCESS) {
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
    request.timeout = TIMEOUT_LOAD;
  };

  window.backend = {
    load: function (onSuccess, onError) { // загрузка с сервера
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    send: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('POST', URL_SEND);
      xhr.send(data);
    },

    loadSuccessHandler: loadSuccessHandler,
    sendSuccessHandler: sendSuccessHandler,
    loadErrorHandler: loadErrorHandler,
  };
})();

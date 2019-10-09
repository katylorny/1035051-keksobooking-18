'use strict';

(function () {
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  window.backend = {
    errorMessageTemplate: errorMessageTemplate,
    errorMessageClone: errorMessageTemplate.cloneNode(true),

    loadSuccessHandler: function (dataOffers) {
      window.data.offers = dataOffers;
    },

    loadErrorHandler: function () {
      document.body.insertAdjacentElement('afterbegin', window.backend.errorMessageClone);
    },

    makeRequest: function (onSuccess, onError, request) {
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

    },

    load: function (onSuccess, onError) { // загрузка с сервера
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      window.backend.makeRequest(onSuccess, onError, xhr);
      xhr.open('GET', URL);
      xhr.send();
    },

  };

  window.backend.load(window.backend.loadSuccessHandler, window.backend.loadErrorHandler);
})();

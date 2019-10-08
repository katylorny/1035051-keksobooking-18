'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var filtersContainer = document.querySelector('.map__filters-container');
  window.mapPins = document.querySelector('.map__pins');

  var openPopup = function (element) {
    if (element && element.dataset.markIndex !== undefined) {
      filtersContainer.before(window.fillCard(window.offers[element.dataset.markIndex]));

      var popup = document.querySelector('.popup');
      var popupClose = popup.querySelector('.popup__close');
      var onClosebuttonClick = function (evtClose) {
        evtClose.preventDefault();
        popup.classList.add('hidden');
      };
      var onEscKeydown = function (evtEsc) {
        if (evtEsc.keyCode === ESC_KEYCODE) {
          popup.classList.add('hidden');
        }
      };

      popup.classList.remove('hidden');
      popupClose.addEventListener('click', onClosebuttonClick, {once: true});
      document.addEventListener('keydown', onEscKeydown, {once: true});
    }
  };

  window.mapPins.addEventListener('click', function (evt) {
    var targetElement = evt.target.closest('button');
    openPopup(targetElement);
  });
})();

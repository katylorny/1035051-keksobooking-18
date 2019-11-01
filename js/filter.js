'use strict';

(function () {

  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var mapCheckboxes = housingFeatures.querySelectorAll('.map__checkbox');
  var debounceClick = window.debounce(function () {
    window.form.showMarks();
  });


  var clearFilters = function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').classList.add('hidden');
    }
    window.offers = window.serverData;
    housingType.options[0].selected = true;
    housingPrice.options[0].selected = true;
    housingRooms.options[0].selected = true;
    housingGuests.options[0].selected = true;
    mapCheckboxes.forEach(function (element) {
      element.checked = false;
    });
    window.pictureload.avatarPreview.src = 'img/muffin-grey.svg';
    window.pictureload.photoPreview.removeAttribute('src');

  };

  var filterMarks = function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').classList.add('hidden');
    }
    window.offers = window.serverData;

    var filterType = function (element) {
      var selectedOption = housingType.options[housingType.options.selectedIndex].value;
      return selectedOption === 'any' || element.offer.type === selectedOption;
    };

    var filterPrice = function (element) {
      var selectedOption = housingPrice.options[housingPrice.options.selectedIndex].value;
      if (selectedOption !== 'any') {
        switch (selectedOption) {
          case 'low':
            return element.offer.price < PRICE_LOW;
          case 'middle':
            return element.offer.price >= PRICE_LOW && element.offer.price < PRICE_HIGH;
          default:
            return element.offer.price >= PRICE_HIGH;
        }
      }
      return true;
    };

    var filterRooms = function (element) {
      var selectedOption = housingRooms.options[housingRooms.options.selectedIndex].value;
      return selectedOption === 'any' || element.offer.rooms + '' === selectedOption;
    };

    var filterGuests = function (element) {
      var selectedOption = housingGuests.options[housingGuests.options.selectedIndex].value;
      return selectedOption === 'any' || element.offer.guests + '' === selectedOption;
    };

    var filteredData = window.serverData.filter(filterType)
      .filter(filterPrice)
      .filter(filterRooms)
      .filter(filterGuests);

    mapCheckboxes.forEach(function (it) {
      if (it.checked) {
        var selectedFeature = it.value;
        filteredData = filteredData.filter(function (element) {
          return element.offer.features.some(function (feature) {
            return feature === selectedFeature;
          });
        });
      }
    });

    window.offers = filteredData;
    debounceClick();
  };

  var delayFilterMarks = window.debounce(function () {
    filterMarks();
    window.form.showMarks();
  });

  mapFilters.addEventListener('change', function () {
    delayFilterMarks();
  });

  window.filter = {
    housingType: housingType,
    clearFilters: clearFilters,
  };

})();

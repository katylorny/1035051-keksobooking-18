'use strict';

(function () {

  // фильтр по типу жилья

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var mapCheckboxes = housingFeatures.querySelectorAll('.map__checkbox');


  var filterMarks = function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').classList.add('hidden');
    }
    window.data.offers = window.serverData;

    var filteredData = window.serverData.filter(function (element) { // фильтры
      var selectedOption = housingType.options[housingType.options.selectedIndex].value;
      if (selectedOption !== 'any') {
        return element.offer.type === selectedOption;
      } else {
        return true;
      }
    })
      .filter(function (element) {
        var selectedOption = housingPrice.options[housingPrice.options.selectedIndex].value;
        if (selectedOption !== 'any') {
          switch (selectedOption) {
            case 'low':
              return element.offer.price < 10000;
            case 'middle':
              return element.offer.price >= 10000 && element.offer.price < 50000;
            default:
              return element.offer.price >= 50000;
          }
        } else {
          return true;
        }
      })
      .filter(function (element) {
        var selectedOption = housingRooms.options[housingRooms.options.selectedIndex].value;

        if (selectedOption !== 'any') {
          return element.offer.rooms + '' === selectedOption;
        } else {
          return true;
        }
      })
      .filter(function (element) {
        var selectedOption = housingGuests.options[housingGuests.options.selectedIndex].value;

        if (selectedOption !== 'any') {
          return element.offer.guests + '' === selectedOption;
        } else {
          return true;
        }
      });

    for (var i = 0; i < mapCheckboxes.length; i++) { // фильтруем чекбоксы
      if (mapCheckboxes[i].checked) {
        var selectedFeature = mapCheckboxes[i].value;
        filteredData = filteredData.filter(function (element) {
          return element.offer.features.some(function (feature) {
            return feature === selectedFeature;
          });
        });
      }
    }

    window.data.offers = filteredData;
    window.debounce(function () {
      window.form.showMarks();
    })(); // тут почему-то работает только с этими скобочками!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Хотя вроде их не должно быть!
  };

  mapFilters.addEventListener('change', function () {
    filterMarks();
  });

  window.filter = {
    housingType: housingType,
    // filterMarks: filterMarks,
  };

})();

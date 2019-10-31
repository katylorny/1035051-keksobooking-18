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
    for (var i = 0; i < mapCheckboxes.length; i++) {
      mapCheckboxes[i].checked = false;
    }
    window.pictureload.avatarPreview.src = 'img/muffin-grey.svg';
    // window.pictureload.photoPreviewDiv.removeChild(window.pictureload.photoPreviewDiv.children[0]);
    window.pictureload.photoPreview.removeAttribute('src');

  };

  var filterMarks1 = function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').classList.add('hidden');
    }
    window.offers = window.serverData;

    var filterType = function (element) {
      var selectedOption = housingType.options[housingType.options.selectedIndex].value;
      if (selectedOption !== 'any') {
        return element.offer.type === selectedOption;
      } else {
        return true;
      }
    };

    var filterPrice = function (element) {
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
    };

    var filterRooms = function (element) {
      var selectedOption = housingRooms.options[housingRooms.options.selectedIndex].value;

      if (selectedOption !== 'any') {
        return element.offer.rooms + '' === selectedOption;
      } else {
        return true;
      }
    };

    var filterGuests = function (element) {
      var selectedOption = housingGuests.options[housingGuests.options.selectedIndex].value;

      if (selectedOption !== 'any') {
        return element.offer.guests + '' === selectedOption;
      } else {
        return true;
      }
    };

    var filteredData = window.serverData.filter(filterType)
      .filter(filterPrice)
      .filter(filterRooms)
      .filter(filterGuests);

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

    window.offers = filteredData;
    debounceClick();

    // window.debounce(function () {
    //   window.form.showMarks();
    // })(); // тут почему-то работает только с этими скобочками!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Хотя вроде их не должно быть!
  };

  var filterMarks = window.debounce(function () { // !
    filterMarks1(); // !
    window.form.showMarks(); // !
  }); // !

  mapFilters.addEventListener('change', function () {
    filterMarks();
  });

  window.filter = {
    housingType: housingType,
    clearFilters: clearFilters,
    // filterMarks: filterMarks,
  };

})();

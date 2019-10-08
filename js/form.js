'use strict';

(function () {
  var MAP_PIN_WIDTH_ACTIVE = 65;
  var MAP_PIN_SIZE_INIT = 156;
  var MAP_PIN_HEIGHT_ACTIVE = 87;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var rooms = adForm.querySelector('#room_number');
  var guests = adForm.querySelector('#capacity');
  var mapPinMain = document.querySelector('.map__pin--main');

  var removeAttributes = function (attribute, array) {
    for (var i = 0; i < array.length; i++) {
      array[i].removeAttribute(attribute);
    }
  };

  var makeMarks = function (arrayMarks) {
    var fragmentMark = document.createDocumentFragment();
    for (var i = 0; i < arrayMarks.length; i++) {
      fragmentMark.appendChild(window.pin.fillMark(arrayMarks[i], i));
    }
    return fragmentMark;
  };

  var fillAddress = function (coordX, coordY, sizeX, sizeY, isRound) {
    if (isRound) {
      return Math.round(parseInt(coordX, 10) + sizeX / 2) + ', ' + Math.round(parseInt(coordY, 10) + sizeY / 2);
    } else {
      return Math.round(parseInt(coordX, 10) + sizeX / 2) + ', ' + Math.round(parseInt(coordY, 10) + sizeY);
    }
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    removeAttributes('disabled', fieldsets);
    addressField.value = fillAddress(mapPinMain.style.left, mapPinMain.style.top, MAP_PIN_WIDTH_ACTIVE, MAP_PIN_HEIGHT_ACTIVE, false);
    window.map.mapPins.appendChild(makeMarks(window.data.offers)); // создает и выводит метки
  };

  // валидация

  addressField.value = fillAddress(mapPinMain.style.left, mapPinMain.style.top, MAP_PIN_SIZE_INIT, MAP_PIN_SIZE_INIT, true);

  mapPinMain.addEventListener('mousedown', function () {
    activateForm();
    fillAddress();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateForm();
      fillAddress();
    }
  });

  var changeSelectOptions = function (selectedIndex) {
    var selectedRooms = rooms[selectedIndex].value;
    guests[guests.length - 1].disabled = true;

    if (selectedRooms === '100') {
      for (var j = 0; j < guests.length - 1; j++) {
        guests[j].disabled = true;
      }
      guests[guests.length - 1].disabled = false;
      guests[guests.length - 1].selected = true;
    } else {
      for (var i = 0; i < guests.length - 1; i++) {
        if (guests[i].value > selectedRooms) {
          guests[i].disabled = true;
        } else {
          guests[i].disabled = false;
          guests[i].selected = true;
        }
      }
    }
  };


  changeSelectOptions(0); // первоначальный выбор количества мест

  rooms.addEventListener('change', function (evt) {
    var roomsSelectedIndex = evt.currentTarget.options.selectedIndex;
    changeSelectOptions(roomsSelectedIndex);
  });

  var titleOfOffer = adForm.querySelector('#title');
  titleOfOffer.setAttribute('required', 'required');
  titleOfOffer.setAttribute('minlength', MIN_TITLE_LENGTH + '');
  titleOfOffer.setAttribute('maxlength', MAX_TITLE_LENGTH + '');

  var priceOfOffer = adForm.querySelector('#price');
  priceOfOffer.setAttribute('required', 'required');
  priceOfOffer.setAttribute('max', window.data.MAX_PRICE + '');

  var MIN_PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000',
  };

  var typeOfOffer = adForm.querySelector('#type');
  var changeMinPrice = function () {
    var selectedType = typeOfOffer[typeOfOffer.selectedIndex].value;
    priceOfOffer.setAttribute('min', MIN_PRICES[selectedType]);
    priceOfOffer.setAttribute('placeholder', MIN_PRICES[selectedType]);
  };
  changeMinPrice(); // первоначальное
  typeOfOffer.addEventListener('change', changeMinPrice);

  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var changeTimeOut = function () {
    var selectedTimeInIndex = timeIn.selectedIndex;
    timeOut[selectedTimeInIndex].selected = true;
  };
  var changeTimeIn = function () {
    var selectedTimeOutIndex = timeOut.selectedIndex;
    timeIn[selectedTimeOutIndex].selected = true;
  };

  timeIn.addEventListener('change', changeTimeOut);
  timeOut.addEventListener('change', changeTimeIn);
})();

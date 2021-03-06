'use strict';

(function () {
  var MAP_PIN_WIDTH_ACTIVE = 65;
  var MAP_PIN_SIZE_INIT = 156;
  var MAP_PIN_HEIGHT_ACTIVE = 87;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAP_WIDTH = 1200;
  var MAX_PRICE = 100000;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var ENTER_KEYCODE = 13;
  var PINS_QUANTITY = 5;
  var SPECIAL_ROOMS_AMOUNT = '100';
  var MIN_PRICES = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000',
  };
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');
  var rooms = adForm.querySelector('#room_number');
  var guests = adForm.querySelector('#capacity');
  var mapPinMain = document.querySelector('.map__pin--main');
  var xCoord;
  var yCoord;
  var xDefault = mapPinMain.style.left;
  var yDefault = mapPinMain.style.top;

  var removeAttributes = function (attribute, array) {
    array.forEach(function (element) {
      element.removeAttribute(attribute);
    });
  };
  var addAttributes = function (attribute, array) {
    array.forEach(function (element) {
      element.setAttribute(attribute, attribute);
    });
  };


  var makeMarks = function () { // создает фрагмент пинов
    var fragmentMark = document.createDocumentFragment();
    window.offers.slice(0, PINS_QUANTITY).forEach(function (element, number) {
      fragmentMark.appendChild(window.pin.fillMark(window.offers[number], number));
    });
    return fragmentMark;
  };


  var cleanMapPins = function () { // очищает карту от пинов

    while (window.map.mapPins.children.length > 2) {
      window.map.mapPins.removeChild(window.map.mapPins.children[2]);
    }
  };

  var showMarks = function () { //  выводит пины по массиву данных
    cleanMapPins(); // очищаем карту от пинов
    window.map.mapPins.appendChild(makeMarks()); // размещаем пины на карте
  };

  mapPinMain.dataset.isRound = true;

  var correctCoords = function (coordX, coordY, sizeX, sizeY) {

    if (mapPinMain.dataset.isRound === 'true') { // !
      return Math.round(parseInt(coordX, 10) + sizeX / 2) + ', ' + Math.round(parseInt(coordY, 10) + sizeY / 2);
    }
    return Math.round(parseInt(coordX, 10) + sizeX / 2) + ', ' + Math.round(parseInt(coordY, 10) + sizeY);
  };

  var changeSelectOptions = function (selectedIndex) {
    var selectedRooms = rooms[selectedIndex].value;
    guests[guests.length - 1].disabled = true;

    if (selectedRooms === SPECIAL_ROOMS_AMOUNT) {
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


  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    mapPinMain.dataset.isRound = false;
    map.classList.remove('map--faded');
    removeAttributes('disabled', fieldsets);
    addressField.value = correctCoords(mapPinMain.style.left, mapPinMain.style.top, MAP_PIN_WIDTH_ACTIVE, MAP_PIN_HEIGHT_ACTIVE);

    window.backend.load(window.backend.loadSuccessHandler, window.backend.loadErrorHandler); // Загружает и выводит пины
    changeSelectOptions(0);
    xCoord = parseInt(mapPinMain.style.left, 10);
    yCoord = parseInt(mapPinMain.style.top, 10);
  };

  var deactivateForm = function () {
    window.filter.clearFilters();
    addressField.value = correctCoords(mapPinMain.style.left, mapPinMain.style.top, MAP_PIN_SIZE_INIT, MAP_PIN_SIZE_INIT);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinMain.dataset.isRound = true;
    addAttributes('disabled', fieldsets);
    cleanMapPins();
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').classList.add('hidden');
    }
    mapPinMain.style.left = xDefault;
    mapPinMain.style.top = yDefault;
    addressField.value = correctCoords(mapPinMain.style.left, mapPinMain.style.top, MAP_PIN_SIZE_INIT, MAP_PIN_SIZE_INIT);
    window.filter.housingType.options.selectedIndex = 0;
  };
  addressField.value = correctCoords(mapPinMain.style.left, mapPinMain.style.top, MAP_PIN_SIZE_INIT, MAP_PIN_SIZE_INIT);


  var moveMainPin = function (evtX, evtY) {

    var startCoords = {
      x: evtX,
      y: evtY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      xCoord = xCoord - shift.x;
      yCoord = yCoord - shift.y;

      if (xCoord > MAP_WIDTH - MAP_PIN_WIDTH_ACTIVE) {
        mapPinMain.style.left = (MAP_WIDTH - MAP_PIN_WIDTH_ACTIVE) + 'px';
      } else if (xCoord < 0) {
        mapPinMain.style.left = '0px';
      } else {
        mapPinMain.style.left = xCoord + 'px';
      }

      if (yCoord < LOCATION_Y_MIN - MAP_PIN_HEIGHT_ACTIVE) {
        mapPinMain.style.top = (LOCATION_Y_MIN - MAP_PIN_HEIGHT_ACTIVE) + 'px';
      } else if (yCoord > LOCATION_Y_MAX - MAP_PIN_HEIGHT_ACTIVE) {
        mapPinMain.style.top = (LOCATION_Y_MAX - MAP_PIN_HEIGHT_ACTIVE) + 'px';
      } else {
        mapPinMain.style.top = yCoord + 'px';
      }
      addressField.value = correctCoords(mapPinMain.style.left, mapPinMain.style.top, MAP_PIN_WIDTH_ACTIVE, MAP_PIN_HEIGHT_ACTIVE);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (mapPinMain.dataset.isRound === 'true') {
      activateForm();
    }
    xCoord = parseInt(mapPinMain.style.left, 10);
    yCoord = parseInt(mapPinMain.style.top, 10);
    moveMainPin(evt.clientX, evt.clientY);
  });


  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateForm();
    }
  });

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
  priceOfOffer.setAttribute('max', MAX_PRICE + '');


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

  // ------------------- отправка формы

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(adForm), window.backend.sendSuccessHandler, window.backend.loadErrorHandler);
  });

  // -----------------
  window.form = {
    map: map,
    adForm: adForm,
    addressField: addressField,
    mapPinMain: mapPinMain,
    MAP_PIN_SIZE_INIT: MAP_PIN_SIZE_INIT,
    fieldsets: fieldsets,
    deactivateForm: deactivateForm,
    showMarks: showMarks,
  };
})();

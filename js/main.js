'use strict';
var MAP_WIDTH = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MAX_PRICE = 100000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 0;
var MAX_GUESTS = 2;
var AMOUNT_OF_OFFERS = 8;
var MARK_WIDTH = 50;
var MARK_HEIGHT = 70;
var map = document.querySelector('.map');
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var templateMark = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

var getRandomMinMax = function (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
};
// находит случайное целое число в промежутке от min до max

var getRandomArrayElement = function (arr) {
  return arr[getRandomMinMax(0, arr.length - 1)];
};
// выбирает случайный элемент из массива

var getRandomArrayElements = function (array) {
  var amountOfElements = getRandomMinMax(0, array.length - 1); // сколько элементов будет
  var selectedElements = []; // массив, в который поместятся все выбранные рандомные элементы
  for (var i = 0; i < amountOfElements; i++) {
    var numberOfElement = getRandomMinMax(0, array.length - 1); // нашли рандомный номер элемента в массиве
    selectedElements.push(array.splice(numberOfElement, 1)[0]); // splice() удаляет элемент из массива, возвращает его, затем кладем его в будущий массив
  }
  return selectedElements;
};
// выбирает случайнЫЕ элементЫ из массива (случайное количество, не повторяются)

var createOffer = function (userNumber) {
  var newObject = {};
  newObject.author = {avatar: 'img/avatars/user0' + userNumber + '.png'};
  newObject.offer = {
    title: 'заголовок предложения N' + userNumber,
    address: getRandomMinMax(0, MAP_WIDTH) + ', ' + getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX),
    price: getRandomMinMax(0, MAX_PRICE),
    type: getRandomArrayElement(types),
    rooms: getRandomMinMax(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomMinMax(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomArrayElement(checkinTimes),
    checkout: getRandomArrayElement(checkoutTimes),
    features: getRandomArrayElements(features),
    description: 'описание N' + userNumber,
    photos: getRandomArrayElements(photos)
  };
  newObject.location = {x: getRandomMinMax(0, MAP_WIDTH), y: getRandomMinMax(LOCATION_Y_MIN, LOCATION_Y_MAX)};
  return newObject;
};

var createOffers = function (amountOfObjects) {
  var arrayOfObjects = [];
  for (var i = 0; i < amountOfObjects; i++) {
    arrayOfObjects.push(createOffer(i + 1));
  }
  return arrayOfObjects;
};
// создает массив из объектов

var offers = createOffers(AMOUNT_OF_OFFERS); // массив из 8 объявлений(объектов)


var fillMark = function (markObject) { // создает один дом-элемент - метку
  var markClone = templateMark.cloneNode(true);
  markClone.style = 'left: ' + (markObject.location.x - MARK_WIDTH / 2) + 'px; top: ' + (markObject.location.y - MARK_HEIGHT) + 'px';
  markClone.children[0].src = markObject.author.avatar;
  markClone.children[0].alt = markObject.offer.title;
  return markClone;
};

var makeMarks = function (arrayMarks) {
  var fragmentMark = document.createDocumentFragment();
  for (var i = 0; i < arrayMarks.length; i++) {
    fragmentMark.appendChild(fillMark(arrayMarks[i]));
  }
  return fragmentMark;
};

map.classList.remove('map--faded');
mapPins.appendChild(makeMarks(offers));

// --------------------------  module3-task3  -----------------------------
// СЮДА СМОТРЕТЬ ПОКА НЕ НАДО, ДЕНИС!

// var templateCard = document.querySelector('#card').content.querySelector('.map__card');
// var filtersContainer = document.querySelector('.map__filters-container');
//
// var fillCard = function (cardObject) { // создает один элемент - карточку
//   var cardClone = templateCard.cloneNode(true);
//   cardClone.children[2].textContent = cardObject.offer.title;
//   cardClone.children[3].textContent = cardObject.offer.address;
//   cardClone.children[4].textContent = cardObject.offer.price + '₽/ночь';
//
//   if (cardObject.offer.type === 'flat') {
//     cardClone.children[5].textContent = 'Квартира';
//   }
//   if (cardObject.offer.type === 'bungalo') {
//     cardClone.children[5].textContent = 'Бунгало';
//   }
//   if (cardObject.offer.type === 'house') {
//     cardClone.children[5].textContent = 'Дом';
//   }
//   if (cardObject.offer.type === 'palace') {
//     cardClone.children[5].textContent = 'Дворец';
//   }
//
//   cardClone.children[6].textContent = cardObject.offer.rooms + 'комнаты для ' + cardObject.offer.guests + ' гостей';
//   cardClone.children[7].textContent = 'Заезд после ' + cardObject.offer.checkin + ', выезд до ' + cardObject.offer.checkout;
//   // cardClone.children[8]. НЕ ЗНАЮ, КАК ТУТ ДЕЛАТЬ, ЦИКЛ, НАВЕРНОЕ
//   cardClone.children[9].textContent = cardObject.offer.description;
//   for (var i = 0; i < cardObject.offer.features.length - 1; i++) {
//     cardClone.children[10].children[i].textContent = cardObject.offer.features[i];
//   }
//   cardClone.children[0].src = cardObject.author.avatar;
//   return cardClone;
// };
//
// // var o = createOffer(1);
//
// var faaa = fillCard(createOffer(1));
//
// filtersContainer.insertAdjacentHTML('beforebegin', '<article>faaa.content</article>');


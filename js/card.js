'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var fragmentPhotos = document.createDocumentFragment();
  var cardClone = templateCard.cloneNode(true);
  var popupPhotos = cardClone.querySelector('.popup__photos');
  var popupPhoto = cardClone.querySelector('.popup__photo');
  var glossary = {
    palace: 'Дворец',
    house: 'Дом',
    bungalo: 'Бунгало',
    flat: 'Квартира',
  };

  var translateWord = function (dictionary, word) {
    return dictionary[word];
  };


  var createFeaturesList = function (selectedFeatures) { // преимущества
    var popupFeatures = '';
    for (var i = 0; i < selectedFeatures.length; i++) {
      popupFeatures += '<li class="popup__feature popup__feature--' + selectedFeatures[i] + '"></li>';
    }
    return popupFeatures;
  };

  var makeFragmentPhotos = function (photosArray) {

    while (popupPhotos.children[0]) {
      popupPhotos.removeChild(popupPhotos.children[0]);
    }
    for (var j = 0; j < photosArray.length; j++) {
      var popupClone = popupPhoto.cloneNode(true);
      popupClone.src = photosArray[j];
      fragmentPhotos.appendChild(popupClone);
    }
    return fragmentPhotos;
  };

  window.card = {
    fillCard: function (cardObject) { // создает один элемент - карточку
      cardClone.querySelector('.popup__title').textContent = cardObject.offer.title;
      cardClone.querySelector('.popup__text--address').textContent = cardObject.offer.address;
      cardClone.querySelector('.popup__text--price').textContent = cardObject.offer.price + '₽/ночь';
      cardClone.querySelector('.popup__type').textContent = translateWord(glossary, cardObject.offer.type);
      cardClone.querySelector('.popup__text--capacity').textContent = cardObject.offer.rooms + ' комнаты для ' + cardObject.offer.guests + ' гостей';
      cardClone.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardObject.offer.checkin + ', выезд до ' + cardObject.offer.checkout;
      cardClone.querySelector('.popup__features').innerHTML = createFeaturesList(cardObject.offer.features);
      cardClone.querySelector('.popup__description').textContent = cardObject.offer.description;
      cardClone.querySelector('.popup__photos').appendChild(makeFragmentPhotos(cardObject.offer.photos));
      cardClone.children[0].src = cardObject.author.avatar;
      return cardClone;
    },
  };
})();

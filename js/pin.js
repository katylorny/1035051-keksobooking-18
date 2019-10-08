'use strict';

(function () {
  var MARK_WIDTH = 50;
  var MARK_HEIGHT = 70;
  var templateMark = document.querySelector('#pin').content.querySelector('.map__pin');

  window.fillMark = function (markObject, numberOfOffer) { // создает один дом-элемент - метку
    var markClone = templateMark.cloneNode(true);
    markClone.style = 'left: ' + (markObject.location.x - MARK_WIDTH / 2) + 'px; top: ' + (markObject.location.y - MARK_HEIGHT) + 'px';
    markClone.children[0].src = markObject.author.avatar;
    markClone.children[0].alt = markObject.offer.title;
    markClone.dataset.markIndex = numberOfOffer;
    return markClone;
  };
})();

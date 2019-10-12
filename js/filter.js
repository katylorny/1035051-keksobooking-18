'use strict';

(function () {

  // фильтр по типу жилья

  var housingType = document.querySelector('#housing-type');

  var filterMarks = function (evt) {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').classList.add('hidden');
    }
    var selectedOption = evt.currentTarget[evt.currentTarget.options.selectedIndex].value;
    var selectedMarks = window.serverData.filter(function (element) {
      return element.offer.type === selectedOption;
    });
    window.data.offers = selectedMarks;
    window.form.showMarks(window.data.offers);
  };

  housingType.addEventListener('change', function (evt) {
    filterMarks(evt);
  });

  window.filter = {
    housingType: housingType,
  };

})();

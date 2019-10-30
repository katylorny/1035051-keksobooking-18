'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // var divContainer = document.querySelector('.ad-form__photo-container');
  var upload = document.querySelector('.ad-form__upload');

  // аватар
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  // фото жилья
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewDiv = document.querySelector('.ad-form__photo');


  // общая функция загрузки изображения и показа preview
  var loadPicture = function (chooser, picturePreview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var isPicture = FILE_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (isPicture) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        picturePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  // -------- аватар --------
  avatarFileChooser.addEventListener('change', function () {
    loadPicture(avatarFileChooser, avatarPreview);
  });

  // -------- фото жилья -------
  photoFileChooser.addEventListener('change', function () {
    if (photoPreviewDiv.querySelector('img')) {
      var clone = photoPreviewDiv.cloneNode(true);
      upload.insertAdjacentElement('afterend', clone);
    } else {
      var img = document.createElement('img');
      img.width = 70;
      photoPreviewDiv.append(img);
      photoPreviewDiv.style = 'overflow: hidden';
    }
    var photoPreview = document.querySelector('.ad-form__photo img');
    loadPicture(photoFileChooser, photoPreview);
  });

})();

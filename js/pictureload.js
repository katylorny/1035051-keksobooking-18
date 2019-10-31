'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  // var divContainer = document.querySelector('.ad-form__photo-container');
  // var upload = document.querySelector('.ad-form__upload');
  var PREVIEW_WIDTH = 70;

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
  var img = document.createElement('img');
  img.width = PREVIEW_WIDTH;
  photoPreviewDiv.append(img);
  photoPreviewDiv.style = 'overflow: hidden';
  var photoPreview = document.querySelector('.ad-form__photo img');
  // не удаляю комментарии здесь в надежде доработать до множественной загрузки
  // photoFileChooser.setAttribute('multiple', 'multiple');
  photoFileChooser.addEventListener('change', function () {
    // if (photoPreviewDiv.querySelector('img')) {
    //   var clone = photoPreviewDiv.cloneNode(true);
    //   upload.insertAdjacentElement('afterend', clone);
    // } else {}
    loadPicture(photoFileChooser, photoPreview);
  });

  window.pictureload = {
    avatarPreview: avatarPreview,
    photoPreviewDiv: photoPreviewDiv,
    photoPreview: photoPreview,
  };
})();

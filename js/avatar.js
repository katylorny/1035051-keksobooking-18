'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // аватар
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  // фото жилья
  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewDiv = document.querySelector('.ad-form__photo');
  var img = document.createElement('img');
  photoPreviewDiv.append(img);
  var photoPreview = document.querySelector('.ad-form__photo img');
  photoPreview.width = '70';
  photoPreviewDiv.style = 'overflow: hidden';
  // photoPreview.height = "70";


  // общая функция загрузки изображения и показа preview
  var loadPicture = function (chooser, picturePreview) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
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

    console.log(photoPreview);
    loadPicture(photoFileChooser, photoPreview);
  });

})();

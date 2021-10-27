function renderImages() {
  var elContainerImgs = document.querySelector('.gallery-container');
  var imgs = getImages();
  var htmlStr = `
  <button class="upload-image grid-btn" onclick="onUploadImage()">Upload Your Image Here!<input class="input-file" type="file" style="visibility:hidden"></button>`;
  imgs.map((img) => {
    htmlStr += `
      <div class="card">
        <img src="./img/${img.id}.jpg" alt="meme" class="grid-btn" onclick="onSetImage(${img.id})">
        </div>
        `;
  });
  elContainerImgs.innerHTML = htmlStr;
}

function onSetImage(imgId) {
  var elMainContent = document.querySelector('.main-content');
  var elGalleryContainer = document.querySelector('.gallery-container');

  elGalleryContainer.style.display = 'none';
  elMainContent.style.display = 'block';
  var meme = getMeme();
  if (meme.selectedImgId === imgId) return;
  setImage(imgId);
  renderCanvas();
}

function onUploadImage() {
  uploadImage();
  renderCanvas();
}

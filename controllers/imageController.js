function renderImages() {
  var elContainerImgs = document.querySelector('.gallery-container');
  var imgs = getImages();
  var htmlStr = `
  <button class="upload-image grid-btn">Upload Your Image Here!<input class="input-file" onchange="onUploadImage(event)" type="file"></button>`;
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
  const elMainContents = document.querySelectorAll('.main-content');
  elMainContents.forEach((elMainContainer) => {
    elMainContainer.classList.toggle('hide-panels');
  });
  var meme = getMeme();
  if (meme.selectedImgId === imgId) return;
  setImage(imgId);
  renderCanvas();
}

function onUploadImage(ev) {
  uploadImage(ev);
  renderImages();
  renderCanvas();
}

function renderStickers() {
  const elStickers = document.querySelector('.stickers');
  var stickers = getStickers();
  var htmlStr = '';
  stickers.map((sticker) => {
    htmlStr += `<div class="stick-card">
      <img src="${sticker.url}" alt="sticker" class="grid-btn" onclick="onSetSticker(${sticker.id})">
      </div>`;
  });
  elStickers.innerHTML = htmlStr;
}

function onStickersPage(moveTo) {
  stickersPage(moveTo);
  renderStickers();
}

function onSetSticker(stickerId) {
  const sticker = getStickerById(stickerId)[0];
  const img = new Image();
  img.src = sticker.url;
  const ratio = img.height / img.width;
  addNewSticker(stickerId, gElCanvas.width, gElCanvas.height, ratio);
  emptyInput();
  renderCanvas();
}

function addStickers() {
  var stickers = getScurrStickers();
  stickers.map((sticker) => {
    const img = new Image();
    img.src = sticker.src;
    gCtx.drawImage(
      img,
      sticker.pos.x,
      sticker.pos.y,
      sticker.width,
      sticker.height
    );
  });
}

function renderImages() {
  var elContainerImgs = document.querySelector('.gallery-container');
  var imgs = getPartImgs();
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
    drawArc(
      sticker.pos.x + sticker.width - 15,
      sticker.pos.y + sticker.height - 15,
      5,
      'blue'
    );
  });
}

function onKeyWordsFilter(ev) {
  // ev.preventDefault();
  const searchValue = document.querySelector('.searchbar-input').value;
  updateSearchWord(searchValue);
  renderImages();
}

function renderKeywords() {
  var elKwList = document.querySelector('#search-keywords');
  var keywords = getKeywords();
  var strHtml = Object.keys(keywords)
    .map((word) => `<option value="${word}" onclick></option>`)
    .join('');
  elKwList.innerHTML = `<option value="show all"></option>` + strHtml;
}

function renderKeywordsSize() {
  var elKwContainer = document.querySelector('.show-keywords');
  var popularKw = pupolarKw();
  var htmlStr = '';
  popularKw.forEach((kw, idx) => {
    htmlStr += `
        <div class="keywords-selection keyword-size-${idx}" onclick="onKeywordClick(this)" style="font-size:${
      Object.values(popularKw[idx])[0] * 3.3
    }px" dataset"${Object.values(kw)}">${Object.keys(kw)}</div>
     `;
  });
  elKwContainer.innerHTML = htmlStr;
}

function pupolarKw() {
  var popularKws = [];
  for (let word in gKeywords) {
    if (gKeywords[word] > 2) popularKws.push({ [word]: gKeywords[word] });
  }
  return popularKws;
}

function onKeywordClick(el) {
  keywordClick(el);
}


function showSavedMemes() {
  document.querySelector('.save-modal-preview').style.display = 'block';
  var elModalCon =  document.querySelector('.save-modal-memes')
  var strHtml = '';
  if (!gSaveMeme) return
  gSaveMeme.forEach((img)=> {
    console.log(img)
    strHtml += `<div class="save-meme-modal" ><img src="${img.imgContent}" height="300" width="300" onclick="onSaveImageDisplay(${img.id})"></div>`
  })
  elModalCon.innerHTML = strHtml
  elModalCon.style.display = 'grid'
}

function onSaveImageDisplay(imgId) {
  const elMainContents = document.querySelectorAll('.main-content');
  elMainContents.forEach((elMainContainer) => {
    elMainContainer.classList.toggle('hide-panels');
  });

  document.querySelector('.save-modal-preview').style.display = 'none'

gMeme.storage = true
  renderCanvas(imgId)
  // img.onload = () => {
  //   gCurrRatio = img.height / img.width;
  //   resizeCanvas();
  //   gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
  //   drawText();
  //   addStickers();
  //   markLine();
  // };
}

function getImageById(imgId) {
 
  return gImgs.forEach((img) => {
    return img.id === imgId
  })
}

function closeModalPreview() {
  document.querySelector('.save-modal-preview').style.display = 'none'
}
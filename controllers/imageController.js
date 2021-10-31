function onRenderImages() {
	const elContainerImgs = document.querySelector('.gallery-container');
	const imgs = getPartImgs();
	let htmlStr = `
  <button class="upload-image">Upload Your Image Here!<input class="input-file" onchange="onUploadImage(event)" type="file"></button>`;
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
	document.querySelector('.gallery-container').classList.toggle('hide-panels');
	setImage(imgId);
	renderCanvas();
}

function onUploadImage(ev) {
	uploadImage(ev);
	onRenderImages();
	renderCanvas();
}

function renderStickers() {
	const elStickers = document.querySelector('.stickers');
	const stickers = getStickers();
	let htmlStr = '';
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

function onKeyWordsFilter(ev) {
	const searchValue = document.querySelector('.searchbar-input').value;
	updateSearchWord(searchValue);
	onRenderImages();
}

function renderKeywords() {
	const elKwList = document.querySelector('#search-keywords');
	const keywords = getKeywords();
	const strHtml = Object.keys(keywords).map((word) => `<option value="${word}" onclick></option>`).join('');
	elKwList.innerHTML = `<option value="show all"></option>` + strHtml;
}

function renderKeywordsSize() {
	const elKwContainer = document.querySelector('.show-keywords');
	const popularKw = pupolarKw();
	let htmlStr = '';
	popularKw.forEach((kw, idx) => {
		htmlStr += `
        <div class="keywords-selection keyword-size-${idx}" onclick="onKeywordClick(this)" style="font-size:${Object.values(
			popularKw[idx]
		)[0] * 3.3}px" dataset"${Object.values(kw)}">${Object.keys(kw)}</div>
     `;
	});
	elKwContainer.innerHTML = htmlStr;
}

function onKeywordClick(el) {
	keywordClick(el);
}

function showSavedMemes() {
	document.querySelector('.save-modal-preview').style.display = 'block';
	const elModalCon = document.querySelector('.save-modal-memes');
	let strHtml = '';
	if (!gSaveMeme) return;
	gSaveMeme.forEach((img) => {
		strHtml += `<div class="save-meme-modal" ><img src="${img.imgContent}" height="300" width="300" onclick="onSaveImageDisplay(${img.id})"></div>`;
	});
	elModalCon.innerHTML = strHtml;
	elModalCon.style.display = 'grid';
}

function onSaveImageDisplay(imgId) {
	const meme = getMeme();
	const elMainContents = document.querySelectorAll('.main-content');
	elMainContents.forEach((elMainContainer) => {
		elMainContainer.classList.toggle('hide-panels');
	});
	document.querySelector('.save-modal-preview').style.display = 'none';
	meme.storage = true;
	renderCanvas(imgId);
}

function getImageById(imgId) {
	return gImgs.forEach((img) => {
		return img.id === imgId;
	});
}

function closeModalPreview() {
	document.querySelector('.save-modal-preview').style.display = 'none';
}

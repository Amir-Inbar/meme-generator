var gIsDragging;
var gDragStartPos;
var gTouchEvs = [ 'touchstart', 'touchmove', 'touchend' ];
var gCurrRatio;
var gCurrDrag;
var gScalling;
var gElCanvas;
var gCtx;

function onInit() {
	gElCanvas = document.querySelector('.canvas');
	gCtx = gElCanvas.getContext('2d');
	resetCanvas();
	onRenderImages();
	createInitStickers();
	renderStickers();
	addEventListeners();
	renderCanvas();
	updateKeywords();
	renderKeywords();
	renderKeywordsSize();
}

function addEventListeners() {
	addMouseListeners();
	addTouchListeners();
	window.addEventListener('resize', () => {
		resizeCanvas();
		renderCanvas();
	});
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousedown', onDown);
	gElCanvas.addEventListener('mousemove', onMove);
	gElCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchmove', onMove);
	gElCanvas.addEventListener('touchstart', onDown);
	gElCanvas.addEventListener('touchend', onUp);
}

function onFillInput() {
	const activeLine = getActiveLine();
	const elInput = document.querySelector('.canvas-input');
	if (activeLine.txt !== 'Type Me') elInput.value = activeLine.txt;
}

function emptyInput() {
	var elInput = document.querySelector('.canvas-input');
	elInput.value = '';
}

function onDown(ev) {
	emptyInput();
	const pos = getEvPos(ev);
	if (!lineClicked(pos)) return;
	gDragStartPos = pos;
	gElCanvas.style.cursor = 'grabbing';
}

function onMove(ev) {
	const pos = getEvPos(ev);
	const activeItem = gCurrDrag === 'line' ? getActiveLine() : getActiveSticker();
	if (gIsDragging) {
		const dx = pos.x - gDragStartPos.x;
		const dy = pos.y - gDragStartPos.y;
		if (gCurrDrag === 'sticker' || gCurrDrag === 'line') {
			activeItem.pos.x += dx;
			activeItem.pos.y += dy;
		}
		gDragStartPos = pos;
		renderCanvas();
		return;
	}
	if (gScalling) {
		resizingSticker(pos, gDragStartPos);
		gDragStartPos = pos;
		renderCanvas();
	}
}

function onUp() {
	gElCanvas.style.cursor = 'grab';
	const activeLine = getActiveLine();
	gIsDragging = gScalling = false;
	if (!activeLine) return;
	renderCanvas();
}

function lineClicked(pos) {
	const idx = findClickedLineIdx(pos);
	const stickerIdx = findclickedStickerIdx(pos);
	if (stickerIdx !== -1) {
		var isSizing = isSizingSticker(stickerIdx, pos);
		updateActiveSticker(stickerIdx);
		gCurrDrag = 'sticker';
	}
	if (idx !== -1) {
		updateActiveLine(idx);
		gCurrDrag = 'line';
	}
	renderCanvas();
	if (idx !== -1 || stickerIdx !== -1 || isSizing) {
		onFillInput();
		gIsDragging = true;
		if (isSizing) {
			gCurrDrag = '';
			gScalling = true;
			gIsDragging = false;
			return true;
		}
		return true;
	} else return false;
}

function getEvPos(ev) {
	var pos = {
		x: ev.offsetX,
		y: ev.offsetY
	};
	if (gTouchEvs.includes(ev.type)) {
		``;
		ev.preventDefault();
		ev = ev.changedTouches[0];
		pos = {
			x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
			y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
		};
	}
	return pos;
}

function renderCanvas() {
	const meme = getMeme();
	const img = new Image();
	img.src = `./img/${meme.selectedImgId}.jpg`;
	img.onload = () => {
		gCurrRatio = img.height / img.width;
		resizeCanvas();
		gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
		drawText();
		addStickers();
		markLine();
	};
}

function drawText() {
	const meme = getMeme();
	const memeLines = meme.lines;
	memeLines.map((line) => {
		gCtx.beginPath();
		gCtx.font = `${line.size}px ${line.font}`;
		const txtWidth = gCtx.measureText(line.txt).width;
		line.txtWidth = txtWidth;
		gCtx.textAlign = 'start';
		gCtx.textBaseline = 'alphabetic';

		gCtx.lineWidth = 1;
		gCtx.strokeStyle = `${line.stroke}`;
		gCtx.fillStyle = `${line.color}`;
		gCtx.font = `${line.font}`;
		gCtx.textAlign = `${line.align}`;

		gCtx.fillText(line.txt, line.pos.x, line.pos.y);
		gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
	});
}

function markLine() {
	const meme = getMeme();
	meme.lines.map((line) => {
		if (!line) return;

		gCtx.beginPath();
		var rectY = line.pos.y - line.size;
		var rectX = line.pos.x - line.txtWidth / 2;
		var rectWidth = line.txtWidth;
		var rectHeight = 1.5 * line.size;
		gCtx.lineWidth = 5;
		gCtx.rect(rectX - 10, rectY, rectWidth + 20, rectHeight);
		gCtx.strokeStyle = 'green';
		gCtx.stroke();
	});
}

function onRemoveMeme() {
	removeMeme();
	emptyInput();
	renderCanvas();
}

function onFontPick(font) {
	fontPick(font);
	renderCanvas();
}

function OnPickColor(color) {
	pickColor(color);
	renderCanvas();
}

function OnPickStroke(stroke) {
	pickStroke(stroke);
	renderCanvas();
}

function onResizeFont(resizeBy) {
	resizeFont(resizeBy);
	renderCanvas();
}

function onTxtDirection(AlignBy) {
	txtDirection(AlignBy, gElCanvas.width);
	renderCanvas();
}

function onRenderNewLine() {
	const input = document.querySelector('.canvas-input');
	input.value = '';
	renderNewLine();
	renderCanvas();
}

function onUpdateCurrLine(txt) {
	updateCurrLine(txt);
	renderCanvas();
}

function onBackGallery() {
	const elMainContents = document.querySelectorAll('.main-content');
	elMainContents.forEach((elMainContainer) => {
		elMainContainer.classList.toggle('hide-panels');
	});
	document.querySelector('.gallery-container').classList.toggle('hide-panels');

	resetCanvas();
}

function onDownloadImg(elLink) {
	const imgContent = gElCanvas.toDataURL('image/jpeg/png');
	elLink.href = imgContent;
	elDownloadBtn = document.querySelector('.download-btn-span');
	elDownloadBtn.innerHTML = `<a href="${imgContent}" class="download-a" onclick="downloadImg(this)" download="GooDLuck!">Download</a>`;
}

function onShareMeme() {
	const imgDataUrl = gElCanvas.toDataURL('image/jpeg/png');

	// A function to be called if request succeeds
	function onSuccess(uploadedImgUrl) {
		const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl);
		document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`;
		console.log('fdsfs');
		document.querySelector('.share-btn-span').innerHTML = `
      <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
         Share   
      </a>`;
	}
	doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {
	const formData = new FormData();
	formData.append('png', imgDataUrl);

	fetch('//ca-upload.com/here/upload.php', {
		method: 'POST',
		body: formData
	})
		.then((res) => res.text())
		.then((url) => {
			console.log('Got back live url:', url);
			onSuccess(url);
		})
		.catch((err) => {
			console.error(err);
		});
}

function drawArc(x, y, size = 5, color = 'gray') {
	gCtx.beginPath();
	gCtx.lineWidth = '6';
	gCtx.arc(x, y, size, 0, 2 * Math.PI);
	gCtx.strokeStyle = 'white';
	gCtx.stroke();
	gCtx.fillStyle = color;
	gCtx.fill();
}

function onSaveMeme() {
	saveMeme();
	const elSaveContainer = document.querySelector('.save-modal-container');
	elSaveContainer.style.display = 'block';
	setTimeout(hideSaveModal, 2000);
	renderCanvas();
}

function hideSaveModal() {
	const elSaveContainer = document.querySelector('.save-modal-container');
	elSaveContainer.style.display = 'none';
}

function onOpenMemeEditor() {
	const elMainContents = document.querySelectorAll('.main-content');
	elMainContents.forEach((elMainContainer) => {
		elMainContainer.classList.toggle('hide-panels');
	});
	renderCanvas();
}
function closeAboutMeModal() {
	document.querySelector('.about-me-container').style.display = 'none';
}

function openAboutMeModal() {
	document.querySelector('.about-me-container').style.display = 'block';
}
// TODO:
/*
put notes arrange files, and 
change the gallery to grid gallery with cards like in css tricks
search & filter while typing need to show while typing a list of keywords using data-list
a div with pupolar keywords according to their pupolary, if he choose one we need to incerase the font size
download awesome fonts
L-R-C alignment
clear canvas
download image
share image
upload image
adding stickers
mobile responsive
great leyout with header nav, main, footer etc...
save memes in local storage
drag and drop stickers
resize stickers and text
i18n hebrew

*/

var gKeywords = [];
var gSaveMeme = [];
var gMeme = {
	selectedImgId: 1,
	selectedLineIdx: 0,
	selectStickerIdx: 0,
	storage: false,
	stickers: [],
	lines: []
};

function _createNewLine(
	txt = 'Type Me',
	size = 40,
	align = 'center',
	color = 'black',
	font = 'IMPACT',
	stroke = 'red',
	txtWidth = 0,
	pos = { x: 250, y: gElCanvas.height / 3 }
) {
	return {
		txt,
		size,
		align,
		color,
		font,
		stroke,
		txtWidth,
		pos,
		gIsDragging: false
	};
}

function getMeme() {
	return gMeme;
}

function resetCanvas() {
	clearInput();
	gMeme.lines = [];
	gMeme.stickers = [];
	gMeme.storage = false;
	gMeme.lines.push(_createNewLine());
	renderCanvas();
}

function resizeCanvas() {
	// const elLeftController = document.querySelector('.left-controller');
	// const height = elLeftController.offsetHeight;
	// const width = elLeftController.offsetWidth;
	// const size = height > width ? width : height;
	// gElCanvas.height = height > width ? size : size * gCurrRatio;
	// gElCanvas.width = height > width ? size / gCurrRatio : size;
	// const elLeftController = document.querySelector('.left-controller');
	const elContainer = document.querySelector('.canvas-container');
	const elCanvasContainer = document.querySelector('.canvas-container');
	const canvasContainerH = elCanvasContainer.offsetWidth * gCurrRatio;
	elCanvasContainer.style.height = canvasContainerH + 'px';
	gElCanvas.width = elCanvasContainer.offsetWidth;
	gElCanvas.height = canvasContainerH;
}

function clearInput() {
	var elInput = document.querySelector('input');
	elInput.value = '';
}

function setMemePropery(key, val) {
	var line = getActiveLine();
	line[key] = val;
}

function removeMeme() {
	gMeme.lines = [];
	gMeme.lines.push(_createNewLine());
}

function fontPick(font) {
	setMemePropery('font', font);
}

function pickColor(color) {
	setMemePropery('color', color);
}

function pickStroke(stroke) {
	setMemePropery('stroke', stroke);
}

function resizeFont(resizeBy) {
	const activeLine = getActiveLine();
	activeLine.size += resizeBy === 'up' ? 10 : -10;
}

function txtDirection(alignBy, canvasW) {
	const activeline = getActiveLine();
	const { pos, txtWidth } = activeline;
	if (alignBy === 'left') pos.x = 10 + txtWidth / 2;
	else if (alignBy === 'right') pos.x = canvasW - 10 - txtWidth / 2;
	else activeline.pos.x = canvasW / 2;
}

function renderNewLine() {
	if (gMeme.lines.length > 2) return;
	if (gMeme.lines.length === 2) {
		const line = _createNewLine();
		gMeme.lines.push(line);
		gMeme.selectedLineIdx = gMeme.lines.length - 1;
		gMeme.lines[gMeme.selectedLineIdx].pos.y = gElCanvas.height - 80;
	} else {
		const line = _createNewLine();
		gMeme.lines.push(line);
		gMeme.selectedLineIdx = 1;
		gMeme.lines[gMeme.selectedLineIdx].pos.y = gElCanvas.height / 2;
	}
}

function updateCurrLine(txt) {
	setMemePropery('txt', txt);
}

function getActiveLine() {
	return gMeme.lines[gMeme.selectedLineIdx];
}

function getActiveSticker() {
	return gMeme.stickers[gMeme.selectStickerIdx];
}

function findClickedLineIdx(pos) {
	return gMeme.lines.findIndex((line) => {
		return (
			pos.x > line.pos.x - line.txtWidth / 2 - 10 &&
			pos.x < line.pos.x + line.txtWidth / 2 + 10 &&
			pos.y > line.pos.y - line.size &&
			pos.y < gElCanvas.height - (gElCanvas.height - line.pos.y - 20)
		);
	});
}

function findclickedStickerIdx(clickedPos) {
	const idx = gMeme.stickers.findIndex((sticker) => {
		const { pos, width, height } = sticker;
		return (
			pos.x < clickedPos.x &&
			pos.x + width / 2 + 30 > clickedPos.x &&
			pos.y < clickedPos.y &&
			pos.y + height / 2 + 30 > clickedPos.y
		);
	});
	return idx;
}

function updateActiveLine(idx) {
	gMeme.selectedLineIdx = idx;
}

function updateActiveSticker(idx) {
	gMeme.selectStickerIdx = idx;
}

function isSizingSticker(stickerIdx, clickedPos) {
	const activeSticker = gMeme.stickers[stickerIdx];
	const { pos, height } = activeSticker;
	return (
		pos.x < clickedPos.x - 60 &&
		pos.x + height > clickedPos.x &&
		pos.y < clickedPos.y &&
		pos.y + height > clickedPos.y - 60
	);
}

function resizingSticker(pos, startPos) {
	const dx = pos.x - startPos.x;
	const idx = gMeme.selectStickerIdx;
	gMeme.stickers[idx].width += dx;
	gMeme.stickers[idx].height += dx;
}

function saveMeme() {
	const imgContent = gElCanvas.toDataURL('image/jpeg/png');
	console.log(imgContent);
	addMemeSave(imgContent);
}

function addMemeSave(imgContent) {
	var id = gImgs.length + 1;
	gSaveMeme.push({ id, imgContent });
	gImgs.push({ id, imgContent });
	saveToStorage('save_memes', gSaveMeme);
}

function getSavedMemes() {
	var gSaveMeme = loadFromStorage('save_memes');
	if (!gSaveMeme) gSaveMeme = [];
	return gSaveMeme;
}

function getImageById(imgId) {
	return gImgs.forEach((img) => img.id === imgId);
}

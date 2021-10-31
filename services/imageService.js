const gImgs = createImages();
const gStickers = [];
var PAGE_SIZE = 3;
var gPageIdx = 0;

function createImages() {
	return [
		createImage(1, '../img/1.jpg', [ 'happy', 'dance' ]),
		createImage(2, '../img/2.jpg', [ 'president', 'donald', 'trump', 'human', 'adult' ]),
		createImage(3, '../img/3.jpg', [ 'dog', 'sweet', 'kiss', 'animal' ]),
		createImage(4, '../img/4.jpg', [ 'dog', 'baby,', 'bed', 'animal' ]),
		createImage(5, '../img/5.jpg', [ 'strong', 'beach', 'baby' ]),
		createImage(6, '../img/6.jpg', [ 'cat', 'sleep' ]),
		createImage(7, '../img/7.jpg', [ 'why' ]),
		createImage(8, '../img/8.jpg', [ 'tell me', 'amazing' ]),
		createImage(9, '../img/9.jpg', [ 'laugh' ]),
		createImage(10, '../img/10.jpg', [ 'actor', 'adult', 'human', 'show' ]),
		createImage(11, '../img/11.jpg', [ 'strange', 'big' ]),
		createImage(12, '../img/12.jpg', [ 'human', 'evil', 'bad' ]),
		createImage(13, '../img/13.jpg', [ 'dance', 'kids' ]),
		createImage(14, '../img/14.jpg', [ 'trump', 'happy', 'president' ]),
		createImage(15, '../img/15.jpg', [ 'surprised', 'kid' ]),
		createImage(16, '../img/16.jpg', [ 'animal', 'dog', 'small' ]),
		createImage(17, '../img/17.jpg', [ 'obama', 'happy', 'president' ]),
		createImage(18, '../img/18.jpg', [ 'kiss', 'human' ]),
		createImage(19, '../img/19.jpg', [ 'actor', 'happy' ]),
		createImage(20, '../img/20.jpg', [ 'cool', 'human', 'mistry' ]),
		createImage(21, '../img/21.jpg', [ 'tiny', 'actor' ]),
		createImage(22, '../img/22.jpg', [ 'happy', 'red', 'human' ]),
		createImage(23, '../img/23.jpg', [ 'tell me', 'amazing' ]),
		createImage(24, '../img/24.jpg', [ 'president', 'putin', 'strong' ]),
		createImage(25, '../img/25.jpg', [ 'toys', 'tiny', 'happy' ])
	];
}

function createImage(id, url, keywords = []) {
	return {
		id,
		url,
		keywords
	};
}

function getImages() {
	return gImgs;
}

function setImage(activeImg) {
	const meme = getMeme();
	meme.selectedImgId = activeImg;
}

function getImgById(imgId) {
	return gImgs.filter((img) => img.id === imgId);
}

function uploadImage(ev) {
	const lastImg = gImgs.length;
	const newImage = createImage(lastImg + 1, ev.target.files[0].name, []);
	gImgs.push(newImage);
	setImage(newImage.id);
	onSetImage(newImage.id);
}

function createInitStickers() {
	for (var i = 1; i <= 15; i++) gStickers.push({ id: i, url: `./stickers/${i}.png` });
}

function addStickers() {
	const stickers = getScurrStickers();
	stickers.map((sticker) => {
		const img = new Image();
		img.src = sticker.src;
		gCtx.drawImage(img, sticker.pos.x, sticker.pos.y, sticker.width, sticker.height);
		drawArc(sticker.pos.x + sticker.width - 15, sticker.pos.y + sticker.height - 15, 5, 'gray');
	});
}

function stickersPage(moveTo) {
	if (moveTo === 'next') {
		gPageIdx++;
		if (gPageIdx * PAGE_SIZE >= gStickers.length) gPageIdx = 0;
	} else {
		gPageIdx--;
		if (gPageIdx <= 0) gPageIdx = 0;
	}
}

function getStickers() {
	const fromIdx = gPageIdx * PAGE_SIZE;
	const sticker = gStickers.slice(fromIdx, fromIdx + PAGE_SIZE);
	return sticker;
}

function getStickerById(stickerId) {
	return gStickers.filter((sticker) => sticker.id === stickerId);
}

function getScurrStickers() {
	return gMeme.stickers;
}

function addNewSticker(id, canvasW, canvasH, ratio) {
	const newSticker = createNewSticker(id, canvasW, canvasH, ratio);
	gMeme.stickers.push(newSticker);
	gMeme.selectedStickerIdx = id;
}

function createNewSticker(id, canvasW, canvasH, ratio) {
	const sticker = getStickerById(id)[0];
	const width = 80;
	const height = width * ratio;
	return {
		src: sticker.url,
		pos: {
			x: canvasW / 2 - 40,
			y: canvasH / 2 - height / 2
		},
		width,
		height
	};
}

function updateKeywords() {
	return gImgs.map((img) => {
		img.keywords.map((word) => {
			if (!gKeywords[word]) {
				gKeywords[word] = 1;
				return;
			}
			gKeywords[word] += 1;
		});
	});
}
function pupolarKw() {
	const popularKws = [];
	for (let word in gKeywords) if (gKeywords[word] > 2) popularKws.push({ [word]: gKeywords[word] });
	return popularKws;
}

function getKeywords() {
	return gKeywords;
}

function updateSearchWord(word) {
	if (gMeme.searchWord === 'show all') word = '';
	gMeme.searchWord = word;
}

function getPartImgs() {
	const searchWord = gMeme.searchWord;
	if (!searchWord) return gImgs;
	const filterImgs = [];
	gImgs.filter((img) => {
		return img.keywords.filter((kw) => {
			if (searchWord === kw.substr(0, searchWord.length)) {
				filterImgs.push(img);
			}
		});
	});
	return filterImgs;
}

function keywordClick(el) {
	const keywords = document.querySelectorAll('.keywords-selection');
	let elText;
	keywords.forEach((kw) => {
		if (kw.classList[1] === el.classList[1]) elText = kw.classList[1];
	});
	let elTxt = document.querySelector(`.${elText}`);
	increaseFontSize(elTxt.innerText);
}

function increaseFontSize(elTxt) {
	if (gKeywords[elTxt] === 8) return;
	gKeywords[elTxt]++;
	renderKeywordsSize();
}

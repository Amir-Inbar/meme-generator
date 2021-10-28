var gElCanvas = document.querySelector('.canvas');
var gCtx = gElCanvas.getContext('2d');
var gOldTxt = '';
gElCanvas.width = 500;
gElCanvas.height = 300;
var gKeywords = [];
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  selectStickerIdx: 0,
  searchWord: 'test',
  stickers: [],
  lines: [
    {
      txt: 'Type Me',
      size: 40,
      align: 'center',
      color: 'red',
      font: 'IMPACT',
      stroke: 'red',
      txtWidth: 0,
      pos: {
        x: 250,
        y: gElCanvas.height / 3,
      },
      gIsDragging: false,
    },
  ],
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
    gIsDragging: false,
  };
}

function getMeme() {
  return gMeme;
}

function resizeCanvas() {
  const elLeftController = document.querySelector('.left-controller');
  const elContainer = document.querySelector('.canvas-container');
  const canvasContainerH = elContainer.offsetWidth * gCurrRatio;
  elLeftController.style.height = canvasContainerH + 'px';
  gElCanvas.width = elContainer.offsetWidth;
  gElCanvas.height = canvasContainerH;
}

function clearInput() {
  var elInput = document.querySelector('input');
  elInput.value = '';
}

function addMemePropery(key, val) {
  var line = getActiveLine();
  line[key] = val;
}

function removeMeme() {
  gMeme.lines = [];
  gMeme.lines.push(_createNewLine());
}

function fontPick(font) {
  var meme = gMeme.lines[gMeme.selectedLineIdx];
  meme.font = font;
}

function pickColor(color) {
  var meme = gMeme.lines[gMeme.selectedLineIdx];
  meme.color = color;
}

function pickStroke(stroke) {
  var activeLive = getActiveLine();
  activeLive.stroke = stroke;
}

function resizeFont(resizeBy) {
  var meme = getActiveLine();
  if (resizeBy === 'up') meme.size += 10;
  if (resizeBy === 'down') meme.size -= 10;
}

function txtDirection(alignBy, canvasW) {
  var meme = getActiveLine();
  if (alignBy === 'left') {
    meme.pos.x = 10 + meme.txtWidth / 2;
  } else if (alignBy === 'right') {
    meme.pos.x = canvasW - 10 - meme.txtWidth / 2;
  } else if (alignBy === 'center') {
    meme.pos.x = canvasW / 2;
  }
}

function renderNewLine() {
  if (gMeme.lines.length > 2) return;
  if (gMeme.lines.length === 2) {
    var line = _createNewLine();
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gElCanvas.height - 80;
  }
  if (gMeme.lines.length === 1) {
    var line = _createNewLine();
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = 1;
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gElCanvas.height / 2;
  }
}

function updateCurrLine(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getActiveLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function getActiveSticker() {
  return gMeme.stickers[gMeme.selectStickerIdx];
}

function findClickedLineIdx(pos) {
  var idx = gMeme.lines.findIndex((line) => {
    return (
      pos.x > line.pos.x - line.txtWidth / 2 - 10 &&
      pos.x < line.pos.x + line.txtWidth / 2 + 10 &&
      pos.y > line.pos.y - line.size &&
      pos.y < gElCanvas.height - (gElCanvas.height - line.pos.y - 10)
    );
  });
  return idx;
}

function findclickedStickerIdx(clickedPos) {
  var idx = gMeme.stickers.findIndex((sticker) => {
    var { pos, width, height } = sticker;

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

function changeProperty(property, value) {
  gMeme.lines[gMeme.selectedLineIdx][property] = value;
}

function isSizingSticker(stickerIdx, clickedPos) {
  var sticker = gMeme.stickers[stickerIdx];
  var { pos, width, height } = sticker;
  return (
    pos.x < clickedPos.x - 55 &&
    pos.x + height > clickedPos.x &&
    pos.y < clickedPos.y &&
    pos.y + height > clickedPos.y - 55
  );
}

function resizingSticker(pos, startPos) {
  const dx = pos.x - startPos.x;
  idx = gMeme.selectStickerIdx;
  gMeme.stickers[idx].width += dx;
  gMeme.stickers[idx].height += dx;
}

function keyWordsFilter(evKey) {
  var keywords = gImgs.map((img) => {
    return img.keywords.map((key) => key === evKey.key);
  });
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

function getKeywords() {
  return gKeywords;
}

function updateSearchWord(word) {
  if (gMeme.searchWord === 'test') gMeme.searchWord = '';
  gMeme.searchWord = word;
}

function getPartImgs() {
  const searchWord = gMeme.searchWord;
  if (!searchWord) return gImgs;
  return gImgs.filter((img) => img.keywords.includes(searchWord));
}

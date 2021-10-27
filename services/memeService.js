var gCanvas = document.querySelector('.canvas');
var gCtx = gCanvas.getContext('2d');
var gOldTxt = '';
gCanvas.width = 500;
gCanvas.height = 300;
gIsRestart = null;
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
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
        y: gCanvas.height / 3,
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
  pos = { x: 250, y: 80 }
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

function resizeCanvas(img) {
  const elContainer = document.querySelector('.canvas-container');
  var height = elContainer.offsetHeight;
  var width = elContainer.offsetWidth;
  var ratio = img.width / img.height;
  gCanvas.width = width;
  gCanvas.height = Math.min(gCanvas.width / ratio, height);
  gCanvas.style.top = (height = gCanvas.height) / 2 + 'px';
}

function clearInput() {
  var elInput = document.querySelector('input');
  elInput.value = '';
}

function addMemePropery(key, val) {
  var line = getActiveLine();
  line[key] = val;
}

// function resetMeme(isClear) {
//   gMeme.lines = [];
//   if (isClear) _createNewLine;
//   gMeme.selectedLineIdx = 0;
// }
function clearCanvas(isClear) {
  resetMeme(isClear);
  clearInput();
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
  var meme = gMeme.lines[gMeme.selectedLineIdx];
  meme.stroke = stroke;
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
  // if (gMeme.lines.length === 1) {
  //   gMeme.selectedLineIdx = 0;
  //   gMeme.lines[gMeme.selectedLineIdx].pos.y = 80;
  // }
  if (gMeme.lines.length === 2) {
    var line = _createNewLine();
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gCanvas.height - 80;
  }
  if (gMeme.lines.length === 1) {
    var line = _createNewLine();
    gMeme.lines.push(line);
    gMeme.selectedLineIdx = 1;
    gMeme.lines[gMeme.selectedLineIdx].pos.y = gCanvas.height / 2;
  }
}

function updateCurrLine(txt) {
  gMeme.lines[gMeme.selectedLineIdx].txt = txt;
}

function getActiveLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function findClickedLineIdx(pos) {
  var idx = gMeme.lines.findIndex((line) => {
    return (
      pos.x > line.pos.x - line.txtWidth / 2 - 10 &&
      pos.x < line.pos.x + line.txtWidth / 2 + 10 &&
      pos.y > line.pos.y - line.size &&
      pos.y < gCanvas.height - (gCanvas.height - line.pos.y - 10)
    );
  });
  return idx;
}

function updateActiveLine(idx) {
  gMeme.selectedLineIdx = idx;
}

function changeProperty(property, value) {
  gMeme.lines[gMeme.selectedLineIdx][property] = value;
}

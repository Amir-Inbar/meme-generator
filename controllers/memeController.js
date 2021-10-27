var gOldTxt;
var gRects = [];
var gIsDragging = false;
var gDragStartPos;
var gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function init() {
  createNav();
  renderCanvas();
  renderImages();
  addEventListeners();
}

function addEventListeners() {
  addMouseListeners();
  addTouchListeners();
}

function addMouseListeners() {
  gCanvas.addEventListener('mousedown', onDown);
  gCanvas.addEventListener('mousemove', onMove);
  gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove);
  gCanvas.addEventListener('touchstart', onDown);
  gCanvas.addEventListener('touchend', onUp);
}

function onFillInput() {
  var meme = getActiveLine();
  var elInput = document.querySelector('.canvas-input');
  if (meme.txt !== 'Type Me') elInput.value = meme.txt;
}

function emptyInput() {
  var elInput = document.querySelector('.canvas-input');
  elInput.value = '';
}

function onDown(ev) {
  emptyInput();
  const pos = getEvPos(ev);
  if (!lineClicked(pos)) return;
  renderCanvas();
  gDragStartPos = pos;
  gCanvas.style.cursor = 'grabbing';
}

function onMove(ev) {
  var activeLine = getActiveLine();
  if (gIsDragging) {
    const pos = getEvPos(ev);
    const dx = pos.x - gDragStartPos.x;
    const dy = pos.y - gDragStartPos.y;
    activeLine.pos.x += dx;
    activeLine.pos.y += dy;
    gDragStartPos = pos;
    renderCanvas();
  }
}

function onUp() {
  gCanvas.style.cursor = 'grab';
  var activeLine = getActiveLine();
  if (!activeLine) return;
  gIsDragging = false;
  renderCanvas();
}

function lineClicked(pos) {
  var idx = findClickedLineIdx(pos);
  updateActiveLine(idx);
  renderCanvas();
  if (idx !== -1) {
    onFillInput();
    gIsDragging = true;
    return true;
  } else return false;
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    console.log(ev);
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function renderCanvas() {
  var meme = getMeme();
  var img = new Image();
  img.src = `../img/${meme.selectedImgId}.jpg`;
  img.onload = () => {
    resizeCanvas(img);
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    drawText();
    markLine();
  };
}

function drawText() {
  var meme = getMeme();
  var memeLine = meme.lines;
  memeLine.map((memeLine) => {
    gCtx.beginPath();
    gCtx.font = `${memeLine.size}px ${memeLine.font}`;
    var txtWidth = gCtx.measureText(memeLine.txt).width;
    memeLine.txtWidth = txtWidth;
    // changeProperty('txtWidth', txtWidth);
    gCtx.textAlign = 'start';
    gCtx.textBaseline = 'alphabetic';
    // gCtx.direction = `${memeLines.align}`;

    gCtx.lineWidth = 1;
    gCtx.strokeStyle = `${memeLine.stroke}`;
    gCtx.fillStyle = `${memeLine.color}`;
    gCtx.font = `${memeLine.font}`;
    gCtx.textAlign = `${memeLine.align}`;

    gCtx.fillText(memeLine.txt, memeLine.pos.x, memeLine.pos.y);
    gCtx.strokeText(memeLine.txt, memeLine.pos.x, memeLine.pos.y);
  });
  // drawRect();
}

function markLine() {
  var meme = getMeme();
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

function onClearCanvas() {
  clearCanvas(true);
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
  txtDirection(AlignBy, gCanvas.width);
  renderCanvas();
}

function onRenderNewLine() {
  var input = document.querySelector('.canvas-input');
  input.value = '';
  renderNewLine();
  renderCanvas();
}

function onUpdateCurrLine(txt) {
  updateCurrLine(txt);
  renderCanvas();
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

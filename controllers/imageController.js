function renderImages() {
  var elContainerImgs = document.querySelector('.gallery-container');
  var imgs = getImages();
  var htmlStr;
  imgs.map((img) => {
    htmlStr += `
      <div class="card">
        <img src="./img/${img.id}.jpg" alt="meme" onclick="onSetImage(${img.id})">
        </div>
        `;
  });
  elContainerImgs.innerHTML = htmlStr;
}

function onSetImage(imgId) {
  var meme = getMeme();
  if (meme.selectedImgId === imgId) return;
  setImage(imgId);
  renderCanvas();
}

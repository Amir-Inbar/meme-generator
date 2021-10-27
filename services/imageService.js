var gImgs = createImages();

function createImages() {
  var imgs = [
    createImage(1, '../img/1.jpg', ['happy', 'dance']),
    createImage(2, '../img/2.jpg', [
      'president',
      'donald',
      'trump',
      'human',
      'adult',
    ]),
    createImage(3, '../img/3.jpg', ['dog', 'sweet, kiss', 'animal']),
    createImage(4, '../img/4.jpg', ['dog', 'baby,', 'bed', 'animal']),
    createImage(5, '../img/5.jpg', ['strong', 'beach', 'baby']),
    createImage(6, '../img/6.jpg', ['cat', 'sleep']),
    createImage(7, '../img/7.jpg', ['why']),
    createImage(8, '../img/8.jpg', ['tell me', 'amazing']),
    createImage(9, '../img/9.jpg', ['laugh']),
    createImage(10, '../img/10.jpg', ['actor', 'adult', 'human', 'show']),
    createImage(11, '../img/11.jpg', ['strange', 'big']),
    createImage(12, '../img/12.jpg', ['human', 'evil', 'bad']),
    createImage(13, '../img/13.jpg', ['dance', 'kids']),
    createImage(14, '../img/14.jpg', ['trump', 'happy', 'president']),
    createImage(15, '../img/15.jpg', ['surprised', 'kid']),
    createImage(16, '../img/16.jpg', ['animal', 'dog', 'small']),
    createImage(17, '../img/17.jpg', ['obama', 'happy', 'president']),
    createImage(18, '../img/18.jpg', ['kiss', 'human']),
    createImage(19, '../img/19.jpg', ['actor', 'happy']),
    createImage(20, '../img/20.jpg', ['cool', 'human', 'mistry']),
    createImage(21, '../img/21.jpg', ['tiny', 'actor']),
    createImage(22, '../img/22.jpg', ['happy', 'red', 'human']),
    createImage(23, '../img/23.jpg', ['tell me', 'amazing']),
    createImage(24, '../img/24.jpg', ['president', 'putin', 'strong']),
    createImage(25, '../img/25.jpg', ['toys', 'tiny', 'happy']),
  ];
  return imgs;
}

function createImage(id, url, keywords = []) {
  return {
    id,
    url,
    keywords,
  };
}

function getImages() {
  return gImgs;
}

function setImage(imgId) {
  var meme = getMeme();
  meme.selectedImgId = imgId;
}

function getImgById(imgId) {
  return gImgs.filter((img) => img.id === imgId);
}

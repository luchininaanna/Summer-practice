let resources = [];
let count = 0;

function loadResources(startFunction) {
  const images = [
    {
      name: imageNames.SCOREBOARD,
      src: "image/scoreboard.png"
    },
    {
      name: imageNames.BACKGROUND,
      src: "image/background.png"
    },
    {
      name: imageNames.FIRST_LAND,
      src: "image/firstLand.png"
    },
    {
      name: imageNames.SECOND_LAND,
      src: "image/secondLand.png"
    },
    {
      name: imageNames.ICE_BOX,
      src: "image/iceBox.png"
    },
    {
      name: imageNames.PLAYER,
      src: "image/player.png"
    },
    {
      name: imageNames.ROCKS,
      src: "image/rocks.png"
    }
  ];
  let loader = new LoadResources(startFunction);
  loader.addImages(images);
}

function LoadResources(startFunction) {
  this.checkLoading = function () {
    if (count === MAX_COUNTER_VALUE) {
      g_context.resources = this.getImages();
      startFunction();
    }
  };

  this.increaseCounter = function () {
    count++;
  };

  this.addImage = function (name, src) {
    let image = new Image();
    image.src = src;
    image.onload = this.increaseCounter();
    resources[name] = image;
    this.checkLoading();
  };

  this.addImages = function (images) {
    let amountImages = images.length;
    for (let i = 0; i < amountImages; i++) {
      this.addImage(images[i].name, images[i].src);
    }
  };

  this.getImages = function () {
    return resources;
  }
}
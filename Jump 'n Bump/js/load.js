function loadResources() {
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
      name: imageNames.RIGHT_FIRST_PLAYER,
      src: "image/rightFirstPlayer.png"
    },
    {
      name: imageNames.RIGHT_SECOND_PLAYER,
      src: "image/rightSecondPlayer.png"
    },
    {
      name: imageNames.RIGHT_THIRD_PLAYER,
      src: "image/rightThirdPlayer.png"
    },
    {
      name: imageNames.RIGHT_FOURTH_PLAYER,
      src: "image/rightFourthPlayer.png"
    },
    {
      name: imageNames.LEFT_FIRST_PLAYER,
      src: "image/leftFirstPlayer.png"
    },
    {
      name: imageNames.LEFT_SECOND_PLAYER,
      src: "image/leftSecondPlayer.png"
    },
    {
      name: imageNames.LEFT_THIRD_PLAYER,
      src: "image/leftThirdPlayer.png"
    },
    {
      name: imageNames.LEFT_FOURTH_PLAYER,
      src: "image/leftFourthPlayer.png"
    },
    {
      name: imageNames.ROCKS,
      src: "image/rocks.png"
    },
    {
      name: imageNames.RESULT_BACKGROUND,
      src: "image/resultBackground.png"
    },
    {
      name: imageNames.BURST,
      src: "image/burst.png"
    }
  ];
  let resources = [];
  let count = 0;
  let loader = new LoadResources(resources, count);
  loader.addImages(images);
  let isLoad = loader.checkLoading();
  if (isLoad) {
    g_context.resources = loader.getImages();
  }
}

function LoadResources(resources, count) {
  this.checkLoading = function () {
    if (count === MAX_COUNTER_VALUE) {
      return true;
    }
    return false;
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
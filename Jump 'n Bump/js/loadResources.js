function loadResources() {
  let resources = [];

  let makeCounter = function () {
    let counter = 0;
    return {
      increment: function () {
        counter += 1;
        if (counter === MAX_COUNTER_VALUE) {
          g_context.resources = resources;
          gameLoop();
        }
      },
      value: function () {
        return counter;
      }
    }
  };

  let counter = makeCounter();

  let background = new Image;
  background.onload = counter.increment();
  background.src = "image/background.png";
  resources[counter.value() - 1] = background;

  let firstLand = new Image;
  firstLand.onload = counter.increment();
  firstLand.src = "image/firstLand.png";
  resources[counter.value() - 1] = firstLand;

  let secondLand = new Image;
  secondLand.onload = counter.increment();
  secondLand.src = "image/secondLand.png";
  resources[counter.value() - 1] = secondLand;

  let iceBox = new Image;
  iceBox.src = "image/iceBox.png";
  iceBox.onload = counter.increment();
  resources[counter.value() - 1] = iceBox;

  let rocks = new Image;
  rocks.src = "image/rocks.png";
  rocks.onload = counter.increment();
  resources[counter.value() - 1] = rocks;

  let player = new Image;
  player.src = "image/player.png";
  player.onload = counter.increment();
  resources[counter.value() - 1] = player;
}
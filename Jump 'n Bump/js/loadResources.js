function loadResources() {
  let resources = [];
  let counter = 0;

  function increment() {
    counter += 1;
    if (counter === MAX_COUNTER_VALUE) {
      gameLoop();
    }
  }

  let background = new Image();
  background.onload = increment;
  background.src = "image/background.png";
  resources["background"] = background;

  let firstLand = new Image();
  firstLand.onload = increment;
  firstLand.src = "image/firstLand.png";
  resources["firstLand"] = firstLand;

  let secondLand = new Image();
  secondLand.onload = increment;
  secondLand.src = "image/secondLand.png";
  resources["secondLand"] = secondLand;

  let iceBox = new Image();
  iceBox.src = "image/iceBox.png";
  iceBox.onload = increment;
  resources["iceBox"] = iceBox;

  let rocks = new Image();
  rocks.src = "image/rocks.png";
  rocks.onload = increment;
  resources["rocks"] = rocks;

  let player = new Image();
  player.src = "image/player.png";
  player.onload = increment;
  resources["player"] = player;

  g_context.resources = resources;
}
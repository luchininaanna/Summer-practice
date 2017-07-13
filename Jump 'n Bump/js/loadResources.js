function loadResources(startFunction) {
  let resources = [];
  let counter = 0;

  function increment() {
    counter += 1;
    if (counter === MAX_COUNTER_VALUE) {
      startFunction();
    }
  }

  let background = new Image();
  background.onload = increment;
  background.src = "image/background.png";
  resources[imageNames.BACKGROUND] = background;

  let firstLand = new Image();
  firstLand.onload = increment;
  firstLand.src = "image/firstLand.png";
  resources[imageNames.FIRST_LAND] = firstLand;

  let secondLand = new Image();
  secondLand.onload = increment;
  secondLand.src = "image/secondLand.png";
  resources[imageNames.SECOND_LAND] = secondLand;

  let iceBox = new Image();
  iceBox.src = "image/iceBox.png";
  iceBox.onload = increment;
  resources[imageNames.ICE_BOX] = iceBox;

  let rocks = new Image();
  rocks.src = "image/rocks.png";
  rocks.onload = increment;
  resources[imageNames.ROCKS] = rocks;

  let player = new Image();
  player.src = "image/player.png";
  player.onload = increment;
  resources[imageNames.PLAYER] = player;

  let scoreboard = new Image();
  scoreboard.src = "image/scoreboard.png";
  scoreboard.onload = increment;
  resources[imageNames.SCOREBOARD] = scoreboard;

  g_context.resources = resources;
}
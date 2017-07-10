addEventListener("keydown", checkPressedButtons);

addEventListener("keyup", checkReleasedButtons);

window.onresize = function changeCanvasSize() {
  let ctx = g_context.ctx;
  scalingWindow(ctx);
};

function checkPressedButtons(event) {
  let players = g_world.players;
  let firstPlayer = players.firstPlayer;
  let secondPlayer = players.secondPlayer;
  changePressedState(firstPlayer, event.keyCode, firstPlayer.movingButtons);
  changePressedState(secondPlayer, event.keyCode, secondPlayer.movingButtons);
}
function changePressedState(checkingPlayer, keyCode, movingButtons) {
  switch (keyCode) {
    case movingButtons.RIGHT:
      checkingPlayer.rightMove = 1;
      console.log("RIGHT DOWN");
      break;
    case movingButtons.LEFT:
      checkingPlayer.leftMove = 1;
      console.log("LEFT DOWN");
      break;
    case movingButtons.UP:
      checkingPlayer.upMove = 1;
      checkingPlayer.jumpState = playerInformation.UP_JUMP;
      console.log("UP DOWN");
      break;
  }
}

function checkReleasedButtons(event) {
  let players = g_world.players;
  let firstPlayer = players.firstPlayer;
  let secondPlayer = players.secondPlayer;
  changeReleasedState(firstPlayer, event.keyCode, firstPlayer.movingButtons);
  changeReleasedState(secondPlayer, event.keyCode, secondPlayer.movingButtons);
}
function changeReleasedState(checkingPlayer, keyCode, movingButtons) {
  switch (keyCode) {
    case movingButtons.RIGHT:
      checkingPlayer.rightMove = 0;
      console.log("RIGHT UP");
      break;
    case movingButtons.LEFT:
      checkingPlayer.leftMove = 0;
      console.log("LEFT UP");
      break;
    case movingButtons.UP:
      console.log("UP UP");
      break;
  }
}

function scalingWindow(ctx) {
  let widthToHeight = 33 / 18;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;
  let widthCoefficient;
  let heightCoefficient;
  if (newWidthToHeight > widthToHeight) { // ширина окна шире, чем желаемая ширина игры
    heightCoefficient = newHeight / canvasSize.HEIGHT;
    widthCoefficient = heightCoefficient * 33 / 18;
    newWidth = newHeight * widthCoefficient / heightCoefficient;
    widthCoefficient = newWidth / canvasSize.WIDTH;
  } else { // высота окна выше желаемой высоты игры
    widthCoefficient = newWidth / canvasSize.WIDTH;
    heightCoefficient = widthCoefficient * 18 / 33;
  }
  ctx.width = widthCoefficient * canvasSize.WIDTH;
  ctx.height = heightCoefficient * canvasSize.HEIGHT;
  ctx.scale(widthCoefficient, heightCoefficient);
}
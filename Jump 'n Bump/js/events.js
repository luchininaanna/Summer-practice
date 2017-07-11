addEventListener("keydown", checkPressedButtons);

addEventListener("keyup", checkReleasedButtons);

window.onresize = function changeCanvasSize() {
  let ctx = g_context.ctx;
  ctx.restore();
  ctx.save();
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
      break;
    case movingButtons.LEFT:
      checkingPlayer.leftMove = 1;
      break;
    case movingButtons.UP:
      checkingPlayer.upMove = 1;
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
      break;
    case movingButtons.LEFT:
      checkingPlayer.leftMove = 0;
      break;
  }
}

function scalingWindow(ctx) {
  let widthToHeight = canvasSize.WIDTH / canvasSize.HEIGHT;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;
  let widthCoefficient;
  let heightCoefficient;
  if (newWidthToHeight > widthToHeight) { // ширина окна шире, чем желаемая ширина игры
    heightCoefficient = newHeight / canvasSize.HEIGHT;
    ctx.scale(heightCoefficient, heightCoefficient);
  } else { // высота окна выше желаемой высоты игры
    widthCoefficient = newWidth / canvasSize.WIDTH;
    ctx.scale(widthCoefficient, widthCoefficient);
  }
}
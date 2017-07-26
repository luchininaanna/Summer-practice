addEventListener("keydown", checkPressedButtons);
addEventListener("keyup", checkReleasedButtons);

function changeCanvasSize() {
  let ctx = g_context.ctx;
  let canvas = g_context.canvas;
  ctx.restore();
  ctx.save();
  scalingWindow(ctx, canvas);
}
window.onresize = changeCanvasSize;
changeCanvasSize();

function checkPressedButtons(event) {
  let players = g_world.players;
  let firstPlayer = players.firstPlayer;
  let secondPlayer = players.secondPlayer;
  let thirdPlayer = players.thirdPlayer;
  if (firstPlayer) {
    changePressedState(firstPlayer, event.keyCode, firstPlayer.movingButtons);
  }
  if (secondPlayer) {
    changePressedState(secondPlayer, event.keyCode, secondPlayer.movingButtons);
  }
  if (thirdPlayer) {
    changePressedState(thirdPlayer, event.keyCode, thirdPlayer.movingButtons);
  }
  changeStateOfGame(event.keyCode);
}
function changeStateOfGame(keyCode) {
  switch (keyCode) {
    case resultButton.RESULT:
      g_world.state = statesOfGame.RESULT;
      break;
    case resultButton.NEW_GAME:
      g_world.state = statesOfGame.IN_PROCESS;  //в полной версии - выбор игроков
      g_world.players = getPlayers();
      g_world.scoreboards = getScoreboards();
      break;
  }
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
  let thirdPlayer = players.thirdPlayer;
  if (firstPlayer) {
    changeReleasedState(firstPlayer, event.keyCode, firstPlayer.movingButtons);
  }
  if (secondPlayer) {
    changeReleasedState(secondPlayer, event.keyCode, secondPlayer.movingButtons);
  }
  if (thirdPlayer) {
    changeReleasedState(thirdPlayer, event.keyCode, thirdPlayer.movingButtons);
  }
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

function scalingWindow(ctx, canvas) {
  let widthToHeight = canvasSize.WIDTH / canvasSize.HEIGHT;
  let newWidth = window.innerWidth;
  let newHeight = window.innerHeight;
  let newWidthToHeight = newWidth / newHeight;
  let coefficient;

  if (newWidthToHeight > widthToHeight) { // ширина окна шире, чем желаемая ширина игры
    coefficient = newHeight / canvasSize.HEIGHT; //heightCoefficient
  } else {                                // высота окна выше желаемой высоты игры
    coefficient = newWidth / canvasSize.WIDTH;//widthCoefficient
  }
  if (coefficient > canvasSize.MAX_COEFFICIENT) {
    coefficient = canvasSize.MAX_COEFFICIENT;
  }
  canvas.width = canvasSize.WIDTH * coefficient;
  canvas.height = canvasSize.HEIGHT * coefficient;
  ctx.scale(coefficient, coefficient);
}
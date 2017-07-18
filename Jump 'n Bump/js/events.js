addEventListener("keydown", checkPressedButtons);
addEventListener("keyup", checkReleasedButtons);

window.onresize = function changeCanvasSize() {
  let ctx = g_context.ctx;
  let canvas = g_context.canvas;
  ctx.restore();
  ctx.save();
  scalingWindow(ctx, canvas);
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
  canvas.width = canvasSize.WIDTH * coefficient;
  canvas.height = canvasSize.HEIGHT * coefficient;
  ctx.scale(coefficient, coefficient);
}
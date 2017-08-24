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
  if (players) {
    for (let key in players) {
      changePressedState(players[key], event.keyCode, players[key].movingButtons);
    }
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
  checkLandForMoving(checkingPlayer);

  switch (keyCode) {
    case movingButtons.RIGHT:
      if ((checkingPlayer.typeBottomUnderPlayer === bottomType.ICE) && (checkingPlayer.rightMove === 0)){
        checkingPlayer.iceStartMoving = states.ACTIVE;
        checkingPlayer.horizontalSpeed = playerInformation.ZERO_HORIZONTAL_SPEED;
      }
      checkingPlayer.rightMove = 1;
      break;

    case movingButtons.LEFT:
      if ((checkingPlayer.typeBottomUnderPlayer === bottomType.ICE) && (checkingPlayer.leftMove === 0)){
        checkingPlayer.iceStartMoving = states.ACTIVE;
        checkingPlayer.horizontalSpeed = playerInformation.ZERO_HORIZONTAL_SPEED;
      }
      checkingPlayer.leftMove = 1;
      break;

    case movingButtons.UP:
      checkingPlayer.upMove = 1;
      break;
  }
}

function checkReleasedButtons(event) {
  let players = g_world.players;
  if (players) {
    for (let key in players) {
      changeReleasedState(players[key], event.keyCode, players[key].movingButtons);
    }
  }
}
function changeReleasedState(checkingPlayer, keyCode, movingButtons) {
  checkLandForMoving(checkingPlayer);

  switch (keyCode) {
    case movingButtons.RIGHT:
      if ((checkingPlayer.typeBottomUnderPlayer === bottomType.ICE) && (checkingPlayer.rightMove === 1)){
        checkingPlayer.iceRightFinishMoving = states.ACTIVE;
      }
      checkingPlayer.rightMove = 0;
      checkingPlayer.imageX = playerImage.FIRST_RIGHT_X;
      checkingPlayer.rightFreeSpace = playerInformation.RIGHT_FREE_SPACE_RIGHT_MOVE;
      checkingPlayer.leftFreeSpace = playerInformation.LEFT_FREE_SPACE_RIGHT_MOVE;
      break;

    case movingButtons.LEFT:
      if ((checkingPlayer.typeBottomUnderPlayer === bottomType.ICE) && (checkingPlayer.leftMove === 1)){
        checkingPlayer.iceLeftFinishMoving = states.ACTIVE;
      }
      checkingPlayer.leftMove = 0;
      checkingPlayer.imageX = playerImage.FIRST_LEFT_X;
      checkingPlayer.rightFreeSpace = playerInformation.RIGHT_FREE_SPACE_LEFT_MOVE;
      checkingPlayer.leftFreeSpace = playerInformation.LEFT_FREE_SPACE_LEFT_MOVE;
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

function checkLandForMoving(player) {
  let worldElements = g_world.worldElements;
  let playerBox = player.getBox();
  for (let key in worldElements) {
    let worldElementBox = worldElements[key].getBox();

    let underLand = (((worldElementBox.firstX >= playerBox.firstX) &&
    (worldElementBox.firstX <= playerBox.secondX)) ||
    ((playerBox.firstX >= worldElementBox.firstX) &&
    (playerBox.firstX <= worldElementBox.secondX)));

    let onLand = (playerBox.secondY === worldElementBox.y);

    if (underLand && onLand) {
      player.typeBottomUnderPlayer = worldElements[key].type;
      if (worldElements[key].type !== bottomType.ICE) {
        player.iceStartMoving = states.INACTIVE;
        player.iceRightFinishMoving = states.INACTIVE;
        player.iceLeftFinishMoving = states.INACTIVE;
      }
    }
  }
}
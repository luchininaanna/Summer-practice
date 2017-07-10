function drawObjects(ctx, gameWorldObjects) {
  if (gameWorldObjects) {
    for (let key in gameWorldObjects) {
      drawObject(ctx, gameWorldObjects[key]);
    }
  }
}
function drawObject(ctx, object) {
  ctx.drawImage(object.source, object.image_x, object.image_y, object.image_width, object.image_height,
      object.x, object.y, object.width, object.height);
}

function updatePlayersCoordinates(players, deltaTime) {
  if (players) {
    for (let key in players) {
      updatePlayerCoordinates(players, players[key], deltaTime);
    }
  }
  return players;
}
function updatePlayerCoordinates(players, player, deltaTime) {
  if (player.rightMove === 1) {
    let updatedX = player.x + player.horizontalSpeed * deltaTime;
    let freeSpace = checkOthersPlayers(player, updatedX, players);
    if ((updatedX > 0) && (updatedX < canvasSize.WIDTH - player.width) && (freeSpace)) {
      player.x = updatedX;
    }
  }

  if (player.leftMove === 1) {
    let updatedX = player.x - player.horizontalSpeed * deltaTime;
    let freeSpace = checkOthersPlayers(player, updatedX, players);
    if ((updatedX > 0) && (updatedX < canvasSize.WIDTH - player.width) && (freeSpace)) {
      player.x = updatedX;
    }
  }

  if (player.upMove === 1) {
    let updatedY;
    let updatedHeight;
    let updatedSpeed;
    let updatedTime = player.jumpTime + deltaTime/100;
    if (player.nowJumpHeight === 0) {
      player.startY = player.y;
      player.startSpeed = player.verticalSpeed;
      player.maxHeight = (player.verticalSpeed * player.verticalSpeed)/ (2 * player.accelerationOfGravity);
    }
    player.jumpTime = updatedTime;
    console.log(player.startSpeed);
    if (player.jumpState === playerInformation.UP_JUMP){
      updatedSpeed = player.startSpeed - player.accelerationOfGravity *
          player.jumpTime;
      player.verticalSpeed = updatedSpeed;
      updatedY = player.startY - (player.verticalSpeed*player.jumpTime) - (player.accelerationOfGravity *
          player.jumpTime * player.jumpTime / 2);
      updatedHeight = player.nowJumpHeight + (player.y - updatedY);
      player.nowJumpHeight = updatedHeight;
      if (player.nowJumpHeight >= 127) {
        player.jumpState = playerInformation.DOWN_JUMP;
        player.startSpeed = 0;
        player.jumpTime = 0;
      }
    }
    if (player.jumpState === playerInformation.DOWN_JUMP){
      console.log("***************");
      updatedSpeed = player.startSpeed + player.accelerationOfGravity *
          player.jumpTime;
      player.verticalSpeed = updatedSpeed;
      updatedY = player.startY - (player.verticalSpeed*player.jumpTime) +
          (player.accelerationOfGravity *player.jumpTime *player.jumpTime / 2);
      updatedHeight = player.nowJumpHeight - (updatedY - player.y);
      player.nowJumpHeight = updatedHeight;
      console.log(player.nowJumpHeight);
      if (player.nowJumpHeight <= 0) {
        player.upMove = 0;
        player.jumpTime = 0;
        player.nowJumpHeight = 0;
        player.speed = player.VERTICAL_SPEED;
      }
    }
    player.y = updatedY;
  }
}

function checkOthersPlayers(player, updatedX, players) {
  if (players) {
    for (let key in players) {
      if (players[key] != player) {
        let otherPlayer = players[key];
        if ((((updatedX + player.width - player.rightFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
            && ((updatedX + player.width - player.rightFreeSpace) < (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace)))  //проверка игрока справа
            ||
            (((updatedX + player.leftFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
            && ((updatedX + player.leftFreeSpace) < (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace)))) { //проверка игрока слева
          return false;
        }
      }
    }
  }
  return true;
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
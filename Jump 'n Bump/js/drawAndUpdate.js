function drawObjects(ctx, objects) {
  if (objects) {
    for (let key in objects) {
      drawObject(ctx, objects[key]);
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
    let freeHorizontallySpace = checkOthersHorizontallyPlayers(player, updatedX, players);
    let freeVerticallySpace = checkOthersVerticallyPlayers(player, player.y, players);
    if (((updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width) && freeHorizontallySpace)
        || ((!freeHorizontallySpace) && (freeVerticallySpace) && (player.upMove === 1))) {
      player.x = updatedX;
    }
  }

  if (player.leftMove === 1) {
    let updatedX = player.x - player.horizontalSpeed * deltaTime;
    let freeHorizontallySpace = checkOthersHorizontallyPlayers(player, updatedX, players);
    let freeVerticallySpace = checkOthersVerticallyPlayers(player, player.y, players);
    if (((updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width) && freeHorizontallySpace)
        || ((!freeHorizontallySpace) && (freeVerticallySpace) && (player.upMove === 1))) {
      player.x = updatedX;
    }
  }

  if (player.upMove === 1) {
    let updatedSpeed = player.verticalSpeed - player.accelerationOfGravity * deltaTime / 100;
    player.verticalSpeed = updatedSpeed;
    let updatedY = player.y - updatedSpeed * deltaTime / 100;
    let freeVerticallySpace = checkOthersVerticallyPlayers(player, updatedY, players);
    let freeHorizontallySpace = checkOthersHorizontallyPlayers(player, player.x, players);
    player.y = updatedY;
    if ((!freeHorizontallySpace) && (!freeVerticallySpace)) {
      console.log("DELETE");
    }
    if (player.y > 785) {
      player.upMove = 0;
      player.verticalSpeed = playerInformation.START_VERTICAL_SPEED;
    }
  }
}

function checkOthersHorizontallyPlayers(player, updatedX, players) {
  if (players) {
    for (let key in players) {
      if (players[key] != player) {
        let otherPlayer = players[key];
        if ((((updatedX + player.width - player.rightFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
            && ((updatedX + player.width - player.rightFreeSpace) < (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace)))//проверка игрока справа
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
function checkOthersVerticallyPlayers(player, updatedY, players) {
  if (players) {
    for (let key in players) {
      if (players[key] != player) {
        let otherPlayer = players[key];
        if (((updatedY + player.height) > (otherPlayer.y + otherPlayer.topFreeSpace))
            && (updatedY + player.topFreeSpace) < (otherPlayer.y + otherPlayer.height))
          return false;
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
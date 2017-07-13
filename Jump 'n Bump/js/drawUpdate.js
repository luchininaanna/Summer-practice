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
    createRightMoving(players, player, deltaTime);
  }

  if (player.leftMove === 1) {
    createLeftMoving(players, player, deltaTime);
  }

  if (player.upMove === 1) {
    createJump(players, player, deltaTime);
  }
}

function createRightMoving(players, player, deltaTime) {
  let updatedX = player.x + player.horizontalSpeed * deltaTime;
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, updatedX, players);
  let freeTopSpace = g_world.checkTopFree(player, player.y, players);
  let freeBottomSpace = g_world.checkBottomFree(player, player.y, players);
  if (((updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width)
      && freeHorizontallySpace) || ((!freeHorizontallySpace) &&
      (freeTopSpace && freeBottomSpace) && (player.upMove === 1))) {
    player.x = updatedX;
  }
}
function createLeftMoving(players, player, deltaTime) {
  let updatedX = player.x - player.horizontalSpeed * deltaTime;
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, updatedX, players);
  let freeTopSpace = g_world.checkTopFree(player, player.y, players);
  let freeBottomSpace = g_world.checkBottomFree(player, player.y, players);
  if (((updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width) && freeHorizontallySpace)
      || ((!freeHorizontallySpace) && (freeTopSpace && freeBottomSpace) && (player.upMove === 1))) {
    player.x = updatedX;
  }
}
function createJump(players, player, deltaTime) {
  let updatedSpeed = player.verticalSpeed - player.accelerationOfGravity * deltaTime / 100;
  player.verticalSpeed = updatedSpeed;
  let updatedY = player.y - updatedSpeed * deltaTime / 100;
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, player.x, players);
  let freeTopSpace = g_world.checkTopFree(player, updatedY, players);
  let freeBottomSpace = g_world.checkBottomFree(player, updatedY, players);
  player.y = updatedY;
  if ((!freeHorizontallySpace) && !(freeTopSpace) && !(freeBottomSpace)) {
    console.log("DELETE");
  }
  if (player.y > 785) {
    player.upMove = 0;
    player.verticalSpeed = playerInformation.START_VERTICAL_SPEED;
  }
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
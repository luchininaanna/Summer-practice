function updatePlayersCoordinates(players, deltaTime) {
  if (players) {
    for (let key in players) {
      updatePlayerCoordinates(players[key], deltaTime);
    }
  }
  return players;
}
function updatePlayerCoordinates(player, deltaTime) {
  if (player.rightMove === 1) {
    player.speedCoefficient = speedCoefficients.RIGHT_MOVING;
    moveHorizontally(player, deltaTime);
  }

  if (player.leftMove === 1) {
    player.speedCoefficient = speedCoefficients.LEFT_MOVING;
    moveHorizontally(player, deltaTime);
  }

  if (player.upMove === 1) {
    jump(player, deltaTime);
  }
}

function moveHorizontally(player, deltaTime) {
  player.updateImage(deltaTime);
  player.updatedX = player.x + player.horizontalSpeed * deltaTime * player.speedCoefficient;

  let prevX = player.x;
  player.x = player.updatedX;

  let isScreen = (player.updatedX > 0) &&
      (player.updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width);

  let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
  let isFreeSpaceFromPlayers = g_world.checkSpaceFree(player, alivePlayers);

  let stairs = g_world.stairs;
  let isFreeSpaceFromStairs = g_world.checkSpaceFree(player, stairs);

  let isPlayerLanded = g_world.checkLandUnderPlayer(player, stairs);
  if (!isPlayerLanded) {
    if ((player.upMove === 0) && (player.landed === states.INACTIVE)) {
      player.upMove = 1;
      player.verticalSpeed = playerInformation.START_ZERO_VERTICAL_SPEED;
    }
  }

  if (((!isFreeSpaceFromPlayers || !isFreeSpaceFromStairs) && isScreen && player.upMove === 0) || (!isScreen)) {
    player.x = prevX;
  }
}

function jump(player, deltaTime) {
  player.landed = states.INACTIVE;
  let updatedSpeed = player.verticalSpeed - player.accelerationOfGravity * deltaTime / 50;
  player.verticalSpeed = updatedSpeed;
  player.updatedY = player.y - updatedSpeed * deltaTime / 100 * playerInformation.MASS;

  let prevY = player.y;
  player.y = player.updatedY;

  if (updatedSpeed < 0) { // игрок падает => проверяем землю
    let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
    let isFreeSpaceFromPlayers = g_world.checkSpaceFree(player, alivePlayers);

    if (!isFreeSpaceFromPlayers) {
      if (g_world.collisionEvent === states.INACTIVE) {
        g_world.collisionEvent = states.ACTIVE;
        g_world.searchCollisionPlayers(player, alivePlayers);
      }
    }

    let stairs = g_world.stairs;
    let isFreeSpaceFromStairs = g_world.checkSpaceFree(player, stairs);

    if (!isFreeSpaceFromStairs) {
      player.y = player.nextLand - playerInformation.HEIGHT + smallStair.TOP_FREE_SPACE;
      player.landed = states.ACTIVE;
      player.upMove = 0;
      player.verticalSpeed = playerInformation.START_BIG_VERTICAL_SPEED;
    }
  } else {  // игрок летит наверх => проверяем препятствия
    let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
    let isFreeSpaceFromPlayers = g_world.checkSpaceFree(player, alivePlayers);

    if (!isFreeSpaceFromPlayers) {
      g_world.searchCollisionPlayers(player, alivePlayers);
    }

    let stairs = g_world.stairs;
    let isFreeSpaceFromStairs = g_world.checkSpaceFree(player, stairs);

    if (!isFreeSpaceFromStairs) {
      player.y = prevY;
    }
  }
}

function animatePlayers(unalivePlayers, deltaTime){
  if (unalivePlayers) {
    for (let key in unalivePlayers) {
      unalivePlayers[key].animate(deltaTime);
    }
  }
}

function updatePromptTime(deltaTime, scoreboards) {
  if (scoreboards) {
    for (let key in scoreboards) {
      if (scoreboards[key].prompt.timeInterval >= promptInformation.TIME_INTERVAL) {
        switch (scoreboards[key].prompt.state) {
          case states.INACTIVE:
            scoreboards[key].prompt.state = states.ACTIVE;
            break;
          case states.ACTIVE:
            scoreboards[key].prompt.state = states.INACTIVE;
            break;
        }
        scoreboards[key].prompt.timeInterval = 0;
      } else {
        let timeSum = scoreboards[key].prompt.timeInterval + deltaTime / 1000;
        scoreboards[key].prompt.timeInterval = timeSum;
      }
    }
  }
}
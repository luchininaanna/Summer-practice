function updatePlayersCoordinates(players, deltaTime) {
  if (players) {
    for (let key in players) {
      updatePlayerCoordinates(players[key], deltaTime);
    }
  }
  return players;
}
function updatePlayerCoordinates(player, deltaTime) {
  if ((player.rightMove === 1) || (player.iceFinishMoving === states.ACTIVE)) {
    player.speedCoefficient = speedCoefficients.RIGHT_MOVING;
    moveHorizontally(player, deltaTime);
  }

  if ((player.leftMove === 1) || (player.iceFinishMoving === states.ACTIVE)) {
    player.speedCoefficient = speedCoefficients.LEFT_MOVING;
    moveHorizontally(player, deltaTime);
  }

  if (player.upMove === 1) {
    jump(player, deltaTime);
  }
}

function moveHorizontally(player, deltaTime) {
  let newDelta;

  // постепенное увеличение скорости игрока на льду
  if (player.iceStartMoving === states.ACTIVE) {
    if (player.startIceDelta === 0) {
      newDelta = playerInformation.START_ICE_DELTA;
    } else {
      newDelta = player.startIceDelta * playerInformation.ICE_COEFFICIENT;
    }
    player.startIceDelta = newDelta;
    let newScore = player.horizontalSpeed + newDelta;
    if (newScore < playerInformation.HORIZONTAL_SPEED) {
      player.horizontalSpeed = newScore;
    } else {
      player.horizontalSpeed = playerInformation.HORIZONTAL_SPEED;
      player.iceStartMoving = states.INACTIVE;
      player.startIceDelta = 0;
    }
  } else {
    player.horizontalSpeed = playerInformation.HORIZONTAL_SPEED;
  }

  //постепенное понижение скорости игрока на льду
  //if (player.iceFinishMoving === states.ACTIVE) {
  // if (player.startIceDelta === 0) {
  //    newDelta = playerInformation.START_ICE_DELTA;
  //  } else {
  //    newDelta = player.startIceDelta * playerInformation.ICE_COEFFICIENT;
  //  }
  //  player.startIceDelta = newDelta;
  //  let newScore = player.horizontalSpeed - newDelta;
  //  if (newScore > 0) {
  //    player.horizontalSpeed = newScore;
  //  } else {
  //    player.horizontalSpeed = 0;
  //    player.iceFinishMoving = states.INACTIVE;
  //   player.startIceDelta = 0;
  //  }
  //} else {
  //  player.horizontalSpeed = playerInformation.HORIZONTAL_SPEED;
  //}

  player.updateImage(deltaTime);
  player.updatedX = player.x + player.horizontalSpeed * deltaTime * player.speedCoefficient;

  let prevX = player.x;
  player.x = player.updatedX;

  let isScreen = (player.updatedX > 0) &&
      (player.updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width);

  let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
  let isFreeSpaceFromPlayers = g_world.checkSpaceFree(player, alivePlayers);

  let worldElements = g_world.worldElements;
  let isFreeSpaceFromWorldElements = g_world.checkSpaceFree(player, worldElements);

  let isPlayerLanded = g_world.checkLandUnderPlayer(player, worldElements);
  if (!isPlayerLanded) {
    if ((player.upMove === 0) && (player.landed === states.INACTIVE)) {
      player.upMove = 1;
      player.verticalSpeed = playerInformation.START_ZERO_VERTICAL_SPEED;
    }
  }

  if (((!isFreeSpaceFromPlayers || !isFreeSpaceFromWorldElements) && isScreen) || (!isScreen)) {
    player.x = prevX;
  }
}

function jump(player, deltaTime) {
  if (player.killState === states.ACTIVE) {
    player.verticalSpeed = playerInformation.START_SMALL_VERTICAL_SPEED;
    player.killState = states.INACTIVE;
  }

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

    let worldElements = g_world.worldElements;
    let isFreeSpaceFromWorldElements = g_world.checkSpaceFree(player, worldElements);

    if (!isFreeSpaceFromWorldElements) {
      player.y = player.nextLand - playerInformation.HEIGHT;
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

    let worldElements = g_world.worldElements;
    let isFreeSpaceFromWorldElements = g_world.checkSpaceFree(player, worldElements);

    if (!isFreeSpaceFromWorldElements) {
      player.y = prevY;
      player.verticalSpeed = playerInformation.START_ZERO_VERTICAL_SPEED;
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

function reduceSpeed(player) {
  let newHorizontalScore = player.horizontalSpeed - 0.01;
  player.horizontalSpeed = newHorizontalScore;
  console.log(player.horizontalSpeed);
}

function isMovingCapability(player) {
  if ((player.horizontalSpeed > 0) && (player.typeBottomUnderPlayer === bottomType.ICE)) {
    return false;
  } else {
    return true;
  }
}
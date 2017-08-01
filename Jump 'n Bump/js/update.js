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
  let freeHorizontallySpaceFromPlayers = g_world.checkHorizontallyFree(player, alivePlayers);

  let stairs = g_world.stairs;
  let freeHorizontallySpaceFromStairs = g_world.checkHorizontallyFree(player, stairs);

  if ((!freeHorizontallySpaceFromPlayers && !freeHorizontallySpaceFromStairs && isScreen) || (!isScreen)) {
    player.x = prevX;
  }
}

function jump(player, deltaTime) {
  let updatedSpeed = player.verticalSpeed - player.accelerationOfGravity * deltaTime / 50;
  player.verticalSpeed = updatedSpeed;
  player.updatedY = player.y - updatedSpeed * deltaTime / 100 * playerInformation.MASS;

  let prevY = player.y;
  player.y = player.updatedY;

  if (updatedSpeed < 0) { // игрок падает => проверяем землю
    let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
    let freeBottomSpaceFromPlayers = g_world.bottomCrossing(player, alivePlayers);
    let freeHorizontallySpaceFromPlayers = g_world.checkHorizontallyFree(player, alivePlayers);

    if (!freeBottomSpaceFromPlayers && !freeHorizontallySpaceFromPlayers) {
      console.log("Collision");
    }

    let stairs = g_world.stairs;
    let freeBottomSpaceFromStairs = g_world.bottomCrossing(player, stairs);
    let freeHorizontallySpaceFromStairs = g_world.checkHorizontallyFree(player, stairs);

    if (!freeBottomSpaceFromStairs) {
      player.distanceToLand = 0;
      g_world.findNearestLandCoordinates(player, stairs);
      console.log(player.nextLand);
      //prevY = player.nextLand - playerInformation.HEIGHT+ smallStair.TOP_FREE_SPACE;
    }

    if (!freeBottomSpaceFromStairs  && !freeHorizontallySpaceFromStairs) {
      player.y = prevY;
      player.upMove = 0;
      player.verticalSpeed = playerInformation.START_BIG_VERTICAL_SPEED;
    }
  } else {  // игрок летит наверх => проверяем препятствия
    let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
    let freeTopSpaceFromPlayers = g_world.topCrossing(player, alivePlayers);
    let freeHorizontallySpaceFromPlayers = g_world.checkHorizontallyFree(player, alivePlayers);

    if (!freeTopSpaceFromPlayers && !freeHorizontallySpaceFromPlayers) {
      console.log("Collision");
    }

    let stairs = g_world.stairs;
    let freeTopSpaceFromStairs = g_world.topCrossing(player, stairs);
    let freeHorizontallySpaceFromStairs = g_world.checkHorizontallyFree(player, stairs);

    if (!freeTopSpaceFromStairs && !freeHorizontallySpaceFromStairs) {
      player.y = prevY;
    }
  }
}

function increaseScores(player) {
  let scoreboards = g_world.scoreboards;
  let newScore;
  if (scoreboards) {
    for (let key in scoreboards) {
      if (scoreboards[key].name === player.name) {
        newScore = scoreboards[key].pointsAmount + 1;
        scoreboards[key].pointsAmount = newScore;
      }
    }
  }
  return scoreboards;
}
function searchKilledPlayers(players, player) {
  if (players) {
    for (let key in players) {
      if ((players[key] != player) && (players[key].liveState === playerInformation.ALIVE)) {
        let otherPlayer = players[key];
        let afterLeftSideAnotherPlayer = (player.x + player.width - player.rightFreeSpace) >
            (otherPlayer.x + otherPlayer.leftFreeSpace);
        let beforeRightAnotherPlayerFree = (player.x + player.width - player.rightFreeSpace) <
            (otherPlayer.x + otherPlayer.width - otherPlayer.rightFreeSpace);
        let afterRightSideAnotherPlayer = (player.x + player.leftFreeSpace) >
            (otherPlayer.x + otherPlayer.leftFreeSpace);
        let beforeLeftAnotherPlayerFree = (player.x + player.leftFreeSpace) <
            (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace);
        let underAnotherPlayerFree = (otherPlayer.y + otherPlayer.topFreeSpace) <= (player.y + player.height);

        if ((afterLeftSideAnotherPlayer && beforeRightAnotherPlayerFree
            && underAnotherPlayerFree)
            ||
            (afterRightSideAnotherPlayer && beforeLeftAnotherPlayerFree
            && underAnotherPlayerFree)) {
          players[key].liveState = playerInformation.UNALIVE;
        }
      }
    }
  }
  return players;
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
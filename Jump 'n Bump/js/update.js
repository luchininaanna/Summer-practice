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
    rightMoving(players, player, deltaTime);
  }

  if (player.leftMove === 1) {
    leftMoving(players, player, deltaTime);
  }

  if (player.upMove === 1) {
    player.jumpState = playerInformation.JUMP;
    jump(players, player, deltaTime);
  }
}

function rightMoving(players, player, deltaTime) {
  player.updateImage(deltaTime);

  let updatedX = player.x + player.horizontalSpeed * deltaTime;
  let isScreen = (updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width);
  let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, updatedX, alivePlayers);

  if ((isScreen && freeHorizontallySpace)) {
    player.x = updatedX;
  }

  let onLand = g_world.checkOnLand(player);
  if (!onLand && (player.jumpState === playerInformation.NO_JUMP)) {
    player.upMove = 1;
    player.verticalSpeed = playerInformation.START_ZERO_VERTICAL_SPEED;
  }
}
function leftMoving(players, player, deltaTime) {
  player.updateImage(deltaTime);

  let updatedX = player.x - player.horizontalSpeed * deltaTime;
  let isScreen = (updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width);
  let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, updatedX, alivePlayers);

  if ((isScreen && freeHorizontallySpace)) {
    player.x = updatedX;
  }

  let onLand = g_world.checkOnLand(player);
  if (!onLand && (player.jumpState === playerInformation.NO_JUMP)) {
    player.upMove = 1;
    player.verticalSpeed = playerInformation.START_ZERO_VERTICAL_SPEED;
  }
}
function jump(players, player, deltaTime) {
  let updatedSpeed = player.verticalSpeed - player.accelerationOfGravity * deltaTime / 50;
  player.verticalSpeed = updatedSpeed;
  let updatedY = player.y - updatedSpeed * deltaTime / 100 * playerInformation.MASS;
  let alivePlayers = g_world.getPlayersInState(playerInformation.ALIVE);
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, player.x, alivePlayers);
  let freeBottomSpace = g_world.checkBottomFree(player, updatedY, alivePlayers);

  if ((!freeHorizontallySpace) && !(freeBottomSpace)) {
    increaseScores(player);
    searchKilledPlayers(alivePlayers, player);
    player.upMove = 1;
    player.jumpState = playerInformation.JUMP;
    player.verticalSpeed = playerInformation.START_SMALL_VERTICAL_SPEED;
  }

  if ((updatedSpeed > 0)) {
    player.y = updatedY;
  }
  let isLand = g_world.checkLand(player);

  if ((updatedSpeed < 0) && (updatedY < player.nextLandY - playerInformation.HEIGHT + smallStair.TOP_FREE_SPACE)) {
    player.y = updatedY;
  }
  if (isLand && (updatedY > player.nextLandY - playerInformation.HEIGHT)
      && (updatedSpeed < 0)) {
    player.y = player.nextLandY - playerInformation.HEIGHT + smallStair.TOP_FREE_SPACE;
    player.distanceToLand = 0;
    player.upMove = 0;
    player.jumpState = playerInformation.NO_JUMP;
    player.verticalSpeed = playerInformation.START_BIG_VERTICAL_SPEED;
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
  let prompt = scoreboards.prompt;
  if (prompt.timeInterval >= promptInformation.TIME_INTERVAL) {
    switch (prompt.state) {
      case states.INACTIVE:
        prompt.state = states.ACTIVE;
        break;
      case states.ACTIVE:
        prompt.state = states.INACTIVE;
        break;
    }
    prompt.timeInterval = 0;
  } else {
    let timeSum = prompt.timeInterval + deltaTime / 1000;
    prompt.timeInterval = timeSum;
  }
}
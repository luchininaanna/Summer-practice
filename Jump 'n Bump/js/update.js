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
  let updatedX = player.x + player.horizontalSpeed * deltaTime;
  let alivePlayers = players.getPlayersInState(playerInformation.ALIVE);
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, updatedX, alivePlayers);
  let isScreen = (updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width);

  if ((isScreen && freeHorizontallySpace)) {
    player.x = updatedX;
  }
}
function leftMoving(players, player, deltaTime) {
  let updatedX = player.x - player.horizontalSpeed * deltaTime;
  let alivePlayers = players.getPlayersInState(playerInformation.ALIVE);
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, updatedX, alivePlayers);
  let isScreen = (updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width);

  if ((isScreen && freeHorizontallySpace)) {
    player.x = updatedX;
  }
}
function jump(players, player, deltaTime) {
  let updatedSpeed = player.verticalSpeed - player.accelerationOfGravity * deltaTime / 100;
  player.verticalSpeed = updatedSpeed;
  let updatedY = player.y - updatedSpeed * deltaTime / 100;
  let alivePlayers = players.getPlayersInState(playerInformation.ALIVE);
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, player.x, alivePlayers);
  let freeBottomSpace = g_world.checkBottomFree(player, updatedY, alivePlayers);
  let elements = g_world.objects;
  let freeTopSpace = g_world.checkTopFree(player, updatedY, elements);
  if (player.y < 0) {
    player.y = 0;
    player.verticalSpeed = 0;
  } else {
    player.y = updatedY;
  }

  if ((!freeHorizontallySpace) && !(freeBottomSpace)) {
    increaseScores(player);
    searchKilledPlayers(alivePlayers, player);
    player.upMove = 1;
    player.jumpState = playerInformation.JUMP;
    player.verticalSpeed = playerInformation.START_SMALL_VERTICAL_SPEED;
  }

  let isLand = g_world.checkLand(player);

  if ((isLand) && (updatedSpeed < 0)) {
    player.y = isLand -playerInformation.HEIGHT + smallStair.TOP_FREE_SPACE;
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
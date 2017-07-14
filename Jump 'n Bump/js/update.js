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
      (freeTopSpace || freeBottomSpace) && (player.upMove === 1))) {
    player.x = updatedX;
  }
}
function createLeftMoving(players, player, deltaTime) {
  let updatedX = player.x - player.horizontalSpeed * deltaTime;
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, updatedX, players);
  let freeTopSpace = g_world.checkTopFree(player, player.y, players);
  let freeBottomSpace = g_world.checkBottomFree(player, player.y, players);
  if (((updatedX > 0) && (updatedX < canvasSize.WIDTH - pointScoreboard.WIDTH - player.width) && freeHorizontallySpace)
      || ((!freeHorizontallySpace) && (freeTopSpace || freeBottomSpace) && (player.upMove === 1))) {
    player.x = updatedX;
  }
}
function createJump(players, player, deltaTime) {
  let updatedSpeed = player.verticalSpeed - player.accelerationOfGravity * deltaTime / 100;
  player.verticalSpeed = updatedSpeed;
  let updatedY = player.y - updatedSpeed * deltaTime / 100;
  let freeHorizontallySpace = g_world.checkHorizontallyFree(player, player.x, players);
  let freeBottomSpace = g_world.checkBottomFree(player, updatedY, players);
  player.y = updatedY;
  if ((!freeHorizontallySpace) && !(freeBottomSpace)) {
    increaseScores(players, player);
    searchKilledPlayers(players, player);
  }
  if (player.y > 785) {
    player.upMove = 0;
    player.verticalSpeed = playerInformation.START_VERTICAL_SPEED;
  }
}

function increaseScores(players, player) {
  let scoreboards = g_world.scoreboards;
  let newScore;
  let scoreboardNumber;
  switch (player) {
    case players.firstPlayer:
      scoreboardNumber = 0;
    case players.secondPlayer:
      scoreboardNumber = 1;
  }
  newScore = scoreboards[scoreboardNumber].pointsAmount + 1;
  scoreboards[scoreboardNumber].pointsAmount = newScore;
  return scoreboards;
}
function searchKilledPlayers(players, player) {
  if (players) {
    for (let key in players) {
      if (players[key] != player) {
        let otherPlayer = players[key];
        console.log(otherPlayer.liveState);
        if ((((player.x + player.width - player.rightFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
            && ((player.x + player.width - player.rightFreeSpace) < (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace)) && ((otherPlayer.y + otherPlayer.topFreeSpace) <= (player.y + player.height)))
            ||
            (((player.x + player.leftFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
            && (player.x + player.leftFreeSpace) < (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace)) && ((otherPlayer.y + otherPlayer.topFreeSpace) <= (player.y + player.height))) {
          players[key].liveState = playerInformation.UNALIVE;
          console.log(players[key].liveState);
          console.log(players[key]);
        }
      }
    }
  }
  return players;
}
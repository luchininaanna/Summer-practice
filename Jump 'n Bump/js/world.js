function World() {
  this.state = statesOfGame.IN_PROCESS;
  this.objects = getObjects();
  this.stairs = getStairs();
  this.players = getPlayers();
  this.scoreboards = getScoreboards();
  this.update = function (deltaTime) {
    if (this.state === statesOfGame.IN_PROCESS) {
      let unalivePlayers = this.getPlayersInState(playerInformation.UNALIVE);
      if (unalivePlayers) {
        animatePlayers(unalivePlayers, deltaTime);
      }
      updatePlayersCoordinates(this.players, deltaTime);
    }
    if (this.state === statesOfGame.RESULT) {
      let scoreboards = this.scoreboards;
      updatePromptTime(deltaTime, scoreboards);
    }
  };
  this.clean = function (ctx) {
    ctx.fillStyle = colors.WHITE;
    drawRectangle(ctx, 0, 0, canvasSize.WIDTH, canvasSize.HEIGHT, 1, 0, 0);
  };
  this.render = function (ctx) {
    if (this.state === statesOfGame.IN_PROCESS) {
      let gameWorldObjects = this.objects;
      drawObjects(ctx, gameWorldObjects);
      let stairs = this.stairs;
      drawObjects(ctx, stairs);
      let players = this.players;
      drawPlayers(ctx, players);
      let scoreboards = this.scoreboards;
      drawScoreboards(ctx, scoreboards);
    } else {
      drawResult(ctx);
    }
  };
  this.getPlayersInState = function (state) {
    let playersInState = {};
    if ((this.players.firstPlayer) && (this.players.firstPlayer.liveState === state)) {
      playersInState.firstPlayer = this.players.firstPlayer;
    }
    if ((this.players.secondPlayer) && (this.players.secondPlayer.liveState === state)) {
      playersInState.secondPlayer = this.players.secondPlayer;
    }
    if ((this.players.thirdPlayer) && (this.players.thirdPlayer.liveState === state)) {
      playersInState.thirdPlayer = this.players.thirdPlayer;
    }
    return playersInState;
  };
  this.checkSpaceFree = function (player, elements) {
    for (let key in elements) {
      if (elements[key] != player) {
        let cross = this.checkCross(player, elements[key]);
        if (cross) {
          return false;
        }
      }
    }
    return true;
  };
  this.checkCross = function (firstObject, secondObject) {
    let shift = 0;
    let isXNoFree;
    let isYNoFree;
    isXNoFree = (((secondObject.x >= firstObject.x) &&
    (secondObject.x <= firstObject.x + firstObject.width)) ||
    ((firstObject.x >= secondObject.x) &&
    (firstObject.x <= secondObject.x + secondObject.width)));
    if (secondObject.type === bottomType.LAND) {
      shift = smallStair.TOP_FREE_SPACE;
      isYNoFree =(((secondObject.y + shift > firstObject.y) &&
      (secondObject.y + shift < firstObject.y + firstObject.height)) ||
      ((firstObject.y > secondObject.y) &&
      (firstObject.y < secondObject.y + secondObject.height)));
    } else {
      isYNoFree =(((secondObject.y + shift >= firstObject.y) &&
      (secondObject.y + shift <= firstObject.y + firstObject.height)) ||
      ((firstObject.y >= secondObject.y) &&
      (firstObject.y <= secondObject.y + secondObject.height)));
    }
    if (isXNoFree && isYNoFree) {
      if ((firstObject.y < secondObject.y) && (secondObject.type === bottomType.LAND)) {
        firstObject.nextLand = secondObject.y;
      }
      return true;
    }
    return false;
  };
  this.checkLandUnderPlayer = function(player, stairs) {
    for (let key in stairs) {
      let underLand = (((stairs[key].x >= player.x) &&
      (stairs[key].x <= player.x + player.width)) ||
      ((player.x >= stairs[key].x) &&
      (player.x <= stairs[key].x + stairs[key].width)));
      let onLand = (player.y + player.height) === (stairs[key].y + smallStair.TOP_FREE_SPACE);
      if (underLand && onLand) {
        player.landed = states.INACTIVE;
        return true;
      }
    }
    return false;
  };
  this.searchCollisionPlayers = function(player, alivePlayers) {
    if (alivePlayers) {
      for (let key in alivePlayers) {
        if (alivePlayers[key] != player) {
          let isXNoFree = (((alivePlayers[key].x >= player.x) &&
          (alivePlayers[key].x <= player.x + player.width)) ||
          ((player.x >= alivePlayers[key].x) &&
          (player.x <= alivePlayers[key].x + alivePlayers[key].width)));

          let isYNoFree =(((alivePlayers[key].y >= player.y) &&
          (alivePlayers[key].y <= player.y + player.height)) ||
          ((player.y >= alivePlayers[key].y) &&
          (player.y <= alivePlayers[key].y + alivePlayers[key].height)));

          if (isXNoFree && isYNoFree) {
            let alivePlayer;
            let unalivePlayer;
            if (player.y < alivePlayers[key].y) {
              alivePlayer = player;
              unalivePlayer = alivePlayers[key];
            } else {
              alivePlayer = alivePlayers[key];
              unalivePlayer = player;
            }
            //if (alivePlayer.y + alivePlayer.height <=  unalivePlayer.y + playerInformation.TOP_FREE_SPACE) {
            //  alivePlayer.upMove = 1;
            //  alivePlayers.verticalSpeed = playerInformation.START_SMALL_VERTICAL_SPEED;
            //}
            if ((alivePlayer.liveState === playerInformation.ALIVE)
                && (unalivePlayer.liveState === playerInformation.ALIVE)){
              alivePlayer.increaseScores();
              unalivePlayer.dye();
            }
          }
        }
      }
    }
  }
}
function World() {
  this.state = statesOfGame.IN_PROCESS;
  this.objects = getObjects();
  this.worldElements = getWorldElements();
  this.backgroundElements = getBackgroundElements();
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
      let worldElements = this.worldElements;
      drawObjects(ctx, worldElements);
      let backgroundElements = this.backgroundElements;
      drawObjects(ctx, backgroundElements);
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
    let isXNoFree = this.getXFree(firstObject, secondObject);
    let isYNoFree = this.getYFree(firstObject, secondObject);
    if (isXNoFree && isYNoFree) {
      if ((firstObject.y < secondObject.y) &&
          ((secondObject.type === bottomType.LAND) ||
          (secondObject.type === bottomType.ICE) ||
          (secondObject.type === bottomType.ROCK))) {
        firstObject.nextLand = secondObject.y;
      }
      return true;
    }
    return false;
  };
  this.getXFree = function(firstObject, secondObject) {
    let firstObjectBox = firstObject.getBox();
    let secondObjectBox = secondObject.getBox();
    let isXNotFree = (((secondObjectBox.firstX >= firstObjectBox.firstX) &&  //двигающийся игрок левее
    (secondObjectBox.firstX <= firstObjectBox.secondX)) ||
    ((firstObjectBox.firstX >= secondObjectBox.firstX) &&  //двигающийся игрок правее
    (firstObjectBox.firstX <= secondObjectBox.secondX)));
    return isXNotFree;
  };
  this.getYFree = function(firstObject, secondObject) {
    let isYNotFree;
    let firstObjectBox = firstObject.getBox();
    let secondObjectBox = secondObject.getBox();
    if ((secondObject.type === bottomType.LAND) ||
        (secondObject.type === bottomType.ICE) ||
        (secondObject.type === bottomType.ROCK)) {
      isYNotFree =(((secondObjectBox.y > firstObjectBox.y) &&  //двигающийся игрок выше
      (secondObjectBox.y < firstObjectBox.y + firstObject.height)) ||
      ((firstObjectBox.y > secondObjectBox.y) &&  //двигающийся игрок ниже
      (firstObjectBox.y < secondObjectBox.y + secondObject.height)));
    } else {
      isYNotFree =(((secondObjectBox.y >= firstObjectBox.y) &&  //двигающийся игрок выше
      (secondObjectBox.y <= firstObjectBox.y + firstObject.height)) ||
      ((firstObjectBox.y >= secondObjectBox.y) &&  //двигающийся игрок ниже
      (firstObjectBox.y <= secondObjectBox.y + secondObject.height)));
    }
    return isYNotFree;
  };
  this.checkLandUnderPlayer = function(player, worldElements) {
    for (let key in worldElements) {
      let underLand = (((worldElements[key].x >= player.x) &&
      (worldElements[key].x <= player.x + player.width)) ||
      ((player.x >= worldElements[key].x) &&
      (player.x <= worldElements[key].x + worldElements[key].width)));
      let onLand = (player.y + player.height) === (worldElements[key].y + bottomType.TOP_FREE_SPACE);
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
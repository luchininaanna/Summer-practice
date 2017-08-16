function World() {
  this.state = statesOfGame.IN_PROCESS;
  this.objects = getObjects();
  this.worldElements = getWorldElements();
  this.backgroundElements = getBackgroundElements();
  this.players = getPlayers();
  this.burst = getBurst();
  this.scoreboards = getScoreboards();
  this.insectsSwarm = getInsectsSwarm();
  this.update = function (deltaTime) {
    if (this.state === statesOfGame.IN_PROCESS) {
      let unalivePlayers = this.getPlayersInState(playerInformation.UNALIVE);
      if (unalivePlayers) {
        animatePlayers(unalivePlayers, deltaTime);
      }

      if (this.burst.stateBurst === states.ACTIVE){
        this.burst.createAnimation(deltaTime);
      }

      this.insectsSwarm.createAnimation(deltaTime);

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

      let burst = this.burst;
      if (burst.stateBurst === states.ACTIVE){
        burst.draw(ctx);
      }

      let insectsSwarm = this.insectsSwarm;
      drawInsectsSwarm(ctx, insectsSwarm);

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
    if ((this.players.fourthPlayer) && (this.players.fourthPlayer.liveState === state)) {
      playersInState.fourthPlayer = this.players.fourthPlayer;
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
    let isXNotFree = this.getXFree(firstObject, secondObject);
    let isYNotFree = this.getYFree(firstObject, secondObject);
    if (isXNotFree && isYNotFree) {
      if ((firstObject.y < secondObject.y) &&
          ((secondObject.type === bottomType.LAND) ||
          (secondObject.type === bottomType.ICE) ||
          (secondObject.type === bottomType.ROCK))) {
        let secondObjectBox = secondObject.getBox();
        firstObject.nextLand = secondObjectBox.y;
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
      isYNotFree = (((secondObjectBox.y > firstObjectBox.y) &&  //двигающийся игрок выше
      (secondObjectBox.y < firstObjectBox.y + firstObject.height - firstObject.topFreeSpace)) ||
      ((firstObjectBox.y > secondObjectBox.y) &&  //двигающийся игрок ниже
      (firstObjectBox.y < secondObjectBox.y + secondObject.height - secondObject.topFreeSpace)));
    } else {
      isYNotFree = (((secondObjectBox.y >= firstObjectBox.y) &&  //двигающийся игрок выше
      (secondObjectBox.y <= firstObjectBox.y + firstObject.height - firstObject.topFreeSpace)) ||
      ((firstObjectBox.y >= secondObjectBox.y) &&  //двигающийся игрок ниже
      (firstObjectBox.y <= secondObjectBox.y + secondObject.height - secondObject.topFreeSpace)));
    }
    return isYNotFree;
  };
  this.checkLandUnderPlayer = function(player, worldElements) {
    let playerBox = player.getBox();
    for (let key in worldElements) {
      let worldElementBox = worldElements[key].getBox();

      let underLand = (((worldElementBox.firstX >= playerBox.firstX) &&
      (worldElementBox.firstX <= playerBox.secondX)) ||
      ((playerBox.firstX >= worldElementBox.firstX) &&
      (playerBox.firstX <= worldElementBox.secondX)));

      let onLand = (playerBox.secondY === worldElementBox.y);

      if (underLand && onLand) {
        player.landed = states.ACTIVE;
        player.typeBottomUnderPlayer = worldElements[key].type;
        console.log(player.typeBottomUnderPlayer);
        return true;
      }
    }
    player.landed = states.INACTIVE;
    return false;
  };
  this.searchCollisionPlayers = function(player, alivePlayers) {
    if (alivePlayers) {
      for (let key in alivePlayers) {
        if (alivePlayers[key] != player) {
          let alivePlayerBox = alivePlayers[key].getBox();
          let playerBox = player.getBox();

          let isXCollision = this.isXCollision(playerBox, alivePlayerBox);
          let isYCollision = this.isYCollision(playerBox, alivePlayerBox);

          if (isXCollision && isYCollision) {
            let burst = g_world.burst;

            this.collisionDataProcessing(player, alivePlayers[key], burst);

          }
        }
      }
    }
  };
  this.isXCollision = function(playerBox, alivePlayerBox) {
    let isXCollision = (((alivePlayerBox.firstX >= playerBox.firstX) &&
    (alivePlayerBox.firstX <= playerBox.secondX)) ||
    ((playerBox.firstX >= alivePlayerBox.firstX) &&
    (playerBox.firstX <= alivePlayerBox.secondX)));
    return isXCollision;
  };
  this.isYCollision = function(playerBox, alivePlayerBox) {
    let isYCollision =(((alivePlayerBox.secondY >= playerBox.y) &&
    (alivePlayerBox.secondY <= (playerBox.y + (playerBox.secondY - playerBox.y) / 2))) ||
    ((playerBox.secondY >= alivePlayerBox.y) &&
    (playerBox.secondY <= (alivePlayerBox.y + (alivePlayerBox.secondY - alivePlayerBox.y) / 2))));
    return isYCollision;
  };
  this.collisionDataProcessing = function(firstPlayer, secondPlayer, burst) {
    let alivePlayer;
    let unalivePlayer;
    if (firstPlayer.y < secondPlayer.y) {  //определеие убитого и убившего игрока
      alivePlayer = firstPlayer;
      unalivePlayer = secondPlayer;
    } else {
      alivePlayer = secondPlayer;
      unalivePlayer = firstPlayer;
    }
    alivePlayer.killState = states.ACTIVE;

    burst.stateBurst = states.ACTIVE;  //задаются данные для взрыва
    burst.x = unalivePlayer.x;
    burst.y = unalivePlayer.y;

    if ((alivePlayer.liveState === playerInformation.ALIVE)
        && (unalivePlayer.liveState === playerInformation.ALIVE)){
      alivePlayer.increaseScores(unalivePlayer);
      unalivePlayer.dye();
    }
  }
}
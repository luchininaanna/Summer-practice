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
  this.checkHorizontallyFree = function (player, elements) {
    for (let key in elements) {
      if (elements[key] != player) {
        let crossH = this.horizontallyCrossing(player, elements[key]);
        let crossV = this.verticallyCrossing(player, elements[key]);
        if (crossH && crossV) {
          return false;
        }
      }
    }
    return true;
  };
  this.horizontallyCrossing = function(firstObject, secondObject) {
    if (((secondObject.x >= firstObject.x) &&
        (secondObject.x <= firstObject.x + firstObject.width)) ||
        ((firstObject.x >= secondObject.x) &&
        (firstObject.x <= secondObject.x + secondObject.width))) {
      return true;
    }
    return false;
  };
  this.verticallyCrossing = function(firstObject, secondObject) {
    let shift = 0;
    if (secondObject.type === bottomType.LAND) {
      shift = smallStair.TOP_FREE_SPACE;
    }
    if (((secondObject.y + shift >= firstObject.y) &&
        (secondObject.y + shift <= firstObject.y + firstObject.height)) ||
        ((firstObject.y >= secondObject.y) &&
        (firstObject.y <= secondObject.y + secondObject.height))) {
      return true;
    }
    return false;
  };
  this.topCrossing = function(firstObject, secondObject) {
    if ((secondObject.y + secondObject.height >= firstObject.y) &&
        (secondObject.y + secondObject.height <= firstObject.y + firstObject.height)) {
      return true;
    }
    return false;
  };
  this.bottomCrossing = function(firstObject, secondObject) {
    if ((firstObject.y + firstObject.height >= secondObject.y + smallStair.TOP_FREE_SPACE) &&
        (firstObject.y + firstObject.height <= secondObject.y + secondObject.height + smallStair.TOP_FREE_SPACE)) {
      return true;
    }
    return false;
  };
  this.findNearestLandCoordinates = function(player, stairs) {
    if (stairs) {
      for (let key in stairs) {
        if ((stairs[key].x < player.x + playerInformation.WIDTH/2) &&
            (stairs[key].x + smallStair.WIDTH > player.x + playerInformation.WIDTH / 2) &&
            (stairs[key].y + smallStair.TOP_FREE_SPACE > player.y + playerInformation.HEIGHT)) {

          let distanceToLand = stairs[key].y - player.y;

          if ((distanceToLand < player.distanceToLand) || (player.distanceToLand === 0)) {
            player.distanceToLand = distanceToLand;
            player.nextLand = stairs[key].y;
          }
        }
      }
    }
    return player;
  }
}
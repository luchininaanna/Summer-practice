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
  this.checkTopFree = function (player, updatedY, elements) {
    if (elements) {
      for (let key in elements) {
        if ((elements[key] != player) && (elements[key] != imageNames.BACKGROUND)) {
          let otherElement = elements[key];
          if ((updatedY + player.topFreeSpace) < (otherElement.y + otherElement.height))
            return false;
        }
      }
    }
    return true;
  };
  this.checkBottomFree = function (player, updatedY, elements) {
    if (elements) {
      for (let key in elements) {
        if (elements[key] != player) {
          let otherElement = elements[key];
          if ((updatedY + player.height) > (otherElement.y + otherElement.topFreeSpace))
            return false;
        }
      }
    }
    return true;
  };
  this.checkLand = function (player) {
    if (!this.objects) {
      return false;
    }
    player.distanceToLand = 0;
    player.underLand = 0;
    for (let key in this.objects) {
      if (this.objects[key].type === bottomType.LAND) {
        let playerAfterLeftLandSide = player.x + playerInformation.WIDTH / 2 >= this.objects[key].x;
        let playerAfterRightLandSide = player.x + playerInformation.WIDTH / 2 <= this.objects[key].x + this.objects[key].width;
        let underLand = playerAfterLeftLandSide && playerAfterRightLandSide;
        if (underLand) {
          player.underLand = 1;
        }

        if (underLand && (this.objects[key].y >= (player.y + player.height))) {
          //находим ближайшую ступень
          let distanceToLand = this.objects[key].y + smallStair.TOP_FREE_SPACE - (player.y + player.height);
          if ((player.distanceToLand >= distanceToLand) || (player.distanceToLand === 0)) {
            player.distanceToLand = distanceToLand;
            player.nextLandY = this.objects[key].y;
          }
        }
      }
    }
    return player.underLand;
  };
  this.checkOnLand = function (player) {
    if (!this.objects) {
      return false;
    }
    for (let key in this.objects) {
      let playerAfterLeftLandSide = player.x + playerInformation.WIDTH / 2 >= this.objects[key].x;
      let playerAfterRightLandSide = player.x + playerInformation.WIDTH / 2 <= this.objects[key].x + this.objects[key].width;
      let underLand = playerAfterLeftLandSide && playerAfterRightLandSide;
      let onLand = player.y === this.objects[key].y - playerInformation.HEIGHT + smallStair.TOP_FREE_SPACE;

      if (underLand && onLand) {
        return true;
      }
    }
    return false;
  }
}
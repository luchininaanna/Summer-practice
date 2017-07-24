function World() {
  this.objects = getObjects();
  this.players = getPlayers();
  this.scoreboards = getScoreboards();
  this.update = function (deltaTime) {
    let players = g_world.players;
    players.animatePlayers(deltaTime);
    updatePlayersCoordinates(this.players, deltaTime);
  };
  this.clean = function (ctx) {
    ctx.fillStyle = colors.WHITE;
    drawRectangle(ctx, 0, 0, canvasSize.WIDTH, canvasSize.HEIGHT, 1, 0, 0);
  };
  this.render = function (ctx) {
    let gameWorldObjects = this.objects;
    drawObjects(ctx, gameWorldObjects);
    this.players.draw(ctx);
    this.scoreboards.draw(ctx);
  };
  this.checkHorizontallyFree = function (player, updatedX, elements) {
    if (elements) {
      for (let key in elements) {
        if ((elements[key] != player) &&
            ((elements[key].name === playerName.FIRST_NAME) ||
            (elements[key].name === playerName.SECOND_NAME) ||
            (elements[key].name === playerName.THIRD_NAME) ||
            (elements[key].name === playerName.FOURTH_NAME))) {
          let otherElement = elements[key];
          let verticallyFree = ((player.y + player.topFreeSpace) > (otherElement.y + otherElement.height)) ||
              ((player.y + player.height) < (otherElement.y + otherElement.topFreeSpace));
          let afterLeftSideAnotherPlayer = (updatedX + player.width - player.rightFreeSpace) >
              (otherElement.x + otherElement.leftFreeSpace);
          let beforeRightAnotherPlayerFree = (updatedX + player.width - player.rightFreeSpace) <
              (otherElement.x + otherElement.width - otherElement.rightFreeSpace);
          let afterRightSideAnotherPlayer = (updatedX + player.leftFreeSpace) >
              (otherElement.x + otherElement.leftFreeSpace);
          let beforeLeftAnotherPlayerFree = (updatedX + player.leftFreeSpace) <
              (otherElement.x + otherElement.width -
              otherElement.rightFreeSpace);

          if (verticallyFree) {
            return true
          } else {
            if ((afterLeftSideAnotherPlayer && beforeRightAnotherPlayerFree)//проверка игрока справа
                ||
                (afterRightSideAnotherPlayer && beforeLeftAnotherPlayerFree)) { //проверка игрока слева
              return false;
            }
          }
        }
      }
    }
    return true;
  };
  this.checkTopFree = function (player, updatedY, elements) {
    if (elements) {
      for (let key in elements) {
        if ((elements[key] != player) && (elements[key] != imageNames.BACKGROUND)) {
          let otherElement  = elements[key];
          if ((updatedY + player.topFreeSpace) < (otherElement .y + otherElement .height))
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
          if ((updatedY + player.height) > (otherElement .y + otherElement .topFreeSpace))
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
      if (this.objects[key].type === bottomType.LAND){
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
    if (player.underLand){
      return true;
    } else {
      return false;
    }
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
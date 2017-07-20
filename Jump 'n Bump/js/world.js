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
    for (let key in this.objects) {
      if (this.objects[key].type === bottomType.LAND){

        let underLand = (player.x > this.objects[key].x)
              && (player.x < this.objects[key].x + this.objects[key].width);

        let distanceToLand = (player.y + player.height) - (this.objects[key].y - smallStair.TOP_FREE_SPACE);

        //console.log(player.y + player.height);
        //console.log(this.objects[key].y + smallStair.TOP_FREE_SPACE);

        if ((underLand) && (distanceToLand >= 0) && (distanceToLand <= smallStair.TOP_FREE_SPACE)){
          return this.objects[key].y;
        }
      }
    }
    return false;
  }
}
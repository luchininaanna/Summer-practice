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
  this.checkHorizontallyFree = function (player, updatedX, players) {
    if (players) {
      for (let key in players) {
        if ((players[key] != player) &&
            ((players[key].name === playerName.FIRST_NAME) ||
            (players[key].name === playerName.SECOND_NAME) ||
            (players[key].name === playerName.THIRD_NAME) ||
            (players[key].name === playerName.FOURTH_NAME))) {
          let otherPlayer = players[key];
          let verticallyFree = ((player.y + player.topFreeSpace) > (otherPlayer.y + otherPlayer.height)) ||
              ((player.y + player.height) < (otherPlayer.y + otherPlayer.topFreeSpace));
          let afterLeftSideAnotherPlayer = (updatedX + player.width - player.rightFreeSpace) >
              (otherPlayer.x + otherPlayer.leftFreeSpace);
          let beforeRightAnotherPlayerFree = (updatedX + player.width - player.rightFreeSpace) <
              (otherPlayer.x + otherPlayer.width - otherPlayer.rightFreeSpace);
          let afterRightSideAnotherPlayer = (updatedX + player.leftFreeSpace) >
              (otherPlayer.x + otherPlayer.leftFreeSpace);
          let beforeLeftAnotherPlayerFree = (updatedX + player.leftFreeSpace) <
              (otherPlayer.x + otherPlayer.width -
              otherPlayer.rightFreeSpace);

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
  this.checkTopFree = function (player, updatedY, players) {
    if (players) {
      for (let key in players) {
        if (players[key] != player) {
          let otherPlayer = players[key];
          if ((updatedY + player.topFreeSpace) < (otherPlayer.y + otherPlayer.height))
            return false;
        }
      }
    }
    return true;
  };
  this.checkBottomFree = function (player, updatedY, players) {
    if (players) {
      for (let key in players) {
        if (players[key] != player) {
          let otherPlayer = players[key];
          if ((updatedY + player.height) > (otherPlayer.y + otherPlayer.topFreeSpace))
            return false;
        }
      }
    }
    return true;
  };
  this.checkTypeOfBottom = function (player) {
    if (this.objects) {
      for (let key in this.objects) {
        if (this.objects[key].type = bottomType.LAND){

          let underLand = (player.x > this.objects[key].x)
              && (player.x < this.objects[key].x + this.objects[key].width);
          let distanceToLand = (player.y + player.height) - (this.objects[key].y - smallStair.TOP_FREE_SPACE);

          if ((underLand) && (distanceToLand >= 0) && (distanceToLand <= smallStair.TOP_FREE_SPACE)){
            console.log("land")
          }
        }
      }
    }
  }
}
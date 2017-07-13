function World() {
  this.objects = getObjects();
  this.players = getPlayers();
  this.scoreboards = getScoreboards();
  this.update = function (deltaTime) {
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
    let scoreboards = this.scoreboards;
    drawObjects(ctx, scoreboards);
  };
  this.checkHorizontallyFree = function (player, updatedX, players) {
    if (players) {
      for (let key in players) {
        if (players[key] != player) {
          let otherPlayer = players[key];
          if ((((updatedX + player.width - player.rightFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
              && ((updatedX + player.width - player.rightFreeSpace) < (otherPlayer.x + otherPlayer.width -
              otherPlayer.rightFreeSpace)))//проверка игрока справа
              ||
              (((updatedX + player.leftFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
              && ((updatedX + player.leftFreeSpace) < (otherPlayer.x + otherPlayer.width -
              otherPlayer.rightFreeSpace)))) { //проверка игрока слева
            return false;
          }
        }
      }
    }
    return true;
  };
  this.checkTopFree = function(player, updatedY, players) {
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
  this.checkBottomFree = function(player, updatedY, players) {
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
}
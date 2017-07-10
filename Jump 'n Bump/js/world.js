function World() {
  this.objects = createObjects();
  this.players = createPlayers();
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
    let players = this.players;
    drawObjects(ctx, players);
  };
}
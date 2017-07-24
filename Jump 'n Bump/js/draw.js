function drawObjects(ctx, objects) {
  if (objects) {
    for (let key in objects) {
      drawObject(ctx, objects[key]);
    }
  }
}

function drawObject(ctx, object) {
  ctx.drawImage(object.source, object.imageX, object.imageY, object.imageWidth, object.imageHeight,
      object.x, object.y, object.width, object.height);
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}

function drawResult(ctx) {
  drawBackground(ctx);
  drawScores(ctx);
}
function drawBackground(ctx) {
  let backgroundImage = g_context.resources[imageNames.BACKGROUND];
  ctx.drawImage(backgroundImage, 0, 0, backgroundSize.WIDTH, backgroundSize.HEIGHT,
      0, 0, canvasSize.WIDTH, canvasSize.HEIGHT);
}
function drawScores(ctx) {
  ctx.fillStyle = colors.GREEN;
  ctx.font = "40pt Arial";
  ctx.fillText("Имя игрока", resultButton.NAME_X, resultButton.START_Y);
  ctx.fillText("Баллы", resultButton.SCORE_X, resultButton.START_Y);
  let players = g_world.players;
  if (players) {
    for (let key in players) {
      let playerName = players[key].name;
      let scoreboards = g_world.scoreboards;
      if (scoreboards) {
        for (let key in scoreboards) {
          if (playerName === scoreboards[key].name) {
            ctx.fillText(playerName, resultButton.NAME_X,
                resultButton.START_Y + (+scoreboards.name)* resultButton.SHIFT_Y);
            ctx.fillText(scoreboards[key].pointsAmount, resultButton.SCORE_X,
                resultButton.START_Y + (+scoreboards.name)* resultButton.SHIFT_Y);
          }
        }
      }
    }
  }
}
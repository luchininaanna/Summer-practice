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
function drawPlayers(ctx, players) {
  for (let key in players) {
    if (players[key].liveState === playerInformation.ALIVE) {
      players[key].draw(ctx);
    }
  }
}
function drawScoreboards(ctx, scoreboards) {
  for (let key in scoreboards) {
    scoreboards[key].draw(ctx);
    if (scoreboards[key].scoreboardState === states.ACTIVE) {
      scoreboards[key].drawPoint(ctx);
    }
  }
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}

function drawResult(ctx) {
  drawBackground(ctx);
  drawPrompt(ctx);
}
function drawBackground(ctx) {
  let backgroundImage = g_context.resources[imageNames.BACKGROUND];
  ctx.drawImage(backgroundImage, 0, 0, backgroundSize.WIDTH, backgroundSize.HEIGHT,
      0, 0, canvasSize.WIDTH, canvasSize.HEIGHT);

  let resultBackgroundImage = g_context.resources[imageNames.RESULT_BACKGROUND];
  ctx.drawImage(resultBackgroundImage, resultBackgroundSize.IMAGE_X, resultBackgroundSize.IMAGE_Y,
      resultBackgroundSize.IMAGE_WIDTH, resultBackgroundSize.HEIGHT,
      resultBackgroundSize.X, resultBackgroundSize.Y,
      resultBackgroundSize.WIDTH, resultBackgroundSize.HEIGHT);

  ctx.strokeStyle = colors.LIGHT_YELLOW;
  ctx.lineWidth = 5;
  drawLine(ctx, resultBackgroundSize.X, resultBackgroundSize.Y + resultBackgroundSize.VERTICAL_SHIFT,
      resultBackgroundSize.X + resultBackgroundSize.WIDTH,
      resultBackgroundSize.Y + resultBackgroundSize.VERTICAL_SHIFT);
  drawLine(ctx, resultBackgroundSize.X + resultBackgroundSize.HORIZONTAL_SHIFT, resultBackgroundSize.Y,
      resultBackgroundSize.X + resultBackgroundSize.HORIZONTAL_SHIFT,
      resultBackgroundSize.Y);
}
function drawScores(ctx) {
  ctx.fillStyle = colors.LIGHT_BLUE;
  ctx.font = "40pt Arial";
  ctx.fillText(result.PLAYER_NAME_HEADING, result.PLAYER_NAME_HEADING_X, result.START_Y);
  ctx.fillText(result.SCORE_HEADING, result.SCORE_HEADING_X, result.START_Y);
  let scoreboards = g_world.scoreboards;
  let recordNumber = 0;
  if (scoreboards) {
    for (let key in scoreboards) {
      if (scoreboards[key].scoreboardState === states.ACTIVE) {
        ctx.fillText(result.PLAYER + scoreboards[key].name, result.PLAYER_NAME_X,
            result.RECORD_START_Y + result.SHIFT_Y * recordNumber);
        ctx.fillText(scoreboards[key].pointsAmount, result.SCORE_X,
            result.RECORD_START_Y + result.SHIFT_Y * recordNumber);
        recordNumber++;
      }
      if (scoreboards[key].scoreboardState === states.INACTIVE) {
        ctx.fillText(result.PLAYER + scoreboards[key].name, result.PLAYER_NAME_X,
            result.RECORD_START_Y + result.SHIFT_Y * recordNumber);
        ctx.fillText(result.EMPTY_RECORD, result.EMPTY_RECORD_X,
            result.RECORD_START_Y + result.SHIFT_Y * recordNumber);
        recordNumber++;
      }
    }
  }
}
function drawPrompt(ctx) {
  let prompt = g_world.scoreboards.firstScoreboard.prompt;
  ctx.fillStyle = colors.RED;
  ctx.font = "bold 30pt Arial";
  if (prompt.state === states.ACTIVE) {
    ctx.fillText(promptInformation.TEXT, promptInformation.X, promptInformation.Y);
  }
}
function drawLine(ctx, firstX, firstY, lastX, lastY) {
  ctx.beginPath();
  ctx.moveTo(firstX, firstY);
  ctx.lineTo(lastX, lastY);
  ctx.closePath();
  ctx.stroke();
}

function drawInsectsSwarm(ctx, swarm) {
  for (let i = 0; i < insectsSwarm.AMOUNT_INSECTS; i++) {
    swarm.swarm[i].draw(ctx);
  }
}
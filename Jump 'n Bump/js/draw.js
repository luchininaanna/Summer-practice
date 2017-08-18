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

  ctx.strokeStyle = colors.LIGHT_YELLOW;
  ctx.lineWidth = 5;

  for (let i=0; i < resultTable.AMOUNT_HORIZONTAL_LINE; i++) {
    drawLine(ctx, resultTable.START_X, resultTable.START_Y + i * resultTable.LINE_SHIFT_Y,
        resultTable.START_X + resultTable.WIDTH, resultTable.START_Y + i * resultTable.LINE_SHIFT_Y);
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
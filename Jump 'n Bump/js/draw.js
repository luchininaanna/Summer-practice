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
  let resultTable;
  if (PLAYERS_AMOUNT >= 2) {
    resultTable = resultTableForTwoPlayers;
  }
  if (PLAYERS_AMOUNT >= 3) {
    resultTable = resultTableForThreePlayers;
  }
  if (PLAYERS_AMOUNT === 4) {
    resultTable = resultTableForFourPlayers;
  }

  drawBackground(ctx, resultTable);
  drawResultTable(ctx, resultTable);
  drawPrompt(ctx);
}

function drawBackground(ctx, resultTable) {
  let backgroundImage = g_context.resources[imageNames.BACKGROUND];
  ctx.drawImage(backgroundImage, 0, 0, backgroundSize.WIDTH, backgroundSize.HEIGHT,
      0, 0, canvasSize.WIDTH, canvasSize.HEIGHT);

  let backgroundResultImage = g_context.resources[imageNames.RESULT_BACKGROUND];
  ctx.drawImage(backgroundResultImage, resultBackgroundSize.IMAGE_X, resultBackgroundSize.IMAGE_Y,
      resultTable.WIDTH, resultTable.HEIGHT,
      resultTable.START_TABLE_X, resultTable.START_TABLE_Y,
      resultTable.WIDTH, resultTable.HEIGHT);
}

function drawResultTable(ctx, resultTable) {
  ctx.strokeStyle = colors.LIGHT_YELLOW;
  ctx.lineWidth = 5;
  ctx.fillStyle = colors.LIGHT_YELLOW;
  ctx.font = "bold 35pt Arial";

  let firstX;
  let lastX;
  let firstY;
  let lastY;
  let player;

  let scoreboards = g_world.scoreboards;
  let pointAmount;

  for (let i = 0; i < resultTable.AMOUNT_HORIZONTAL_LINE; i++) {
    firstX = resultTable.START_TABLE_X;
    lastX = resultTable.START_TABLE_X + resultTable.WIDTH;
    firstY = resultTable.START_TABLE_Y + i * resultTable.LINE_SHIFT_Y;
    lastY = resultTable.START_TABLE_Y + i * resultTable.LINE_SHIFT_Y;
    drawLine(ctx, firstX, firstY, lastX, lastY);

    if ((i >= 1) && (i <= PLAYERS_AMOUNT)) {
      player = getPlayer(i);
      ctx.drawImage(player.rightMovingImage, 0, 0, playerInformation.IMAGE_WIDTH, playerInformation.IMAGE_HEIGHT,
          firstX, firstY,
          resultTable.PLAYER_IMAGE_WIDTH, resultTable.PLAYER_IMAGE_HEIGHT);
      ctx.fillText(player.name, firstX + resultTable.TEXT_BIG_SHIFT_X, firstY + resultTable.TEXT_SHIFT_Y);

      let pointsY = firstY + resultTable.LINE_SHIFT_Y - resultTable.SHIFT_POINTS_Y;

      for (let key in scoreboards) {
        if (scoreboards[key].name === player.name) {
          pointAmount = scoreboards[key].pointsAmount;
          break;
        }
      }

      drawPoints(ctx, player, pointsY, pointAmount, resultTable);
    }
  }

  for (let i = 0; i < resultTable.AMOUNT_VERTICAL_LINE; i++) {
    firstX = resultTable.START_TABLE_X + i * resultTable.LINE_SHIFT_X;
    lastX = resultTable.START_TABLE_X + i * resultTable.LINE_SHIFT_X;
    firstY = resultTable.START_TABLE_Y;
    lastY = resultTable.START_TABLE_Y + resultTable.HEIGHT;
    drawLine(ctx, firstX, firstY, lastX, lastY);

    if ((i >= 1) && (i <= PLAYERS_AMOUNT)) {
      player = getPlayer(i);
      ctx.drawImage(player.leftMovingImage, 0, 0, playerInformation.IMAGE_WIDTH, playerInformation.IMAGE_HEIGHT,
          firstX + resultTable.PLAYER_IMAGE_SHIFT_X, firstY,
          resultTable.PLAYER_IMAGE_WIDTH, resultTable.PLAYER_IMAGE_HEIGHT);
      ctx.fillText(player.name, firstX + resultTable.TEXT_SMALL_SHIFT_X, firstY + resultTable.TEXT_SHIFT_Y);
    }
  }

  drawLine(ctx, resultTable.START_TABLE_X + resultTable.WIDTH, resultTable.START_TABLE_Y,
      resultTable.START_TABLE_X + resultTable.WIDTH, resultTable.START_TABLE_Y + resultTable.HEIGHT);
}

function drawPoints(ctx, player, y, pointAmount, resultTable) {
  ctx.font = "bold 50pt Arial";
  let killedPlayers = player.killedPlayers;
  let x = resultTable.FIRST_POINT_X;
  let i = 0;
  for (let key in killedPlayers) {
    if (i < PLAYERS_AMOUNT) {
      if (killedPlayers[key].name === player.name) {
        ctx.fillText(promptInformation.EMPTY_TEXT, x, y);
      } else {
        let point = killedPlayers[key].killingAmount;
        let isSingle = isSingleDigit(point);
        if (isSingle) {
          ctx.fillText(point, x + resultTable.SHIFT_POINTS_X, y);
        } else {
          ctx.fillText(point, x + resultTable.SHIFT_POINTS_X - resultTable.EXTRA_SHIFT_POINTS_X, y);
        }
      }
      x = getNewPointX(resultTable, x);
      i++;
    }
  }
  let isSingle = isSingleDigit(pointAmount);
  if (isSingle) {
    ctx.fillText(pointAmount, x, y);
  } else {
    ctx.fillText(pointAmount, x - resultTable.EXTRA_SHIFT_POINTS_X, y);
  }
  ctx.font = "bold 35pt Arial";
}

function getNewPointX(resultTable, x) {
  switch (x) {
    case resultTable.FIRST_POINT_X:
      x = resultTable.SECOND_POINT_X;
      break;
    case resultTable.SECOND_POINT_X:
      x = resultTable.THIRD_POINT_X;
      break;
    case resultTable.THIRD_POINT_X:
      x = resultTable.FOURTH_POINT_X;
      break;
    case resultTable.FOURTH_POINT_X:
      x = resultTable.FIFTH_POINT_X;
      break;
    case resultTable.FIFTH_POINT_X:
      x = resultTable.FIRST_POINT_X;
      break;
  }
  return x;
}

function isSingleDigit(digit) {
  let integralPart = Math.floor(digit / 10); //целая часть от деления
  if (integralPart === 0) {
    return true;
  }
  return false;
}

function drawPrompt(ctx) {
  let prompt = g_world.scoreboards.firstScoreboard.prompt;
  let y;
  if (PLAYERS_AMOUNT >= 2) {
    y = promptInformation.Y_FOR_TWO_PLAYERS;
  }
  if (PLAYERS_AMOUNT >= 3) {
    y = promptInformation.Y_FOR_THREE_PLAYERS;
  }
  if (PLAYERS_AMOUNT === 4) {
    y = promptInformation.Y_FOR_FOUR_PLAYERS;
  }
  ctx.fillStyle = colors.RED;
  ctx.font = "bold 30pt Arial";
  if (prompt.state === states.ACTIVE) {
    ctx.fillText(promptInformation.TEXT, promptInformation.X, y);
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

function getPlayer(cellNumber) {
  let players = g_world.players;
  let player;
  switch (cellNumber) {
    case resultTableForFourPlayers.FIRST_CELL:
      player = players.firstPlayer;
      break;
    case resultTableForFourPlayers.SECOND_CELL:
      player = players.secondPlayer;
      break;
    case resultTableForFourPlayers.THIRD_CELL:
      player = players.thirdPlayer;
      break;
    case resultTableForFourPlayers.FOURTH_CELL:
      player = players.fourthPlayer;
      break;
  }
  return player;
}
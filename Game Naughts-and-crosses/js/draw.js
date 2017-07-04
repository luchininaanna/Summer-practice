function drawGame(ctx, game) {
  drawBackground(ctx);
  drawGameField(ctx);
  drawElements(ctx);
  drawCircuit(ctx);
  let stateOfGame = game.stateOfGame;
  let namePlayerWithRightOfMove = game.namePlayerWithRightOfMove;
  if (stateOfGame === statesOfGame.IN_PROCESS) {
    drawPlayersWindows(ctx, namePlayerWithRightOfMove);
    drawTimer(ctx);
    if (game.drawResult === true) {
      game.drawResult = false;
    }
  } else {
    drawLineOfSet(ctx);
    setTimeout(function () {
      game.drawResult = true;
    }, 1000);
    if (game.drawResult) {
      drawResult();
    }
  }
  return game;
}

function drawBackground(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = colors.DARK_KHAKI;
  ctx.fillStyle = colors.KHAKI;
  drawRectangle(ctx, 0, 0, background.WIDTH, canvasSize.HEIGHT,
      background.DARK_BAND_AMOUNT, 2 * background.WIDTH, 0);
  ctx.fillStyle = colors.LIGHT_KHAKI;
  drawRectangle(ctx, background.WIDTH, 0, background.WIDTH,
      canvasSize.HEIGHT, background.LIGHT_BAND_AMOUNT, 2 * background.WIDTH, 0);
}
function drawGameField(ctx) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = colors.LIGHT_KHAKI;
  ctx.fillStyle = colors.DARK_KHAKI;
  drawRectangle(ctx, fieldsSize.X, fieldsSize.Y, fieldsSize.ELEMENTS_IN_RAW * fieldsSize.WIDTH,
      fieldsSize.FIELDS_IN_COLON * fieldsSize.WIDTH, 1, 0, 0);
  let fields = g_context.fields;
  for (let i = 0; i < fieldsSize.FIELDS_IN_RAW; i++) {
    drawLine(ctx, fields[i].x + fieldsSize.WIDTH, fields[i].y,
        fields[i].x + fieldsSize.WIDTH,
        fields[i].y + fieldsSize.WIDTH * fieldsSize.ELEMENTS_IN_COLON);
  }
  for (let j = 0; j < fieldsSize.FIELDS_IN_COLON * fieldsSize.ELEMENTS_IN_RAW; j = j + fieldsSize.ELEMENTS_IN_RAW) {
    drawLine(ctx, fields[j].x, fields[j].y,
        fields[j].x + fieldsSize.ELEMENTS_IN_RAW * fieldsSize.WIDTH,
        fields[j].y);
  }
}
function drawElements(ctx) {
  let fields = g_context.fields;
  for (let i = 0; i < fieldsSize.AMOUNT; i++) {
    if (fields[i].nameOfSymbol === namesOfElements.CROSS) {
      drawCross(ctx, fields[i].x + fieldsSize.WIDTH / 2, fields[i].y + fieldsSize.WIDTH / 2, elementsSize.COEFFICIENT);
    }
    if (fields[i].nameOfSymbol === namesOfElements.NAUGHT) {
      drawNaught(ctx, fields[i].x + fieldsSize.WIDTH / 2, fields[i].y + fieldsSize.WIDTH / 2, elementsSize.COEFFICIENT);
    }
  }
}
function drawCross(ctx, x, y, coef) {
  if (coef === elementsSize.COEFFICIENT) {
    ctx.strokeStyle = colors.RED;
    ctx.lineWidth = 20;
    ctx.fillStyle = colors.RED;
  } else {
    ctx.strokeStyle = colors.KHAKI;
    ctx.lineWidth = coef * 20;
    ctx.fillStyle = colors.KHAKI;
  }
  drawLine(ctx, x - coef * elementsSize.SHIFT / 2, y - coef * elementsSize.SHIFT / 2,
      x + coef * elementsSize.SHIFT / 2, y + coef * elementsSize.SHIFT / 2);
  drawLine(ctx, x - coef * elementsSize.SHIFT / 2, y + coef * elementsSize.SHIFT / 2,
      x + coef * elementsSize.SHIFT / 2, y - coef * elementsSize.SHIFT / 2);
  drawCircle(ctx, x - coef * elementsSize.SHIFT / 2, y - coef * elementsSize.SHIFT / 2,
      coef * elementsSize.RADIUS, elementsSize.CORNER);
  drawCircle(ctx, x + coef * elementsSize.SHIFT / 2, y + coef * elementsSize.SHIFT / 2,
      coef * elementsSize.RADIUS, elementsSize.CORNER);
  drawCircle(ctx, x - coef * elementsSize.SHIFT / 2, y + coef * elementsSize.SHIFT / 2,
      coef * elementsSize.RADIUS, elementsSize.CORNER);
  drawCircle(ctx, x + coef * elementsSize.SHIFT / 2, y - coef * elementsSize.SHIFT / 2,
      coef * elementsSize.RADIUS, elementsSize.CORNER)
}
function drawNaught(ctx, x, y, coef) {
  if (coef === elementsSize.COEFFICIENT) {
    ctx.fillStyle = colors.RED;
  } else {
    ctx.fillStyle = colors.KHAKI;
  }
  drawCircle(ctx, x, y, coef * elementsSize.BIG_RADIUS, elementsSize.CORNER);
  if (coef === elementsSize.COEFFICIENT) {
    ctx.fillStyle = colors.DARK_KHAKI;
  } else {
    ctx.fillStyle = colors.LIGHT_KHAKI;
  }
  drawCircle(ctx, x, y, coef * elementsSize.SMALL_RADIUS, elementsSize.CORNER);
}

function drawPlayersWindows(ctx, namePlayerWithRightOfMove) {
  ctx.lineWidth = 2;
  if (namePlayerWithRightOfMove === rightToMove.FIRST_PLAYER) {
    ctx.fillStyle = colors.RED;
    drawRectangle(ctx, playersWindow.X - playersWindow.WINDOW_SHIFT, playersWindow.Y - playersWindow.WINDOW_SHIFT,
        playersWindow.WIDTH, playersWindow.HEIGHT, 1, 0, 0);
    ctx.fillStyle = colors.DARK_KHAKI;
    drawRectangle(ctx, playersWindow.X - playersWindow.WINDOW_SHIFT,
        playersWindow.Y + playersWindow.HEIGHT + playersWindow.WINDOWS_DISTANCE - playersWindow.WINDOW_SHIFT,
        playersWindow.WIDTH, playersWindow.HEIGHT, 1, 0, 0);
  } else {
    ctx.fillStyle = colors.DARK_KHAKI;
    drawRectangle(ctx, playersWindow.X - playersWindow.WINDOW_SHIFT, playersWindow.Y - playersWindow.WINDOW_SHIFT,
        playersWindow.WIDTH, playersWindow.HEIGHT, 1, 0, 0);
    ctx.fillStyle = colors.RED;
    drawRectangle(ctx, playersWindow.X - playersWindow.WINDOW_SHIFT,
        playersWindow.Y + playersWindow.HEIGHT + playersWindow.WINDOWS_DISTANCE - playersWindow.WINDOW_SHIFT,
        playersWindow.WIDTH, playersWindow.HEIGHT, 1, 0, 0);
  }
  ctx.fillStyle = colors.DARK_KHAKI;
  ctx.strokeStyle = colors.ORANGE;
  drawRectangle(ctx, playersWindow.X, playersWindow.Y, playersWindow.WIDTH - 2 * playersWindow.WINDOW_SHIFT,
      playersWindow.HEIGHT - 2 * playersWindow.WINDOW_SHIFT, playersWindow.AMOUNT, 0,
      playersWindow.HEIGHT + playersWindow.WINDOWS_DISTANCE);
  ctx.fillStyle = colors.ORANGE;
  ctx.font = "bold 30pt Arial";
  ctx.fillText(messages.TEXT_FIRST_PLAYER, playersWindow.X + playersWindow.WIDTH / 2 - playersWindow.TEXT_COEFFICIENT,
      playersWindow.Y + playersWindow.HEIGHT / 2);
  ctx.fillText(messages.TEXT_SECOND_PLAYER, playersWindow.X + playersWindow.WIDTH / 2 - playersWindow.TEXT_COEFFICIENT,
      playersWindow.Y + playersWindow.HEIGHT + playersWindow.WINDOWS_DISTANCE +
      playersWindow.HEIGHT / 2);
}

function drawTimer(ctx) {
  let deltaCorner = g_context.timer.deltaCorner;
  ctx.lineWidth = 3;
  ctx.strokeStyle = colors.RED;
  ctx.beginPath();
  ctx.arc(timerSize.X, timerSize.Y, timerSize.RADIUS, dateClock.FIRST_DELTA_CLOCK * Math.PI,
      dateClock.SECOND_DELTA_CLOCK * Math.PI, false);
  ctx.lineTo(timerSize.X, timerSize.Y);
  ctx.stroke();
  ctx.fillStyle = colors.RED;
  ctx.beginPath();
  ctx.arc(timerSize.X, timerSize.Y, timerSize.RADIUS, dateClock.FIRST_DELTA_CLOCK * Math.PI,
      (deltaCorner + dateClock.FIRST_DELTA_CLOCK) * Math.PI, false);
  ctx.lineTo(timerSize.X, timerSize.Y);
  ctx.fill();
  switch (true) {
    case deltaCorner >= timerSize.FIRST_PART && deltaCorner < timerSize.SECOND_PART:
      drawDigitsOfClock(ctx, timerSize.FIRST_TIME_INTERVAL, timerSize.X, timerSize.Y,
          timerSize.RADIUS, timerSize.FIRST_PART + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= timerSize.SECOND_PART && deltaCorner < timerSize.THIRD_PART:
      drawDigitsOfClock(ctx, timerSize.SECOND_TIME_INTERVAL, timerSize.X, timerSize.Y,
          timerSize.RADIUS, timerSize.FIRST_PART + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= timerSize.THIRD_PART && deltaCorner < timerSize.FOURTH_PART:
      drawDigitsOfClock(ctx, timerSize.THIRD_TIME_INTERVAL, timerSize.X, timerSize.Y,
          timerSize.RADIUS, timerSize.FIRST_PART + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= timerSize.FOURTH_PART && deltaCorner < timerSize.FIFTH_PART:
      drawDigitsOfClock(ctx, timerSize.FOURTH_TIME_INTERVAL, timerSize.X, timerSize.Y,
          timerSize.RADIUS, timerSize.FIRST_PART + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= timerSize.FIFTH_PART:
      drawDigitsOfClock(ctx, timerSize.FIFTH_TIME_INTERVAL, timerSize.X, timerSize.Y,
          timerSize.RADIUS, timerSize.FIRST_PART + dateClock.FIRST_DELTA_CLOCK);
      break;
  }
}
function drawDigitsOfClock(ctx, amountOfDigits, x, y, r, corner) {
  ctx.fillStyle = colors.BLACK;
  ctx.font = "bold 30pt Arial";
  for (let i = 0; i < amountOfDigits; i++) {
    let deltaX = 0;
    let deltaY = 0;
    switch (i) {
      case 1:
        deltaX = 15;
        deltaY = 15;
        break;
      case 2:
        deltaX = -25;
        deltaY = 25;
        break;
      case 3:
        deltaX = -15;
        deltaY = -15;
        break;
      case 4:
        deltaX = -5;
        deltaY = -15;
        break;
    }
    let xText = x + deltaX + r * Math.cos((corner + i * timerSize.FIRST_PART) * Math.PI);
    let yText = y + deltaY + r * Math.sin((corner + i * timerSize.FIRST_PART) * Math.PI);
    let digit = i + timerSize.FIRST_TIME_INTERVAL;
    ctx.fillText(digit, xText, yText);
  }
}

function drawLineOfSet(ctx) {
  let fields = g_context.fields;
  let game = g_context.game.winningSet;
  let firstPosition = 0;
  if (game.length > 0) {
    let lastPosition = game.length - 1;
    ctx.strokeStyle = colors.ORANGE;
    ctx.lineWidth = 20;
    drawLine(ctx, fields[game[firstPosition]].x + fieldsSize.WIDTH / 2,
        fields[game[firstPosition]].y + fieldsSize.WIDTH / 2,
        fields[game[lastPosition]].x + fieldsSize.WIDTH / 2,
        fields[game[lastPosition]].y + fieldsSize.WIDTH / 2);
  }
}

function drawResult() {
  let ctx = g_context.ctx;
  ctx.strokeStyle = colors.RED;
  ctx.fillStyle = colors.LIGHT_KHAKI;
  ctx.lineWidth = 5;
  let sizeCanvas = new CanvasSize();
  drawRectangle(ctx, 0, 0, sizeCanvas.WIDTH, sizeCanvas.HEIGHT, 1, 0, 0);
  drawAnimation(ctx);
  ctx.fillStyle = colors.RED;
  ctx.font = "bold 70pt Arial";
  let stateOfGame = g_context.game.stateOfGame;
  if (stateOfGame === rightToMove.FIRST_PLAYER) {
    ctx.fillText(messages.THE_MESSAGE_OF_VICTORY_OF_FIRST_PLAYER, messages.VICTORY_X, messages.VICTORY_Y);
  } else {
    if (stateOfGame === rightToMove.SECOND_PLAYER) {
      ctx.fillText(messages.THE_MESSAGE_OF_VICTORY_OF_SECOND_PLAYER, messages.VICTORY_X, messages.VICTORY_Y);
    } else {
      if (stateOfGame === statesOfGame.DRAW) {
        ctx.fillText(messages.THE_MESSAGE_OF_DRAW, messages.DRAW_X, messages.DRAW_Y);
      }
    }
  }
  let clock = g_context.clock;
  drawClock(ctx, clock);
  let button = createStateOfButton();
  button.draw(ctx);
  drawCircuit(ctx);
}
function drawAnimation(ctx) {
  let elements = g_context.animationElements;
  let amountOfElements = elements.length;
  for (let i = 0; i < amountOfElements; i++) {
    if (elements[i].nameOfElement === namesOfElements.CROSS) {
      drawElementForAnimation(ctx, namesOfElements.CROSS, elements[i].x, elements[i].y, animation.COEFFICIENT);
    } else {
      drawElementForAnimation(ctx, namesOfElements.NAUGHT, elements[i].x, elements[i].y, animation.COEFFICIENT);
    }
  }
}
function drawElementForAnimation(ctx, nameOfElement, x, y, coef) {
  if (nameOfElement === namesOfElements.CROSS) {
    drawCross(ctx, x, y, coef);
  } else {
    drawNaught(ctx, x, y, coef);
  }
}

function drawCircuit(ctx) {
  ctx.strokeStyle = colors.RED;
  ctx.lineWidth = 5;
  let sizeCanvas = new CanvasSize();
  drawLine(ctx, 0, 0, 0, sizeCanvas.HEIGHT);
  drawLine(ctx, 0, sizeCanvas.HEIGHT, sizeCanvas.WIDTH, sizeCanvas.HEIGHT);
  drawLine(ctx, sizeCanvas.WIDTH, sizeCanvas.HEIGHT, sizeCanvas.WIDTH, 0);
  drawLine(ctx, sizeCanvas.WIDTH, 0, 0, 0);
}

function drawClock(ctx, clock) {
  ctx.fillStyle = colors.KHAKI;
  ctx.strokeStyle = colors.OLIVE;
  ctx.lineWidth = 3;
  drawRectangle(ctx, clockSize.X, clockSize.Y, clockSize.WIDTH, clockSize.HEIGHT, 1, 0, 0);
  ctx.fillStyle = colors.LIGHT_KHAKI;
  drawCircle(ctx, clockSize.X + clockSize.CIRCLE_SHIFT + 2 * clockSize.DISTANSE,
      clockSize.Y + clockSize.CIRCLE_SHIFT, clockSize.RADIUS, clockSize.CIRCLE_CORNER);
  drawCircle(ctx, clockSize.X + clockSize.CIRCLE_SHIFT + clockSize.DISTANSE,
      clockSize.Y + clockSize.CIRCLE_SHIFT, clockSize.RADIUS, clockSize.CIRCLE_CORNER);
  drawCircle(ctx, clockSize.X + clockSize.CIRCLE_SHIFT, clockSize.Y + clockSize.CIRCLE_SHIFT,
      clockSize.RADIUS, clockSize.CIRCLE_CORNER);
  ctx.fillStyle = colors.OLIVE;
  ctx.font = "70pt Arial";
  clock.seconds = transformClock(clock.seconds);
  clock.minutes = transformClock(clock.minutes);
  clock.hours = transformClock(clock.hours);
  ctx.fillText(clock.seconds, clockSize.X + clockSize.TEXT_SIDE_SHIFT + 2 * clockSize.DISTANSE,
      clockSize.Y + clockSize.TEXT_BOTTOM_SHIFT);
  ctx.fillText(clock.minutes, clockSize.X + clockSize.TEXT_SIDE_SHIFT + clockSize.DISTANSE,
      clockSize.Y + clockSize.TEXT_BOTTOM_SHIFT);
  ctx.fillText(clock.hours, clockSize.X + clockSize.TEXT_SIDE_SHIFT, clockSize.Y + clockSize.TEXT_BOTTOM_SHIFT);
}
function transformClock(nameOfTime) {
  if (nameOfTime <= 9) {
    nameOfTime = "0" + nameOfTime;
  }
  return nameOfTime;
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
function drawLine(ctx, firstX, firstY, lastX, lastY) {
  ctx.beginPath();
  ctx.moveTo(firstX, firstY);
  ctx.lineTo(lastX, lastY);
  ctx.closePath();
  ctx.stroke();
}
function drawCircle(ctx, x, y, r, corner) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, corner * Math.PI, false);
  ctx.closePath();
  ctx.fill();
}
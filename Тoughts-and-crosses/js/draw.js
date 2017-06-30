let colors = new Colors();
let messages = new Messages();
let dateClock = new DateClock();

function drawObjectWithNewCoordinates(ctx, stateOfGame, namePlayerWithRightOfMove) {
  drawBackground(ctx);
  drawField(ctx, 100, 100);
  drawElements(ctx);
  if (stateOfGame === statesOfGame.IN_PROCESS) {
    drawWindowsOfPlayers(ctx, 850, 450, namePlayerWithRightOfMove);
    drawClock(ctx, 950, 200);
    if (g_context.game.drawResult === true) {
      g_context.game.drawResult = false;
    }
  } else {
    drawLineOfSet(ctx);
    setTimeout(function () {
      g_context.game.drawResult = true;
    }, 1000);
    if (g_context.game.drawResult) {
      drawResult();
    }
  }
}

function drawBackground(ctx) {
  ctx.strokeStyle = colors.DARK_KHAKI;
  ctx.fillStyle = colors.KHAKI;
  ctx.lineWidth = 1;
  let sizeCanvas = new SizeCanvas();
  drawRectangle(ctx, 0, 0, 10, sizeCanvas.width, 60, 20, 0);
  ctx.fillStyle = colors.LIGHT_KHAKI;
  drawRectangle(ctx, 10, 0, 10, sizeCanvas.width, 60, 20, 0);
}
function drawField(ctx, x, y) {
  ctx.lineWidth = 3;
  ctx.strokeStyle = colors.LIGHT_KHAKI;
  drawRectangle(ctx, x, y, 600, 600, 1, 0, 0);
  ctx.fillStyle = colors.DARK_KHAKI;
  let sizeFields = new SizeFields();
  let fields = g_context.fields;
  drawRectangle(ctx, x, y, 600, 600, 1, 0, 0);
  ctx.strokeStyle = colors.LIGHT_KHAKI;
  for (let i = 1; i <= sizeFields.fieldsInRaw; i++) {
    drawLine(ctx, fields[i].x + sizeFields.width, fields[i].y - sizeFields.width,
        fields[i].x + sizeFields.width,
        fields[i].y + sizeFields.width * sizeFields.elementInColon);
  }
  for (let j = 0; j < sizeFields.fieldsInColon * sizeFields.elementInRaw; j = j + sizeFields.elementInRaw) {
    drawLine(ctx, fields[j].x, fields[j].y,
        fields[j].x + sizeFields.elementInRaw * sizeFields.width,
        fields[j].y);
  }
}
function drawElements(ctx) {
  let sizeFields = new SizeFields();
  let fields = g_context.fields;
  for (let i = 0; i < sizeFields.amount; i++) {
    if (fields[i].nameOfSymbol === namesOfElements.CROSS) {
      drawCross(ctx, fields[i].x + sizeFields.width / 2, fields[i].y + sizeFields.width / 2);
    }
    if (fields[i].nameOfSymbol === namesOfElements.NAUGHT) {
      drawNaught(ctx, fields[i].x + sizeFields.width / 2, fields[i].y + sizeFields.width / 2);
    }
  }
}
function drawCross(ctx, x, y) {
  let sizeElements = new SizeElements();
  ctx.strokeStyle = colors.RED;
  ctx.lineWidth = 20;
  drawLine(ctx, x - sizeElements.shift / 2, y - sizeElements.shift / 2, x + sizeElements.shift / 2, y + sizeElements.shift / 2);
  drawLine(ctx, x - sizeElements.shift / 2, y + sizeElements.shift / 2, x + sizeElements.shift / 2, y - sizeElements.shift / 2);
  ctx.fillStyle = colors.RED;
  drawCircle(ctx, x - sizeElements.shift / 2, y - sizeElements.shift / 2, sizeElements.radius, sizeElements.corner);
  drawCircle(ctx, x + sizeElements.shift / 2, y + sizeElements.shift / 2, sizeElements.radius, sizeElements.corner);
  drawCircle(ctx, x - sizeElements.shift / 2, y + sizeElements.shift / 2, sizeElements.radius, sizeElements.corner);
  drawCircle(ctx, x + sizeElements.shift / 2, y - sizeElements.shift / 2, sizeElements.radius, sizeElements.corner)
}
function drawNaught(ctx, x, y) {
  let sizeElements = new SizeElements();
  ctx.fillStyle = colors.RED;
  drawCircle(ctx, x, y, sizeElements.bigRadius, sizeElements.corner);
  ctx.fillStyle = colors.DARK_KHAKI;
  drawCircle(ctx, x, y, sizeElements.smallRadius, sizeElements.corner);
}

function drawWindowsOfPlayers(ctx, x, y, namePlayerWithRightOfMove) {
  ctx.lineWidth = 2;
  if (namePlayerWithRightOfMove === rightToMove.FIRST_PLAYER) {
    ctx.fillStyle = colors.RED;
    drawRectangle(ctx, x - 10, y - 10, 220, 100, 1, 0, 0);
    ctx.fillStyle = colors.DARK_KHAKI;
    drawRectangle(ctx, x - 10, y + 110, 220, 100, 1, 0, 0);
  } else {
    ctx.fillStyle = colors.DARK_KHAKI;
    drawRectangle(ctx, x - 10, y - 10, 220, 100, 1, 0, 0);
    ctx.fillStyle = colors.RED;
    drawRectangle(ctx, x - 10, y + 110, 220, 100, 1, 0, 0);
  }
  ctx.fillStyle = colors.DARK_KHAKI;
  ctx.strokeStyle = colors.ORANGE;
  drawRectangle(ctx, x, y, 200, 80, 2, 0, 120);
  ctx.fillStyle = colors.ORANGE;
  ctx.font = "bold 30pt Arial";
  ctx.fillText(messages.TEXT_FIRST_PLAYER, x + 30, y + 50);
  ctx.fillText(messages.TEXT_SECOND_PLAYER, x + 30, y + 170);
}

function drawClock(ctx, x, y) {
  let deltaCorner = g_context.clock.deltaCorner;
  let sizeClock = new SizeClock();
  ctx.lineWidth = 3;
  ctx.strokeStyle = colors.RED;
  ctx.beginPath();
  ctx.arc(x, y, sizeClock.radius, dateClock.FIRST_DELTA_CLOCK * Math.PI, dateClock.SECOND_DELTA_CLOCK * Math.PI, false);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.fillStyle = colors.RED;
  ctx.beginPath();
  ctx.arc(x, y, sizeClock.radius, dateClock.FIRST_DELTA_CLOCK * Math.PI, (deltaCorner + dateClock.FIRST_DELTA_CLOCK) * Math.PI, false);
  ctx.lineTo(x, y);
  ctx.fill();
  switch (true) {
    case deltaCorner >= sizeClock.firstPart && deltaCorner < sizeClock.secondPart:
      drawDigitsOfClock(ctx, 1, x, y, sizeClock.radius, sizeClock.firstPart + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= sizeClock.secondPart && deltaCorner < sizeClock.thirdPart:
      drawDigitsOfClock(ctx, 2, x, y, sizeClock.radius, sizeClock.firstPart + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= sizeClock.thirdPart && deltaCorner < sizeClock.fourthPart:
      drawDigitsOfClock(ctx, 3, x, y, sizeClock.radius, sizeClock.firstPart + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= sizeClock.fourthPart && deltaCorner < sizeClock.fifthPart:
      drawDigitsOfClock(ctx, 4, x, y, sizeClock.radius, sizeClock.firstPart + dateClock.FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= sizeClock.fifthPart:
      drawDigitsOfClock(ctx, 5, x, y, sizeClock.radius, sizeClock.firstPart + dateClock.FIRST_DELTA_CLOCK);
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
    let xText = x + deltaX + r * Math.cos((corner + i * 0.4) * Math.PI);
    let yText = y + deltaY + r * Math.sin((corner + i * 0.4) * Math.PI);
    ctx.fillText(i + 1, xText, yText);
  }
}

function drawLineOfSet(ctx) {
  let fields = g_context.fields;
  let game = g_context.game.winningSet;
  let firstPosition = 0;
  let sizeFields = new SizeFields();
  if (game.length > 0) {
    let lastPosition = game.length - 1;
    ctx.strokeStyle = colors.ORANGE;
    drawLine(ctx, fields[game[firstPosition]].x + sizeFields.width / 2,
        fields[game[firstPosition]].y + sizeFields.width / 2,
        fields[game[lastPosition]].x + sizeFields.width / 2,
        fields[game[lastPosition]].y + sizeFields.width / 2);
  }
}

function drawResult() {
  let ctx = g_context.ctx;
  ctx.strokeStyle = colors.RED;
  ctx.fillStyle = colors.LIGHT_KHAKI;
  ctx.lineWidth = 5;
  let sizeCanvas = new SizeCanvas();
  drawRectangle(ctx, 0, 0, sizeCanvas.width, sizeCanvas.height, 1, 0, 0);
  drawAnimation(ctx);
  ctx.fillStyle = colors.RED;
  ctx.font = "bold 70pt Arial";
  let stateOfGame = g_context.game.stateOfGame;
  if (stateOfGame === rightToMove.FIRST_PLAYER) {
    ctx.fillText(messages.THE_MESSAGE_OF_VICTORY_OF_FIRST_PLAYER, 150, 300);
  } else {
    if (stateOfGame === rightToMove.SECOND_PLAYER) {
      ctx.fillText(messages.THE_MESSAGE_OF_VICTORY_OF_SECOND_PLAYER, 150, 300);
    } else {
      if (stateOfGame === statesOfGame.DRAW) {
        ctx.fillText(messages.THE_MESSAGE_OF_DRAW, 430, 300);
      }
    }
  }
  drawTime(ctx);
  drawButton(ctx);
}
function drawAnimation(ctx) {
  let elements = g_context.animation;
  let amountOfElements = elements.length;
  for (let i = 0; i < amountOfElements; i++) {
    if (elements[i].nameOfElement === namesOfElements.CROSS) {
      drawElementForAnimation(ctx, namesOfElements.CROSS, elements[i].x, elements[i].y);
      elements[i].y = elements[i].y - 1;
    } else {
      drawElementForAnimation(ctx, namesOfElements.NAUGHT, elements[i].x, elements[i].y);
      elements[i].y = elements[i].y - 1;
    }
    if (elements[i].y < -300) {
      elements[i].y = 900;
    }
  }
}
function drawElementForAnimation(ctx, nameOfElement, x, y) {
  if (nameOfElement === namesOfElements.CROSS) {
    let shift = 160;
    const radius = 10;
    const corner = 2;
    ctx.strokeStyle = colors.KHAKI;
    ctx.lineWidth = 20;
    drawLine(ctx, x - shift / 2, y - shift / 2, x + shift / 2, y + shift / 2);
    drawLine(ctx, x - shift / 2, y + shift / 2, x + shift / 2, y - shift / 2);
    ctx.fillStyle = colors.KHAKI;
    drawCircle(ctx, x - shift / 2, y - shift / 2, radius, corner);
    drawCircle(ctx, x + shift / 2, y + shift / 2, radius, corner);
    drawCircle(ctx, x - shift / 2, y + shift / 2, radius, corner);
    drawCircle(ctx, x + shift / 2, y - shift / 2, radius, corner)
  } else {
    const bigRadius = 90;
    const smallRadius = 73;
    const corner = 2;
    ctx.fillStyle = colors.KHAKI;
    drawCircle(ctx, x, y, bigRadius, corner);
    ctx.fillStyle = colors.LIGHT_KHAKI;
    drawCircle(ctx, x, y, smallRadius, corner);
  }
  ctx.strokeStyle = colors.RED;
  ctx.lineWidth = 5;
  let sizeCanvas = new SizeCanvas();
  drawLine(ctx, 0, 0, 0, sizeCanvas.height);
  drawLine(ctx, 0, sizeCanvas.height, sizeCanvas.width, sizeCanvas.height);
  drawLine(ctx, sizeCanvas.width, sizeCanvas.height, sizeCanvas.width, 0);
  drawLine(ctx, sizeCanvas.width, 0, 0, 0);
}

function drawTime(ctx) {
  let x = 800;
  let y = 0;
  let radius = 60;
  let cornerOfCircle = 2;
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  ctx.fillStyle = colors.KHAKI;
  ctx.strokeStyle = colors.OLIVE;
  ctx.lineWidth = 3;
  drawRectangle(ctx, x, y, 395, 140, 1, 0, 0);
  ctx.fillStyle = colors.LIGHT_KHAKI;
  drawCircle(ctx, x + 330, y + 70, radius, cornerOfCircle);
  drawCircle(ctx, x + 200, y + 70, radius, cornerOfCircle);
  drawCircle(ctx, x + 70, y + 70, radius, cornerOfCircle);
  ctx.fillStyle = colors.OLIVE;
  ctx.font = "70pt Arial";
  seconds = transformTime(seconds);
  minutes = transformTime(minutes);
  hours = transformTime(hours);
  ctx.fillText(seconds, x + 275, y + 100);
  ctx.fillText(minutes, x + 145, y + 100);
  ctx.fillText(hours, x + 15, y + 100);
}
function transformTime(nameOfTime) {
  if (nameOfTime <= 9) {
    nameOfTime = "0" + nameOfTime;
  }
  return nameOfTime;
}
function drawButton(ctx) {
  let sizeButton = new SizeButton();
  ctx.strokeStyle = colors.RED;
  ctx.lineWidth = 5;
  if (g_context.button.stateOfButton === statesOfButton.UNMOVED) {
    ctx.fillStyle = colors.KHAKI;
  } else {
    ctx.fillStyle = colors.ORANGE;
  }
  ctx.lineWidth = 2;
  drawRectangle(ctx, sizeButton.x, sizeButton.y, 460, 100, 1, 0, 0);
  ctx.strokeStyle = colors.RED;
  ctx.fillStyle = colors.RED;
  ctx.font = "bold 30pt Arial";
  ctx.fillText(messages.THE_MESSAGE_OF_NEW_GAME, sizeButton.x + 10, sizeButton.y + 60);
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
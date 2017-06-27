function drawLineOfSet(ctx) {
  let fields = g_context.fields;
  let game = g_context.game.winningSet;
  let firstPosition = 0;
  let lastPosition = g_context.game.winningSet.length - 1;
  console.log(lastPosition);
  drawLine(ctx, fields[game[firstPosition]].x, fields[game[firstPosition]].y,
      fields[game[lastPosition ]].x, fields[game[lastPosition ]].y);
}
function drawResult() {
  let ctx = g_context.ctx;
  ctx.fillStyle = LIGHT_KHAKI;
  drawRectangle(ctx, 0, 0, 1200, 800, 1, 0, 0);
  ctx.fillStyle = RED;
  ctx.strokeStyle = RED;
  ctx.font = "bold 70pt Arial";
  let stateOfGame = g_context.game.stateOfGame;
  if (stateOfGame === FIRST_PLAYER) {
    ctx.fillText(THE_MESSAGE_OF_VICTORY_OF_FIRST_PLAYER, 150, 300);
  } else {
    if (stateOfGame === SECOND_PLAYER) {
      ctx.fillText(THE_MESSAGE_OF_VICTORY_OF_SECOND_PLAYER, 150, 300);
    } else {
      if (stateOfGame === DRAW) {
        ctx.fillText(THE_MESSAGE_OF_DRAW, 430, 300);
      }
    }
  }
  drawButton(ctx);
}

function drawButton(ctx) {
  let x = 380;
  let y = 400;
  if  (g_context.button.stateOfButton === UNMOVED) {
    ctx.fillStyle = KHAKI;
  } else {
    ctx.fillStyle = ORANGE;
  }
  ctx.lineWidth = 2;
  drawRectangle(ctx, x, y, 460, 100, 1, 0, 0);
  ctx.strokeStyle = RED;
  ctx.fillStyle = RED;
  ctx.font = "bold 30pt Arial";
  ctx.fillText(THE_MESSAGE_OF_NEW_GAME, x + 10, y + 60);
}
function drawBackground(ctx) {
  ctx.strokeStyle = DARK_KHAKI;
  ctx.fillStyle = KHAKI;
  ctx.lineWidth = 1;
  drawRectangle(ctx, 0, 0, 10, 800, 60, 20, 0);
  ctx.fillStyle = LIGHT_KHAKI;
  drawRectangle(ctx, 10, 0, 10, 800, 60, 20, 0);
}
function drawField(ctx, x, y) {
  ctx.lineWidth = 3;
  ctx.fillStyle = DARK_KHAKI;
  drawRectangle(ctx, x, y, 600, 600, 1, 0, 0);
  ctx.strokeStyle = LIGHT_KHAKI;
  drawLine(ctx, x + 200, y, x + 200, y + 600);
  drawLine(ctx, x + 400, y, x + 400, y + 600);
  drawLine(ctx, x, y + 200, x + 600, y + 200);
  drawLine(ctx, x, y + 400, x + 600, y + 400);
}
function drawWindowsOfPlayers(ctx, x, y, namePlayerWithRightOfMove) {
  ctx.lineWidth = 2;
  if (namePlayerWithRightOfMove === FIRST_PLAYER) {
    ctx.fillStyle = RED;
    drawRectangle(ctx, x - 10, y - 10, 220, 100, 1, 0, 0);
    ctx.fillStyle = DARK_KHAKI;
    drawRectangle(ctx, x - 10, y + 110, 220, 100, 1, 0, 0);
  } else {
    ctx.fillStyle = DARK_KHAKI;
    drawRectangle(ctx, x - 10, y - 10, 220, 100, 1, 0, 0);
    ctx.fillStyle = RED;
    drawRectangle(ctx, x - 10, y + 110, 220, 100, 1, 0, 0);
  }
  ctx.fillStyle = DARK_KHAKI;
  ctx.strokeStyle = ORANGE;
  drawRectangle(ctx, x, y, 200, 80, 2, 0, 120);
  ctx.fillStyle = ORANGE;
  ctx.font = "bold 30pt Arial";
  ctx.fillText(TEXT_FIRST_PLAYER, x + 30, y + 50);
  ctx.fillText(TEXT_SECOND_PLAYER, x + 30, y + 170);
}
function drawClock(ctx, x, y) {
  let deltaCorner = g_context.clock.deltaCorner;
  let radius = 120;
  ctx.lineWidth = 3;
  ctx.strokeStyle = RED;
  ctx.beginPath();
  ctx.arc(x, y, radius, FIRST_DELTA_CLOCK * Math.PI, SECOND_DELTA_CLOCK * Math.PI, false);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.arc(x, y, radius, FIRST_DELTA_CLOCK * Math.PI, (deltaCorner + FIRST_DELTA_CLOCK) * Math.PI, false);
  ctx.lineTo(x, y);
  ctx.fill();
  switch(true) {
    case deltaCorner >= 0.4 && deltaCorner < 0.8:
      drawDigitsOfClock(ctx, 1, x, y, radius, 0.4 + FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= 0.8 && deltaCorner < 1.2:
      drawDigitsOfClock(ctx, 2, x, y, radius, 0.4 + FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= 1.2 && deltaCorner < 1.6:
      drawDigitsOfClock(ctx, 3, x, y, radius, 0.4 + FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= 1.6 && deltaCorner < 1.8:
      drawDigitsOfClock(ctx, 4, x, y, radius, 0.4 + FIRST_DELTA_CLOCK);
      break;
    case  deltaCorner >= 1.8:
      drawDigitsOfClock(ctx, 5, x, y, radius, 0.4 + FIRST_DELTA_CLOCK);
      break;
  }
}
function drawDigitsOfClock(ctx, amountOfDigits, x, y, r, corner) {
  ctx.fillStyle = BLACK;
  ctx.font = "bold 30pt Arial";
  for (let i=0; i < amountOfDigits; i++) {
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
    let xText = x + deltaX + r * Math.cos((corner + i*0.4) * Math.PI);
    let yText = y + deltaY + r * Math.sin((corner + i*0.4)* Math.PI );
    ctx.fillText(i + 1, xText, yText);
  }
}

function drawElements(ctx) {
  const amountOfFields = 9;
  const shift = 200;
  let fields = g_context.fields;
  for (let i = 0; i < amountOfFields; i++) {
    if (fields[i].nameOfSymbol === CROSS) {
      drawCross(ctx, fields[i].x + shift / 2, fields[i].y + shift / 2);
    }
    if (fields[i].nameOfSymbol === NAUGHT) {
      drawNaught(ctx, fields[i].x + shift / 2, fields[i].y + shift / 2);
    }
  }
}

function drawCross(ctx, x, y) {
  let shift = 160;
  const radius = 10;
  const corner = 2;
  ctx.strokeStyle = RED;
  ctx.lineWidth = 20;
  drawLine(ctx, x - shift / 2, y - shift / 2, x + shift / 2, y + shift / 2);
  drawLine(ctx, x - shift / 2, y + shift / 2, x + shift / 2, y - shift / 2);
  ctx.fillStyle = RED;
  drawCircle(ctx, x - shift / 2, y - shift / 2, radius, corner);
  drawCircle(ctx, x + shift / 2, y + shift / 2, radius, corner);
  drawCircle(ctx, x - shift / 2, y + shift / 2, radius, corner);
  drawCircle(ctx, x + shift / 2, y - shift / 2, radius, corner)
}
function drawNaught(ctx, x, y) {
  const bigRadius = 90;
  const smallRadius = 73;
  const corner = 2;
  ctx.fillStyle = RED;
  drawCircle(ctx, x, y, bigRadius, corner);
  ctx.fillStyle = DARK_KHAKI;
  drawCircle(ctx, x, y, smallRadius, corner);
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
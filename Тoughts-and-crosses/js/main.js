const KHAKI = "#BDB76B";
const LIGHT_KHAKI = "#EEE8AA";
const DARK_KHAKI = "#8B864E";
const RED = "#EE0000";
const ORANGE = "#FF8C00";
const WHITE = "#FFFFFF";

const SHIFT_OF_BROWSER_WINDOW = 8;
const FIRST_PLAYER = 1;
const SECOND_PLAYER = 2;
const EMPTY = 0;
const CROSS = 1;
const NAUGHT = 2;

let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.fields = createCoordinatesOfFields(100, 100);
g_context.stateOfGame = createStateOfGame();
g_context.clock = createStateOfClock();

window.requestAnimationFrame(gameLoop);
document.getElementById("canvas").onclick = checkTheClick;

gameLoop();

function gameLoop() {
  let ctx = g_context.ctx;
  let currTime = new Date();
  let prevTime = g_context.prevTime;
  let deltaTime = currTime - prevTime;
  let sumDeltaTime = g_context.clock.sumDeltaTime + deltaTime / 1000;
  let namePlayerWithRightOfMove = g_context.stateOfGame.namePlayerWithRightOfMove;
  g_context.clock.sumDeltaTime = sumDeltaTime;
  updateTheCoordinates(sumDeltaTime);
  cleanCanvas(ctx);
  drawObjectWithNewCoordinates(ctx, namePlayerWithRightOfMove);
  requestAnimationFrame(gameLoop);
  g_context.prevTime = currTime;
}

function updateTheCoordinates(sumDeltaTime) {
  checkEarlyVictory(sumDeltaTime);
  g_context.clock.deltaCorner = sumDeltaTime * 0.2 * 2;
  return g_context.clock.deltaCorner
}

function checkEarlyVictory(sumDeltaTime) {
  let timeForMove = 5;
  if (sumDeltaTime > timeForMove) {
    g_context.clock = createStateOfClock();
    let namePlayerWithRightOfMove = g_context.stateOfGame.namePlayerWithRightOfMove;
    checkTheWinnerByTime(namePlayerWithRightOfMove);
  }
}

function cleanCanvas(ctx) {
  ctx.fillStyle = WHITE;
  drawRectangle(ctx, 0, 0, 1200, 800, 1, 0, 0);
}

function drawObjectWithNewCoordinates(ctx, namePlayerWithRightOfMove) {
  drawBackground(ctx);
  drawField(ctx, 100, 100);
  drawWindowsOfPlayers(ctx, 850, 450, namePlayerWithRightOfMove);
  drawElements(ctx);
  drawClock(ctx, 950, 200);
  checkTheWinnerBySetSymbols();
  //checkTheDraw();
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
  ctx.fillText("Игрок 1", x + 30, y + 50);
  ctx.fillText("Игрок 2", x + 30, y + 170);
}
function drawClock(ctx, x, y) {
  let deltaCorner = g_context.clock.deltaCorner;
  let radius = 120;
  ctx.lineWidth = 3;
  ctx.strokeStyle = RED;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, deltaCorner * Math.PI, false);
  ctx.lineTo(x, y);
  ctx.fill();
}

function Field(x, y, nameOfSymbol) {
  this.x = x;
  this.y = y;
  this.nameOfSymbol = nameOfSymbol;
}
function createCoordinatesOfFields(x, y) {
  let fields = [];
  fields[0] = new Field(x, y, EMPTY);
  fields[1] = new Field(x + 200, y, EMPTY);
  fields[2] = new Field(x + 400, y, EMPTY);
  fields[3] = new Field(x, y + 200, EMPTY);
  fields[4] = new Field(x + 200, y + 200, EMPTY);
  fields[5] = new Field(x + 400, y + 200, EMPTY);
  fields[6] = new Field(x, y + 400, EMPTY);
  fields[7] = new Field(x + 200, y + 400, EMPTY);
  fields[8] = new Field(x + 400, y + 400, EMPTY);
  return fields
}
function createStateOfGame() {
  stateOfGame = {
    namePlayerWithRightOfMove: FIRST_PLAYER,
  };
  return stateOfGame
}
function createStateOfClock() {
  stateOfClock = {
    deltaCorner: EMPTY,
    sumDeltaTime: EMPTY,
  };
  return stateOfClock
}

function checkTheClick(e) {
  let cursorX = e.pageX;
  let cursorY = e.pageY;
  let fields = g_context.fields;
  checkTheRightClick(cursorX, cursorY, fields);
}

function checkTheRightClick(x, y, fields) {
  let amountOfFields = 9;
  let shift = 200;
  let namePlayerWithRightOfMove = g_context.stateOfGame.namePlayerWithRightOfMove;
  for (let i = 0; i < amountOfFields; i++) {
    if ((x > fields[i].x + SHIFT_OF_BROWSER_WINDOW) &&
        (x < fields[i].x + shift + SHIFT_OF_BROWSER_WINDOW) &&
        (y > fields[i].y + SHIFT_OF_BROWSER_WINDOW) &&
        (y < fields[i].y + shift + SHIFT_OF_BROWSER_WINDOW) &&
        (fields[i].nameOfSymbol === EMPTY)) {
      g_context.clock = createStateOfClock();
      if (namePlayerWithRightOfMove === FIRST_PLAYER) {
        fields[i].nameOfSymbol = CROSS;
        g_context.stateOfGame.namePlayerWithRightOfMove = SECOND_PLAYER;
      } else {
        fields[i].nameOfSymbol = NAUGHT;
        g_context.stateOfGame.namePlayerWithRightOfMove = FIRST_PLAYER;
      }
    }
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

function checkTheWinnerByTime(namePlayerWithRightOfMove) {
  let message;
  if (namePlayerWithRightOfMove === FIRST_PLAYER) {
    namePlayerWithRightOfMove = SECOND_PLAYER;
    message = 'Выиграл ' + namePlayerWithRightOfMove + " игрок!";
  } else {
    namePlayerWithRightOfMove = FIRST_PLAYER;
    message = 'Выиграл ' + namePlayerWithRightOfMove + " игрок!";
  }
  alert(message);
}
function checkTheWinnerBySetSymbols() {
  let fields = g_context.fields;
  let state = CROSS;
  if (((fields[0].nameOfSymbol === state) && (fields[1].nameOfSymbol === state) &&
      (fields[2].nameOfSymbol === state)) ||
      ((fields[3].nameOfSymbol === state) && (fields[4].nameOfSymbol === state) &&
      (fields[5].nameOfSymbol === state)) ||
      ((fields[6].nameOfSymbol === state) && (fields[7].nameOfSymbol === state) &&
      (fields[8].nameOfSymbol === state)) ||
      ((fields[0].nameOfSymbol === state) && (fields[3].nameOfSymbol === state) &&
      (fields[6].nameOfSymbol === state)) ||
      ((fields[1].nameOfSymbol === state) && (fields[4].nameOfSymbol === state) &&
      (fields[7].nameOfSymbol === state)) ||
      ((fields[3].nameOfSymbol === state) && (fields[5].nameOfSymbol === state) &&
      (fields[8].nameOfSymbol === state)) ||
      ((fields[0].nameOfSymbol === state) && (fields[4].nameOfSymbol === state) &&
      (fields[8].nameOfSymbol === state)) ||
      ((fields[2].nameOfSymbol === state) && (fields[4].nameOfSymbol === state) &&
      (fields[6].nameOfSymbol === state))) {
    let message;
    if (state === CROSS) {
      message = 'Выиграл ' + 1 + " игрок!";
    } else {
      message = 'Выиграл ' + 2 + " игрок!";
    }
    alert(message);
    setTimeout(askAboutNewGame, 10);
  }
}
function askAboutNewGame() {
  if (confirm("Хотите начать новую игру?")) {
    g_context.fields = createCoordinatesOfFields();
    g_context.stateOfGame = createStateOfGame();
    g_context.clock = createStateOfClock();
    gameLoop();
  }
}
function checkTheDraw() {
  if (checkTheEmptyOfFields) {
    alert("Ничья!");
  }
}
function checkTheEmptyOfFields() {
  let amountOfFields = 9;
  let fields = g_context.fields;
  for (let i = 0; i < amountOfFields; i++) {
    if ((fields[i].nameOfSymbol === CROSS) || (fields[i].nameOfSymbol === NAUGHT)) {
      return false
    }
  }
  return true
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
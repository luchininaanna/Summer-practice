const WHITE = "#FFFFFF";
const LIGHT_KHAKI = "#EEE8AA";
const KHAKI = "#BDB76B";
const DARK_KHAKI = "#8B864E";
const ORANGE = "#FF8C00";
const RED = "#EE0000";

const FIRST_PLAYER = 1;
const SECOND_PLAYER = 2;

const EMPTY = 0;
const CROSS = 1;
const NAUGHT = 2;

const IN_PROCESS = 0;
const THE_VICTORY_OF_FIRST_PLAYER = 1;
const THE_VICTORY_OF_SECOND_PLAYER = 2;
const DRAW = 3;

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
  let stateOfGame = g_context.stateOfGame.stateOfGame;
  let ctx = g_context.ctx;
  if (stateOfGame === IN_PROCESS) {
    let namePlayerWithRightOfMove = g_context.stateOfGame.namePlayerWithRightOfMove;
    let currTime = new Date();
    let prevTime = g_context.prevTime;
    let deltaTime = currTime - prevTime;
    let sumDeltaTime = g_context.clock.sumDeltaTime + deltaTime / 1000;
    g_context.clock.sumDeltaTime = sumDeltaTime;
    updateTheCoordinates(sumDeltaTime);
    cleanCanvas(ctx);
    drawObjectWithNewCoordinates(ctx, namePlayerWithRightOfMove);
    requestAnimationFrame(gameLoop);
    g_context.prevTime = currTime;
  } else {
    drawFinishState(ctx);
    setTimeout(drawResult, 2000);
  }
}

function updateTheCoordinates(sumDeltaTime) {
  checkTheStateOfGame(sumDeltaTime);
  g_context.clock.deltaCorner = sumDeltaTime * 0.2 * 2;
  return g_context.clock.deltaCorner
}

function checkTheStateOfGame(sumDeltaTime) {
  let timeForMove = 5;
  if (sumDeltaTime > timeForMove) {
    g_context.clock = createStateOfClock();
    let namePlayerWithRightOfMove = g_context.stateOfGame.namePlayerWithRightOfMove;
    let stateOfGame = g_context.stateOfGame.stateOfGame;
    checkTheWinnerByTime(namePlayerWithRightOfMove, stateOfGame);
  } else {
    checkTheWinnerBySetSymbols();
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
}

function drawFinishState(ctx) {
  drawBackground(ctx);
  drawField(ctx, 100, 100);
  drawElements(ctx);
}
function drawResult() {
  let stateOfGame = g_context.stateOfGame.stateOfGame;
  let ctx = g_context.ctx;
  ctx.fillStyle = LIGHT_KHAKI;
  drawRectangle(ctx, 0, 0, 1200, 800, 1, 0, 0);
  ctx.fillStyle = RED;
  ctx.font = "bold 70pt Arial";
  if (stateOfGame === FIRST_PLAYER) {
    ctx.fillText("ВЫИГРАЛ 1 ИГРОК!", 150, 300);
  } else {
    if (stateOfGame === SECOND_PLAYER) {
      ctx.fillText("ВЫИГРАЛ 2 ИГРОК!", 150, 300);
    } else {
      if (stateOfGame === DRAW) {
        ctx.fillText("НИЧЬЯ!", 430, 300);
      }
    }
  }
  createButton(ctx);
}

function createButton(ctx) {
  let x = 380;
  let y = 400;
  ctx.fillStyle = KHAKI;
  ctx.lineWidth = 2;
  drawRectangle(ctx, x, y, 460, 100, 1, 0, 0);
  ctx.strokeStyle = RED;
  ctx.fillStyle = RED;
  ctx.font = "bold 30pt Arial";
  ctx.fillText("НАЧАТЬ НОВУЮ ИГРУ", x + 10, y + 60);
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
function Game(player, stateOfGame) {
  this.namePlayerWithRightOfMove = player;
  this.stateOfGame = stateOfGame;
}
function createStateOfGame() {
  stateOfGame = new Game(FIRST_PLAYER, IN_PROCESS);
  return stateOfGame
}
function Clock(deltaCorner, sumDeltaTime) {
  this.deltaCorner = deltaCorner;
  this.sumDeltaTime = sumDeltaTime;
}
function createStateOfClock() {
  stateOfClock = new Clock(EMPTY, EMPTY);
  return stateOfClock
}

function checkTheClick(e) {
  let stateOfGame = g_context.stateOfGame.stateOfGame;
  let cursorX = e.pageX;
  let cursorY = e.pageY;
  if (stateOfGame === IN_PROCESS) {
    let fields = g_context.fields;
    checkTheRightClick(cursorX, cursorY, fields);
  } else {
    checkTheStartNewGame(cursorX, cursorY);
  }
}

function checkTheRightClick(x, y, fields) {
  let amountOfFields = 9;
  let shift = 200;
  let namePlayerWithRightOfMove = g_context.stateOfGame.namePlayerWithRightOfMove;
  for (let i = 0; i < amountOfFields; i++) {
    if ((x > fields[i].x) &&
        (x < fields[i].x + shift) &&
        (y > fields[i].y) &&
        (y < fields[i].y + shift) &&
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
function checkTheStartNewGame(cursorX, cursorY) {
  let x = 380;
  let y = 400;
  let width = 460;
  let height = 100;
  if ((cursorX > x) && (cursorX < x + width) && (cursorY > y) && (cursorY < y + height)) {
    g_context.prevTime = new Date();
    g_context.fields = createCoordinatesOfFields(100, 100);
    g_context.stateOfGame = createStateOfGame();
    g_context.clock = createStateOfClock();
    gameLoop();
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

function checkTheWinnerByTime(namePlayerWithRightOfMove, stateOfGame) {
  if (namePlayerWithRightOfMove === FIRST_PLAYER) {
    stateOfGame = THE_VICTORY_OF_SECOND_PLAYER;
  } else {
    stateOfGame = THE_VICTORY_OF_FIRST_PLAYER;
  }
  g_context.stateOfGame.stateOfGame = stateOfGame;
}
function checkTheWinnerBySetSymbols() {
  let stateOfGame = g_context.stateOfGame.stateOfGame;
  if (isTheWinningSetOfSymbols(CROSS)) {
    stateOfGame = THE_VICTORY_OF_FIRST_PLAYER;
  }
  if (isTheWinningSetOfSymbols(NAUGHT)) {
    stateOfGame = THE_VICTORY_OF_SECOND_PLAYER;
  }
  if (isTheDraw(EMPTY)) {
    stateOfGame = DRAW;
  }
  g_context.stateOfGame.stateOfGame = stateOfGame;

}
function isTheWinningSetOfSymbols(state) {
  let fields = g_context.fields;
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
      ((fields[2].nameOfSymbol === state) && (fields[5].nameOfSymbol === state) &&
      (fields[8].nameOfSymbol === state)) ||
      ((fields[0].nameOfSymbol === state) && (fields[4].nameOfSymbol === state) &&
      (fields[8].nameOfSymbol === state)) ||
      ((fields[2].nameOfSymbol === state) && (fields[4].nameOfSymbol === state) &&
      (fields[6].nameOfSymbol === state))) {
    return true
  }
}
function drawLineBySet(ctx, state) {
  let fields = g_context.fields;
  if ((fields[0].nameOfSymbol === state) && (fields[1].nameOfSymbol === state) &&
      (fields[2].nameOfSymbol === state)) {
    drawLine(ctx, fields[0].x, fields[0].y, fields[2].x, fields[2].y)
  }
}
function isTheDraw(state) {
  let fields = g_context.fields;
  let amountOfFields = fields.length;
  for (let i = 0; i < amountOfFields; i++) {
    if (fields[i].nameOfSymbol === state) {
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
function algoritm(state, amountCallsByWidth, amountCallsByHeight) {
  let fields = g_context.fields;
  let i = 1;
  let j = 1;
  while (i <= amountCallsByWidth) {
    while (j <= amountCallsByHeight) {
      if (fields[(j - 1) + 1].nameOfSymbol === state) {
        i++;
        if (fields[(j - 1) + 1].nameOfSymbol === state) {
          i++;
          if (fields[(j - 1) + 1].nameOfSymbol === state) {
            console.log("горизонталь");
            return true
          }
        }
      }
    }
    i = 1;
    j++;
  }
}
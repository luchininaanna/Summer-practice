const WHITE = "#FFFFFF";
const LIGHT_KHAKI = "#EEE8AA";
const KHAKI = "#BDB76B";
const DARK_KHAKI = "#8B864E";
const ORANGE = "#FF8C00";
const RED = "#EE0000";
const BLACK = "#000000";

const FIRST_PLAYER = 1;
const SECOND_PLAYER = 2;

const EMPTY = 0;
const CROSS = 1;
const NAUGHT = 2;

const IN_PROCESS = 0;
const THE_VICTORY_OF_FIRST_PLAYER = 1;
const THE_VICTORY_OF_SECOND_PLAYER = 2;
const DRAW = 3;

const FIRST_DELTA_CLOCK = 1.5;
const SECOND_DELTA_CLOCK = 3.5;

const THE_MESSAGE_OF_VICTORY_OF_FIRST_PLAYER = "ВЫИГРАЛ 1 ИГРОК!";
const THE_MESSAGE_OF_VICTORY_OF_SECOND_PLAYER = "ВЫИГРАЛ 2 ИГРОК!";
const THE_MESSAGE_OF_DRAW = "НИЧЬЯ!";
const THE_MESSAGE_OF_NEW_GAME = "НАЧАТЬ НОВУЮ ИГРУ";
const TEXT_FIRST_PLAYER = "Игрок 1";
const TEXT_SECOND_PLAYER = "Игрок 2";

const UNMOVED = 0;
const MOVED = 1;

let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.fields = createCoordinatesOfFields(100, 100);
g_context.game = createStateOfGame();
g_context.clock = createStateOfClock();
g_context.button = createStateOfButton();
g_context.browser = createStateOfWindow();

window.requestAnimationFrame(gameLoop);
window.onresize = function changeShift() {
  g_context.browser = createStateOfWindow();
};

gameLoop();

function gameLoop() {
  let ctx = g_context.ctx;
  let currTime = new Date();
  let prevTime = g_context.prevTime;
  let deltaTime = currTime - prevTime;
  updateTheCoordinates(deltaTime);
  cleanCanvas(ctx);
  render(ctx);
  requestAnimationFrame(gameLoop);
  g_context.prevTime = currTime;
}

function render(ctx) {
  let stateOfGame = g_context.game.stateOfGame;
  let namePlayerWithRightOfMove = g_context.game.namePlayerWithRightOfMove;
  drawObjectWithNewCoordinates(ctx, stateOfGame, namePlayerWithRightOfMove);
}

function updateTheCoordinates(deltaTime) {
  let sumDeltaTime = g_context.clock.sumDeltaTime + deltaTime / 1000;
  g_context.clock.sumDeltaTime = sumDeltaTime;
  checkTheStateOfGame(sumDeltaTime);
  g_context.clock.deltaCorner = sumDeltaTime * 0.2 * 2;
  return g_context.clock.deltaCorner
}

function checkTheButton(cursorX, cursorY) {
  let x = 380;
  let y = 400;
  let width = 460;
  let height = 100;
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  if ((cursorX - leftShift > x) && (cursorX - leftShift < x + width) &&
      (cursorY - topShift > y) && (cursorY - topShift < y + height)) {
    g_context.button.stateOfButton = MOVED;
  } else {
    g_context.button.stateOfButton = UNMOVED;
  }
}

function checkTheStateOfGame(sumDeltaTime) {
  let timeForMove = 5;
  if (sumDeltaTime > timeForMove) {
    g_context.clock = createStateOfClock();
    let namePlayerWithRightOfMove = g_context.game.namePlayerWithRightOfMove;
    let stateOfGame = g_context.game.stateOfGame;
    checkTheWinnerByTime(namePlayerWithRightOfMove, stateOfGame);
  } else {
    checkTheWinnerBySetSymbols();
  }
}

function cleanCanvas(ctx) {
  ctx.fillStyle = WHITE;
  drawRectangle(ctx, 0, 0, 1200, 800, 1, 0, 0);
}

function drawObjectWithNewCoordinates(ctx, stateOfGame, namePlayerWithRightOfMove) {
  drawBackground(ctx);
  drawField(ctx, 100, 100);
  drawElements(ctx);
  if (stateOfGame === IN_PROCESS) {
    drawWindowsOfPlayers(ctx, 850, 450, namePlayerWithRightOfMove);
    drawClock(ctx, 950, 200);
  } else {
    drawLineOfSet(ctx);
    drawResult();
  }
}

function checkTheStartNewGame(cursorX, cursorY) {
  let x = 380;
  let y = 400;
  let width = 460;
  let height = 100;
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  if ((cursorX - leftShift > x) && (cursorX - leftShift < x + width) &&
      (cursorY - topShift > y) && (cursorY - topShift < y + height)) {
    g_context.prevTime = new Date();
    g_context.fields = createCoordinatesOfFields(100, 100);
    g_context.game = new Game(FIRST_PLAYER, IN_PROCESS);
    g_context.clock = createStateOfClock();
    gameLoop();
  }
}

function checkTheWinnerByTime(namePlayerWithRightOfMove, stateOfGame) {
  if (namePlayerWithRightOfMove === FIRST_PLAYER) {
    stateOfGame = THE_VICTORY_OF_SECOND_PLAYER;
  } else {
    stateOfGame = THE_VICTORY_OF_FIRST_PLAYER;
  }
  g_context.game.stateOfGame = stateOfGame;
}
function checkTheWinnerBySetSymbols() {
  let stateOfGame = g_context.game.stateOfGame;
  if (isTheWinningSetOfSymbols(CROSS)) {
    stateOfGame = THE_VICTORY_OF_FIRST_PLAYER;
  }
  if (isTheWinningSetOfSymbols(NAUGHT)) {
    stateOfGame = THE_VICTORY_OF_SECOND_PLAYER;
  }
  if (isTheDraw(EMPTY)) {
    stateOfGame = DRAW;
  }
  g_context.game.stateOfGame = stateOfGame;

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
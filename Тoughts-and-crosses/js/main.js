let statesOfGame = new StatesOfGame();
let namesOfElements = new NamesOfElements();
let rightToMove = new RightToMove();
let statesOfButton = new StatesOfButton();

let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.fields = createCoordinatesOfFields(100, 100);
g_context.game = createStateOfGame();
g_context.clock = createStateOfClock();
g_context.button = createStateOfButton();
g_context.browser = createStateOfWindow();
g_context.animation = createElementsForAnimation();

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

function updateTheCoordinates(deltaTime) {
  let sumDeltaTime = g_context.clock.sumDeltaTime + deltaTime / 1000;
  g_context.clock.sumDeltaTime = sumDeltaTime;
  checkTheStateOfGame(sumDeltaTime);
  let sizeClock = new SizeClock();
  g_context.clock.deltaCorner = sumDeltaTime * sizeClock.firstCoefficient * sizeClock.secondCoefficient;
  return g_context.clock.deltaCorner
}
function cleanCanvas(ctx) {
  ctx.fillStyle = colors.WHITE;
  let sizeCanvas = new SizeCanvas();
  drawRectangle(ctx, 0, 0, sizeCanvas.width, sizeCanvas.height, 1, 0, 0);
}
function render(ctx) {
  let stateOfGame = g_context.game.stateOfGame;
  let namePlayerWithRightOfMove = g_context.game.namePlayerWithRightOfMove;
  drawObjectWithNewCoordinates(ctx, stateOfGame, namePlayerWithRightOfMove);
}

function checkTheButton(cursorX, cursorY) {
  let sizeButton = new SizeButton();
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  if ((cursorX - leftShift > sizeButton.x) && (cursorX - leftShift < sizeButton.x + sizeButton.width) &&
      (cursorY - topShift > sizeButton.y) && (cursorY - topShift < sizeButton.y + sizeButton.height)) {
    g_context.button.stateOfButton = statesOfButton.MOVED;
  } else {
    g_context.button.stateOfButton = statesOfButton.UNMOVED;
  }
}

function checkTheStateOfGame(sumDeltaTime) {
  let dateClock = new DateClock();
  if (sumDeltaTime > dateClock.timeForMove) {
    let stateOfGame = g_context.game.stateOfGame;
    if (stateOfGame === statesOfGame.IN_PROCESS) {
      g_context.clock = createStateOfClock();
      let namePlayerWithRightOfMove = g_context.game.namePlayerWithRightOfMove;
      checkTheWinnerByTime(namePlayerWithRightOfMove, stateOfGame);
    }
  } else {
    checkTheWinnerBySetSymbols();
  }
}
function checkTheStartNewGame(cursorX, cursorY) {
  let sizeButton = new SizeButton();
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  if ((cursorX - leftShift > sizeButton.x) && (cursorX - leftShift < sizeButton.x + sizeButton.width) &&
      (cursorY - topShift > sizeButton.y) && (cursorY - topShift < sizeButton.y + sizeButton.height)) {
    g_context.prevTime = new Date();
    g_context.fields = createCoordinatesOfFields(100, 100);
    g_context.game = new Game(rightToMove.FIRST_PLAYER, statesOfGame.IN_PROCESS);
    g_context.clock = createStateOfClock();
    gameLoop();
  }
}
function checkTheWinnerByTime(namePlayerWithRightOfMove, stateOfGame) {
  if (namePlayerWithRightOfMove === rightToMove.FIRST_PLAYER) {
    stateOfGame = statesOfGame.THE_VICTORY_OF_SECOND_PLAYER;
  } else {
    stateOfGame = statesOfGame.THE_VICTORY_OF_FIRST_PLAYER;
  }
  g_context.game.stateOfGame = stateOfGame;
}
function checkTheWinnerBySetSymbols() {
  let stateOfGame = g_context.game.stateOfGame;
  let lengthOfMassif = g_context.game.winningSet.length;
  let sizeFields = new SizeFields();
  if (lengthOfMassif === sizeFields.elementForSet) {
    let fields = g_context.fields;
    let firstElement = g_context.game.winningSet[0];
    if (fields[firstElement].nameOfSymbol === namesOfElements.CROSS) {
      stateOfGame = statesOfGame.THE_VICTORY_OF_FIRST_PLAYER;
    }
    if (fields[firstElement].nameOfSymbol === namesOfElements.NAUGHT) {
      stateOfGame = statesOfGame.THE_VICTORY_OF_SECOND_PLAYER;
    }
  }
  if ((isTheDraw(namesOfElements.EMPTY)) && (stateOfGame === statesOfGame.IN_PROCESS)) {
    stateOfGame = statesOfGame.DRAW;
  }
  g_context.game.stateOfGame = stateOfGame;
  console.log(g_context.game.stateOfGame);
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

document.getElementById("canvas").onclick = checkTheClick;
document.getElementById("canvas").addEventListener('mousemove', function move(evt) {
  let cursorX = evt.pageX;
  let cursorY = evt.pageY;
  checkTheButton(cursorX, cursorY);
}, false);

function checkTheClick(e) {
  let stateOfGame = g_context.game.stateOfGame;
  let cursorX = e.pageX;
  let cursorY = e.pageY;
  if (stateOfGame === statesOfGame.IN_PROCESS) {
    let fields = g_context.fields;
    checkTheRightClick(cursorX, cursorY, fields);
  } else {
    checkTheStartNewGame(cursorX, cursorY);
  }
}
function checkTheRightClick(x, y, fields) {
  let sizeFields = new SizeFields();
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  let namePlayerWithRightOfMove = g_context.game.namePlayerWithRightOfMove;
  for (let i = 0; i < sizeFields.amount; i++) {
    if ((x > fields[i].x + leftShift) &&
        (x < fields[i].x + sizeFields.width + leftShift) &&
        (y > fields[i].y + topShift) &&
        (y < fields[i].y + sizeFields.width + topShift) &&
        (fields[i].nameOfSymbol === namesOfElements.EMPTY)) {
      g_context.clock = createStateOfClock();
      if (namePlayerWithRightOfMove === rightToMove.FIRST_PLAYER) {
        fields[i].nameOfSymbol = namesOfElements.CROSS;
        searchCombination(namesOfElements.CROSS, sizeFields.elementInRaw, sizeFields.elementInColon,
            sizeFields.elementForSet, i);
        g_context.game.namePlayerWithRightOfMove = rightToMove.SECOND_PLAYER;
      } else {
        fields[i].nameOfSymbol = namesOfElements.NAUGHT;
        searchCombination(namesOfElements.NAUGHT, sizeFields.elementInRaw, sizeFields.elementInColon,
            sizeFields.elementForSet, i);
        g_context.game.namePlayerWithRightOfMove = rightToMove.FIRST_PLAYER;
      }
    }
  }
}
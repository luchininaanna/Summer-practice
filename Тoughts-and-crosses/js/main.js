let statesOfGame = new StatesOfGame();
let namesOfElements = new NamesOfElements();
let rightToMove = new RightToMove();
let statesOfButton = new StatesOfButton();

let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.fields = createCoordinatesOfFields(100, 100);
g_context.game = createGame();
g_context.clock = createStateOfClock();
g_context.button = createStateOfButton();
g_context.browser = createStateOfWindow();
g_context.animation = createElementsForAnimation();

window.requestAnimationFrame(gameLoop);

gameLoop();

function gameLoop() {
  let ctx = g_context.ctx;
  let currTime = new Date();
  let prevTime = g_context.prevTime;
  let deltaTime = currTime - prevTime;
  updateTheCoordinates(g_context.clock, deltaTime);
  cleanCanvas(ctx);
  render(ctx);
  requestAnimationFrame(gameLoop);
  g_context.prevTime = currTime;
}

function updateTheCoordinates(clock, deltaTime) {
  let sumDeltaTime = clock.sumDeltaTime + deltaTime / 1000;
  clock.sumDeltaTime = sumDeltaTime;
  checkTheStateOfGame(sumDeltaTime);
  let sizeClock = new ClockSize();
  clock.deltaCorner = sumDeltaTime * sizeClock.FIRST_COEFFICIENT * sizeClock.SECOND_COEFFICIENT;
  return clock;
}
function checkTheStateOfGame(sumDeltaTime) {
  let dateClock = new ClockData();
  if (sumDeltaTime > dateClock.TIME_FOR_MOVE) {
    let stateOfGame = g_context.game.stateOfGame;
    if (stateOfGame === statesOfGame.IN_PROCESS) {
      g_context.clock = createStateOfClock();
      let game = g_context.game;
      checkTheWinnerByTime(game);
    }
  } else {
    let game = g_context.game;
    checkTheWinnerBySetSymbols(game);
  }
}
function cleanCanvas(ctx) {
  ctx.fillStyle = colors.WHITE;
  let sizeCanvas = new CanvasSize();
  drawRectangle(ctx, 0, 0, sizeCanvas.WIDTH, sizeCanvas.HEIGHT, 1, 0, 0);
}
function render(ctx) {
  drawGame(ctx, g_context.game);
}
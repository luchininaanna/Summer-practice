let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.fields = createCoordinatesOfFields();
g_context.game = createGame();
g_context.timer = createStateOfTimer();
g_context.clock = createStateOfClock();
g_context.button = createStateOfButton();
g_context.browser = createStateOfWindow();
g_context.animationElements = createElementsForAnimation();

window.requestAnimationFrame(gameLoop);

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
  let timer = g_context.timer;
  let sumDeltaTime = timer.sumDeltaTime + deltaTime / timerSize.MILLISECONDS_TO_SECONDS;
  timer.sumDeltaTime = sumDeltaTime;
  let game = g_context.game;
  checkTheStateOfGame(sumDeltaTime, game);
  timer.deltaCorner = sumDeltaTime * timerSize.FIRST_COEFFICIENT * timerSize.SECOND_COEFFICIENT;
  let animationElements = g_context.animationElements;
  updateTheCoordinatesOfAnimation(deltaTime, animationElements);
  let clock = g_context.clock;
  updateTheClock(clock);
}
function updateTheClock(clock) {
  let date = new Date();
  clock.hours = date.getHours();
  clock.minutes = date.getMinutes();
  clock.seconds = date.getSeconds();
  return clock;
}
function updateTheCoordinatesOfAnimation(deltaTime, animationElements) {
  let updateY;
  for (let i = 0; i < animationElements.length; i++) {
    if (animationElements[i].y < animation.X_MIN) {
      animationElements[i].y = animationElements[i].y + animation.DISTANSE_DETWEEN_ELEMENTS *
          animation.COEFFICIENT * animation.AMOUNT_OF_RAW;
    }
    updateY = animationElements[i].y - animation.SCORE * deltaTime;
    animationElements[i].y = updateY;
  }
  return animationElements;
}
function cleanCanvas(ctx) {
  ctx.fillStyle = colors.WHITE;
  drawRectangle(ctx, 0, 0, canvasSize.WIDTH, canvasSize.HEIGHT, 1, 0, 0);
}
function render(ctx) {
  let game = g_context.game;
  drawGame(ctx, game);
}
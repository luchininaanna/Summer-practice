window.onresize = function changeShift() {
  g_context.browser = createStateOfWindow();
};
document.getElementById("canvas").onclick = checkTheClick;
document.getElementById("canvas").addEventListener('mousemove', function move(evt) {
  let cursorX = evt.pageX;
  let cursorY = evt.pageY;
  let button = g_context.button;
  checkTheButton(cursorX, cursorY, button);
}, false);


function checkTheClick(e) {
  let game = g_context.game;
  let cursorX = e.pageX;
  let cursorY = e.pageY;
  if (game.stateOfGame === statesOfGame.IN_PROCESS) {
    checkTheRightClick(game, cursorX, cursorY);
  } else {
    checkTheStartNewGame(cursorX, cursorY);
  }
}
function checkTheRightClick(game, x, y) {
  let fields = g_context.fields;
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  for (let i = 0; i < fieldsSize.AMOUNT; i++) {
    if ((x > fields[i].x + leftShift) &&
        (x < fields[i].x + fieldsSize.WIDTH + leftShift) &&
        (y > fields[i].y + topShift) &&
        (y < fields[i].y + fieldsSize.WIDTH + topShift) &&
        (fields[i].nameOfSymbol === namesOfElements.EMPTY)) {
      g_context.timer = createStateOfTimer();
      if (game.namePlayerWithRightOfMove === rightToMove.FIRST_PLAYER) {
        fields[i].nameOfSymbol = namesOfElements.CROSS;
        searchCombination(game, fields, namesOfElements.CROSS, fieldsSize.ELEMENTS_IN_RAW, fieldsSize.ELEMENTS_IN_COLON,
            fieldsSize.ELEMENTS_FOR_SET, i);
        game.namePlayerWithRightOfMove = rightToMove.SECOND_PLAYER;
      } else {
        fields[i].nameOfSymbol = namesOfElements.NAUGHT;
        searchCombination(game, fields, namesOfElements.NAUGHT, fieldsSize.ELEMENTS_IN_RAW, fieldsSize.ELEMENTS_IN_COLON,
            fieldsSize.ELEMENTS_FOR_SET, i);
        game.namePlayerWithRightOfMove = rightToMove.FIRST_PLAYER;
      }
    }
  }
  return game;
}

function checkTheStartNewGame(cursorX, cursorY) {
  let sizeButton = new ButtonSize();
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  if ((cursorX - leftShift > sizeButton.X) && (cursorX - leftShift < sizeButton.X + sizeButton.WIDTH) &&
      (cursorY - topShift > sizeButton.Y) && (cursorY - topShift < sizeButton.Y + sizeButton.HEIGHT)) {
    g_context.prevTime = new Date();
    g_context.fields = createCoordinatesOfFields();
    g_context.game = new Game(rightToMove.FIRST_PLAYER, statesOfGame.IN_PROCESS);
    g_context.timer = createStateOfTimer();
    gameLoop();
  }
}

function checkTheButton(cursorX, cursorY, button) {
  let sizeButton = new ButtonSize();
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  if ((cursorX - leftShift > sizeButton.X) && (cursorX - leftShift < sizeButton.X + sizeButton.WIDTH) &&
      (cursorY - topShift > sizeButton.Y) && (cursorY - topShift < sizeButton.Y + sizeButton.HEIGHT)) {
    button.stateOfButton = statesOfButton.MOVED;
  } else {
    button.stateOfButton = statesOfButton.UNMOVED;
  }
  return button;
}
window.onresize = function changeShift() {
  g_context.browser = createStateOfWindow();
};
document.getElementById("canvas").onclick = checkTheClick;
document.getElementById("canvas").addEventListener('mousemove', function move(evt) {
  let cursorX = evt.pageX;
  let cursorY = evt.pageY;
  checkTheButton(cursorX, cursorY, g_context.button);
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
  let sizeFields = new FieldSize();
  let fields = g_context.fields;
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  for (let i = 0; i < sizeFields.AMOUNT; i++) {
    if ((x > fields[i].x + leftShift) &&
        (x < fields[i].x + sizeFields.WIDTH + leftShift) &&
        (y > fields[i].y + topShift) &&
        (y < fields[i].y + sizeFields.WIDTH + topShift) &&
        (fields[i].nameOfSymbol === namesOfElements.EMPTY)) {
      g_context.clock = createStateOfClock();
      if (game.namePlayerWithRightOfMove === rightToMove.FIRST_PLAYER) {
        fields[i].nameOfSymbol = namesOfElements.CROSS;
        searchCombination(game, fields, namesOfElements.CROSS, sizeFields.ELEMENTS_IN_RAW, sizeFields.ELEMENTS_IN_COLON,
            sizeFields.ELEMENTS_FOR_SET, i);
        game.namePlayerWithRightOfMove = rightToMove.SECOND_PLAYER;
      } else {
        fields[i].nameOfSymbol = namesOfElements.NAUGHT;
        searchCombination(game, fields, namesOfElements.NAUGHT, sizeFields.ELEMENTS_IN_RAW, sizeFields.ELEMENTS_IN_COLON,
            sizeFields.ELEMENTS_FOR_SET, i);
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
    g_context.fields = createCoordinatesOfFields(100, 100);
    g_context.game = new Game(rightToMove.FIRST_PLAYER, statesOfGame.IN_PROCESS);
    g_context.clock = createStateOfClock();
    gameLoop();
  }
}
function checkTheWinnerByTime(game) {
  if (game.namePlayerWithRightOfMove === rightToMove.FIRST_PLAYER) {
    game.stateOfGame = statesOfGame.THE_VICTORY_OF_SECOND_PLAYER;
  } else {
    game.stateOfGame = statesOfGame.THE_VICTORY_OF_FIRST_PLAYER;
  }
  return game;
}
function checkTheWinnerBySetSymbols(game) {
  let sizeFields = new FieldSize();
  let fields = g_context.fields;
  if (game.winningSet.length === sizeFields.ELEMENTS_FOR_SET) {
    let firstElement = game.winningSet[0];
    if (fields[firstElement].nameOfSymbol === namesOfElements.CROSS) {
      game.stateOfGame = statesOfGame.THE_VICTORY_OF_FIRST_PLAYER;
    }
    if (fields[firstElement].nameOfSymbol === namesOfElements.NAUGHT) {
      game.stateOfGame = statesOfGame.THE_VICTORY_OF_SECOND_PLAYER;
    }
  }
  if ((isTheDraw(namesOfElements.EMPTY, fields)) && (game.stateOfGame === statesOfGame.IN_PROCESS)) {
    game.stateOfGame = statesOfGame.DRAW;
  }
  return game;
}
function isTheDraw(state, fields) {
  for (let i = 0; i < fields.length; i++) {
    if (fields[i].nameOfSymbol === state) {
      return false
    }
  }
  return true;
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
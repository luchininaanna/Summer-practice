function checkTheStateOfGame(sumDeltaTime, game) {
  let dateClock = new ClockData();
  if (sumDeltaTime > dateClock.TIME_FOR_MOVE) {
    if (game.stateOfGame === statesOfGame.IN_PROCESS) {
      g_context.timer = createStateOfTimer();
      checkTheWinnerByTime(game);
    }
  } else {
    checkTheWinnerBySetSymbols(game);
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
      return false;
    }
  }
  return true;
}
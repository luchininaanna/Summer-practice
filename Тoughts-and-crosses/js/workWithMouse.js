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
  let leftShift = g_context.browser.leftShift;
  let topShift = g_context.browser.topShift;
  let namePlayerWithRightOfMove = g_context.game.namePlayerWithRightOfMove;
  for (let i = 0; i < amountOfFields; i++) {
    if ((x > fields[i].x + leftShift) &&
        (x < fields[i].x + shift + leftShift) &&
        (y > fields[i].y + topShift) &&
        (y < fields[i].y + shift + topShift) &&
        (fields[i].nameOfSymbol === EMPTY)) {
      g_context.clock = createStateOfClock();
      if (namePlayerWithRightOfMove === FIRST_PLAYER) {
        fields[i].nameOfSymbol = CROSS;
        g_context.game.winningSet = searchCombination(CROSS, 3, 3, 3, i);
        g_context.game.namePlayerWithRightOfMove = SECOND_PLAYER;
      } else {
        fields[i].nameOfSymbol = NAUGHT;
        g_context.game.winningSet = searchCombination(NAUGHT, 3, 3, 3, i);
        g_context.game.namePlayerWithRightOfMove = FIRST_PLAYER;
      }
    }
  }
}
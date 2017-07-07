function findDirection(event) {
  let players = g_world.players;
  let firstPlayer = players.firstPlayer;
  let secondPlayer = players.secondPlayer;
  checkButtons(firstPlayer, event.keyCode, firstPlayer.movingButtons);
  checkButtons(secondPlayer, event.keyCode, secondPlayer.movingButtons);
}
function checkButtons(checkingPlayer, keyCode, movingButtons) {
  switch (keyCode) {
    case movingButtons.RIGHT:
      checkingPlayer.leftMove = 0;
      checkingPlayer.rightMove = 1;
      console.log("RIGHT");
      break;
    case movingButtons.LEFT:
      checkingPlayer.rightMove = 0;
      checkingPlayer.leftMove = 1;
      console.log("LEFT");
      break;
    case movingButtons.UP:
      checkingPlayer.upMove = 1;
      checkingPlayer.presentValueJumpHeight = 0;
      console.log("UP");
      break;
  }
}
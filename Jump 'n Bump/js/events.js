addEventListener("keydown", findDirection);

function findDirection(event) {
  switch (event.keyCode) {
    case firstPlayerMoveButton["RIGHT"]:
      console.log("RIGHT");
      break;
    case firstPlayerMoveButton["LEFT"]:
      console.log("LEFT");
      break;
    case firstPlayerMoveButton["UP"]:
      console.log("UP");
      break;
    case firstPlayerMoveButton["DOWN"]:
      console.log("DOWN");
      break;
  }
}
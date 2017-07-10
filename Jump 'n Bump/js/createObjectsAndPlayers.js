function createObjects() {
  let backgroundImage = g_context.resources["background"];
  let firstTypeImage = g_context.resources["firstLand"];
  let secondTypeImage = g_context.resources["secondLand"];
  let iceBoxImage = g_context.resources["iceBox"];
  let rocksImage = g_context.resources["rocks"];
  let objects = [];
  objects.push(new Background(backgroundImage, 0, 0));
  let stairsAmount = 37;
  for (let i = 0; i < stairsAmount; i++) {
    objects.push(new SmallStair(firstTypeImage, -10 + 45 * i, 860));
  }
  return objects;
}
function Background(source, x, y) {
  this.source = source;
  this.image_x = 0;
  this.image_y = 0;
  this.image_width = backgroundSize.WIDTH;
  this.image_height = backgroundSize.HEIGHT;
  this.x = x;
  this.y = y;
  this.width = canvasSize.WIDTH;
  this.height = canvasSize.HEIGHT;
}
function SmallStair(source, x, y) {
  this.source = source;
  this.image_x = smallStair.IMAGE_X;
  this.image_y = smallStair.IMAGE_Y;
  this.image_width = smallStair.IMAGE_WIDTH;
  this.image_height = smallStair.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = smallStair.WIDTH;
  this.height = smallStair.HEIGHT;
  this.type = "land";
}
function BigStair(source, x, y) {
  this.source = source;
  this.image_x = bigStair.IMAGE_X;
  this.image_y = bigStair.IMAGE_Y;
  this.image_width = bigStair.IMAGE_WIDTH;
  this.image_height = bigStair.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = bigStair.WIDTH;
  this.height = bigStair.HEIGHT;
  this.type = "land";
}
function FirstTypeGrass(source, x, y) {
  this.source = source;
  this.image_x = firstTypeGrass.IMAGE_X;
  this.image_y = firstTypeGrass.IMAGE_Y;
  this.image_width = firstTypeGrass.IMAGE_WIDTH;
  this.image_height = firstTypeGrass.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = firstTypeGrass.WIDTH;
  this.height = firstTypeGrass.HEIGHT;
  this.type = "land";
}
function SecondTypeGrass(source, x, y) {
  this.source = source;
  this.image_x = secondTypeGrass.IMAGE_X;
  this.image_y = secondTypeGrass.IMAGE_Y;
  this.image_width = secondTypeGrass.IMAGE_WIDTH;
  this.image_height = secondTypeGrass.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = secondTypeGrass.WIDTH;
  this.height = secondTypeGrass.HEIGHT;
  this.type = "land";
}
function ThirdTypeGrass(source, x, y) {
  this.source = source;
  this.image_x = thirdTypeGrass.IMAGE_X;
  this.image_y = thirdTypeGrass.IMAGE_Y;
  this.image_width = thirdTypeGrass.IMAGE_WIDTH;
  this.image_height = thirdTypeGrass.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = thirdTypeGrass.WIDTH;
  this.height = thirdTypeGrass.HEIGHT;
  this.type = "land";
}
function IceBox(source, x, y) {
  this.source = source;
  this.image_x = iceBox.IMAGE_X;
  this.image_y = iceBox.IMAGE_Y;
  this.image_width = iceBox.IMAGE_WIDTH;
  this.image_height = iceBox.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = iceBox.WIDTH;
  this.height = iceBox.HEIGHT;
  this.type = "ice";
}
function Rock(source, x, y) {
  this.source = source;
  this.image_x = rock.IMAGE_X;
  this.image_y = rock.IMAGE_Y;
  this.image_width = rock.IMAGE_WIDTH;
  this.image_height = rock.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = rock.WIDTH;
  this.height = rock.HEIGHT;
  this.type = "land";
}

function createPlayers() {
  let playerImage = g_context.resources["player"];
  let objects = [];

  objects["firstPlayer"] = new Player(playerImage, 600, 785, firstPlayerMoveButton);
  objects["secondPlayer"] = new Player(playerImage, 900, 785, secondPlayerMoveButton);
  return objects;
}
function Player(source, x, y, movingButtons) {
  this.source = source;
  this.image_x = playerInformation.IMAGE_X;
  this.image_y = playerInformation.IMAGE_Y;
  this.image_width = playerInformation.IMAGE_WIDTH;
  this.image_height = playerInformation.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = playerInformation.WIDTH;
  this.height = playerInformation.HEIGHT;
  this.movingButtons = movingButtons;
  this.leftFreeSpace = playerInformation.LEFT_FREE_SPACE;
  this.rightFreeSpace = playerInformation.RIGHT_FREE_SPACE;

  this.horizontalSpeed = playerInformation.HORIZONTAL_SPEED;
  this.verticalSpeed = playerInformation.VERTICAL_SPEED;
  this.accelerationOfGravity = playerInformation.ACCELERATION_OF_GRAVITY;
  this.startY = 0;
  this.startSpeed = 0;
  this.maxHeight = 0;
  this.nowJumpHeight = 0;
  this.jumpTime = 0;
  this.jumpState = playerInformation.DOWN_JUMP;

  this.rightMove = 0;
  this.leftMove = 0;
  this.upMove = 0;
}
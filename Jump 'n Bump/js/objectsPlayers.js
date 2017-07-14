function getObjects() {
  let backgroundImage = g_context.resources[imageNames.BACKGROUND];
  let firstTypeImage = g_context.resources[imageNames.FIRST_LAND];
  let secondTypeImage = g_context.resources[imageNames.SECOND_LAND];
  let iceBoxImage = g_context.resources[imageNames.ICE_BOX];
  let rocksImage = g_context.resources[imageNames.ROCKS];
  let objects = [];
  objects.push(new Background(backgroundImage, 0, 0));
  const stairsAmount = 37;
  const startX = -10;
  const stairWidth = 45;
  const stairY = 860;
  for (let i = 0; i < stairsAmount; i++) {
    objects.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
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

function getPlayers() {
  let playerImage = g_context.resources["player"];
  let players = new Players(playerImage);
  return players
}
function Players(playerImage){
  this.firstPlayer = new Player(playerImage, 600, 785, firstPlayerMoveButton);
  this.secondPlayer = new Player(playerImage, 900, 785, secondPlayerMoveButton);
  this.draw = function (ctx) {
    if (this.firstPlayer.liveState = playerInformation.ALIVE) {
      drawObject(ctx, this.firstPlayer);
    }
    if (this.secondPlayer.liveState = playerInformation.ALIVE) {
      drawObject(ctx, this.secondPlayer);
    }
  }
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
  this.topFreeSpace = playerInformation.TOP_FREE_SPACE;
  this.liveState = playerInformation.ALIVE;

  this.horizontalSpeed = playerInformation.HORIZONTAL_SPEED;
  this.accelerationOfGravity = playerInformation.ACCELERATION_OF_GRAVITY;
  this.verticalSpeed = playerInformation.START_VERTICAL_SPEED;

  this.rightMove = 0;
  this.leftMove = 0;
  this.upMove = 0;
}

function getScoreboards() {
  let scoreboard = g_context.resources[imageNames.SCOREBOARD];
  let objects = [];
  let x = canvasSize.WIDTH - pointScoreboard.WIDTH;

  for (let i = 0; i < MAX_PLAYERS_AMOUNT; i++) {
    createScoreboard(objects, scoreboard, x, i * pointScoreboard.HEIGHT);
  }
  return objects;
}
function createScoreboard(objects, scoreboard, x, y) {
  objects.push(new ScoreboardBackground(scoreboard, x, y));
  return objects;
}
function ScoreboardBackground(source, x, y) {
  this.source = source;
  this.image_x = pointScoreboard.IMAGE_X;
  this.image_y = pointScoreboard.IMAGE_Y;
  this.image_width = pointScoreboard.IMAGE_WIDTH;
  this.image_height = pointScoreboard.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = pointScoreboard.WIDTH;
  this.height = pointScoreboard.HEIGHT;
  this.pointsAmount = 0;
}
function getObjects() {
  let backgroundImage = g_context.resources[imageNames.BACKGROUND];
  let firstTypeImage = g_context.resources[imageNames.FIRST_LAND];
  let secondTypeImage = g_context.resources[imageNames.SECOND_LAND];
  let iceBoxImage = g_context.resources[imageNames.ICE_BOX];
  let rocksImage = g_context.resources[imageNames.ROCKS];
  let objects = [];
  objects.push(new Background(backgroundImage, 0, 0));
  const stairsAmount = 33;
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
  this.imageX = 0;
  this.imageY = 0;
  this.imageWidth = backgroundSize.WIDTH;
  this.imageHeight = backgroundSize.HEIGHT;
  this.x = x;
  this.y = y;
  this.width = canvasSize.WIDTH;
  this.height = canvasSize.HEIGHT;
}
function SmallStair(source, x, y) {
  this.source = source;
  this.imageX = smallStair.IMAGE_X;
  this.imageY = smallStair.IMAGE_Y;
  this.imageWidth = smallStair.IMAGE_WIDTH;
  this.imageHeight = smallStair.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = smallStair.WIDTH;
  this.height = smallStair.HEIGHT;
  this.type = "land";
}
function BigStair(source, x, y) {
  this.source = source;
  this.imageX = bigStair.IMAGE_X;
  this.imageY = bigStair.IMAGE_Y;
  this.imageWidth = bigStair.IMAGE_WIDTH;
  this.imageHeight = bigStair.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = bigStair.WIDTH;
  this.height = bigStair.HEIGHT;
  this.type = "land";
}
function FirstTypeGrass(source, x, y) {
  this.source = source;
  this.imageX = firstTypeGrass.IMAGE_X;
  this.imageY = firstTypeGrass.IMAGE_Y;
  this.imageWidth = firstTypeGrass.IMAGE_WIDTH;
  this.imageHeight = firstTypeGrass.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = firstTypeGrass.WIDTH;
  this.height = firstTypeGrass.HEIGHT;
  this.type = "land";
}
function SecondTypeGrass(source, x, y) {
  this.source = source;
  this.imageX = secondTypeGrass.IMAGE_X;
  this.imageY = secondTypeGrass.IMAGE_Y;
  this.imageWidth = secondTypeGrass.IMAGE_WIDTH;
  this.imageHeight = secondTypeGrass.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = secondTypeGrass.WIDTH;
  this.height = secondTypeGrass.HEIGHT;
  this.type = "land";
}
function ThirdTypeGrass(source, x, y) {
  this.source = source;
  this.imageX = thirdTypeGrass.IMAGE_X;
  this.imageY = thirdTypeGrass.IMAGE_Y;
  this.imageWidth = thirdTypeGrass.IMAGE_WIDTH;
  this.imageHeight = thirdTypeGrass.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = thirdTypeGrass.WIDTH;
  this.height = thirdTypeGrass.HEIGHT;
  this.type = "land";
}
function IceBox(source, x, y) {
  this.source = source;
  this.imageX = iceBox.IMAGE_X;
  this.imageY = iceBox.IMAGE_Y;
  this.imageWidth = iceBox.IMAGE_WIDTH;
  this.imageHeight = iceBox.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = iceBox.WIDTH;
  this.height = iceBox.HEIGHT;
  this.type = "ice";
}
function Rock(source, x, y) {
  this.source = source;
  this.imageX = rock.IMAGE_X;
  this.imageY = rock.IMAGE_Y;
  this.imageWidth = rock.IMAGE_WIDTH;
  this.imageHeight = rock.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = rock.WIDTH;
  this.height = rock.HEIGHT;
  this.type = "land";
}

function getPlayers() {
  let playerImage = g_context.resources[imageNames.PLAYER];
  let players = new Players(playerImage);
  return players;
}
function Players(playerImage) {
  this.getPlayersInState = function (state) {
    let playersInState = {};
    if (this.firstPlayer.liveState === state) {
      playersInState.firstPlayer = this.firstPlayer;
    }
    if (this.secondPlayer.liveState === state) {
      playersInState.secondPlayerr = this.secondPlayer;
    }
    return playersInState;
  };
  this.animatePlayers = function (deltaTime) {
    let unalivePlayers = this.getPlayersInState(playerInformation.UNALIVE);
    let time;
    if (unalivePlayers) {
      for (let key in unalivePlayers) {
        time = unalivePlayers[key].unaliveTime + deltaTime / 1000;
        unalivePlayers[key].unaliveTime = time;
        if (unalivePlayers[key].unaliveTime >= playerInformation.UNALIVE_TIME) {
          unalivePlayers[key].liveState = playerInformation.ALIVE;
          unalivePlayers[key].unaliveTime = 0;
        }
      }
    }
  };
  this.firstPlayer = new Player(playerImage, playerName.FIRST_NAME, 600, 785, firstPlayerMoveButton);
  this.secondPlayer = new Player(playerImage, playerName.SECOND_NAME, 900, 785, secondPlayerMoveButton);
  this.draw = function (ctx) {
    if (this.firstPlayer.liveState === playerInformation.ALIVE) {
      drawObject(ctx, this.firstPlayer);
    }
    if (this.secondPlayer.liveState === playerInformation.ALIVE) {
      drawObject(ctx, this.secondPlayer);
    }
  }
}
function Player(source, playerName, x, y, movingButtons) {
  this.name = playerName;

  this.source = source;
  this.imageX = playerInformation.IMAGE_X;
  this.imageY = playerInformation.IMAGE_Y;
  this.imageWidth = playerInformation.IMAGE_WIDTH;
  this.imageHeight = playerInformation.IMAGE_HEIGHT;
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
  this.verticalSpeed = playerInformation.START_BIG_VERTICAL_SPEED;

  this.rightMove = 0;
  this.leftMove = 0;
  this.upMove = 0;

  this.unaliveTime = 0;
}

function getScoreboards() {
  let scoreboardImage = g_context.resources[imageNames.SCOREBOARD];
  let x = canvasSize.WIDTH - pointScoreboard.WIDTH;
  let scoreboards = new Scoreboards(scoreboardImage, x);
  return scoreboards;
}
function Scoreboards(scoreboardImage, x) {
  this.firstScoreboard = new Scoreboard(scoreboardImage, playerName.FIRST_NAME, x, 0);
  this.secondScoreboard = new Scoreboard(scoreboardImage, playerName.SECOND_NAME, x,
      this.firstScoreboard.y + pointScoreboard.HEIGHT);
  this.thirdScoreboard = new Scoreboard(scoreboardImage, playerName.THIRD_NAME, x,
      this.secondScoreboard.y + pointScoreboard.HEIGHT);
  this.fourthScoreboard = new Scoreboard(scoreboardImage, playerName.FOURTH_NAME, x,
      this.thirdScoreboard.y + pointScoreboard.HEIGHT);
  this.draw = function (ctx) {
    drawObject(ctx, this.firstScoreboard);
    drawObject(ctx, this.secondScoreboard);
    drawObject(ctx, this.thirdScoreboard);
    drawObject(ctx, this.fourthScoreboard);
    this.drawPoints(ctx);
  };
  this.drawPoints = function (ctx) {
    this.drawPoint(ctx, this.firstScoreboard);
    this.drawPoint(ctx, this.secondScoreboard);
    this.drawPoint(ctx, this.thirdScoreboard);
    this.drawPoint(ctx, this.fourthScoreboard);
  };
  this.drawPoint = function (ctx, scoreboard) {
    let tens = Math.floor(scoreboard.pointsAmount / 10);
    let digitImage = this.chooseDigitImage(tens);
    ctx.drawImage(scoreboard.source, digitImage.IMAGE_X, digitImage.IMAGE_Y,
        digitImage.IMAGE_WIDTH, digitImage.IMAGE_HEIGHT,
        x + pointScoreboard.X_FIRST_POINT_SHIFT, scoreboard.y + pointScoreboard.Y_POINT_SHIFT,
        pointScoreboard.POINT_WIDTH, pointScoreboard.POINT_HEIGHT);

    let ones = scoreboard.pointsAmount - tens * 10;
    digitImage = this.chooseDigitImage(ones);

    ctx.drawImage(scoreboard.source, digitImage.IMAGE_X, digitImage.IMAGE_Y,
        digitImage.IMAGE_WIDTH, digitImage.IMAGE_HEIGHT,
        x + pointScoreboard.X_SECOND_POINT_SHIFT, scoreboard.y + pointScoreboard.Y_POINT_SHIFT,
        pointScoreboard.POINT_WIDTH, pointScoreboard.POINT_HEIGHT);
  };
  this.chooseDigitImage = function (digit) {
    switch (digit) {
      case points.ZERO.VALUE:
        return points.ZERO;
      case points.ONE.VALUE:
        return points.ONE;
      case points.TWO.VALUE:
        return points.TWO;
      case points.THREE.VALUE:
        return points.THREE;
      case points.FOUR.VALUE:
        return points.FOUR;
      case points.FIVE.VALUE:
        return points.FIVE;
      case points.SIX.VALUE:
        return points.SIX;
      case points.SEVEN.VALUE:
        return points.SEVEN;
      case points.EIGHT.VALUE:
        return points.EIGHT;
      case points.NINE.VALUE:
        return points.NINE;
    }
  }
}
function Scoreboard(source, playerName, x, y) {
  this.name = playerName;
  this.source = source;
  this.imageX = pointScoreboard.IMAGE_X;
  this.imageY = pointScoreboard.IMAGE_Y;
  this.imageWidth = pointScoreboard.IMAGE_WIDTH;
  this.imageHeight = pointScoreboard.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = pointScoreboard.WIDTH;
  this.height = pointScoreboard.HEIGHT;
  this.pointsAmount = 0;
}
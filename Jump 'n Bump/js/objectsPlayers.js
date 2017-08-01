function getObjects() {
  let backgroundImage = g_context.resources[imageNames.BACKGROUND];
  let objects = [];
  objects.push(new Background(backgroundImage, 0, 0));
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

function getStairs() {
  let firstTypeImage = g_context.resources[imageNames.FIRST_LAND];
  let secondTypeImage = g_context.resources[imageNames.SECOND_LAND];
  let iceBoxImage = g_context.resources[imageNames.ICE_BOX];
  let rocksImage = g_context.resources[imageNames.ROCKS];
  let stairs = [];

  let stairsAmount = 20;
  let startX = 600;
  let stairWidth = 45;
  let stairY = 150;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  stairsAmount = 3;
  startX = 450;
  stairWidth = 45;
  stairY = 200;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  stairsAmount = 3;
  startX = 300;
  stairWidth = 45;
  stairY = 300;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  stairsAmount = 7;
  startX = 100;
  stairWidth = 45;
  stairY = 430;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  stairsAmount = 8;
  startX = 550;
  stairWidth = 45;
  stairY = 550;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  stairsAmount = 3;
  startX = 1300;
  stairWidth = 45;
  stairY = 600;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  stairsAmount = 5;
  startX = 1000;
  stairWidth = 45;
  stairY = 700;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  stairsAmount = 33;
  startX = -10;
  stairWidth = 45;
  stairY = 860;
  for (let i = 0; i < stairsAmount; i++) {
    stairs.push(new SmallStair(firstTypeImage, startX + stairWidth * i, stairY));
  }
  return stairs;
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

  this.getX = function() {
    return this.x
  };
  this.getY = function() {
    return this.y
  };
  this.getWidth = function() {
    return this.width
  };
  this.getHeight = function() {
    return this.height
  };

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
  let players = new Players();
  if (PLAYERS_AMOUNT >= 1) {
    players.firstPlayer.chooseRandomPlace();
  }
  if (PLAYERS_AMOUNT >= 2) {
    players.secondPlayer.chooseRandomPlace();
    while ((players.firstPlayer.x === players.secondPlayer.x) && (players.firstPlayer.y === players.secondPlayer.y)) {
      players.secondPlayer.chooseRandomPlace();
    }
  }
  if (PLAYERS_AMOUNT >= 3) {
    players.thirdPlayer.chooseRandomPlace();
    while (((players.firstPlayer.x === players.thirdPlayer.x) && (players.firstPlayer.y === players.thirdPlayer.y))
    || ((players.secondPlayer.x === players.thirdPlayer.x) && (players.secondPlayer.y === players.thirdPlayer.y))) {
      players.thirdPlayer.chooseRandomPlace();
    }
  }
  return players;
}
function Players() {
  let rightFirstPlayerImage = g_context.resources[imageNames.RIGHT_FIRST_PLAYER];
  let rightSecondPlayerImage = g_context.resources[imageNames.RIGHT_SECOND_PLAYER];
  let rightThirdPlayerImage = g_context.resources[imageNames.RIGHT_THIRD_PLAYER];
  let leftFirstPlayerImage = g_context.resources[imageNames.LEFT_FIRST_PLAYER];
  let leftSecondPlayerImage = g_context.resources[imageNames.LEFT_SECOND_PLAYER];
  let leftThirdPlayerImage = g_context.resources[imageNames.LEFT_THIRD_PLAYER];
  if (PLAYERS_AMOUNT >= 1) {
    this.firstPlayer = new Player(rightFirstPlayerImage, leftFirstPlayerImage, playerName.FIRST_NAME, 0, 0, firstPlayerMoveButton);
  }
  if (PLAYERS_AMOUNT >= 2) {
    this.secondPlayer = new Player(rightSecondPlayerImage, leftSecondPlayerImage, playerName.SECOND_NAME, 0, 0, secondPlayerMoveButton);
  }
  if (PLAYERS_AMOUNT >= 3) {
    this.thirdPlayer = new Player(rightThirdPlayerImage, leftThirdPlayerImage, playerName.THIRD_NAME, 0, 0, thirdPlayerMoveButton);
  }
}
function Player(sourceRightMoving, sourceLeftMoving, playerName, x, y, movingButtons) {
  this.name = playerName;

  this.rightMovingImage = sourceRightMoving;
  this.leftMovingImage = sourceLeftMoving;
  this.source = sourceRightMoving;
  this.imageX = playerInformation.IMAGE_X;
  this.imageY = playerInformation.IMAGE_Y;
  this.imageWidth = playerInformation.IMAGE_WIDTH;
  this.imageHeight = playerInformation.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.updatedX = x;
  this.updatedY = y;
  this.width = playerInformation.WIDTH;
  this.height = playerInformation.HEIGHT;

  this.movingButtons = movingButtons;

  this.leftFreeSpace = playerInformation.LEFT_FREE_SPACE;
  this.rightFreeSpace = playerInformation.RIGHT_FREE_SPACE;
  this.topFreeSpace = playerInformation.TOP_FREE_SPACE;
  this.distanceToLand = 0;
  this.nextLand = 0;

  this.liveState = playerInformation.ALIVE;
  this.unaliveTime = 0;
  this.animationTime = 0;

  this.horizontalSpeed = playerInformation.HORIZONTAL_SPEED;
  this.accelerationOfGravity = playerInformation.ACCELERATION_OF_GRAVITY;
  this.verticalSpeed = playerInformation.START_BIG_VERTICAL_SPEED;
  this.speedCoefficient = speedCoefficients.RIGHT_MOVING;

  this.rightMove = 0;
  this.leftMove = 0;
  this.upMove = 0;

  this.getX = function() {
    return this.x
  };
  this.getY = function() {
    return this.y
  };
  this.getWidth = function() {
    return this.width
  };
  this.getHeight = function() {
    return this.height
  };

  this.draw = function(ctx) {
    ctx.drawImage(this.source, this.imageX, this.imageY, this.imageWidth, this.imageHeight,
        this.x, this.y, this.width,this.height);
  };

  this.updateImage = function(deltaTime) {
    if ((this.rightMove === 1) && (this.source === this.leftMovingImage)) {
      this.source = this.rightMovingImage;
    }
    if ((this.leftMove === 1) && (this.source === this.rightMovingImage)) {
      this.source = this.leftMovingImage;
    }
    if (this.animationTime >= playerInformation.ANIMATION_TIME) {
      this.changeImage();
      this.animationTime = 0;
    } else {
      let sumDeltaTime = this.animationTime + deltaTime / 1000;
      this.animationTime = sumDeltaTime;
    }
  };
  this.changeImage = function() {
    switch (this.imageX) {
      case playerImage.FIRST_X:
        this.imageX = playerImage.SECOND_X;
        break;
      case playerImage.SECOND_X:
        this.imageX = playerImage.THIRD_X;
        break;
      case playerImage.THIRD_X:
        this.imageX = playerImage.FOURTH_X;
        break;
      case playerImage.FOURTH_X:
        this.imageX = playerImage.FIFTH_X;
        break;
      case playerImage.FIFTH_X:
        this.imageX = playerImage.SIXTH_X;
        break;
      case playerImage.SIXTH_X:
        this.imageX = playerImage.SEVENTH_X;
        break;
      case playerImage.SEVENTH_X:
        this.imageX = playerImage.EIGHTS_X;
        break;
      case playerImage.EIGHTS_X:
        this.imageX = playerImage.NINTH_X;
        break;
      case playerImage.NINTH_X:
        this.imageX = playerImage.TENTH_X;
        break;
      case playerImage.TENTH_X:
        this.imageX = playerImage.FIRST_X;
        break;
    }
  };
  this.chooseRandomPlace = function () {
    const MIN = 1;
    const MAX = 5;
    let placeVariant = this.chooseRandomDigit(MIN, MAX);
    switch (placeVariant) {
      case randomPlaces.FIRST:
        this.x = randomPlaces.FIRST_PLACE_X;
        this.y = randomPlaces.FIRST_PLACE_Y;
        break;
      case randomPlaces.SECOND:
        this.x = randomPlaces.SECOND_PLACE_X;
        this.y = randomPlaces.SECOND_PLACE_Y;
        break;
      case randomPlaces.THIRD:
        this.x = randomPlaces.THIRD_PLACE_X;
        this.y = randomPlaces.THIRD_PLACE_Y;
        break;
      case randomPlaces.FOURTH:
        this.x = randomPlaces.FOURTH_PLACE_X;
        this.y = randomPlaces.FOURTH_PLACE_Y;
        break;
      case randomPlaces.FIFTH:
        this.x = randomPlaces.FIFTH_PLACE_X;
        this.y = randomPlaces.FIFTH_PLACE_Y;
        break;
    }
  };
  this.chooseRandomDigit = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  this.animate = function (deltaTime) {
    let time = this.unaliveTime + deltaTime / 1000;
    this.unaliveTime = time;
    if (this.unaliveTime >= playerInformation.UNALIVE_TIME) {
      this.liveState = playerInformation.ALIVE;
      this.unaliveTime = 0;
      this.chooseRandomPlace();
    }
  };
}

function getScoreboards() {
  let scoreboardImage = g_context.resources[imageNames.SCOREBOARD];
  let x = canvasSize.WIDTH - pointScoreboard.WIDTH;
  let scoreboards = new Scoreboards(scoreboardImage, x);
  return scoreboards;
}
function Scoreboards(scoreboardImage, x) {
  let firstPlayerImage = g_context.resources[imageNames.RIGHT_FIRST_PLAYER];
  let secondPlayerImage = g_context.resources[imageNames.RIGHT_SECOND_PLAYER];
  let thirdPlayerImage = g_context.resources[imageNames.RIGHT_THIRD_PLAYER];
  let fourthPlayerImage = g_context.resources[imageNames.RIGHT_FOURTH_PLAYER];
  this.firstScoreboard = new Scoreboard(scoreboardImage, firstPlayerImage, playerName.FIRST_NAME, x, 0);
  this.secondScoreboard = new Scoreboard(scoreboardImage, secondPlayerImage, playerName.SECOND_NAME, x,
      this.firstScoreboard.y + pointScoreboard.HEIGHT);
  this.thirdScoreboard = new Scoreboard(scoreboardImage, thirdPlayerImage, playerName.THIRD_NAME, x,
      this.secondScoreboard.y + pointScoreboard.HEIGHT);
  this.fourthScoreboard = new Scoreboard(scoreboardImage, fourthPlayerImage, playerName.FOURTH_NAME, x,
      this.thirdScoreboard.y + pointScoreboard.HEIGHT);
  if (PLAYERS_AMOUNT >= 1) {
    this.firstScoreboard.scoreboardState = states.ACTIVE;
  }
  if (PLAYERS_AMOUNT >= 2) {
    this.secondScoreboard.scoreboardState = states.ACTIVE;
  }
  if (PLAYERS_AMOUNT >= 3) {
    this.thirdScoreboard.scoreboardState = states.ACTIVE;
  }
  if (PLAYERS_AMOUNT === 4) {
    this.fourthScoreboard.scoreboardState = states.ACTIVE;
  }
}
function Scoreboard(sourceScoreboard, sourcePlayer, playerName, x, y) {
  this.name = playerName;
  this.sourceScoreboard = sourceScoreboard;
  this.sourcePlayer = sourcePlayer;
  this.imageX = pointScoreboard.IMAGE_X;
  this.imageY = pointScoreboard.IMAGE_Y;
  this.imageWidth = pointScoreboard.IMAGE_WIDTH;
  this.imageHeight = pointScoreboard.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = pointScoreboard.WIDTH;
  this.height = pointScoreboard.HEIGHT;
  this.pointsAmount = 0;
  this.scoreboardState = states.INACTIVE;

  this.draw = function(ctx) {
    ctx.drawImage(this.sourceScoreboard, this.imageX, this.imageY, this.imageWidth,
        this.imageHeight, this.x, this.y, this.width, this.height);
    if (this.scoreboardState === states.ACTIVE) {
      ctx.drawImage(this.sourcePlayer, playerInformation.IMAGE_X, playerInformation.IMAGE_Y,
          playerInformation.IMAGE_WIDTH, playerInformation.IMAGE_HEIGHT,
          this.x + pointScoreboard.X_PLAYER_SHIFT, this.y + pointScoreboard.Y_PLAYER_SHIFT,
          playerInformation.WIDTH, playerInformation.HEIGHT);
      ctx.fillStyle = colors.LIGHT_BLUE;
      ctx.font = "bold 30pt Arial";
      ctx.fillText("" + this.name, this.x + pointScoreboard.X_PLAYER_NAME_SHIFT,
          this.y + pointScoreboard.Y_PLAYER_NAME_SHIFT);
    }
  };
  this.drawPoint = function (ctx) {
    let tens = Math.floor(this.pointsAmount / 10);
    let digitImage = this.chooseDigitImage(tens);
    ctx.drawImage(this.sourceScoreboard, digitImage.IMAGE_X, digitImage.IMAGE_Y,
        digitImage.IMAGE_WIDTH, digitImage.IMAGE_HEIGHT,
        x + pointScoreboard.X_FIRST_POINT_SHIFT, this.y + pointScoreboard.Y_POINT_SHIFT,
        pointScoreboard.POINT_WIDTH, pointScoreboard.POINT_HEIGHT);

    let ones = this.pointsAmount - tens * 10;
    digitImage = this.chooseDigitImage(ones);

    ctx.drawImage(this.sourceScoreboard, digitImage.IMAGE_X, digitImage.IMAGE_Y,
        digitImage.IMAGE_WIDTH, digitImage.IMAGE_HEIGHT,
        x + pointScoreboard.X_SECOND_POINT_SHIFT, this.y + pointScoreboard.Y_POINT_SHIFT,
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
  };
  this.prompt = {
    state: states.INACTIVE,
    timeInterval: 0
  }
}
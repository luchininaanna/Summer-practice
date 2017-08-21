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

function getWorldElements() {
  let firstTypeImage = g_context.resources[imageNames.FIRST_LAND];
  let secondTypeImage = g_context.resources[imageNames.SECOND_LAND];
  let iceBoxImage = g_context.resources[imageNames.ICE_BOX];
  let rocksImage = g_context.resources[imageNames.ROCKS];
  let worldElements = [];

  let elementAmount;
  let startX;
  let elementWidth;
  let stairY;
  let shiftX;
  let shiftY;

  elementAmount = 19;
  startX = -10;
  stairY = -10;
  shiftY = 20;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new Rock(rocksImage, startX, stairY + shiftY * i));
  }

  elementAmount = 18;
  startX = -10;
  stairY = 400;
  shiftY = 20;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new Rock(rocksImage, startX, stairY + shiftY * i));
  }

  worldElements.push(new SmallGround(firstTypeImage, 1420, 415));

  elementAmount = 37;
  startX = 1450;
  stairY = 150;
  shiftY = 20;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new Rock(rocksImage, startX, stairY + shiftY * i));
  }

  elementAmount = 13;
  startX = -35;
  elementWidth = 45;
  stairY = 880;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new SmallGround(secondTypeImage, startX + elementWidth * i, stairY));
  }



  elementAmount = 4;
  startX = 1185;
  stairY = 830;
  shiftX = 40;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new IceBox(iceBoxImage, startX + i * shiftX, stairY));
  }

  worldElements.push(new BigGround(firstTypeImage, 1345, 780));
  worldElements.push(new BigGround(firstTypeImage, 1395, 760));
  worldElements.push(new BigGround(firstTypeImage, 1370, 800));

  worldElements.push(new Rock(rocksImage, 1325, 860));
  worldElements.push(new Rock(rocksImage, 1355, 855));
  worldElements.push(new Rock(rocksImage, 1375, 855));
  worldElements.push(new Rock(rocksImage, 1405, 855));
  worldElements.push(new Rock(rocksImage, 1385, 835));
  worldElements.push(new Rock(rocksImage, 1445, 855));
  worldElements.push(new Rock(rocksImage, 1425, 825));
  worldElements.push(new Rock(rocksImage, 1445, 800));
  worldElements.push(new Rock(rocksImage, 1410, 800));
  worldElements.push(new Rock(rocksImage, 1435, 765));

  worldElements.push(new BigGround(firstTypeImage, 1135, 830));

  elementAmount = 12;
  startX = 595;
  stairY = 860;
  shiftX = 45;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new SmallGround(firstTypeImage, startX + shiftX * i, stairY));
  }

  worldElements.push(new Rock(rocksImage, 1000, 870));
  worldElements.push(new Rock(rocksImage, 1060, 880));
  worldElements.push(new Rock(rocksImage, 1030, 875));

  worldElements.push(new BigGround(secondTypeImage, 550, 800));
  worldElements.push(new BigGround(secondTypeImage, 550, 760));

  worldElements.push(new SmallGround(secondTypeImage, -10, 720));
  worldElements.push(new SmallGround(secondTypeImage, 20, 740));
  worldElements.push(new SmallGround(secondTypeImage, 65, 740));

  worldElements.push(new SmallGround(secondTypeImage, 10, 400));

  elementAmount = 4;
  startX = 50;
  stairY = 410;
  shiftX = 25;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new SmallGround(secondTypeImage, startX + shiftX * i, stairY));
  }

  worldElements.push(new SmallGround(secondTypeImage, 25, 430));
  worldElements.push(new SmallGround(secondTypeImage, 90, 425));
  worldElements.push(new SmallGround(secondTypeImage, 60, 445));
  worldElements.push(new SmallGround(secondTypeImage, 120, 445));
  worldElements.push(new SmallGround(secondTypeImage, 100, 455));

  worldElements.push(new Rock(rocksImage, 250, 590));
  worldElements.push(new Rock(rocksImage, 280, 610));

  worldElements.push(new SmallGround(secondTypeImage, 300, 610));
  worldElements.push(new SmallGround(secondTypeImage, 340, 610));
  worldElements.push(new SmallGround(secondTypeImage, 380, 610));

  worldElements.push(new SmallGround(secondTypeImage, 175, 600));
  worldElements.push(new SmallGround(secondTypeImage, 145, 600));
  worldElements.push(new SmallGround(secondTypeImage, 215, 600));

  elementAmount = 3;
  startX = 30;
  stairY = -10;
  shiftY = 7;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new Rock(rocksImage, startX, stairY + shiftY * i));
  }

  elementAmount = 2;
  startX = 70;
  stairY = -20;
  shiftY = 7;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new Rock(rocksImage, startX, stairY + shiftY * i));
  }

  worldElements.push(new Rock(rocksImage, 60, 10));

  worldElements.push(new BigGround(firstTypeImage, 930, 510));
  worldElements.push(new BigGround(firstTypeImage, 961, 570));
  worldElements.push(new BigGround(firstTypeImage, 1010, 570));

  worldElements.push(new Rock(rocksImage, 855, 640));
  worldElements.push(new Rock(rocksImage, 935, 640));
  worldElements.push(new Rock(rocksImage, 950, 600));
  worldElements.push(new Rock(rocksImage, 960, 630));
  worldElements.push(new Rock(rocksImage, 990, 610));
  worldElements.push(new Rock(rocksImage, 920, 600));
  worldElements.push(new Rock(rocksImage, 900, 630));
  worldElements.push(new Rock(rocksImage, 950, 610));
  worldElements.push(new Rock(rocksImage, 885, 575));
  worldElements.push(new Rock(rocksImage, 860, 600));
  worldElements.push(new Rock(rocksImage, 890, 610));
  worldElements.push(new Rock(rocksImage, 910, 560));
  worldElements.push(new Rock(rocksImage, 810, 635));
  worldElements.push(new Rock(rocksImage, 780, 640));
  worldElements.push(new Rock(rocksImage, 830, 600));
  worldElements.push(new Rock(rocksImage, 755, 640));

  worldElements.push(new IceBox(iceBoxImage, 890, 535));
  worldElements.push(new IceBox(iceBoxImage, 870, 570));
  worldElements.push(new IceBox(iceBoxImage, 830, 570));
  worldElements.push(new IceBox(iceBoxImage, 805, 605));
  worldElements.push(new IceBox(iceBoxImage, 765, 605));

  elementAmount = 2;
  startX = 1070;
  stairY = 620;
  shiftX = 70;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new SmallGround(firstTypeImage, startX + shiftX * i, stairY));
  }

  elementAmount = 3;
  startX = 1030;
  stairY = 630;
  shiftX = 70;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new SmallGround(firstTypeImage, startX + shiftX * i, stairY));
  }

  elementAmount = 2;
  startX = 990;
  stairY = 640;
  shiftX = 150;
  for (let i = 0; i < elementAmount; i++) {
    worldElements.push(new SmallGround(firstTypeImage, startX + shiftX * i, stairY));
  }

  worldElements.push(new SmallGround(firstTypeImage, 1420, 450));
  worldElements.push(new SmallGround(firstTypeImage, 1380, 440));

  worldElements.push(new Rock(rocksImage, 500, 480));
  worldElements.push(new Rock(rocksImage, 530, 490));
  worldElements.push(new Rock(rocksImage, 560, 480));

  worldElements.push(new SmallGround(firstTypeImage, 600, 480));

  worldElements.push(new SmallGround(firstTypeImage, 1125, 310));
  worldElements.push(new SmallGround(firstTypeImage, 1175, 310));
  worldElements.push(new SmallGround(firstTypeImage, 1155, 320));
  worldElements.push(new SmallGround(firstTypeImage, 1200, 320));
  worldElements.push(new SmallGround(firstTypeImage, 1100, 330));
  worldElements.push(new SmallGround(firstTypeImage, 1130, 340));
  worldElements.push(new SmallGround(firstTypeImage, 1190, 340));
  worldElements.push(new SmallGround(firstTypeImage, 1160, 350));

  worldElements.push(new Rock(rocksImage, 1415, 190));
  worldElements.push(new Rock(rocksImage, 1430, 170));
  worldElements.push(new Rock(rocksImage, 1400, 170));

  worldElements.push(new BigGround(firstTypeImage, 770, 70));
  worldElements.push(new BigGround(firstTypeImage, 810, 110));
  worldElements.push(new BigGround(firstTypeImage, 730, 140));

  worldElements.push(new SmallGround(firstTypeImage, 690, 196));
  worldElements.push(new SmallGround(firstTypeImage, 690, 183));
  worldElements.push(new SmallGround(firstTypeImage, 690, 170));

  worldElements.push(new SmallGround(firstTypeImage, 650, 230));

  worldElements.push(new Rock(rocksImage, 670, 250));
  worldElements.push(new Rock(rocksImage, 640, 260));
  worldElements.push(new Rock(rocksImage, 610, 240));
  worldElements.push(new Rock(rocksImage, 580, 250));
  worldElements.push(new Rock(rocksImage, 550, 240));
  worldElements.push(new Rock(rocksImage, 520, 240));

  worldElements.push(new Rock(rocksImage, 495, 260));
  worldElements.push(new Rock(rocksImage, 450, 260));
  worldElements.push(new Rock(rocksImage, 475, 280));
  worldElements.push(new Rock(rocksImage, 540, 270));

  worldElements.push(new IceBox(iceBoxImage, 495, 240));
  worldElements.push(new IceBox(iceBoxImage, 455, 240));

  worldElements.push(new Rock(rocksImage, 690, 240));
  worldElements.push(new Rock(rocksImage, 730, 200));
  worldElements.push(new Rock(rocksImage, 710, 220));

  worldElements.push(new SmallGround(firstTypeImage, 850, 110));
  worldElements.push(new Rock(rocksImage, 840, 145));
  worldElements.push(new Rock(rocksImage, 810, 150));
  worldElements.push(new SmallGround(firstTypeImage, 880, 130));
  worldElements.push(new SmallGround(firstTypeImage, 850, 150));

  worldElements.push(new SmallGround(firstTypeImage, 890, 150));
  worldElements.push(new SmallGround(firstTypeImage, 930, 150));
  worldElements.push(new SmallGround(firstTypeImage, 970, 150));

  worldElements.push(new Rock(rocksImage, 770, 205));
  worldElements.push(new Rock(rocksImage, 770, 200));
  worldElements.push(new Rock(rocksImage, 770, 195));
  worldElements.push(new Rock(rocksImage, 770, 190));
  worldElements.push(new Rock(rocksImage, 770, 185));
  worldElements.push(new Rock(rocksImage, 770, 180));
  worldElements.push(new Rock(rocksImage, 770, 175));
  worldElements.push(new Rock(rocksImage, 770, 170));
  worldElements.push(new Rock(rocksImage, 770, 165));

  worldElements.push(new Rock(rocksImage, 800, 180));
  worldElements.push(new Rock(rocksImage, 840, 170));

  worldElements.push(new Rock(rocksImage, 740, 220));
  worldElements.push(new Rock(rocksImage, 710, 250));

  worldElements.push(new SmallGround(secondTypeImage, 270, 110));
  worldElements.push(new SmallGround(secondTypeImage, 330, 110));
  worldElements.push(new SmallGround(secondTypeImage, 240, 120));
  worldElements.push(new SmallGround(secondTypeImage, 300, 120));
  worldElements.push(new SmallGround(secondTypeImage, 270, 130));

  worldElements.push(new Rock(rocksImage, 1160, 90));
  worldElements.push(new Rock(rocksImage, 1190, 90));
  worldElements.push(new Rock(rocksImage, 1190, 110));
  worldElements.push(new Rock(rocksImage, 1220, 90));

  //worldElements.push(new Rock(rocksImage, 20, 250));
  //worldElements.push(new Rock(rocksImage, 20, 230));
  //worldElements.push(new SmallGround(firstTypeImage, 50, 230));
  //worldElements.push(new SmallGround(firstTypeImage, 90, 230));

  return worldElements;
}
function getBackgroundElements() {
  let firstTypeImage = g_context.resources[imageNames.FIRST_LAND];
  let secondTypeImage = g_context.resources[imageNames.SECOND_LAND];
  let iceBoxImage = g_context.resources[imageNames.ICE_BOX];
  let rocksImage = g_context.resources[imageNames.ROCKS];
  let backgroundElements = [];

  let elementAmount;
  let startX;
  let elementWidth;
  let stairY;
  let shiftX;
  let shiftY;

  elementAmount = 6;
  startX = 1155;
  stairY = 870;
  shiftX = 30;
  for (let i = 0; i < elementAmount; i++) {
    backgroundElements.push(new Rock(rocksImage, startX + i * shiftX, stairY));
  }

  backgroundElements.push(new Rock(rocksImage, 1325, 845));

  backgroundElements.push(new Rock(rocksImage, 260, 620));

  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, -10, 750));
  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, 20, 770));
  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, 65, 770));

  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, 145, 620));
  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, 215, 620));

  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1345, 760));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1345, 775));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1395, 740));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1395, 755));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1370, 780));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1370, 795));

  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 930, 490));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 930, 505));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 960, 550));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 960, 565));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 980, 560));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1010, 550));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1010, 565));

  backgroundElements.push(new FirstTypeGrass(secondTypeImage, 550, 740));
  backgroundElements.push(new FirstTypeGrass(secondTypeImage, 550, 755));

  elementAmount = 14;
  startX = -15;
  stairY = 865;
  shiftX = 40;
  for (let i = 0; i < elementAmount; i++) {
    backgroundElements.push(new SecondTypeGrass(secondTypeImage, startX + shiftX * i, stairY));
  }

  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 500, 470));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 530, 470));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 530, 480));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 560, 470));

  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, 300, 630));
  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, 340, 630));
  backgroundElements.push(new ThirdTypeGrass(secondTypeImage, 380, 630));

  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1125, 300));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1125, 310));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1175, 310));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1155, 320));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1200, 320));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1100, 330));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1130, 340));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1190, 340));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 1160, 350));

  //backgroundElements.push(new ThirdTypeGrass(firstTypeImage, 50, 250));
  //backgroundElements.push(new ThirdTypeGrass(firstTypeImage, 90, 250));

  backgroundElements.push(new FirstTypeGrass(firstTypeImage,770, 55));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage,770, 70));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 810, 95));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 810, 110));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 730, 125));
  backgroundElements.push(new FirstTypeGrass(firstTypeImage, 730, 140));

  return backgroundElements;
}

function SmallGround(source, x, y) {
  this.source = source;
  this.imageX = smallGround.IMAGE_X;
  this.imageY = smallGround.IMAGE_Y;
  this.imageWidth = smallGround.IMAGE_WIDTH;
  this.imageHeight = smallGround.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = smallGround.WIDTH;
  this.height = smallGround.HEIGHT;
  this.topFreeSpace = bottomType.TOP_FREE_SPACE;
  this.leftFreeSpace = bottomType.LEFT_FREE_SPACE;
  this.rightFreeSpace = bottomType.RIGHT_FREE_SPACE;
  this.type = bottomType.LAND;
  this.getBox = function() {
    let landBox = {};
    landBox.firstX = this.x + this.leftFreeSpace;
    landBox.secondX = this.x + this.width - this.rightFreeSpace;
    landBox.y = this.y + this.topFreeSpace;
    return landBox;
  };
}
function BigGround(source, x, y) {
  this.source = source;
  this.imageX = bigGround.IMAGE_X;
  this.imageY = bigGround.IMAGE_Y;
  this.imageWidth = bigGround.IMAGE_WIDTH;
  this.imageHeight = bigGround.IMAGE_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = bigGround.WIDTH;
  this.height = bigGround.HEIGHT;
  this.topFreeSpace = bottomType.TOP_FREE_SPACE;
  this.leftFreeSpace = bottomType.LEFT_FREE_SPACE;
  this.rightFreeSpace = bottomType.RIGHT_FREE_SPACE;
  this.type = bottomType.LAND;
  this.getBox = function() {
    let landBox = {};
    landBox.firstX = this.x + this.leftFreeSpace;
    landBox.secondX = this.x + this.width - this.rightFreeSpace;
    landBox.y = this.y + this.topFreeSpace;
    return landBox;
  };
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
  this.type = bottomType.LAND;
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
  this.type = bottomType.LAND;
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
  this.type = bottomType.LAND;
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
  this.topFreeSpace = bottomType.TOP_FREE_SPACE;
  this.leftFreeSpace = bottomType.LEFT_FREE_SPACE;
  this.rightFreeSpace = bottomType.RIGHT_FREE_SPACE;
  this.type = bottomType.ICE;
  this.getBox = function() {
    let iceBox = {};
    iceBox.firstX = this.x + this.leftFreeSpace;
    iceBox.secondX = this.x + this.width - this.rightFreeSpace;
    iceBox.y = this.y + this.topFreeSpace;
    return iceBox;
  };
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
  this.topFreeSpace = bottomType.TOP_FREE_SPACE;
  this.leftFreeSpace = bottomType.LEFT_FREE_SPACE;
  this.rightFreeSpace = bottomType.RIGHT_FREE_SPACE;
  this.type = bottomType.ROCK;
  this.getBox = function() {
    let rockBox = {};
    rockBox.firstX = this.x + this.leftFreeSpace;
    rockBox.secondX = this.x + this.width - this.rightFreeSpace;
    rockBox.y = this.y + this.topFreeSpace;
    return rockBox;
  };
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
  if (PLAYERS_AMOUNT >= 4) {
    players.fourthPlayer.chooseRandomPlace();
    while (((players.firstPlayer.x === players.fourthPlayer.x) && (players.firstPlayer.y === players.fourthPlayer.y))
    || ((players.secondPlayer.x === players.fourthPlayer.x) && (players.secondPlayer.y === players.fourthPlayer.y))
    || ((players.thirdPlayer.x === players.fourthPlayer.x) && (players.thirdPlayer.y === players.fourthPlayer.y))) {
      players.fourthPlayer.chooseRandomPlace();
    }
  }
  return players;
}
function Players() {
  let rightFirstPlayerImage = g_context.resources[imageNames.RIGHT_FIRST_PLAYER];
  let rightSecondPlayerImage = g_context.resources[imageNames.RIGHT_SECOND_PLAYER];
  let rightThirdPlayerImage = g_context.resources[imageNames.RIGHT_THIRD_PLAYER];
  let rightFourthPlayerImage = g_context.resources[imageNames.RIGHT_FOURTH_PLAYER];

  let leftFirstPlayerImage = g_context.resources[imageNames.LEFT_FIRST_PLAYER];
  let leftSecondPlayerImage = g_context.resources[imageNames.LEFT_SECOND_PLAYER];
  let leftThirdPlayerImage = g_context.resources[imageNames.LEFT_THIRD_PLAYER];
  let leftFourthPlayerImage = g_context.resources[imageNames.LEFT_FOURTH_PLAYER];

  if (PLAYERS_AMOUNT >= 1) {
    this.firstPlayer = new Player(rightFirstPlayerImage, leftFirstPlayerImage,
        playerName.FIRST_NAME, 0, 0, firstPlayerMoveButton);
  }
  if (PLAYERS_AMOUNT >= 2) {
    this.secondPlayer = new Player(rightSecondPlayerImage, leftSecondPlayerImage,
        playerName.SECOND_NAME, 0, 0, secondPlayerMoveButton);
  }
  if (PLAYERS_AMOUNT >= 3) {
    this.thirdPlayer = new Player(rightThirdPlayerImage, leftThirdPlayerImage,
        playerName.THIRD_NAME, 0, 0, thirdPlayerMoveButton);
  }
  if (PLAYERS_AMOUNT >= 4) {
    this.fourthPlayer = new Player(rightFourthPlayerImage, leftFourthPlayerImage,
        playerName.FOURTH_NAME, 0, 0, fourthPlayerMoveButton);
  }
}
function Player(sourceRightMoving, sourceLeftMoving, name, x, y, movingButtons) {
  this.name = name;

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

  this.leftFreeSpace = playerInformation.LEFT_FREE_SPACE_RIGHT_MOVE;
  this.rightFreeSpace = playerInformation.RIGHT_FREE_SPACE_RIGHT_MOVE;
  this.topFreeSpace = playerInformation.TOP_FREE_SPACE;
  this.nextLand = 0;
  this.landed = states.ACTIVE;
  this.typeBottomUnderPlayer = bottomType.LAND;

  this.liveState = playerInformation.ALIVE;
  this.unaliveTime = 0;
  this.animationTime = 0;
  this.killState = states.INACTIVE;

  this.startIceDelta = 0;
  this.horizontalSpeed = playerInformation.HORIZONTAL_SPEED;
  this.accelerationOfGravity = playerInformation.ACCELERATION_OF_GRAVITY;
  this.verticalSpeed = playerInformation.START_BIG_VERTICAL_SPEED;
  this.speedCoefficient = speedCoefficients.RIGHT_MOVING;

  this.iceStartMoving = states.INACTIVE;
  this.iceRightFinishMoving = states.INACTIVE;
  this.iceLeftFinishMoving = states.INACTIVE;

  this.killedPlayers = {
    firstPlayer: {
      name: playerName.FIRST_NAME,
      killingAmount: 0
    },
    secondPlayer: {
      name: playerName.SECOND_NAME,
      killingAmount: 0
    },
    thirdPlayer: {
      name: playerName.THIRD_NAME,
      killingAmount: 0
    },
    fourthPlayer: {
      name: playerName.FOURTH_NAME,
      killingAmount: 0
    },
  };

  this.rightMove = 0;
  this.leftMove = 0;
  this.upMove = 0;
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
    let firstX = playerImage.FIRST_LEFT_X;
    let secondX = playerImage.SECOND_LEFT_X;
    let thirdX = playerImage.THIRD_LEFT_X;
    let fourthX = playerImage.FOURTH_LEFT_X;
    let fifthX = playerImage.FIFTH_LEFT_X;
    let sixthX = playerImage.SIXTH_LEFT_X;
    let seventhX = playerImage.SEVENTH_LEFT_X;
    let eightsX = playerImage.EIGHTS_LEFT_X;
    let ninthX = playerImage.NINTH_LEFT_X;
    let tensX = playerImage.TENTH_LEFT_X;
    if (this.rightMove === 1) {
      firstX = playerImage.FIRST_RIGHT_X;
      secondX = playerImage.SECOND_RIGHT_X;
      thirdX = playerImage.THIRD_RIGHT_X;
      fourthX = playerImage.FOURTH_RIGHT_X;
      fifthX = playerImage.FIFTH_RIGHT_X;
      sixthX = playerImage.SIXTH_RIGHT_X;
      seventhX = playerImage.SEVENTH_RIGHT_X;
      eightsX = playerImage.EIGHTS_RIGHT_X;
      ninthX = playerImage.NINTH_RIGHT_X;
      tensX = playerImage.TENTH_RIGHT_X;
    }
    if (this.leftMove === 1) {
      firstX = playerImage.FIRST_LEFT_X;
      secondX = playerImage.SECOND_LEFT_X;
      thirdX = playerImage.THIRD_LEFT_X;
      fourthX = playerImage.FOURTH_LEFT_X;
      fifthX = playerImage.FIFTH_LEFT_X;
      sixthX = playerImage.SIXTH_LEFT_X;
      seventhX = playerImage.SEVENTH_LEFT_X;
      eightsX = playerImage.EIGHTS_LEFT_X;
      ninthX = playerImage.NINTH_LEFT_X;
      tensX = playerImage.TENTH_LEFT_X;
    }
    switch (this.imageX) {
      case firstX:
        this.imageX = secondX;
        break;
      case secondX:
        this.imageX = thirdX;
        break;
      case thirdX:
        this.imageX = fourthX;
        break;
      case fourthX:
        this.imageX = fifthX;
        break;
      case fifthX:
        this.imageX = sixthX;
        break;
      case sixthX:
        this.imageX = seventhX;
        break;
      case seventhX:
        this.imageX = eightsX;
        break;
      case eightsX:
        this.imageX = ninthX;
        break;
      case ninthX:
        this.imageX = tensX;
        break;
      case tensX:
        this.imageX = firstX;
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
      let isFreePlace = states.INACTIVE;
      let players = g_world.players;
      while (!isFreePlace) {
        this.chooseRandomPlace();
        isFreePlace = this.isFreePlace(this.name, this.x, this.y, players);
      }
    }
  };

  this.isFreePlace = function(playerName, playerX, playerY, players) {
    for (let key in players) {
      if (players[key].name != playerName) {
        let firstObjectBox = this.getBox();
        let secondObjectBox = players[key].getBox();

        let isXNotFree = (((secondObjectBox.firstX >= firstObjectBox.firstX) &&  //двигающийся игрок левее
        (secondObjectBox.firstX <= firstObjectBox.secondX)) ||
        ((firstObjectBox.firstX >= secondObjectBox.firstX) &&  //двигающийся игрок правее
        (firstObjectBox.firstX <= secondObjectBox.secondX)));

        let isYNotFree = (((secondObjectBox.y >= firstObjectBox.y) &&  //двигающийся игрок выше
        (secondObjectBox.y <= firstObjectBox.y + this.height - this.topFreeSpace)) ||
        ((firstObjectBox.y >= secondObjectBox.y) &&  //двигающийся игрок ниже
        (firstObjectBox.y <= secondObjectBox.y + players[key].height - players[key].topFreeSpace)));

        if (isXNotFree && isYNotFree) {
          return false;
        }
      }
    }
    return true;
  };

  this.increaseScores = function(unalivePlayer) {
    let scoreboards = g_world.scoreboards;

    for (let key in this.killedPlayers) {
      if (unalivePlayer.name === this.killedPlayers[key].name) {
        this.killedPlayers[key].killingAmount++;
      }
    }

    if (scoreboards) {
      for (let key in scoreboards) {
        if (scoreboards[key].name === this.name) {
          let newScore = scoreboards[key].pointsAmount + 1;
          if (newScore >= playerInformation.MAX_POINTS_AMOUNT) {
            newScore = 0;
          }
          scoreboards[key].pointsAmount = newScore;
        }
      }
    }
    return scoreboards;
  };

  this.dye = function() {
    this.liveState = playerInformation.UNALIVE;
    g_world.collisionEvent = states.INACTIVE;
  };

  this.getBox = function() {
    let playerBox = {};
    playerBox.firstX = this.x + this.leftFreeSpace;
    playerBox.secondX = this.x + this.width - this.rightFreeSpace;
    playerBox.y = this.y + this.topFreeSpace;
    playerBox.secondY = this.y + this.height;
    playerBox.centralX = playerBox.firstX + (playerBox.secondX - playerBox.firstX) / 2;
    playerBox.centralY = playerBox.y + (playerBox.secondY - playerBox.y) / 2;

    return playerBox;
  };
}

function getScoreboards() {
  let scoreboardImage = g_context.resources[imageNames.SCOREBOARD];
  let x = canvasSize.WIDTH - pointScoreboard.WIDTH;
  let scoreboards = new Scoreboards(scoreboardImage, x);
  return scoreboards;
}
function Scoreboards(scoreboardImage, x) {
  let firstPlayerImage = g_context.resources[imageNames.LEFT_FIRST_PLAYER];
  let secondPlayerImage = g_context.resources[imageNames.LEFT_SECOND_PLAYER];
  let thirdPlayerImage = g_context.resources[imageNames.LEFT_THIRD_PLAYER];
  let fourthPlayerImage = g_context.resources[imageNames.LEFT_FOURTH_PLAYER];
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
      ctx.font = "bold 25pt Arial";
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

function getBurst(){
  let sourceBurst = g_context.resources[imageNames.BURST];
  let burst = new Burst(sourceBurst);
  return burst;
}
function Burst(sourceBurst){
  this.source = sourceBurst;
  this.stateBurst = states.INACTIVE;
  this.animationTime = 0;
  this.currentStage = 0;

  this.x = 0;
  this.y = 0;
  this.width = burst.WIDTH;
  this.height = burst.HEIGHT;

  this.imageX = burst.IMAGE_X;
  this.imageY = burst.IMAGE_Y;
  this.imageWidth = burst.IMAGE_WIDTH;
  this.imageHeight = burst.IMAGE_HEIGHT;

  this.createAnimation = function(deltaTime) {
    if (this.animationTime >= burst.ANIMATION_TIME) {
      this.changeImage();
      this.animationTime = 0;
      this.currentStage++;
    } else {
      let sumDeltaTime = this.animationTime + deltaTime / 1000;
      this.animationTime = sumDeltaTime;
    }
    if (this.currentStage === burst.AMOUNT_STAGE) {
      this.stateBurst = states.INACTIVE;
      this.currentStage = 0;
    }
  };

  this.draw = function(ctx) {
    ctx.drawImage(this.source, this.imageX, this.imageY, this.imageWidth, this.imageHeight,
        this.x, this.y, this.width,this.height);
  };

  this.changeImage = function() {
    switch (this.imageX) {
      case burst.FIRST_X:
        this.imageX = burst.SECOND_X;
        break;
      case burst.SECOND_X:
        this.imageX = burst.THIRD_X;
        break;
      case burst.THIRD_X:
        this.imageX = burst.FOURTH_X;
        break;
      case burst.FOURTH_X:
        this.imageX = burst.FIFTH_X;
        break;
      case burst.FIFTH_X:
        this.imageX = burst.SIXTH_X;
        break;
      case burst.SIXTH_X:
        this.imageX = burst.SEVENTH_X;
        break;
      case burst.SEVENTH_X:
        this.imageX = burst.EIGHTS_X;
        break;
      case burst.EIGHTS_X:
        this.imageX = burst.NINTH_X;
        break;
      case burst.NINTH_X:
        this.imageX = burst.TENTH_X;
        break;
      case burst.TENTH_X:
        this.imageX = burst.ELEVENTH_X;
        break;
      case burst.ELEVENTH_X:
        this.imageX = burst.TWELFTH_X;
        break;
      case burst.TWELFTH_X:
        this.imageX = burst.FIRST_X;
        break;
    }
  };
}

function getInsectsSwarm() {
  let insectsSwarm = new Swarm(1350, 700);
  return insectsSwarm;
}
function Swarm(x, y) {
  this.x = x;
  this.y = y;

  this.swarmAreaRadius = insectsSwarm.SWARM_RADIUS;

  let swarm = [];
  for (let i = 0; i < insectsSwarm.AMOUNT_INSECTS; i++) {
    swarm[i] = new Insect(this.x, this.y);
    swarm[i].chooseRandomCoordinates();
  }

  this.swarm = swarm;

  this.animationTime = 0;
  this.createAnimation = function(deltaTime) {
    let crossingPlayers =this.checkPlayerCrossing();

    if (this.animationTime >= insectsSwarm.INSECT_ANIMATION_TIME) {
      this.chooseRandomCoordinates(crossingPlayers);
      this.animationTime = 0;
    } else {
      let sumDeltaTime = this.animationTime + deltaTime / 1000;
      this.animationTime = sumDeltaTime;
    }
  };

  this.chooseRandomCoordinates = function(crossingPlayers) {
    let minX = this.x - this.swarmAreaRadius;
    let maxX = this.x + this.swarmAreaRadius;
    let minY = this.y - this.swarmAreaRadius;
    let maxY = this.y + this.swarmAreaRadius;

    let newX = Math.round(minX - 0.5 + Math.random() * (maxX - minX + 1));
    let newY = Math.round(minY - 0.5 + Math.random() * (maxY - minY + 1));

    let deltaX = newX - this.x;
    let deltaY = newY - this.y;

    if ((newX > 0) && (newX > canvasSize.WIDTH) && (newY > 0) && (newY < canvasSize.HEIGHT)) {
      this.x = newX;
      this.y = newY;
    }

    for (let i = 0; i < insectsSwarm.AMOUNT_INSECTS; i++) {
      this.swarm[i].chooseRandomCoordinates(this.x, this.y, deltaX, deltaY, crossingPlayers);
    }
  };
  this.isCrossSwarmArea = function(x, y) {
    let isInArea = (((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y))
    < (insectsSwarm.FIRST_SWARM_RADIUS * insectsSwarm.FIRST_SWARM_RADIUS));
    return isInArea;
  };
  this.checkPlayerCrossing = function() {
    let players = g_world.players;
    let isCrossRightTopCorner;
    let isCrossLeftTopCorner;
    let isCrossRightBottomCorner;
    let isCrossLeftBottomCorner;
    let playersCrossingInformation = [];
    for (let key in players) {
      let playerBox = players[key].getBox();
      isCrossRightTopCorner = this.isCrossSwarmArea(playerBox.secondX, playerBox.y);
      isCrossLeftTopCorner = this.isCrossSwarmArea(playerBox.firstX, playerBox.y);
      isCrossLeftBottomCorner = this.isCrossSwarmArea(playerBox.firstX, playerBox.secondY);
      isCrossRightBottomCorner = this.isCrossSwarmArea(playerBox.secondX, playerBox.secondY);
      if ((isCrossRightTopCorner) || (isCrossLeftTopCorner)
          || (isCrossLeftBottomCorner) || (isCrossRightBottomCorner)) {
        playersCrossingInformation.push(new CrossingPlayer(players[key], isCrossRightTopCorner,
            isCrossLeftTopCorner, isCrossLeftBottomCorner, isCrossRightBottomCorner));
      }
    }
    return playersCrossingInformation;
  };
}
function CrossingPlayer(player, isCrossRightTopCorner, isCrossLeftTopCorner,
                        isCrossLeftBottomCorner, isCrossRightBottomCorner) {
  this.playerName = player.name;
  this.box = player.getBox();
  this.rightTopCorner = isCrossRightTopCorner;
  this.leftTopCorner = isCrossLeftTopCorner;
  this.leftBottomCorner = isCrossLeftBottomCorner;
  this.rightBottomCorner = isCrossRightBottomCorner;
  this.freeRadiusFromInsects = playerInformation.FREE_RADIUS_FROM_INSECTS;
}

function Insect(swarmX, swarmY) {
  this.x = swarmX;
  this.y = swarmY;
  this.insectAreaRadius = insectsSwarm.INSECT_AREA_RADIUS;
  this.animationTime = 0;
  this.chooseRandomCoordinates = function(xSwarm, ySwarm, deltaX, deltaY, crossingPlayers) {
    let minX = this.x - this.insectAreaRadius;
    let maxX = this.x + this.insectAreaRadius;
    let minY = this.y - this.insectAreaRadius;
    let maxY = this.y + this.insectAreaRadius;

    let shiftX = deltaX;
    let shiftY = deltaY;

    let newX = Math.round(minX - 0.5 + Math.random() * (maxX - minX + 1)) + shiftX;
    let newY = Math.round(minY - 0.5 + Math.random() * (maxY - minY + 1)) + shiftY;
    this.checkPlace(xSwarm, ySwarm, newX, newY, crossingPlayers);
  };
  this.checkPlace = function(xSwarm, ySwarm, newX, newY, crossingPlayers) {
    let isInSwarmArea = this.isInSwarmArea(xSwarm, ySwarm, newX, newY, insectsSwarm.FIRST_SWARM_RADIUS);
    if (isInSwarmArea) {
      this.x = newX;
      this.y = newY;
    } else {
      this.x = xSwarm;
      this.y = ySwarm;
    }

    let isInPlayerArea = this.isInSwarmArea(xSwarm, ySwarm, newX, newY, playerInformation.FREE_RADIUS_FROM_INSECTS);
    if (isInPlayerArea) {
      this.processingCrossingPlayers(crossingPlayers, this.x, this.y);
    }
  };
  this.processingCrossingPlayers = function(crossingPlayers) {
    for (let key in crossingPlayers) {
      if (crossingPlayers[key].rightTopCorner === true) {
        this.x = crossingPlayers[key].box.centralX + crossingPlayers[key].freeRadiusFromInsects + 1;
        this.y = crossingPlayers[key].box.centralY - crossingPlayers[key].freeRadiusFromInsects - 1;
      }
      if (crossingPlayers[key].leftTopCorner === true) {
        this.x = crossingPlayers[key].box.centralX - crossingPlayers[key].freeRadiusFromInsects - 1;
        this.y = crossingPlayers[key].box.centralY - crossingPlayers[key].freeRadiusFromInsects - 1;
      }
      if (crossingPlayers[key].leftBottomCorner === true) {
        this.x = crossingPlayers[key].box.centralX - crossingPlayers[key].freeRadiusFromInsects + 1;
        this.y = crossingPlayers[key].box.centralY + crossingPlayers[key].freeRadiusFromInsects + 1;
      }
      if (crossingPlayers[key].rightBottomCorner === true) {
        this.x = crossingPlayers[key].box.centralX + crossingPlayers[key].freeRadiusFromInsects + 1;
        this.y = crossingPlayers[key].box.centralY + crossingPlayers[key].freeRadiusFromInsects + 1;
      }
    }
  };
  this.isInSwarmArea = function(xSwarm, ySwarm, newX, newY, radius) {
    let isInArea = (((newX - xSwarm) * (newX - xSwarm) + (newY - ySwarm) * (newY - ySwarm))
    < (radius * radius));
    return isInArea;
  };
  this.draw = function(ctx) {
    let r = insectsSwarm.INSECT_RADIUS;
    let corner = insectsSwarm.INSECT_CORNER;
    ctx.fillStyle = colors.BLACK;
    this.drawCircle(ctx, this.x, this.y, r, corner);
  };
  this.drawCircle = function(ctx, x, y, r, corner) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, corner * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  };
}
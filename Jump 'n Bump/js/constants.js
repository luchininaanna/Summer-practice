const MAX_COUNTER_VALUE = 7;
const MAX_PLAYERS_AMOUNT = 4;

const colors = {
  WHITE: "#FFFFFF"
};
const backgroundSize = {
  WIDTH: 1600,
  HEIGHT: 900
};
const smallStair = {
  IMAGE_X: 145,
  IMAGE_Y: 95,
  IMAGE_WIDTH: 16,
  IMAGE_HEIGHT: 17,
  WIDTH: 50,
  HEIGHT: 50
};
const bigStair = {
  IMAGE_X: 48,
  IMAGE_Y: 65,
  IMAGE_WIDTH: 15,
  IMAGE_HEIGHT: 48,
  WIDTH: 50,
  HEIGHT: 150
};
const canvasSize = {
  WIDTH: 1650,
  HEIGHT: 900
};
const firstTypeGrass = {
  IMAGE_X: 33,
  IMAGE_Y: 38,
  IMAGE_WIDTH: 14,
  IMAGE_HEIGHT: 9,
  WIDTH: 50,
  HEIGHT: 33
};
const secondTypeGrass = {
  IMAGE_X: 128,
  IMAGE_Y: 104,
  IMAGE_WIDTH: 16,
  IMAGE_HEIGHT: 8,
  WIDTH: 50,
  HEIGHT: 25
};
const thirdTypeGrass = {
  IMAGE_X: 0,
  IMAGE_Y: 16,
  IMAGE_WIDTH: 15,
  IMAGE_HEIGHT: 47,
  WIDTH: 50,
  HEIGHT: 150
};   //редактировать размеры
const iceBox = {
  IMAGE_X: 0,
  IMAGE_Y: 0,
  IMAGE_WIDTH: 100,
  IMAGE_HEIGHT: 100,
  WIDTH: 40,
  HEIGHT: 40
};
const rock = {
  IMAGE_X: 654,
  IMAGE_Y: 402,
  IMAGE_WIDTH: 94,
  IMAGE_HEIGHT: 89,
  WIDTH: 50,
  HEIGHT: 50
};
const firstPlayerMoveButton = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39
};
const secondPlayerMoveButton = {
  LEFT: 65, //A
  UP: 87, //W
  RIGHT: 68 //D
};
const playerInformation = {
  IMAGE_X: 24,
  IMAGE_Y: 75,
  IMAGE_WIDTH: 195,
  IMAGE_HEIGHT: 270,
  WIDTH: 60,
  HEIGHT: 85,
  LEFT_FREE_SPACE: 18,
  RIGHT_FREE_SPACE: 13,
  TOP_FREE_SPACE: 38,
  HORIZONTAL_SPEED: 0.5,
  START_VERTICAL_SPEED: 50,
  ACCELERATION_OF_GRAVITY: 9.8,
  ALIVE: 1,
  UNALIVE: 0
};
const imageNames = {
  BACKGROUND: "background",
  FIRST_LAND: "firstLand",
  SECOND_LAND: "secondLand",
  ICE_BOX: "iceBox",
  ROCKS: "rocks",
  PLAYER: "player",
  SCOREBOARD: "scoreboard"
};
const points = {
  ZERO: {
    IMAGE_X: 1428,
    IMAGE_Y: 726,
    IMAGE_WIDTH: 380,
    IMAGE_HEIGHT: 670,
    TOP_FREE_SPACE: 0,
    WIDTH: 90,
    HEIGHT: 180
  },
  ONE: {
    IMAGE_X: 0,
    IMAGE_Y: 72,
    IMAGE_WIDTH: 300,
    IMAGE_HEIGHT: 550,
    TOP_FREE_SPACE: 0,
    WIDTH: 90,
    HEIGHT: 180
  },
  TWO: {
    IMAGE_X: 288,
    IMAGE_Y: 48,
    IMAGE_WIDTH: 270,
    IMAGE_HEIGHT: 730,
    TOP_FREE_SPACE: 160,
    WIDTH: 90,
    HEIGHT: 180
  },
  THREE: {
    IMAGE_X: 576,
    IMAGE_Y: 72,
    IMAGE_WIDTH: 270,
    IMAGE_HEIGHT: 635,
    TOP_FREE_SPACE: 115,
    WIDTH: 90,
    HEIGHT: 180
  },
  FOUR: {
    IMAGE_X: 852,
    IMAGE_Y: 78,
    IMAGE_WIDTH: 430,
    IMAGE_HEIGHT: 610,
    TOP_FREE_SPACE: 90,
    WIDTH: 90,
    HEIGHT: 180
  },
  FIVE: {
    IMAGE_X: 12,
    IMAGE_Y: 792,
    IMAGE_WIDTH: 380,
    IMAGE_HEIGHT: 690,
    TOP_FREE_SPACE: 50,
    WIDTH: 90,
    HEIGHT: 180
  },
  SIX: {
    IMAGE_X: 402,
    IMAGE_Y: 816,
    IMAGE_WIDTH: 270,
    IMAGE_HEIGHT: 650,
    TOP_FREE_SPACE: 120,
    WIDTH: 90,
    HEIGHT: 180
  },
  SEVEN: {
    IMAGE_X: 660,
    IMAGE_Y: 726,
    IMAGE_WIDTH: 440,
    IMAGE_HEIGHT: 660,
    TOP_FREE_SPACE: 70,
    WIDTH: 90,
    HEIGHT: 180
  },
  EIGHT: {
    IMAGE_X: 1116,
    IMAGE_Y: 696,
    IMAGE_WIDTH: 300,
    IMAGE_HEIGHT: 650,
    TOP_FREE_SPACE: 70,
    WIDTH: 90,
    HEIGHT: 180
  },
  NINE: {
    IMAGE_X: 1296,
    IMAGE_Y: 72,
    IMAGE_WIDTH: 400,
    IMAGE_HEIGHT: 580,
    TOP_FREE_SPACE: 0,
    WIDTH: 90,
    HEIGHT: 180
  }
};
const pointScoreboard = {
  IMAGE_X: 1986,
  IMAGE_Y: 42,
  IMAGE_WIDTH: 500,
  IMAGE_HEIGHT: 824,
  WIDTH: 170,
  HEIGHT: 225
};
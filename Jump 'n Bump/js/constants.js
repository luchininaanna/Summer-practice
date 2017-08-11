const MAX_COUNTER_VALUE = 21;
const PLAYERS_AMOUNT = 4;

const colors = {
  WHITE: "#FFFFFF",
  LIGHT_BLUE: "#E0FFFF",
  LIGHT_YELLOW: "#F8F9DF",
  RED: "#B22222",
  BLACK: "#000000"
};
const backgroundSize = {
  WIDTH: 1600,
  HEIGHT: 900
};
const resultBackgroundSize = {
  IMAGE_X: 0,
  IMAGE_Y: 0,
  IMAGE_WIDTH: 500,
  IMAGE_HEIGHT: 500,
  WIDTH: 750,
  HEIGHT: 400,
  X: 450,
  Y: 200,
  VERTICAL_SHIFT: 90,
  HORIZONTAL_SHIFT: 400
};
const smallGround = {
  IMAGE_X: 145,
  IMAGE_Y: 95,
  IMAGE_WIDTH: 16,
  IMAGE_HEIGHT: 16,
  WIDTH: 50,
  HEIGHT: 50
};
const bigGround = {
  IMAGE_X: 48,
  IMAGE_Y: 64,
  IMAGE_WIDTH: 16,
  IMAGE_HEIGHT: 32,
  WIDTH: 50,
  HEIGHT: 100
};
const canvasSize = {
  WIDTH: 1650,
  HEIGHT: 900,
  MAX_COEFFICIENT: 1.5
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
  IMAGE_Y: 48,
  IMAGE_WIDTH: 15,
  IMAGE_HEIGHT: 15,
  WIDTH: 50,
  HEIGHT: 50
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
const thirdPlayerMoveButton = {
  LEFT: 75, //K
  UP: 79, //O
  RIGHT: 186 //:;
};
const fourthPlayerMoveButton = {
  LEFT: 71, //G
  UP: 89, //Y
  RIGHT: 74 //J
};
const playerInformation = {
  IMAGE_X: 0,
  IMAGE_Y: 0,
  IMAGE_WIDTH: 200,
  IMAGE_HEIGHT: 310,
  WIDTH: 54,
  HEIGHT: 90,

  LEFT_FREE_SPACE_RIGHT_MOVE: 8,
  RIGHT_FREE_SPACE_RIGHT_MOVE: 5,
  LEFT_FREE_SPACE_LEFT_MOVE: 5,
  RIGHT_FREE_SPACE_LEFT_MOVE: 8,
  TOP_FREE_SPACE: 20,

  HORIZONTAL_SPEED: 0.5,
  START_BIG_VERTICAL_SPEED: 55,
  START_SMALL_VERTICAL_SPEED: 35,
  START_ZERO_VERTICAL_SPEED: 0,
  ACCELERATION_OF_GRAVITY: 9.8,
  MASS: 3,

  ALIVE: 1,
  UNALIVE: 0,

  JUMP: 1,
  NO_JUMP: 0,

  UNALIVE_TIME: 2,
  ANIMATION_TIME: 0.03
};
const playerImage = {
  FIRST_RIGHT_X: 3,
  SECOND_RIGHT_X: 204,
  THIRD_RIGHT_X: 405,
  FOURTH_RIGHT_X: 609,
  FIFTH_RIGHT_X: 807,
  SIXTH_RIGHT_X: 1008,
  SEVENTH_RIGHT_X: 1203,
  EIGHTS_RIGHT_X: 1404,
  NINTH_RIGHT_X: 1602,
  TENTH_RIGHT_X: 1800,

  FIRST_LEFT_X: 3,
  SECOND_LEFT_X: 204,
  THIRD_LEFT_X: 396,
  FOURTH_LEFT_X: 597,
  FIFTH_LEFT_X: 794,
  SIXTH_LEFT_X: 993,
  SEVENTH_LEFT_X: 1194,
  EIGHTS_LEFT_X: 1395,
  NINTH_LEFT_X: 1593,
  TENTH_LEFT_X: 1795
};
const playerName = {
  FIRST_NAME: "1",
  SECOND_NAME: "2",
  THIRD_NAME: "3",
  FOURTH_NAME: "4"
};
const imageNames = {
  BACKGROUND: "background",
  FIRST_LAND: "firstLand",
  SECOND_LAND: "secondLand",
  ICE_BOX: "iceBox",
  ROCKS: "rocks",
  PLAYER: "player",
  SCOREBOARD: "scoreboard",
  RESULT_BACKGROUND: "resultBackground",
  BURST: "burst",
  RIGHT_FIRST_PLAYER: "rightFirstPlayer",
  RIGHT_SECOND_PLAYER: "rightSecondPlayer",
  RIGHT_THIRD_PLAYER: "rightThirdPlayer",
  RIGHT_FOURTH_PLAYER: "rightFourthPlayer",
  LEFT_FIRST_PLAYER: "leftFirstPlayer",
  LEFT_SECOND_PLAYER: "leftSecondPlayer",
  LEFT_THIRD_PLAYER: "leftThirdPlayer",
  LEFT_FOURTH_PLAYER: "leftFourthPlayer",
  FIRST_WINNING_PLAYER: "firstWinningPlayer",
  SECOND_WINNING_PLAYER: "secondWinningPlayer",
  THIRD_WINNING_PLAYER: "thirdWinningPlayer",
  FOURTH_WINNING_PLAYER: "fourthWinningPlayer",
};
const points = {
  ZERO: {
    VALUE: 0,
    IMAGE_X: 1428,
    IMAGE_Y: 726,
    IMAGE_WIDTH: 380,
    IMAGE_HEIGHT: 670
  },
  ONE: {
    VALUE: 1,
    IMAGE_X: 0,
    IMAGE_Y: 72,
    IMAGE_WIDTH: 300,
    IMAGE_HEIGHT: 550
  },
  TWO: {
    VALUE: 2,
    IMAGE_X: 288,
    IMAGE_Y: 48,
    IMAGE_WIDTH: 270,
    IMAGE_HEIGHT: 730
  },
  THREE: {
    VALUE: 3,
    IMAGE_X: 576,
    IMAGE_Y: 72,
    IMAGE_WIDTH: 270,
    IMAGE_HEIGHT: 635
  },
  FOUR: {
    VALUE: 4,
    IMAGE_X: 852,
    IMAGE_Y: 78,
    IMAGE_WIDTH: 430,
    IMAGE_HEIGHT: 610
  },
  FIVE: {
    VALUE: 5,
    IMAGE_X: 12,
    IMAGE_Y: 792,
    IMAGE_WIDTH: 380,
    IMAGE_HEIGHT: 690
  },
  SIX: {
    VALUE: 6,
    IMAGE_X: 402,
    IMAGE_Y: 816,
    IMAGE_WIDTH: 270,
    IMAGE_HEIGHT: 650
  },
  SEVEN: {
    VALUE: 7,
    IMAGE_X: 660,
    IMAGE_Y: 726,
    IMAGE_WIDTH: 440,
    IMAGE_HEIGHT: 660
  },
  EIGHT: {
    VALUE: 8,
    IMAGE_X: 1116,
    IMAGE_Y: 696,
    IMAGE_WIDTH: 300,
    IMAGE_HEIGHT: 650
  },
  NINE: {
    VALUE: 9,
    IMAGE_X: 1296,
    IMAGE_Y: 72,
    IMAGE_WIDTH: 400,
    IMAGE_HEIGHT: 580
  }
};
const pointScoreboard = {
  IMAGE_X: 1986,
  IMAGE_Y: 42,
  IMAGE_WIDTH: 500,
  IMAGE_HEIGHT: 824,
  WIDTH: 170,
  HEIGHT: 225,
  Y_POINT_SHIFT: 110,
  X_PLAYER_SHIFT: 90,
  Y_PLAYER_SHIFT: 10,
  X_PLAYER_NAME_SHIFT: 50,
  Y_PLAYER_NAME_SHIFT: 70,
  X_FIRST_POINT_SHIFT: 30,
  X_SECOND_POINT_SHIFT: 85,
  POINT_HEIGHT: 95,
  POINT_WIDTH: 59
};
const bottomType = {
  LAND: "land",
  ICE: "ice",
  ROCK: "rock",
  AIR: "air",
  TOP_FREE_SPACE : 10,
  LEFT_FREE_SPACE : 0,
  RIGHT_FREE_SPACE : 0
};
const randomPlaces = {
  FIRST: 1,
  SECOND: 2,
  THIRD: 3,
  FOURTH: 4,
  FIFTH: 5,

  FIRST_PLACE_X: 630,
  FIRST_PLACE_Y: 780,
  SECOND_PLACE_X: 1230,
  SECOND_PLACE_Y: 750,
  THIRD_PLACE_X: 100,
  THIRD_PLACE_Y: 330,
  FOURTH_PLACE_X: 200,
  FOURTH_PLACE_Y: 800,
  FIFTH_PLACE_X: 930,
  FIFTH_PLACE_Y: 430
};
const statesOfGame = {
  IN_PROCESS: 0,
  RESULT: 1,
  PLAYERS_CHOOSING: 2
};
const resultButton = {
  RESULT: 27,
  NEW_GAME: 13,
};
const result = {
  PLAYER_NAME_HEADING_X: 500,
  PLAYER_NAME_X: 530,
  PLAYER_NAME_HEADING: "Имя игрока",
  SCORE_HEADING_X: 940,
  SCORE_HEADING: "Баллы",
  SCORE_X: 1000,
  START_Y: 270,
  SHIFT_Y: 70,
  RECORD_START_Y: 355,
  PLAYER: "Игрок ",
  EMPTY_RECORD: "- - - - - - - - - -",
  EMPTY_RECORD_X: 870
};
const states = {
  ACTIVE: 1,
  INACTIVE: 0
};
const promptInformation = {
  X: 350,
  Y: 700,
  TEXT: "Для начала новой игры нажмите клавишу Enter",
  TIME_INTERVAL: 0.6
};
const speedCoefficients = {
  RIGHT_MOVING: 1,
  LEFT_MOVING: -1
};
const burst = {
  IMAGE_X: 0,
  IMAGE_Y: 0,
  IMAGE_WIDTH: 200,
  IMAGE_HEIGHT: 200,
  WIDTH: 50,
  HEIGHT: 50,

  AMOUNT_STAGE: 12,
  ANIMATION_TIME: 0.01,

  FIRST_X: 0,
  SECOND_X: 200,
  THIRD_X: 400,
  FOURTH_X: 600,
  FIFTH_X: 800,
  SIXTH_X: 1000,
  SEVENTH_X: 1200,
  EIGHTS_X: 1400,
  NINTH_X: 1600,
  TENTH_X: 1800,
  ELEVENTH_X: 2000,
  TWELFTH_X: 2200,
};
const insectsSwarm = {
  AMOUNT_INSECTS: 20,
  FIRST_SWARM_RADIUS: 100,
  INSECT_AREA_RADIUS: 20,
  INSECT_RADIUS: 2,
  INSECT_CORNER: 2
};
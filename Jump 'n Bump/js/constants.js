const MAX_COUNTER_VALUE = 6;

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
let playerInformation = {
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
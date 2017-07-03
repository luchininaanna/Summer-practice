function Colors() {
  this.WHITE = "#FFFFFF";
  this.LIGHT_KHAKI = "#EEE8AA";
  this.KHAKI = "#BDB76B";
  this.DARK_KHAKI = "#8B864E";
  this.OLIVE = "#556B2F";
  this.ORANGE = "#FF8C00";
  this.RED = "#EE0000";
  this.BLACK = "#000000";
}
function Messages() {
  this.THE_MESSAGE_OF_VICTORY_OF_FIRST_PLAYER = "ВЫИГРАЛ 1 ИГРОК!";
  this.THE_MESSAGE_OF_VICTORY_OF_SECOND_PLAYER = "ВЫИГРАЛ 2 ИГРОК!";
  this.THE_MESSAGE_OF_DRAW = "НИЧЬЯ!";
  this.THE_MESSAGE_OF_NEW_GAME = "НАЧАТЬ НОВУЮ ИГРУ";
  this.TEXT_FIRST_PLAYER = "Игрок 1";
  this.TEXT_SECOND_PLAYER = "Игрок 2";
}
function StatesOfGame() {
  this.IN_PROCESS = 0;
  this.THE_VICTORY_OF_FIRST_PLAYER = 1;
  this.THE_VICTORY_OF_SECOND_PLAYER = 2;
  this.DRAW = 3;
}
function NamesOfElements() {
  this.EMPTY = 0;
  this.CROSS = 1;
  this.NAUGHT = 2;
}
function RightToMove() {
  this.FIRST_PLAYER = 1;
  this.SECOND_PLAYER = 2;
}
function ClockData() {
  this.FIRST_DELTA_CLOCK = 1.5;
  this.SECOND_DELTA_CLOCK = 3.5;
  this.TIME_FOR_MOVE = 5;
}
function StatesOfButton() {
  this.UNMOVED = 0;
  this.MOVED = 1;
}
function CanvasSize() {
  this.WIDTH = 1200;
  this.HEIGHT = 800;
}
function ButtonSize() {
  this.X = 380;
  this.Y = 400;
  this.WIDTH = 460;
  this.HEIGHT = 100;
}
function FieldSize() {
  this.FIELDS_IN_RAW = 3;
  this.FIELDS_IN_COLON = 3;
  this.WIDTH = 200;
  this.AMOUNT = 9;
  this.ELEMENTS_IN_RAW = 3;
  this.ELEMENTS_IN_COLON = 3;
  this.ELEMENTS_FOR_SET = 3;
}
function ClockSize() {
  this.FIRST_PART = 0.4;
  this.SECOND_PART = 0.8;
  this.THIRD_PART = 1.2;
  this.FOURTH_PART = 1.6;
  this.FIFTH_PART = 1.8;
  this.RADIUS = 120;
  this.FIRST_COEFFICIENT = 0.2;
  this.SECOND_COEFFICIENT = 2;
}
function ElementsSize() {
  this.SHIFT = 160;
  this.RADIUS = 10;
  this.BIG_RADIUS = 90;
  this.SMALL_RADIUS = 73;
  this.CORNER = 2;
}
function Animation() {
  this.COEFFICIENT = 0.5;
}
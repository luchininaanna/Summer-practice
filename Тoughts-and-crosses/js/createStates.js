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
function DateClock() {
  this.FIRST_DELTA_CLOCK = 1.5;
  this.SECOND_DELTA_CLOCK = 3.5;
  this.timeForMove = 5;
}
function StatesOfButton() {
  this.UNMOVED = 0;
  this.MOVED = 1;
}

function SizeCanvas() {
  this.width = 1200;
  this.height = 800;
}
function SizeButton() {
  this.x = 380;
  this.y = 400;
  this.width = 460;
  this.height = 100;
}
function SizeFields() {
  this.fieldsInRaw = 3;
  this.fieldsInColon = 3;
  this.width = 200;
  this.amount = 9;
  this.elementInRaw = 3;
  this.elementInColon = 3;
  this.elementForSet = 3;
}
function SizeClock() {
  this.firstPart = 0.4;
  this.secondPart = 0.8;
  this.thirdPart = 1.2;
  this.fourthPart = 1.6;
  this.fifthPart = 1.8;
  this.radius = 120;
  this.firstCoefficient = 0.2;
  this.secondCoefficient = 2;
}
function SizeElements() {
  this.shift = 160;
  this.radius = 10;
  this.bigRadius = 90;
  this.smallRadius = 73;
  this.corner = 2;
}

function Field(x, y, nameOfSymbol) {
  this.x = x;
  this.y = y;
  this.nameOfSymbol = nameOfSymbol;
}
function createCoordinatesOfFields(x, y) {
  let fields = [];
  let sizeFields = new SizeFields();
  for (let i = 0; i < sizeFields.fieldsInColon; i++) {
    for (let j = 0; j < sizeFields.fieldsInRaw; j++){
      fields[i*sizeFields.fieldsInColon + j] = new Field(x + sizeFields.width*j,
          y+sizeFields.width*i, namesOfElements.EMPTY);
    }
  }
  console.log(fields);
  return fields
}
function Game(player, stateOfGame) {
  this.namePlayerWithRightOfMove = player;
  this.stateOfGame = stateOfGame;
  this.winningSet = [];
  this.drawResult = false;
}
function createStateOfGame() {
  game = new Game(rightToMove.FIRST_PLAYER, statesOfGame.IN_PROCESS);
  return game
}
function Clock(deltaCorner, sumDeltaTime) {
  this.deltaCorner = deltaCorner;
  this.sumDeltaTime = sumDeltaTime;
}
function createStateOfClock() {
  clock = new Clock(namesOfElements.EMPTY, namesOfElements.EMPTY);
  return clock
}
function Button(UNMOVED) {
  this.stateOfButton = UNMOVED;
}
function createStateOfButton() {
  button = new Button(statesOfButton.UNMOVED);
  return button
}
function Window() {
  this.leftShift = searchLeftShift();
  this.topShift = searchTopShift();
}
function createStateOfWindow() {
  browser = new Window();
  return browser
}
function searchLeftShift() {
  let styleCanvas = getComputedStyle(document.getElementById("canvas"));
  let leftShift = parseInt(styleCanvas.marginLeft);
  return leftShift
}
function searchTopShift() {
  let styleGame = getComputedStyle(document.getElementById("game"));
  let paddingTopOfGame = styleGame.paddingTop;

  let nameOfGame = getComputedStyle(document.getElementById("nameOfGame"));
  let borderWidthOfNameOfGame = nameOfGame.borderWidth;
  let heightOfNameOfGame = nameOfGame.height;

  let topShift = parseInt(paddingTopOfGame) + 2 * parseInt(borderWidthOfNameOfGame)
      + parseInt(heightOfNameOfGame);
  return topShift
}
function ElementForAnimation(nameOfElement, x, y) {
  this.nameOfElement = nameOfElement;
  this.x = x;
  this.y = y;
}
function createElementsForAnimation() {
  let elements = [];
  let amountElementsInRaw = 6;
  let amountOfRaw = 6;
  let x = 0;
  let y = -100;
  for (let i = 0; i < amountOfRaw; i++) {
    if ((i === 0) || (i === 2) || (i === 4)) {
      elements[i * amountElementsInRaw] = new ElementForAnimation(namesOfElements.CROSS, x + 100, y + i * 200);
      elements[i * amountElementsInRaw + 1] = new ElementForAnimation(namesOfElements.NAUGHT, x + 300, y + i * 200);
      elements[i * amountElementsInRaw + 2] = new ElementForAnimation(namesOfElements.CROSS, x + 500, y + i * 200);
      elements[i * amountElementsInRaw + 3] = new ElementForAnimation(namesOfElements.NAUGHT, x + 700, y + i * 200);
      elements[i * amountElementsInRaw + 4] = new ElementForAnimation(namesOfElements.CROSS, x + 900, y + i * 200);
      elements[i * amountElementsInRaw + 5] = new ElementForAnimation(namesOfElements.NAUGHT, x + 1100, y + i * 200);
    } else {
      elements[i * amountElementsInRaw] = new ElementForAnimation(namesOfElements.NAUGHT, x + 100, y + i * 200);
      elements[i * amountElementsInRaw + 1] = new ElementForAnimation(namesOfElements.CROSS, x + 300, y + i * 200);
      elements[i * amountElementsInRaw + 2] = new ElementForAnimation(namesOfElements.NAUGHT, x + 500, y + i * 200);
      elements[i * amountElementsInRaw + 3] = new ElementForAnimation(namesOfElements.CROSS, x + 700, y + i * 200);
      elements[i * amountElementsInRaw + 4] = new ElementForAnimation(namesOfElements.NAUGHT, x + 900, y + i * 200);
      elements[i * amountElementsInRaw + 5] = new ElementForAnimation(namesOfElements.CROSS, x + 1100, y + i * 200);
    }
  }
  return elements
}
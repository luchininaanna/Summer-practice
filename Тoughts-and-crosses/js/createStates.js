function Field(x, y, nameOfSymbol) {
  this.x = x;
  this.y = y;
  this.nameOfSymbol = nameOfSymbol;
}
function createCoordinatesOfFields(x, y) {
  let fields = [];
  fields[0] = new Field(x, y, EMPTY);
  fields[1] = new Field(x + 200, y, EMPTY);
  fields[2] = new Field(x + 400, y, EMPTY);
  fields[3] = new Field(x, y + 200, EMPTY);
  fields[4] = new Field(x + 200, y + 200, EMPTY);
  fields[5] = new Field(x + 400, y + 200, EMPTY);
  fields[6] = new Field(x, y + 400, EMPTY);
  fields[7] = new Field(x + 200, y + 400, EMPTY);
  fields[8] = new Field(x + 400, y + 400, EMPTY);
  return fields
}
function Game(player, stateOfGame) {
  this.namePlayerWithRightOfMove = player;
  this.stateOfGame = stateOfGame;
  this.winningSet = [];
}
function createStateOfGame() {
  game = new Game(FIRST_PLAYER, IN_PROCESS);
  return game
}
function Clock(deltaCorner, sumDeltaTime) {
  this.deltaCorner = deltaCorner;
  this.sumDeltaTime = sumDeltaTime;
}
function createStateOfClock() {
  clock = new Clock(EMPTY, EMPTY);
  return clock
}
function Button(UNMOVED) {
  this.stateOfButton = UNMOVED;
}
function createStateOfButton() {
  button = new Button(UNMOVED);
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

  let topShift = parseInt(paddingTopOfGame) + 2*parseInt(borderWidthOfNameOfGame)
      +parseInt(heightOfNameOfGame);
  return topShift
}
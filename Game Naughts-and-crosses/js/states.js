function createStateOfClock() {
  let date = new Date();
  let clock = new Clock(date);
  return clock;
}
function Clock(date) {
  this.hours = date.getHours();
  this.minutes = date.getMinutes();
  this.seconds = date.getSeconds();
}
function Field(x, y, nameOfSymbol) {
  this.x = x;
  this.y = y;
  this.nameOfSymbol = nameOfSymbol;
}
function createCoordinatesOfFields(x, y) {
  let fields = [];
  for (let i = 0; i < fieldsSize.FIELDS_IN_COLON; i++) {
    for (let j = 0; j < fieldsSize.FIELDS_IN_RAW; j++) {
      fields[i * fieldsSize.FIELDS_IN_COLON + j] = new Field(fieldsSize.X + fieldsSize.WIDTH * j,
          fieldsSize.Y + fieldsSize.WIDTH * i, namesOfElements.EMPTY);
    }
  }
  return fields;
}
function Game(player, stateOfGame) {
  this.namePlayerWithRightOfMove = player;
  this.stateOfGame = stateOfGame;
  this.winningSet = [];
  this.drawResult = false;
}
function createGame() {
  let game = new Game(rightToMove.FIRST_PLAYER, statesOfGame.IN_PROCESS);
  return game;
}
function Timer(deltaCorner, sumDeltaTime) {
  this.deltaCorner = deltaCorner;
  this.sumDeltaTime = sumDeltaTime;
}
function createStateOfTimer() {
  let timer = new Timer(namesOfElements.EMPTY, namesOfElements.EMPTY);
  return timer;
}
function Button(UNMOVED) {
  this.stateOfButton = UNMOVED;
  this.draw = function (ctx) {
    ctx.strokeStyle = colors.RED;
    ctx.lineWidth = 5;
    if (g_context.button.stateOfButton === statesOfButton.UNMOVED) {
      ctx.fillStyle = colors.KHAKI;
    } else {
      ctx.fillStyle = colors.ORANGE;
    }
    ctx.lineWidth = 2;
    drawRectangle(ctx, buttonSize.X, buttonSize.Y, buttonSize.WIDTH, buttonSize.HEIGHT, 1, 0, 0);
    ctx.strokeStyle = colors.RED;
    ctx.fillStyle = colors.RED;
    ctx.font = "bold 30pt Arial";
    ctx.fillText(messages.THE_MESSAGE_OF_NEW_GAME, buttonSize.X + 10, buttonSize.Y + 60);
  }
}
function createStateOfButton() {
  let button = new Button(statesOfButton.UNMOVED);
  return button;
}
function WindowShift() {
  this.leftShift = getLeftShift();
  this.topShift = getTopShift();
}
function createStateOfWindow() {
  let browser = new WindowShift();
  return browser;
}
function getLeftShift() {
  let styleCanvas = getComputedStyle(document.getElementById("canvas"));
  let leftShift = parseInt(styleCanvas.marginLeft);
  return leftShift;
}
function getTopShift() {
  let styleGame = getComputedStyle(document.getElementById("game"));
  let paddingTopOfGame = styleGame.paddingTop;

  let nameOfGame = getComputedStyle(document.getElementById("nameOfGame"));
  let borderWidthOfNameOfGame = nameOfGame.borderWidth;
  let heightOfNameOfGame = nameOfGame.height;

  let topShift = parseInt(paddingTopOfGame) + 2 * parseInt(borderWidthOfNameOfGame)
      + parseInt(heightOfNameOfGame);
  return topShift;
}
function ElementForAnimation(nameOfElement, x, y) {
  this.nameOfElement = nameOfElement;
  this.x = x;
  this.y = y;
  this.COEFFICIENT = 0.5;
}
function createElementsForAnimation() {
  let elements = [];
  const x = 0;
  const y = 0;
  let nameElement = namesOfElements.CROSS;
  let animation = new Animation();
  for (let i = 0; i < animation.AMOUNT_OF_RAW; i++) {
    if ((i % 2) === 0) {
      nameElement = namesOfElements.CROSS
    } else {
      nameElement = namesOfElements.NAUGHT
    }
    for (let j = 0; j < animation.AMOUNT_ELEMENTS_IN_RAW; j++) {
      elements[i * animation.AMOUNT_ELEMENTS_IN_RAW + j] = new ElementForAnimation(nameElement,
          x + j * animation.COEFFICIENT * animation.DISTANSE_DETWEEN_ELEMENTS + animation.RAW_LEFT_SHIFT,
          y + i * animation.COEFFICIENT * animation.DISTANSE_DETWEEN_ELEMENTS);
      if (nameElement === namesOfElements.CROSS) {
        nameElement = namesOfElements.NAUGHT
      } else {
        nameElement = namesOfElements.CROSS
      }
    }
  }
  return elements;
}
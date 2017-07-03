function Field(x, y, nameOfSymbol) {
  this.x = x;
  this.y = y;
  this.nameOfSymbol = nameOfSymbol;
}
function createCoordinatesOfFields(x, y) {
  let fields = [];
  let sizeFields = new FieldSize();
  for (let i = 0; i < sizeFields.FIELDS_IN_COLON; i++) {
    for (let j = 0; j < sizeFields.FIELDS_IN_RAW; j++) {
      fields[i * sizeFields.FIELDS_IN_COLON + j] = new Field(x + sizeFields.WIDTH * j,
          y + sizeFields.WIDTH * i, namesOfElements.EMPTY);
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
function Clock(deltaCorner, sumDeltaTime) {
  this.deltaCorner = deltaCorner;
  this.sumDeltaTime = sumDeltaTime;
}
function createStateOfClock() {
  let clock = new Clock(namesOfElements.EMPTY, namesOfElements.EMPTY);
  return clock;
}
function Button(UNMOVED) {
  this.stateOfButton = UNMOVED;
  this.drawButton = function (ctx) {
    let sizeButton = new ButtonSize();
    ctx.strokeStyle = colors.RED;
    ctx.lineWidth = 5;
    if (g_context.button.stateOfButton === statesOfButton.UNMOVED) {
      ctx.fillStyle = colors.KHAKI;
    } else {
      ctx.fillStyle = colors.ORANGE;
    }
    ctx.lineWidth = 2;
    drawRectangle(ctx, sizeButton.X, sizeButton.Y, 460, 100, 1, 0, 0);
    ctx.strokeStyle = colors.RED;
    ctx.fillStyle = colors.RED;
    ctx.font = "bold 30pt Arial";
    ctx.fillText(messages.THE_MESSAGE_OF_NEW_GAME, sizeButton.X + 10, sizeButton.Y + 60);
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
  let amountElementsInRaw = 12;
  let amountOfRaw = 12;
  let x = -50;
  let y = -100;
  let nameElement = namesOfElements.CROSS;
  let animation = new Animation();
  for (let i = 0; i < amountOfRaw; i++) {
    if ((i % 2) === 0) {
      nameElement = namesOfElements.CROSS
    } else {
      nameElement = namesOfElements.NAUGHT
    }
    for (let j = 0; j < amountElementsInRaw; j++) {
      elements[i * amountElementsInRaw + j] = new ElementForAnimation(nameElement,
          x + j * animation.COEFFICIENT * 200 + 100, y + i * animation.COEFFICIENT * 200);
      if (nameElement === namesOfElements.CROSS) {
        nameElement = namesOfElements.NAUGHT
      } else {
        nameElement = namesOfElements.CROSS
      }
    }
  }
  return elements;
}
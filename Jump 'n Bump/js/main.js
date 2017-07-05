const MAX_COUNTER_VALUE = 4;

const smallStair = new SmallStair();
const bigStair = new BigStair();
const colors = new Colors;
const gameMapSize = new GameMapSize();
const canvasSize = new CanvasSize();
const backgroundSize = new BackgroundSize();

let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.resources = [];
let g_world = {}; //для объектов в игровом мире

loadResources();
function loadResources() {
  let resources = [];

  let makeCounter = function () {
    let counter = 0;
    return {
      increment: function () {
        counter += 1;
      },
      value: function () {
        return counter;
      }
    }
  };

  let counter = makeCounter();

  let background = new Image;
  background.src = "image/background.png";
  background.onload = counter.increment();
  resources[counter.value() - 1] = background;

  let firstLand = new Image;
  firstLand.src = "image/firstLand.png";
  firstLand.onload = counter.increment();
  resources[counter.value() - 1] = firstLand;

  let secondLand = new Image;
  secondLand.src = "image/secondLand.png";
  secondLand.onload = counter.increment();
  resources[counter.value() - 1] = secondLand;

  let iceWaterRock = new Image;
  iceWaterRock.src = "image/iceWaterRock.png";
  iceWaterRock.onload = counter.increment();
  resources[counter.value() - 1] = iceWaterRock;

  if ((counter.value()) === MAX_COUNTER_VALUE) {
    g_context.resources = resources;
    g_context.matrixArray = matrix(gameMapSize.ROWS_AMOUNT, gameMapSize.COLUMNS_AMOUNT);
    gameLoop();
  }
}

function matrix(rows, columns) {
  let arr = [];
  for (let i = 0; i < columns; i++) {
    arr[i] = [];
    for (let j = 0; j < rows; j++) {
      arr[i][j] = {};
      arr[i][j].x = i * gameMapSize.CELL_HEIGHT;
      arr[i][j].y = j * gameMapSize.CELL_WIDTH;
    }
  }
  return arr;
}

gameLoop();

//window.requestAnimationFrame(gameLoop);

function gameLoop() {
  let ctx = g_context.ctx;
  let currTime = new Date();
  let prevTime = g_context.prevTime;
  let deltaTime = currTime - prevTime;
  update(deltaTime);
  cleanCanvas(ctx);
  render(ctx);
  requestAnimationFrame(gameLoop);
  g_context.prevTime = currTime;
}
function update() {
}
function cleanCanvas(ctx) {
  ctx.fillStyle = colors.WHITE;
  drawRectangle(ctx, 0, 0, canvasSize.WIDTH, canvasSize.HEIGHT, 1, 0, 0);
}
function render(ctx) {
  let resources = g_context.resources;
  drawBackground(ctx, resources);
  drawGameMap(ctx, resources);
}
function drawBackground(ctx, resources) {
  ctx.drawImage(resources[0], 0, 0, backgroundSize.WIDTH, backgroundSize.HEIGHT,
      0, 0, canvasSize.WIDTH, canvasSize.HEIGHT);
}
function drawGameMap(ctx, resources) {
  let matrixArray = g_context.matrixArray;
  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[4][3].x, matrixArray[4][3].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[4][4].x, matrixArray[4][4].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[5][3].x, matrixArray[5][3].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[5][4].x, matrixArray[5][4].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[6][4].x, matrixArray[6][4].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[1][9].x, matrixArray[1][9].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[2][9].x, matrixArray[2][9].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[3][9].x, matrixArray[3][9].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[15][7].x, matrixArray[15][7].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[16][6].x, matrixArray[16][6].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[16][7].x, matrixArray[16][7].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[17][5].x, matrixArray[17][5].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[17][6].x, matrixArray[17][6].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[17][7].x, matrixArray[17][7].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][4].x, matrixArray[18][4].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][5].x, matrixArray[18][5].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][6].x, matrixArray[18][6].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][7].x, matrixArray[18][7].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[19][4].x, matrixArray[19][4].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[19][5].x, matrixArray[19][5].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[19][6].x, matrixArray[19][6].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[19][7].x, matrixArray[19][7].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[20][4].x, matrixArray[20][4].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[20][5].x, matrixArray[20][5].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[20][6].x, matrixArray[20][6].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[20][7].x, matrixArray[20][7].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[15][12].x, matrixArray[15][12].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[15][13].x, matrixArray[15][13].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[16][13].x, matrixArray[16][13].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[16][14].x, matrixArray[16][14].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[14][12].x, matrixArray[14][12].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[14][13].x, matrixArray[14][13].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[13][12].x, matrixArray[13][12].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[13][13].x, matrixArray[14][13].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[13][14].x, matrixArray[15][14].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[13][15].x, matrixArray[16][15].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[12][12].x, matrixArray[12][12].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[12][13].x, matrixArray[12][13].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[12][14].x, matrixArray[12][14].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[11][12].x, matrixArray[11][12].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[10][13].x, matrixArray[10][13].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[9][14].x, matrixArray[9][14].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[29][17].x, matrixArray[29][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[28][17].x, matrixArray[28][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[27][17].x, matrixArray[27][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[26][17].x, matrixArray[26][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[25][16].x, matrixArray[25][16].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[25][17].x, matrixArray[25][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[24][17].x, matrixArray[24][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], smallStair.X, smallStair.Y, smallStair.REAL_WIDTH, smallStair.REAL_HEIGHT,
      matrixArray[23][17].x, matrixArray[23][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[22][16].x, matrixArray[22][16].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[22][17].x, matrixArray[22][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[21][16].x, matrixArray[21][16].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[21][17].x, matrixArray[21][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[20][16].x, matrixArray[20][16].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[20][17].x, matrixArray[20][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[19][15].x, matrixArray[19][15].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[19][16].x, matrixArray[19][16].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[19][17].x, matrixArray[19][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);

  ctx.drawImage(resources[1], bigStair.FIRST_X, bigStair.FIRST_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][14].x, matrixArray[18][14].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][15].x, matrixArray[18][15].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.SECOND_X, bigStair.SECOND_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][16].x, matrixArray[18][16].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
  ctx.drawImage(resources[1], bigStair.THIRD_X, bigStair.THIRD_Y, bigStair.REAL_WIDTH, bigStair.REAL_HEIGHT,
      matrixArray[18][17].x, matrixArray[18][17].y, gameMapSize.CELL_WIDTH, gameMapSize.CELL_HEIGHT);
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}

function Colors() {
  this.WHITE = "#FFFFFF";
}

function BackgroundSize() {
  this.WIDTH = 1600;
  this.HEIGHT = 900;
}
function SmallStair() {
  this.X = 145;
  this.Y = 95;
  this.REAL_WIDTH = 16;
  this.REAL_HEIGHT = 17;
}
function BigStair() {
  this.FIRST_X = 48;
  this.FIRST_Y = 64;
  this.SECOND_X = 48;
  this.SECOND_Y = 80;
  this.THIRD_X = 48;
  this.THIRD_Y = 94;
  this.REAL_WIDTH = 16;
  this.REAL_HEIGHT = 16;
}

function CanvasSize() {
  this.WIDTH = 1650;
  this.HEIGHT = 900;
}
function GameMapSize() {
  this.ROWS_AMOUNT = 18;
  this.COLUMNS_AMOUNT = 33;
  this.CELL_WIDTH = 50;
  this.CELL_HEIGHT = 50;
}
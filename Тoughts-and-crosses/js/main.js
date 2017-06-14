const KHAKI = "#BDB76B";
const LIGHT_KHAKI = "#EEE8AA";
const DARK_KHAKI = "#8B864E";
const RED = "#EE0000";
const ORANGE = "#FF8C00";

let g_context = {
  example: document.getElementById("example"),
  ctx: document.getElementById("example").getContext("2d"), //g_example.getContext("2d")
  fields: createCoordinatesOfFields(),
  stateOfGame: createStateOfGame()
};

createGame();

document.getElementById("example").onclick = changeField;

function createGame() {
  let ctx = g_context.ctx;
  drawBackground(ctx);
  drawField(ctx, 100, 100);
  drawPlayers(ctx, 850, 450, 1);
}

function changeField(e) {
  const amountOfFields = 9;
  const shift = 200;
  let cursorX = e.pageX;
  let cursorY = e.pageY;
  let ctx = g_context.ctx;
  let fields = g_context.fields;
  let stateOfGame = g_context.stateOfGame;
  for (let i = 0; i < amountOfFields; i++) {
    if ((cursorX > fields[i].x) && (cursorX < fields[i].x + shift) &&
        (cursorY > fields[i].y) && (cursorY < fields[i].y + shift) &&
        (fields[i].presenceOFSymbol === 0)) {
      if (stateOfGame.state === 1) {
        fields[i].presenceOFSymbol = 2;
      } else {
        fields[i].presenceOFSymbol = 1;
      }
      addElement(ctx, stateOfGame, fields[i].x, fields[i].y, fields);
    }
  }
  return fields;
}
function drawBackground(ctx) {
  ctx.strokeStyle = DARK_KHAKI;
  ctx.fillStyle = KHAKI;
  ctx.lineWidth = 1;
  drawRectangle(ctx, 0, 0, 10, 800, 60, 20, 0);
  ctx.fillStyle = LIGHT_KHAKI;
  drawRectangle(ctx, 10, 0, 10, 800, 60, 20, 0);
}
function drawField(ctx, x, y) {
  ctx.lineWidth = 3;
  ctx.fillStyle = DARK_KHAKI;
  drawRectangle(ctx, x, y, 600, 600, 1, 0, 0);
  ctx.strokeStyle = LIGHT_KHAKI;
  drawLine(ctx, x + 200, y, x + 200, y + 600);
  drawLine(ctx, x + 400, y, x + 400, y + 600);
  drawLine(ctx, x, y + 200, x + 600, y + 200);
  drawLine(ctx, x, y + 400, x + 600, y + 400);
}
function drawCross(ctx, x, y) {
  ctx.fillStyle = RED;
  const amountOfCircles = 15;
  const radius = 10;
  const corner = 2;
  for (let i = 0; i < amountOfCircles; i++) {
    drawCircle(ctx, x + i * (radius / 2), y + i * (radius / 2), radius, corner);
    drawCircle(ctx, x - i * (radius / 2), y - i * (radius / 2), radius, corner);
    drawCircle(ctx, x - i * (radius / 2), y + i * (radius / 2), radius, corner);
    drawCircle(ctx, x + i * (radius / 2), y - i * (radius / 2), radius, corner);
  }
}
function drawNaught(ctx, x, y) {
  const bigRadius = 90;
  const smallRadius = 73;
  const corner = 2;
  ctx.fillStyle = RED;
  drawCircle(ctx, x, y, bigRadius, corner);
  ctx.fillStyle = DARK_KHAKI;
  drawCircle(ctx, x, y, smallRadius, corner);
}
function createCoordinatesOfFields() {
  let fields = [];
  fields[0] = new Field(100, 100, 0);
  fields[1] = new Field(300, 100, 0);
  fields[2] = new Field(500, 100, 0);
  fields[3] = new Field(100, 300, 0);
  fields[4] = new Field(300, 300, 0);
  fields[5] = new Field(500, 300, 0);
  fields[6] = new Field(100, 500, 0);
  fields[7] = new Field(300, 500, 0);
  fields[8] = new Field(500, 500, 0);
  return fields
}
function createStateOfGame() {
  stateOfGame = {
    state: 1,
  };
  return stateOfGame
}
function Field(x, y, presenceOFSymbol) {
  this.x = x;
  this.y = y;
  this.presenceOFSymbol = presenceOFSymbol;
}
function drawPlayers(ctx, x, y, player) {
  if (player === 1) {
    ctx.fillStyle = RED;
    drawRectangle(ctx, 840, 440, 220, 100, 1, 0, 0);
    ctx.fillStyle = DARK_KHAKI;
    drawRectangle(ctx, 840, 560, 220, 100, 1, 0, 0);
  } else {
    ctx.fillStyle = DARK_KHAKI;
    drawRectangle(ctx, 840, 440, 220, 100, 1, 0, 0);
    ctx.fillStyle = RED;
    drawRectangle(ctx, 840, 560, 220, 100, 1, 0, 0);
  }
  ctx.fillStyle = DARK_KHAKI;
  ctx.strokeStyle = ORANGE;
  drawRectangle(ctx, x, y, 200, 80, 2, 0, 120);
  ctx.fillStyle = ORANGE;
  ctx.font = "bold 30pt Arial";
  ctx.fillText("Игрок 1", 880, 500);
  ctx.fillText("Игрок 2", 880, 620);
}
function addElement(ctx, stateOfGame, x, y, fields) {
  const shift = 200;
  if (stateOfGame.state === 1) {
    drawCross(ctx, x + shift / 2, y + shift / 2);
    stateOfGame.state = 2;
    drawPlayers(ctx, 850, 450, stateOfGame.state);
  } else {
    drawNaught(ctx, x + shift / 2, y + shift / 2);
    stateOfGame.state = 1;
    drawPlayers(ctx, 850, 450, stateOfGame.state);
  }
  checkTheWinner(fields, stateOfGame.state);
  return stateOfGame;
}
function checkTheWinner(fields, state) {
  if (((fields[0].presenceOFSymbol === state) && (fields[1].presenceOFSymbol === state) &&
      (fields[2].presenceOFSymbol === state)) ||
      ((fields[3].presenceOFSymbol === state) && (fields[4].presenceOFSymbol === state) &&
      (fields[5].presenceOFSymbol === state)) ||
      ((fields[6].presenceOFSymbol === state) && (fields[7].presenceOFSymbol === state) &&
      (fields[8].presenceOFSymbol === state)) ||
      ((fields[0].presenceOFSymbol === state) && (fields[3].presenceOFSymbol === state) &&
      (fields[6].presenceOFSymbol === state)) ||
      ((fields[1].presenceOFSymbol === state) && (fields[4].presenceOFSymbol === state) &&
      (fields[7].presenceOFSymbol === state)) ||
      ((fields[3].presenceOFSymbol === state) && (fields[5].presenceOFSymbol === state) &&
      (fields[8].presenceOFSymbol === state)) ||
      ((fields[0].presenceOFSymbol === state) && (fields[4].presenceOFSymbol === state) &&
      (fields[8].presenceOFSymbol === state)) ||
      ((fields[2].presenceOFSymbol === state) && (fields[4].presenceOFSymbol === state) &&
      (fields[6].presenceOFSymbol === state))) {
    let message;
    if (state === 1) {
      state = 2
    } else {
      state = 1
    }
    message = 'Выиграл ' + state + " игрок!";
    alert(message);
    setTimeout(askAboutNewGame, 1000);
  }
}
function askAboutNewGame() {
  if (confirm("Хотите начать новую игру?")) {
    g_context.ctx = document.getElementById("example").getContext("2d");
    g_context.fields = createCoordinatesOfFields();
    g_context.stateOfGame = createStateOfGame();
    createGame()
  }
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
function drawLine(ctx, firstX, firstY, lastX, lastY) {
  ctx.beginPath();
  ctx.moveTo(firstX, firstY);
  ctx.lineTo(lastX, lastY);
  ctx.closePath();
  ctx.stroke();
}
function drawCircle(ctx, x, y, r, corner) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, corner * Math.PI, false);
  ctx.closePath();
  ctx.fill();
}
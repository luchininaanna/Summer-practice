const GRAY = "#A9A9A9";
const WHITE = "#FFFFFF";

let prevTime = new Date();
let Clouds = initialCoordinatesOfClouds();

window.webkitRequestAnimationFrame(gameLoop);

function gameLoop() {
  let example = document.getElementById("example");
  let ctx = example.getContext("2d");
  let currTime = new Date();
  let deltaTime = currTime - prevTime;
  createThePositionOfObjects(deltaTime);
  cleanCanvas(ctx);
  createObjectWithNewCoordinates(ctx);
  document.getElementById("example").onclick = deleteCloud();
  requestAnimationFrame(gameLoop);
  prevTime = currTime
}

function createThePositionOfObjects(deltaTime) {
  let lengthOfClouds = Clouds.length;
  for (let i = 0; i < lengthOfClouds; i++) {
    let deltaXLeft = 5;
    let deltaXRight = 40;
    let deltaYLeft = 10;
    let deltaYRight = 20;
    Clouds[i].x = Clouds[i].x + deltaTime * 0.005;
    Clouds[i].xLeft = Clouds[i].x - deltaXLeft;
    Clouds[i].xRight = Clouds[i].x + deltaXRight;
    Clouds[i].yUp = Clouds[i].y - deltaYLeft;
    Clouds[i].yDown = Clouds[i].y + deltaYRight;
  }
}
function cleanCanvas(ctx) {
  ctx.fillStyle = WHITE;
  drawRectangle(ctx, 0, 0, 1200, 800, 1, 0, 0)
}
function createObjectWithNewCoordinates(ctx) {
  let lengthOfClouds = Clouds.length;
  for (let i = 0; i < lengthOfClouds; i++) {
    drawCloud(ctx, Clouds[i].x, Clouds[i].y)
  }
}

function initialCoordinatesOfClouds() {
  let Clouds = [];
  Clouds[0] = {
    "x": 50,
    "y": 50,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[1] = {
    "x": 250,
    "y": 120,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[2] = {
    "x": 50,
    "y": 190,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[3] = {
    "x": 450,
    "y": 10,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[4] = {
    "x": 500,
    "y": 150,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[5] = {
    "x": 800,
    "y": 150,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[6] = {
    "x": 950,
    "y": 50,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[7] = {
    "x": 750,
    "y": 0,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[8] = {
    "x": -950,
    "y": 50,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[9] = {
    "x": -750,
    "y": 120,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[10] = {
    "x": -950,
    "y": 190,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[11] = {
    "x": -550,
    "y": 10,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[12] = {
    "x": -500,
    "y": 150,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[13] = {
    "x": -200,
    "y": 150,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  Clouds[14] = {
    "x": -250,
    "y": 0,
    "xLeft": 0,
    "xRight": 0,
    "yUp": 0,
    "yDown": 0
  };
  let lengthOfClouds = Clouds.length;
  for (let i = 0; i < lengthOfClouds; i++) {
    let deltaXLeft = 10;
    let deltaXRight = 150;
    let deltaYUp = 10;
    let deltaYDown = 100;
    Clouds[i].xLeft = Clouds[i].x - deltaXLeft;
    Clouds[i].xRight = Clouds[i].x + deltaXRight;
    Clouds[i].yUp = Clouds[i].y - deltaYUp;
    Clouds[i].yDown = Clouds[i].y + deltaYDown
  }
  return Clouds
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
function drawCloud(ctx, x, y) {
  ctx.fillStyle = GRAY;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 30, y - 45, x + 75, y - 10);
  ctx.quadraticCurveTo(x + 120, y - 40, x + 140, y);
  ctx.quadraticCurveTo(x + 170, y - 10, x + 190, y + 30);
  ctx.quadraticCurveTo(x + 190, y + 70, x + 150, y + 60);
  ctx.quadraticCurveTo(x + 130, y + 100, x + 90, y + 80);
  ctx.quadraticCurveTo(x + 130, y + 100, x + 90, y + 80);
  ctx.quadraticCurveTo(x + 50, y + 90, x + 30, y + 60);
  ctx.quadraticCurveTo(x - 20, y + 60, x, y);

  ctx.closePath();
  ctx.fill();
}

function deleteCloud() {
  let cursorX;
  let cursorY;
  document.onmousemove = function (e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
    console.log(cursorX, cursorY);
    let lengthOfClouds = Clouds.length;
    for (let i = 0; i < lengthOfClouds; i++) {
      console.log("element");
      if ((cursorX > Clouds[i].xLeft) && (cursorX < Clouds[i].xRight) &&
          (cursorY > Clouds[i].yUp) && (cursorY < Clouds[i].yDown)) {
        console.log("element for removing");
        removed = Clouds.splice(i, 1);
        i--;
        lengthOfClouds--;
      }
    }
  }
}
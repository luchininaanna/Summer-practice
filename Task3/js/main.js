let example = document.getElementById("example");
let ctx = example.getContext("2d");
const BLUE = "#87CEFA";
const GREEN = "#228B22";
const ORANGE = "#FF4500";
const DARK_BROWN = "#8B4513";
const LIGHT_BROWN = "#A0522D";
const LIGHT_BLUE = "#AFEEEE";
const RED = "#8B0000";
const BLACK = "#000000";
const YELLOW = "#FFD700";
const NAVY = "#000080";
const LIGHT_GRAY = "#AFEEEE";
const GRAY = "#A9A9A9";
const DARK_GRAY = "#808080";
const WHITE = "#FFFFFF";

gameLoop();

function gameLoop(){
  memorizeThePositionOfObjects();
  cleanCanvas();
  createObjectWithNewCoordinates();
}

function memorizeThePositionOfObjects(){

}
function cleanCanvas(){
  ctx.fillStyle = WHITE;
  drawRectangle(0, 0, 1200, 800, 1, 0, 0)
}
function createObjectWithNewCoordinates();


drawSky();
drawGrass();
drawFence();
drawHouse();
drawSun();

function drawHouse() {
  drawBase();
  drawRoofs();
  function drawBase() {
    drawLog();
    drawWindows();
    function drawLog() {
      drawDarkLog();
      drawLightLog();
      function drawDarkLog() {
        ctx.fillStyle = DARK_BROWN;
        drawRectangle(10, 80, 45, 3, 11, 0, 3);
      }

      function drawLightLog() {
        ctx.fillStyle = LIGHT_BROWN;
        drawRectangle(55, 80, 25, 3, 11, 0, 3);
        drawRectangle(55, 88, 45, 25, 1, 0, 0);
        drawRectangle(100, 88, 15, 25, 1, 0, 0);
        ctx.fillStyle = NAVY;
        drawRectangle(65, 96, 23, 2, 8, 0, 2);
      }
    }

    function drawWindows() {
      drawGlass();
      drawFrame();
      function drawGlass() {
        ctx.fillStyle = LIGHT_BLUE;
        drawRectangle(16, 85, 13, 18, 2, 20, 0);
      }

      function drawFrame() {

      }
    }
  }

  function drawRoofs() {
    drawBigRoof();
    drawSmallRoof();
    drawChimney();
    function drawBigRoof() {
      drawBigRoofBase();
      drawBigRoofContour();
      function drawBigRoofBase() {
        ctx.fillStyle = RED;
        drawTriangle(8, 80, 50, 22);
        ctx.beginPath();
        ctx.moveTo(28, 58);
        ctx.lineTo(58, 81);
        ctx.lineTo(83, 81);
        ctx.lineTo(55, 58);
        ctx.fill();
      }

      function drawBigRoofContour() {
        ctx.fillStyle = BLACK;
        drawLine(28, 58, 58, 81);
        drawLine(57, 80, 82, 80);
        drawLine(83, 81, 55, 58);
        drawLine(55, 58, 28, 58);
        drawLine(8, 80, 57, 80);
        drawLine(8, 80, 28, 58);
      }
    }

    function drawSmallRoof() {
      drawSmallRoofBase();
      drawSmallRoofContour();
      function drawSmallRoofBase() {
        ctx.fillStyle = RED;
        ctx.beginPath();
        ctx.moveTo(55, 90);
        ctx.lineTo(55, 80);
        ctx.lineTo(100, 90);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(100, 90);
        ctx.lineTo(55, 80);
        ctx.lineTo(82, 80);
        ctx.lineTo(116, 89);
        ctx.fill();
      }

      function drawSmallRoofContour() {
        ctx.fillStyle = BLACK;
        drawLine(55, 90, 55, 80);
        drawLine(55, 80, 100, 90);
        drawLine(100, 90, 55, 90);
        drawLine(100, 90, 55, 80);
        drawLine(55, 80, 82, 80);
        drawLine(82, 80, 116, 89);
        drawLine(116, 89, 100, 90);
      }
    }

    function drawChimney() {
      ctx.fillStyle = BLACK;
      ctx.beginPath();
      ctx.moveTo(50, 65);
      ctx.lineTo(60, 72);
      ctx.lineTo(60, 53);
      ctx.lineTo(50, 53);
      ctx.fill();
    }
  }
}
function drawSky() {
  ctx.fillStyle = BLUE;
  ctx.fillRect(0, 0, 400, 90);
}
function drawGrass() {
  ctx.fillStyle = GREEN;
  ctx.fillRect(0, 90, 400, 70);
}
function drawFence() {
  drawBackFence();
  drawFrontFence();
  function drawBackFence() {
    ctx.fillStyle = ORANGE;
    drawRectangle(0, 89, 3, 8, 120, 3, 0);
  }

  function drawFrontFence() {
    ctx.fillStyle = ORANGE;
    drawRectangle(0, 125, 7, 23, 43, 7, 0);
  }
}
function drawSun() {
  ctx.fillStyle = YELLOW;
  drawCircle(260, 15, 10, 2 * Math.PI);
}
function drawDog() {
  drawEars();
  drawTail();
  drawBase();
  drawFase();
  drawLegs();
  function drawEars() {
    ctx.fillStyle = BLACK;
    drawCircle(183, 96, 2, 2);
    drawCircle(184, 95, 1, 2);
    drawCircle(176, 96, 2, 2);
    drawCircle(175, 95, 1, 2);
  }

  function drawTail() {
    ctx.fillStyle = BLACK;
    drawCircle(185, 111, 2, 2);
    drawCircle(186, 110, 2, 2);
    drawCircle(187, 109, 2, 2);
    drawCircle(188, 108, 2, 2);
    drawCircle(188, 107, 2, 2);
    drawCircle(189, 107, 2, 2);
    drawCircle(190, 106, 2, 2);
  }

  function drawBase() {
    ctx.fillStyle = GRAY;
    drawCircle(180, 100, 5, 2);
    drawCircle(180, 110, 7, 2);
  }

  function drawFase() {
    ctx.fillStyle = BLACK;
    drawCircle(178, 99, 1, 2);
    drawCircle(182, 99, 1, 2);
    drawCircle(180, 102, 1, 2);
    drawCircle(176, 115, 2, 2);
    drawCircle(184, 115, 2, 2);
  }

  function drawLegs() {
    ctx.fillStyle = DARK_GRAY;
    drawCircle(178, 106, 2, 2);
    drawCircle(178, 107, 2, 2);
    drawCircle(178, 108, 2, 2);
    drawCircle(178, 109, 2, 2);
    drawCircle(178, 111, 2, 2);
    drawCircle(178, 112, 2, 2);
    drawCircle(178, 113, 2, 2);
    drawCircle(178, 114, 2, 2);
    drawCircle(178, 115, 2, 2);
    drawCircle(178, 116, 2, 2);
    drawCircle(182, 106, 2, 2);
    drawCircle(182, 107, 2, 2);
    drawCircle(182, 108, 2, 2);
    drawCircle(182, 109, 2, 2);
    drawCircle(182, 111, 2, 2);
    drawCircle(182, 112, 2, 2);
    drawCircle(182, 113, 2, 2);
    drawCircle(182, 114, 2, 2);
    drawCircle(182, 115, 2, 2);
    drawCircle(182, 116, 2, 2);
  }
}

let x = 0;
let y = 15;
function doAnimationOfCloudsGoRight() {
  ctx.fillStyle = BLUE;
  ctx.fillRect(0, 0, 400, 53);
  ctx.fillRect(100, 30, 400, 50);
  drawSun();
  drawCloud(x - 130, y + 23);
  drawCloud(x - 150, y - 10);
  drawCloud(x - 180, y + 5);
  drawCloud(x - 100, y);
  drawCloud(x - 60, y - 5);
  drawCloud(x - 70, y + 20);
  drawCloud(x, y);
  drawCloud(x + 40, y + 20);
  drawCloud(x + 190, y + 15);
  drawCloud(x + 140, y + 45);
  drawCloud(x + 100, y + 40);
  drawCloud(x + 90, y - 5);
  x += 1;
  if (x < 190) {
    window.requestAnimationFrame(doAnimationOfCloudsGoRight);
  }
  if (x === 190) {
    doAnimationOfCloudsGoLeft();
    function doAnimationOfCloudsGoLeft() {
      x--;
      window.requestAnimationFrame(doAnimationOfCloudsGoLeft);
      if (x === 10) {
        doAnimationOfCloudsGoRight();
      }
    }
  }
}
doAnimationOfCloudsGoRight();

let m = 55;
let l = 65;
function doSmoke() {
  let step = 18;
  let amountOfCirclesOfSmoke = 50;
  ctx.fillStyle = GRAY;
  for (let i = 0; i < amountOfCirclesOfSmoke; i++) {
    drawCircle(m, l + i * step, 4, 2);
  }
  drawGrass();
  drawFence();
  drawHouse();
  drawDog();
  l--;
  window.requestAnimationFrame(doSmoke);
}
doSmoke();


function drawRectangle(x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
function drawTriangle(x, y, stepX, stepY) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + stepX, y);
  ctx.lineTo((x + stepX) / 2, y - stepY);
  ctx.fill();
}
function drawLine(firstX, firstY, lastX, lastY) {
  ctx.beginPath();
  ctx.moveTo(firstX, firstY);
  ctx.lineTo(lastX, lastY);
  ctx.closePath();
  ctx.stroke();
}
function drawCircle(x, y, r, corner) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, corner * Math.PI, false);
  ctx.closePath();
  ctx.fill();
}
function drawCloud(x, y) {
  ctx.fillStyle = LIGHT_GRAY;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 4, y - 5, x + 15, y);
  ctx.quadraticCurveTo(x + 16, y - 2, x + 22, y - 1);
  ctx.quadraticCurveTo(x + 25, y - 4, x + 29, y - 1);
  ctx.quadraticCurveTo(x + 35, y, x + 35, y + 5);
  ctx.quadraticCurveTo(x + 31, y + 13, x + 20, y + 10);
  ctx.quadraticCurveTo(x + 15, y + 13, x + 10, y + 8);
  ctx.quadraticCurveTo(x + 5, y + 13, x + 1, y + 7);
  ctx.quadraticCurveTo(x + 3, y + 14, x, y);
  ctx.closePath();
  ctx.fill();
}
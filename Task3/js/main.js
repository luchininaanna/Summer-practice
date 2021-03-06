const DARK_GRAY = "#696969";
const GRAY = "#A9A9A9";
const WHITE = "#FFFFFF";
const BLUE = "#87CEEB";
const LIGHT_BLUE = "#B0E0E6";
const GREEN = "#228B22";
const DARK_GREEN = "#006400";
const YELLOW = "#FFD700";
const LIGHT_YELLOW = "#DAA520";
const ORANGE = "#FF4500";
const RED = "#800000";
const DARK_BROWN = "#8B4513";
const LIGHT_BROWN = "#A0522D";
const NAVY = "#000080";
const DARK_BLUE = "#191970";
const BLACK = "#000000";

const WIDTH_OF_CLOUD = 200;
const HEIGHT_OF_CLOUD = 100;


let g_context = {
  ctx: document.getElementById("example").getContext("2d"),
  prevTime: new Date(),
  clouds: initialCoordinatesOfClouds(),
  smoke: initialCoordinatesOfSmoke(),
  sun: initialCoordinatesOfSun(),
  stateOfPicture: initialStateOfPicture(),
};

window.requestAnimationFrame(gameLoop);

document.getElementById("example").onclick = deleteCloud;

function gameLoop() {
  let currTime = new Date();
  let prevTime = g_context.prevTime;
  let deltaTime = currTime - prevTime;
  let ctx = g_context.ctx;
  let clouds = g_context.clouds;
  let smoke = g_context.smoke;
  let sun = g_context.sun;
  updateTheCoordinates(deltaTime, clouds, smoke, sun);
  cleanCanvas(ctx);
  drawObjectWithNewCoordinates(ctx, clouds, smoke, sun);
  requestAnimationFrame(gameLoop);
  g_context.prevTime = currTime;
}

function updateTheCoordinates(deltaTime, clouds, smoke, sun) {
  let lengthOfClouds = clouds.length;
  for (let i = 0; i < lengthOfClouds; i++) {
    const v = 0.005;
    clouds[i].x = clouds[i].x + deltaTime * v;
  }
  let lengthOfSmoke = smoke.length;
  for (let i = 0; i < lengthOfSmoke; i++) {
    const v = 0.05;
    smoke[i].y = smoke[i].y - deltaTime * v;
  }
  let v = 0.09;
  if (sun.x < 1500) {
    sun.x = sun.x + deltaTime * v;
    if (sun.x <= 600) {
      sun.y = (((sun.x - 600) * (sun.x - 600)) / (2400)) + 100;
    } else {
      sun.y = (((sun.x - 600) * (sun.x - 600)) / (2400)) + 100;
    }
  } else {
    sun.x = -300;
  }
}
function cleanCanvas(ctx) {
  ctx.fillStyle = WHITE;
  drawRectangle(ctx, 0, 0, 1200, 800, 1, 0, 0)
}
function drawObjectWithNewCoordinates(ctx, clouds, smoke, sun) {
  checkTimesOfDay(sun);
  let timesOfDay = g_context.stateOfPicture.timesOfDay;
  drawSky(ctx, timesOfDay);
  drawSun(ctx, sun.x, sun.y);
  drawBackFence(ctx);
  drawClouds(ctx, clouds);
  drawSmoke(ctx, smoke);
  drawGrass(ctx, timesOfDay);
  drawDog(ctx, 900, 520);
  drawFrontFence(ctx);
  drawHouse(ctx, 10, 400, timesOfDay);
}

function drawClouds(ctx, clouds) {
  let lengthOfClouds = clouds.length;
  for (let i = 0; i < lengthOfClouds; i++) {
    drawCloud(ctx, clouds[i].x, clouds[i].y)
  }
}
function drawSmoke(ctx, smoke) {
  ctx.fillStyle = DARK_GRAY;
  let lengthOfSmoke = smoke.length;
  for (let i = 0; i < lengthOfSmoke; i++) {
    drawCircle(ctx, 310, smoke[i].y, 25, 2);
    if (smoke[i].y < -20) {
      if (i > 0) {
        smoke[i].y = smoke[i - 1].y + 100;
      } else {
        smoke[i].y = smoke[i + 3].y + 100;
      }
    }
  }
}

function checkTimesOfDay(sun) {
  let timesOfDay;
  if ((sun.x < -50) || (sun.x > 1250)) {
    timesOfDay = "night";
  } else {
    timesOfDay = "day";
  }
  g_context.stateOfPicture.timesOfDay = timesOfDay;
}

function initialCoordinatesOfClouds() {
  let clouds = [];
  clouds[0] = {
    "x": 50,
    "y": 50,
  };
  clouds[1] = {
    "x": 250,
    "y": 120,
  };
  clouds[2] = {
    "x": 50,
    "y": 190,
  };
  clouds[3] = {
    "x": 450,
    "y": 10,
  };
  clouds[4] = {
    "x": 500,
    "y": 150,
  };
  clouds[5] = {
    "x": 800,
    "y": 150,
  };
  clouds[6] = {
    "x": 950,
    "y": 50,
  };
  clouds[7] = {
    "x": 750,
    "y": 0,
  };
  return clouds;
}
function initialCoordinatesOfSmoke() {
  let smoke = [];
  let amountSmoke = 4;
  let step = 100;
  for (let i = 0; i < amountSmoke; i++) {
    smoke[i] = {
      "y": 300 + i * step,
    }
  }
  return smoke;
}
function initialCoordinatesOfSun() {
  sun = {
    "x": -300,
    "y": 0,
  };
  return sun;
}
function initialStateOfPicture() {
  stateOfPicture = {
    "timesOfDay": "day",
  };
  return stateOfPicture
}

function drawSky(ctx, timesOfDay) {
  if (timesOfDay === "night") {
    ctx.fillStyle = DARK_BLUE;
  } else {
    ctx.fillStyle = BLUE;
  }
  ctx.fillRect(0, 0, 1200, 500);
}
function drawGrass(ctx, timesOfDay) {
  if (timesOfDay === "night") {
    ctx.fillStyle = DARK_GREEN;
  } else {
    ctx.fillStyle = GREEN;
  }
  ctx.fillRect(0, 500, 1200, 800);
}
function drawSun(ctx, x, y) {
  ctx.fillStyle = YELLOW;
  drawCircle(ctx, x, y, 50, 2 * Math.PI);
}
function drawBackFence(ctx) {
  ctx.fillStyle = ORANGE;
  drawRectangle(ctx, 0, 440, 15, 60, 80, 15, 0);
}
function drawFrontFence(ctx) {
  ctx.fillStyle = ORANGE;
  drawRectangle(ctx, 0, 660, 35, 140, 35, 35, 0);
}
function drawHouse(ctx, x, y, timesOfDay) {
  drawBase(ctx, x, y, timesOfDay);
  drawRoofs(ctx, x, y);
}
function drawBase(ctx, x, y, timesOfDay) {
  drawLog(ctx, x, y);
  drawWindows(ctx, x, y, timesOfDay);
}
function drawLog(ctx, x, y) {
  drawDarkLog(ctx, x, y);
  drawLightLog(ctx, x, y);
}
function drawDarkLog(ctx, x, y) {
  ctx.fillStyle = DARK_BROWN;
  drawRectangle(ctx, x, y, 290, 10, 25, 0, 10);
}
function drawLightLog(ctx, x, y) {
  ctx.fillStyle = LIGHT_BROWN;
  drawRectangle(ctx, x + 290, y, 150, 10, 25, 0, 10);
  drawRectangle(ctx, x + 290, y + 100, 250, 150, 1, 0, 0);
  drawRectangle(ctx, x + 540, y + 100, 90, 150, 1, 0, 0);
  ctx.fillStyle = NAVY;
  drawRectangle(ctx, x + 330, y + 130, 170, 105, 8, 0, 2);
}
function drawWindows(ctx, x, y, timesOfDay) {
  drawGlass(ctx, x, y, timesOfDay);
  drawFrame(ctx, x, y);
}
function drawGlass(ctx, x, y, timesOfDay) {
  ctx.fillStyle = NAVY;
  ctx.lineWidth = 3;
  drawRectangle(ctx, x + 30, y + 60, 110, 140, 2, 120, 0);
  if (timesOfDay === "night") {
    ctx.fillStyle = LIGHT_YELLOW;
  } else {
    ctx.fillStyle = LIGHT_BLUE;
  }
  drawRectangle(ctx, x + 40, y + 70, 90, 120, 2, 120, 0);
}
function drawFrame(ctx, x, y) {
  ctx.fillStyle = BLACK;
  drawLine(ctx, x + 85, y + 70, x + 85, y + 190);
  drawLine(ctx, x + 205, y + 70, x + 205, y + 190);
  drawLine(ctx, x + 40, y + 110, x + 130, y + 110);
  drawLine(ctx, x + 160, y + 110, x + 250, y + 110);
}
function drawRoofs(ctx, x, y) {
  drawBigRoof(ctx, x, y);
  drawSmallRoof(ctx, x, y);
  drawChimney(ctx, x, y);
}
function drawBigRoof(ctx, x, y) {
  drawBigRoofBase(ctx, x, y);
  drawBigRoofContour(ctx, x, y);
}
function drawBigRoofBase(ctx, x, y) {
  ctx.fillStyle = RED;
  drawTriangle(ctx, x, y, 290, 120);
  ctx.beginPath();
  ctx.moveTo(x + 290, y);
  ctx.lineTo(x + 440, y);
  ctx.lineTo(x + 295, y - 120);
  ctx.lineTo(x + 140, y - 120);
  ctx.fill();
}
function drawBigRoofContour(ctx, x, y) {
  ctx.fillStyle = BLACK;
  drawLine(ctx, x, y, x + 290, y);
  drawLine(ctx, x + 290, y, x + 140, y - 120);
  drawLine(ctx, x + 140, y - 120, x, y);

  drawLine(ctx, x + 290, y, x + 440, y);
  drawLine(ctx, x + 440, y, x + 295, y - 120);
  drawLine(ctx, x + 295, y - 120, x + 140, y - 120);
  drawLine(ctx, x + 140, y - 120, x + 290, y);
}
function drawSmallRoof(ctx, x, y) {
  drawSmallRoofBase(ctx, x, y);
  drawSmallRoofContour(ctx, x, y);
}
function drawSmallRoofBase(ctx, x, y) {
  ctx.fillStyle = RED;
  ctx.beginPath();
  ctx.moveTo(x + 290, y);
  ctx.lineTo(x + 290, y + 100);
  ctx.lineTo(x + 530, y + 100);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 530, y + 100);
  ctx.lineTo(x + 630, y + 100);
  ctx.lineTo(x + 440, y);
  ctx.lineTo(x + 290, y);
  ctx.fill();
}
function drawSmallRoofContour(ctx, x, y) {
  ctx.fillStyle = BLACK;
  drawLine(ctx, x + 290, y, x + 290, y + 100);
  drawLine(ctx, x + 290, y + 100, x + 530, y + 100);
  drawLine(ctx, x + 530, y + 100, x + 290, y);
  drawLine(ctx, x + 530, y + 100, x + 630, y + 100);
  drawLine(ctx, x + 630, y + 100, x + 440, y);
  drawLine(ctx, x + 440, y, x + 290, y);
  drawLine(ctx, x + 290, y, x + 530, y + 100);
}
function drawChimney(ctx, x, y) {
  ctx.fillStyle = BLACK;
  ctx.beginPath();
  ctx.moveTo(x + 270, y - 70);
  ctx.lineTo(x + 270, y - 160);
  ctx.lineTo(x + 330, y - 160);
  ctx.lineTo(x + 330, y - 25);
  ctx.fill();
}
function drawDog(ctx, x, y) {
  drawEars(ctx, x, y);
  drawTail(ctx, x, y);
  drawBaseOfDog(ctx, x, y);
  drawFace(ctx, x, y);
  drawLegs(ctx, x, y);
}
function drawEars(ctx, x, y) {
  ctx.fillStyle = BLACK;
  drawCircle(ctx, x - 20, y - 25, 10, 2);
  drawCircle(ctx, x + 20, y - 25, 10, 2);
}
function drawTail(ctx, x, y) {
  ctx.fillStyle = BLACK;
  drawCircle(ctx, x + 37, y + 38, 10, 2);
  drawCircle(ctx, x + 39, y + 36, 10, 2);
  drawCircle(ctx, x + 41, y + 34, 10, 2);
  drawCircle(ctx, x + 43, y + 32, 10, 2);
}
function drawBaseOfDog(ctx, x, y) {
  ctx.fillStyle = DARK_GRAY;
  drawCircle(ctx, x, y, 30, 2);
  drawCircle(ctx, x, y + 60, 45, 2);
}
function drawFace(ctx, x, y) {
  ctx.fillStyle = BLACK;
  drawCircle(ctx, x - 10, y - 10, 5, 5);
  drawCircle(ctx, x + 10, y - 10, 5, 5);
  ctx.fillStyle = RED;
  drawCircle(ctx, x + 5, y + 15, 5, 2);
  ctx.fillStyle = BLACK;
  drawCircle(ctx, x, y + 10, 7, 2);
}
function drawLegs(ctx, x, y) {
  ctx.fillStyle = BLACK;
  let i = 40;
  for (i; i < 100; i++) {
    drawCircle(ctx, x - 15, y + i, 8, 2);
    drawCircle(ctx, x + 15, y + i, 8, 2);
  }
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
function drawCircle(ctx, x, y, r, corner) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, corner * Math.PI, false);
  ctx.closePath();
  ctx.fill();
}
function drawLine(ctx, firstX, firstY, lastX, lastY) {
  ctx.beginPath();
  ctx.moveTo(firstX, firstY);
  ctx.lineTo(lastX, lastY);
  ctx.closePath();
  ctx.stroke();
}
function drawTriangle(ctx, x, y, stepX, stepY) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + stepX, y);
  ctx.lineTo(x + (stepX / 2) - 2, y - stepY);
  ctx.fill();
}
function drawCloud(ctx, x, y) {
  ctx.fillStyle = GRAY;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.quadraticCurveTo(x + 30, y - 10, x + 75, y + 10);
  ctx.quadraticCurveTo(x + 100, y - 10, x + 140, y + 10);
  ctx.quadraticCurveTo(x + 170, y - 10, x + 190, y + 30);
  ctx.quadraticCurveTo(x + 190, y + 70, x + 150, y + 70);
  ctx.quadraticCurveTo(x + 130, y + 100, x + 90, y + 80);
  ctx.quadraticCurveTo(x + 130, y + 100, x + 90, y + 80);
  ctx.quadraticCurveTo(x + 60, y + 90, x + 40, y + 60);
  ctx.quadraticCurveTo(x - 5, y + 30, x, y);
  ctx.closePath();
  ctx.fill();
}
function deleteCloud(e) {
  let clouds = g_context.clouds;
  let cursorX;
  let cursorY;
  cursorX = e.pageX;
  cursorY = e.pageY;
  let lengthOfClouds = clouds.length;
  let found = 0;
  for (let i = 0; i < lengthOfClouds; i++) {
    if ((cursorX > clouds[i].x) && (cursorX < (clouds[i].x + WIDTH_OF_CLOUD)) &&
        (cursorY > clouds[i].y) && (cursorY < (clouds[i].y + HEIGHT_OF_CLOUD)) &&
        (found === 0)) {
      found = 1;
      removed = clouds.splice(i, 1);
      i--;
      lengthOfClouds--;
    }
  }
  if (clouds.length < 1) {
    setTimeout(createRandomClouds, 3000);
  }
}
function createRandomClouds() {
  let clouds = g_context.clouds;
  let maxX = 950;
  let minX = 50;
  let maxY = 190;
  let minY = 10;
  let amountOfClouds = 8;
  for (let i = 0; i < amountOfClouds; i++) {
    clouds[i] = {
      "x": Math.floor(Math.random() * (maxX - minX + 1)) + minX,
      "y": Math.floor(Math.random() * (maxY - minY + 1)) + minY,
    };
  }
  g_context.clouds = clouds;
}
let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.resources = [];

loadResources();

function World() {
  this.objects = createObjects();
  this.players = createPlayers();
  this.update = function (deltaTime) {
    addEventListener("keydown", findDirection);
    updatePlayersCoordinates(this.players, deltaTime);
  };
  this.clean = function (ctx) {
    ctx.fillStyle = colors.WHITE;
    drawRectangle(ctx, 0, 0, canvasSize.WIDTH, canvasSize.HEIGHT, 1, 0, 0);
  };
  this.render = function (ctx) {
    let gameWorldObjects = this.objects;
    drawObjects(ctx, gameWorldObjects);
    let players = this.players;
    drawObjects(ctx, players);
  };
}
let g_world = new World();

function gameLoop() {
  let ctx = g_context.ctx;
  let currTime = new Date();
  let prevTime = g_context.prevTime;
  let deltaTime = currTime - prevTime;

  g_world.update(deltaTime);
  g_world.clean(ctx);
  g_world.render(ctx);

  requestAnimationFrame(gameLoop);
  g_context.prevTime = currTime;
}

function drawObjects(ctx, gameWorldObjects) {
  if (gameWorldObjects) {
    for (let key in gameWorldObjects) {
      drawObject(ctx, gameWorldObjects[key]);
    }
  }
}
function drawObject(ctx, object) {
  ctx.drawImage(object.source, object.image_x, object.image_y, object.image_width, object.image_height,
      object.x, object.y, object.width, object.height);
}

function updatePlayersCoordinates(players, deltaTime) {
  if (players) {
    for (let key in players) {
      updatePlayerCoordinates(players, players[key], deltaTime);
    }
  }
  return players;
}
function updatePlayerCoordinates(players, player, deltaTime) {
  if (player.rightMove === 1) {
    let updatedX = player.x + player.speed * deltaTime;
    let freeSpace = checkOthersPlayers(player, updatedX, players);
    console.log(freeSpace);
    if ((updatedX > 0) && (updatedX < canvasSize.WIDTH - player.width) && (freeSpace)) {
      player.x = updatedX;
    }
    player.rightMove = 0;
  }

  if (player.leftMove === 1) {
    let updatedX = player.x - player.speed * deltaTime;
    let freeSpace = checkOthersPlayers(player, updatedX, players);
    console.log(freeSpace);
    if ((updatedX > 0) && (updatedX < canvasSize.WIDTH - player.width) && (freeSpace)) {
      player.x = updatedX;
    }
    player.leftMove = 0;
  }

  if (player.upMove === 1) {
    let updatedY;
    let deltaJump;
    if (player.presentValueJumpHeight < player.jumpHeight) {
      updatedY = player.y - player.speed * deltaTime;
      deltaJump = player.presentValueJumpHeight - (updatedY - player.y);
      player.presentValueJumpHeight = deltaJump;
      console.log(player.presentValueJumpHeight);
    } else {
      player.downMove = 1;
      player.upMove = 0;
    }
    player.y = updatedY;
  }
}

function checkOthersPlayers(player, updatedX, players) {
  if (players) {
    for (let key in players) {
      if (players[key] != player) {
        let otherPlayer = players[key];
        if ((((updatedX + player.width - player.rightFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
            && ((updatedX + player.width - player.rightFreeSpace) < (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace))) ||
            (((updatedX + player.leftFreeSpace) > (otherPlayer.x + otherPlayer.leftFreeSpace))
            && ((updatedX + player.leftFreeSpace) < (otherPlayer.x + otherPlayer.width -
            otherPlayer.rightFreeSpace)))) {
          return false;
        }
      }
    }
  }
  return true;
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
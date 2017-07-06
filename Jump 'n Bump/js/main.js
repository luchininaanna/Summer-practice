let g_context = {};
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.resources = [];

let g_world = {
  update: function (deltaTime) {
  },
  clean: function (ctx) {
    ctx.fillStyle = colors.WHITE;
    drawRectangle(ctx, 0, 0, canvasSize.WIDTH, canvasSize.HEIGHT, 1, 0, 0);
  },
  render: function (ctx) {
    let gameWorldObjects = g_world.gameWorldObjects;
    drawObjects(ctx, gameWorldObjects);
  },
};

function drawObjects(ctx, gameWorldObjects) {
  if (gameWorldObjects) {
    for (let key in gameWorldObjects) {
      drawObject(ctx, gameWorldObjects[key]);
    }
  }
}
function drawObject(ctx, object) {
  object.forEach(function (item, i, arr){
    ctx.drawImage(item.source, item.real_x, item.real_y, item.real_width, item.real_height,
        item.x, item.y, item.width, item.height);
  })
}

loadResources();

window.requestAnimationFrame(gameLoop);

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

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
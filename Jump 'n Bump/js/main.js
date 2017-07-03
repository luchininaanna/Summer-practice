let g_world = {};
g_world.ctx = document.getElementById("canvas").getContext("2d");
g_world.prevTime = new Date();
g_world.colors = new Colors();
g_world.resources = createResourceStore();

loadOfResources();

function loadOfResources() {
  let resourceCache = {};
  let loading = [];
  let readyCallbacks = [];
  let resources = g_world.resources;
  if (resources instanceof Array)
  for (let i = 0; i < resources.length; i++) {
    loadImage(resources.imageUrl, resourceCache)
  }
}

function loadImage(url, resourceCache){}

//window.requestAnimationFrame(gameLoop);

//gameLoop();

//function gameLoop() {
  let ctx = g_context.ctx;
  let currTime = new Date();
  let prevTime = g_world.prevTime;
  let deltaTime = currTime - prevTime;
  update(deltaTime);
  cleanCanvas(ctx);
  render(ctx);
  requestAnimationFrame(gameLoop);
  g_world.prevTime = currTime;
}

function update() {}
function cleanCanvas(ctx) {
  ctx.fillStyle = g_world.colors.WHITE;
  drawRectangle(ctx, 0, 0, 1200, 900, 1, 0, 0);
}
function render(ctx) {}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}

function Colors() {
  this.WHITE = "#FFF9FF";
}
function Image(name, url) {
  this.imageName = name;
  this.imageUrl = url;
}

function createResourceStore() {
  resources = [];
  resources[0] = new Image("earth", "https://opengameart.org/sites/default/files/spr_tileset_pre_0.png");
  resources[1] = new Image("iceAndWater", "https://opengameart.org/sites/default/files/preview_154.png");
  return resources
}
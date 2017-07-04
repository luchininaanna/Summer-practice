let g_world = {};
g_world.ctx = document.getElementById("canvas").getContext("2d");
g_world.prevTime = new Date();
g_world.colors = new Colors();
g_world.resources = createResourceStore();
g_world.storeImages = new Store();

loadResources();

function loadResources() {
  let resources = g_world.resources;
  let storeImages = g_world.storeImages;
  if (resources instanceof Array) {
    for (let i = 0; i < resources.length; i++) {
      load(resources.imageUrl, storeImages)
    }
  }
  else {
    load(resources, storeImages)
  }
}

function load(url, storeImages) {
  if (storeImages.resourceCache[url]) {
    return storeImages;
  } else {
    let img = new Image();
    img.onload = function () {
      storeImages.resourceCache[url] = img;
      if (isReady(storeImages.resourceCache)) {
        for (let j = 0; j < storeImages.readyCallbacks.length; j++) {
          loadResources(func) {
            func();
          }
        }
      }
      img.src = url;
      storeImages.resourceCache[url] = false;
      return storeImages;
    }
  }
}

function isReady(resourceCache) {
  let ready = true;
  for(let k in resourceCache) {
    if((resourceCache.hasOwnProperty(k)) && (!resourceCache[k])) {
      ready = false;
    }
  }
  return ready;
}
function onReady(func) {
  g_world.storeImages.readyCallbacks.push(func);
}
function get(url) {
  return resourceCache[url];
}

g_world.storeImages.onReady(gameLoop);

window.requestAnimationFrame(gameLoop);

function gameLoop() {
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
  this.WHITE = "#FFFFFF";
}

function Image(url) {
  this.imageUrl = url;
}
function createResourceStore() {
  resources = [];
  resources[0] = new Image("https://opengameart.org/sites/default/files/spr_tileset_pre_0.png");
  resources[1] = new Image("https://opengameart.org/sites/default/files/preview_154.png");
  return resources;
}
function Store() {
  this.resourceCache = {};
  this.readyCallbacks = [];
  this.load = load;
  this.get = get;
  this.onReady = onReady;
  this.isReady = isReady;
}
let g_context = {};
g_context.canvas = document.getElementById("canvas");
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();
g_context.resources = [];

let g_world = new World();

loadResources(gameLoop);

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
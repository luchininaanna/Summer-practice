let g_world;
let g_context = {};
g_context.canvas = document.getElementById("canvas");
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();

loadResources();
let check = setInterval(function() {  //проверка на наличие ресурсов для создаия объектов
  if (g_context.resources) {
    g_world = new World();
    gameLoop();
    clearInterval(check);
  }
}, 1000);

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
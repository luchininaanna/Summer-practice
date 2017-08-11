let g_world;
let g_context = {};
g_context.canvas = document.getElementById("canvas");
g_context.ctx = document.getElementById("canvas").getContext("2d");
g_context.prevTime = new Date();

loadResources();
let check = setInterval(function() {
  if (g_context.resources) {
    //console.log(g_context.resources);
    //console.log("+");
    g_world = new World();
    gameLoop();
    clearInterval(check);
  }
}, 1000);

function gameLoop() {
  //console.log("GameLoop");
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
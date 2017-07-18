function drawObjects(ctx, objects) {
  if (objects) {
    for (let key in objects) {
      drawObject(ctx, objects[key]);
    }
  }
}

function drawObject(ctx, object) {
  ctx.drawImage(object.source, object.imageX, object.imageY, object.imageWidth, object.imageHeight,
      object.x, object.y, object.width, object.height);
}

function drawRectangle(ctx, x, y, width, height, amount, shiftRight, shiftDown) {
  for (let i = 0; i < amount; i++) {
    ctx.fillRect(x + i * shiftRight, y + i * shiftDown, width, height);
    ctx.strokeRect(x + i * shiftRight, y + i * shiftDown, width, height);
  }
}
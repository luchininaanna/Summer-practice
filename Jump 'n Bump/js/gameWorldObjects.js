g_world.gameWorldObjects = {
  objects: [],
};

createObjects(g_world.gameWorldObjects.objects);
function createObjects(objects) {
  let backgroundImage = g_context.resources[0];
  let firstTypeImage = g_context.resources[1];
  let secondTypeImage = g_context.resources[2];
  let iceBoxImage = g_context.resources[3];
  let rockImage = g_context.resources[4];
  let playerImage = g_context.resources[5];

  objects[0] = new Background(backgroundImage, 0, 0);    //правый нижний угол
  objects[1] = new BigStair(firstTypeImage, 1300, 770);
  objects[2] = new Rock(rockImage, 1230, 830);
  objects[3] = new Rock(rockImage, 1230, 860);
  objects[4] = new Rock(rockImage, 1200, 830);
  objects[5] = new Rock(rockImage, 1160, 840);
  objects[6] = new Rock(rockImage, 1130, 830);
  objects[7] = new Rock(rockImage, 1100, 830);
  objects[8] = new Rock(rockImage, 1060, 840);
  objects[9] = new SmallStair(firstTypeImage, 1240, 790);
  objects[10] = new BigStair(firstTypeImage, 1270, 810);
  objects[11] = new Rock(rockImage, 1190, 860);
  objects[12] = new Rock(rockImage, 1150, 855);
  objects[13] = new Rock(rockImage, 1110, 860);
  objects[14] = new Rock(rockImage, 1070, 860);
  objects[15] = new IceBox(iceBoxImage, 1200, 810);
  objects[16] = new IceBox(iceBoxImage, 1160, 810);
  objects[17] = new IceBox(iceBoxImage, 1120, 810);
  objects[18] = new IceBox(iceBoxImage, 1080, 810);
  objects[19] = new BigStair(firstTypeImage, 1030, 800);
  objects[20] = new SmallStair(firstTypeImage, 970, 840);
  objects[21] = new SmallStair(firstTypeImage, 1000, 850);
  objects[22] = new SmallStair(firstTypeImage, 940, 860);
  objects[23] = new SmallStair(firstTypeImage, 980, 860);
  objects[24] = new SmallStair(firstTypeImage, 900, 850);
  objects[25] = new SmallStair(firstTypeImage, 870, 860);
  objects[26] = new SmallStair(firstTypeImage, 910, 870);
  objects[27] = new SmallStair(firstTypeImage, 590, 850);
  objects[28] = new BigStair(firstTypeImage, 550, 800);
  objects[29] = new SmallStair(firstTypeImage, 830, 850);
  objects[30] = new SmallStair(firstTypeImage, 840, 870);
  objects[31] = new SmallStair(firstTypeImage, 800, 870);
  objects[32] = new FirstTypeGrass(firstTypeImage, 550, 790);
  objects[33] = new FirstTypeGrass(firstTypeImage, 1030, 790);
  objects[34] = new SmallStair(firstTypeImage, 760, 870);
  objects[35] = new SmallStair(firstTypeImage, 720, 870);
  objects[37] = new SmallStair(firstTypeImage, 670, 850);
  objects[38] = new SmallStair(firstTypeImage, 680, 870);
  objects[39] = new SmallStair(firstTypeImage, 640, 870);
  objects[40] = new SmallStair(firstTypeImage, 600, 870);

  objects[41] = new BigStair(firstTypeImage, 880, 550);
  objects[42] = new SmallStair(firstTypeImage, 920, 630);
  objects[43] = new SmallStair(firstTypeImage, 920, 610);
  objects[44] = new SmallStair(firstTypeImage, 920, 590);
  objects[45] = new Rock(rockImage, 850, 580);
  objects[46] = new Rock(rockImage, 840, 610);
  objects[47] = new Rock(rockImage, 810, 620);
  objects[48] = new Rock(rockImage, 850, 640);
  objects[49] = new Rock(rockImage, 880, 620);
  objects[50] = new Rock(rockImage, 805, 650);
  objects[51] = new Rock(rockImage, 760, 660);
  objects[52] = new IceBox(iceBoxImage, 810, 590);
  objects[53] = new IceBox(iceBoxImage, 770, 630);
  objects[54] = new IceBox(iceBoxImage, 730, 670);
  objects[55] = new Rock(rockImage, 850, 580);
  objects[56] = new SmallStair(firstTypeImage, 890, 650);
  objects[57] = new SmallStair(firstTypeImage, 960, 640);
  objects[58] = new SmallStair(firstTypeImage, 960, 620);
  objects[59] = new SmallStair(firstTypeImage, 955, 650);
  objects[60] = new SmallStair(firstTypeImage, 920, 660);
  objects[61] = new SmallStair(firstTypeImage, 1000, 650);
  objects[62] = new SmallStair(firstTypeImage, 1045, 650);
  objects[63] = new SmallStair(firstTypeImage, 1090, 650);

  objects[64] = new Player(playerImage, 600, 760);

  return objects;
}

function Background(source, x, y) {
  this.source = source;
  this.real_x = 0;
  this.real_y = 0;
  this.real_width = backgroundSize.WIDTH;
  this.real_height = backgroundSize.HEIGHT;
  this.x = x;
  this.y = y;
  this.width = canvasSize.WIDTH;
  this.height = canvasSize.HEIGHT;
}
function SmallStair(source, x, y) {
  this.source = source;
  this.real_x = smallStair.REAL_X;
  this.real_y = smallStair.REAL_Y;
  this.real_width = smallStair.REAL_WIDTH;
  this.real_height = smallStair.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = smallStair.WIDTH;
  this.height = smallStair.HEIGHT;
  this.type = "land";
}
function BigStair(source, x, y) {
  this.source = source;
  this.real_x = bigStair.REAL_X;
  this.real_y = bigStair.REAL_Y;
  this.real_width = bigStair.REAL_WIDTH;
  this.real_height = bigStair.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = bigStair.WIDTH;
  this.height = bigStair.HEIGHT;
  this.type = "land";
}
function FirstTypeGrass(source, x, y) {
  this.source = source;
  this.real_x = firstTypeGrass.REAL_X;
  this.real_y = firstTypeGrass.REAL_Y;
  this.real_width = firstTypeGrass.REAL_WIDTH;
  this.real_height = firstTypeGrass.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = firstTypeGrass.WIDTH;
  this.height = firstTypeGrass.HEIGHT;
  this.type = "land";
}
function SecondTypeGrass(source, x, y) {
  this.source = source;
  this.real_x = secondTypeGrass.REAL_X;
  this.real_y = secondTypeGrass.REAL_Y;
  this.real_width = secondTypeGrass.REAL_WIDTH;
  this.real_height = secondTypeGrass.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = secondTypeGrass.WIDTH;
  this.height = secondTypeGrass.HEIGHT;
  this.type = "land";
}
function ThirdTypeGrass(source, x, y) {
  this.source = source;
  this.real_x = thirdTypeGrass.REAL_X;
  this.real_y = thirdTypeGrass.REAL_Y;
  this.real_width = thirdTypeGrass.REAL_WIDTH;
  this.real_height = thirdTypeGrass.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = thirdTypeGrass.WIDTH;
  this.height = thirdTypeGrass.HEIGHT;
  this.type = "land";
}
function IceBox(source, x, y) {
  this.source = source;
  this.real_x = iceBox.REAL_X;
  this.real_y = iceBox.REAL_Y;
  this.real_width = iceBox.REAL_WIDTH;
  this.real_height = iceBox.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = iceBox.WIDTH;
  this.height = iceBox.HEIGHT;
  this.type = "ice";
}
function Rock(source, x, y) {
  this.source = source;
  this.real_x = rock.REAL_X;
  this.real_y = rock.REAL_Y;
  this.real_width = rock.REAL_WIDTH;
  this.real_height = rock.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = rock.WIDTH;
  this.height = rock.HEIGHT;
  this.type = "land";
}
function Player(source, x, y){
  this.source = source;
  this.real_x = firstPlayer.REAL_X;
  this.real_y = firstPlayer.REAL_Y;
  this.real_width = firstPlayer.REAL_WIDTH;
  this.real_height = firstPlayer.REAL_HEIGHT;
  this.x = x;
  this.y = y;
  this.width = firstPlayer.WIDTH;
  this.height = firstPlayer.HEIGHT;
}
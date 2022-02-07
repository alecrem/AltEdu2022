const stage = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 0, 0, 3, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
const tile_colours = [
  "#c3f6f6", // 0 空色
  "#754702", // 1 茶色
  "#b3af0d", // 2 黄色
  "#027645", // 3 緑
  "#983700", // 4 赤
  "#071380", // 5 青
  "#7bc213", // 6 黄緑
];
var tile_size, offsetX, offsetY;
const characterPositions = [
  [10, 2],
  [10, 2],
  [10, 2],
  [9, 3],
  [8, 4],
  [9, 4],
  [10, 4],
  [10, 4],
  [10, 5],
  [10, 6],
  [10, 7],
  [10, 8],
  [10, 9],
  [9, 10],
  [8, 11],
  [7, 12],
  [6, 13],
  [6, 14],
  [7, 15],
  [8, 0],
  [9, 1],
];
const enemyPositions = [
  [10, 10],
  [10, 9],
  [10, 8],
  [10, 7],
  [10, 6],
  [10, 5],
  [10, 4],
  [10, 4],
  [10, 0],
  [10, 1],
  [10, 2],
  [10, 3],
  [10, 4],
  [10, 5],
  [10, 6],
  [10, 7],
  [10, 8],
  [10, 9],
  [10, 10],
  [10, 11],
  [10, 12],
];
var characterX = characterPositions[0][0], characterY = characterPositions[0][1], characterColour = tile_colours[4];
var enemyX = enemyPositions[0][0], enemyY = enemyPositions[0][1], enemyColour = tile_colours[6];
var timeLapsed = 0, currentPosition = 0;
const step = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reinit_tile_size();
}

function draw() {
  background(0);
  if (millis() - timeLapsed >= step) {
    currentPosition = (currentPosition + 1) % characterPositions.length;
    timeLapsed = millis();
  }
  print_stage(offsetX, offsetY);
  printCharacter(enemyPositions[currentPosition], enemyColour);
  printCharacter(characterPositions[currentPosition], characterColour);
}

// This code by @takawo!
function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs);
  if (fs) {
    cursor();
  } else {
    noCursor();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
    reinit_tile_size();
}

const drawSquare = (i, j, tile='#000000', size=32, offsetX = 0, offsetY = 0) => {
  fill(tile);
  stroke(tile);
  rect(j * size + offsetX, i * size + offsetY, size, size);
};

const print_stage = (offsetX = 0, offsetY = 0) => {
  for (var i = 0; i < stage.length; i++) {
    for (var j = 0; j < stage[0].length; j++) {
      drawSquare(i, j, tile_colours[stage[i][j]], tile_size, offsetX, offsetY);
    }
  }
}

const printCharacter = (charPos, charColour) => {
  fill(charColour);
  stroke(charColour);
  drawSquare(charPos[0], charPos[1], charColour, tile_size, offsetX, offsetY);
};

const reinit_tile_size = () => {
    tile_size = min(windowWidth/stage[0].length, windowHeight/stage.length);
    offsetX = (windowWidth - tile_size * stage[0].length) / 2;
    offsetY = (windowHeight - tile_size * stage.length) / 2;
};
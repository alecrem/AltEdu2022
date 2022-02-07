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
  [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 3, 3, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var tile_size, offsetX, offsetY;
const tile_colours = [
  "#c3f6f6", // 0 空色
  "#754702", // 1 茶色
  "#b3af0d", // 2 黄色
  "#027645", // 3 緑
  "#983700", // 4 赤
  "#071380", // 5 青
  "#7bc213", // 6 黄緑
];

function setup() {
	createCanvas(windowWidth, windowHeight);
    reinit_tile_size();
}

function draw() {
	background(0);
    print_stage(offsetX, offsetY);
}

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
      drawSquare(i, j, tile_colours[stage[i][j]], tile_size, offsetX, offsetY)
    }
  }
}

const reinit_tile_size = () => {
    tile_size = min(windowWidth/stage[0].length, windowHeight/stage.length);
    offsetX = (windowWidth - tile_size * stage[0].length) / 2;
    offsetY = (windowHeight - tile_size * stage.length) / 2;
};
var offsetX, offsetY, sqSide, tileWidth, tilePadding, digitsOffsetX, digitsOffsetY, backgroundOffsetY;
const palette = ['#e6f8d9', '#98c983', '#417a69', '#06202b'];
const resolution = [160, 144];
const tileWidthInFalsePixels = 3.5;
const tilePaddingInFalsePixels = 0.5;
let digits = [0, 0, 0, 0, 0, 0];
let lastUpdated = null;
let digitMatrices = [
  [
    [2,2,2,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,2,2,2],
  ],
  [
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
  ],
  [
    [2,2,2,2],
    [0,0,0,2],
    [0,0,0,2],
    [2,2,2,2],
    [2,0,0,0],
    [2,0,0,0],
    [2,2,2,2],
  ],
  [
    [2,2,2,2],
    [0,0,0,2],
    [0,0,0,2],
    [2,2,2,2],
    [0,0,0,2],
    [0,0,0,2],
    [2,2,2,2],
  ],
  [
    [2,0,0,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,2,2,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
  ],
  [
    [2,2,2,2],
    [2,0,0,0],
    [2,0,0,0],
    [2,2,2,2],
    [0,0,0,2],
    [0,0,0,2],
    [2,2,2,2],
  ],
  [
    [2,2,2,2],
    [2,0,0,0],
    [2,0,0,0],
    [2,2,2,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,2,2,2],
  ],
  [
    [2,2,2,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
    [0,0,0,2],
  ],
  [
    [2,2,2,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,2,2,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,2,2,2],
  ],
  [
    [2,2,2,2],
    [2,0,0,2],
    [2,0,0,2],
    [2,2,2,2],
    [0,0,0,2],
    [0,0,0,2],
    [2,2,2,2],
  ],
];
const colonMatrix = [
  [0,0],
  [0,2],
  [0,0],
  [0,0],
  [0,0],
  [0,2],
  [0,0],
];
const backgroundMatrix = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0],
  [0,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0],
  [0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1],
  [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//digits
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0],
  [1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  noStroke();
}

function draw() {
  digits = updateDateDigits();
  background(palette[3]);
  push();
  translate(offsetX, offsetY);
  push();
  translate(0, sqSide * (1 - resolution[1]/resolution[0])/2);
  drawWatch();
  pop();
  pop();
}

const drawWatch = () => {
  fill(palette[0]);
  rect(0, 0, sqSide, sqSide*resolution[1]/resolution[0]);
  push();
  translate(digitsOffsetX, backgroundOffsetY);//backgroundOffset
  drawBackground();
  pop();
  push();
  translate(digitsOffsetX, digitsOffsetY);//digitsOffset
  for(let i = 0; i < digits.length; i++) {
    push();
    let thisOffset = 5 * i * (tileWidth + tilePadding);
    if (i > 1) {
      thisOffset += 3 * (tileWidth + tilePadding);
    }
    if (i > 3) {
      thisOffset += 3 * (tileWidth + tilePadding);
    }
    translate(thisOffset, 0);
    drawDigit(digits[i]);
    if ((i == 1 || i == 3) && digits[5]%2 == 0) {
      push();
      let thisOffset = 5 * (tileWidth + tilePadding);
      translate(thisOffset, 0);
      drawColon();
      pop();
    }
    pop();
  }
  pop();//digitsOffset
};

const drawDigit = (digit) => {
  for(let row = 0; row < digitMatrices[0].length; row++) {
    for(let col = 0; col < digitMatrices[0][0].length; col++) {
      if (digitMatrices[digit][row][col] > 0) {
        fill(palette[digitMatrices[digit][row][col]]);
        rect(col * (tileWidth + tilePadding), row * (tileWidth + tilePadding), tileWidth, tileWidth);
      }
    }
  }
};

const drawColon = () => {
  for(let row = 0; row < colonMatrix.length; row++) {
    for(let col = 0; col < colonMatrix[0].length; col++) {
      if (colonMatrix[row][col] > 0) {
        fill(palette[colonMatrix[row][col]]);
        rect(col * (tileWidth + tilePadding), row * (tileWidth + tilePadding), tileWidth, tileWidth);
      }
    }
  }
};

const drawBackground = () => {
  for(let row = 0; row < backgroundMatrix.length; row++) {
    for(let col = 0; col < backgroundMatrix[0].length; col++) {
      if (backgroundMatrix[row][col] > 0) {
        fill(palette[backgroundMatrix[row][col]]);
        rect(col * (tileWidth + tilePadding), row * (tileWidth + tilePadding), tileWidth, tileWidth);
      }
    }
  }
};

const updateDateDigits = () => {
  if (lastUpdated === null || millis() - lastUpdated > 300) {
    lastUpdated = millis();
    const d = new Date();
    const seconds = d.getSeconds();
    digits[5] = ~~(seconds%10);
    digits[4] = ~~(seconds/10);
    const minutes = d.getMinutes();
    digits[3] = ~~(minutes%10);
    digits[2] = ~~(minutes/10);
    const hours = d.getHours();
    digits[1] = ~~(hours%10);
    digits[0] = ~~(hours/10);
  }
  return digits;
};

// Fullscreen code taken from @takawo
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
  sqSide = min(windowHeight, windowWidth);
  tileWidth = (sqSide / 160) * tileWidthInFalsePixels;
  tilePadding = (sqSide / 160) * tilePaddingInFalsePixels;
  offsetX = (windowWidth - sqSide) / 2;
  offsetY = (windowHeight - sqSide) / 2;
  digitsOffsetX = (sqSide - (tileWidth + tilePadding)* 36) / 2;
  digitsOffsetY = (sqSide - (tileWidth + tilePadding)* digitMatrices[0].length) / 2;
  backgroundOffsetY = (sqSide - (tileWidth + tilePadding)* 36) / 2;
}

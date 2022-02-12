var offsetX, offsetY, sqSide;
const wordMatrices = [
  [
    ['う', 'さ', 'ぎ'],
    ['co', 'ne', 'jo'],
    ['ra', 'bb', 'it'],
  ],
];
var wordIndex, wordCurrentRotation;
var numberOfVersions = wordMatrices[0].length;
var numberOfBlocks = wordMatrices[0][0].length;
let lastUpdated = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  wordIndex = ~~(wordMatrices.length * random())
  wordCurrentRotation = [0, 1, 2];
  rotateWord();
  textSize(24);
}

function draw() {
  background(192);
  push();
  translate(offsetX, offsetY);
  ellipse(sqSide/2, sqSide/2, sqSide, sqSide);
  rotateWord();
  drawWord();
  pop();
}

const drawWord = () => {
  const currentWordBlocks = []
  for (let i = 0; i < numberOfBlocks; i++) {
    currentWordBlocks.push(wordMatrices[wordIndex][wordCurrentRotation[i]][i])
  }
  text(currentWordBlocks, sqSide/2, sqSide/2);
};
const rotateWord = () => {
  if (lastUpdated === null || millis() - lastUpdated > 1000) {
    lastUpdated = millis();
    numberOfVersions = wordMatrices[wordIndex].length;
    numberOfBlocks = wordMatrices[wordIndex][0].length;
    const blockToRotate = ~~(numberOfBlocks * random());
    wordCurrentRotation[blockToRotate] = (wordCurrentRotation[blockToRotate] + 1) % numberOfVersions;
    // console.log(blockToRotate, wordCurrentRotation);
  }
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
  offsetX = (windowWidth - sqSide) / 2;
  offsetY = (windowHeight - sqSide) / 2;
}

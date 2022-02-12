var offsetX, offsetY, sqSide;
const palette = [
  "#ffff88",
  "#ff88ff",
  "#88ffff",
];
const wordMatrices = [
  [
    ['う', 'さ', 'ぎ'],
    ['co', 'ne', 'jo'],
    ['ra', 'bb', 'it'],
  ],
  [
    ['こ', 'ね', 'こ'],
    ['ga', 'ti', 'to'],
    ['ki', 'tt', 'en'],
  ],
  [
    ['ちゃ', 'り'],
    ['bi', 'ci'],
    ['bi', 'ke'],
  ],
  [
    ['しゃ', 'わー'],
    ['du', 'cha'],
    ['sho', 'wer'],
  ],
  [
    ['こ', 'み', 'ち'],
    ['ca', 'mi', 'no'],
    ['pa', 'th', 'way'],
  ],
  [
    ['お', 'し', 'り'],
    ['cu', 'li', 'to'],
    ['bo', 'tt', 'om'],
  ],
  [
    ['ま', 'ん', 'が'],
    ['te', 'be', 'os'],
    ['co', 'mi', 'cs'],
  ],
  [
    ['と', 'らっ', 'く'],
    ['ca', 'mi', 'on'],
    ['tr', 'u', 'ck'],
  ],
  [
    ['ぽ', 'て', 'と'],
    ['pa', 'ta', 'ta'],
    ['po', 'ta', 'to'],
  ],
  [
    ['じゅ', 'ー', 'す'],
    ['zu', 'mi', 'to'],
    ['ju', 'i', 'ce'],
  ],
  [
    ['は', 'こ'],
    ['ca', 'ja'],
    ['bo', 'x'],
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
  textAlign(CENTER);
  noStroke();
}

function draw() {
  textSize(sqSide/(numberOfBlocks * 2 + 1));
  background(0);
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
    const thisBlock = wordMatrices[wordIndex][wordCurrentRotation[i]][i];
    currentWordBlocks.push(thisBlock);
    push();
    translate((i + 0.5) * sqSide/numberOfBlocks, sqSide/2 + 0.125 * sqSide/numberOfBlocks);
    drawBlock(thisBlock, wordCurrentRotation[i]);
    pop();
  }
};
const drawBlock = (blockString, colorIndex) => {
  fill(palette[colorIndex]);
  ellipse(0, -0.125 * sqSide/numberOfBlocks, sqSide/numberOfBlocks, sqSide/numberOfBlocks)
  fill(0);  
  text(blockString, 0, 0);
};
const rotateWord = () => {
  if (lastUpdated === null || millis() - lastUpdated > 1000) {
    lastUpdated = millis();
    numberOfVersions = wordMatrices[wordIndex].length;
    numberOfBlocks = wordMatrices[wordIndex][0].length;
    const blockToRotate = ~~(numberOfBlocks * random());
    wordCurrentRotation[blockToRotate] = (wordCurrentRotation[blockToRotate] + 1) % numberOfVersions;
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

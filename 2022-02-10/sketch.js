var offsetX, offsetY, sqSide;
var angle = 0;
const cardRatio = 0.7163461538;//card width/height ratio
const borderThickness = 0.051 * cardRatio;//black border width as a factor of sqSide
// const bevelThickness = 0.0094;//card bevel width as a factor of sqSide

const gold = "#7a7243";
const back1 = "#443c1e";
const back2 = "#a06b32";
const wubrgColors = [
  "#dddeac",
  "#a4c6e6",
  "#aca09d",
  "#c8835e",
  "#8db67d"
];
const wubrgSymbols = ['🌞', '💧', '💀', '🔥', '🌳'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  noStroke();
}

function draw() {
  angle = (angle + 1)%36000;
  radiusDelta = sin(angle/36);
  background(255);
  push();
  translate(offsetX, offsetY);//square
  fill(back1);
  rect(sqSide * (1 - cardRatio)/2, 0, sqSide * cardRatio, sqSide);
  fill(back2);
  ellipse(sqSide/2, sqSide/2, sqSide * 0.5673076923, sqSide * 0.8307692308);
  push();
  translate(sqSide/2, sqSide/2);//center

  for (let i = 0; i < wubrgColors.length; i++) {
    push();
    thisAngle = radians(angle - 90 + i * (360)/5);
    radiusLength = sqSide * (0.16 + radiusDelta/70);
    translate(p5.Vector.fromAngle(thisAngle, radiusLength));
    fill(wubrgColors[i]);
    ellipse(0, 0, sqSide/10, sqSide/10);
    textFont('Georgia');
    textSize(sqSide/12);
    text(wubrgSymbols[i], -sqSide/24, +sqSide/32);
    pop();
  };

  pop();//center
  fill(0);
  rect(sqSide * (1 - cardRatio)/2, 0, sqSide * borderThickness, sqSide);//left border
  rect(sqSide * (cardRatio + (1 - cardRatio)/2 - borderThickness), 0, sqSide * borderThickness, sqSide);//right border
  rect(sqSide * (1 - cardRatio)/2, 0, sqSide * cardRatio, sqSide * borderThickness);//top border
  rect(sqSide * (1 - cardRatio)/2, sqSide * (1 - borderThickness), sqSide * cardRatio, sqSide * borderThickness);//bottom border
  // rect(sqSide * (1 - cardRatio)/2, 0, sqSide * cardRatio, sqSide);
  // rect(sqSide * (1 - cardRatio)/2, 0, sqSide * cardRatio, sqSide);
  pop();//square
}

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

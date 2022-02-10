var offsetX, offsetY, sqSide;
var angle = 0;

gold = "#7a7243";
wubrgColors = [
  "#dddeac",
  "#a4c6e6",
  "#aca09d",
  "#c8835e",
  "#8db67d"
];
wubrgSymbols = ['🌞', '💧', '💀', '🔥', '🌳'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  noStroke();
}

function draw() {
  angle = (angle + 1)%360;
  radiusDelta = sin(angle/20);
  background(gold);
  push();
  translate(offsetX, offsetY);//square
  push();
  translate(sqSide/2, sqSide/2);//center

  for (let i = 0; i < wubrgColors.length; i++) {
    push();
    thisAngle = radians(angle - 90 + i * (360)/5);
    radiusLength = sqSide * (0.30 + radiusDelta/70);
    translate(p5.Vector.fromAngle(thisAngle, radiusLength));
    fill(wubrgColors[i]);
    ellipse(0, 0, sqSide/10, sqSide/10);
    textFont('Georgia');
    textSize(sqSide/12);
    fill(40);
    text(wubrgSymbols[i], -sqSide/24, +sqSide/32);
    pop();
  };

  pop();//center
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

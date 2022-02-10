var offsetX, offsetY, sqSide;

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
}

function draw() {
  background(192);
  push();
  translate(offsetX, offsetY);
  rect(0, 0, sqSide, sqSide);
  pop();
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

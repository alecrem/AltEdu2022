var offsetX, offsetY, sqSide, lineThickness, circleSize, bgColor;
var pointsOriginal = [];
var angle = 0;
var c;
function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  stroke(255);
  angle = 360 * random();
  colorMode(HSB, 255);
  pointsOriginal.push([windowWidth/2, windowHeight/2]);
  pointsOriginal.push([~~random(0, windowWidth), ~~random(0, windowHeight)]);
  pointsOriginal.push([~~random(0, windowWidth), ~~random(0, windowHeight)]);
}
function draw() {
  let tightness = 1.5 - 1.5 * cos(radians(angle));
  bgColor = map(sin(radians(angle)), -1, 1, 0, 255)
  background(bgColor);
  c = color(map(sin(radians(angle)), -1, 1, 0, 255), 255, 255);
  stroke(c);
  let points = pointsOriginal.slice(0);//working copy
  points.push([0, 0]);
  curveTightness(tightness);
  angle = (angle + 1) % 360;
  beginShape();
  noFill();
  points.forEach((elem) => {
    curveVertex(elem[0], elem[1]);
  });
  endShape();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  sqSide = min(windowHeight, windowWidth);
  offsetX = (windowWidth - sqSide) / 2;
  offsetY = (windowHeight - sqSide) / 2;
  circleSize = ~~sqSide/90;
  lineThickness = ~~sqSide/100;
  strokeWeight(lineThickness);
}
function mousePressed() {
  pointsOriginal.push([mouseX, mouseY]);
}

const periodInFrames = [64, 64, 64, 32, 16, 16];
var currentPeriod = 0;
const bgcolor = {
  start: [0, 0, 0],
  finish: [20, 20, 20]
};
const lineThickness = {
  start: 1,
  finish:48
};
const polygons = [
  {
    start: {
      vertices: [
        [0, 10], // top left
        [27, 10],
        [29, 12],
        [31, 10],
        [50, 10], // top middle
        [69, 10],
        [71, 12],
        [73, 10],
        [99, 10], // top right
        [20, 80],
        [30, 70],
        [35, 65],
        [55, 45], // middle right
        [58, 49],
        [63, 48],
        [60, 52],
        [70, 75],
        [80, 85],
        [99, 90], // bottom right
        [73, 90],
        [71, 88],
        [69, 90],
        [50, 90], // botton middle
        [31, 90],
        [29, 88],
        [27, 90],
        [0, 90], // bottom left
        [20, 80],
        [30, 70],
        [35, 65],
        [55, 45], // middle right
        [58, 49],
        [63, 48],
        [60, 52],
        [70, 75],
        [80, 85],
        [0, 10], // top left
      ],
      fill: [192, 0, 0],
    },
    finish: {
      vertices: [
        [20, 10], // top left
        [20, 10],
        [30, 10],
        [30, 10],
        [50, 40], // top middle
        [70, 10],
        [70, 10],
        [80, 10],
        [80, 10], // top right
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [80, 90], // bottom right
        [80, 90],
        [70, 90],
        [70, 90],
        [50, 90],
        [30, 40], // top middle
        [30, 90],
        [20, 90],
        [20, 90], // bottom left
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [40, 50],
        [20, 10], // top left
      ],
      fill: [192, 192, 192],
    },
  },
];

var angle = 180;
var previousAngle = 180;
var cosAngle = -1;
var offsetX, offsetY, smallerSide;

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
}

function draw() {
  cosAngle = cos(angle * 2 * Math.PI / periodInFrames[currentPeriod]);

  // if (cosAngle < 0) {
  //   strokeCap(PROJECT);
  //   strokeJoin(MITER);
  // } else {
  //   strokeCap(ROUND);
  //   strokeJoin(ROUND);
  // }
  // strokeWeight(map(cosAngle, -1, 1, lineThickness.start, lineThickness.finish) * smallerSide / 80);
  noStroke();
  background(mapColor(bgcolor.start, bgcolor.finish));

  polygons.forEach((poly) => {
    displayPoly(poly);
  });

  angle = (angle + 1) % periodInFrames[currentPeriod];
  if(angle < previousAngle) {
    currentPeriod = (currentPeriod + 1) % periodInFrames.length;
  }
  previousAngle = angle;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  smallerSide = min(windowHeight, windowWidth);
  offsetX = (windowWidth - smallerSide) / 2 + smallerSide / 10;
  offsetY = (windowHeight - smallerSide) / 2 + smallerSide / 10;
}

const displayPoly = (poly) => {
  beginShape();
  fill(mapColor(poly.start.fill, poly.finish.fill));
  for(i = 0; i < poly.start.vertices.length; i++) {
    const x = offsetX + map(cosAngle, -1, 1, poly.start.vertices[i][0], poly.finish.vertices[i][0]) * smallerSide / 100 * 8/10;
    const y = offsetY + map(cosAngle, -1, 1, poly.start.vertices[i][1], poly.finish.vertices[i][1]) * smallerSide / 100 * 8/10;
    vertex(x, y);
  }
  endShape();
};

const mapColor = (startColor, finishColor) => {
  let retColor = "#";
  for (let i = 0; i < 3; i++) {
    retColor += (~~map(cosAngle, -1, 1, startColor[i], finishColor[i])).toString(16).padStart(2, '0');
  }
  return retColor;
};

const periodInFrames = [128, 128, 64, 32, 32, 96, 32];
var currentPeriod = 0;
const bgcolor = {
  start: [0, 0, 0],
  finish: [20, 30, 30]
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
        [80, 20],
        [70, 30],
        [65, 35],
        [57, 45], // middle right
        [59, 47],
        [63, 47],
        [60, 52],
        [68, 72],
        [80, 82],
        [99, 90], // bottom right
        [73, 90],
        [71, 88],
        [69, 90],
        [50, 90], // botton middle
        [31, 90],
        [29, 88],
        [27, 90],
        [0, 90], // bottom left
        [18, 82],
        [27, 75],
        [34, 65],
        [43, 53], // middle left
        [41, 51],
        [37, 51],
        [39, 46],
        [33, 30],
        [20, 16],
        [0, 10], // top left
      ],
      fill: [160, 0, 0],
    },
    finish: {
      vertices: [
        [20, 10], // top left
        [20, 10],
        [35, 10],
        [35, 10],
        [50, 40], // top middle
        [65, 10],
        [65, 10],
        [80, 10],
        [80, 10], // top right
        [60, 50],
        [60, 50],
        [60, 50],
        [60, 50],
        [60, 50],
        [60, 50],
        [60, 50],
        [60, 50],
        [60, 50],
        [80, 90], // bottom right
        [80, 90],
        [65, 90],
        [65, 90],
        [50, 60], // bottom middle
        [35, 90],
        [35, 90],
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
      fill: [192, 192, 210],
    },
  },
  {
    start: {
      vertices: [
        [53, 44], // vertex
        [64, 30],
        [66, 22],
        [60, 14],
        [43, 14],
        [38, 19],
        [37, 23],
        [53, 44], // vertex
      ],
      fill: [0, 0, 0],
    },
    finish: {
      vertices: [
        [53, 44],
        [53, 44],
        [53, 44],
        [53, 44],
        [53, 44],
        [53, 44],
        [53, 44],
        [53, 44],
        [53, 44],
      ],
      fill: [20, 30, 30],
    },
  },
  {
    start: {
      vertices: [
        [100-53, 100-44], // vertex
        [100-64, 100-30],
        [100-66, 100-22],
        [100-60, 100-14],
        [100-43, 100-14],
        [100-38, 100-19],
        [100-37, 100-23],
        [100-53, 100-44], // vertex
      ],
      fill: [0, 0, 0],
    },
    finish: {
      vertices: [
        [100-53, 100-44],
        [100-53, 100-44],
        [100-53, 100-44],
        [100-53, 100-44],
        [100-53, 100-44],
        [100-53, 100-44],
        [100-53, 100-44],
        [100-53, 100-44],
        [100-53, 100-44],
      ],
      fill: [20, 30, 30],
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

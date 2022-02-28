let date_today, date_100_years_from_now;
var offsetX, offsetY, sqSide;

function setup() {
  createCanvas(windowWidth, windowHeight);
  windowResized();
  date_today = new Date();
  // console.log(date_today);
  date_100_years_from_now = new Date(2122, 2 - 1, 28, 0, 0, 0);
  // console.log(date_100_years_from_now);
  textSize(sqSide/20)
  textAlign(CENTER);
  noStroke();
  fill(255);
}

function draw() {
  background(0);
  push();
  translate(offsetX, offsetY);
  do_the_thing();
  pop();
}

const do_the_thing = () => {
  if(date_today > date_100_years_from_now) {
    text('ヨーグルトだってのはわかったけど、\n100年経ったらヨーグルトも腐るわ。\nいいかげん捨てましょう。', sqSide/2, sqSide/2);
  } else {
    text('買い物リスト:\n✅ヨーグルト', sqSide/2 ,sqSide/2);
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

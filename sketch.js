/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let px, py;
let trail;
let angle = 0;
let colorR = 255;
let colorG = 192;
let colorB = 203;
let r = 90;
let c = 160;
let d = -20;
let colorchange = true;

function setup() {
  let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
  background(220);
  angleMode(DEGREES);
  px = mouseX;
  py = mouseY;
  trail = createGraphics(width, height);

  ballX = width / 2;
  ballY = height / 2;
  vx = random(-5, 5);
  vy = random(-3, 3);
}
function draw() {
  background(220);
  text(
    "MOVE or DRAG the mouse or PRESS the keyboard to interact with the yarn ball",
    20,
    20
  );

  let dx = mouseX - px;
  let speed = constrain(dx, -60, 60) * 0.8;
  angle += speed;

  trail.stroke(255, 184, 198);
  trail.strokeWeight(2);
  trail.line(px, py, mouseX, mouseY);
  px = mouseX;
  py = mouseY;
  image(trail, 0, 0);

  let tremble = false;
  if (ballY + 20 > height / 2) {
    tremble = true;
  }

  if (tremble) {
    ballX += sin(frameCount * 30) * 2;
    angle += sin(frameCount * 20) * 2;
  }

  push();
  translate(mouseX, mouseY);
  rotate(angle);
  drawBall(0, 0, colorR, colorG, colorB);
  limbs(0, 0);
  pop();
}
function drawBall(x, y, colorR, colorG, colorB) {
  push();

  //ball
  noStroke();
  if (colorchange == true) {
    fill(colorR, colorG, colorB);
  }
  if (colorchange == false) {
    fill(139, 0, 0);
  }

  circle(x, y, 180);

  stroke(0);
  noFill();

  //left eye
  let leftX = -40;
  let leftY = -20;
  let leftAngle = atan2(mouseY - leftY - y - 220, mouseX - leftX - x - 200);

  push();
  translate(leftX, leftY);
  fill(255);
  ellipse(0, 0, 40, 40);
  rotate(leftAngle - angle);
  fill(0);
  ellipse(10, 0, 20, 20);
  pop();

  //right eye
  let rightX = 40;
  let rightY = -20;

  let rightAngle = atan2(mouseY - rightY - y - 220, mouseX - rightX - x - 200);

  push();
  translate(rightX, rightY);
  fill(255);
  ellipse(0, 0, 40, 40);
  rotate(rightAngle - angle);
  fill(0);
  ellipse(10, 0, 20, 20);
  pop();

  //decoration
  push();
  stroke(255, 116, 140);
  noFill();
  bezier(-70, -50, 0, -70, 20, -70, 70, -50);
  line(-90, 0, 90, 0);
  bezier(-70, 50, 0, 70, 20, 70, 70, 50);
  pop();
  endShape();
}
function limbs(x, y) {
  rotate(angle);
  let swing = sin(frameCount * 3) * 20;
  let lift = cos(frameCount * 2) * 10;

  stroke(255, 116, 140);
  strokeWeight(3);
  noFill();
  bezier(90, 0, 120, -10, 200, -20, c + swing, d + 20 + lift);
  bezier(-90, 0, -120, -10, -200, -20, -c - swing, d + 20 + lift);
}
function mouseDragged() {
  colorG += 5;
  colorB += 5;
  if (colorG > 255) {
    colorG = 0;
    colorR = 139;
  }
  if (colorB > 255) {
    colorB = 0;
  }
  if (colorR == 139) {
    colorR = 255;
    colorG = 0;
    colorB = 0;
    flag = false;
  }
}
function keyPressed() {
  c += 10;
  d += -10;
}
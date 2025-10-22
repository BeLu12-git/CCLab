let px, py;
let trail;
let angle = 0;
let colorR = 255;
let colorG = 192;
let colorB = 203;
let c = 160;
let d = -20;
let ballRadius = 80;
let tremble = false;
let trembleAngle = 2;
let particleX, particleY, particleVY, particleSize, particleCol;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  background(220);
  angleMode(DEGREES);
  px = mouseX;
  py = mouseY;
  trail = createGraphics(width, height);
  newParticle();
}
function draw() {
  background(255);
  for (let x = 0; x < width + 10; x += 40) {
    for (let y = 0; y < height ; y += 40) {
      noStroke();
      fill(random(200, 255), random(0, 200), random(150, 250),99.9999);
      circle(x, y, 10);
    }
  }
  

  fill(255, 20, 147);
  textFont("Caveat Brush");
  textSize(25);
  text(
    "Click the KEYBOARD to clean up for Yarnie",
    250,
    20);
  

  let dx = mouseX - px;
  let speed1 = constrain(dx, -60, 60) * 0.8;
  angle += speed1;
  trail.stroke(colorR, colorG, colorB);
  trail.strokeWeight(2);
  trail.line(px, py, mouseX, mouseY);
  px = mouseX;
  py = mouseY;
  image(trail, 0, 0);

  tremble = false;
  if (mouseY  > height / 2) {
    tremble = true;
  }

  let trembleX = 0;
  let trembleY = 0;
  if (tremble) {
    trembleX = sin(frameCount * 30) * trembleAngle * 1.1;
    trembleY = sin(frameCount * 20) * trembleAngle * 1.1;
    angle += trembleY;
  }

  push();
  translate(mouseX, mouseY);
  rotate(angle);
  drawBall(0, 0, colorR, colorG, colorB);
  limbs(0, 0);
  pop();

  fill(particleCol);
  noStroke();
  circle(particleX, particleY, particleSize);
  particleY += particleVY;

  
  if (dist(particleX, particleY, mouseX, mouseY) < ballRadius) {
    colorR = random(200, 255);
    colorG = random(0, 150);
    colorB = random(0, 150);
    ballRadius += 1;
    trembleAngle += 0.2;
    newParticle(); 
  }

 
  if (particleY + particleSize / 2 < 0) {
    newParticle();
  }
}
function drawBall(x, y, colorR, colorG, colorB) {
  push();

  //ball
  noStroke();
  fill(colorR, colorG, colorB);
  circle(x, y, ballRadius * 2);
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
  bezier(
    (-ballRadius * 2) / 3,
    (-ballRadius * 2) / 3,
    0,
    (-ballRadius * 4) / 3,
    (ballRadius * 2) / 3,
    (-ballRadius * 2) / 3,
    (ballRadius * 2) / 3,
    (-ballRadius * 2) / 3
  );
  line(-ballRadius, 0, ballRadius, 0);
  bezier(
    (-ballRadius * 2) / 3,
    (ballRadius * 2) / 3,
    0,
    (ballRadius * 4) / 3,
    (ballRadius * 2) / 3,
    (ballRadius * 2) / 3,
    (ballRadius * 2) / 3,
    (ballRadius * 2) / 3
  );
  pop();

  pop();
}
function limbs(x, y) {
  let swing = sin(frameCount * 3) * 20;
  let lift = cos(frameCount * 2) * 10;

  stroke(255, 116, 140);
  strokeWeight(3);
  noFill();
  bezier(
    ballRadius,
    0,
    (ballRadius * 3) / 2,
    -ballRadius / 9,
    (ballRadius * 20) / 9,
    (-ballRadius * 2) / 9,
    c + swing,
    d + 20 + lift
  );
  bezier(
    -ballRadius,
    0,
    (-ballRadius * 3) / 2,
    -ballRadius / 9,
    (-ballRadius * 20) / 9,
    (-ballRadius * 2) / 9,
    -c - swing,
    d + 20 + lift
  );
}

function newParticle(x,y) {
  particleX = random(0,800)
  particleY = 500;
  particleVY = random(-40, -5);
  particleSize = random(5,80);
  particleCol = color(random(150, 255), random(80, 200), random(120, 255));
}

function keyPressed() {
  trail.clear();
}

let px, py;
let trail;
let angle = 0;
let colorR = 255;
let colorG = 192;
let colorB = 203;
let c = 160;
let d = -20;
let colorchange = true;
let particles = [];
let ballRadius = 80;
let tremble = false;
let trembleAngle = 2;

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  background(220);

  angleMode(DEGREES);
  px = mouseX;
  py = mouseY;
  trail = createGraphics(width, height);
}
function draw() {
  background(255);
  for (let x = 0; x < width + 10; x += 40) {
    for (let y = 0; y < height; y += 40) {
      noStroke();
      fill(random(250, 255), random(0, 200), random(150, 250), 99.5);
      circle(x, y, 10);
    }
  }

  fill(255, 20, 147);
  textFont("Caveat Brush");
  textSize(25);
  text(
    "AVOID the attacking particles :)\nClick the KEYBOARD to restart",
    250,
    20);
  
  fill(255, 20, 147);
  textFont("Caveat Brush");
  textSize(20);
  text("Score:"+ frameCount,700,30) ; 
 

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
  if (mouseY + 20 > height / 2) {
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

  updateParticles();
  if (frameCount % 30 == 0) {
    Particles();
  }
}
function drawBall(x, y, colorR, colorG, colorB) {
  push();

  //ball
  noStroke();
  if (colorchange) {
    fill(colorR, colorG, colorB);
  } else {
    fill(139, 0, 0);
  }
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
  rotate(angle);
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

function Particles() {
  let p = {
    x: random(width),
    y: height,
    vy: random(-8, -5),
    size: random(10, 25),
    col: color(random(150, 255), random(80, 200), random(120, 255)),
  };
  particles[particles.length] = p;
}

function updateParticles() {
  let newParticles = [];
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.y += p.vy;

    fill(p.col);
    noStroke();
    circle(p.x, p.y, p.size);

    let centerX = mouseX;
    if (tremble) {
      centerX = mouseX + sin(frameCount * 30) *trembleAngle  * 1.1;
    } else {
      centerX = mouseX;
    }
    let centerY = mouseY;
    if (tremble) {
      centerY = mouseY + sin(frameCount * 30) * trembleAngle * 1.1;
    } else {
      centerY = mouseY;
    }

    if (dist(p.x, p.y, centerX, centerY) < ballRadius) {
      colorR = random(200, 255);
      colorG = random(0, 150);
      colorB = random(0, 150);
      ballRadius += 0.5;
      trembleAngle += 0.2;
    } else if (p.y + p.size / 2 > 0) {
      newParticles[newParticles.length] = p;
    }
  }
  particles = newParticles;
}

function keyPressed() {
  trail.clear();
}

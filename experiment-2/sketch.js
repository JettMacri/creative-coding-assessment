// Experiment 2: Mouse Disturber with 3 variations
// 1: Smooth Push – particles move away from mouse
// 2: Tangential Swirl – particles orbit around mouse
// 3: Gravity Well – particles pull toward mouse
// Press 1,2,3 to switch modes

let particles = [];     // array to hold all particle objects
let gridGap = 35;       // distance between grid points (pixels)
let cols, rows;         // number of columns and rows in grid
let mode = 1;           // current behaviour mode (1,2,3)
let bgColor, particleColor, lineColor; // colour variables

function setup() {
  createCanvas(windowWidth, windowHeight);
  // dark blue-black background
  bgColor = color(10, 10, 20);
  // purple for particles
  particleColor = color(180, 130, 255);
  // semi-transparent purple for connecting lines
  lineColor = color(180, 130, 80, 50);
  initGrid();
}

// create the grid of particles
function initGrid() {
  particles = [];
  cols = floor(width / gridGap);
  rows = floor(height / gridGap);
  // loop through each row and column
  for (let y = 0; y <= rows; y++) {
    for (let x = 0; x <= cols; x++) {
      // each particle gets its original position at grid intersection
      particles.push(new Particle(x * gridGap, y * gridGap));
    }
  }
}

function draw() {
  background(bgColor);
  
  // draw each particle and the connecting lines
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.applyMouseEffect();  // apply force based on mouse position & mode
    p.update();            // update velocity and position
    p.show();              // draw the particle
    
    // draw horizontal line to neighbour to the right
    stroke(lineColor);
    strokeWeight(1);
    // check if not at last column
    if ((i + 1) % (cols + 1) !== 0 && i + 1 < particles.length) {
      line(p.pos.x, p.pos.y, particles[i + 1].pos.x, particles[i + 1].pos.y);
    }
    // draw vertical line to neighbour below
    let below = i + (cols + 1);
    if (below < particles.length) {
      line(p.pos.x, p.pos.y, particles[below].pos.x, particles[below].pos.y);
    }
  }
  
  drawUI(); // show instructions
}

// on-screen text UI
function drawUI() {
  fill(255, 200);
  noStroke();
  textAlign(CENTER);
  textSize(12);
  text("1: Smooth Push | 2: Tangential Swirl | 3: Gravity Well", width/2, 30);
}

// switch mode with number keys
function keyPressed() {
  if (key === '1') mode = 1;
  if (key === '2') mode = 2;
  if (key === '3') mode = 3;
}

// Particle class: each point in the grid
class Particle {
  constructor(x, y) {
    this.origin = createVector(x, y); // home position
    this.pos = createVector(x, y);    // current position
    this.vel = createVector(0, 0);    // velocity
  }
  
  // apply mouse force based on current mode
  applyMouseEffect() {
    let dx = this.pos.x - mouseX;
    let dy = this.pos.y - mouseY;
    let dist = sqrt(dx*dx + dy*dy);
    let maxDist = 150;   // maximum distance where mouse affects particle
    if (dist > maxDist) return;   // too far – no effect
    
    // strength: 1 at mouse centre, 0 at maxDist
    let strength = map(dist, 0, maxDist, 1, 0);
    strength = constrain(strength, 0, 1);
    
    if (mode === 1) {
      // SMOOTH PUSH: move directly away from mouse
      // direction vector = (dx, dy) normalized, then scaled
      let pushX = dx / dist * 1.2 * strength;
      let pushY = dy / dist * 1.2 * strength;
      this.vel.x += pushX;
      this.vel.y += pushY;
    }
    else if (mode === 2) {
      // TANGENTIAL SWIRL: move perpendicular to direction to mouse
      // perpendicular = (-sin(angle), cos(angle))
      let angle = atan2(dy, dx);
      let perpX = -sin(angle);
      let perpY = cos(angle);
      this.vel.x += perpX * 1.5 * strength;
      this.vel.y += perpY * 1.5 * strength;
    }
    else if (mode === 3) {
      // GRAVITY WELL: pull directly toward mouse
      // negative dx because we want to move toward mouse (reduce distance)
      let pullX = -dx * 0.04 * strength;
      let pullY = -dy * 0.04 * strength;
      this.vel.x += pullX;
      this.vel.y += pullY;
    }
  }
  
  // update physics: spring force back to origin + damping
  update() {
    // spring force pulling back to original grid position
    let toOrigin = p5.Vector.sub(this.origin, this.pos);
    toOrigin.mult(0.04);   // spring strength (gentle)
    this.vel.add(toOrigin);
    
    // damping: gradually reduce velocity to prevent wild motion
    this.vel.mult(0.94);
    
    // update position
    this.pos.add(this.vel);
  }
  
  // draw the particle as a small circle
  show() {
    noStroke();
    fill(particleColor);
    ellipse(this.pos.x, this.pos.y, 3.5, 3.5);
  }
}

// if window size changes, rebuild grid to fit new dimensions
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initGrid();
}
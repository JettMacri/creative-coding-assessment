// TUG OF CHAOS
// One‑key two‑player button masher
// Player 1: F key  |  Player 2: J key
// First to pull rope 100% wins

let mode = "MENU";
let p1Power = 50;    // 0 = full right (P2 wins), 100 = full left (P1 wins)
let winThreshold = 100;
let winner = "";
let shake = 0;
let p1MashCount = 0;
let p2MashCount = 0;
let frameCounter = 0;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER);
}

function draw() {
  // Screen shake effect
  if (shake > 0) {
    translate(random(-shake, shake), random(-shake, shake));
    shake *= 0.9;
  }
  
  background(10, 10, 30);
  
  if (mode === "MENU") drawMenu();
  else if (mode === "GAME") {
    updateGame();
    drawGame();
    checkWin();
  } else if (mode === "WIN") drawWinScreen();
}

// ---------------------- MENU ----------------------
function drawMenu() {
  fill(168, 85, 247);
  textSize(48);
  text("⚡ TUG OF CHAOS ⚡", width/2, height/2 - 100);
  
  fill(255);
  textSize(20);
  text("Player 1: SPAM [F] to pull LEFT", width/2, height/2 - 20);
  text("Player 2: SPAM [J] to pull RIGHT", width/2, height/2 + 10);
  text("First to pull the rope to YOUR side wins!", width/2, height/2 + 60);
  text("FASTER FINGERS = VICTORY", width/2, height/2 + 100);
  
  drawButton(width/2, height/2 + 160, 220, 50, "START");
  
  if (mouseIsPressed && 
      mouseX > width/2 - 110 && mouseX < width/2 + 110 &&
      mouseY > height/2 + 135 && mouseY < height/2 + 185) {
    resetGame();
    mode = "GAME";
  }
}

// ---------------------- GAME LOGIC ----------------------
function resetGame() {
  p1Power = 50;
  p1MashCount = 0;
  p2MashCount = 0;
  frameCounter = 0;
  shake = 0;
}

function updateGame() {
  // Real‑time key detection for mashing
  // No cooldown – every frame the key is down counts as a press
  // But to prevent 60 presses per second, we limit to once per 3 frames
  // This makes it fair for both players and prevents cheating with auto-clickers
  if (frameCounter % 3 === 0) {
    if (keyIsDown(70)) { // F key
      p1Power = min(p1Power + 3, winThreshold);
      shake = 3;
    }
    if (keyIsDown(74)) { // J key
      p1Power = max(p1Power - 3, 0);
      shake = 3;
    }
  }
  frameCounter++;
  
  // Natural drift toward center if no one presses (optional, makes game less stalemate)
  if (!keyIsDown(70) && !keyIsDown(74)) {
    if (p1Power > 50) p1Power = max(50, p1Power - 0.5);
    if (p1Power < 50) p1Power = min(50, p1Power + 0.5);
  }
}

function drawGame() {
  // Draw background sides
  noStroke();
  fill(59, 130, 246, 50);
  rect(0, 0, width/2, height);
  fill(239, 68, 68, 50);
  rect(width/2, 0, width/2, height);
  
  // Draw rope track
  stroke(255, 100);
  strokeWeight(4);
  line(100, height/2, width - 100, height/2);
  
  // Draw rope knot (position based on p1Power)
  let ropeX = map(p1Power, 0, winThreshold, width - 100, 100);
  fill(168, 85, 247);
  noStroke();
  ellipse(ropeX, height/2, 40, 40);
  fill(255);
  ellipse(ropeX, height/2, 20, 20);
  
  // Draw power bars
  fill(59, 130, 246);
  rect(50, height - 50, map(p1Power, 0, winThreshold, 0, width/2 - 60), 30);
  fill(239, 68, 68);
  rect(width/2 + 10, height - 50, map(winThreshold - p1Power, 0, winThreshold, 0, width/2 - 60), 30);
  
  // Percentage text
  fill(255);
  textSize(16);
  text(floor(p1Power) + "%", ropeX, height/2 - 20);
  text(floor(winThreshold - p1Power) + "%", ropeX, height/2 + 40);
  
  // Instructions
  fill(200);
  textSize(14);
  text("SPAM F", width/4, height - 80);
  text("SPAM J", width*3/4, height - 80);
  
  // Back button
  fill(255, 30);
  rect(20, 20, 90, 35, 5);
  fill(255);
  textSize(14);
  text("MENU", 65, 37);
  if (mouseIsPressed && mouseX > 20 && mouseX < 110 && mouseY > 20 && mouseY < 55) {
    mode = "MENU";
  }
}

function checkWin() {
  if (p1Power >= winThreshold) {
    mode = "WIN";
    winner = "PLAYER 1 (BLUE)";
  } else if (p1Power <= 0) {
    mode = "WIN";
    winner = "PLAYER 2 (RED)";
  }
}

function drawWinScreen() {
  background(10, 10, 30);
  fill(168, 85, 247);
  textSize(50);
  text(winner + " WINS!", width/2, height/2 - 50);
  textSize(24);
  fill(255);
  text("Victory by button mashing!", width/2, height/2);
  textSize(18);
  text("Click to return to menu", width/2, height/2 + 80);
  
  if (mouseIsPressed) {
    mode = "MENU";
  }
}

function drawButton(x, y, w, h, label) {
  fill(168, 85, 247);
  rectMode(CENTER);
  rect(x, y, w, h, 10);
  fill(255);
  textSize(20);
  text(label, x, y+5);
  rectMode(CORNER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
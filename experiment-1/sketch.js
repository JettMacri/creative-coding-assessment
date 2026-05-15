// Audio visualizer with 4 modes: bars, heart, wave, circular ring
// Press 1 (music file) or 2 (mic) to start, then 1-4 to switch modes
// Press M or ESC to return to menu

let song;               // audio file player
let fft;                // fast fourier transform for frequency analysis
let mic;                // microphone input
let useMic = false;     // false = song file, true = mic
let mode = 0;           // 0=bars, 1=heart, 2=wave, 3=circular ring
let started = false;    // whether visualizer is running
let beatThreshold = 180; // bass level needed to trigger a beat
let lastBeatTime = 0;   // timestamp of last beat (to avoid rapid triggers)
let volume = 0.5;       // volume level 0-1
let stars = [];         // array of background stars
let bgColor, mainColor, glowColor; // colour variables

function preload() {
  song = loadSound('song.mp3'); // load music file – make sure file exists
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT(0.8, 256);  // smoothing 0.8, FFT size 256
  mic = new p5.AudioIn();
  bgColor = color(5, 5, 10);       // dark background
  mainColor = color('#a855f7');    // purple
  glowColor = color('#d8b4fe');    // light purple glow
  // create 25 stars at random positions
  for (let i = 0; i < 25; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(bgColor);
  
  // show start screen if not started
  if (!started) {
    drawStartScreen();
    return;
  }
  
  // get audio data
  let spectrum = fft.analyze();   // array of frequency amplitudes (0-255)
  let waveform = fft.waveform();  // raw audio wave (-1 to 1)
  let bass = fft.getEnergy("bass"); // energy in low frequencies (0-255)
  
  // beat detection: bass high enough and enough time since last beat
  let isBeat = false;
  if (bass > beatThreshold && millis() - lastBeatTime > 180) {
    isBeat = true;
    lastBeatTime = millis();
  }
  
  // update and draw stars – they react to beats
  for (let s of stars) {
    s.update(isBeat);
    s.show(isBeat);
  }
  
  drawUI(); // on-screen instructions
  
  push(); // save current drawing state
  // choose which visual mode to draw
  if (mode === 0) drawBars(spectrum);
  else if (mode === 1) drawSingleHeart(isBeat);
  else if (mode === 2) drawWave(waveform);
  else if (mode === 3) drawCircularRing(spectrum, isBeat);
  pop(); // restore drawing state
}

// Star class: background stars that drift upward and pulse on beat
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
  }
  
  update(isBeat) {
    this.y -= 0.2;           // move upward slowly
    if (this.y < 0) this.y = height; // wrap to bottom
    if (isBeat) {
      this.size = random(4, 6);      // grow on beat
    } else {
      // smooth shrink back to normal size using lerp
      this.size = lerp(this.size, random(1, 2), 0.1);
    }
  }
  
  show(isBeat) {
    noStroke();
    if (isBeat) {
      fill(168, 85, 247, 220);       // bright purple on beat
      drawingContext.shadowBlur = 15; // add glow
      drawingContext.shadowColor = '#a855f7';
    } else {
      fill(200, 200, 255, 100);       // faint white normally
      drawingContext.shadowBlur = 0;
    }
    ellipse(this.x, this.y, this.size);
    drawingContext.shadowBlur = 0;     // reset so glow doesn't affect other drawings
  }
}

// Mode 1: Heart shape – size changes on beat (smaller = pulse feeling)
function drawSingleHeart(isBeat) {
  translate(width / 2, height / 2);
  noFill();
  strokeWeight(3);
  stroke(mainColor);
  // if beat, heart gets smaller to feel like a pulse
  let r = isBeat ? 11 : 13;
  beginShape();
  // parametric equation for a heart
  for (let t = 0; t < TWO_PI; t += 0.05) {
    let x = r * 16 * pow(sin(t), 3);
    let y = -r * (13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t));
    vertex(x, y);
  }
  endShape(CLOSE);
}

// Mode 3: Circular ring – lines radiate from centre based on frequency amplitude
function drawCircularRing(spectrum, isBeat) {
  translate(width / 2, height / 2);
  // step by 2 to reduce visual clutter
  for (let i = 0; i < spectrum.length; i += 2) {
    let angle = map(i, 0, spectrum.length, 0, TWO_PI);
    let amp = spectrum[i];
    let r = map(amp, 0, 255, 100, 280); // louder = further out
    let x = r * cos(angle);
    let y = r * sin(angle);
    // colour blends between mainColor and glowColor based on amplitude
    stroke(lerpColor(mainColor, glowColor, amp / 255));
    strokeWeight(isBeat ? 4 : 2);
    line(100 * cos(angle), 100 * sin(angle), x, y);
  }
}

// Mode 0: Traditional bar visualiser – each bar represents a frequency band
function drawBars(spectrum) {
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    // invert height so bars go upward from bottom
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    fill(mainColor);
    noStroke();
    rect(x, height, width / spectrum.length, h);
  }
}

// Mode 2: Waveform visualiser – draws the raw audio wave shape
function drawWave(waveform) {
  stroke(glowColor);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
}

// Draw on-screen UI text with instructions and volume percentage
function drawUI() {
  fill(255, 150);
  noStroke();
  textAlign(CENTER);
  textSize(12);
  text("1-4: Modes | Click: Play/Pause | Arrows: Volume " + floor(volume * 100) + "% | M/ESC: Menu", width/2, 30);
}

// Start screen before audio begins
function drawStartScreen() {
  textAlign(CENTER, CENTER);
  fill(mainColor);
  textSize(30);
  text("STARRY VISUALIZER", width/2, height/2 - 40);
  textSize(14);
  text("Press 1 for Music File | Press 2 for Mic", width/2, height/2 + 20);
}

// Click to pause/play only when using music file (not mic)
function mousePressed() {
  if (started && !useMic) {
    if (song.isPlaying()) song.pause();
    else song.play();
  }
}

// Function to return to menu: stop audio, reset flags
function backToMenu() {
  if (song.isPlaying()) song.stop();
  if (mic && mic.enabled) mic.stop();
  started = false;
  useMic = false;
  mode = 0;
  volume = 0.5;
  fft.setInput(null);   // disconnect any audio input
}

// Keyboard controls: start, switch modes, volume, return to menu
function keyPressed() {
  // Back to menu if game is running and M or ESC is pressed
  if (started && (key === 'm' || key === 'M' || keyCode === 27)) {
    backToMenu();
    return;
  }
  
  // Starting the visualizer
  if (!started) {
    if (key === '1') {
      useMic = false;
      song.loop();      // loop the music file
      started = true;
    }
    if (key === '2') {
      useMic = true;
      mic.start();      // start microphone
      fft.setInput(mic); // route mic to FFT
      started = true;
    }
    return;
  }
  
  // Mode switching (1-4)
  if (key === '1') mode = 0;
  if (key === '2') mode = 1;
  if (key === '3') mode = 2;
  if (key === '4') mode = 3;
  
  // Volume control (only affects music file, not mic)
  if (keyCode === UP_ARROW) {
    volume = min(volume + 0.05, 1.0);
    if (!useMic) song.setVolume(volume);
  }
  if (keyCode === DOWN_ARROW) {
    volume = max(volume - 0.05, 0.0);
    if (!useMic) song.setVolume(volume);
  }
}

// Resize canvas and keep grid intact when window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
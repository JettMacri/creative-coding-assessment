# creative-coding-assessment
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

creative-coding-assessment
Student Name: Prithvi Giresh Kumar

Student ID: 638031

Module: Creative Coding

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 Portfolio Overview
This repository contains three computational experiments developed in p5.js. These projects demonstrate a progression from reactive data visualization to optimized physics and interactive game design.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
📁 Experiments

### Experiment 1 – Audio Visualiser (Theme: real‑time audio visualiser with 4 effects)

**Folder:** `exp1_audio_visualiser/`  
**Live link:** [Insert p5.js fullscreen link here]  
**Edit link:** [Insert p5.js editor link here]

A real‑time audio visualiser that reacts to music (file upload) or microphone input. Features four switchable visual modes:

- **Mode 0:** Frequency bars – traditional spectrum analyser.
- **Mode 1:** Pulsing heart – parametric heart shape that shrinks on beat.
- **Mode 2:** Waveform – raw audio wave drawn as a continuous line.
- **Mode 3:** Circular ring – radiating lines whose length and colour respond to frequency amplitude.

Additional features:  
- Beat detection (bass threshold) – stars pulse and glow on beat.  
- Background starfield with smooth size interpolation.  
- Volume control (up/down arrows), play/pause (click), return to menu (M/ESC).  
- Microphone or local MP3 file input.

**Techniques used:** FFT analysis, beat detection, parametric equations, `lerp()` for smooth animation, `drawingContext` for glow effects.  
**Originality:** Heart equation and circular ring visuals are custom; beat‑driven starfield adds atmosphere not found in basic tutorials.  
**Acknowledgements:** p5.js sound library documentation for FFT and AudioIn. Heart equation from public domain parametric formula. All other code original.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Experiment 2 – Mouse Disturber (Theme: force field with 3 variations)

**Folder:** `exp2_mouse_disturber/`  
**Live link:** [Insert p5.js fullscreen link here]  
**Edit link:** [Insert p5.js editor link here]

A grid of particles connected by lines. The mouse creates a disturbance field with three distinct behaviours, switchable with keys `1`, `2`, `3`:

- **Mode 1 – Smooth Push:** Particles are gently pushed away from the mouse, creating a clean circular clearing.
- **Mode 2 – Soft Attraction:** Particles slowly drift toward the mouse with eased motion, like a calm gravity well.
- **Mode 3 – Orbital Flow:** Particles circle the mouse in a smooth spiral, creating elegant vortex patterns.

All modes include:  
- Spring force returning particles to their original grid positions.  
- Damping to prevent chaotic motion.  
- Minimal purple‑blue aesthetic with thin connecting lines.

**Techniques used:** Vector forces, easing, perpendicular orbits, damping, grid‑based particle system.  
**Originality:** The orbital flow mode is uncommon in student work; the combination of three conceptually distinct forces within one sketch shows experimentation.  
**Acknowledgements:** Inspired by class demo on particle systems but all force logic and UI are original.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Experiment 3 – One‑Key Two‑Player Game (Theme: one‑key game with clear win state)

**Folder:** `exp3_one_key_game/`  
**Live link:** [Insert p5.js fullscreen link here]  
**Edit link:** [Insert p5.js editor link here]

**"TUG OF CHAOS"** – a fast‑paced button‑mashing game for two players.

- **Player 1** spams the `F` key to pull the rope left.  
- **Player 2** spams the `J` key to pull the rope right.  
- The rope moves in real time – each key press moves it 3% toward your side.  
- First to pull the rope fully to their side (100% for P1 left, 0% for P2 right) wins.  
- Screen shake on successful pulls, visual cooldown indicator, win screen with click‑to‑return.

**Why it’s different from standard paddle games:**  
- No timing or precision – pure speed competition.  
- Rope naturally drifts to centre if both stop, preventing stalemates.  
- Short rounds (5–15 seconds) create adrenaline and replayability.

**Techniques used:** Real‑time key polling (`keyIsDown` with frame‑rate limiting), linear interpolation for rope position, screen shake using `translate()`, state management (MENU/GAME/WIN).  
**Originality:** Entirely custom game concept – not copied from any online tutorial. Emphasises physical competition over strategic depth.  
**Acknowledgements:** No external code sources. Developed from scratch using p5.js reference.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 🧪 How to Run

1. Clone this repository or download the ZIP.  
2. Open each experiment’s folder and launch `index.html` in a modern browser (Chrome/Firefox recommended).  
3. For **Experiment 1**, ensure you have a file named `song.mp3` in the same folder, or use microphone input.  
4. For **Experiment 2**, simply move your mouse over the grid.  
5. For **Experiment 3**, two players share one keyboard (Player 1: F, Player 2: J).

Alternatively, use the live p5.js editor links above (once uploaded).

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📝 Commentary & Reflection

Full reflective commentary (~300 words per experiment) is available on the **Canva portfolio website**:  
[Insert Canva link here]

Each commentary includes:  
- Starting point / inspiration.  
- Technical development and experiments.  
- Problems encountered and solutions.  
- Critical self‑reflection on strengths and areas for improvement.  
- Source acknowledgements where applicable.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## ✅ Submission Deliverables

- **GitHub repository:** [Insert GitHub link here]  
- **Canva website:** [Insert Canva link here]  
- **PDF submission** (containing above links + direct live/edit links) – submitted via Moodle.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## 📅 Deadline

**May 15, 2026**

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

*All code is original except where noted in comments or this README. Did take help from codingtrain from youtube*

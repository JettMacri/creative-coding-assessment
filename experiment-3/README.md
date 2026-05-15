# Experiment 3 – One‑Key Two‑Player Game: TUG OF CHAOS

**Theme:** One‑key game with clear win state  
**Student:** Prithvi Giresh Kumar (638031)

## Description
A fast‑paced button‑mashing game for two players on one keyboard.
- **Player 1** spams the `F` key to pull the rope left.
- **Player 2** spams the `J` key to pull the rope right.

Each key press moves the rope 3% toward your side. The rope naturally drifts back to centre if no one presses, preventing stalemates. First to pull fully to their side (100% left or 0% right) wins. Visual feedback includes screen shake, a cooldown bar, and a win screen.

## How to Run
1. Open `index.html` in a browser.
2. Two players share the same keyboard.
3. Player 1: spam `F`. Player 2: spam `J`.
4. First to reach 0% or 100% wins. Click the win screen to return to menu.

## Techniques Used
- Real‑time key polling (`keyIsDown` with frame‑rate limiting)
- Linear interpolation for rope position
- Screen shake with `translate()`
- State management (MENU, GAME, WIN)
- Natural rope drift toward centre

## Acknowledgements
- Entirely original game concept – not based on any tutorial.
- Only p5.js reference documentation used.

## Links
- Live version: https://editor.p5js.org/JettMacri/full/P-60p2-sy
- Edit/code: https://editor.p5js.org/JettMacri/sketches/P-60p2-sy

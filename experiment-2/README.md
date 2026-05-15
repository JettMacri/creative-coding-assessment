# Experiment 2 – Mouse Disturber (3 variations)

**Theme:** Force field with 3 different behaviours  
**Student:** Prithvi Giresh Kumar (638031)

## Description
A grid of particles connected by lines. The mouse disturbs the grid in three ways, switchable with keys `1`, `2`, `3`:
- **Mode 1 – Smooth Push:** particles move directly away from the mouse, creating a clean circular clearing.
- **Mode 2 – Tangential Swirl:** particles orbit the mouse perpendicularly, forming elegant spirals.
- **Mode 3 – Gravity Well:** particles are gently pulled toward the mouse, like a calm black hole.

Each particle has a spring force back to its original grid position, plus damping for fluid motion. Force strength fades with distance so only nearby particles react.

## How to Run
1. Open `index.html` in a browser.
2. Move your mouse over the grid.
3. Press `1`, `2`, or `3` to switch disturbance behaviours.

## Techniques Used
- Particle system with grid layout
- Vector forces (radial push, perpendicular orbit, radial pull)
- Spring force (return to origin)
- Damping (`vel.mult(0.94)`)
- Distance‑based strength mapping (`map(dist, 0, 150, 1, 0)`)

## Acknowledgements
- Grid and particle class structure inspired by a class demo.
- All three force calculations are original.
- No external code copied.

## Links
- Live version: https://editor.p5js.org/JettMacri/full/CNDiWdjBY
- Edit/code: https://editor.p5js.org/JettMacri/sketches/CNDiWdjBY

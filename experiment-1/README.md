# Experiment 1 – Audio Visualiser (4 effects)

**Theme:** Real‑time audio visualiser with 4 different effects  
**Student:** Prithvi Giresh Kumar (638031)

## Description
A real‑time audio visualiser that reacts to music (MP3 file) or microphone input. Features four switchable visual modes:
- **Mode 0:** Frequency bars (spectrum analyser)
- **Mode 1:** Pulsating parametric heart (shrinks on beat)
- **Mode 2:** Raw waveform line
- **Mode 3:** Circular ring with radiating lines

Additional features: beat detection (bass threshold), background starfield that glows on beat, volume control, play/pause, return to menu (M/ESC).

## How to Run
1. Open `index.html` in a modern browser (Chrome/Firefox).
2. Place an MP3 file named `song.mp3` in the same folder, or use microphone input.
3. Press `1` to use music file, `2` to use microphone.
4. Keys `1-4` switch visual modes.
5. Up/down arrows control volume (music only). Click to play/pause. Press `M` or `ESC` to return to start screen.

## Techniques Used
- `p5.FFT` for frequency analysis
- `p5.AudioIn` for microphone input
- Beat detection (bass energy + cooldown)
- Parametric heart equation
- `lerp()` for smooth star size changes
- `drawingContext` for glow effects

## Acknowledgements
- Heart equation from public domain parametric formula.
- FFT and AudioIn techniques adapted from **Coding Train (Daniel Shiffman)** tutorials and p5.js reference.
- All other code (four modes, beat‑driven stars, UI, menu) is original.

## Links
- Live version: https://editor.p5js.org/JettMacri/full/aQ9_WkenX
- Edit/code: https://editor.p5js.org/JettMacri/sketches/aQ9_WkenX

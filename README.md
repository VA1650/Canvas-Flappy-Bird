# 🐦 Canvas Flappy Bird (OOP Arcade Engine)

A micro-arcade game built on vanilla JavaScript and HTML5 Canvas API. No external game engines used. The architecture is based on a singleton state manager (`game`) that controls the game loop via native display synchronization.

## 🏗 Architectural Decisions & Optimization

* **Memory Management & Garbage Collection:** Instead of letting the obstacle array grow infinitely, the engine uses a high-performance `this.columns.shift()` call to remove objects immediately after they exit the canvas viewport, preventing performance degradation during long sessions.
* **Asynchronous Asset Preloader:** To avoid Race Conditions during texture loading, a custom `onload` event counter is implemented. The game loop and geometry generation are blocked until all assets (`bird`, `background`, `columns`) are cached in memory.
* **Frame Synchronization:** Uses `requestAnimationFrame` instead of `setInterval` to prevent micro-stuttering and CPU-heavy background processing. It automatically syncs with the monitor's refresh rate (60Hz/120Hz/144Hz) and pauses execution when the browser tab is inactive.
* **AABB Collision Detection:** Implements Axis-Aligned Bounding Box detection to validate collisions between the bird and both column segments simultaneously, including boundary checks for the game field.

## 🎨 Styling & System Context

The interface natively supports `prefers-color-scheme`. The canvas context automatically adapts to OS-level theme settings:
* **Dark Mode (Default):** Black environment, high-contrast white canvas border.
* **Light Mode:** White environment, sharp black border for focus.

## 🔧 Project Structure

* `index.html` — Declarative markup, `<canvas>` initialization (288x512px), and CSS injection.
* `script.js` — State machine logic, `keydown` event handling, gravity physics calculation, and collision detection.

## 🎮 Controls

* `Any Keyboard Key` — Jump impulse (counteracting gravity).
* `Collision` — Triggers automatic session context restart (`location.reload()`) and resets the score counter.

---

---
name: add-globe-study
description: "Build Text Path Studies from its verified authored source using Canvas 2D, including the complete renderer, interactions, and required assets. Use when Codex needs to implement, port, or adapt this effect without requiring the ThreeUI package or reconstructing the visual from an approximation."
---

# Build Text Path Studies

## Description

Six interactive Canvas 2D typography studies spanning a globe, flowing outlines, morphing glyphs, cloth physics, ripples, and a particle sphere.

Recreate the authored behavior from the verified source, not from screenshots or the abbreviated orchestration sample in this skill. The implementation may live directly in the target project and does not require `@designcodeio/threeui`.

## Technologies

- React variant host
- Two exact authored Canvas 2D documents
- Six interactive text-path studies
- Sandboxed source isolation
- Light and dark palette controls

## Verified source material

- `text-on-a-path-ii.html — FIG 06 Globe, FIG 07 Outline Typeflow, FIG 08 Morphing Glyph Cloud, and FIG 11 Cloth`
- `text-on-a-path.html — FIG 04 Ripple and FIG 05 Ball`
- `src/shaders/text-path-studies/TextPathStudies.tsx`

Source revision: `SHA-256 2e21ae3b77c3 + e5d01ff0fc47`

## Implementation steps

1. Open every verified source file listed above and identify the renderer, host lifecycle, styles, and assets before editing.
2. Keep TextPathStudies as the public entry point and select globe-study, outline-typeflow, morphing-glyph-cloud, cloth-study, ripple-study, or ball-study with the variant prop.
3. Retain both complete authored Text on a Path documents and focus only the selected figure inside an allow-scripts-only sandbox.
4. Preserve each study's own drag, zoom, hover, click, morph, cloth, ripple, or particle interaction instead of flattening them into one renderer.
5. Expose shared mode, scale, opacity, and palette controls at the collection boundary.
6. Mount only the selected source document so inactive studies do not allocate canvases or animation loops.
7. Give the local component a sized, overflow-controlled parent and verify desktop, mobile, reduced-motion, and context-loss behavior.

Asset handling: This effect has no required external assets.

## Local component example

Import the copied local component rather than a package entrypoint:

```tsx
import { TextPathStudies } from "./effects/globe-study/TextPathStudies";
import "./effects/globe-study/styles.css";

export function Scene() {
  return <div className="effect-frame"><TextPathStudies /></div>;
}
```

## Core renderer pattern

This excerpt documents orchestration only. Copy the exact shader, geometry, pass, and interaction code from the verified source files.

```tsx
<TextPathStudies variant="outline-typeflow" mode="dark" />
```

## Behavior contract

- Runtime: Canvas 2D
- Passes: 1 selected sandboxed Canvas 2D study
- Interaction: Variant-specific drag, zoom, hover, click, morph, cloth, ripple, and particle interactions
- Assets: No external assets
- **source** (fixed): Six exact authored figures across two documents
- **renderer** (sandbox): Canvas 2D
- **mode** (optional): dark | light
- **variant** (optional): Six text-path studies
- **pixelRatio** (adaptive): ≤ 2.5
- **assets** (fixed): None

## Verification

1. Compare the rendered composition, animation timing, pointer behavior, and state transitions with the source implementation.
2. Exercise resize, high-DPI, mobile/coarse-pointer, reduced-motion, tab visibility, and WebGL context-loss paths where applicable.
3. Confirm every animation frame, observer, listener, geometry, buffer, texture, framebuffer, material, and renderer is released on teardown.
4. Check the browser console and confirm the effect renders at native-or-better backing resolution.

## Guardrails

- Do not substitute a visually similar package, demo, shader, or runtime.
- Do not approximate, reconstruct, or simplify the authored GLSL, render passes, geometry, interaction state, or assets.
- Keep exact source and asset hashes under regression tests when the source project provides them.
- Adapt only the surrounding host boundary needed by the target project; keep renderer behavior intact.

# Design Prototypes Directory

This directory stores the 4 standalone HTML prototypes created for each page or major view during Step 3 of the Design Pipeline.

## Directory Layout per Page:
```text
design/prototypes/<page-slug>/
├── v1.html          # Direction 1: distinct IA / layout
├── v2.html          # Direction 2: distinct interaction model
├── v3.html          # Direction 3: distinct density / workflow
├── v4.html          # Direction 4: alternative paradigm
├── index.html       # Side-by-side comparison & state switcher launcher
├── NOTES.md         # Design hypotheses, trade-offs, research references
└── chosen.html      # Copy of the chosen direction after Gate GD approval
```

## Mandatory Prototype Requirements:
1. Double-clickable without a web server or build tool.
2. Link `../../reference/tokens.css` and use Tailwind preset.
3. Zero raw hex/rgb/arbitrary pixel values (`check-tokens.mjs` must pass).
4. Realistic domain data (status codes, JSON bodies, uncertain states).
5. State switcher floating panel (`Default`, `Loading`, `Empty`, `Error`, `Uncertain`).

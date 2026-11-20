# Auth Prototypes: Design Hypotheses, Trade-Offs & Gate GD Evaluation

- **Slug**: `auth`
- **Related Task**: TASK-008
- **Date**: 2026-11-17
- **Target Backend**: .NET 10 Web API (`https://mohamed1551.runasp.net/scalar/#description/introduction`)
- **Reviewer**: Mohamed Essam (Memo)

---

## 1. Prototype Overview & Comparison Matrix

| Metric / Dimension | Direction 1 (Split-Screen) | Direction 2 (Glass Card) | Direction 3 (Sliding Deck) | Direction 4 (Bento Terminal) |
|---|---|---|---|---|
| **File** | `v1.html` | `v2.html` | `v3.html` | `v4.html` |
| **Visual Paradigm** | 50/50 Split Showcase | Centered Floating Modal | Kinetic Dual Pane Deck | Developer Bento Grid |
| **Brand Storytelling** | High (Mock test runner, metrics) | Minimal (Focus purely on inputs) | Medium (Contextual side panel) | High (Live cURL & API responses) |
| **Form Friction** | Low (Instant tab toggle) | Lowest (Zero distraction) | Low (Sliding transition) | Low (Live interactive preview) |
| **Target Audience** | First-time visitors & teams | Returning power developers | Product-led growth users | Technical API engineers |
| **Mobile Collapse** | Clean (Showcase hides <= 900px) | Natural (Centered card scales) | Natural (Card stacks vertically) | Natural (Bento items stack) |
| **Check-Tokens Compliance** | 100% Green (0 violations) | 100% Green (0 violations) | 100% Green (0 violations) | 100% Green (0 violations) |

---

## 2. Detailed Breakdown of Directions

### Direction 1: 3D Typeflow & Seamless Auth (`v1.html`) — Memo Refined & Preferred
- **Concept**:
  - **Left Side**: Integrates an interactive 3D Codex Typeflow animation (inspired by `threeui.com/text-animation/globe-study/outline-typeflow`) where typographic glyphs (`API TEST PILOT • AUTONOMOUS RUNNER • DETERMINISTIC ASSERTIONS • 200 OK • WORKER POOL ONLINE`) flow along a 3D trefoil knot in Electric Azure and Electric Violet with depth perspective, mouse hover acceleration/tilt, and click-burst particles. Floating at the center of the 3D loop is the glowing API Test Pilot core emblem. Below it, real-time telemetry chips show 8 workers online, 100% pass rate, and p95 = 32ms.
  - **Right Side**: Per Memo's explicit direction, the clunky top segmented switcher tab was completely removed. Instead, the card features a crisp, modern header with an inline mode switch ("Don't have an account yet? Sign up for free"), Google SSO at top, 36px Scalar inputs, and a bottom toggle button.
- **Strengths**:
  - Captivates developers immediately with cutting-edge 3D kinetic typography and authentic API Test Pilot telemetry.
  - High conversion and frictionless authentication without unnecessary tab controls.
  - 100% native Canvas 2D execution with 0 external heavyweight dependencies and zero token violations.
- **Trade-Offs**:
  - Requires more horizontal canvas (hence the left pane collapses on screens <= 900px).

### Direction 2: Obsidian Centered Glass Card (`v2.html`)
- **Concept**: A pure, minimalist centered obsidian card with hairline borders, electric azure glow backdrop, segmented pill switch, and zero extraneous elements.
- **Strengths**:
  - Maximum conversion rate: no visual noise, no distractions.
  - Very fast to load and highly familiar to users of Linear, Clerk, and GitHub.
  - Seamless responsive scaling across mobile, tablet, and ultra-wide displays.
- **Trade-Offs**:
  - Does not showcase product features or test runner telemetry on the login screen.

### Direction 3: Interactive Dual-Pane Sliding Deck (`v3.html`)
- **Concept**: A unified container with a sliding contextual side pane that shifts smoothly between Sign In mode ("New to API Test Pilot?") and Create Account mode ("Already have an account?").
- **Strengths**:
  - Polished kinetic micro-interactions that feel modern and premium.
  - Keeps user inside a single frame with smooth state transitions.
- **Trade-Offs**:
  - Requires careful responsive handling (reverts to segmented tab on mobile <= 900px).

### Direction 4: Terminal & Bento Developer Workflow (`v4.html`)
- **Concept**: A developer-centric Bento grid where the auth form sits alongside a live-updating cURL request terminal and expected RFC 7807 response inspector.
- **Strengths**:
  - Utterly unique and authentic for an API testing platform.
  - Developers instantly see the exact HTTP request (`POST /api/Auth/login`) and response DTO schemas.
  - Shows deep synergy between frontend and the .NET 10 Scalar backend.
- **Trade-Offs**:
  - Higher visual density; may feel complex for non-technical users.

---

## 3. Orchestrator Recommendation for Gate GD

**Recommendation: Direction 1 (`v1.html`) or Direction 2 (`v2.html`)**.

- If Memo prefers **rich brand presentation & product storytelling**, **Direction 1 (`v1.html`)** is our top recommendation: it communicates the platform's autonomous testing capabilities upfront while keeping the authentication form clean, standard, and accessible.
- If Memo prefers **maximum developer efficiency and minimal footprint**, **Direction 2 (`v2.html`)** is the cleanest choice.

Memo has complete authority to select whichever direction he prefers (or request a hybrid blend). Once Memo decides, the chosen file will be copied to `chosen.html` at Gate GD, and React implementation will begin.

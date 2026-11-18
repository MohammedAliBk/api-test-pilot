# Design Research: Authentication & Account Management

- **Slug**: `auth`
- **Related Task**: TASK-008
- **Date**: 2026-11-17
- **Author**: Frontend Team (Memo / Orchestrator)

---

## 1. Executive Summary & User Goal

Authentication is the front door of **API Test Pilot**. Developers landing on the auth screen have one objective: enter the testing workspace as rapidly and securely as possible. Any friction—such as unclear validation messages, sluggish social logins, rigid form behavior, or uninformative error banners—degrades developer confidence.

Our goal is to create an authentication screen that:
1. Reflects the **hybrid design identity**: Obsidian dark canvas, Electric Azure (`#518eff`) and Electric Violet (`#8d5ef9`) accents, combined with Scalar's compact 4px control radius and 36px control metric.
2. Directly interfaces with the .NET 10 Web API (`https://mohamed1551.runasp.net/scalar/#description/introduction`).
3. Supports both local email/password authentication and Google Firebase SSO.
4. Conforms to WCAG 2.1 AA accessibility standards with full keyboard support and zero raw token violations.

---

## 2. Competitive Benchmarks & Domain Analysis

We benchmarked 5 premier developer-focused tools and modern SaaS auth implementations:

### 1. Clerk Auth
- **Patterns Observed**:
  - Unifies Sign In and Sign Up in a cohesive component with a smooth top tab or pill toggle.
  - Prominent "Continue with Google" social button separated by a subtle divider with "or continue with email".
  - Real-time password requirement checklist (8+ chars, uppercase, special character) updating live.
  - Inline RFC-compliant error banners that do not push page layout unpredictably.
- **Key Takeaways for API Test Pilot**:
  - Keep Google SSO at the top for maximum one-click conversion.
  - Seamless switching between Login and Signup modes without full page navigation.

### 2. Supabase Studio
- **Patterns Observed**:
  - Deep obsidian dark canvas with vibrant brand accents.
  - Compact inputs with crisp border indicators.
  - Status indicators showing backend connection status and project health.
- **Key Takeaways for API Test Pilot**:
  - Show subtle backend API status indicator ("Connected to .NET 10 API").
  - Use high-contrast monospace typography for code/token elements.

### 3. Linear
- **Patterns Observed**:
  - Centered floating glass card with subtle radial gradient glow behind it.
  - Minimalist layout, zero extraneous copy, intense focus on the form.
  - Subtle micro-interactions on button press and input focus rings.
- **Key Takeaways for API Test Pilot**:
  - Centered glass card is ideal for engineers who value zero distraction and instant entry.
  - Electric Violet glow adds high-end polish to the obsidian dark theme.

### 4. Postman / Bruno / Insomnia
- **Patterns Observed**:
  - Split-screen layout: Left side highlights platform capabilities (automated runs, test reports, AI test pilot features), right side hosts the authentication controls.
  - Left showcase provides contextual reassurance that this is an API testing platform built for teams.
- **Key Takeaways for API Test Pilot**:
  - A split-screen layout (`v1.html`) is great for first-time onboarding and showcasing live test metrics.

### 5. Vercel
- **Patterns Observed**:
  - Terminal-like aesthetics, monospaced accents, high density.
  - Shows cURL commands or CLI equivalents (`curl -X POST /api/Auth/login`) alongside the form for developers.
- **Key Takeaways for API Test Pilot**:
  - A developer bento / terminal view (`v4.html`) gives API developers an authentic "API-first" feel.

---

## 3. Information Architecture & State Strategy

### Form Modes
1. **Sign In**:
   - Fields: Email, Password.
   - Extras: Remember Me checkbox, Forgot password link.
   - Primary Action: "Sign In".
2. **Create Account**:
   - Fields: Full Name / Display Name, Email, Password.
   - Extras: Real-time password strength meter, Terms & Privacy consent.
   - Primary Action: "Create Account".

### The 5 UI States
1. **Default**: Interactive inputs, clear placeholder text, enabled CTAs.
2. **Loading**: Inputs disabled, circular spinner on primary button, pulsing skeleton highlight.
3. **Empty / Validation**: Immediate inline feedback on blur or submit attempt with `border-semantic-danger` and warning icon.
4. **Error (RFC 7807 ProblemDetails)**:
   - 401 Unauthorized: "Invalid email or password."
   - 409 Conflict: "An account with this email already exists."
   - 500 Server Error: "Backend service unreachable."
5. **Uncertain / SSO Pending**: OAuth window open with loading indicator and cancel option.

---

## 4. Prototype Design Directions

Based on research, we define 4 distinct architectural directions:

1. **v1.html: Split-Screen Brand Showcase & Developer Proof**
   - Left side: API Test Pilot hero branding, live simulated test suite runner metrics (status badges, response latency, deterministic assertions).
   - Right side: Clean, focused auth card with instant switch between Sign In and Sign Up.
2. **v2.html: Obsidian Centered Glass Card (Minimalist & Frictionless)**
   - Centered floating card with Electric Azure glow backdrop, segmented pill switcher, compact 36px inputs.
3. **v3.html: Interactive Dual-Pane Sliding Deck (Kinetic Transformation)**
   - Smooth animated sliding overlay between Sign In and Sign Up with contextual onboarding messaging.
4. **v4.html: Terminal / Bento Developer Workflow**
   - Bento grid layout with interactive live cURL preview reflecting the actual `POST /api/Auth/login` endpoint in real-time.

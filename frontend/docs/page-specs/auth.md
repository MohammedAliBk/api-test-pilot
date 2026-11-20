# Page Specification: Authentication & Account Management (Login & Registration)

- **Slug**: `auth`
- **Related Task**: TASK-008
- **Status**: DRAFT (Pending Gate GD & G1 Approval)
- **Owner**: Frontend Team (Memo / Orchestrator)
- **Approved by**: Memo (Pending)
- **Backend Service**: .NET 10 Web API (`https://mohamed1551.runasp.net/scalar/#description/introduction`)

---

## 1. Purpose & User Goal

- **What problem does this screen solve?**:
  Provides a secure, developer-friendly, and frictionless authentication flow for API Test Pilot users. It enables local credentials authentication (email + password), account registration, and Google single sign-on (SSO via Firebase ID token integration).
- **Primary User Action**:
  - Sign in to an existing account.
  - Create a new account with immediate validation feedback.
- **Secondary Actions**:
  - Sign in with Google (SSO via Firebase auth integration).
  - Toggle between Sign In and Register views.
  - Password recovery ("Forgot password" trigger).
  - Remember login session.

---

## 2. Information Architecture & Layout

- **Layout Model**:
  Multi-direction prototype exploration (Split-screen showcase, Obsidian glass card, Dual-pane sliding deck, and Developer bento layout).
- **Key Sections**:
  1. **Brand Header**: API Test Pilot hybrid logo, product title, and visual identity badge.
  2. **Mode Switcher**: Clean segmented pill switch between **Sign In** and **Create Account**.
  3. **Social / SSO Section**: Prominent Google SSO button ("Continue with Google") connecting to `/api/Auth/firebase-login`.
  4. **Form Inputs (Scalar 36px control metric)**:
     - **Login Form**: Email field, Password field (with show/hide visibility toggle), Remember me checkbox, Forgot password link, Sign In CTA button.
     - **Registration Form**: Display Name field, Email field, Password field (with real-time password strength meter), Terms agreement checkbox, Create Account CTA button.
  5. **Feedback & Status Banner**: Dynamic banner area for RFC 7807 ProblemDetails alerts (e.g. 401 unauthorized, 409 conflict email already exists, 400 validation error list).
  6. **Footer / Legal**: Terms of Service and Privacy Policy links, along with version and backend connection status indicator.

---

## 3. Data Requirements & API Contracts

- **Target Backend**: .NET 10 ASP.NET Core API at `https://mohamed1551.runasp.net`
- **Authentication Endpoints**:
  1. `POST /api/Auth/login`
     - **Request**: `LoginCommand` (`email: string`, `password: string`)
     - **Response 200**: `AuthResponse` (`token: string`, `refreshToken: string | null`, `refreshTokenExpiresAt: string | null`, `user: UserDto`)
     - **Errors**: `400 Bad Request` (ProblemDetails), `401 Unauthorized` (ProblemDetails), `500 Server Error`
  2. `POST /api/Auth/register`
     - **Request**: `RegisterCommand` (`email: string`, `password: string`, `displayName: string`)
     - **Response 200**: `AuthResponse` (`token: string`, `refreshToken: string | null`, `refreshTokenExpiresAt: string | null`, `user: UserDto`)
     - **Errors**: `400 Bad Request` (ProblemDetails), `409 Conflict` ("The email address is already registered"), `500 Server Error`
  3. `POST /api/Auth/firebase-login`
     - **Request**: `FirebaseLoginCommand` (`idToken: string`)
     - **Response 200**: `AuthResponse`
  4. `GET /api/Auth/me`
     - **Header**: `Authorization: Bearer {token}`
     - **Response 200**: `UserDto` (`id: uuid`, `email: string`, `displayName: string`, `authProvider: string`)
- **Data Model (UserDto)**:
  ```json
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "email": "user@example.com",
    "displayName": "Ahmed Mohamed",
    "authProvider": "Local"
  }
  ```

---

## 4. UI States

- **Default (Populated/Ready)**: Clean form fields with Scalar 36px inputs, 4px radius, clear placeholder text, and active submit buttons.
- **Loading (Submitting/Verifying)**: Inputs disabled, CTA displays inline circular spinner, pulse effect on form wrapper, Google button disabled.
- **Empty / Validation Error**: Field-level validation flags ("Email is required", "Password must be at least 8 characters", "Display name cannot be empty") with red border (`border-semantic-danger`) and error helper text.
- **Error (Server / RFC 7807 ProblemDetails)**:
  - 401 Unauthorized: "Invalid email or password. Please verify your credentials."
  - 409 Conflict: "An account with this email already exists. Try signing in instead."
  - 500 Server Error: "Authentication service is temporarily unavailable. Please try again."
- **Uncertain / SSO Pending**: OAuth popup open / awaiting Firebase credential callback with "Connecting to Google..." indicator and cancel button.

---

## 5. Edge Cases & Defensive UX

- **Double-click submission**: Prevent duplicate requests by debouncing submit button and entering loading state immediately.
- **Expired/Invalid Refresh Tokens**: Automatically redirect to login when refresh token expires.
- **Whitespace in Email**: Auto-trim leading and trailing whitespace on blur.
- **Password Masking**: Provide accessible toggle to view/hide password.
- **Paste into Password**: Allow paste operations (never disable paste in password fields).
- **Network timeout / offline**: Detect `navigator.onLine` and display offline banner before firing network request.

---

## 6. Accessibility & Responsive Behavior

- **Keyboard Navigation**:
  - Logical tab flow: Toggle -> Google SSO -> Input 1 -> Input 2 -> Checkbox -> Submit CTA -> Alternate link.
  - Enter key in any input submits active form.
  - Escape key dismisses error alerts.
- **Focus Indicators**: Clear focus ring with `--color-line-focus` (`#518eff`) and 2px outline offset.
- **Color Independence**: Form validation errors accompanied by icons (error triangle/circle), not color alone.
- **Screen Reader Support**: `aria-invalid`, `aria-describedby` linked to validation error IDs, and `aria-live="polite"` for API error banner.
- **Shell Breakpoint (900px)**:
  - Desktop (>900px): Split screen or spacious card.
  - Mobile (<=900px): Full-width single column card with 16px margins, optimized for touch targets (min 36px/44px).

---

## 7. Acceptance Criteria

- [ ] All 4 HTML prototypes (`v1.html`, `v2.html`, `v3.html`, `v4.html`) and `index.html` built under `design/prototypes/auth/`.
- [ ] Prototypes link `tokens.css` and use `tailwind.preset.js`.
- [ ] Floating state switcher functional across all 5 states (Default, Loading, Empty/Validation, Error, Uncertain/SSO).
- [ ] Zero raw hex or arbitrary pixel violations (`node design/tools/check-tokens.mjs` passes 100%).
- [ ] Matches backend OpenAPI contracts for `/api/Auth/login`, `/api/Auth/register`, and `/api/Auth/firebase-login`.
- [ ] Gate GD review conducted and direction selected by Memo.

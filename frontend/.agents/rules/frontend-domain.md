# FRONTEND DOMAIN RULES & SYSTEM INVARIANTS

## 1. Test Execution State Vocabulary

The frontend must treat test states with strict visual and semantic distinction:
- `queued`: Enqueued, waiting for worker assignment.
- `running`: Active execution against target endpoint.
- `passed`: Assertion succeeded (green token).
- `failed`: Assertion failed — target API responded, but violated expectations (red token).
- `error`: Execution failure — infrastructure or connectivity failure (network timeout, worker crash, DB failure) (amber/orange token).
- `retrying`: Bounded retry cycle in progress (yellow token).
- `recovered`: Safe recovery executed after worker interruption (purple/teal token).
- `uncertain`: First-class state — request was sent but outcome unrecorded due to worker failure. Must never be blindly retried without user confirmation.

## 2. Strict AI vs. Deterministic Separation

- **AI Outputs (Suggestions / Explanations)**: Must be visually distinct (dedicated badges, distinct card style, clear "AI Explanation" label). Never present AI explanations as proof or fact.
- **Deterministic Validation**: Pass/fail status is determined strictly by assertion rules (status code, schema, json path), never by AI opinion.

## 3. Security UX Constraints

- **Target URL Validation**: Display clear, non-leaky rejection messages when backend blocks loopback/private/metadata destinations.
- **Secret Hygiene**: Mask API keys and environment secrets (`••••••••`). Never write credentials to localStorage, session storage, or client logs.

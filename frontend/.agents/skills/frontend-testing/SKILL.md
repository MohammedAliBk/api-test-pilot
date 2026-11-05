---
name: frontend-testing
description: >-
  Use this skill during Loop Stage 4 (Test) to execute test suites, type-checks,
  linting, and verification scripts with concrete evidence.
---

# Frontend Testing Skill

This skill defines the execution protocols for verifying code changes in Stage 4 of the loop.

## 1. Test Verification Matrix

Every change must execute real verification commands:
1. **Lint**: `npm run lint` or `pnpm lint`.
2. **Type-Check**: `npm run type-check` or `pnpm tsc --noEmit`.
3. **Unit & Component Tests**: `npm run test` or `pnpm vitest run`.
4. **Token Check**: `node design/tools/check-tokens.mjs`.
5. **Production Build**: `npm run build` or `pnpm build`.

## 2. Evidence Standard

- Never state a check passed without citing the command executed and its output.
- Untested paths or environments must be explicitly declared under `NOT VERIFIED`.
- Mocks must verify behavioral contracts rather than mocking away real logic.

# CORE RULES AND GATES

## 1. Non-Negotiable Rules

1. **Never decide on Memo's behalf.** Any decision (architecture, library choice, new/removed dependency, routing/state approach, token change, API-contract assumption, deleting/renaming files, behavior or scope change, version bump) needs explicit approval first. Ask, wait, then act.
2. **Never merge or push without explicit approval.** Never push to `main`/`master`. Never open a PR unless asked.
3. **One branch per task.** Never mix unrelated work. Branch format: `feat/fe-<slug>`, `fix/fe-<slug>`, `chore/fe-<slug>`, `docs/fe-<slug>`.
4. **Never guess.** If something is unclear or missing, say so and ask. Do not invent files, endpoints, props, functions, or backend behavior.
5. **Never trust docs or memory blindly.** Verify against real code (and against the real OpenAPI from the backend when it exists).
6. **No destructive actions without approval:** no force-push, no history rewrite, no `reset --hard` on shared branches, no deleting branches/tags, no `rm -rf`, no deleting someone else's files.
7. **Never commit secrets** (.env, keys, tokens, URLs with credentials). If you see one, stop and report.
8. **Work through the orchestration system at all times.** No work without a tracked task, no decision without a DEC entry, no session without a SESSION_LOG entry.
9. **Never disable, skip, or weaken a test, lint rule, or type check to get green.** If stuck, escalate (Gate G2).
10. **No new dependency (npm package) without a DEC and explicit approval.** Check license, maintenance, bundle size, and security first.
11. **Never fake evidence.** Nothing is "passing", "tested", or "working in the browser" unless actually run in this session.
12. **Stay in scope.** Problems noticed elsewhere go to "Backlog / Proposed" in `TASKS.md`, never silently fixed.

---

## 2. Gates (Points Where You Must Stop and Wait)

- **Gate G1 — Plan Approval**: Before implementation starts: show the full plan (scope, files, components, tests, risks, rollback). For page tasks the plan includes the page spec, research note, and chosen prototype. Approval allows branching and implementation.
- **Gate GD — Design Choice (UI tasks)**: After research and the 4 prototypes exist in `design/prototypes/<slug>/`, present a comparison and recommendation. Wait for Memo's choice. No React implementation starts before GD.
- **Gate G2 — Escalation**: Stop and ask when: 3 failed attempts on the same finding; the fix needs a decision, scope change, design change, or token change; blocked on Memo or external team; or reality differs materially from docs.
- **Gate G3 — Merge Approval**: Only after all loop stages are GREEN in the same iteration and the Orchestration Integrity Check passes: present branch, commits, test results, summary, risks, and proposed merge strategy (squash/merge/rebase). After explicit "yes" -> merge, set status DONE, update docs/changelog.

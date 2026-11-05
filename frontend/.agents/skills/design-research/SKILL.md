---
name: design-research
description: >-
  Use this skill when conducting competitive UI/UX analysis, evaluating industry reference
  tools, and drafting research notes prior to building prototypes.
---

# Design Research Skill

This skill guides the research phase of the design pipeline for new pages and views.

## 1. Domain Benchmarks

When designing screens for API Test Pilot, study 3–6 relevant tools:
- **API Clients & Spec Tools**: Postman, Insomnia, Bruno, Hoppscotch, Swagger UI, Redocly.
- **Test Automation & Execution Tools**: Testsigma, Katalon, Playwright HTML Report, Allure Report, Datadog Synthetics.
- **Workflow & Failure Analysis**: GitHub Actions Workflow Run view, CircleCI, Sentry Issue Details.

## 2. Research Deliverable (`docs/research/<slug>.md`)

Document:
1. **User Goal**: What is the core problem solved on this screen?
2. **Patterns Observed**: What layouts, density controls, and state representations work best?
3. **Pitfalls to Avoid**: Visual clutter, hidden failure causes, ambiguous progress, unreadable JSON trees.
4. **Information Architecture**: Primary visual hierarchy, secondary actions, contextual drawer vs modal choices.
5. **Accessibility Considerations**: Keyboard shortcuts, screen reader announcements for live updates, color-independent status cues.

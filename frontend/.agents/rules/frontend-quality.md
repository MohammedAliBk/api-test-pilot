# FRONTEND QUALITY, ACCESSIBILITY & PERFORMANCE

## 1. Accessibility (WCAG 2.1 AA)

- **Keyboard Navigation**: All interactive elements (buttons, inputs, tabs, table rows, drawers) must be fully navigable and operable via keyboard. Visible focus ring using `--color-primary` border.
- **Contrast Ratios**: Normal text minimum 4.5:1, large text/headings minimum 3:1 against their surface backgrounds in both Light and Dark modes.
- **Semantics**: Native HTML buttons (`<button>`) and links (`<a>`), proper ARIA roles and landmarks (`<main>`, `<nav>`, `<aside>`, `role="status"`).
- **Reduced Motion**: Respect `prefers-reduced-motion` for transitions and animations.

## 2. Complete State Handling

Every UI view and component must explicitly support and render all states:
- **Default / Populated**: Real data rendering.
- **Loading / Skeleton**: Smooth loading affordances without content layout shifts.
- **Empty State**: Clear explanation of empty condition, call to action.
- **Error State**: Non-technical user-friendly explanation with retry actions.
- **Uncertain / Recovery State**: Highlighted recovery affordance for interrupted executions.

## 3. Performance & Code Quality

- **Rendering**: Avoid unnecessary re-renders in large lists (virtualization for 100+ endpoints/results).
- **Bundle Hygiene**: No massive or duplicate dependencies. Tree-shake icons and utility libraries.
- **Testing Minimums**: Unit tests for utilities and hooks; component tests for user interactions, state transitions, and error paths.

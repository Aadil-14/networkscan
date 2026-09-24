# SKYLINK FRONTEND IMPLEMENTATION PLAN

## Project

**Project:** SkyLink Network Systems  
**Current scope:** Frontend only  
**Backend / database:** Out of scope for this implementation plan  
**Data source:** Local/mock frontend data only until a future backend phase  
**Primary reference:** `SKYLINK_FRONTEND_ANALYSIS.md`

---

# 0. MASTER IMPLEMENTATION RULES

This file is the **single source of truth** for implementation, roadmap, and progress.

The checkboxes in this file are the progress tracker. Do NOT create or rely on a separate implementation tracker unless explicitly requested.

## Execution model

1. Read this entire implementation plan before starting.
2. Find the **first incomplete phase**.
3. Work on **ONE PHASE AT A TIME**.
4. Complete all tasks in the current phase before moving forward.
5. After successfully implementing and verifying a task, change its checkbox from `☐` to `☑`.
6. After all tasks and acceptance criteria for a phase are verified, mark the phase status as `☑ COMPLETE`.
7. Then continue automatically to the **next incomplete phase**.
8. Never skip ahead, reorder phases, or implement a later phase early.
9. If a task cannot be completed safely, document the blocker directly under that task and do not falsely mark it complete.
10. After every phase, run the required verification before marking it complete.
11. Keep this file updated as implementation progresses.
12. At the end of the full roadmap, update the final completion section and stop.

## Scope rules

13. Do not implement backend, database, real APIs, authentication servers, or external services during this frontend roadmap.
14. Use local/mock data where dynamic behavior is required.
15. Do not replace the existing UI with a completely different design.
16. Preserve the existing SkyLink visual direction and UI reference designs unless a phase explicitly requires a UX correction.
17. Prefer small, controlled changes over large rewrites.
18. Reuse existing components and patterns when practical.
19. Create reusable components when duplication becomes clear.
20. Do not add a dependency unless it provides a clear benefit and is compatible with the current project.
21. Before changing architecture, inspect the existing implementation and explain the reason for the change in the implementation report.
22. Never hide errors by disabling ESLint rules or suppressing warnings without a documented reason.
23. Do not remove functionality merely to make lint/build pass.
24. Keep the application runnable after every phase.

## Progress notation

Use exactly these meanings:

- `☐` = pending
- `☑` = verified complete
- `⚠` = blocked / requires attention; do not treat as complete

A phase may only be marked `☑ COMPLETE` after its implementation, acceptance criteria, and verification have passed.

## Important

The plan is intentionally sequential. Knowing the entire roadmap does NOT mean implementing everything in one uncontrolled rewrite. Implement phase 1, verify it, mark it complete, then phase 2, and so on.

---

# 1. CURRENT PROJECT BASELINE

According to the frontend analysis:

- The project is a Vite + React frontend.
- React 19 is currently used.
- Tailwind CSS v4 is currently used.
- Lucide React is used for icons.
- Recharts is used for charts.
- The application currently has seven main views:
  - Dashboard
  - Devices
  - User Management
  - Alerts
  - Maintenance
  - Reports
  - Settings
- Navigation currently relies on `activeTab` in `App.jsx`.
- Dashboard, Devices, Alerts, and User Management are relatively developed visually.
- Maintenance, Reports, and Settings are present but contain more incomplete/static behavior.
- Most application data is currently hardcoded.
- There is no established shared data/state architecture.
- `src/context/`, `src/data/`, and `src/demodata/` are currently empty.
- Search, filters, pagination, dialogs/modals, and many actions are currently incomplete or inert.
- Responsive behavior is currently weak on tablet/mobile.
- The analysis reported approximately 17 ESLint errors.

The existing analysis is the source of truth for the current-state audit.

---

# 2. TARGET STATE

The target is a **complete dynamic frontend prototype** that can operate without a backend.

The frontend should behave like a real network-management application using local/mock data.

Examples:

- Adding a device updates the device list and relevant Dashboard metrics.
- Resolving an alert changes its state and updates active-alert counts.
- Filtering devices actually filters the displayed data.
- Searching users actually searches the user directory.
- Pagination changes the displayed page.
- Adding/editing/deleting users updates the local frontend state.
- Maintenance actions change task state.
- Settings changes persist locally where appropriate.
- Reports respond to selected time ranges using local data.
- Navigation does not unnecessarily destroy application state.
- Loading, empty, error, and success states are represented where appropriate.
- The application works across desktop, tablet, and mobile layouts.

This is still a **frontend simulation**. It must not pretend that real backend/network operations exist.

---

# 3. IMPLEMENTATION PROGRESS

## Overall status

**☑ Phase 1 complete**  
**☐ Phase 2 pending**  
**☐ Phase 3 pending**  
**☐ Phase 4 pending**  
**☐ Phase 5 pending**  
**☐ Phase 6 pending**  
**☐ Phase 7 pending**  
**☐ Phase 8 pending**  
**☐ Phase 9 pending**  
**☐ Phase 10 pending**  
**☐ Phase 11 pending**  
**☐ Phase 12 pending**  
**☐ Phase 13 pending**  
**☐ Phase 14 pending**  
**☐ Phase 15 pending**

**Current phase:** PHASE 2 — REUSABLE UI SYSTEM

### Verified Phase 1 result

- ☑ Foundation/cleanup work completed.
- ☑ ESLint verification passed with 0 errors.
- ☑ Production build passed.
- ☑ Existing frontend remains runnable.

> The phase status above reflects the latest verified project state. Future updates must be made in this file itself.

---

# 4. PHASE 1 — FOUNDATION & CLEANUP

## Objective

Make the current frontend stable before adding dynamic architecture.

## Tasks

### 1.1 Inspect the existing project
- ☑ Inspect current source files before changing them.
- ☑ Identify actual Vite boilerplate and unused assets.
- ☑ Identify unused imports and obvious dead code.

### 1.2 Clean boilerplate
- ☑ Remove only clearly unused Vite starter code/assets.
- ☑ Preserve anything used by the current SkyLink UI.

### 1.3 Branding consistency
- ☑ Replace clear incorrect `NetworkScan` branding with `SkyLink` / `SkyLink Network Systems` where appropriate.
- ☑ Do not alter unrelated behavior.

### 1.4 ESLint
- ☑ Run lint.
- ☑ Fix reported ESLint errors individually.
- ☑ Do not disable rules merely to hide errors.

### 1.5 Build
- ☑ Run production build.
- ☑ Fix compile/build errors introduced by cleanup.

## Acceptance criteria

- ☑ Existing pages still render.
- ☑ Existing UI is not unnecessarily redesigned.
- ☑ Lint passes or remaining warnings/errors are explicitly documented.
- ☑ Production build succeeds.

## Phase status

☑ **PHASE 1 — COMPLETE**

**Verified:** September 24, 2026  
**Lint:** PASSED — 0 errors  
**Production build:** PASSED

Continue automatically to the first incomplete phase: **PHASE 2**.

---

# 5. PHASE 2 — REUSABLE UI SYSTEM

**Status: ☐ PENDING — CURRENT PHASE**

## Objective

Reduce duplicated UI patterns and establish a consistent component foundation.

## Tasks

Create reusable components only where they genuinely reduce duplication.

Potential components:

- `KpiCard` / `MetricCard`
- `StatusBadge`
- `Button`
- `SearchInput`
- `DataTable`
- `Modal`
- `Drawer`
- `DropdownMenu`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `Toast` / notification feedback
- reusable form controls where appropriate

Also standardize:

- button variants
- status colors
- card radius
- table spacing
- typography patterns
- common page/header structure

Do not redesign the application.

## Acceptance criteria

- Repeated patterns are actually reused.
- Existing pages remain visually consistent with the current design.
- Components have clear, simple responsibilities.
- No unnecessary component explosion.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 6. PHASE 3 — MOCK DATA ARCHITECTURE

**Status: ☐ PENDING**

## Objective

Move hardcoded application data out of page JSX and create a clean local data layer.

## Domains

At minimum:

- Current user
- Devices
- Alerts
- Managed users
- Maintenance tasks
- Dashboard metrics
- Reports data
- Settings

## Suggested structure

```text
src/
  data/
    devices.js
    alerts.js
    users.js
    maintenance.js
    metrics.js
    reports.js
    settings.js
  context/
  components/
```

Exact filenames may differ if the existing project structure makes another organization cleaner.

## Rules

- Do not use random values on every render.
- Mock data should be deterministic and understandable.
- Do not duplicate the same source data in multiple pages.
- Relationships should use IDs where appropriate.
- Keep data easy to replace with API responses later.

## Acceptance criteria

Pages consume mock data from the data layer rather than large hardcoded datasets inside JSX.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 7. PHASE 4 — FRONTEND STATE MANAGEMENT

**Status: ☐ PENDING**

## Objective

Create shared application state so pages can react to the same data.

## Preferred direction

Evaluate the two approaches identified in the analysis:

- React Context + Hooks
- Zustand

For this project, prefer the simpler architecture unless project complexity clearly justifies another choice.

Do not add a state library merely because it is popular.

## Required state domains

Potentially:

- Devices
- Alerts
- Users
- Maintenance
- Settings
- Current user
- UI state where necessary

## Required behavior

Example:

```text
Devices
  ↓
Shared state
  ↓
Dashboard + Devices + Alerts + other relevant views
```

Adding a device should be visible anywhere that consumes device totals.

Resolving an alert should affect Dashboard active-alert metrics.

## Persistence

Use local browser persistence only where appropriate, such as settings and application state that should survive refreshes.

Do not introduce a backend.

## Acceptance criteria

- Shared state works across pages.
- Switching pages does not unnecessarily erase important application state.
- State updates produce correct UI updates.
- Data ownership is clear.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 8. PHASE 5 — NAVIGATION & APP STRUCTURE

**Status: ☐ PENDING**

## Objective

Improve navigation while preserving the existing visual experience.

## Tasks

- Review the current `activeTab` navigation.
- Introduce proper client-side routing if it is beneficial and safe.
- Preserve the seven existing views.
- Ensure navigation does not unnecessarily destroy state.
- Ensure direct navigation to supported views works.
- Preserve active navigation styling.
- Keep page layout structure consistent.

## Important

Do not turn this into a backend/authentication phase.

## Acceptance criteria

- All seven views remain accessible.
- Navigation is predictable.
- Page state is not unnecessarily lost.
- Existing sidebar/header design remains intact.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 9. PHASE 6 — DASHBOARD DYNAMIC IMPLEMENTATION

**Status: ☐ PENDING**

## Objective

Make Dashboard consume shared data and respond to user actions.

## Tasks

- Dynamic KPI cards.
- Dynamic device/health metrics.
- Dynamic alert metrics.
- Dynamic charts using local data.
- Functional time-range selector.
- Functional quick actions where applicable.
- Dynamic recent activity.
- Ensure Dashboard metrics reflect changes made elsewhere.

## Example

If an alert is resolved:

```text
Alerts state changes
        ↓
Dashboard active alert count updates
```

If a device is added:

```text
Devices state changes
        ↓
Dashboard total device count updates
```

## Acceptance criteria

Dashboard values are derived from application state rather than duplicated constants.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 10. PHASE 7 — DEVICES DYNAMIC IMPLEMENTATION

**Status: ☐ PENDING**

## Objective

Turn the Devices screen into a functional frontend inventory.

## Tasks

- Dynamic device table.
- Search.
- Status/filter controls.
- Pagination.
- Device details view/drawer/modal.
- Add/provision device flow.
- Form validation.
- Device state updates.
- Optimization recommendation interaction where present.
- Appropriate empty/loading/success states.

## Acceptance criteria

- Adding a device updates the list.
- Dashboard device totals update.
- Search and filters work.
- Pagination works.
- Details view shows the selected device.
- Invalid forms cannot be submitted silently.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 11. PHASE 8 — ALERTS DYNAMIC IMPLEMENTATION

**Status: ☐ PENDING**

## Objective

Make the Alerts page operate on shared alert state.

## Tasks

- Dynamic alert list.
- Severity/status filtering.
- Resolve action.
- Dismiss action.
- Correct active/resolved counts.
- Alert details where useful.
- Confirmation UI for destructive actions.
- Success feedback.
- Keep alert/device relationships consistent.

## Important

The current analysis specifically identifies the existing filter problem: filter tabs change their active appearance but do not actually filter the cards.

Fix the underlying data filtering rather than only changing the UI.

## Acceptance criteria

- Filters actually filter.
- Resolve changes alert state.
- Dismiss removes the alert from the appropriate active view.
- Dashboard metrics reflect alert changes.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 12. PHASE 9 — USER MANAGEMENT DYNAMIC IMPLEMENTATION

**Status: ☐ PENDING**

## Objective

Turn User Management into a functional local directory.

## Tasks

- Dynamic user table.
- Search by name/email.
- Role filtering.
- Status filtering where appropriate.
- Pagination.
- Add User modal/form.
- Edit User.
- Delete User with confirmation.
- Form validation.
- KPI values derived from user data.

## Acceptance criteria

- Added users appear in the table.
- Edited users update immediately.
- Deleted users disappear correctly.
- Search/filter/pagination work together.
- KPI counts reflect the current data.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 13. PHASE 10 — MAINTENANCE DYNAMIC IMPLEMENTATION

**Status: ☐ PENDING**

## Objective

Make the Maintenance queue interactive.

## Tasks

- Dynamic maintenance task data.
- Schedule task form/modal.
- Run Now simulation.
- Task status transitions.
- View logs/details UI where appropriate.
- Filtering/status handling if required.
- Feedback after actions.

## Important

This is only a frontend simulation.

Do not claim that a real maintenance operation was executed on a real network device.

## Acceptance criteria

- Scheduling creates a local task.
- Run Now changes simulated task state.
- Task state survives page navigation when persistence/state architecture requires it.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 14. PHASE 11 — REPORTS DYNAMIC IMPLEMENTATION

**Status: ☐ PENDING**

## Objective

Make Reports respond to local data.

## Tasks

- Dynamic report metrics.
- Functional time-range selection.
- Dynamic bandwidth/chart data.
- Consistent empty state.
- Export functionality where appropriate.
- CSV export can be generated entirely in the browser.

## Important

Exports must clearly represent local/mock data and should not imply that the data came from a real backend.

## Acceptance criteria

- Changing the time range changes the displayed data.
- Charts use the selected data range.
- Export produces the expected local report data.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 15. PHASE 12 — SETTINGS DYNAMIC IMPLEMENTATION

**Status: ☐ PENDING**

## Objective

Make Settings a real frontend form experience.

## Sections

Based on the current analysis:

- General
- Security
- API
- Notifications

## Tasks

- Controlled form state.
- Validation.
- Save.
- Reset/cancel where appropriate.
- Local persistence.
- Success/error feedback.
- Avoid hardcoded sensitive-looking values.
- Ensure API key UI is only a frontend placeholder/mock representation.

## Important

Do not implement real API credentials or authentication.

## Acceptance criteria

- Changes persist locally where intended.
- Refresh does not unexpectedly reset persisted settings.
- Validation works.
- Save feedback is meaningful.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 16. PHASE 13 — GLOBAL INTERACTIONS & UX STATES

**Status: ☐ PENDING**

## Objective

Complete cross-application interactions after the main pages are dynamic.

## Tasks

### Search

Implement the planned search behavior.

Potential scope:

- Devices
- Alerts
- Users
- Logs/activity

Do not overbuild a command palette unless the project actually needs it.

### Notifications

Make the notification interaction meaningful using local/mock state.

### Modals / Drawers

Ensure dialogs:

- open
- close
- submit
- cancel
- validate
- handle escape/outside interaction appropriately

### Feedback

Add consistent:

- success messages
- error messages
- empty states
- loading states
- confirmation dialogs

### Pagination

Ensure pagination is real rather than visual.

## Acceptance criteria

No major visible button should appear functional while doing nothing unless it is intentionally marked as unavailable.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 17. PHASE 14 — RESPONSIVE DESIGN

**Status: ☐ PENDING**

## Objective

Make the application usable across desktop, laptop, tablet, and mobile.

The current analysis specifically identifies issues with:

- fixed 256px sidebar
- fixed 384px search input
- header overflow
- table overflow
- chart compression
- missing mobile menu
- unusable mobile tables

## Tasks

### Desktop
Preserve the existing reference appearance.

### Laptop
Reduce spacing and prevent unnecessary horizontal overflow.

### Tablet
- Responsive header.
- Sidebar behavior.
- Responsive grids.
- Horizontal table strategy or alternative layout.

### Mobile
- Mobile sidebar/drawer.
- Mobile menu button.
- Responsive search.
- Responsive cards.
- Responsive charts.
- Mobile-friendly tables or card/list representation.
- Prevent page-level horizontal overflow.

## Acceptance criteria

Test at representative widths including:

- 1440px+
- 1024px
- 768px
- 375px

No major page-level horizontal overflow.

## Phase completion protocol

Before marking this phase complete:
- Verify every task above.
- Verify every acceptance criterion.
- Run lint/build and any relevant checks.
- Change completed task checkboxes to `☑`.
- Mark this phase `☑ COMPLETE`.
- Record important files changed or blockers in the phase notes.
- Then continue automatically to the next incomplete phase.

---

# 18. PHASE 15 — FINAL QA, CONSISTENCY & POLISH

**Status: ☐ PENDING**

## Objective

Perform a complete frontend audit after functionality is implemented.

## QA areas

### Navigation
- Every page opens.
- Active navigation is correct.
- State does not unexpectedly reset.

### Dashboard
- Metrics are derived from current data.
- Charts render correctly.
- Time filters work.

### Devices
- Search.
- Filters.
- Pagination.
- Add.
- Details.
- Updates.

### Alerts
- Filters.
- Resolve.
- Dismiss.
- Counts.

### Users
- Search.
- Filters.
- Add.
- Edit.
- Delete.
- Pagination.

### Maintenance
- Schedule.
- Run.
- Status.
- Logs/details.

### Reports
- Time range.
- Charts.
- Export.

### Settings
- Validation.
- Save.
- Persistence.
- Reset/cancel.

### Responsive
- Desktop.
- Laptop.
- Tablet.
- Mobile.

### Code quality
- ESLint.
- Production build.
- Unused imports.
- Dead components.
- Console errors.
- Obvious duplicated data.
- Obvious duplicated UI.

## Final acceptance criteria

- Frontend behaves as a coherent dynamic prototype.
- No backend/database is required.
- Local/mock data is centralized.
- Shared state works.
- Major user interactions work.
- Responsive layouts work.
- Existing visual identity is preserved.
- Lint/build are clean or remaining issues are explicitly documented.

## STOP

This is the end of the frontend implementation plan.

---

# 19. DEFINITION OF DONE

The SkyLink frontend is considered complete for this scope when:

- ☐ All planned phases are completed.
- ☐ All seven main views are functional.
- ☐ Data is no longer duplicated as unrelated hardcoded values across pages.
- ☐ Shared state synchronizes relevant views.
- ☐ User interactions update the UI correctly.
- ☐ Search, filtering and pagination work where required.
- ☐ Forms validate and provide feedback.
- ☐ Local persistence works where intended.
- ☐ Responsive behavior is usable.
- ☐ No backend or database is required for the prototype.
- ☐ ESLint and production build pass.
- ☐ No major UI interaction is obviously inert without a deliberate reason.

Antigravity must change these to `☑` only after the final QA phase verifies them.

---

# 20. IMPORTANT FUTURE BACKEND BOUNDARY

Backend integration is intentionally NOT part of these phases.

After the frontend prototype is complete, a separate backend/integration plan can replace:

```text
Mock/local data
      ↓
Frontend state
      ↓
UI
```

with:

```text
Backend/API
      ↓
Frontend data layer
      ↓
Frontend state
      ↓
UI
```

The frontend architecture should therefore keep data access reasonably separated from presentation so this future transition is possible.

Do not implement this future backend during the current frontend phases.

---

# 21. ANTIGRAVITY EXECUTION INSTRUCTION

At the beginning of each phase:

1. Read this implementation plan.
2. Identify the current phase.
3. Read the relevant existing source files.
4. Compare the source with the current analysis.
5. Plan the smallest safe implementation.
6. Implement only the current phase.
7. Test the current phase.
8. Provide a concise completion report.
9. STOP.

Never assume that "knowing the whole roadmap" means you should implement multiple phases at once.

The user will explicitly tell you when to continue.

**Current starting phase: PHASE 1 — FOUNDATION & CLEANUP**

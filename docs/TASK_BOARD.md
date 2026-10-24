# Project Task Board

> **Rule:** Every task must have a single assigned owner. Update status before and after working on a task.

---

## 📋 Status Overview

- **Backlog**: Planned but unassigned or waiting for dependencies.
- **In Progress**: Actively being worked on by the owner.
- **Review / Ready to Test**: Code written, local tests passed, ready for integration.
- **Done**: Merged into `main`, verified end-to-end, and documented.

---

## 📌 Sprint Task List

| Task ID | Workstream | Description | Owner | Status | Priority | Blockers / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TSK-001** | Architecture | Establish project repository structure, AGENTS.md, docs, and git policies | Mohit | **Done** | P0 | None |
| **TSK-002** | Backend | Scaffold backend server with health check & mock contract routes | Mohit | **In Progress** | P0 | None |
| **TSK-003** | Frontend | Scaffold frontend application shell with dashboard layout and map container | Rohit | **Done** | P0 | Verified with Vite production build |
| **TSK-004** | AI / ML | Implement baseline heuristic/ML risk prediction model and script | Gaurav | **In Progress** | P0 | None |
| **TSK-005** | Backend | Implement `/weather/current` and `/alerts/active` backend handlers | Mohit | Backlog | P1 | Waiting on TSK-002 |
| **TSK-006** | Frontend | Implement interactive map overlays for hazard polygons & risk heatmaps | Rohit | **Done** | P1 | Leaflet GIS with dark matter & hazard polygons implemented |
| **TSK-007** | AI / ML | Implement data preprocessing & model inference wrapper (`predict.py`) | Gaurav | Backlog | P1 | Waiting on TSK-004 |
| **TSK-008** | Frontend | Create AI risk visualization cards & confidence badges (with Gaurav) | Rohit | **Done** | P1 | Semicircular gauge, hazard breakdown, and confidence indicator built |
| **TSK-009** | Integration | Connect Backend route `/prediction/risk` to Gaurav's inference pipeline | Mohit | Backlog | P0 | Waiting on TSK-002, TSK-007 |
| **TSK-010** | Integration | End-to-end UI -> API -> Model verification and live testing | Team | Backlog | P0 | Waiting on TSK-008, TSK-009 |
| **TSK-011** | Demo | Rehearse demo walkthrough and execute `DEMO_CHECKLIST.md` | Team | Backlog | P0 | 3 hours before presentation |
| **TSK-012** | Frontend | Human-crafted editorial UI redesign (warm ivory palette, Newsreader serif typography, JetBrains Mono telemetry, Hero meteorological briefing, Positron Light Leaflet GIS, and public safety alerts) | Rohit | **Done** | P0 | Clean build (0 errors) & dev server verified on port 3000 |


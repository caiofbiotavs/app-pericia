# AI Coding Agent Guide for App Perícia

## Project summary
- Static web app served from `site/`.
- No backend API; app state is stored in browser `localStorage`.
- Main features:
  - `Dashboard` (`site/dashboard/dashboard.html`) — local blockchain creation, load, export.
  - `Validação` (`site/validacao/index.html`) — verify local chain or imported chain file.
  - `Admin` (`site/painel_admin/admin.html`) — login using `site/painel_admin/users.json`, import/replace/clear local chain.
- Static assets: HTML, CSS, JS, JSON.
- Deployment uses `Caddyfile` + `deploy.sh` and expects a Docker container named `app`.

## Key files and directories
- `site/index.html` — app overview and navigation.
- `site/js/chain.js` — blockchain localStorage logic and chain validation.
- `site/js/auth.js` — client-side admin auth and session handling.
- `site/css/pericia.css` — app styling.
- `site/blockchain.json` — seed data for chain initialization.
- `site/painel_admin/users.json` — admin credentials used by the client.
- `site/test/index.html` — browser-based test runner for chain and auth behavior.
- `site/test/README.md` — instructions for running the test suite.
- `site/test/users.json` — fixture used by auth tests.
- `STORIES.md` — backlog de casos de uso para a suíte de perícia judicial.
- `ROADMAP.md` — planejamento de produto, sprints e prioridades.
- `SQUAD.md` — papéis ágeis e responsabilidades da equipe.
- `Caddyfile` — static site routing and deploy hook proxy.
- `deploy.sh` — deploy script that pulls `main` and reloads Caddy.

## Development guidance
- Keep changes within the static site model unless the user explicitly requests a backend/service addition.
- Preserve Portuguese UI text and labels during fixes or enhancements.
- Use relative paths inside `site/` pages so links remain correct after deployment.
- Avoid adding node/npm build tooling; this repository has no package manifest.
- Prefer Test-Driven Development: add or update tests for chain behavior and auth flows before changing core logic.
- For workflow changes, note that `deploy.sh` expects `git pull origin main` and reloads Caddy inside Docker.

## When editing
- Prefer minimal, direct updates to HTML/CSS/JS.
- Validate changes with browser-like static behavior, since chain and auth run in client JS.
- If adding new UI pages, place them under `site/` and register navigation links in the existing header.
- If modifying blockchain behavior, keep the localStorage fallback and seed file semantics.

## Helpful assumptions
- The app is intentionally static and client-driven.
- `site/blockchain.json` is seed-only, not writable by the app.
- Admin login is handled entirely in the browser, based on `users.json` and hashed passwords.

## Note for AI agents
- This repo has no package manager and no server-side code. Tests are available in `site/test/` and should be used for behavior regression.
- This project is now organized with a lightweight roadmap and agile squad model in `ROADMAP.md` and `SQUAD.md`.
- Fixes should not introduce server deployment complexities beyond the existing `deploy.sh`/`Caddyfile` model.

## User Acceptance Workflow
- Use `WORKFLOW.md` as the standard process for this project.
- When acting as the user agent, adopt a pure non-technical persona.
- Perform feature validation only from the help/manual documentation.
- Report every pain point honestly and prioritize usability issues over technical detail.
- Coordinate with the squad to create a roadmap from the user feedback.
- Divide improvements into sprints, update documentation, and request a new user validation after each sprint.
- Progress only when the previous user pain has been resolved and feedback is positive.

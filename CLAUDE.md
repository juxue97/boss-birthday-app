# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                # Angular dev server at http://localhost:4200
npm run electron         # Build + open in Electron (primary way to run the app)
npm run build            # Production build
npm run dist             # Build + package as Windows portable .exe (outputs to release/)
ng generate component pages/<name>/<name>  # Scaffold a new page component
```

There are no tests in this project.

## Architecture

This is an **Angular 19 + Electron** kiosk-style birthday interactive experience. The Electron shell (`electron/main.js`) wraps the Angular SPA; the `npm run electron` script builds Angular with `--base-href ./` first so asset paths resolve correctly in the file:// context.

### User flow

```
/landing  →  (click anywhere)  →  /welcome  →  (click Yes)  →  /video
                                       ↑                           
               idle timeout (60s) ─────┘ (redirects back to /landing)
```

- **`/landing`** — DVD-screensaver bounce animation of company logos on a dark canvas with mouse ripple/glow effects. Any click triggers a fade-out and navigates to `/welcome`.
- **`/welcome`** — Shows a prompt card ("Are you ready to celebrate?") with a Yes button and an evasive No button that jumps away on hover. Background renders a collage of team member photos. `idleGuard` / `idleDeactivateGuard` start/stop `IdleService` on entry/exit.
- **`/video`** — Plays `assets/videos/ck_birthday.mov` in fullscreen automatically via `HTMLVideoElement.requestFullscreen()`.

### Services & state

- **`CommonService`** — Singleton that holds all media config as Angular signals. Image/video sources are hardcoded here. To add/remove people or change the video, edit the signal initializers in `src/app/services/common.service.ts`.
- **`IdleService`** — Listens to `mousemove`, `mousedown`, `keydown`, `touchstart` on `document` (outside NgZone for perf). Configured via `idleGuard`; the `/welcome` route has a 60-second timeout before redirecting to `/landing`.

### Key data models (`src/app/models/common.model.ts`)

```ts
ImageConfigs { src, description?, css? }
VideoConfigs  { src, description? }
```

### Assets

- `src/assets/images/logo/` — Company logo variants (used in landing bounce animation)
- `src/assets/images/person/` — Team member headshots (used in welcome background + card)
- `src/assets/videos/` — Birthday video (`ck_birthday.mov`)

The `welcome` page uses `imagePersonConfigs()[0]` as the featured person photo and `slice(1)` for the background collage — so array order in `CommonService` matters.

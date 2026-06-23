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

- **`/landing`** — DVD-screensaver bounce animation of company logos on a dark canvas with mouse ripple/glow effects. Logo bounces at `velocityX = velocityY = 4.25`; changes to next logo on every wall collision. Any click triggers a ripple + fade-out and navigates to `/welcome` after 850 ms.
- **`/welcome`** — Shows a prompt card ("Are you ready to celebrate?") with a Yes button and an evasive No button that jumps away on hover. Background renders a collage of team member photos. `idleGuard` / `idleDeactivateGuard` start/stop `IdleService` on entry/exit.
- **`/video`** — Plays `assets/videos/ck_birthday.mov` in fullscreen automatically via `HTMLVideoElement.requestFullscreen()`.

### Component tree

```
AppWelcomeComponent  (welcome/welcome.component.ts)
├── AppBackgroundComponent   (welcome/background/background.component.ts)
└── AppPromptCardComponent   (welcome/prompt-card/prompt-card.component.ts)
```

**`AppBackgroundComponent`** — Renders the photo collage behind the card. Contains a hardcoded `positions[]` array of 29 `{x, y, r}` slots (percentage-based `left`/`top` and rotation angle in degrees). Each photo element receives CSS custom properties `--x`, `--y`, `--rotate`, `--delay`, and `--duration` for staggered entrance animation. Reads `imagePersonConfigs().slice(1)` directly from `CommonService` (index 0 is the featured person, not a background photo).

**`AppPromptCardComponent`** — Handles the card UI. `firstPersonImageSrc` reads `imagePersonConfigs()[0]` (the birthday person's headshot). `moveNoButton()` calculates a random position within the `#restrictionContainer` bounds and updates `noButtonPosition`; the No button is absolutely positioned via those coordinates. Yes click sets `isClosing = true` and navigates to `/video` after 850 ms.

### Services & state

- **`CommonService`** (`src/app/services/common.service.ts`) — Singleton that holds all media config as Angular signals. Image/video sources are hardcoded in the constructor. To add/remove people or change the video, edit the signal initializers here.
  - `imageLogoConfigs` — 4 active logo variants (black logo is commented out)
  - `imagePersonConfigs` — 30 entries; **index 0 (`CK_HEAD.png`) is the featured birthday-person photo**; `slice(1)` feeds the background collage. Array order matters.
  - `videoConfigs` — single `VideoConfigs` signal (`ck_birthday.mov`)
- **`IdleService`** (`src/app/services/idle.service.ts`) — Listens to `mousemove`, `mousedown`, `keydown`, `touchstart` on `document` (outside NgZone for perf). API: `startWatching(timeoutMs, redirectTo)` / `stopWatching()`. Configured via `idleGuard`; the `/welcome` route has a 60-second timeout before redirecting to `/landing`.

### Route guards (`src/app/pages/guards/idle.guard.ts`)

- `idleGuard: CanActivateFn` — reads `route.data.idleTimeoutMs` (default `60_000`) and `route.data.idleRedirectTo` (default `'/landing'`), then calls `idleService.startWatching()`.
- `idleDeactivateGuard: CanDeactivateFn` — calls `idleService.stopWatching()`.

### Key data models (`src/app/models/common.model.ts`)

```ts
ImageConfigs { src, description?, css? }
VideoConfigs  { src, description? }
```

### Assets

- `src/assets/images/logo/` — Company logo variants (used in landing bounce animation)
- `src/assets/images/person/` — Team member headshots (`CK_HEAD.png` at index 0 is the featured photo; the rest fill the background collage)
- `src/assets/videos/` — Birthday video (`ck_birthday.mov`, git-ignored via `*.mov`)

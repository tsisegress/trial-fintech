# Frontend Roadmap (Current Status)

## Completion estimate

- UI prototype and navigation: **~70% done**
- Backend integration and data flows: **~35% done**
- Production readiness (auth, validation, reliability): **~15% done**
- Demo-readiness for hackathon-style judging: **~80% done**

## Already done

- Vite + React app scaffold
- Core pages: Landing, Onboarding, Discover, Search, Profile, Dashboard
- Shared UI components and lightweight global store
- Service layer and initial hooks for match/search APIs
- Basic unit tests for service layer
- Branding support via shared `BrandMark` with PNG fallback

## Left to finish

## 1) Must-have before live demo

- Connect Discover and Search fully to backend response schemas
- Add empty/error/loading states on every major panel
- Add one end-to-end happy path flow for founder and investor personas
- Add screenshot-ready sample data snapshots

## 2) Must-have before submission handoff

- Add route system (React Router) instead of manual state route switching
- Add form validation for onboarding/profile fields
- Add auth placeholder and role-based access boundaries
- Add request cancellation/debounce for search requests
- Add test coverage for hooks and key page interactions

## 3) Stretch goals

- Add analytics events for key actions (search, like, intro request)
- Add accessibility pass (keyboard, contrast, landmarks)
- Add performance pass (memoization, list virtualization if needed)

## Suggested next 3 files

1. `src/pages/DiscoverPage.jsx` (schema-safe backend mapping + action API calls)
2. `src/pages/SearchPage.jsx` (debounced semantic search + cancellation)
3. `src/App.jsx` (migrate to React Router route config)

# AgriVision AI 🌱

AI-powered Smart Agriculture Platform — crop disease detection, weather intelligence, soil analytics, yield prediction and drone fleet monitoring.

## Tech Stack

- React 18 (Vite)
- Tailwind CSS v4
- React Router DOM v6
- Framer Motion
- React Icons
- Recharts
- Axios
- React Hook Form

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
    assets/              static images, illustrations
    components/
        common/          Button, Card, Badge, Navbar, Footer, Loader...
        dashboard/       Sidebar, Topbar, StatCard
        disease/         disease detection module components
        weather/         weather module components
        soil/            soil analysis module components
        yield/           yield prediction module components
        drone/           drone monitoring module components
    layouts/             MainLayout (public), DashboardLayout (app shell)
    pages/               route-level pages
    hooks/               useFetch, useMediaQuery, useScrollToTop
    services/            apiClient (axios), farmService (mocked)
    utils/               constants, formatters, motion variants
    data/                dummy data per module
    routes/              AppRoutes with lazy loading + page transitions
    context/             AppContext (global UI state)
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Landing page |
| `/dashboard` | Farm overview |
| `/dashboard/disease-detection` | AI disease detection |
| `/dashboard/weather` | Weather intelligence |
| `/dashboard/soil-analysis` | Soil analysis |
| `/dashboard/yield-prediction` | Yield prediction |
| `/dashboard/drone-monitoring` | Drone monitoring |

## Status

Architecture, routing, layouts and design system are in place. Module pages are scaffolded and ready to be built out. All data is mocked — no backend or auth yet.

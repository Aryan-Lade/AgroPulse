# AgriNova AI
## Empowering Farmers with AI, Data, and Precision Agriculture

AgriNova AI is a modern, full-featured precision agriculture dashboard built with React 18 and Vite 6. It brings together AI-powered crop disease detection, satellite imagery analysis, real-time weather intelligence, soil health monitoring, drone analytics, yield forecasting, and more — all in a single beautifully designed platform. Designed for the next generation of smart farming, AgriNova AI bridges the gap between traditional agriculture and cutting-edge technology.

---

## Features

AgriNova AI ships with **14 modules** covering every aspect of modern farm management:

| # | Module | Description |
|---|--------|-------------|
| 1 | 🏠 **Landing Page** | Marketing homepage with animated hero, feature showcase, stats, how-it-works, and testimonials |
| 2 | 📊 **Dashboard** | Central hub with farm health cards, stat counters, weather summary, crop status, recent detections, quick actions, activity timeline, and AI recommendations |
| 3 | 🔬 **Disease Detection** | AI-powered crop disease identification with image upload simulation, confidence scores, treatment recommendations, and detection history |
| 4 | 🌦️ **Weather Intelligence** | Multi-day forecasts, hourly breakdowns, rainfall prediction charts, agricultural weather advisories, and risk assessment |
| 5 | 🌱 **Soil Analysis** | Comprehensive soil health reports with NPK nutrient charts, pH levels, moisture content, organic matter, and remediation suggestions |
| 6 | 🧪 **Fertilizer Advisor** | AI-driven fertilizer recommendations based on crop type, soil data, and growth stage, with cost-benefit analysis |
| 7 | 📈 **Yield Prediction** | ML-based harvest forecasting with historical yield trends, seasonal comparisons, and factor-based projections |
| 8 | 🚁 **Drone Analytics** | Aerial field monitoring with NDVI mapping, zone analysis, anomaly detection, and flight mission logs |
| 9 | 🛰️ **Satellite Imagery** | Multi-spectral satellite data views (NDVI, NDWI, thermal) with field boundary overlays and time-series analysis |
| 10 | 📋 **Reports** | Exportable farm reports with performance summaries, compliance records, and historical data tables |
| 11 | 🛒 **Marketplace** | Agricultural inputs marketplace for seeds, fertilizers, and equipment with product listings and order tracking |
| 12 | 👥 **Community** | Farmer forum and knowledge-sharing hub with posts, expert Q&A, and regional farming discussions |
| 13 | ⚙️ **Settings** | User profile, notification preferences, farm configuration, display options, and API key management |
| 14 | 🔔 **Notifications** | Real-time notification drawer with alerts for weather warnings, disease detections, and system events |

---

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^18.3.1 | UI library |
| **Vite** | ^6.0.7 | Build tool & dev server |
| **Tailwind CSS** | ^4.0.0 | Utility-first styling |
| **Framer Motion** | ^11.15.0 | Animations & transitions |
| **Recharts** | ^2.15.0 | Data visualisation charts |
| **React Router DOM** | ^6.28.1 | Client-side routing |
| **Axios** | ^1.7.9 | HTTP client for API calls |
| **React Icons** | ^5.4.0 | Icon library |
| **React Hook Form** | ^7.54.2 | Form state management |

---

## Project Architecture

AgriNova AI is structured around three core architectural pillars:

### Context Layer
Three React contexts drive global state:

- **`ThemeContext`** — manages `dark` / `light` mode, persists preference to `localStorage`, and toggles a `.dark` class on `<html>` for Tailwind's dark mode variant.
- **`AppContext`** — controls the dashboard UI shell: mobile sidebar drawer visibility, desktop sidebar collapsed/expanded state, notification drawer open state, active farm selection, and current language.
- **`ToastContext`** — provides a `useToast()` hook for triggering success / error / info toast notifications from any component.

### Routing & Layout
Two layout shells keep page transitions clean:

- **`MainLayout`** — wraps public-facing pages (landing, 404) with `Navbar` and `Footer`.
- **`DashboardLayout`** — wraps all app pages with the collapsible `Sidebar`, `Topbar`, and `NotificationDrawer`. The shell never unmounts on navigation — only the inner `<Outlet>` content transitions.

All routes are **lazy-loaded** via `React.lazy()` + `Suspense`, keeping the initial bundle small.

### Services Layer
- **`apiClient.js`** — a pre-configured Axios instance that reads `VITE_API_BASE_URL` and attaches auth headers.
- **`farmService.js`** — abstracted farm API methods (currently wired to JSON mock data, ready to swap for real endpoints).

### Data Layer
The `src/data/` directory contains rich JSON mock datasets that simulate real API responses:

- `dashboardData.js`, `farmStats.json` — dashboard KPIs and farm metrics
- `weather.json`, `diseaseHistory.json`, `soilAnalysis.json` — module-specific data
- `yieldPrediction.json`, `droneAnalysis.json`, `satellite.json` — AI/sensor data
- `alerts.json`, `notifications.json` — system event data
- `marketplace.json`, `community.json`, `reports.json`, `recommendations.json` — content data

### Component Hierarchy
```
App
├── ThemeProvider
│   └── AppProvider
│       └── ToastProvider
│           └── BrowserRouter
│               └── AppRoutes
│                   ├── MainLayout          (public pages)
│                   │   ├── Navbar
│                   │   ├── <Outlet>        → Home, NotFound
│                   │   └── Footer
│                   └── DashboardLayout     (app pages)
│                       ├── Sidebar
│                       ├── Topbar
│                       ├── NotificationDrawer
│                       └── <Outlet>        → All dashboard pages
```

---

## Folder Structure

```
AgroPulse/
├── public/
│   └── leaf.svg                    # Favicon / brand icon
├── src/
│   ├── assets/                     # Static assets (images, fonts)
│   ├── components/
│   │   ├── charts/                 # Recharts wrapper components
│   │   │   ├── ChartCard.jsx
│   │   │   ├── CropDistributionChart.jsx
│   │   │   ├── DiseaseFrequencyChart.jsx
│   │   │   ├── RainfallPredictionChart.jsx
│   │   │   ├── SoilNutrientsChart.jsx
│   │   │   ├── WeatherTrendsChart.jsx
│   │   │   └── YieldTrendChart.jsx
│   │   ├── common/                 # Reusable UI primitives
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── CountUp.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ModuleShell.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   ├── PageWrapper.jsx
│   │   │   ├── Particles.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── TextReveal.jsx
│   │   ├── dashboard/              # Dashboard shell components
│   │   │   ├── ActivityTimeline.jsx
│   │   │   ├── CropStatusList.jsx
│   │   │   ├── FarmHealthCard.jsx
│   │   │   ├── NotificationDrawer.jsx
│   │   │   ├── QuickActionsGrid.jsx
│   │   │   ├── QuickInsightsPanel.jsx
│   │   │   ├── RecentDetectionCard.jsx
│   │   │   ├── RecommendationsCard.jsx
│   │   │   ├── ReportsTable.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── WeatherCard.jsx
│   │   └── home/                   # Landing page sections
│   │       ├── AnimatedCounter.jsx
│   │       ├── FarmIllustration.jsx
│   │       ├── FeaturesSection.jsx
│   │       ├── Hero.jsx
│   │       ├── HowItWorksSection.jsx
│   │       ├── StatsSection.jsx
│   │       └── TestimonialsSection.jsx
│   ├── context/
│   │   ├── AppContext.jsx           # UI shell state (sidebar, notifications, farm)
│   │   ├── ThemeContext.jsx         # Dark / light theme toggle
│   │   └── ToastContext.jsx         # Toast notification system
│   ├── data/                        # Mock JSON data & JS data modules
│   │   ├── alerts.json
│   │   ├── community.json
│   │   ├── dashboardData.js
│   │   ├── diseaseData.js
│   │   ├── diseaseHistory.json
│   │   ├── droneAnalysis.json
│   │   ├── droneData.js
│   │   ├── farmStats.json
│   │   ├── fertilizer.json
│   │   ├── marketplace.json
│   │   ├── notifications.json
│   │   ├── recommendations.json
│   │   ├── reports.json
│   │   ├── satellite.json
│   │   ├── soilAnalysis.json
│   │   ├── soilData.js
│   │   ├── weather.json
│   │   ├── weatherData.js
│   │   ├── yieldData.js
│   │   └── yieldPrediction.json
│   ├── hooks/
│   │   ├── useChartTheme.js         # Theme-aware Recharts colour palette
│   │   ├── useFetch.js              # Generic data fetching hook
│   │   ├── useMediaQuery.js         # Responsive breakpoint detection
│   │   └── useScrollToTop.js        # Auto-scroll on route change
│   ├── layouts/
│   │   ├── DashboardLayout.jsx      # App shell (sidebar + topbar)
│   │   └── MainLayout.jsx           # Public shell (navbar + footer)
│   ├── pages/
│   │   ├── Community.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DiseaseDetection.jsx
│   │   ├── DroneMonitoring.jsx
│   │   ├── Fertilizer.jsx
│   │   ├── Home.jsx
│   │   ├── Marketplace.jsx
│   │   ├── NotFound.jsx
│   │   ├── Reports.jsx
│   │   ├── Satellite.jsx
│   │   ├── Settings.jsx
│   │   ├── SoilAnalysis.jsx
│   │   ├── Weather.jsx
│   │   └── YieldPrediction.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx            # Lazy-loaded route definitions
│   ├── services/
│   │   ├── apiClient.js             # Axios instance with base URL & headers
│   │   └── farmService.js           # Farm API methods
│   ├── utils/
│   │   ├── chartTheme.js            # Recharts colour tokens
│   │   ├── constants.js             # App-wide constants & ROUTES map
│   │   ├── formatters.js            # Number, date, unit formatters
│   │   └── motionVariants.js        # Framer Motion animation presets
│   ├── App.jsx                      # Root component, provider tree
│   ├── index.css                    # Tailwind base + CSS custom properties
│   └── main.jsx                     # React DOM entry point
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

---

## Installation & Setup

**Prerequisites:** Node.js 18+ and npm 9+

```bash
# 1. Clone the repository
git clone https://github.com/your-org/agrinova-ai.git

# 2. Navigate into the project
cd AgroPulse

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

Other available scripts:

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
```

---

## Environment Variables

Create a `.env` file in the project root to configure the API connection:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for the backend REST API. The Axios client in `src/services/apiClient.js` reads this value at build time. When left unset, all data is served from the local JSON mock files in `src/data/`. | `undefined` (mocks used) |

> **Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to client-side code.

---

## Available Routes

### Public Routes (MainLayout)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Marketing landing page |
| `*` | NotFound | 404 catch-all |

### Dashboard Routes (DashboardLayout)

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | Dashboard | Main overview & KPIs |
| `/dashboard/disease-detection` | DiseaseDetection | AI crop disease analysis |
| `/dashboard/weather` | Weather | Weather forecasts & advisories |
| `/dashboard/soil-analysis` | SoilAnalysis | Soil health & nutrient data |
| `/dashboard/fertilizer` | Fertilizer | Fertilizer recommendations |
| `/dashboard/yield-prediction` | YieldPrediction | Harvest forecasting |
| `/dashboard/drone-analytics` | DroneMonitoring | Aerial field analytics |
| `/dashboard/satellite` | Satellite | Satellite imagery viewer |
| `/dashboard/reports` | Reports | Farm performance reports |
| `/dashboard/marketplace` | Marketplace | Agricultural inputs store |
| `/dashboard/community` | Community | Farmer forum & knowledge base |
| `/dashboard/settings` | Settings | Account & app configuration |

---

## Design System

### Color Palette

AgriNova AI uses a green-centric palette that reflects agriculture and growth:

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | `emerald-500` / `#10b981` | `emerald-400` | CTAs, active states, key metrics |
| Secondary | `teal-500` | `teal-400` | Charts, secondary actions |
| Accent | `lime-400` | `lime-300` | Highlights, NDVI indicators |
| Surface | `white` | `gray-900` | Page backgrounds |
| Card | `gray-50` | `gray-800` | Card backgrounds |
| Border | `gray-200` | `gray-700` | Dividers and outlines |
| Text Primary | `gray-900` | `gray-50` | Headings |
| Text Secondary | `gray-500` | `gray-400` | Supporting text |

### Typography

- **Font:** System font stack (Inter / SF Pro / Segoe UI) via Tailwind's default sans-serif configuration
- **Scale:** Tailwind's default type scale (`text-xs` through `text-5xl`)
- **Headings:** Semibold to Bold weight
- **Body:** Regular weight, relaxed line-height

### Dark / Light Theme

Theme is controlled by `ThemeContext`. The toggle writes `dark` or `light` to `localStorage` under the key `agrinova-theme` and adds/removes the `.dark` class on `<html>`. Tailwind's `darkMode: 'class'` strategy then activates all `dark:` variants site-wide. The theme can be toggled from the Topbar or the Settings page.

### Animation

Framer Motion powers all page transitions, card entrances, counter animations, and micro-interactions. Reusable variants are centralised in `src/utils/motionVariants.js`:

- `fadeInUp` — standard card/section entrance
- `staggerContainer` — staggers children with a delay
- `scaleIn` — modal and popover entrance
- `slideInLeft` / `slideInRight` — sidebar and drawer transitions

---

## Future Roadmap

- 🐍 **FastAPI + Python ML backend** — Replace mock data with a real inference API powered by PyTorch / TensorFlow models
- 🛰️ **Real satellite API** — Integrate Sentinel Hub or NASA MODIS for live multi-spectral imagery
- 📡 **IoT sensor integration** — Connect soil moisture, temperature, and humidity sensors via MQTT
- 🎙️ **Real voice AI** — Implement voice-activated farm queries using OpenAI Whisper + an LLM
- 📱 **Mobile app** — React Native companion app for field use
- 🌐 **Multilingual support** — Full i18n for Hindi, Marathi, Tamil, and Telugu using `react-i18next`
- 🔐 **Authentication** — JWT-based login, farm-level RBAC, and OAuth2 social login
- ☁️ **Cloud deployment** — AWS / GCP deployment with CDN, auto-scaling, and CI/CD pipeline

---

## Screenshots

> Screenshots will be added once the application is deployed.

| Screen | Description |
|--------|-------------|
| 🖼️ Dashboard | Central farm overview with live KPIs and charts |
| 🖼️ Landing Page | Marketing homepage with animated hero and feature sections |
| 🖼️ Disease Detection | AI disease identification interface with image upload |
| 🖼️ Weather Intelligence | Multi-day forecast with agricultural risk advisories |

---

## License

MIT License

Copyright (c) 2026 AgriNova AI

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

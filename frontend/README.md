# Meghdoot (मेघदूत) — Intelligent Weather Risk & Early Warning Platform Frontend

> **Tagline:** Know the Storm Before It Arrives.  
> **Lead Frontend Engineer:** Rohit Singh ([docs/RohitRole.md](file:///D:/NAMUKE/docs/RohitRole.md))

---

## 🌩️ Project Overview

**Meghdoot** is an intelligent meteorological monitoring, localized risk prediction, and early-warning platform designed to safeguard urban communities from severe localized weather events (convective thunderstorms, cloudbursts, urban flooding, gale squalls, and lightning strikes) at street-level 1 km² granularity.

---

## 🎨 UI/UX Design System & Theme Tokens

In strict accordance with the project design guidelines, Meghdoot uses a restrained, professional meteorological palette avoiding typical blue-and-white SaaS conventions:

- **Midnight Charcoal**: `#151B23` (Background)
- **Dark Slate**: `#222B36` (Panels & Cards)
- **Slate Border**: `#2E3A4B` (Subtle dividers)
- **Warm Ivory**: `#F4F1EA` (Primary Typography)
- **Muted Sage**: `#A7B8A2` (Low Risk & Normal Status)
- **Amber**: `#E8AD55` (Moderate Risk & Attention)
- **Soft Coral**: `#D96C5F` (Severe Risk & Critical Warnings)

---

## 🏗️ Exact Architecture & Directory Tree

```
frontend/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── api/                         # Backend API clients with seamless offline fallback
│   │   ├── client.ts
│   │   ├── weatherApi.ts
│   │   ├── riskApi.ts
│   │   └── alertsApi.ts
│   ├── mocks/                      # Realistic simulated datasets conforming to API_CONTRACT.md
│   │   ├── weather.mock.ts
│   │   ├── risk.mock.ts
│   │   ├── alerts.mock.ts
│   │   └── forecast.mock.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # Collapsible navigation with live unread badge
│   │   │   ├── Navbar.tsx           # Station selector, live clock, notification panel
│   │   │   ├── PageHeader.tsx       # Title, coordinates readout & telemetry source badge
│   │   │   └── DashboardLayout.tsx  # Responsive mobile drawer & layout shell
│   │   ├── dashboard/
│   │   │   ├── WeatherOverview.tsx  # Hero summary with condition icons & feels-like
│   │   │   ├── WeatherMetrics.tsx   # Temperature, Humidity, Wind vector, Pressure, Rain
│   │   │   ├── ForecastSummary.tsx  # 24-hr interactive chart & 5-day synoptic cards
│   │   │   └── HistoricalTrends.tsx # Historical anomaly vs 10-year climatological baseline
│   │   ├── map/
│   │   │   ├── WeatherMap.tsx       # Leaflet interactive GIS map with dark matter tiles
│   │   │   ├── RiskZones.tsx        # Hazard polygon definitions & station coordinates
│   │   │   ├── MapLegend.tsx        # Low, Moderate, High, Severe classification legend
│   │   │   └── MapControls.tsx      # Zoom, layer toggles, and recenter
│   │   ├── weather/
│   │   │   ├── TemperatureCard.tsx
│   │   │   ├── HumidityCard.tsx
│   │   │   ├── WindCard.tsx
│   │   │   ├── PressureCard.tsx
│   │   │   ├── RainfallCard.tsx
│   │   │   └── HourlyForecastChart.tsx # Recharts temperature & rain probability area chart
│   │   ├── risk/
│   │   │   ├── RiskAssessmentCard.tsx  # Overall risk index (0–100)
│   │   │   ├── RiskGauge.tsx           # Semicircular SVG gauge indicator
│   │   │   ├── HazardBreakdown.tsx     # Individual hazard bars & lead times
│   │   │   ├── RiskExplanation.tsx     # "Why This Risk?" physical atmospheric factors
│   │   │   └── ConfidenceIndicator.tsx # AI Model inference confidence (independent)
│   │   ├── alerts/
│   │   │   ├── AlertBanner.tsx         # Prominent top warning banner
│   │   │   ├── AlertList.tsx           # Filtered active advisories list
│   │   │   ├── AlertCard.tsx           # Detailed card with calm, direct precautions
│   │   │   └── AlertFilters.tsx        # Severity, hazard type, and search filters
│   │   └── common/
│   │       ├── LoadingState.tsx
│   │       ├── ErrorState.tsx
│   │       ├── EmptyState.tsx
│   │       └── StatusBadge.tsx         # "LIVE TELEMETRY" or "DEMO DATA (SIMULATED)"
│   ├── hooks/
│   │   ├── useWeather.ts
│   │   ├── useRiskPrediction.ts
│   │   └── useAlerts.ts
│   ├── types/
│   │   ├── weather.ts
│   │   ├── risk.ts
│   │   ├── alert.ts
│   │   └── api.ts
│   ├── utils/
│   │   ├── riskUtils.ts
│   │   ├── dateUtils.ts
│   │   └── locationUtils.ts
│   ├── styles/
│   │   └── index.css
│   └── assets/
│       └── meghdoot-logo.svg
└── README.md
```

---

## 🚀 Running the Application

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🔌 API & Backend Independence

- Fully conforms to [`docs/API_CONTRACT.md`](file:///D:/NAMUKE/docs/API_CONTRACT.md).
- When the backend service (`http://localhost:8000/api/v1`) is running, live data is queried automatically.
- When offline or during isolated frontend development, the built-in mock fallback engine serves comprehensive, location-specific simulated telemetry for all 6 stations (Pune, Mumbai, Nashik, Satara, Ratnagiri, Nagpur).

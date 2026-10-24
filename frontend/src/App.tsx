import React, { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { NavigationTab } from './components/layout/Sidebar';
import { PageHeader } from './components/layout/PageHeader';
import { WeatherOverview } from './components/dashboard/WeatherOverview';
import { HeroBriefing } from './components/dashboard/HeroBriefing';
import { WeatherMetrics } from './components/dashboard/WeatherMetrics';
import { ForecastSummary } from './components/dashboard/ForecastSummary';
import { HistoricalTrends } from './components/dashboard/HistoricalTrends';
import { RiskAssessmentCard } from './components/risk/RiskAssessmentCard';
import { RiskExplanation } from './components/risk/RiskExplanation';
import { WeatherMap } from './components/map/WeatherMap';
import { AlertBanner } from './components/alerts/AlertBanner';
import { AlertList } from './components/alerts/AlertList';
import { LoadingState } from './components/common/LoadingState';
import { ErrorState } from './components/common/ErrorState';

import { useWeather } from './hooks/useWeather';
import { useRiskPrediction } from './hooks/useRiskPrediction';
import { useAlerts } from './hooks/useAlerts';
import { DEFAULT_LOCATION } from './utils/locationUtils';
import { LocationCoordinates } from './types/weather';
import {
  ShieldAlert,
  Info,
  Server,
  ToggleLeft,
  ToggleRight,
  Database,
  CloudRain,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview');
  const [selectedLocation, setSelectedLocation] = useState<LocationCoordinates>(DEFAULT_LOCATION);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Custom Hooks
  const {
    currentWeather,
    hourlyForecast,
    dailyForecast,
    historicalTrends,
    dataSource: weatherSource,
    loading: weatherLoading,
    error: weatherError,
    lastUpdated,
    refresh: refreshWeather,
  } = useWeather(selectedLocation);

  const {
    assessment,
    dataSource: riskSource,
    loading: riskLoading,
    error: riskError,
    refresh: refreshRisk,
  } = useRiskPrediction(selectedLocation);

  const {
    alerts,
    filteredAlerts,
    highPriorityAlert,
    dataSource: alertSource,
    filters,
    setFilters,
    refresh: refreshAlerts,
  } = useAlerts(selectedLocation.name);

  // Global manual refresh
  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    await Promise.all([refreshWeather(), refreshRisk(), refreshAlerts()]);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const primaryDataSource = weatherSource;

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      selectedLocation={selectedLocation}
      onSelectLocation={setSelectedLocation}
      lastUpdated={lastUpdated}
      onRefresh={handleRefreshAll}
      isRefreshing={isRefreshing}
      alerts={alerts}
    >
      {/* Top Warning Banner for High Priority Alerts */}
      <AlertBanner
        alert={highPriorityAlert}
        onViewAlerts={() => setActiveTab('alerts')}
      />

      {/* --- TAB 1: OVERVIEW (MASTER DASHBOARD) --- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <PageHeader
            title="Localized Weather Intelligence"
            subtitle="Hyper-local 1 km² micro-climate observation and AI-assisted severe weather early warnings."
            location={selectedLocation}
            dataSource={primaryDataSource}
          />

          {weatherLoading ? (
            <LoadingState message="Aggregating Local Meteorological Feeds..." />
          ) : weatherError ? (
            <ErrorState
              title="Station Connection Error"
              message={weatherError}
              onRetry={handleRefreshAll}
            />
          ) : currentWeather ? (
            <>
              {/* Editorial Hero Meteorological Briefing */}
              <HeroBriefing
                weather={currentWeather}
                location={selectedLocation}
                alerts={alerts}
                onExploreMap={() => setActiveTab('map')}
                onViewAlerts={() => setActiveTab('alerts')}
              />

              {/* Primary Overview Summary */}
              <WeatherOverview weather={currentWeather} />

              {/* Responsive Metrics Bar */}
              <WeatherMetrics
                weather={currentWeather}
                todayForecast={dailyForecast[0]}
              />

              {/* Core 2-Column Split: AI Risk Assessment & GIS Map */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-6 space-y-6">
                  {assessment && (
                    <>
                      <RiskAssessmentCard
                        assessment={assessment}
                        onViewDetailedMap={() => setActiveTab('map')}
                      />
                      <RiskExplanation assessment={assessment} />
                    </>
                  )}
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="bg-white border border-softborder rounded p-4 shadow-subtle">
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-softborder">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-monsoon" />
                        <h3 className="text-base font-serif font-semibold text-charcoal">
                          Interactive Hazard GIS & Radar Reflectivity
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-charcoal-muted">
                        Doppler & Inundation Layers
                      </span>
                    </div>

                    <WeatherMap
                      selectedLocation={selectedLocation}
                      height="h-[490px]"
                    />
                  </div>
                </div>
              </div>

              {/* 24-Hour & 5-Day Forecast Strip */}
              <ForecastSummary hourly={hourlyForecast} daily={dailyForecast} />
            </>
          ) : null}
        </div>
      )}

      {/* --- TAB 2: LIVE WEATHER --- */}
      {activeTab === 'weather' && (
        <div className="space-y-6">
          <PageHeader
            title="Live Surface Weather Telemetry"
            subtitle="Continuous real-time ground-truth parameters from regional observation stations."
            location={selectedLocation}
            dataSource={weatherSource}
          />

          {currentWeather && (
            <>
              <WeatherOverview weather={currentWeather} />
              <WeatherMetrics
                weather={currentWeather}
                todayForecast={dailyForecast[0]}
              />
              <ForecastSummary hourly={hourlyForecast} daily={dailyForecast} />
            </>
          )}
        </div>
      )}

      {/* --- TAB 3: RISK MAP --- */}
      {activeTab === 'map' && (
        <div className="space-y-6">
          <PageHeader
            title="Severe Hazard Map & Radar GIS"
            subtitle="Multi-layer spatial GIS showing storm tracks, lightning clusters, and urban flood inundation zones."
            location={selectedLocation}
            dataSource={riskSource}
          />

          <div className="bg-white border border-softborder rounded p-4 shadow-subtle">
            <WeatherMap selectedLocation={selectedLocation} height="h-[620px]" />
          </div>

          {assessment && <RiskExplanation assessment={assessment} />}
        </div>
      )}

      {/* --- TAB 4: FORECAST --- */}
      {activeTab === 'forecast' && (
        <div className="space-y-6">
          <PageHeader
            title="Multi-Horizon Forecast Models"
            subtitle="Hourly convective sequence and 5-day synoptic projections for Maharashtra."
            location={selectedLocation}
            dataSource={weatherSource}
          />

          <ForecastSummary hourly={hourlyForecast} daily={dailyForecast} />
        </div>
      )}

      {/* --- TAB 5: EARLY WARNINGS --- */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          <PageHeader
            title="Early Warning & Advisory Center"
            subtitle="Real-time multi-hazard advisories issued with actionable public safety instructions."
            location={selectedLocation}
            dataSource={alertSource}
          />

          <AlertList
            alerts={alerts}
            filteredAlerts={filteredAlerts}
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>
      )}

      {/* --- TAB 6: HISTORICAL ANALYSIS --- */}
      {activeTab === 'historical' && (
        <div className="space-y-6">
          <PageHeader
            title="Historical Anomaly & Climatological Analysis"
            subtitle="Comparison of observed micro-climate events against 10-year baseline averages."
            location={selectedLocation}
            dataSource="mock"
          />

          <HistoricalTrends data={historicalTrends} />
        </div>
      )}

      {/* --- TAB 7: ABOUT MEGHDOOT --- */}
      {activeTab === 'about' && (
        <div className="space-y-6">
          <PageHeader
            title="About Meghdoot (मेघदूत)"
            subtitle="Platform architecture, methodological workflow, and design philosophy."
            location={selectedLocation}
            dataSource="mock"
          />

          <div className="bg-white border border-softborder rounded p-6 space-y-6 shadow-subtle font-sans">
            <div>
              <h2 className="text-xl font-serif font-bold text-charcoal mb-2 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-monsoon" />
                Know the Storm Before It Arrives
              </h2>
              <p className="text-xs md:text-sm text-charcoal-muted leading-relaxed max-w-3xl">
                Meghdoot is designed to solve a fundamental limitation in traditional meteorological forecasting: macro-scale models operate at coarse 15–25 km² resolutions and miss localized urban cloudbursts, severe lightning surges, and flash floods. Meghdoot bridges this gap through localized sensor synthesis and AI risk estimation.
              </p>
            </div>

            {/* 4-Step Workflow */}
            <div className="pt-4 border-t border-softborder">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal mb-4">
                Core System Operational Workflow:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded bg-white flex items-center justify-center text-xs font-mono font-bold text-monsoon mb-3 border border-softborder shadow-subtle">
                      1
                    </span>
                    <h4 className="text-xs font-serif font-bold text-charcoal mb-1">
                      Data Ingestion
                    </h4>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed">
                      Collects surface weather station telemetry, barometric micro-drops, humidity, and radar hydrometeor echoes.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded bg-white flex items-center justify-center text-xs font-mono font-bold text-monsoon mb-3 border border-softborder shadow-subtle">
                      2
                    </span>
                    <h4 className="text-xs font-serif font-bold text-charcoal mb-1">
                      Convective Analysis
                    </h4>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed">
                      Computes CAPE buoyancy indices, orographic lifting factors, and moisture convergence gradients in real time.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded bg-white flex items-center justify-center text-xs font-mono font-bold text-monsoon mb-3 border border-softborder shadow-subtle">
                      3
                    </span>
                    <h4 className="text-xs font-serif font-bold text-charcoal mb-1">
                      AI Risk Estimation
                    </h4>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed">
                      Evaluates localized storm and flood probability (0–100 score) paired with independent model inference confidence.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded bg-ivory-50 border border-softborder flex flex-col justify-between">
                  <div>
                    <span className="w-7 h-7 rounded bg-white flex items-center justify-center text-xs font-mono font-bold text-terracotta mb-3 border border-softborder shadow-subtle">
                      4
                    </span>
                    <h4 className="text-xs font-serif font-bold text-charcoal mb-1">
                      Actionable Warnings
                    </h4>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed">
                      Presents calm, street-level early warnings with practical precautions and interactive hazard polygon GIS overlays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Architectural Integrity & Verification Notice */}
            <div className="p-4 rounded bg-ivory-50 border border-softborder text-xs space-y-2">
              <div className="flex items-center gap-2 text-monsoon font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verification & Scientific Integrity</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                In strict adherence to the project charter, all telemetry and prediction outputs rendered in this demonstration interface are explicitly labeled as simulated estimates. Live predictive models require calibrated Doppler station hardware integration.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 8: SETTINGS --- */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <PageHeader
            title="System & API Configuration"
            subtitle="Manage backend connection parameters, simulated fallback rules, and preferences."
            location={selectedLocation}
            dataSource="mock"
          />

          <div className="bg-white border border-softborder rounded p-6 space-y-6 max-w-2xl shadow-subtle font-sans">
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal">
                API Connection Parameters
              </h3>

              <div className="space-y-2">
                <label className="text-xs font-medium text-charcoal block">
                  Backend API Base URL
                </label>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-ivory-100 text-monsoon border border-softborder">
                    <Server className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    defaultValue="http://localhost:8000/api/v1"
                    className="flex-1 bg-ivory-50 text-charcoal text-xs rounded px-3 py-2 border border-softborder focus:outline-none focus:border-monsoon font-mono"
                  />
                </div>
                <p className="text-[11px] text-charcoal-muted font-sans">
                  Configured via <code>VITE_API_BASE_URL</code>. Falls back to mock fixtures when backend is offline.
                </p>
              </div>

              <div className="pt-4 border-t border-softborder flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-charcoal">Offline Mock Data Mode</h4>
                  <p className="text-[10px] text-charcoal-muted">
                    Forces simulated telemetry without querying live endpoints.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-ochre-dark bg-ochre/10 px-2.5 py-1 rounded border border-ochre/25">
                  Active (Offline Fallback)
                </span>
              </div>

              <div className="pt-4 border-t border-softborder flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-charcoal">GIS Tile Server</h4>
                  <p className="text-[10px] text-charcoal-muted font-mono">
                    CartoDB Positron / OpenStreetMap Light Tiles
                  </p>
                </div>
                <span className="text-xs font-mono font-medium text-monsoon">Online</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

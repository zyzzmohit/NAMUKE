import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { LocationCoordinates } from '../../types/weather';
import { MapLegend } from './MapLegend';
import { MapControls, MapLayerState } from './MapControls';
import { getStationMarkers, getHazardPolygons, StationMarker } from './RiskZones';
import { getRiskColor } from '../../utils/riskUtils';
import { ShieldAlert, Info } from 'lucide-react';

interface WeatherMapProps {
  selectedLocation: LocationCoordinates;
  onSelectLocationByCoordinates?: (loc: LocationCoordinates) => void;
  height?: string;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({
  selectedLocation,
  onSelectLocationByCoordinates,
  height = 'h-[540px]',
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const polygonLayersRef = useRef<L.LayerGroup | null>(null);
  const markerLayersRef = useRef<L.LayerGroup | null>(null);
  const radarCircleLayerRef = useRef<L.LayerGroup | null>(null);

  const [layers, setLayers] = useState<MapLayerState>({
    hazardPolygons: true,
    stations: true,
    radarSimulation: true,
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [selectedLocation.latitude, selectedLocation.longitude],
      zoom: 9,
      zoomControl: false,
    });

    // Light Positron tile layer for clean meteorological paper GIS
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // Create Layer Groups
    polygonLayersRef.current = L.layerGroup().addTo(map);
    markerLayersRef.current = L.layerGroup().addTo(map);
    radarCircleLayerRef.current = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Center when selected location changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo(
      [selectedLocation.latitude, selectedLocation.longitude],
      10,
      { duration: 1.2 }
    );
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  // Render Polygons & Markers when layers state changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // 1. Hazard Polygons
    if (polygonLayersRef.current) {
      polygonLayersRef.current.clearLayers();

      if (layers.hazardPolygons) {
        const polygons = getHazardPolygons();
        polygons.forEach((poly) => {
          const color = getRiskColor(poly.risk_level);
          const polygon = L.polygon(poly.coordinates, {
            color: color.hex,
            weight: 1.5,
            fillColor: color.hex,
            fillOpacity: 0.22,
            dashArray: poly.risk_level === 'SEVERE' ? undefined : '4, 4',
          });

          polygon.bindPopup(`
            <div style="font-family: Inter, sans-serif; font-size: 12px; color: #252B2D; background: #FAF9F5;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600; color: ${color.hex}; text-transform: uppercase;">
                ${poly.risk_level} Risk Polygon · ${poly.score}%
              </div>
              <div style="font-family: 'Newsreader', serif; font-size: 14px; font-weight: 600; margin-top: 2px; color: #252B2D;">
                ${poly.name}
              </div>
              <div style="font-size: 11px; color: #737975; margin-top: 2px;">
                Dominant Hazard: <span style="font-weight: 600; color: #252B2D;">${poly.hazard_type}</span>
              </div>
              <div style="font-size: 11px; color: #252B2D; margin-top: 4px; line-height: 1.4;">
                ${poly.advisory}
              </div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; color: #737975; margin-top: 6px; border-top: 1px solid #D8DCD5; padding-top: 4px;">
                Synthesized 1 km² GIS Sector (Meghdoot Core)
              </div>
            </div>
          `);

          polygonLayersRef.current?.addLayer(polygon);
        });
      }
    }

    // 2. Telemetry Station Markers
    if (markerLayersRef.current) {
      markerLayersRef.current.clearLayers();

      if (layers.stations) {
        const stations = getStationMarkers();
        stations.forEach((stn) => {
          const color = getRiskColor(stn.riskCategory);
          const isSelected = stn.name.toLowerCase().includes(selectedLocation.name.toLowerCase());

          // Custom HTML Pin Icon - Clean paper aesthetic
          const customIcon = L.divIcon({
            className: 'custom-station-pin',
            html: `
              <div style="position: relative; width: 26px; height: 26px; display: flex; align-items: center; justify-content: center;">
                <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${color.hex}; opacity: 0.25; animation: ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                <div style="position: relative; width: 12px; height: 12px; border-radius: 50%; background: ${color.hex}; border: 2px solid #FFFFFF; box-shadow: 0 1px 4px rgba(37, 43, 45, 0.25);"></div>
              </div>
            `,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          });

          const marker = L.marker(stn.coordinates, { icon: customIcon });

          marker.bindPopup(`
            <div style="font-family: Inter, sans-serif; font-size: 12px; color: #252B2D; min-width: 170px;">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; font-weight: 600; color: ${color.hex}; text-transform: uppercase;">
                ${stn.riskCategory} TELEMETRY NODE
              </div>
              <div style="font-family: 'Newsreader', serif; font-size: 14px; font-weight: 600; color: #252B2D; margin: 2px 0;">
                ${stn.name}
              </div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #252B2D; margin-top: 2px;">
                Temp: <b>${stn.temperature}°C</b> · ${stn.condition}
              </div>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #737975; margin-top: 4px; border-top: 1px solid #D8DCD5; padding-top: 3px;">
                ${stn.coordinates[0].toFixed(2)}°N, ${stn.coordinates[1].toFixed(2)}°E
              </div>
            </div>
          `);

          markerLayersRef.current?.addLayer(marker);
        });
      }
    }

    // 3. Radar Simulation concentric rings
    if (radarCircleLayerRef.current) {
      radarCircleLayerRef.current.clearLayers();

      if (layers.radarSimulation) {
        const innerCircle = L.circle([selectedLocation.latitude, selectedLocation.longitude], {
          radius: 20000,
          color: '#526B59',
          weight: 1,
          dashArray: '3, 6',
          fillColor: '#526B59',
          fillOpacity: 0.04,
        });

        const outerCircle = L.circle([selectedLocation.latitude, selectedLocation.longitude], {
          radius: 40000,
          color: '#A67C38',
          weight: 1,
          dashArray: '2, 8',
          fillColor: '#A67C38',
          fillOpacity: 0.02,
        });

        radarCircleLayerRef.current.addLayer(innerCircle);
        radarCircleLayerRef.current.addLayer(outerCircle);
      }
    }
  }, [layers, selectedLocation.latitude, selectedLocation.longitude, selectedLocation.name]);

  const handleToggleLayer = (key: keyof MapLayerState) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [selectedLocation.latitude, selectedLocation.longitude],
        10,
        { duration: 0.8 }
      );
    }
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className={`relative w-full ${height} rounded overflow-hidden border border-softborder shadow-subtle`}>
      {/* Map Target Container */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Top Banner Notice */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded bg-white/95 backdrop-blur-xs border border-softborder text-xs text-charcoal shadow-subtle pointer-events-auto">
        <ShieldAlert className="w-3.5 h-3.5 text-monsoon shrink-0" />
        <span className="font-medium">{selectedLocation.name} Radar Sector</span>
        <span className="text-[10px] font-mono text-charcoal-muted hidden sm:inline">
          (CartoDB Positron GIS)
        </span>
      </div>

      {/* Floating Controls (Top Right) */}
      <div className="absolute top-3 right-3 z-10">
        <MapControls
          layers={layers}
          onToggleLayer={handleToggleLayer}
          onRecenter={handleRecenter}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>

      {/* Floating Legend (Bottom Left) */}
      <div className="absolute bottom-3 left-3 z-10 max-w-xs hidden sm:block">
        <MapLegend />
      </div>

      {/* Disclaimer Badge (Bottom Right) */}
      <div className="absolute bottom-3 right-3 z-10 text-[9px] font-mono text-charcoal-muted bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded border border-softborder flex items-center gap-1.5 shadow-subtle">
        <Info className="w-3 h-3 text-monsoon shrink-0" />
        <span>Synthesized 1 km² risk polygons · Doppler L-Band overlay</span>
      </div>
    </div>
  );
};

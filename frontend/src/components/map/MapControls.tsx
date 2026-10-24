import React from 'react';
import { Layers, LocateFixed, Eye, EyeOff, Plus, Minus } from 'lucide-react';

export interface MapLayerState {
  hazardPolygons: boolean;
  stations: boolean;
  radarSimulation: boolean;
}

interface MapControlsProps {
  layers: MapLayerState;
  onToggleLayer: (key: keyof MapLayerState) => void;
  onRecenter: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  layers,
  onToggleLayer,
  onRecenter,
  onZoomIn,
  onZoomOut,
}) => {
  return (
    <div className="flex flex-col gap-2 select-none">
      {/* Zoom & Recenter Stack */}
      <div className="flex flex-col bg-white/95 backdrop-blur-xs border border-softborder rounded shadow-elevated overflow-hidden">
        <button
          onClick={onZoomIn}
          className="p-2 hover:bg-ivory-100 text-charcoal-muted hover:text-charcoal transition border-b border-softborder"
          title="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2 hover:bg-ivory-100 text-charcoal-muted hover:text-charcoal transition border-b border-softborder"
          title="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onRecenter}
          className="p-2 hover:bg-ivory-100 text-monsoon hover:text-monsoon-dark transition"
          title="Return to selected station"
        >
          <LocateFixed className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Layer Toggles Stack */}
      <div className="bg-white/95 backdrop-blur-xs border border-softborder rounded shadow-elevated p-2.5 text-xs space-y-1.5 min-w-[170px]">
        <div className="flex items-center gap-1.5 text-charcoal font-mono font-semibold text-[10px] uppercase tracking-wider pb-1.5 border-b border-softborder">
          <Layers className="w-3.5 h-3.5 text-monsoon" />
          <span>Layer Overlays</span>
        </div>

        <button
          onClick={() => onToggleLayer('hazardPolygons')}
          className="w-full flex items-center justify-between text-left py-1 text-charcoal-muted hover:text-charcoal transition text-[11px]"
        >
          <span className="font-medium">Hazard Polygons</span>
          {layers.hazardPolygons ? (
            <Eye className="w-3.5 h-3.5 text-terracotta" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-softborder" />
          )}
        </button>

        <button
          onClick={() => onToggleLayer('stations')}
          className="w-full flex items-center justify-between text-left py-1 text-charcoal-muted hover:text-charcoal transition text-[11px]"
        >
          <span className="font-medium">Telemetry Stations</span>
          {layers.stations ? (
            <Eye className="w-3.5 h-3.5 text-monsoon" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-softborder" />
          )}
        </button>

        <button
          onClick={() => onToggleLayer('radarSimulation')}
          className="w-full flex items-center justify-between text-left py-1 text-charcoal-muted hover:text-charcoal transition text-[11px]"
        >
          <span className="font-medium">Radar Hydrometeors</span>
          {layers.radarSimulation ? (
            <Eye className="w-3.5 h-3.5 text-ochre" />
          ) : (
            <EyeOff className="w-3.5 h-3.5 text-softborder" />
          )}
        </button>
      </div>
    </div>
  );
};

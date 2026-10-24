import React from 'react';
import { MapPin, Compass } from 'lucide-react';
import { LocationCoordinates } from '../../types/weather';
import { DataSourceType } from '../../types/api';
import { StatusBadge } from '../common/StatusBadge';
import { formatCoordinates } from '../../utils/locationUtils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  location: LocationCoordinates;
  dataSource?: DataSourceType;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  location,
  dataSource = 'mock',
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-softborder mb-6">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-charcoal">
            {title}
          </h1>
          <StatusBadge source={dataSource} />
        </div>
        {subtitle && (
          <p className="text-xs md:text-sm text-charcoal-muted max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-ivory-paper border border-softborder text-xs text-charcoal shadow-subtle">
          <MapPin className="w-3.5 h-3.5 text-monsoon shrink-0" />
          <span className="font-medium text-charcoal">{location.name}</span>
          <span className="text-charcoal-muted/40">|</span>
          <Compass className="w-3.5 h-3.5 text-charcoal-muted shrink-0" />
          <span className="font-mono text-charcoal-muted text-[11px]">
            {formatCoordinates(location.latitude, location.longitude)}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
};

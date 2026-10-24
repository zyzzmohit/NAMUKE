import React from 'react';
import { WeatherAlert, AlertFilterOptions } from '../../types/alert';
import { AlertCard } from './AlertCard';
import { AlertFilters } from './AlertFilters';
import { EmptyState } from '../common/EmptyState';

interface AlertListProps {
  alerts: WeatherAlert[];
  filteredAlerts: WeatherAlert[];
  filters: AlertFilterOptions;
  onFilterChange: (filters: AlertFilterOptions) => void;
}

export const AlertList: React.FC<AlertListProps> = ({
  alerts,
  filteredAlerts,
  filters,
  onFilterChange,
}) => {
  return (
    <div className="space-y-4">
      <AlertFilters
        filters={filters}
        onChange={onFilterChange}
        totalCount={alerts.length}
        filteredCount={filteredAlerts.length}
      />

      {filteredAlerts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matching Early Warnings"
          description="There are currently no active advisories or warnings matching your search criteria."
          actionText="Reset filters"
          onAction={() =>
            onFilterChange({
              severity: 'all',
              hazardType: 'all',
              searchQuery: '',
            })
          }
        />
      )}
    </div>
  );
};

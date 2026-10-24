import { RiskCategory } from '../types/risk';

export function getRiskCategory(score: number): RiskCategory {
  if (score < 25) return 'LOW';
  if (score < 50) return 'MODERATE';
  if (score < 75) return 'HIGH';
  return 'SEVERE';
}

export function getRiskLabel(category: RiskCategory): string {
  switch (category) {
    case 'LOW':
      return 'Low Risk';
    case 'MODERATE':
      return 'Moderate Risk';
    case 'HIGH':
      return 'High Risk';
    case 'SEVERE':
      return 'Severe Alert';
    default:
      return 'Unknown';
  }
}

export function getRiskColor(category: RiskCategory): {
  text: string;
  bg: string;
  border: string;
  hex: string;
  pill: string;
} {
  switch (category) {
    case 'LOW':
      return {
        text: 'text-monsoon',
        bg: 'bg-monsoon/10',
        border: 'border-monsoon/30',
        hex: '#526B59',
        pill: 'bg-monsoon/10 text-monsoon border border-monsoon/25',
      };
    case 'MODERATE':
      return {
        text: 'text-ochre',
        bg: 'bg-ochre/10',
        border: 'border-ochre/30',
        hex: '#A67C38',
        pill: 'bg-ochre/10 text-ochre border border-ochre/25',
      };
    case 'HIGH':
      return {
        text: 'text-terracotta',
        bg: 'bg-terracotta/10',
        border: 'border-terracotta/30',
        hex: '#B9684D',
        pill: 'bg-terracotta/10 text-terracotta border border-terracotta/25',
      };
    case 'SEVERE':
      return {
        text: 'text-crimson',
        bg: 'bg-crimson/10',
        border: 'border-crimson/35',
        hex: '#8E3935',
        pill: 'bg-crimson/15 text-crimson border border-crimson/35 font-medium',
      };
    default:
      return {
        text: 'text-charcoal-muted',
        bg: 'bg-ivory-200',
        border: 'border-ivory-border',
        hex: '#737975',
        pill: 'bg-ivory-200 text-charcoal-muted border border-ivory-border',
      };
  }
}

export function getHazardIconName(type: string): string {
  switch (type) {
    case 'thunderstorm':
      return 'CloudLightning';
    case 'heavy_rainfall':
      return 'CloudRain';
    case 'lightning':
      return 'Zap';
    case 'strong_winds':
      return 'Wind';
    case 'local_flooding':
      return 'Droplets';
    default:
      return 'AlertTriangle';
  }
}

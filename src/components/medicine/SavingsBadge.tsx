import React from 'react';
import { cn } from '@/lib/utils';
import { PriceCategory, ConfidenceLevel } from '@/types/medicine';
import { TrendingDown, Minus, TrendingUp, Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface SavingsBadgeProps {
  priceCategory: PriceCategory;
  relativePrice?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const priceConfig = {
  cheaper: {
    icon: TrendingDown,
    label: 'Cheaper',
    className: 'bg-success/10 text-success border-success/20',
  },
  moderate: {
    icon: Minus,
    label: 'Similar',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  higher: {
    icon: TrendingUp,
    label: 'Higher',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

const sizeConfig = {
  sm: 'text-xs px-2 py-1 gap-1',
  md: 'text-sm px-3 py-1.5 gap-1.5',
  lg: 'text-base px-4 py-2 gap-2',
};

export const SavingsBadge: React.FC<SavingsBadgeProps> = ({
  priceCategory,
  relativePrice,
  size = 'md',
  showLabel = true,
}) => {
  const config = priceConfig[priceCategory];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center rounded-full border font-semibold transition-all",
      config.className,
      sizeConfig[size]
    )}>
      <Icon className={cn(
        size === 'sm' && 'w-3 h-3',
        size === 'md' && 'w-4 h-4',
        size === 'lg' && 'w-5 h-5',
      )} />
      {showLabel && (
        <span>{relativePrice || config.label}</span>
      )}
    </div>
  );
};

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  size?: 'sm' | 'md';
}

const confidenceConfig = {
  high: {
    icon: ShieldCheck,
    label: 'High confidence',
    className: 'bg-success/10 text-success',
  },
  medium: {
    icon: Shield,
    label: 'Medium confidence',
    className: 'bg-warning/10 text-warning',
  },
  low: {
    icon: ShieldAlert,
    label: 'Low confidence',
    className: 'bg-muted text-muted-foreground',
  },
};

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ level, size = 'sm' }) => {
  const config = confidenceConfig[level];
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
      config.className
    )}>
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </div>
  );
};

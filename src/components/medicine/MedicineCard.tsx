import React from 'react';
import { Medicine } from '@/types/medicine';
import { SavingsBadge, ConfidenceBadge } from './SavingsBadge';
import { cn } from '@/lib/utils';
import { Pill, ChevronRight } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onClick?: () => void;
  showSavings?: boolean;
  isSelected?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onClick,
  showSavings = true,
  isSelected = false,
  variant = 'default',
}) => {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-2xl border-2 bg-card p-4 transition-all duration-200 cursor-pointer",
        "hover:border-primary/30 hover:shadow-md",
        isSelected && "border-primary shadow-primary",
        !isSelected && "border-border",
        isFeatured && "bg-gradient-card shadow-lg",
        isCompact && "p-3",
        "animate-fade-in"
      )}
    >
      {/* Top row: Name + Savings */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center rounded-xl",
            medicine.type === 'branded' 
              ? "bg-secondary text-secondary-foreground" 
              : "bg-primary/10 text-primary",
            isCompact ? "w-10 h-10" : "w-12 h-12"
          )}>
            <Pill className={isCompact ? "w-5 h-5" : "w-6 h-6"} />
          </div>
          <div>
            <h3 className={cn(
              "font-bold text-foreground",
              isCompact ? "text-base" : "text-lg"
            )}>
              {medicine.name}
            </h3>
            <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
          </div>
        </div>
        
        {showSavings && medicine.type === 'generic' && (
          <SavingsBadge 
            priceCategory={medicine.priceCategory} 
            relativePrice={medicine.relativePrice}
            size={isCompact ? 'sm' : 'md'}
          />
        )}
      </div>

      {/* Medicine details */}
      <div className={cn(
        "flex flex-wrap gap-2 mb-3",
        isCompact && "mb-2"
      )}>
        <span className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-lg">
          {medicine.activeIngredient}
        </span>
        <span className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-lg">
          {medicine.strength}
        </span>
        <span className="text-sm bg-muted text-muted-foreground px-2 py-1 rounded-lg capitalize">
          {medicine.dosageForm}
        </span>
      </div>

      {/* Bottom row: Pack size + Confidence */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{medicine.packSize}</span>
        {medicine.type === 'generic' && (
          <ConfidenceBadge level={medicine.confidenceLevel} />
        )}
        {onClick && (
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

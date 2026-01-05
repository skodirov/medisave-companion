import React, { useState } from 'react';
import { AIInsight, Medicine } from '@/types/medicine';
import { Sparkles, ChevronDown, ChevronUp, AlertTriangle, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SavingsBadge } from './SavingsBadge';

interface AIInsightCardProps {
  insight: AIInsight;
  generics?: Medicine[];
  onGenericClick?: (generic: Medicine) => void;
  className?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ 
  insight, 
  generics = [],
  onGenericClick,
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get top 3 cheaper alternatives
  const topAlternatives = generics
    .filter(g => g.priceCategory === 'cheaper' || g.priceCategory === 'moderate')
    .slice(0, 3);

  return (
    <div className={cn(
      "rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 overflow-hidden",
      className
    )}>
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide">
            AI Savings Insight
          </p>
          <p className="text-base font-bold text-foreground">{insight.summary}</p>
        </div>
      </div>

      {/* Savings highlight */}
      <div className="px-4 pb-4">
        <div className="bg-success/10 rounded-xl p-3 border border-success/20">
          <p className="text-sm font-medium text-success">{insight.savingsHighlight}</p>
        </div>
      </div>

      {/* Top Generic Suggestions */}
      {topAlternatives.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-4 h-4 text-primary" />
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
              Top Lower-Cost Options
            </p>
          </div>
          <div className="space-y-2">
            {topAlternatives.map((generic) => (
              <button
                key={generic.id}
                onClick={() => onGenericClick?.(generic)}
                className="w-full flex items-center justify-between p-3 bg-background/80 rounded-xl border border-border hover:border-primary/40 hover:bg-background transition-all text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">
                    {generic.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {generic.manufacturer} • {generic.strength}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  {generic.relativePrice && (
                    <span className="text-xs font-bold text-success whitespace-nowrap">
                      {generic.relativePrice}
                    </span>
                  )}
                  <SavingsBadge priceCategory={generic.priceCategory || 'moderate'} size="sm" showLabel={false} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expandable content */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 bg-primary/5 hover:bg-primary/10 transition-colors border-t border-primary/10"
      >
        <span className="text-sm font-medium text-primary">
          {isExpanded ? 'Show less' : 'Learn more about equivalence'}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-primary" />
        ) : (
          <ChevronDown className="w-4 h-4 text-primary" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-3 space-y-4 animate-fade-in">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2">How are they equivalent?</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {insight.equivalenceExplanation}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="flex gap-3 p-3 bg-warning/10 rounded-xl border border-warning/20">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <p className="text-xs text-warning/90 leading-relaxed">
              {insight.disclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

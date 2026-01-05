import React, { useState } from 'react';
import { AIInsight } from '@/types/medicine';
import { Sparkles, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AIInsightCardProps {
  insight: AIInsight;
  className?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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

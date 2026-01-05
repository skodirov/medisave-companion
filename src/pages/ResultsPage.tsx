import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { MedicineCard } from '@/components/medicine/MedicineCard';
import { AIInsightCard } from '@/components/medicine/AIInsightCard';
import { Button } from '@/components/ui/button';
import { getSearchResults } from '@/data/mockMedicines';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const ResultsPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();
  const result = brandId ? getSearchResults(brandId) : null;

  if (!result) {
    return (
      <MobileLayout>
        <div className="px-6 pt-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Medicine not found</h2>
            <p className="text-muted-foreground">Try searching for a different medicine.</p>
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="px-6 pt-6 pb-4">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>

        {/* Branded Medicine Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-muted-foreground mb-1">Searching alternatives for</p>
          <h1 className="text-2xl font-bold text-foreground">
            {result.branded.name} {result.branded.strength}
          </h1>
          <p className="text-muted-foreground">
            {result.branded.activeIngredient} • {result.branded.dosageForm}
          </p>
        </div>

        {/* AI Insight */}
        <AIInsightCard insight={result.aiInsight} className="mb-6" />

        {/* Generic Alternatives */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            {result.generics.length} Generic Alternative{result.generics.length !== 1 ? 's' : ''} Found
          </h2>
          <div className="space-y-3">
            {result.generics.map((generic, index) => (
              <div
                key={generic.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <MedicineCard
                  medicine={generic}
                  onClick={() => navigate(`/compare/${result.branded.id}/${generic.id}`)}
                  showSavings
                />
              </div>
            ))}
          </div>
        </div>

        {result.generics.length === 0 && (
          <div className="text-center py-12 bg-muted/50 rounded-2xl">
            <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">
              No generic alternatives found for this medicine.
            </p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default ResultsPage;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { MedicineCard } from '@/components/medicine/MedicineCard';
import { AIInsightCard } from '@/components/medicine/AIInsightCard';
import { SavingsBadge } from '@/components/medicine/SavingsBadge';
import { Button } from '@/components/ui/button';
import { getSearchResults, genericAlternatives } from '@/data/mockMedicines';
import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import { ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, Check } from 'lucide-react';
import { toast } from 'sonner';

const ComparePage: React.FC = () => {
  const { brandId, genericId } = useParams<{ brandId: string; genericId: string }>();
  const navigate = useNavigate();
  const { saveMedicine, removeSavedMedicine, findSavedMedicine, isSaved } = useSavedMedicines();

  const result = brandId ? getSearchResults(brandId) : null;
  const generic = genericId && brandId
    ? genericAlternatives[brandId]?.find(g => g.id === genericId)
    : null;

  if (!result || !generic) {
    return (
      <MobileLayout>
        <div className="px-6 pt-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <p className="text-center text-muted-foreground py-12">
            Comparison data not available.
          </p>
        </div>
      </MobileLayout>
    );
  }

  const isCurrentlySaved = isSaved(result.branded.id, generic.id);

  const handleSave = () => {
    if (isCurrentlySaved) {
      const savedEntry = findSavedMedicine(result.branded.id, generic.id);
      if (savedEntry) {
        removeSavedMedicine(savedEntry.id);
        toast.info('Removed from saved medicines');
      }
    } else {
      saveMedicine(result.branded, generic);
      toast.success('Saved to your list!');
    }
  };

  const comparisonPoints = [
    { label: 'Active Ingredient', branded: result.branded.activeIngredient, generic: generic.activeIngredient, match: true },
    { label: 'Strength', branded: result.branded.strength, generic: generic.strength, match: true },
    { label: 'Dosage Form', branded: result.branded.dosageForm, generic: generic.dosageForm, match: true },
    { label: 'Pack Size', branded: result.branded.packSize, generic: generic.packSize, match: result.branded.packSize === generic.packSize },
  ];

  return (
    <MobileLayout>
      <div className="px-6 pt-6 pb-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-foreground mb-2">
            Compare Medicines
          </h1>
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
            <SavingsBadge priceCategory={generic.priceCategory} relativePrice={generic.relativePrice} size="sm" />
          </div>
        </div>

        {/* VS Comparison */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 p-4 rounded-2xl bg-muted/50 border-2 border-border text-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Brand</p>
            <p className="font-bold text-foreground">{result.branded.name}</p>
            <p className="text-sm text-muted-foreground">{result.branded.manufacturer}</p>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground">
            <ArrowRight className="w-5 h-5" />
          </div>
          <div className="flex-1 p-4 rounded-2xl bg-success/10 border-2 border-success/20 text-center">
            <p className="text-xs text-success uppercase font-semibold mb-1">Generic</p>
            <p className="font-bold text-foreground">{generic.name}</p>
            <p className="text-sm text-muted-foreground">{generic.manufacturer}</p>
          </div>
        </div>

        {/* Comparison Points */}
        <div className="mb-6 rounded-2xl border-2 border-border overflow-hidden">
          {comparisonPoints.map((point, index) => (
            <div
              key={point.label}
              className={`flex items-center justify-between p-4 ${index < comparisonPoints.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase font-medium">{point.label}</p>
                <p className="text-sm text-foreground">{point.branded}</p>
              </div>
              <div className="flex items-center justify-center w-8">
                {point.match && (
                  <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                )}
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs text-muted-foreground uppercase font-medium">&nbsp;</p>
                <p className="text-sm text-foreground">{point.generic}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <AIInsightCard insight={result.aiInsight} className="mb-6" />

        {/* Save Button */}
        <Button
          variant={isCurrentlySaved ? "secondary" : "savings"}
          size="lg"
          className="w-full"
          onClick={handleSave}
        >
          {isCurrentlySaved ? (
            <>
              <BookmarkCheck className="w-5 h-5" />
              Saved to Your List
            </>
          ) : (
            <>
              <Bookmark className="w-5 h-5" />
              Save This Alternative
            </>
          )}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default ComparePage;

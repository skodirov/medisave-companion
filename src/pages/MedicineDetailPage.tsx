import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { AIInsightCard } from '@/components/medicine/AIInsightCard';
import { SavingsBadge, ConfidenceBadge } from '@/components/medicine/SavingsBadge';
import { Button } from '@/components/ui/button';
import { getSearchResults, genericAlternatives, brandedMedicines } from '@/data/mockMedicines';
import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import { ArrowLeft, Pill, Bookmark, BookmarkCheck, Building2, Package, Beaker } from 'lucide-react';
import { toast } from 'sonner';
import { Medicine } from '@/types/medicine';

const MedicineDetailPage: React.FC = () => {
  const { medicineId } = useParams<{ medicineId: string }>();
  const navigate = useNavigate();
  const { saveMedicine, isSaved } = useSavedMedicines();

  // Find the medicine (could be branded or generic)
  let medicine: Medicine | undefined;
  let brandedMedicine: Medicine | undefined;
  let aiInsight;

  // Check if it's a branded medicine
  const branded = brandedMedicines.find(m => m.id === medicineId);
  if (branded) {
    medicine = branded;
    brandedMedicine = branded;
    aiInsight = getSearchResults(branded.id)?.aiInsight;
  } else {
    // Search in generics
    for (const [brandId, generics] of Object.entries(genericAlternatives)) {
      const found = generics.find(g => g.id === medicineId);
      if (found) {
        medicine = found;
        brandedMedicine = brandedMedicines.find(b => b.id === brandId);
        aiInsight = getSearchResults(brandId)?.aiInsight;
        break;
      }
    }
  }

  if (!medicine) {
    return (
      <MobileLayout>
        <div className="px-6 pt-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <p className="text-center text-muted-foreground py-12">
            Medicine not found.
          </p>
        </div>
      </MobileLayout>
    );
  }

  const isGeneric = medicine.type === 'generic';
  const isCurrentlySaved = brandedMedicine && isGeneric 
    ? isSaved(brandedMedicine.id, medicine.id)
    : false;

  const handleSave = () => {
    if (brandedMedicine && isGeneric && !isCurrentlySaved) {
      saveMedicine(brandedMedicine, medicine);
      toast.success('Saved to your list!');
    }
  };

  const details = [
    { icon: Beaker, label: 'Active Ingredient', value: medicine.activeIngredient },
    { icon: Package, label: 'Strength', value: medicine.strength },
    { icon: Pill, label: 'Form', value: medicine.dosageForm },
    { icon: Building2, label: 'Manufacturer', value: medicine.manufacturer },
    { icon: Package, label: 'Pack Size', value: medicine.packSize },
  ];

  return (
    <MobileLayout>
      <div className="px-6 pt-6 pb-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 -ml-2">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Button>

        {/* Medicine Header */}
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
            isGeneric ? 'bg-primary/10' : 'bg-secondary'
          }`}>
            <Pill className={`w-8 h-8 ${isGeneric ? 'text-primary' : 'text-secondary-foreground'}`} />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">{medicine.name}</h1>
          <p className="text-muted-foreground mb-3">{medicine.manufacturer}</p>
          
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {isGeneric && (
              <>
                <SavingsBadge 
                  priceCategory={medicine.priceCategory} 
                  relativePrice={medicine.relativePrice}
                />
                <ConfidenceBadge level={medicine.confidenceLevel} />
              </>
            )}
            {!isGeneric && (
              <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full">
                Branded Medicine
              </span>
            )}
          </div>
        </div>

        {/* Medicine Details */}
        <div className="rounded-2xl border-2 border-border bg-card mb-6 overflow-hidden">
          {details.map((detail, index) => (
            <div
              key={detail.label}
              className={`flex items-center gap-4 p-4 ${
                index < details.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted">
                <detail.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">{detail.label}</p>
                <p className="font-semibold text-foreground capitalize">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight (for generics) */}
        {isGeneric && aiInsight && (
          <AIInsightCard insight={aiInsight} className="mb-6" />
        )}

        {/* Actions */}
        {isGeneric && brandedMedicine && (
          <div className="space-y-3">
            <Button
              variant={isCurrentlySaved ? "secondary" : "savings"}
              size="lg"
              className="w-full"
              onClick={handleSave}
              disabled={isCurrentlySaved}
            >
              {isCurrentlySaved ? (
                <>
                  <BookmarkCheck className="w-5 h-5" />
                  Already Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-5 h-5" />
                  Save This Alternative
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={() => navigate(`/compare/${brandedMedicine.id}/${medicine.id}`)}
            >
              Compare with Brand
            </Button>
          </div>
        )}

        {!isGeneric && (
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate(`/results/${medicine.id}`)}
          >
            Find Generic Alternatives
          </Button>
        )}
      </div>
    </MobileLayout>
  );
};

export default MedicineDetailPage;

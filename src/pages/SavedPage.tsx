import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import { SavingsBadge } from '@/components/medicine/SavingsBadge';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2, ArrowRight, Search } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const SavedPage: React.FC = () => {
  const navigate = useNavigate();
  const { savedMedicines, removeSavedMedicine } = useSavedMedicines();

  const handleRemove = (id: string) => {
    removeSavedMedicine(id);
    toast.info('Removed from saved medicines');
  };

  return (
    <MobileLayout>
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
            <Bookmark className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Saved</h1>
            <p className="text-muted-foreground">
              {savedMedicines.length} medicine{savedMedicines.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        {/* Saved Medicines List */}
        {savedMedicines.length > 0 ? (
          <div className="space-y-4">
            {savedMedicines.map((saved, index) => (
              <div
                key={saved.id}
                className="rounded-2xl border-2 border-border bg-card overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Card Content */}
                <div 
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => navigate(`/compare/${saved.brandedMedicine.id}/${saved.selectedGeneric.id}`)}
                >
                  {/* Brand → Generic */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-semibold text-foreground">
                      {saved.brandedMedicine.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-primary">
                      {saved.selectedGeneric.name}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-muted-foreground">
                        {saved.selectedGeneric.activeIngredient} • {saved.selectedGeneric.strength}
                      </span>
                    </div>
                    <SavingsBadge 
                      priceCategory={saved.selectedGeneric.priceCategory}
                      relativePrice={saved.selectedGeneric.relativePrice}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Saved {format(saved.savedAt, 'MMM d, yyyy')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(saved.id);
                    }}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No saved medicines yet
            </h2>
            <p className="text-muted-foreground mb-6">
              Search for branded medicines and save your favorite generic alternatives.
            </p>
            <Button onClick={() => navigate('/search')}>
              <Search className="w-4 h-4" />
              Start Searching
            </Button>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default SavedPage;

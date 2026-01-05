import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/layout/MobileLayout';
import { SearchBar } from '@/components/medicine/SearchBar';
import { MedicineCard } from '@/components/medicine/MedicineCard';
import { Medicine } from '@/types/medicine';
import { brandedMedicines } from '@/data/mockMedicines';
import { Pill, TrendingUp } from 'lucide-react';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [recentSearches] = useState<Medicine[]>(brandedMedicines.slice(0, 3));

  const handleSelect = (medicine: Medicine) => {
    navigate(`/results/${medicine.id}`);
  };

  return (
    <MobileLayout>
      <div className="px-6 pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Search Medicine
          </h1>
          <p className="text-muted-foreground">
            Enter a branded medicine name to find generic alternatives
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSelect={handleSelect} autoFocus />
        </div>

        {/* Popular Searches */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Popular Searches
            </h2>
          </div>
          <div className="space-y-3">
            {recentSearches.map((medicine, index) => (
              <div
                key={medicine.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MedicineCard
                  medicine={medicine}
                  onClick={() => handleSelect(medicine)}
                  showSavings={false}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Tip Card */}
        <div className="rounded-2xl bg-secondary p-4 border-2 border-border">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
              <Pill className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Pro Tip</h3>
              <p className="text-sm text-muted-foreground">
                Search by brand name or active ingredient to find the best generic matches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SearchPage;

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Medicine } from '@/types/medicine';
import { searchBrandedMedicines } from '@/data/mockMedicines';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSelect: (medicine: Medicine) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  placeholder = "Search branded medicine...",
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Medicine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const matches = searchBrandedMedicines(query);
      setResults(matches);
      setIsOpen(matches.length > 0);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const handleSelect = (medicine: Medicine) => {
    setQuery('');
    setIsOpen(false);
    onSelect(medicine);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-12 pr-12"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border-2 border-border shadow-lg overflow-hidden z-50 animate-slide-up">
          {results.map((medicine) => (
            <button
              key={medicine.id}
              onClick={() => handleSelect(medicine)}
              className={cn(
                "w-full flex items-center gap-3 p-4 text-left transition-colors",
                "hover:bg-secondary border-b border-border last:border-b-0"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <span className="text-lg font-bold text-secondary-foreground">
                  {medicine.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{medicine.name}</p>
                <p className="text-sm text-muted-foreground">
                  {medicine.activeIngredient} • {medicine.strength}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

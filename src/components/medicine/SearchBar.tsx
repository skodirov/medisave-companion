import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const MAX_QUERY_LENGTH = 100;
const sanitizeQuery = (input: string): string => {
  return input.slice(0, MAX_QUERY_LENGTH).replace(/[<>]/g, '');
};

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  placeholder = "Search branded medicine...",
  autoFocus = false,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Medicine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sanitized = sanitizeQuery(query);
    if (sanitized.length >= 2) {
      const matches = searchBrandedMedicines(sanitized);
      setResults(matches);
      setIsOpen(matches.length > 0);
      setHighlightedIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = useCallback((medicine: Medicine) => {
    setQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect(medicine);
  }, [onSelect]);

  const handleClear = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  }, [isOpen, results, highlightedIndex, handleSelect]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-12 pr-12"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="search-results"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {isOpen && (
        <ul
          id="search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border-2 border-border shadow-lg overflow-hidden z-50 animate-slide-up"
        >
          {results.map((medicine, index) => (
            <li key={medicine.id} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                onClick={() => handleSelect(medicine)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 text-left transition-colors",
                  "border-b border-border last:border-b-0",
                  index === highlightedIndex ? "bg-secondary" : "hover:bg-secondary"
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SavedMedicine, Medicine } from '@/types/medicine';

const STORAGE_KEY = 'medisave_saved_medicines';

interface StoredSavedMedicine {
  id: string;
  brandedMedicine: Medicine;
  selectedGeneric: Medicine;
  savedAt: string;
}

const isValidStoredMedicine = (item: unknown): item is StoredSavedMedicine => {
  if (typeof item !== 'object' || item === null) return false;
  const obj = item as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.brandedMedicine === 'object' &&
    typeof obj.selectedGeneric === 'object' &&
    typeof obj.savedAt === 'string'
  );
};

const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

const loadFromStorage = (): SavedMedicine[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    
    return parsed
      .filter(isValidStoredMedicine)
      .map((item) => ({
        ...item,
        savedAt: new Date(item.savedAt),
      }))
      .filter((item) => isValidDate(item.savedAt));
  } catch (e) {
    console.error('Failed to parse saved medicines:', e);
    return [];
  }
};

export const useSavedMedicines = () => {
  const [savedMedicines, setSavedMedicines] = useState<SavedMedicine[]>(() => loadFromStorage());

  // Sync with localStorage on mount and when other tabs update
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setSavedMedicines(loadFromStorage());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveMedicine = useCallback((brandedMedicine: Medicine, selectedGeneric: Medicine) => {
    const newSaved: SavedMedicine = {
      id: `${brandedMedicine.id}-${selectedGeneric.id}-${Date.now()}`,
      brandedMedicine,
      selectedGeneric,
      savedAt: new Date(),
    };

    setSavedMedicines((prev) => {
      // Prevent duplicates
      const exists = prev.some(
        (m) => m.brandedMedicine.id === brandedMedicine.id && m.selectedGeneric.id === selectedGeneric.id
      );
      if (exists) return prev;
      
      const updated = [...prev, newSaved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    
    return newSaved;
  }, []);

  const removeSavedMedicine = useCallback((id: string) => {
    setSavedMedicines((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const findSavedMedicine = useCallback((brandedId: string, genericId: string) => {
    return savedMedicines.find(
      (m) => m.brandedMedicine.id === brandedId && m.selectedGeneric.id === genericId
    );
  }, [savedMedicines]);

  const isSaved = useCallback((brandedId: string, genericId: string) => {
    return savedMedicines.some(
      (m) => m.brandedMedicine.id === brandedId && m.selectedGeneric.id === genericId
    );
  }, [savedMedicines]);

  return useMemo(() => ({
    savedMedicines,
    saveMedicine,
    removeSavedMedicine,
    findSavedMedicine,
    isSaved,
  }), [savedMedicines, saveMedicine, removeSavedMedicine, findSavedMedicine, isSaved]);
};

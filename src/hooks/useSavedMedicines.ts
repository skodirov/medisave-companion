import { useState, useEffect, useCallback, useMemo } from 'react';
import { SavedMedicine, Medicine } from '@/types/medicine';

const STORAGE_KEY = 'medisave_saved_medicines';
const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isValidMedicine = (value: unknown): value is Medicine => {
  if (!isRecord(value)) return false;
  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.manufacturer === 'string' &&
    typeof obj.activeIngredient === 'string' &&
    typeof obj.strength === 'string' &&
    typeof obj.dosageForm === 'string' &&
    typeof obj.type === 'string' &&
    typeof obj.priceCategory === 'string' &&
    typeof obj.confidenceLevel === 'string' &&
    typeof obj.packSize === 'string' &&
    typeof obj.relativePrice === 'string'
  );
};

const writeToStorage = (items: SavedMedicine[]) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to persist saved medicines to localStorage:', e);
  }
};


interface StoredSavedMedicine {
  id: string;
  brandedMedicine: Medicine;
  selectedGeneric: Medicine;
  savedAt: string;
}

const isValidStoredMedicine = (item: unknown): item is StoredSavedMedicine => {
  if (!isRecord(item)) return false;
  const obj = item as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.savedAt === 'string' &&
    isValidMedicine(obj.brandedMedicine) &&
    isValidMedicine(obj.selectedGeneric)
  );
};


const isValidDate = (date: Date): boolean => {
  return date instanceof Date && !isNaN(date.getTime());
};

const loadFromStorage = (): SavedMedicine[] => {
  try {
    const storage = getStorage();
if (!storage) return [];

const stored = storage.getItem(STORAGE_KEY);
    
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
      writeToStorage(updated);
      return updated;
    });
    
    return newSaved;
  }, []);

  const removeSavedMedicine = useCallback((id: string) => {
    setSavedMedicines((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      writeToStorage(updated);
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

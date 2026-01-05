import { useState, useEffect } from 'react';
import { SavedMedicine, Medicine } from '@/types/medicine';

const STORAGE_KEY = 'medisave_saved_medicines';

export const useSavedMedicines = () => {
  const [savedMedicines, setSavedMedicines] = useState<SavedMedicine[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedMedicines(parsed.map((item: any) => ({
          ...item,
          savedAt: new Date(item.savedAt),
        })));
      } catch (e) {
        console.error('Failed to parse saved medicines:', e);
      }
    }
  }, []);

  const saveMedicine = (brandedMedicine: Medicine, selectedGeneric: Medicine) => {
    const newSaved: SavedMedicine = {
      id: `${brandedMedicine.id}-${selectedGeneric.id}-${Date.now()}`,
      brandedMedicine,
      selectedGeneric,
      savedAt: new Date(),
    };

    const updated = [...savedMedicines, newSaved];
    setSavedMedicines(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newSaved;
  };

  const removeSavedMedicine = (id: string) => {
    const updated = savedMedicines.filter((m) => m.id !== id);
    setSavedMedicines(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isSaved = (brandedId: string, genericId: string) => {
    return savedMedicines.some(
      (m) => m.brandedMedicine.id === brandedId && m.selectedGeneric.id === genericId
    );
  };

  return {
    savedMedicines,
    saveMedicine,
    removeSavedMedicine,
    isSaved,
  };
};

export type PriceCategory = 'cheaper' | 'moderate' | 'higher';
export type ConfidenceLevel = 'high' | 'medium' | 'low';
export type MedicineType = 'branded' | 'generic';
export type DosageForm = 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'drops';

export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  activeIngredient: string;
  strength: string;
  dosageForm: DosageForm;
  type: MedicineType;
  priceCategory: PriceCategory;
  confidenceLevel: ConfidenceLevel;
  packSize: string;
  relativePrice: string; // e.g., "~60% less", "Similar", "~20% more"
}

export interface SavedMedicine {
  id: string;
  brandedMedicine: Medicine;
  selectedGeneric: Medicine;
  savedAt: Date;
}

export interface AIInsight {
  summary: string;
  equivalenceExplanation: string;
  savingsHighlight: string;
  disclaimer: string;
}

export interface SearchResult {
  branded: Medicine;
  generics: Medicine[];
  aiInsight: AIInsight;
}

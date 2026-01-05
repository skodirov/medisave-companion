import { Medicine, AIInsight, SearchResult } from '@/types/medicine';

export const brandedMedicines: Medicine[] = [
  {
    id: 'lipitor-20',
    name: 'Lipitor',
    manufacturer: 'Pfizer',
    activeIngredient: 'Atorvastatin',
    strength: '20mg',
    dosageForm: 'tablet',
    type: 'branded',
    priceCategory: 'higher',
    confidenceLevel: 'high',
    packSize: '30 tablets',
    relativePrice: 'Reference price',
  },
  {
    id: 'zoloft-50',
    name: 'Zoloft',
    manufacturer: 'Pfizer',
    activeIngredient: 'Sertraline',
    strength: '50mg',
    dosageForm: 'tablet',
    type: 'branded',
    priceCategory: 'higher',
    confidenceLevel: 'high',
    packSize: '30 tablets',
    relativePrice: 'Reference price',
  },
  {
    id: 'nexium-40',
    name: 'Nexium',
    manufacturer: 'AstraZeneca',
    activeIngredient: 'Esomeprazole',
    strength: '40mg',
    dosageForm: 'capsule',
    type: 'branded',
    priceCategory: 'higher',
    confidenceLevel: 'high',
    packSize: '28 capsules',
    relativePrice: 'Reference price',
  },
  {
    id: 'advair-250',
    name: 'Advair',
    manufacturer: 'GSK',
    activeIngredient: 'Fluticasone/Salmeterol',
    strength: '250/50mcg',
    dosageForm: 'capsule',
    type: 'branded',
    priceCategory: 'higher',
    confidenceLevel: 'high',
    packSize: '60 doses',
    relativePrice: 'Reference price',
  },
];

export const genericAlternatives: Record<string, Medicine[]> = {
  'lipitor-20': [
    {
      id: 'atorvastatin-teva-20',
      name: 'Atorvastatin',
      manufacturer: 'Teva',
      activeIngredient: 'Atorvastatin',
      strength: '20mg',
      dosageForm: 'tablet',
      type: 'generic',
      priceCategory: 'cheaper',
      confidenceLevel: 'high',
      packSize: '30 tablets',
      relativePrice: '~85% less',
    },
    {
      id: 'atorvastatin-sandoz-20',
      name: 'Atorvastatin',
      manufacturer: 'Sandoz',
      activeIngredient: 'Atorvastatin',
      strength: '20mg',
      dosageForm: 'tablet',
      type: 'generic',
      priceCategory: 'cheaper',
      confidenceLevel: 'high',
      packSize: '30 tablets',
      relativePrice: '~80% less',
    },
    {
      id: 'atorvastatin-mylan-20',
      name: 'Atorvastatin',
      manufacturer: 'Mylan',
      activeIngredient: 'Atorvastatin',
      strength: '20mg',
      dosageForm: 'tablet',
      type: 'generic',
      priceCategory: 'cheaper',
      confidenceLevel: 'high',
      packSize: '30 tablets',
      relativePrice: '~75% less',
    },
  ],
  'zoloft-50': [
    {
      id: 'sertraline-teva-50',
      name: 'Sertraline',
      manufacturer: 'Teva',
      activeIngredient: 'Sertraline',
      strength: '50mg',
      dosageForm: 'tablet',
      type: 'generic',
      priceCategory: 'cheaper',
      confidenceLevel: 'high',
      packSize: '30 tablets',
      relativePrice: '~90% less',
    },
    {
      id: 'sertraline-lupin-50',
      name: 'Sertraline',
      manufacturer: 'Lupin',
      activeIngredient: 'Sertraline',
      strength: '50mg',
      dosageForm: 'tablet',
      type: 'generic',
      priceCategory: 'cheaper',
      confidenceLevel: 'high',
      packSize: '30 tablets',
      relativePrice: '~88% less',
    },
  ],
  'nexium-40': [
    {
      id: 'esomeprazole-dr-reddy-40',
      name: 'Esomeprazole',
      manufacturer: "Dr. Reddy's",
      activeIngredient: 'Esomeprazole',
      strength: '40mg',
      dosageForm: 'capsule',
      type: 'generic',
      priceCategory: 'cheaper',
      confidenceLevel: 'high',
      packSize: '28 capsules',
      relativePrice: '~70% less',
    },
    {
      id: 'esomeprazole-apotex-40',
      name: 'Esomeprazole',
      manufacturer: 'Apotex',
      activeIngredient: 'Esomeprazole',
      strength: '40mg',
      dosageForm: 'capsule',
      type: 'generic',
      priceCategory: 'cheaper',
      confidenceLevel: 'high',
      packSize: '28 capsules',
      relativePrice: '~65% less',
    },
  ],
  'advair-250': [
    {
      id: 'wixela-mylan-250',
      name: 'Wixela Inhub',
      manufacturer: 'Mylan',
      activeIngredient: 'Fluticasone/Salmeterol',
      strength: '250/50mcg',
      dosageForm: 'capsule',
      type: 'generic',
      priceCategory: 'moderate',
      confidenceLevel: 'high',
      packSize: '60 doses',
      relativePrice: '~50% less',
    },
  ],
};

export const aiInsights: Record<string, AIInsight> = {
  'lipitor-20': {
    summary: 'Excellent savings opportunity available',
    equivalenceExplanation: 'Generic atorvastatin contains the same active ingredient as Lipitor at identical strength (20mg) in the same tablet form. Both are FDA-approved to deliver equivalent therapeutic effects.',
    savingsHighlight: 'Generic alternatives typically cost 75-85% less than the brand-name version for the same medication.',
    disclaimer: 'Always confirm any medication switch with your pharmacist or doctor before making changes to your prescription.',
  },
  'zoloft-50': {
    summary: 'Significant savings potential',
    equivalenceExplanation: 'Generic sertraline matches Zoloft exactly in active ingredient (sertraline), strength (50mg), and dosage form (tablet). FDA bioequivalence standards ensure they work the same way.',
    savingsHighlight: 'You may save approximately 88-90% by choosing a generic alternative.',
    disclaimer: 'Please consult your healthcare provider before switching medications, especially for mental health treatments.',
  },
  'nexium-40': {
    summary: 'Good savings available',
    equivalenceExplanation: 'Generic esomeprazole provides the same active ingredient as Nexium at 40mg strength in capsule form. The therapeutic effect is equivalent per FDA standards.',
    savingsHighlight: 'Generic options typically offer 65-70% savings compared to the brand.',
    disclaimer: 'Confirm with your pharmacist that the generic is appropriate for your specific condition.',
  },
  'advair-250': {
    summary: 'Moderate savings possible',
    equivalenceExplanation: 'Wixela Inhub is an authorized generic containing the same combination of fluticasone and salmeterol at matching strengths (250/50mcg).',
    savingsHighlight: 'The authorized generic may cost about 50% less than the brand-name inhaler.',
    disclaimer: 'Inhaler technique matters. Ask your pharmacist to ensure the generic device works similarly for you.',
  },
};

export const getSearchResults = (brandId: string): SearchResult | null => {
  const branded = brandedMedicines.find(m => m.id === brandId);
  if (!branded) return null;
  
  return {
    branded,
    generics: genericAlternatives[brandId] || [],
    aiInsight: aiInsights[brandId] || {
      summary: 'Checking for alternatives...',
      equivalenceExplanation: 'Analysis in progress.',
      savingsHighlight: 'Calculating potential savings.',
      disclaimer: 'Always consult a healthcare professional.',
    },
  };
};

export const searchBrandedMedicines = (query: string): Medicine[] => {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return brandedMedicines.filter(
    m => m.name.toLowerCase().includes(lowerQuery) ||
         m.activeIngredient.toLowerCase().includes(lowerQuery)
  );
};

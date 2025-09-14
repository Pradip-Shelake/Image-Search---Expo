import { Drug, Category } from '@/types';

export const drugs: Drug[] = [
  {
    id: '1',
    name: 'Delictase',
    dosage: '30 mg',
    form: 'Capsule',
    category: 'UPP',
    description: 'Used for digestive disorders',
    suitableFor: ['adults', 'children'],
    icon: '💊',
    color: '#4CAF50'
  },
  {
    id: '2',
    name: 'Loriago',
    dosage: '250 mg',
    form: 'Tablets',
    category: 'OTC',
    description: 'Pain relief medication',
    suitableFor: ['adults'],
    icon: '🟠',
    color: '#FF9800'
  },
  {
    id: '3',
    name: 'Nemocid',
    dosage: '250 mg/5ml',
    form: 'Oral Suspension',
    category: 'OTC',
    description: 'Antiparasitic medication',
    suitableFor: ['children', 'adults'],
    icon: '🛡️',
    color: '#2196F3'
  },
  {
    id: '4',
    name: 'Multivitamin (Vitifect Syrup)',
    dosage: 'Combination',
    form: 'Syrup',
    category: 'UPP',
    description: 'Daily vitamin supplement',
    suitableFor: ['children', 'adults', 'pregnancy'],
    icon: '🛡️',
    color: '#2196F3'
  },
  {
    id: '5',
    name: 'O.R.S Soluble tablets black currant',
    dosage: '176 mg',
    form: 'Dispersible Tablets',
    category: 'OTC',
    description: 'Oral rehydration solution',
    suitableFor: ['children', 'adults'],
    icon: '🟠',
    color: '#FF9800'
  },
  {
    id: '6',
    name: 'Botlor',
    dosage: '2.5 mg/5ml',
    form: 'Syrup',
    category: 'UPP',
    description: 'Respiratory medication',
    suitableFor: ['children', 'adults'],
    icon: '🛡️',
    color: '#2196F3'
  },
  {
    id: '7',
    name: 'Cabenuva',
    dosage: '200 mg/ml',
    form: 'Suspension for injection',
    category: 'UPP',
    description: 'HIV treatment',
    suitableFor: ['adults'],
    icon: '💉',
    color: '#9C27B0'
  },
  {
    id: '8',
    name: 'Tivicay',
    dosage: '50 mg',
    form: 'Tablets',
    category: 'UPP',
    description: 'HIV treatment',
    suitableFor: ['adults'],
    icon: '🟠',
    color: '#FF9800'
  },
  {
    id: '9',
    name: 'Vimpat',
    dosage: '10 mg/ml',
    form: 'Syrup',
    category: 'UPP',
    description: 'Epilepsy medication',
    suitableFor: ['adults', 'children'],
    icon: '🛡️',
    color: '#2196F3'
  },
  {
    id: '10',
    name: 'Tazocin',
    dosage: '2 g,0.25 g',
    form: 'Powder For Solution',
    category: 'UPP',
    description: 'Antibiotic injection',
    suitableFor: ['adults'],
    icon: '💉',
    color: '#9C27B0'
  },
  {
    id: '11',
    name: 'Influvac Tetra',
    dosage: '15 mcg/0.5ml',
    form: 'Solution for injection',
    category: 'UPP',
    description: 'Influenza vaccine',
    suitableFor: ['adults', 'children'],
    icon: '💉',
    color: '#9C27B0'
  },
  {
    id: '12',
    name: 'Maxigesic',
    dosage: '150 mg',
    form: 'Tablets',
    category: 'UPP',
    description: 'Pain relief combination',
    suitableFor: ['adults'],
    icon: '🟠',
    color: '#FF9800'
  },
  {
    id: '13',
    name: 'Parasustain',
    dosage: '665mg',
    form: 'Tablet',
    category: 'UPP',
    description: 'Extended release paracetamol',
    suitableFor: ['adults'],
    icon: '🟠',
    color: '#FF9800'
  },
  {
    id: '14',
    name: 'ACT-HIB VACCINE',
    dosage: '10mcg',
    form: 'Solution for Injection',
    category: 'UPP',
    description: 'Haemophilus influenzae type b vaccine',
    suitableFor: ['children'],
    icon: '💉',
    color: '#9C27B0'
  }
];

export const categories: Category[] = [
  {
    id: 'upp',
    title: 'List of UPP Drugs',
    subtitle: 'A list of trusted medicines used in hospitals and clinics',
    icon: '💊',
    color: '#E3F2FD',
    drugs: drugs.filter(drug => drug.category === 'UPP')
  },
  {
    id: 'otc',
    title: 'List of OTC Drugs',
    subtitle: 'A list of trusted medicines used in hospitals and clinics',
    icon: '🏥',
    color: '#FFF3E0',
    drugs: drugs.filter(drug => drug.category === 'OTC')
  }
];

export const suggestions = [
  'Over the counter drugs',
  'Safe for children',
  'Pregnancy safe',
  'Halal certified'
];

export function searchDrugs(query: string): Drug[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  return drugs.filter(drug => 
    drug.name.toLowerCase().includes(lowerQuery) ||
    drug.description.toLowerCase().includes(lowerQuery) ||
    drug.suitableFor.some(s => s.toLowerCase().includes(lowerQuery))
  );
}

export function getDrugsByCategory(category: string): Drug[] {
  switch (category.toLowerCase()) {
    case 'safe for children':
      return drugs.filter(drug => drug.suitableFor.includes('children'));
    case 'pregnancy safe':
      return drugs.filter(drug => drug.suitableFor.includes('pregnancy'));
    case 'over the counter drugs':
      return drugs.filter(drug => drug.category === 'OTC');
    case 'halal certified':
      return drugs.filter(drug => drug.category === 'UPP');
    default:
      return drugs;
  }
}

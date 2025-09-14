export interface Drug {
  id: string;
  name: string;
  genericName?: string;
  dosage: string;
  form: string;
  category: 'UPP' | 'OTC';
  description: string;
  suitableFor: string[];
  icon: string;
  color: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface SearchResult {
  drug: Drug;
  confidence: number;
  image: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  drugs: Drug[];
}

export type RootStackParamList = {
  '(tabs)': undefined;
  search: undefined;
  'search-results': { image: string; results: SearchResult[] };
  'image-preview': { image: string };
  'drug-list': { category: string; drugs: Drug[] };
};

export type TabParamList = {
  index: undefined;
  prescription: undefined;
};

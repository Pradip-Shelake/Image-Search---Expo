import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Drug, SearchResult } from '@/types';

interface AppContextType {
  user: User;
  searchResults: SearchResult[];
  recentSearches: string[];
  favoritesDrugs: Drug[];
  setSearchResults: (results: SearchResult[]) => void;
  addRecentSearch: (query: string) => void;
  toggleFavorite: (drug: Drug) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockUser: User = {
  id: '1',
  name: 'Pradip Shelake',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
};

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favoritesDrugs, setFavoritesDrugs] = useState<Drug[]>([]);

  const addRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev].slice(0, 5));
    }
  };

  const toggleFavorite = (drug: Drug) => {
    setFavoritesDrugs(prev => {
      const exists = prev.find(d => d.id === drug.id);
      if (exists) {
        return prev.filter(d => d.id !== drug.id);
      }
      return [...prev, drug];
    });
  };

  return (
    <AppContext.Provider
      value={{
        user: mockUser,
        searchResults,
        recentSearches,
        favoritesDrugs,
        setSearchResults,
        addRecentSearch,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  FlatList 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Drug } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DrugListScreen() {
  const { category, drugs: drugsParam } = useLocalSearchParams<{ 
    category: string; 
    drugs: string; 
  }>();

  const drugs: Drug[] = drugsParam ? JSON.parse(drugsParam) : [];
  const [activeFilter, setActiveFilter] = useState('All');

  const handleBack = () => {
    router.back();
  };

  const renderDrugItem = ({ item }: { item: Drug }) => (
    <View style={styles.drugCard}>
      <View style={styles.drugContent}>
        <View style={[styles.drugIconContainer, { backgroundColor: item.color + '20' }]}>
          <Text style={styles.drugIcon}>{item.icon}</Text>
        </View>
        <View style={styles.drugInfo}>
          <Text style={styles.drugName}>{item.name}</Text>
          <Text style={styles.drugDosage}>
            {item.dosage} · {item.form}
          </Text>
        </View>
        {item.category === 'UPP' && (
          <View style={styles.uppBadge}>
            <Text style={styles.uppBadgeText}>UPP</Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Drugs</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <Text style={styles.searchText}>{category}</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, activeFilter === 'All' && styles.activeFilter]}
          onPress={() => setActiveFilter('All')}
        >
          <Text style={[styles.filterText, activeFilter === 'All' && styles.activeFilterText]}>
            All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={drugs}
        renderItem={renderDrugItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  filterButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    backgroundColor: 'white',
  },
  activeFilter: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  drugCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  drugContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drugIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  drugIcon: {
    fontSize: 24,
  },
  drugInfo: {
    flex: 1,
  },
  drugName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  drugDosage: {
    fontSize: 14,
    color: '#666',
  },
  uppBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  uppBadgeText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '600',
  },
});

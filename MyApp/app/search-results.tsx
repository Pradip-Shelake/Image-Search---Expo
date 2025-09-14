import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ScrollView 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SearchResult } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchResultsScreen() {
  const { image, results } = useLocalSearchParams<{ 
    image: string; 
    results: string; 
  }>();

  const searchResults: SearchResult[] = results ? JSON.parse(results) : [];
  const mainResult = searchResults[0];

  const handleBack = () => {
    router.back();
  };

  const handleReUpload = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Search results</Text>
      </View>

      <ScrollView style={styles.content}>
        {image && (
          <View style={styles.imageSection}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity style={styles.reUploadButton} onPress={handleReUpload}>
                <Text style={styles.reUploadText}>Re-upload</Text>
                <Ionicons name="refresh" size={16} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {mainResult && (
          <View style={styles.resultSection}>
            <View style={styles.drugCard}>
              <View style={styles.drugIconContainer}>
                <Text style={styles.drugIcon}>{mainResult.drug.icon}</Text>
              </View>
              <View style={styles.drugInfo}>
                <Text style={styles.drugName}>{mainResult.drug.name}</Text>
                <Text style={styles.drugDosage}>
                  {mainResult.drug.dosage} · {mainResult.drug.form}
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  imageSection: {
    marginBottom: 24,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#e9ecef',
  },
  reUploadButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  reUploadText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  resultSection: {
    flex: 1,
  },
  drugCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  drugIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3e5f5',
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
});

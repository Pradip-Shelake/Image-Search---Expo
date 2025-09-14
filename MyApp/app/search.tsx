import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { suggestions, searchDrugs, getDrugsByCategory } from '@/data/drugs';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => {
    router.back();
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    const results = searchDrugs(query);
    if (results.length > 0) {
      router.push({
        pathname: '/drug-list',
        params: { 
          category: `Search results for "${query}"`,
          drugs: JSON.stringify(results)
        }
      });
    } else {
      Alert.alert('No Results', 'No drugs found matching your search.');
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    const results = getDrugsByCategory(suggestion);
    router.push({
      pathname: '/drug-list',
      params: { 
        category: suggestion,
        drugs: JSON.stringify(results)
      }
    });
  };

  const handleUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant photo library access to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      router.push({
        pathname: '/image-preview',
        params: { image: result.assets[0].uri }
      });
    }
  };

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
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Drug name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          returnKeyType="search"
          autoFocus
        />
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Ionicons name="camera" size={20} color="#666" />
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <View style={styles.suggestionsContainer}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionChip}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  suggestionChip: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  suggestionText: {
    fontSize: 14,
    color: '#666',
  },
});

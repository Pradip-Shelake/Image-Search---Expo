import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions 
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { drugs } from '@/data/drugs';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

export default function ImagePreviewScreen() {
  const { image } = useLocalSearchParams<{ image: string }>();

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    const mockResult = {
      drug: drugs[13], // ACT-HIB VACCINE as shown in your design
      confidence: 0.95,
      image: image || ''
    };

    router.replace({
      pathname: '/search-results',
      params: { 
        image: image || '',
        results: JSON.stringify([mockResult])
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Image preview</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.homeIndicator} />
      </View>
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
    paddingTop: 40,
    justifyContent: 'center',
  },
  imageContainer: {
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
    height: width * 1.2,
    backgroundColor: '#e9ecef',
  },
  placeholderImage: {
    width: '100%',
    height: width * 1.2,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  continueButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 3,
    alignSelf: 'center',
  },
});

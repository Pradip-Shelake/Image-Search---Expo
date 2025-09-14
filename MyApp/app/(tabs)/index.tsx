import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';
import { categories } from '@/data/drugs';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  const { user } = useApp();

  const handleSearch = () => {
    router.push('/search');
  };

  const handleCategoryPress = (category: any) => {
    router.push({
      pathname: '/drug-list',
      params: { 
        category: category.title,
        drugs: JSON.stringify(category.drugs)
      }
    });
  };

  const handleUpload = () => {
    router.push('/search');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <View style={styles.logoBar1} />
                <View style={styles.logoBar2} />
                <View style={styles.logoBar3} />
              </View>
            </View>
            <View>
              <Text style={styles.greeting}>Good Morning!</Text>
              <Text style={styles.userName}>{user.name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Image 
              source={{ uri: user.avatar }} 
              style={styles.avatarImage}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchContainer} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#666" />
          <Text style={styles.searchPlaceholder}>Search by Drug name</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Ionicons name="image" size={20} color="#666" />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: category.color }]}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={styles.categoryContent}>
                <View style={styles.categoryText}>
                  <Text style={styles.categoryTitle}>{category.title}</Text>
                  <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                </View>
                <View style={styles.categoryIcon}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                  <View style={styles.pillsContainer}>
                    <View style={styles.pill1} />
                    <View style={styles.pill2} />
                  </View>
                </View>
              </View>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    marginRight: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoBar1: {
    width: 4,
    height: 20,
    backgroundColor: '#2196F3',
    marginRight: 2,
  },
  logoBar2: {
    width: 4,
    height: 24,
    backgroundColor: '#1976D2',
    marginRight: 2,
  },
  logoBar3: {
    width: 4,
    height: 16,
    backgroundColor: '#64B5F6',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    color: '#666',
    fontSize: 16,
  },
  uploadButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  categoriesContainer: {
    gap: 16,
    paddingBottom: 120,
  },
  categoryCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  categoryIcon: {
    alignItems: 'center',
    position: 'relative',
  },
  categoryEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  pill1: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFB74D',
  },
  pill2: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#81C784',
    marginTop: 2,
  },
});

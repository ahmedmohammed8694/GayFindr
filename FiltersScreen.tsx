import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import RangeSlider from '../components/RangeSlider';

export default function FiltersScreen({ navigation }) {
  const [filters, setFilters] = useState({
    distance: 5000, // meters
    ageRange: [18, 50],
    onlineOnly: false,
    recentlyActive: true,
    travelMode: false,
  });

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleApply = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Apply filters to API
    navigation.goBack();
  };

  const handleReset = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFilters({
      distance: 5000,
      ageRange: [18, 50],
      onlineOnly: false,
      recentlyActive: true,
      travelMode: false,
    });
  };

  const formatDistance = (distance) => {
    if (distance < 1000) return `${distance}m`;
    return `${(distance / 1000).toFixed(1)}km`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFD700" />
        </TouchableOpacity>
        
        <Text style={styles.title}>Filters</Text>
        
        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Distance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distance</Text>
          <Text style={styles.sectionSubtitle}>
            Show people within {formatDistance(filters.distance)}
          </Text>
          <RangeSlider
            value={filters.distance}
            minimumValue={100}
            maximumValue={50000}
            onValueChange={(value) => setFilters({ ...filters, distance: value })}
            step={100}
          />
        </View>

        {/* Age Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Age Range</Text>
          <Text style={styles.sectionSubtitle}>
            {filters.ageRange[0]} - {filters.ageRange[1]} years old
          </Text>
          <RangeSlider
            value={filters.ageRange}
            minimumValue={18}
            maximumValue={80}
            onValueChange={(value) => setFilters({ ...filters, ageRange: value })}
            isRange
          />
        </View>

        {/* Online Only */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitle}>Online Only</Text>
            <Text style={styles.toggleSubtitle}>Show only users who are currently online</Text>
          </View>
          <Switch
            value={filters.onlineOnly}
            onValueChange={(value) => setFilters({ ...filters, onlineOnly: value })}
            trackColor={{ false: '#333', true: '#FFD700' }}
            thumbColor={filters.onlineOnly ? '#000' : '#666'}
          />
        </View>

        {/* Recently Active */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitle}>Recently Active</Text>
            <Text style={styles.toggleSubtitle}>Show users active in the last 24 hours</Text>
          </View>
          <Switch
            value={filters.recentlyActive}
            onValueChange={(value) => setFilters({ ...filters, recentlyActive: value })}
            trackColor={{ false: '#333', true: '#FFD700' }}
            thumbColor={filters.recentlyActive ? '#000' : '#666'}
          />
        </View>

        {/* Travel Mode */}
        <View style={styles.toggleSection}>
          <View style={styles.toggleInfo}>
            <Text style={styles.toggleTitle}>Travel Mode</Text>
            <Text style={styles.toggleSubtitle}>Explore people in other cities</Text>
          </View>
          <Switch
            value={filters.travelMode}
            onValueChange={(value) => setFilters({ ...filters, travelMode: value })}
            trackColor={{ false: '#333', true: '#FFD700' }}
            thumbColor={filters.travelMode ? '#000' : '#666'}
          />
        </View>

        {filters.travelMode && (
          <View style={styles.travelModeInfo}>
            <Ionicons name="information-circle" size={16} color="#FFD700" />
            <Text style={styles.travelModeText}>
              Your location will be hidden when travel mode is enabled
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    padding: 4,
  },
  resetText: {
    color: '#FFD700',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginVertical: 24,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#999',
    fontSize: 14,
    marginBottom: 16,
  },
  toggleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleSubtitle: {
    color: '#999',
    fontSize: 14,
    marginTop: 2,
  },
  travelModeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  travelModeText: {
    color: '#FFD700',
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  applyButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
  },
  applyText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
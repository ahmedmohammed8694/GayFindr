import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import ProfileCard from '../components/ProfileCard';
import { useProfiles } from '../hooks/useProfiles';

export default function GridScreen({ navigation }) {
  const { profiles, loading, refresh } = useProfiles();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const handleProfilePress = (profile) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Profile', { profile });
  };

  const handleFiltersPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Filters');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={handleFiltersPress}
        >
          <Ionicons name="options" size={24} color="#FFD700" />
        </TouchableOpacity>
      </View>
      
      <FlatGrid
        itemDimension={160}
        data={profiles}
        style={styles.grid}
        spacing={8}
        renderItem={({ item }) => (
          <ProfileCard
            profile={item}
            onPress={() => handleProfilePress(item)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFD700"
          />
        }
      />
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
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    padding: 8,
  },
  grid: {
    flex: 1,
    paddingHorizontal: 8,
  },
});
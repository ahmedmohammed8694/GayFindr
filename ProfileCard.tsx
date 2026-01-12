import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 32) / 2;

export default function ProfileCard({ profile, onPress }) {
  const formatDistance = (distance) => {
    if (distance < 100) return 'Nearby';
    if (distance < 1000) return `~${Math.round(distance / 100) * 100}m`;
    if (distance < 5000) return `~${Math.round(distance / 1000)}km`;
    return '5km+';
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: profile.photos?.[0]?.url || 'https://via.placeholder.com/200' }}
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.overlay}>
        {profile.isOnline && (
          <View style={styles.onlineDot} />
        )}
        
        <View style={styles.distanceContainer}>
          <Text style={styles.distance}>
            {formatDistance(profile.distance)}
          </Text>
        </View>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {profile.displayName}
        </Text>
        <Text style={styles.age}>{profile.age}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: '#111',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: cardWidth,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 8,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF00',
    alignSelf: 'flex-end',
    borderWidth: 2,
    borderColor: '#000',
  },
  distanceContainer: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  distance: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  info: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  age: {
    color: '#999',
    fontSize: 12,
  },
});
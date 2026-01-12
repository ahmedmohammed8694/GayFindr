import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen({ route, navigation }) {
  const { profile } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleMessage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigate to chat
  };

  const handleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Add to favorites
  };

  const handleBlock = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // Block user
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Image Carousel */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setCurrentImageIndex(index);
            }}
          >
            {profile.photos?.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo.url }}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {/* Back Button */}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-down" size={28} color="#FFF" />
          </TouchableOpacity>
          
          {/* Image Indicators */}
          <View style={styles.indicators}>
            {profile.photos?.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{profile.displayName}</Text>
            <Text style={styles.age}>{profile.age}</Text>
            <Text style={styles.distance}>~{profile.distance}m away</Text>
          </View>

          {profile.bio && (
            <View style={styles.section}>
              <Text style={styles.bio}>{profile.bio}</Text>
            </View>
          )}

          {profile.isVerified && (
            <View style={styles.verificationBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#00FF00" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton} onPress={handleFavorite}>
          <Ionicons name="heart-outline" size={24} color="#FFD700" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
          <Text style={styles.messageText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleBlock}>
          <Ionicons name="ban-outline" size={24} color="#FF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.6,
    position: 'relative',
  },
  image: {
    width,
    height: height * 0.6,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  indicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#FFD700',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 16,
  },
  name: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  age: {
    color: '#999',
    fontSize: 18,
    marginTop: 4,
  },
  distance: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  bio: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  verifiedText: {
    color: '#00FF00',
    fontSize: 14,
    marginLeft: 4,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  actionButton: {
    padding: 12,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  messageText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
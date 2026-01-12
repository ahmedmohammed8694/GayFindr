import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useChats } from '../hooks/useChats';

export default function ChatListScreen({ navigation }) {
  const { chats, loading } = useChats();

  const handleChatPress = (chat) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Chat', { chat });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return `${Math.floor(diff / 86400000)}d`;
  };

  const renderChatItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
    >
      <Image 
        source={{ uri: item.otherUser.photos?.[0]?.url }}
        style={styles.avatar}
      />
      
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.otherUser.displayName}</Text>
          <Text style={styles.timestamp}>
            {formatTime(item.lastMessage?.createdAt)}
          </Text>
        </View>
        
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage?.content || 'Say hello!'}
        </Text>
      </View>
      
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
      
      {item.otherUser.isOnline && (
        <View style={styles.onlineDot} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    color: '#999',
    fontSize: 12,
  },
  lastMessage: {
    color: '#999',
    fontSize: 14,
  },
  unreadBadge: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00FF00',
    position: 'absolute',
    top: 12,
    left: 58,
    borderWidth: 2,
    borderColor: '#000',
  },
});
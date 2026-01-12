import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useChat } from '../hooks/useChat';
import MessageBubble from '../components/MessageBubble';

export default function ChatScreen({ route, navigation }) {
  const { chat } = route.params;
  const { messages, sendMessage, isTyping } = useChat(chat.id);
  const [messageText, setMessageText] = useState('');
  const flatListRef = useRef();

  const handleSend = async () => {
    if (messageText.trim()) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await sendMessage(messageText.trim());
      setMessageText('');
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const renderMessage = ({ item, index }) => {
    const isMe = item.senderId === 'currentUserId'; // Replace with actual user ID
    const showTimestamp = index === 0 || 
      new Date(item.createdAt) - new Date(messages[index - 1]?.createdAt) > 300000; // 5 minutes
    
    return (
      <MessageBubble
        message={item}
        isMe={isMe}
        showTimestamp={showTimestamp}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFD700" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{chat.otherUser.displayName}</Text>
            {chat.otherUser.isOnline && (
              <Text style={styles.onlineStatus}>Online</Text>
            )}
          </View>
          
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          inverted
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToOffset({ offset: 0 })}
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingContainer}>
            <Text style={styles.typingText}>{chat.otherUser.displayName} is typing...</Text>
          </View>
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Type a message..."
            placeholderTextColor="#666"
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={messageText.trim() ? '#000' : '#666'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  onlineStatus: {
    color: '#00FF00',
    fontSize: 12,
    marginTop: 2,
  },
  moreButton: {
    padding: 4,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  typingText: {
    color: '#999',
    fontSize: 12,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFF',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    padding: 12,
    marginLeft: 8,
  },
  sendButtonDisabled: {
    backgroundColor: '#333',
  },
});
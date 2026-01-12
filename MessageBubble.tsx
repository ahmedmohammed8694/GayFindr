import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MessageBubble({ message, isMe, showTimestamp }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {showTimestamp && (
        <Text style={styles.timestamp}>
          {formatTime(message.createdAt)}
        </Text>
      )}
      
      <View style={[
        styles.bubble,
        isMe ? styles.myBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          isMe ? styles.myMessageText : styles.otherMessageText
        ]}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 8,
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 2,
  },
  myBubble: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#333',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#000',
  },
  otherMessageText: {
    color: '#FFF',
  },
});
import { useState, useEffect } from 'react';
import ApiService from '../services/ApiService';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await ApiService.getNearbyProfiles(filters);
      setProfiles(response.profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => fetchProfiles();

  useEffect(() => {
    fetchProfiles();
  }, []);

  return { profiles, loading, refresh, fetchProfiles };
};

export const useChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getChats();
      setChats(response.chats);
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return { chats, loading, refresh: fetchChats };
};

export const useChat = (chatId: string) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    try {
      const response = await ApiService.getChatMessages(chatId);
      setMessages(response.messages.reverse()); // Reverse for inverted FlatList
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (content: string) => {
    try {
      const response = await ApiService.sendMessage(chatId, content);
      setMessages(prev => [response.message, ...prev]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
    
    // TODO: Set up WebSocket connection for real-time updates
    // const socket = io(API_BASE_URL);
    // socket.emit('join-chat', chatId);
    // socket.on('message:new', (message) => {
    //   setMessages(prev => [message, ...prev]);
    // });
    // socket.on('typing:start', () => setIsTyping(true));
    // socket.on('typing:stop', () => setIsTyping(false));
    
    // return () => socket.disconnect();
  }, [chatId]);

  return { messages, sendMessage, isTyping };
};
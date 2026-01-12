import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import GridScreen from './src/screens/GridScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatScreen from './src/screens/ChatScreen';
import FiltersScreen from './src/screens/FiltersScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const GridStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Grid" component={GridScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Filters" component={FiltersScreen} />
  </Stack.Navigator>
);

const ChatStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ChatList" component={ChatListScreen} />
    <Stack.Screen name="Chat" component={ChatScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Explore') {
                iconName = focused ? 'grid' : 'grid-outline';
              } else if (route.name === 'Chats') {
                iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FFD700',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: styles.tabBar,
            headerShown: false,
          })}
        >
          <Tab.Screen name="Explore" component={GridStack} />
          <Tab.Screen name="Chats" component={ChatStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabBar: {
    backgroundColor: '#111',
    borderTopColor: '#333',
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
  },
});
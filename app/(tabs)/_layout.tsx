import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60 + bottom,
          paddingBottom: bottom,
        },
      }}>
      <Tabs.Screen
        name="TargetsList"
        options={{
          title: 'בנק מטרות',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          title: 'מחשבון',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="calculator" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

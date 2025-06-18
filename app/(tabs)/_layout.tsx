import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
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
        name="index"
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

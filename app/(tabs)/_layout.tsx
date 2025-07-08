import { FontAwesome } from '@expo/vector-icons';
import { TabList, TabSlot, TabTrigger, Tabs as UITabs } from 'expo-router/ui';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <UITabs>
      <TabSlot />
      <TabList style={{
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: 60 + bottom,
        paddingBottom: bottom,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <TabTrigger name="library" href="/library">
          <View style={{ alignItems: 'center' }}>
            <FontAwesome name="book" size={24} color="#333" />
            <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>ספרייה</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="TargetPage" href="/TargetPage" reset="always">
          <View style={{ alignItems: 'center' }}>
            <FontAwesome name="bullseye" size={24} color="#333" />
            <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>דף מטרה</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="TargetsList" href="/TargetsList">
          <View style={{ alignItems: 'center' }}>
            <FontAwesome name="map-marker" size={24} color="#333" />
            <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>בנק מטרות</Text>
          </View>
        </TabTrigger>
        <TabTrigger name="calculator" href="/calculator">
          <View style={{ alignItems: 'center' }}>
            <FontAwesome name="calculator" size={24} color="#333" />
            <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>מחשבון</Text>
          </View>
        </TabTrigger>
      </TabList>
    </UITabs>
  );
}

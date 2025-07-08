import { FontAwesome } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import { TabList, TabSlot, TabTrigger, Tabs as UITabs } from 'expo-router/ui';
import React from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const pathname = usePathname();

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
          {(() => {
            const active = pathname.startsWith('/library');
            return (
              <View style={{ alignItems: 'center', backgroundColor: active ? '#e0e7ef' : 'transparent', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 }}>
                <FontAwesome name="book" size={24} color="#333" />
                <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>ספרייה</Text>
              </View>
            );
          })() as unknown as React.ReactNode}
        </TabTrigger>
        <TabTrigger name="TargetPage" href="/TargetPage" reset="always">
          {(() => {
            const active = pathname.startsWith('/TargetPage');
            return (
              <View style={{ alignItems: 'center', backgroundColor: active ? '#e0e7ef' : 'transparent', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 }}>
                <FontAwesome name="bullseye" size={24} color="#333" />
                <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>דף מטרה</Text>
              </View>
            );
          })() as unknown as React.ReactNode}
        </TabTrigger>
        <TabTrigger name="TargetsList" href="/TargetsList">
          {(() => {
            const active = pathname.startsWith('/TargetsList');
            return (
              <View style={{ alignItems: 'center', backgroundColor: active ? '#e0e7ef' : 'transparent', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 }}>
                <FontAwesome name="map-marker" size={24} color="#333" />
                <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>בנק מטרות</Text>
              </View>
            );
          })() as unknown as React.ReactNode}
        </TabTrigger>
        <TabTrigger name="calculator" href="/calculator">
          {(() => {
            const active = pathname.startsWith('/calculator');
            return (
              <View style={{ alignItems: 'center', backgroundColor: active ? '#e0e7ef' : 'transparent', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 }}>
                <FontAwesome name="calculator" size={24} color="#333" />
                <Text style={{ fontSize: 12, color: '#333', marginTop: 2 }}>מחשבון</Text>
              </View>
            );
          })() as unknown as React.ReactNode}
        </TabTrigger>
      </TabList>
    </UITabs>
  );
}

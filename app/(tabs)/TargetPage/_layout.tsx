import { Stack } from 'expo-router';
import React from 'react';

export default function TargetPageLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="MaskarOptions" />
      <Stack.Screen name="Maskar" />
      <Stack.Screen name="MaskarLoal" />
    </Stack>
  );
} 
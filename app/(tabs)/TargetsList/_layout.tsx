import { Stack } from 'expo-router';

export default function TargetsListLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="TargetDetails" options={{ headerShown: false }} />
    </Stack>
  );
} 
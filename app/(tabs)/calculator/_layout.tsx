import { Stack } from 'expo-router';

export default function CalculatorLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="CoordinateConversion" options={{ headerShown: false }} />
      <Stack.Screen name="BackAzimuth" options={{ headerShown: false }} />
      <Stack.Screen name="StainSizeCalculation" options={{ headerShown: false }} />
      <Stack.Screen name="EfficiencyCalculation" options={{ headerShown: false }} />
      <Stack.Screen name="UnitConversion" options={{ headerShown: false }} />
    </Stack>
  );
} 
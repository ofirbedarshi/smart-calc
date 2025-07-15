import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import AppNavigator from './navigation/AppNavigator';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Force LTR globally
  React.useEffect(() => {
    if (!I18nManager.isRTL) return;
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Move useSafeAreaInsets to a child component inside SafeAreaProvider
  const AppWithInsets = () => {
    const insets = useSafeAreaInsets();
    return (
      <GestureHandlerRootView style={{ flex: 1, paddingBottom: insets.bottom }}>
        <AppNavigator />
      </GestureHandlerRootView>
    );
  };

  return (
    <SafeAreaProvider>
      <AppWithInsets />
    </SafeAreaProvider>
  );
} 
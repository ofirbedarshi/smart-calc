import React from 'react';
import { SafeAreaView, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SafeAreaScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const SafeAreaScreen: React.FC<SafeAreaScreenProps> = ({ children, style }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[{ flex: 1, paddingTop: insets.top }, style]}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaScreen; 
import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

interface ScreenWrapperProps extends ScrollViewProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style, ...props }) => {
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 20,
  },
});

export default ScreenWrapper; 
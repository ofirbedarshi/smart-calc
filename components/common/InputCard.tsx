import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface InputCardProps extends ViewProps {
  children: React.ReactNode;
}

const InputCard: React.FC<InputCardProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 16,
  },
});

export default InputCard; 
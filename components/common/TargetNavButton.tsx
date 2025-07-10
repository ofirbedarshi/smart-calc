import React from 'react';
import { DimensionValue, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface TargetNavButtonProps {
  screen: {
    navigationCtaLabel: string;
    routeName: string;
    color?: string;
  };
  onPress: () => void;
  backgroundColor?: string;
  minHeight?: number;
  flexBasis?: DimensionValue;
  maxWidth?: number;
}

const TargetNavButton: React.FC<TargetNavButtonProps> = ({ 
  screen, 
  onPress, 
  backgroundColor = '#cfddde',
  minHeight = 90,
  flexBasis = undefined,
  maxWidth = undefined
}) => (
  <TouchableOpacity
    key={screen.routeName}
    style={[
      styles.gridButton, 
      { 
        backgroundColor, 
        width: 150,
        height: 90,
      }
    ]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.buttonText}>{screen.navigationCtaLabel}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  gridButton: {
    margin: 7,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
});

export default TargetNavButton; 
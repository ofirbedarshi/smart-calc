import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface WideButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  height?: number;
}

const WideButton: React.FC<WideButtonProps> = ({ 
  title, 
  onPress, 
  backgroundColor = '#cfddde',
  height = 60 
}) => (
  <TouchableOpacity
    style={[styles.wideButton, { backgroundColor, height }]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wideButton: {
    width: '100%',
    marginTop: 16,
    marginBottom: 8,
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

export default WideButton; 
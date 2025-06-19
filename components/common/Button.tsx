import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  theme?: 'primary' | 'success' | 'danger';
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, disabled, theme = 'primary', small = false }) => {
  const buttonStyle = [
    styles.button,
    theme === 'primary'
      ? styles.primaryButton
      : theme === 'success'
      ? styles.successButton
      : styles.dangerButton,
    small && styles.smallButton,
    disabled && styles.buttonDisabled,
  ];

  const textStyle = [
    styles.buttonText,
    small && styles.smallButtonText,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  successButton: {
    backgroundColor: '#34C759',
  },
  dangerButton: {
    backgroundColor: '#ff3b30',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    margin: 8,
    borderRadius: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Button; 
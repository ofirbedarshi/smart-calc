import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface LinkButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity onPress={onPress} style={[styles.header, style]} activeOpacity={0.7}>
    <Text style={[styles.title, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  header: {
    alignSelf: 'flex-end',
    marginRight: 24,
    marginBottom: 4,
  },
  title: {
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default LinkButton; 
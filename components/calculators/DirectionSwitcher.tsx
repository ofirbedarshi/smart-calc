import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DirectionSwitcherProps {
  isReversed: boolean;
  onToggle: () => void;
}

export const DirectionSwitcher: React.FC<DirectionSwitcherProps> = ({ isReversed, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {isReversed ? 'אזימוט + טווח + זהר' : 'נ.צ + גובה'}
      </Text>
      <TouchableOpacity onPress={onToggle} style={styles.switchButton}>
        <FontAwesome name="exchange" size={20} color="#007AFF" />
      </TouchableOpacity>
      <Text style={styles.label}>
        {isReversed ? 'נ.צ + גובה' : 'אזימוט + טווח + זהר'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  switchButton: {
    padding: 8,
  },
}); 
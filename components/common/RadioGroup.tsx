import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, value, onChange }) => (
  <View style={styles.group}>
    {options.map(option => (
      <TouchableOpacity
        key={option.value}
        style={styles.row}
        onPress={() => onChange(option.value)}
        activeOpacity={0.7}
      >
        <View style={[styles.radio, value === option.value && styles.radioSelected]}>
          {value === option.value && <View style={styles.radioDot} />}
        </View>
        <Text style={styles.label}>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  group: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 4,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    backgroundColor: '#fff',
  },
  radioSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F0FF',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  label: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
});

export default RadioGroup; 
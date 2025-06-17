import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput } from './BaseInput';

interface InputField {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  keyboardType?: 'numeric' | 'default';
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

interface GroupInputProps {
  fields: InputField[];
}

export const GroupInput: React.FC<GroupInputProps> = ({ fields }) => {
  return (
    <View style={styles.container}>
      {fields.map((field, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{field.label}</Text>
          <View style={styles.inputWrapper}>
            <BaseInput
              value={field.value}
              onChange={field.onChange || (() => {})}
              type={field.keyboardType === 'numeric' ? 'number' : 'text'}
              placeholder={field.placeholder}
              disabled={field.disabled}
              error={field.error}
              onBlur={field.onBlur}
              onFocus={field.onFocus}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'flex-start',
  },
  inputGroup: {
    gap: 2,
    marginLeft: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  inputWrapper: {
    alignItems: 'flex-end',
  },
}); 
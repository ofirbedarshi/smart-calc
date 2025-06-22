import React from 'react';
import { StyleSheet, View } from 'react-native';
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
        <BaseInput
          key={index}
          label={field.label}
          value={field.value}
          onChange={field.onChange || (() => {})}
          type={field.keyboardType === 'numeric' ? 'number' : 'text'}
          placeholder={field.placeholder}
          disabled={field.disabled}
          error={field.error}
          onBlur={field.onBlur}
          onFocus={field.onFocus}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
}); 
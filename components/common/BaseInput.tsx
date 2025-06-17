import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export type InputType = 'text' | 'number';

interface BaseInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  onPrefixChange?: (prefix: string) => void;
  type?: InputType;
  maxLength?: number;
  maxPrefixLength?: number;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  label,
  value,
  onChange,
  prefix,
  onPrefixChange,
  type = 'text',
  maxLength,
  maxPrefixLength,
  placeholder,
  disabled = false,
  error,
  onBlur,
  onFocus,
}) => {
  const handleInputChange = (text: string) => {
    if (type === 'number') {
      const numericValue = text.replace(/[^0-9.]/g, '');
      onChange(numericValue);
    } else {
      onChange(text);
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      )}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {type === 'number' ? (
          <>
            {(prefix || maxPrefixLength) && (
              <>
                <TextInput
                  style={styles.prefixInput}
                  value={prefix}
                  onChangeText={onPrefixChange}
                  maxLength={maxPrefixLength}
                  keyboardType="numeric"
                  textAlign="center"
                  editable={!disabled}
                />
                <View style={styles.separator} />
              </>
            )}
            <TextInput
              style={styles.mainInput}
              value={value}
              onChangeText={handleInputChange}
              keyboardType="numeric"
              maxLength={maxLength}
              placeholder={placeholder}
              placeholderTextColor="#999"
              editable={!disabled}
              textAlign="right"
              onBlur={onBlur}
              onFocus={onFocus}
            />
          </>
        ) : (
          <>
            <TextInput
              style={styles.mainInput}
              value={value}
              onChangeText={handleInputChange}
              keyboardType="default"
              maxLength={maxLength}
              placeholder={placeholder}
              placeholderTextColor="#999"
              editable={!disabled}
              textAlign="right"
              onBlur={onBlur}
              onFocus={onFocus}
            />
            {prefix && (
              <>
                <TextInput
                  style={styles.prefixInput}
                  value={prefix}
                  onChangeText={onPrefixChange}
                  maxLength={maxPrefixLength}
                  keyboardType="default"
                  textAlign="center"
                  editable={!disabled}
                />
                <View style={styles.separator} />
              </>
            )}
          </>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  labelError: {
    color: '#ff3b30',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  prefixInput: {
    width: 40,
    height: 40,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
  separator: {
    width: 1,
    backgroundColor: '#ccc',
  },
  mainInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    textAlign: 'right',
  },
}); 
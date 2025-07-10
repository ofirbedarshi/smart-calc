import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export type InputType = 'text' | 'number';

export interface BaseInputProps {
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
  textArea?: boolean;
  autoGrowVertically?: boolean;
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
  textArea = false,
  autoGrowVertically = false,
}) => {
  const [inputHeight, setInputHeight] = React.useState(40);

  const handleInputChange = (text: string) => {
    if (type === 'number') {
      const numericValue = text.replace(/[^0-9.-]/g, '');
      onChange(numericValue);
    } else {
      onChange(text);
    }
  };

  // Compute shared props for main and prefix inputs
  const mainInputProps = {
    style: [
      styles.mainInput,
      disabled && styles.inputDisabled,
      textArea && styles.textArea,
      autoGrowVertically && { height: inputHeight, minHeight: 40 },
    ],
    value,
    onChangeText: handleInputChange,
    maxLength,
    placeholder,
    placeholderTextColor: '#bbb',
    editable: !disabled,
    onBlur,
    onFocus,
    multiline: autoGrowVertically || textArea,
    numberOfLines: autoGrowVertically ? undefined : (textArea ? 4 : 1),
    onContentSizeChange: autoGrowVertically
      ? (e: any) => setInputHeight(Math.max(40, e.nativeEvent.contentSize.height))
      : undefined,
  };

  const prefixInputProps = {
    style: [
      styles.prefixInput,
      disabled && styles.inputDisabled,
    ],
    value: prefix,
    onChangeText: onPrefixChange,
    maxLength: maxPrefixLength,
    placeholderTextColor: '#bbb',
    editable: !disabled,
  };

  const inputRow = (
    <View style={[
      styles.inputContainer,
      error && styles.inputError,
      disabled && styles.inputDisabledContainer,
    ]}>
      {type === 'number' ? (
        <>
          {(prefix || maxPrefixLength) && (
            <>
              <TextInput
                {...prefixInputProps}
                keyboardType="numeric"
                textAlign="center"
              />
              <View style={styles.separator} />
            </>
          )}
          <TextInput
            {...mainInputProps}
            keyboardType="numeric"
            textAlign="left"
          />
        </>
      ) : (
        <>
          <TextInput
            {...mainInputProps}
            keyboardType="default"
            textAlign="right"
          />
          {prefix && (
            <>
              <TextInput
                {...prefixInputProps}
                keyboardType="default"
                textAlign="center"
              />
              <View style={styles.separator} />
            </>
          )}
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, error && styles.labelError]}>{label}</Text>
      )}
      {disabled ? (
        <View pointerEvents="none">{inputRow}</View>
      ) : (
        inputRow
      )}
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
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    textAlign: 'right',
  },
  inputDisabledContainer: {
    backgroundColor: '#eee',
    borderColor: '#eee',
  },
  inputDisabled: {
    backgroundColor: '#eee',
    color: '#aaa',
  },
}); 
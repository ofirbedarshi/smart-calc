import React, { useState } from 'react';
import { BaseInput, InputType } from './BaseInput';

interface PrefixInputProps {
  value: string;
  onChange: (value: string) => void;
  prefixLength: number;
  type?: InputType;
  maxLength?: number;
  // All other BaseInput props
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const PrefixInput: React.FC<PrefixInputProps> = ({
  value,
  onChange,
  prefixLength,
  type = 'text',
  maxLength,
  ...rest
}) => {
  // Hold the prefix in state, defaulting to the first prefixLength characters of value
  const [prefix, setPrefix] = useState<string>(value.slice(0, prefixLength) || '3');

  // Extract main value (everything after the prefix)
  const mainValue = value.slice(prefix.length);

  // Calculate maxLength for main input
  const mainMaxLength =
    typeof maxLength === 'number' ? Math.max(maxLength - prefixLength, 0) : undefined;

  // Handle prefix change
  const handlePrefixChange = (newPrefix: string) => {
    setPrefix(newPrefix);
    onChange(newPrefix + mainValue);
  };

  // Handle main value change
  const handleMainChange = (newMain: string) => {
    let filteredMain = newMain;
    if (type === 'number') {
      filteredMain = newMain.replace(/[^0-9.]/g, '');
    }
    filteredMain =
      typeof mainMaxLength === 'number' ? filteredMain.slice(0, mainMaxLength) : filteredMain;
    onChange(prefix + filteredMain);
  };

  return (
    <BaseInput
      {...rest}
      value={mainValue}
      onChange={handleMainChange}
      prefix={prefix}
      onPrefixChange={handlePrefixChange}
      type={type}
      maxLength={mainMaxLength}
      maxPrefixLength={prefixLength}
    />
  );
};

export default PrefixInput; 
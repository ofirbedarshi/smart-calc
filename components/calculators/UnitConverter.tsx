import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput } from '../common/BaseInput';
import { DirectionSwitcher } from '../common/DirectionSwitcher';

interface UnitConverterProps {
  title: string;
  unit1Name: string;
  unit2Name: string;
  unit1ToUnit2Calc: (value: number) => number;
  unit2ToUnit1Calc: (value: number) => number;
}

export const UnitConverter: React.FC<UnitConverterProps> = ({
  title,
  unit1Name,
  unit2Name,
  unit1ToUnit2Calc,
  unit2ToUnit1Calc,
}) => {
  const [isReversed, setIsReversed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (!value) {
      setResult('');
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('');
      return;
    }

    const calculatedResult = isReversed 
      ? unit2ToUnit1Calc(numValue)
      : unit1ToUnit2Calc(numValue);

    setResult(calculatedResult.toFixed(3));
  };

  const handleDirectionChange = () => {
    setIsReversed(!isReversed);
    const currentValue = inputValue;
    const currentResult = result;
    setInputValue(currentResult);
    setResult(currentValue);
  };

  const inputPlaceholder = isReversed ? unit2Name : unit1Name;
  const resultLabel = isReversed ? unit1Name : unit2Name;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <DirectionSwitcher
        isReversed={isReversed}
        onToggle={handleDirectionChange}
        leftLabel={unit1Name}
        rightLabel={unit2Name}
      />

      <BaseInput
        value={inputValue}
        onChange={handleInputChange}
        placeholder={inputPlaceholder}
        type="number"
      />

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>{resultLabel}:</Text>
        <Text style={styles.resultValue}>{result || '-'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  inputContainer: {
    marginTop: 8,
  },
  resultContainer: {
    marginTop: 8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 8,
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
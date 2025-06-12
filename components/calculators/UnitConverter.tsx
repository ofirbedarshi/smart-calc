import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { DirectionSwitcher } from '../common/DirectionSwitcher';

interface UnitConverterProps {
  unit1Name: string;
  unit2Name: string;
  unit1ToUnit2Calc: (value: number) => number;
  unit2ToUnit1Calc: (value: number) => number;
}

export const UnitConverter: React.FC<UnitConverterProps> = ({
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
    setInputValue('');
    setResult('');
  };

  const inputPlaceholder = isReversed ? unit2Name : unit1Name;
  const resultLabel = isReversed ? unit1Name : unit2Name;

  return (
    <View style={styles.container}>
      <DirectionSwitcher
        isReversed={isReversed}
        onToggle={handleDirectionChange}
        leftLabel={unit1Name}
        rightLabel={unit2Name}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={handleInputChange}
          placeholder={inputPlaceholder}
          keyboardType="numeric"
          textAlign="right"
        />
      </View>

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
  inputContainer: {
    marginTop: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'right',
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
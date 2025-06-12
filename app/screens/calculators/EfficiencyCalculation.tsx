import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import { TargetInputs } from '../../../components/calculators/TargetInputs';
import { EfficiencyCalc } from '../../../services/calculators/EfficiencyCalc';
import { CalculatorField } from '../../../types/calculator';

export default function EfficiencyCalculation() {
  const [inputs, setInputs] = useState({
    deviation: '',
    range: '',
  });
  const [result, setResult] = useState({ efficiency: '' });

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResult({ efficiency: '' });
  };

  const getInputFields = (): CalculatorField[] => [
    {
      label: 'סטייה (מטר)',
      value: inputs.deviation,
      onChange: (value) => handleInputChange('deviation', value),
      keyboardType: 'numeric',
    },
    {
      label: 'טווח (קילומטר)',
      value: inputs.range,
      onChange: (value) => handleInputChange('range', value),
      keyboardType: 'numeric',
    },
  ];

  const getResultFields = (): CalculatorField[] => [
    {
      label: 'קילומטר',
      value: result.efficiency,
    },
  ];

  const handleCalculate = () => {
    const input = {
      deviation: parseFloat(inputs.deviation),
      range: parseFloat(inputs.range),
    };

    const result = EfficiencyCalc.calculateEfficiency(input);
    setResult(result);
  };

  const isCalculateDisabled = !inputs.deviation || !inputs.range;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>חישוב יעילות</Text>

      <TargetInputs fields={getInputFields()} />

      <TouchableOpacity 
        style={[styles.calculateButton, isCalculateDisabled && styles.calculateButtonDisabled]} 
        onPress={handleCalculate}
        disabled={isCalculateDisabled}
      >
        <Text style={styles.calculateButtonText}>חישוב</Text>
      </TouchableOpacity>

      <ConversionResults
        title="תוצאות חישוב"
        fields={getResultFields()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  calculateButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  calculateButtonDisabled: {
    opacity: 0.5,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
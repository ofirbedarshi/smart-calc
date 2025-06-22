import React, { useState } from 'react';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import Button from '../../../components/common/Button';
import { GroupInput } from '../../../components/common/GroupInput';
import Header from '../../../components/common/Header';
import InputCard from '../../../components/common/InputCard';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
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
      onChange: value => handleInputChange('deviation', value),
      keyboardType: 'numeric',
    },
    {
      label: 'טווח (קילומטר)',
      value: inputs.range,
      onChange: value => handleInputChange('range', value),
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
    <ScreenWrapper>
      <Header title="חישוב יעילות" />
      <InputCard>
        <GroupInput fields={getInputFields()} />
      </InputCard>
      <Button title="חישוב" onPress={handleCalculate} disabled={isCalculateDisabled} theme="primary" />
      <ConversionResults title="תוצאות חישוב" fields={getResultFields()} />
    </ScreenWrapper>
  );
} 
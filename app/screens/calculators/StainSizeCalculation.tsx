import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import { TargetInputs } from '../../../components/calculators/TargetInputs';
import Button from '../../../components/common/Button';
import { Dropdown } from '../../../components/common/Dropdown';
import { StainSizeCalc } from '../../../services/calculators/StainSizeCalc';
import { CalculatorField } from '../../../types/calculator';

type WeaponType = 'rattle' | 'bush' | 'spectro' | 'pop';

export default function StainSizeCalculation() {
  const [weaponType, setWeaponType] = useState<WeaponType>('rattle');
  const [inputs, setInputs] = useState({
    divergence: '',
    range: '',
    selfDiameter: '',
  });
  const [result, setResult] = useState({ size: '' });

  const weaponOptions = [
    { label: 'ראטלר', value: 'rattle' },
    { label: 'שיח', value: 'bush' },
    { label: 'ספקטרו', value: 'spectro' },
    { label: 'פופ', value: 'pop' },
  ];

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResult({ size: '' });
  };

  const getInputFields = (): CalculatorField[] => [
    {
      label: 'התבדרות - ס״מ',
      value: inputs.divergence,
      onChange: (value) => handleInputChange('divergence', value),
      keyboardType: 'numeric',
    },
    {
      label: 'טווח - ק״מ',
      value: inputs.range,
      onChange: (value) => handleInputChange('range', value),
      keyboardType: 'numeric',
    },
    {
      label: 'קוטר עצמית - סנטימטר',
      value: inputs.selfDiameter,
      onChange: (value) => handleInputChange('selfDiameter', value),
      keyboardType: 'numeric',
    },
  ];

  const getResultFields = (): CalculatorField[] => [
    {
      label: 'סנטימטר',
      value: result.size,
    },
  ];

  const handleCalculate = () => {
    const input = {
      weaponType,
      divergence: parseFloat(inputs.divergence),
      range: parseFloat(inputs.range),
      selfDiameter: parseFloat(inputs.selfDiameter),
    };

    const result = StainSizeCalc.calculateStainSize(input);
    setResult(result);
  };

  const isCalculateDisabled = !inputs.divergence || !inputs.range || !inputs.selfDiameter;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>חישוב גודל כתם</Text>

      <View style={styles.dropdownContainer}>
        <Dropdown
          options={weaponOptions}
          value={weaponType}
          onChange={(value) => {
            setWeaponType(value as WeaponType);
            setResult({ size: '' });
          }}
        />
      </View>

      <TargetInputs fields={getInputFields()} />

      <Button
        title="חישוב"
        onPress={handleCalculate}
        disabled={isCalculateDisabled}
        theme="primary"
      />

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
  dropdownContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'flex-end',
  },
}); 
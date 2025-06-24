import React, { useState } from 'react';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import Button from '../../../components/common/Button';
import { Dropdown } from '../../../components/common/Dropdown';
import { GroupInput } from '../../../components/common/GroupInput';
import Header from '../../../components/common/Header';
import InputCard from '../../../components/common/InputCard';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { StainSizeCalc } from '../../../services/calculators/StainSizeCalc';
import { CalculatorField } from '../../../types/calculator';

type WeaponType = 'rattle' | 'bush' | 'spectro' | 'pop';

const WEAPON_CONSTANTS = {
  bush: { divergence: '13', selfDiameter: '9' },
  spectro: { divergence: '16.5', selfDiameter: '4.3' },
  pop: { divergence: '33', selfDiameter: '1.8' },
  rattle: { selfDiameter: '3.6', divergence: '' },
} as const;

const getInitialInputsByWeaponType = (weaponType: WeaponType) => {
  const constants = WEAPON_CONSTANTS[weaponType];
  return {
    range: '',
    divergence: constants.divergence,
    selfDiameter: constants.selfDiameter,
  };
};

export default function StainSizeCalculation() {
  const [weaponType, setWeaponType] = useState<WeaponType>('rattle');
  const [inputs, setInputs] = useState(getInitialInputsByWeaponType(weaponType));
  const [result, setResult] = useState({ size: '' });

  const weaponOptions = [
    { label: 'ראטלר', value: 'rattle' },
    { label: 'שיח', value: 'bush' },
    { label: 'ספקטרו', value: 'spectro' },
    { label: 'פופ', value: 'pop' },
  ];

  const handleWeaponTypeChange = (value: WeaponType) => {
    setWeaponType(value);
    setResult({ size: '' });
    
    setInputs(getInitialInputsByWeaponType(value));
  };

 

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setResult({ size: '' });
  };

  const getInputFields = (): CalculatorField[] => [
    {
      label: 'התבדרות - ס״מ',
      value: inputs.divergence,
      onChange: value => handleInputChange('divergence', value),
      keyboardType: 'numeric',
      disabled: weaponType !== 'rattle',
    },
    {
      label: 'טווח - ק״מ',
      value: inputs.range,
      onChange: value => handleInputChange('range', value),
      keyboardType: 'numeric',
    },
    {
      label: 'קוטר עצמית - סנטימטר',
      value: inputs.selfDiameter,
      onChange: value => handleInputChange('selfDiameter', value),
      keyboardType: 'numeric',
      disabled: true,
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
    <ScreenWrapper>
      <Header title="חישוב גודל כתם" />
      <InputCard>
        <Dropdown
          options={weaponOptions}
          value={weaponType}
          onChange={value => handleWeaponTypeChange(value as WeaponType)}
        />
        <GroupInput fields={getInputFields()} />
      </InputCard>

      <Button title="חישוב" onPress={handleCalculate} disabled={isCalculateDisabled} theme="primary" />

      <ConversionResults title="תוצאות חישוב" fields={getResultFields()} />
    </ScreenWrapper>
  );
} 
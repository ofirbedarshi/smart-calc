import React, { useState } from 'react';
import { Alert } from 'react-native';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import { TargetCoordinates } from '../../../components/calculators/TargetCoordinates';
import Button from '../../../components/common/Button';
import { CoordsData } from '../../../components/common/CoordsInput';
import { Dropdown } from '../../../components/common/Dropdown';
import Header from '../../../components/common/Header';
import InputCard from '../../../components/common/InputCard';
import ScreenWrapper from '../../../components/common/ScreenWrapper';
import { BackAzimuthCalc } from '../../../services/calculators/BackAzimuthCalc';
import { useLocationStore } from '../../../stores/locationStore';

type TargetData = {
  coords: CoordsData;
  distance: string;
  elevation: string;
};

export default function BackAzimuth() {
  const [target1, setTarget1] = useState<TargetData>({
    coords: {
      northCoord: '',
      eastCoord: '',
      height: '',
    },
    distance: '',
    elevation: '',
  });

  const [target2, setTarget2] = useState<TargetData>({
    coords: {
      northCoord: '',
      eastCoord: '',
      height: '',
    },
    distance: '',
    elevation: '',
  });

  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [results, setResults] = useState({ northCoord: '', eastCoord: '', height: '' });

  const saveLocation = useLocationStore(state => state.saveLocation);

  const handleTarget1CoordsChange = (coords: CoordsData) => {
    setTarget1(prev => ({ ...prev, coords }));
    setResults({ northCoord: '', eastCoord: '', height: '' });
  };

  const handleTarget2CoordsChange = (coords: CoordsData) => {
    setTarget2(prev => ({ ...prev, coords }));
    setResults({ northCoord: '', eastCoord: '', height: '' });
  };

  const handleTarget1FieldChange = (field: keyof Omit<TargetData, 'coords'>, value: string) => {
    setTarget1(prev => ({ ...prev, [field]: value }));
    setResults({ northCoord: '', eastCoord: '', height: '' });
  };

  const handleTarget2FieldChange = (field: keyof Omit<TargetData, 'coords'>, value: string) => {
    setTarget2(prev => ({ ...prev, [field]: value }));
    setResults({ northCoord: '', eastCoord: '', height: '' });
  };

  const getResultFields = () => [
    {
      label: 'נ.צ מזרחי',
      value: results.eastCoord,
    },
    {
      label: 'נ.צ צפוני',
      value: results.northCoord,
    },
    {
      label: 'גובה',
      value: results.height,
    },
  ];

  const validateInputs = (): string | null => {
    if (!target1.coords.northCoord || !target1.coords.eastCoord || !target1.distance) {
      return 'חסרים נתונים במטרה 1';
    }
    if (!target2.coords.northCoord || !target2.coords.eastCoord || !target2.distance) {
      return 'חסרים נתונים במטרה 2';
    }
    return null;
  };

  const handleCalculate = () => {
    const error = validateInputs();
    if (error) {
      Alert.alert('שגיאה', error);
      return;
    }

    const target1Data = {
      northCoord: parseFloat(target1.coords.northCoord),
      eastCoord: parseFloat(target1.coords.eastCoord),
      distance: parseFloat(target1.distance),
      elevation: target1.elevation ? parseFloat(target1.elevation) : undefined,
      height: target1.coords.height ? parseFloat(target1.coords.height) : undefined,
    };

    const target2Data = {
      northCoord: parseFloat(target2.coords.northCoord),
      eastCoord: parseFloat(target2.coords.eastCoord),
      distance: parseFloat(target2.distance),
      elevation: target2.elevation ? parseFloat(target2.elevation) : undefined,
      height: target2.coords.height ? parseFloat(target2.coords.height) : undefined,
    };

    const result = BackAzimuthCalc.calculateSelfLocation(target1Data, target2Data, direction);
    setResults(result);
  };

  const isCalculateDisabled =
    !target1.coords.northCoord ||
    !target1.coords.eastCoord ||
    !target1.distance ||
    !target2.coords.northCoord ||
    !target2.coords.eastCoord ||
    !target2.distance;

  const directionOptions = [
    { label: 'ימנית', value: 'right' },
    { label: 'שמאלית', value: 'left' },
  ];

  const hasResults = results.northCoord && results.eastCoord && results.height;

  const handleSaveSelfLocation = async () => {
    try {
      await saveLocation({
        northCoord: results.northCoord,
        eastCoord: results.eastCoord,
        height: results.height,
      });
      Alert.alert('הצלחה', 'המיקום העצמי עודכן בהצלחה');
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה בעדכון המיקום העצמי');
    }
  };

  return (
    <ScreenWrapper>
      <Header title="חיתוך לאחור" />
      <InputCard>
        <TargetCoordinates
          title="מטרה 1"
          coordsData={target1.coords}
          onCoordsChange={handleTarget1CoordsChange}
          distance={target1.distance}
          onDistanceChange={value => handleTarget1FieldChange('distance', value)}
          elevation={target1.elevation}
          onElevationChange={value => handleTarget1FieldChange('elevation', value)}
        />
      </InputCard>

      <Dropdown
        options={directionOptions}
        value={direction}
        onChange={value => {
          setDirection(value as 'right' | 'left');
          setResults({ northCoord: '', eastCoord: '', height: '' });
        }}
      />
      <InputCard>
        <TargetCoordinates
          title="מטרה 2"
          coordsData={target2.coords}
          onCoordsChange={handleTarget2CoordsChange}
          distance={target2.distance}
          onDistanceChange={value => handleTarget2FieldChange('distance', value)}
          elevation={target2.elevation}
          onElevationChange={value => handleTarget2FieldChange('elevation', value)}
        />
      </InputCard>

      <Button title="חישוב נ.צ עצמי" onPress={handleCalculate} disabled={isCalculateDisabled} theme="primary" />

      <ConversionResults title="תוצאות חישוב" fields={getResultFields()} />

      {hasResults && <Button title="שמור כמיקום עצמי" onPress={handleSaveSelfLocation} theme="success" />}
    </ScreenWrapper>
  );
} 
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import Button from '../../../components/common/Button';
import { CoordsData, CoordsInput } from '../../../components/common/CoordsInput';
import { DirectionSwitcher } from '../../../components/common/DirectionSwitcher';
import { GroupInput } from '../../../components/common/GroupInput';
import { SelfLocation } from '../../../components/SelfLocation';
import { ConversionResults as ConversionResultsType, CoordsConversionCalc } from '../../../services/calculators/CoordsConversionCalc';
import { LocationData } from '../../../services/LocationService';
import { useLocationStore } from '../../../stores/locationStore';
import { CalculatorField } from '../../../types/calculator';

export default function CoordinateConversion() {
  const { locationData: selfLocation } = useLocationStore();
  const [isReversed, setIsReversed] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Input states
  const [coordsData, setCoordsData] = useState<CoordsData>({
    northCoord: '',
    eastCoord: '',
    height: '',
  });
  const [azimuth, setAzimuth] = useState('');
  const [distance, setDistance] = useState('');
  const [elevation, setElevation] = useState('');
  
  // Results state
  const [results, setResults] = useState<ConversionResultsType>({
    azimuth: '',
    distance: '',
    elevation: '',
  });

  // Reset results when inputs change
  useEffect(() => {
    setResults({
      azimuth: '',
      distance: '',
      elevation: '',
    });
  }, [isReversed, coordsData, azimuth, distance, elevation]);

  const getAzimuthFields = () => [
    {
      label: 'אזימוט (אלפיות)',
      value: azimuth,
      onChange: setAzimuth,
      keyboardType: 'numeric' as const,
    },
    {
      label: 'טווח (מטרים)',
      value: distance,
      onChange: setDistance,
      keyboardType: 'numeric' as const,
    },
    {
      label: 'זוהר',
      value: elevation,
      onChange: setElevation,
      keyboardType: 'numeric' as const,
    },
  ];

  const getResultFields = (): CalculatorField[] => {
    if (isReversed) {
      return [
        {
          label: 'נ.צ מזרחי',
          value: results.eastCoord || '',
        },
        {
          label: 'נ.צ צפוני',
          value: results.northCoord || '',
        },
        {
          label: 'גובה',
          value: results.height || '',
        },
      ];
    }

    return [
      {
        label: 'אזימוט (אלפיות)',
        value: results.azimuth,
      },
      {
        label: 'טווח (מטרים)',
        value: results.distance,
      },
      {
        label: 'זוהר',
        value: results.elevation,
      },
    ];
  };

  const validateInputs = (): string | null => {
    if (!selfLocation.height || !selfLocation.northCoord || !selfLocation.eastCoord) {
      return 'חסר מיקום עצמי';
    }

    if (isReversed) {
      if (!azimuth) return 'חסר אזימוט';
      if (!distance) return 'חסר טווח';
      if (!elevation) return 'חסר זוהר';
    } else {
      if (!coordsData.eastCoord) return 'חסר נ.צ מזרחי';
      if (!coordsData.northCoord) return 'חסר נ.צ צפוני';
      if (!coordsData.height) return 'חסר גובה';
    }

    return null;
  };

  const handleCalculate = async () => {
    const error = validateInputs();
    if (error) {
      Alert.alert('שגיאה', error);
      return;
    }

    try {
      setIsCalculating(true);
      
      if (isReversed) {
        const targetData = {
          azimuth,
          distance,
          elevation,
        };
        const calculationResults = CoordsConversionCalc.calcReverse(selfLocation, targetData);
        setResults(calculationResults);
      } else {
        const targetLocation: LocationData = {
          height: coordsData.height,
          northCoord: coordsData.northCoord,
          eastCoord: coordsData.eastCoord,
        };
        const calculationResults = CoordsConversionCalc.calc(selfLocation, targetLocation);
        setResults(calculationResults);
      }
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בחישוב הקואורדינטות');
      console.error('[CoordinateConversion] Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSave = () => {
    const target = {
      northCoord: isReversed ? results.northCoord : coordsData.northCoord,
      eastCoord: isReversed ? results.eastCoord : coordsData.eastCoord,
      height: isReversed ? results.height : coordsData.height,
    };

    router.push({
      pathname: '/screens/targetList/TargetDetails',
      params: {
        target: JSON.stringify(target),
      },
    });
  };

  const isCalculateDisabled = !selfLocation.height || !selfLocation.northCoord || !selfLocation.eastCoord ||
    (isReversed ? (!azimuth || !distance || !elevation) : (!coordsData.eastCoord || !coordsData.northCoord || !coordsData.height));

  const hasResults = isReversed ? 
    (results.northCoord && results.eastCoord) : 
    (results.azimuth && results.distance);

  return (
    <ScrollView style={styles.container}>
      <SelfLocation />
      
      <DirectionSwitcher
        isReversed={isReversed}
        onToggle={() => setIsReversed(!isReversed)}
        leftLabel="נ.צ + גובה"
        rightLabel="אזימוט + טווח + זהר"
      />

      {isReversed ? (
        <GroupInput fields={getAzimuthFields()} />
      ) : (
        <CoordsInput
          initialData={coordsData}
          onChange={setCoordsData}
        />
      )}

      <Button
        title="חישוב קוארדינטות"
        onPress={handleCalculate}
        disabled={isCalculateDisabled || isCalculating}
        theme="primary"
      />

      <ConversionResults
        title="תוצאות המרה"
        fields={getResultFields()}
      />

      <Button
        title="הוסף מטרה"
        onPress={handleSave}
        disabled={!hasResults}
        theme="success"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 
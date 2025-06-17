import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import { TargetInputs } from '../../../components/calculators/TargetInputs';
import Button from '../../../components/common/Button';
import { DirectionSwitcher } from '../../../components/common/DirectionSwitcher';
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
  const [eastCoord, setEastCoord] = useState('');
  const [northCoord, setNorthCoord] = useState('');
  const [height, setHeight] = useState('');
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
  }, [isReversed, eastCoord, northCoord, height, azimuth, distance, elevation]);

  const getInputFields = (): CalculatorField[] => {

    const coordinateFields: CalculatorField[] = [
      {
        label: 'נ.צ מזרחי',
        value: eastCoord,
        onChange: setEastCoord,
        keyboardType: 'numeric',
      },
      {
        label: 'נ.צ צפוני',
        value: northCoord,
        onChange: setNorthCoord,
        keyboardType: 'numeric',
        prefixLength: 1,
      },
      {
        label: 'גובה',
        value: height,
        onChange: setHeight,
        keyboardType: 'numeric',
      },
    ];

    const azimuthFields: CalculatorField[] = [
      {
        label: 'אזימוט (אלפיות)',
        value: azimuth,
        onChange: setAzimuth,
        keyboardType: 'numeric',
      },
      {
        label: 'טווח (מטרים)',
        value: distance,
        onChange: setDistance,
        keyboardType: 'numeric',
      },
      {
        label: 'זוהר',
        value: elevation,
        onChange: setElevation,
        keyboardType: 'numeric',
      },
    ];

    return [...(isReversed ? azimuthFields : coordinateFields)];
  };

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
      if (!eastCoord) return 'חסר נ.צ מזרחי';
      if (!northCoord) return 'חסר נ.צ צפוני';
      if (!height) return 'חסר גובה';
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
          height,
          northCoord,
          eastCoord,
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

  const isCalculateDisabled = !selfLocation.height || !selfLocation.northCoord || !selfLocation.eastCoord ||
    (isReversed ? (!azimuth || !distance || !elevation) : (!eastCoord || !northCoord || !height));

  return (
    <ScrollView style={styles.container}>
      <SelfLocation />
      
      <DirectionSwitcher
        isReversed={isReversed}
        onToggle={() => setIsReversed(!isReversed)}
        leftLabel="נ.צ + גובה"
        rightLabel="אזימוט + טווח + זהר"
      />

      <TargetInputs fields={getInputFields()} />

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
        title="שמירה"
        onPress={() => {}}
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
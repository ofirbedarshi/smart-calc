import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import { TargetInputs } from '../../../components/calculators/TargetInputs';
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
  const [targetName, setTargetName] = useState('');
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
    const commonFields: CalculatorField[] = [
      {
        label: 'שם מטרה',
        value: targetName,
        onChange: setTargetName,
      },
    ];

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

    return [...commonFields, ...(isReversed ? azimuthFields : coordinateFields)];
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

      <TouchableOpacity 
        style={[styles.calculateButton, isCalculateDisabled && styles.calculateButtonDisabled]} 
        onPress={handleCalculate}
        disabled={isCalculateDisabled || isCalculating}
      >
        {isCalculating ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.calculateButtonText}>חישוב קוארדינטות</Text>
        )}
      </TouchableOpacity>

      <ConversionResults
        title="תוצאות המרה"
        fields={getResultFields()}
      />

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>שמירה</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  saveButton: {
    backgroundColor: '#34C759',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
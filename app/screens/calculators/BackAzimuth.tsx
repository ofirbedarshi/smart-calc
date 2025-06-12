import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ConversionResults } from '../../../components/calculators/ConversionResults';
import { TargetCoordinates } from '../../../components/calculators/TargetCoordinates';
import { CalculatorField } from '../../../types/calculator';

export default function BackAzimuth() {
  // Target 1 states
  const [target1North, setTarget1North] = useState('');
  const [target1East, setTarget1East] = useState('');
  const [target1Distance, setTarget1Distance] = useState('');
  const [target1Elevation, setTarget1Elevation] = useState('');
  const [target1Height, setTarget1Height] = useState('');

  // Target 2 states
  const [target2North, setTarget2North] = useState('');
  const [target2East, setTarget2East] = useState('');
  const [target2Distance, setTarget2Distance] = useState('');
  const [target2Elevation, setTarget2Elevation] = useState('');
  const [target2Height, setTarget2Height] = useState('');

  // Results state
  const [results, setResults] = useState({
    northCoord: '',
    eastCoord: '',
  });

  const getTarget1Fields = (): CalculatorField[] => [
    {
      label: 'נ.צ צפוני',
      value: target1North,
      onChange: setTarget1North,
      keyboardType: 'numeric',
    },
    {
      label: 'נ.צ מזרחי',
      value: target1East,
      onChange: setTarget1East,
      keyboardType: 'numeric',
    },
    {
      label: 'טווח',
      value: target1Distance,
      onChange: setTarget1Distance,
      keyboardType: 'numeric',
    },
    {
      label: 'זוה״ר (מעלות) (אופציונלי)',
      value: target1Elevation,
      onChange: setTarget1Elevation,
      keyboardType: 'numeric',
    },
    {
      label: 'גובה (מטרים) (אופציונלי)',
      value: target1Height,
      onChange: setTarget1Height,
      keyboardType: 'numeric',
    },
  ];

  const getTarget2Fields = (): CalculatorField[] => [
    {
      label: 'נ.צ צפוני',
      value: target2North,
      onChange: setTarget2North,
      keyboardType: 'numeric',
    },
    {
      label: 'נ.צ מזרחי',
      value: target2East,
      onChange: setTarget2East,
      keyboardType: 'numeric',
    },
    {
      label: 'טווח',
      value: target2Distance,
      onChange: setTarget2Distance,
      keyboardType: 'numeric',
    },
    {
      label: 'זוה״ר (מעלות) (אופציונלי)',
      value: target2Elevation,
      onChange: setTarget2Elevation,
      keyboardType: 'numeric',
    },
    {
      label: 'גובה (מטרים) (אופציונלי)',
      value: target2Height,
      onChange: setTarget2Height,
      keyboardType: 'numeric',
    },
  ];

  const getResultFields = (): CalculatorField[] => [
    {
      label: 'נ.צ צפוני',
      value: results.northCoord,
    },
    {
      label: 'נ.צ מזרחי',
      value: results.eastCoord,
    },
  ];

  const validateInputs = (): string | null => {
    if (!target1North || !target1East || !target1Distance) {
      return 'חסרים נתונים במטרה 1';
    }
    if (!target2North || !target2East || !target2Distance) {
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
    // Calculation logic will be added later
  };

  const isCalculateDisabled = !target1North || !target1East || !target1Distance ||
    !target2North || !target2East || !target2Distance;

  return (
    <ScrollView style={styles.container}>
      <TargetCoordinates
        title="מטרה 1"
        fields={getTarget1Fields()}
      />

      <TargetCoordinates
        title="מטרה 2"
        fields={getTarget2Fields()}
      />

      <TouchableOpacity 
        style={[styles.calculateButton, isCalculateDisabled && styles.calculateButtonDisabled]} 
        onPress={handleCalculate}
        disabled={isCalculateDisabled}
      >
        <Text style={styles.calculateButtonText}>חישוב נ.צ עצמי</Text>
      </TouchableOpacity>

      <ConversionResults
        title="תוצאות חישוב"
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
    backgroundColor: '#f5f5f5',
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
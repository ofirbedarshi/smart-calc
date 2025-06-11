import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SelfLocation } from '../../../components/SelfLocation';
import { ConversionResults, CoordsConversionCalc } from '../../../services/calculators/CoordsConversionCalc';
import { LocationData } from '../../../services/LocationService';
import { useLocationStore } from '../../../stores/locationStore';

export default function CoordinateConversion() {
  const { locationData: selfLocation } = useLocationStore();
  const [targetName, setTargetName] = useState('');
  const [eastCoord, setEastCoord] = useState('');
  const [northCoord, setNorthCoord] = useState('');
  const [height, setHeight] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);
    
    const emptyResults = {
        azimuth: '',
        distance: '',
        elevation: '',
    }
    const [results, setResults] = useState<ConversionResults>(emptyResults);
    
    useEffect(() => {
        setResults(emptyResults);
    }, [selfLocation, eastCoord, northCoord, height]);
    
    

  const validateInputs = (): string | null => {
    if (!selfLocation.height || !selfLocation.northCoord || !selfLocation.eastCoord) {
      return 'חסר מיקום עצמי';
    }
    if (!eastCoord) {
      return 'חסר נ.צ מזרחי';
    }
    if (!northCoord) {
      return 'חסר נ.צ צפוני';
    }
    if (!height) {
      return 'חסר גובה';
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
      const targetLocation: LocationData = {
        height,
        northCoord,
        eastCoord,
      };

      const calculationResults = CoordsConversionCalc.calc(selfLocation, targetLocation);
      setResults(calculationResults);
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בחישוב הקואורדינטות');
      console.error('[CoordinateConversion] Calculation error:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const isCalculateDisabled = !eastCoord || !northCoord || !height || !selfLocation.height || !selfLocation.northCoord || !selfLocation.eastCoord;

  return (
    <ScrollView style={styles.container}>
      <SelfLocation />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="שם מטרה"
          value={targetName}
          onChangeText={setTargetName}
        />
        <TextInput
          style={styles.input}
          placeholder="נ.צ מזרחי"
          value={eastCoord}
          onChangeText={setEastCoord}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="נ.צ צפוני"
          value={northCoord}
          onChangeText={setNorthCoord}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="גובה"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
        />
      </View>

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

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsHeader}>תוצאות המרה</Text>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>אזימוט (מעלות)</Text>
          <Text style={styles.resultValue}>{results.azimuth}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>טווח (מטרים)</Text>
          <Text style={styles.resultValue}>{results.distance}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>זוהר (מעלות)</Text>
          <Text style={styles.resultValue}>{results.elevation}</Text>
        </View>
      </View>

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
  inputContainer: {
    padding: 16,
    gap: 12,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: 'right',
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
  resultsContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
  },
  resultsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  resultItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
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
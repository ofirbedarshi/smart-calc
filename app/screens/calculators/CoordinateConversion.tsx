import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SelfLocation } from '../../../components/SelfLocation';

interface ConversionResults {
  azimuth: string;
  range: string;
  elevation: string;
}

export default function CoordinateConversion() {
  const [targetName, setTargetName] = useState('');
  const [eastCoord, setEastCoord] = useState('');
  const [northCoord, setNorthCoord] = useState('');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState<ConversionResults>({
    azimuth: '',
    range: '',
    elevation: '',
  });

  const handleCalculate = () => {
    // TODO: Implement calculation logic
    console.log('Calculating coordinates...');
  };

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

      <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
        <Text style={styles.calculateButtonText}>חישוב קוארדינטות</Text>
      </TouchableOpacity>

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsHeader}>תוצאות המרה</Text>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>אזימוט (אלפיות)</Text>
          <Text style={styles.resultValue}>{results.azimuth}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>טווח (מטרים)</Text>
          <Text style={styles.resultValue}>{results.range}</Text>
        </View>
        <View style={styles.resultItem}>
          <Text style={styles.resultLabel}>זוהר</Text>
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
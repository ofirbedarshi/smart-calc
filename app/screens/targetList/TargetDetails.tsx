import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface TargetData {
  northCoord: string;
  eastCoord: string;
  height: string;
  distance: string;
  elevation: string;
  azimuth: string;
}

export default function TargetDetails() {
  const params = useLocalSearchParams();
  const target = JSON.parse(params.target as string) as TargetData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>נתוני מטרה</Text>
        <View style={styles.field}>
          <Text style={styles.label}>נ.צ צפוני:</Text>
          <Text style={styles.value}>{target.northCoord}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>נ.צ מזרחי:</Text>
          <Text style={styles.value}>{target.eastCoord}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>גובה:</Text>
          <Text style={styles.value}>{target.height}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>טווח:</Text>
          <Text style={styles.value}>{target.distance}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>זוהר:</Text>
          <Text style={styles.value}>{target.elevation}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>אזימוט:</Text>
          <Text style={styles.value}>{target.azimuth}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  field: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 
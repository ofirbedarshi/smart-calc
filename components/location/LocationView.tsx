import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocationData } from '../../services/LocationService';

interface LocationViewProps {
  locationData: LocationData;
}

export const LocationView: React.FC<LocationViewProps> = ({ locationData }) => {
  if (!locationData.northCoord || !locationData.eastCoord || !locationData.height) {
    return (
      <View style={styles.container}>
        <Text style={styles.unknownText}>מיקום לא ידוע</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
      <View style={styles.coordBox}>
          <Text style={styles.identifier}>גו'</Text>
          <Text style={styles.value}>{locationData.height}</Text>
        </View>
        <View style={styles.coordBox}>
          <Text style={styles.identifier}>צפ'</Text>
          <Text style={styles.value}>{locationData.northCoord}</Text>
        </View>
       
        <View style={styles.coordBox}>
          <Text style={styles.identifier}>מז'</Text>
          <Text style={styles.value}>{locationData.eastCoord}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 4,
    rowGap: '10px'
  },
  coordBox: {
    backgroundColor: '#e6e8e5',
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 5,
    minWidth: 80,
    minHeight: 32,
    marginHorizontal: 2,
    paddingHorizontal: 4,
    paddingVertical: 4,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  identifier: {
    color: '#444',
    fontSize: 15,
    marginLeft: 6,
  },
  value: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 4,
  },
  unknownText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
}); 
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EditableData } from '../../../components/EditableData';
import Button from '../../../components/common/Button';
import { CoordsConversionCalc } from '../../../services/calculators/CoordsConversionCalc';
import { useLocationStore } from '../../../stores/locationStore';

interface TargetData {
  northCoord: string;
  eastCoord: string;
  height: string;
}

interface CalculatedData {
  azimuth: string;
  distance: string;
  elevation: string;
}

interface TargetFields {
  name: string;
  description: string;
  northCoord: string;
  eastCoord: string;
  height: string;
  azimuth: string;
  distance: string;
  elevation: string;
  isAttacked: string;
  time: string;
  ammunition: string;
  team: string;
  date: string;
  notes: string;
}

export default function TargetDetails() {
  const params = useLocalSearchParams();
  const target = JSON.parse(params.target as string) as TargetData;
  const { locationData: selfLocation } = useLocationStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [calculatedData, setCalculatedData] = useState<CalculatedData>({
    azimuth: '',
    distance: '',
    elevation: '',
  });
  const [targetFields, setTargetFields] = useState<TargetFields>({
    name: '',
    description: '',
    northCoord: target.northCoord,
    eastCoord: target.eastCoord,
    height: target.height,
    azimuth: '',
    distance: '',
    elevation: '',
    isAttacked: '',
    time: '',
    ammunition: '',
    team: '',
    date: '',
    notes: '',
  });

  useEffect(() => {
    if (selfLocation.height && selfLocation.northCoord && selfLocation.eastCoord) {
      const targetLocation = {
        height: target.height,
        northCoord: target.northCoord,
        eastCoord: target.eastCoord,
      };
      const results = CoordsConversionCalc.calc(selfLocation, targetLocation);
      setCalculatedData({
        azimuth: results.azimuth,
        distance: results.distance,
        elevation: results.elevation,
      });
      setTargetFields(prev => ({
        ...prev,
        azimuth: results.azimuth,
        distance: results.distance,
        elevation: results.elevation,
      }));
    }
  }, [target, selfLocation]);

  const handleFieldChange = (field: keyof TargetFields, value: string) => {
    setTargetFields(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditMode(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={() => setIsEditMode(!isEditMode)}
          title={isEditMode ? 'סגור' : 'ערוך'}
          theme="primary"
        />
        {isEditMode && (
          <Button
            onPress={handleSave}
            title="שמור"
            theme="success"
          />
        )}
      </View>

      <View style={styles.section}>
        <EditableData
          label="שם מטרה"
          value={targetFields.name}
          onChange={(value) => handleFieldChange('name', value)}
          editMode={isEditMode}
          placeholder="הזן שם מטרה"
        />
        <EditableData
          label="תיאור"
          value={targetFields.description}
          onChange={(value) => handleFieldChange('description', value)}
          editMode={isEditMode}
          placeholder="הזן תיאור"
        />
        <EditableData
          label="נ.צ צפוני"
          value={targetFields.northCoord}
          onChange={(value) => handleFieldChange('northCoord', value)}
          editMode={isEditMode}
          type="number"
          placeholder="הזן נ.צ צפוני"
        />
        <EditableData
          label="נ.צ מזרחי"
          value={targetFields.eastCoord}
          onChange={(value) => handleFieldChange('eastCoord', value)}
          editMode={isEditMode}
          type="number"
          placeholder="הזן נ.צ מזרחי"
        />
        <EditableData
          label="גובה"
          value={targetFields.height}
          onChange={(value) => handleFieldChange('height', value)}
          editMode={isEditMode}
          type="number"
          placeholder="הזן גובה"
        />
        <EditableData
          label="אזימוט"
          value={targetFields.azimuth}
          onChange={(value) => handleFieldChange('azimuth', value)}
          editMode={isEditMode}
          type="number"
          placeholder="הזן אזימוט"
        />
        <EditableData
          label="טווח"
          value={targetFields.distance}
          onChange={(value) => handleFieldChange('distance', value)}
          editMode={isEditMode}
          type="number"
          placeholder="הזן טווח"
        />
        <EditableData
          label="זוהר"
          value={targetFields.elevation}
          onChange={(value) => handleFieldChange('elevation', value)}
          editMode={isEditMode}
          type="number"
          placeholder="הזן זוהר"
        />
        <EditableData
          label="האם נתקפה"
          value={targetFields.isAttacked}
          onChange={(value) => handleFieldChange('isAttacked', value)}
          editMode={isEditMode}
          placeholder="הזן סטטוס תקיפה"
        />
        <EditableData
          label="שעה"
          value={targetFields.time}
          onChange={(value) => handleFieldChange('time', value)}
          editMode={isEditMode}
          placeholder="הזן שעה"
        />
        <EditableData
          label="חימוש"
          value={targetFields.ammunition}
          onChange={(value) => handleFieldChange('ammunition', value)}
          editMode={isEditMode}
          placeholder="הזן חימוש"
        />
        <EditableData
          label="חוליה"
          value={targetFields.team}
          onChange={(value) => handleFieldChange('team', value)}
          editMode={isEditMode}
          placeholder="הזן חוליה"
        />
        <EditableData
          label="תאריך"
          value={targetFields.date}
          onChange={(value) => handleFieldChange('date', value)}
          editMode={isEditMode}
          placeholder="הזן תאריך"
        />
        <EditableData
          label="הערות"
          value={targetFields.notes}
          onChange={(value) => handleFieldChange('notes', value)}
          editMode={isEditMode}
          placeholder="הזן הערות"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
}); 
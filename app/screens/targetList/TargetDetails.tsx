import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/common/Button';
import { DatePicker } from '../../../components/common/DatePicker';
import { Dropdown } from '../../../components/common/Dropdown';
import PrefixInput from '../../../components/common/PrefixInput';
import { TimePicker } from '../../../components/common/TimePicker';
import { EditableData } from '../../../components/EditableData';
import { CoordsConversionCalc } from '../../../services/calculators/CoordsConversionCalc';
import { useLocationStore } from '../../../stores/locationStore';
import { useTargetStore } from '../../../stores/targetStore';

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
  const { addTarget, loading, error } = useTargetStore();
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
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (selfLocation.height && selfLocation.northCoord && selfLocation.eastCoord) {
      const targetLocation = {
        height: target.height,
        northCoord: target.northCoord,
        eastCoord: target.eastCoord,
      };
      const results = CoordsConversionCalc.calc(selfLocation, targetLocation);
      setTargetFields(prev => ({
        ...prev,
        azimuth: results.azimuth,
        distance: results.distance,
        elevation: results.elevation,
      }));
    }
  }, [target.northCoord, target.eastCoord, target.height, selfLocation.northCoord, selfLocation.eastCoord, selfLocation.height]);

  const handleFieldChange = (field: keyof TargetFields, value: string) => {
    setTargetFields(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await addTarget({
        ...targetFields,
        // id and createdAt will be added by the service
      });
      Alert.alert('הצלחה', 'שמירה בוצעה בהצלחה');
      setIsEditMode(false);
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירה, נסה שוב');
    }
  };

  const yesNoOptions = [
    { label: 'כן', value: 'כן' },
    { label: 'לא', value: 'לא' },
  ];

  const renderItem = () => (
    <View style={styles.section}>
      <View style={styles.headerActions}>
        <TouchableOpacity
          onPress={() => setIsEditMode(!isEditMode)}
          style={styles.iconButton}
        >
          <Ionicons
            name={isEditMode ? 'close' : 'pencil'}
            size={20}
            color={isEditMode ? '#FF3B30' : '#007AFF'}
          />
        </TouchableOpacity>
      </View>

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
        editComponent={
          <PrefixInput
            value={targetFields.northCoord}
            onChange={(value) => handleFieldChange('northCoord', value)}
            prefixLength={1}
            type="number"
            placeholder="הזן נ.צ צפוני"
          />
        }
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
        editComponent={
          <Dropdown
            options={yesNoOptions}
            value={targetFields.isAttacked}
            onChange={(value) => handleFieldChange('isAttacked', value)}
          />
        }
      />
      <EditableData
        label="שעה"
        value={targetFields.time}
        onChange={(value) => handleFieldChange('time', value)}
        editMode={isEditMode}
        editComponent={
          <TimePicker
            value={targetFields.time}
            onChange={(value) => handleFieldChange('time', value)}
            placeholder="הזן שעה"
          />
        }
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
        editComponent={
          <DatePicker
            value={targetFields.date}
            onChange={(value) => handleFieldChange('date', value)}
            placeholder="הזן תאריך"
          />
        }
      />
      <EditableData
        label="הערות"
        value={targetFields.notes}
        onChange={(value) => handleFieldChange('notes', value)}
        editMode={isEditMode}
        placeholder="הזן הערות"
      />
    </View>
  );

  return (
    <>
      <FlatList
        data={[1]} // We only need one item
        renderItem={renderItem}
        keyExtractor={() => '1'}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.saveContainer}>
        <Button
          title="שמור"
          onPress={handleSave}
          disabled={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  feedback: {
    color: 'green',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
}); 
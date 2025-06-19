import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/common/Button';
import { DatePicker } from '../../../components/common/DatePicker';
import { Dropdown } from '../../../components/common/Dropdown';
import PrefixInput from '../../../components/common/PrefixInput';
import { TimePicker } from '../../../components/common/TimePicker';
import { EditableData } from '../../../components/EditableData';
import { CoordsConversionCalc } from '../../../services/calculators/CoordsConversionCalc';
import { TargetFields } from '../../../services/TargetService';
import { useLocationStore } from '../../../stores/locationStore';
import { useTargetStore } from '../../../stores/targetStore';

export default function TargetDetails() {
    const params = useLocalSearchParams();
    const target = JSON.parse(params.target as string) as TargetFields;
    const { locationData: selfLocation, loadLocation } = useLocationStore();
    const { addTarget, updateTarget, deleteTarget, loading } = useTargetStore();
    const [isEditMode, setIsEditMode] = useState(false);
    const [targetFields, setTargetFields] = useState<TargetFields>({
        ...{
        name: '',
        description: '',
        northCoord: '',
        eastCoord: '',
        height: '',
        isAttacked: '',
        time: '',
        ammunition: '',
        team: '',
        date: '',
        notes: '',
    }, ...target,
    });
    const router = useRouter();

  // Compute azimuth, distance, elevation live
  const hasCoords = selfLocation.height && selfLocation.northCoord && selfLocation.eastCoord && targetFields.height && targetFields.northCoord && targetFields.eastCoord;
  const computed = hasCoords
    ? CoordsConversionCalc.calc(selfLocation, {
        height: targetFields.height,
        northCoord: targetFields.northCoord,
        eastCoord: targetFields.eastCoord,
      })
    : { azimuth: '', distance: '', elevation: '' };

  useEffect(() => {
    if (!hasCoords) loadLocation();
  }, [hasCoords,loadLocation, targetFields.northCoord, targetFields.eastCoord, targetFields.height, selfLocation.northCoord, selfLocation.eastCoord, selfLocation.height]);

  const handleFieldChange = (field: keyof TargetFields, value: string) => {
    setTargetFields(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateFields = () => {
    if (targetFields.name === '' || targetFields.description === '') {
      Alert.alert('שגיאה', 'שם המטרה והתיאור הם שדות חובה');
      return false;
    }
    return true;
  };

  const handleUpdateTarget = async () => {
    await updateTarget(targetFields.id, targetFields);
    Alert.alert('הצלחה', 'עריכה בוצעה בהצלחה');
    setIsEditMode(false);
  };

  const handleAddTarget = async () => {
    const newTarget = await addTarget(targetFields);
    setTargetFields(newTarget);
    Alert.alert('הצלחה', 'שמירה בוצעה בהצלחה');
    setIsEditMode(false);
  };

  const handleSave = async () => {
    try {
      if (!validateFields()) return;
      
      if (targetFields.id) {
        await handleUpdateTarget();
      } else {
        await handleAddTarget();
      }
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירה, נסה שוב');
    }
  };

  const yesNoOptions = [
    { label: 'כן', value: 'כן' },
    { label: 'לא', value: 'לא' },
  ];
    
    const handleDelete = async () => {
        try {
            await deleteTarget(targetFields.id!);
            Alert.alert('מחיקה', 'המטרה נמחקה בהצלחה');
            router.push('/TargetsList');
        } catch (e) {
            console.log(e);
            Alert.alert('שגיאה', 'אירעה שגיאה במחיקה, נסה שוב');
        }
    };

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
        onChange={value => handleFieldChange('name', value)}
        editMode={isEditMode}
        placeholder="הזן שם מטרה"
      />
      <EditableData
        label="תיאור"
        value={targetFields.description}
        onChange={value => handleFieldChange('description', value)}
        editMode={isEditMode}
        placeholder="הזן תיאור"
      />
      <EditableData
        label="נ.צ צפוני"
        value={targetFields.northCoord}
        onChange={value => handleFieldChange('northCoord', value)}
        editMode={isEditMode}
        editComponent={
          <PrefixInput
            value={targetFields.northCoord}
            onChange={value => handleFieldChange('northCoord', value)}
            prefixLength={1}
            type="number"
            placeholder="הזן נ.צ צפוני"
          />
        }
      />
      <EditableData
        label="נ.צ מזרחי"
        value={targetFields.eastCoord}
        onChange={value => handleFieldChange('eastCoord', value)}
        editMode={isEditMode}
        type="number"
        placeholder="הזן נ.צ מזרחי"
      />
      <EditableData
        label="גובה"
        value={targetFields.height}
        onChange={value => handleFieldChange('height', value)}
        editMode={isEditMode}
        type="number"
        placeholder="הזן גובה"
      />
      <EditableData
        label="אזימוט"
        value={computed.azimuth}
        onChange={() => {}}
        editMode={isEditMode}
        type="number"
        placeholder="הזן אזימוט"
        disabled={true}
      />
      <EditableData
        label="טווח"
        value={computed.distance}
        onChange={() => {}}
        editMode={isEditMode}
        type="number"
        placeholder="הזן טווח"
        disabled={true}
      />
      <EditableData
        label="זוהר"
        value={computed.elevation}
        onChange={() => {}}
        editMode={isEditMode}
        type="number"
        placeholder="הזן זוהר"
        disabled={true}
      />
      <EditableData
        label="האם נתקפה"
        value={targetFields.isAttacked}
        onChange={value => handleFieldChange('isAttacked', value)}
        editMode={isEditMode}
        editComponent={
          <Dropdown
            options={yesNoOptions}
            value={targetFields.isAttacked}
            onChange={value => handleFieldChange('isAttacked', value)}
          />
        }
      />
      <EditableData
        label="שעה"
        value={targetFields.time}
        onChange={value => handleFieldChange('time', value)}
        editMode={isEditMode}
        editComponent={
          <TimePicker
            value={targetFields.time}
            onChange={value => handleFieldChange('time', value)}
            placeholder="הזן שעה"
          />
        }
      />
      <EditableData
        label="חימוש"
        value={targetFields.ammunition}
        onChange={value => handleFieldChange('ammunition', value)}
        editMode={isEditMode}
        placeholder="הזן חימוש"
      />
      <EditableData
        label="חוליה"
        value={targetFields.team}
        onChange={value => handleFieldChange('team', value)}
        editMode={isEditMode}
        placeholder="הזן חוליה"
      />
      <EditableData
        label="תאריך"
        value={targetFields.date}
        onChange={value => handleFieldChange('date', value)}
        editMode={isEditMode}
        editComponent={
          <DatePicker
            value={targetFields.date}
            onChange={value => handleFieldChange('date', value)}
            placeholder="הזן תאריך"
          />
        }
      />
      <EditableData
        label="הערות"
        value={targetFields.notes}
        onChange={value => handleFieldChange('notes', value)}
        editMode={isEditMode}
        placeholder="הזן הערות"
      />
    </View>
  );

  return (
    <>
      <FlatList
        data={[1]}
        renderItem={renderItem}
        keyExtractor={() => '1'}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.saveContainerRow}>
        <Button
          title="שמור"
          onPress={handleSave}
          disabled={loading}
          small
          theme="primary"
        />
        {targetFields.id && (
          <Button
            title="מחיקה"
            theme="danger"
            onPress={handleDelete}
            small
          />
        )}
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
  saveContainerRow: {
    flexDirection: 'row-reverse',
    gap: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}); 
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import Button from '../../../components/common/Button';
import DeleteButtonWithConfirm from '../../../components/common/DeleteButtonWithConfirm';
import { CoordsConversionCalc } from '../../../services/calculators/CoordsConversionCalc';
import { TargetFields } from '../../../services/TargetService';
import { useLocationStore } from '../../../stores/locationStore';
import { useTargetStore } from '../../../stores/targetStore';
import FieldSection from './FieldSection';

// Field definitions and options outside the component for clarity
const EMPTY_TARGET: TargetFields = {
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
};

export default function TargetDetails() {
  const params = useLocalSearchParams();
  const target = JSON.parse(params.target as string) as TargetFields;
  const { locationData: selfLocation, loadLocation } = useLocationStore();
  const { addTarget, updateTarget, deleteTarget, loading } = useTargetStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [targetFields, setTargetFields] = useState<TargetFields>({ ...EMPTY_TARGET, ...target });
  const router = useRouter();

  // Compute azimuth, distance, elevation live
  const hasCoords = Boolean(
    selfLocation.height && selfLocation.northCoord && selfLocation.eastCoord &&
    targetFields.height && targetFields.northCoord && targetFields.eastCoord
  );
  const computed = hasCoords
    ? CoordsConversionCalc.calc(selfLocation, {
        height: targetFields.height,
        northCoord: targetFields.northCoord,
        eastCoord: targetFields.eastCoord,
      })
    : { azimuth: '', distance: '', elevation: '' };

  useEffect(() => {
    if (!hasCoords) loadLocation();
  }, [hasCoords, loadLocation, targetFields.northCoord, targetFields.eastCoord, targetFields.height, selfLocation.northCoord, selfLocation.eastCoord, selfLocation.height]);

  // Field change handler
  const handleFieldChange = (field: keyof TargetFields, value: string) => {
    setTargetFields(prev => ({ ...prev, [field]: value }));
  };

  // Validation
  const validateFields = () => {
    if (!targetFields.name || !targetFields.description) {
      Alert.alert('שגיאה', 'שם המטרה והתיאור הם שדות חובה');
      return false;
    }
    return true;
  };

  // Save logic
  const handleSave = async () => {
    try {
      if (!validateFields()) return;
      if (targetFields.id) {
        await updateTarget(targetFields.id as string, targetFields);
        Alert.alert('הצלחה', 'עריכה בוצעה בהצלחה');
        setIsEditMode(false);
      } else {
        const newTarget = await addTarget(targetFields);
        setTargetFields(newTarget);
        Alert.alert('הצלחה', 'שמירה בוצעה בהצלחה');
        setIsEditMode(false);
      }
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירה, נסה שוב');
    }
  };

  // Delete logic
  const handleDelete = async () => {
    try {
      if (!targetFields.id) return;
      await deleteTarget(targetFields.id);
      Alert.alert('מחיקה', 'המטרה נמחקה בהצלחה');
      router.push('/TargetsList');
    } catch (e) {
      console.log(e);
      Alert.alert('שגיאה', 'אירעה שגיאה במחיקה, נסה שוב');
    }
  };

  return (
    <>
      <FlatList
        data={[1]}
        renderItem={() => (
          <FieldSection
            targetFields={targetFields}
            isEditMode={isEditMode}
            onFieldChange={handleFieldChange}
            computed={computed}
            onToggleEdit={() => setIsEditMode(!isEditMode)}
          />
        )}
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
          <DeleteButtonWithConfirm
            items={[typeof targetFields.name === 'string' ? targetFields.name : '']}
            onDelete={handleDelete}
            buttonProps={{
              title: 'מחיקה',
              theme: 'danger',
              small: true,
              onPress: () => {},
            }}
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
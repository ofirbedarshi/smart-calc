import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTzagonPhotosStore } from '../stores/tzagonPhotosStore';
import { EditableData } from './EditableData';
import Button from './common/Button';
import { DatePicker } from './common/DatePicker';
import DeleteButtonWithConfirm from './common/DeleteButtonWithConfirm';
import { TimePicker } from './common/TimePicker';
import { TzagonData } from './common/tzagonTypes';

interface TzagonDetailsProps {
  tzagonId?: string;
  onDeleteSuccess?: () => void;
}

export default function TzagonDetails({ tzagonId, onDeleteSuccess }: TzagonDetailsProps) {
  const { tzagons, upsertTzagon, deleteTzagon, loading } = useTzagonPhotosStore();

  const blankTzagon: TzagonData = {
    id: '',
    masadTzagon: '',
    deviceType: '',
    date: '',
    time: '',
    targetNameAndDescription: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // Only recalculate originalTzagon when tzagonId changes
  const getOriginalTzagon = () => {
    if (tzagonId) {
      return tzagons.find(t => t.id === tzagonId) || blankTzagon;
    }
    return blankTzagon;
  };

  const [isEditMode, setIsEditMode] = useState(!tzagonId);
  const [tzagon, setTzagon] = useState<TzagonData | undefined>(getOriginalTzagon());

  useEffect(() => {
    setTzagon(getOriginalTzagon());
    setIsEditMode(!tzagonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tzagonId]);

  const handleFieldChange = (field: keyof TzagonData, value: string) => {
    setTzagon((prev: TzagonData | undefined) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = async () => {
    if (!tzagon) return;
    try {
      const savedTzagon = await upsertTzagon(tzagon);
      setTzagon(savedTzagon); // Update local state with new id
      Alert.alert('הצלחה', 'הצגון נשמר בהצלחה');
      setIsEditMode(false);
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירה, נסה שוב');
    }
  };

  const handleDelete = async () => {
    if (!tzagon?.id) return;
    try {
      await deleteTzagon(tzagon.id);
      Alert.alert('מחיקה', 'הצגון נמחק בהצלחה');
      if (onDeleteSuccess) onDeleteSuccess();
      // Optionally: navigation.goBack();
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה במחיקה, נסה שוב');
    }
  };

  if (!tzagon) {
    return <View style={styles.container}><Text style={{textAlign: 'center', marginTop: 32}}>הצגון לא נמצא</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <View style={styles.headerActions}>
            {tzagonId && (
              <TouchableOpacity onPress={() => setIsEditMode((e: boolean) => !e)} style={styles.iconButton}>
                <Ionicons
                  name={isEditMode ? 'close' : 'pencil'}
                  size={20}
                  color={isEditMode ? '#FF3B30' : '#007AFF'}
                />
              </TouchableOpacity>
            )}
          </View>
          <EditableData
            label="שם מטרה + תיאור הסרטון"
            value={tzagon.targetNameAndDescription}
            onChange={(value: string) => handleFieldChange('targetNameAndDescription', value)}
            editMode={isEditMode}
            placeholder="הזן שם מטרה + תיאור הסרטון"
          />
          <EditableData
            label="מסד צגון"
            value={tzagon.masadTzagon}
            onChange={(value: string) => handleFieldChange('masadTzagon', value)}
            editMode={isEditMode}
            placeholder="הזן מסד צגון"
          />
          <EditableData
            label="סוג אמצעי"
            value={tzagon.deviceType}
            onChange={(value: string) => handleFieldChange('deviceType', value)}
            editMode={isEditMode}
            placeholder="הזן סוג אמצעי"
          />
          <EditableData
            label="תאריך"
            value={tzagon.date}
            onChange={(value: string) => handleFieldChange('date', value)}
            editMode={isEditMode}
            editComponent={
              <DatePicker
                value={tzagon.date}
                onChange={(value: string) => handleFieldChange('date', value)}
                placeholder="הזן תאריך"
              />
            }
          />
          <EditableData
            label="שעה"
            value={tzagon.time}
            onChange={(value: string) => handleFieldChange('time', value)}
            editMode={isEditMode}
            editComponent={
              <TimePicker
                value={tzagon.time}
                onChange={(value: string) => handleFieldChange('time', value)}
                placeholder="הזן שעה"
              />
            }
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.saveContainerRow}>
        {isEditMode && (
          <Button
            title="שמור"
            onPress={handleSave}
            disabled={loading}
            small
            theme="primary"
          />
        )}
        {tzagon.id && (
          <DeleteButtonWithConfirm
            items={[tzagon.targetNameAndDescription || '']}
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
    </View>
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
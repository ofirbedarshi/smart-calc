import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import Button from '../../../components/common/Button';
import DeleteButtonWithConfirm from '../../../components/common/DeleteButtonWithConfirm';
import { TargetEntity } from '../../../entities';
import { TargetFields } from '../../../services/TargetService';
import { useLocationStore } from '../../../stores/locationStore';
import { useTargetStore } from '../../../stores/targetStore';
import FieldSection from './FieldSection';

export default function TargetDetails() {
  const params = useLocalSearchParams();
  const target = JSON.parse(params.target as string) as TargetFields;
  const { locationData: selfLocation, loadLocation } = useLocationStore();
  const { addTarget, updateTarget, deleteTarget, loading } = useTargetStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [targetEntity, setTargetEntity] = useState<TargetEntity>(() => 
    TargetEntity.fromTargetData(target, selfLocation)
  );
  const router = useRouter();

  // Update target entity when self location changes
  useEffect(() => {
    if (selfLocation) {
      setTargetEntity(prev => {
        const updated = new TargetEntity(prev.data, selfLocation);
        return updated;
      });
    }
  }, [selfLocation]);

  // Load location if not available
  useEffect(() => {
    if (!selfLocation) {
      loadLocation();
    }
  }, [selfLocation, loadLocation]);

  // Field change handler
  const handleFieldChange = (field: keyof TargetFields, value: string) => {
    setTargetEntity(prev => {
      const updated = new TargetEntity(prev.data, selfLocation);
      updated.updateField(field, value);
      return updated;
    });
  };

  // Validation
  const validateFields = () => {
    if (!targetEntity.name || !targetEntity.description) {
      Alert.alert('שגיאה', 'שם המטרה והתיאור הם שדות חובה');
      return false;
    }
    return true;
  };

  // Save logic
  const handleSave = async () => {
    try {
      if (!validateFields()) return;
      if (targetEntity.id) {
        await updateTarget(targetEntity.id, targetEntity.data);
        Alert.alert('הצלחה', 'עריכה בוצעה בהצלחה');
        setIsEditMode(false);
      } else {
        const newTarget = await addTarget(targetEntity.data);
        setTargetEntity(TargetEntity.fromTargetData(newTarget, selfLocation));
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
      if (!targetEntity.id) return;
      await deleteTarget(targetEntity.id);
      Alert.alert('מחיקה', 'המטרה נמחקה בהצלחה');
      router.push('/TargetsList');
    } catch (e) {
      console.log(e);
      Alert.alert('שגיאה', 'אירעה שגיאה במחיקה, נסה שוב');
    }
  };

  // Get computed values from the entity getters
  const computed = {
    azimuth: targetEntity.azimuth,
    distance: targetEntity.distance,
    elevation: targetEntity.elevation,
  };

  return (
    <>
      <FlatList
        data={[1]}
        renderItem={() => (
          <FieldSection
            targetFields={targetEntity.data}
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
        {targetEntity.id && (
          <DeleteButtonWithConfirm
            items={[typeof targetEntity.name === 'string' ? targetEntity.name : '']}
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
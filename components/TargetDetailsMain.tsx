import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FieldSection from '../app/screens/targetList/FieldSection';
import { TargetEntity } from '../entities';
import { TargetFields } from '../services/TargetService';
import { useLocationStore } from '../stores/locationStore';
import { useTargetStore } from '../stores/targetStore';
import Button from './common/Button';
import DeleteButtonWithConfirm from './common/DeleteButtonWithConfirm';
import TargetNadbarsSection from './targetList/TargetNadbarsSection';

type RouteParams = {
  targetId?: string;
};

export default function TargetDetailsMain() {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  
  // Parse the target data from the route params
  const target = params?.targetId ? JSON.parse(params.targetId) as TargetFields : {} as TargetFields;
  
  const { locationData: selfLocation, loadLocation } = useLocationStore();
  const { addTarget, updateTarget, deleteTarget, loading } = useTargetStore();
  const [isEditMode, setIsEditMode] = useState(false);
  const [targetEntity, setTargetEntity] = useState<TargetEntity>(() => 
    TargetEntity.fromTargetData(target, selfLocation)
  );
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  // Update target entity when self location changes
  useEffect(() => {
    if (selfLocation) {
      setTargetEntity((prev: TargetEntity) => {
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

  const validateField = (field: keyof TargetFields, value: string | number | undefined): string => {
    const strValue = value === undefined || value === null ? '' : String(value);
    if (field === 'eastCoord') {
      if (!strValue) return 'נ.צ מזרחי הוא שדה חובה';
      if (!/^\d{6}$/.test(strValue)) return 'נ.צ מזרחי חייב להכיל 6 ספרות';
    }
    if (field === 'northCoord') {
      if (!strValue) return 'נ.צ צפוני הוא שדה חובה';
      if (!/^\d{7}$/.test(strValue)) return 'נ.צ צפוני חייב להכיל 7 ספרות';
    }
    if (field === 'name') {
      if (!strValue) return 'שם המטרה הוא שדה חובה';
    }
    if (field === 'description') {
      if (!strValue) return 'תיאור המטרה הוא שדה חובה';
    }
    return '';
  };

  const handleFieldChange = (field: keyof TargetFields, value: string) => {
    setTargetEntity((prev: TargetEntity) => {
      const updated = new TargetEntity(prev.data, selfLocation);
      updated.updateField(field, value);
      return updated;
    });
    setFieldErrors(prev => ({
      ...prev,
      [field]: validateField(field, value)
    }));
  };

  const validateFields = () => {
    // Validate all fields we care about
    const fieldsToValidate: (keyof TargetFields)[] = ['eastCoord', 'northCoord', 'name', 'description'];
    let newErrors: { [key: string]: string } = { ...fieldErrors };
    fieldsToValidate.forEach(field => {
      const value = targetEntity.data[field];
      newErrors[field] = validateField(field, value);
    });
    setFieldErrors(newErrors);
    const hasError = Object.values(newErrors).some(msg => !!msg);
    if (hasError) {
      Alert.alert('שגיאה', 'יש למלא את כל השדות הנדרשים בצורה תקינה');
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
      navigation.goBack();
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
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        <FieldSection
          targetFields={targetEntity.data}
          isEditMode={isEditMode}
          onFieldChange={handleFieldChange}
          computed={computed}
          onToggleEdit={() => setIsEditMode(!isEditMode)}
          errors={fieldErrors}
        />
        {targetEntity.id && (
          <TargetNadbarsSection targetId={targetEntity.id} />
        )}
      </KeyboardAwareScrollView>
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
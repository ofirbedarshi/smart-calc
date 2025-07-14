import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFirePlanStore } from '../stores/firePlanStore';
import Button from './common/Button';
import DeleteButtonWithConfirm from './common/DeleteButtonWithConfirm';
import { FirePlanData } from './common/firePlanTypes';
import { TargetSelectorModal } from './common/TargetSelectorModal';
import { EditableData } from './EditableData';

interface FirePlanDetailsProps {
  firePlanId?: string;
  onDeleteSuccess?: () => void;
}

export default function FirePlanDetails({ firePlanId, onDeleteSuccess }: FirePlanDetailsProps) {
  const { firePlans, upsertFirePlan, deleteFirePlan, loading } = useFirePlanStore();

  const blankFirePlan: FirePlanData = {
    id: '',
    targetName: '',
    ammunition: '',
    note: '',
    time: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const getOriginalFirePlan = () => {
    if (firePlanId) {
      return firePlans.find(f => f.id === firePlanId) || blankFirePlan;
    }
    return blankFirePlan;
  };

  const [isEditMode, setIsEditMode] = useState(!firePlanId);
  const [firePlan, setFirePlan] = useState<FirePlanData | undefined>(getOriginalFirePlan());

  const handleChooseTarget = (target: any) => {
    if (target?.name) {
      setFirePlan((prev: FirePlanData | undefined) => prev ? { ...prev, targetName: target.name } : prev);
    }
  };

  useEffect(() => {
    setFirePlan(getOriginalFirePlan());
    setIsEditMode(!firePlanId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firePlanId]);

  const handleFieldChange = (field: keyof FirePlanData, value: string) => {
    setFirePlan((prev: FirePlanData | undefined) => prev ? { ...prev, [field]: value } : prev);
  };

  const handleSave = async () => {
    if (!firePlan) return;
    try {
      const savedFirePlan = await upsertFirePlan(firePlan);
      setFirePlan(savedFirePlan);
      Alert.alert('הצלחה', 'תוכנית האש נשמרה בהצלחה');
      setIsEditMode(false);
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירה, נסה שוב');
    }
  };

  const handleDelete = async () => {
    if (!firePlan?.id) return;
    try {
      await deleteFirePlan(firePlan.id);
      Alert.alert('מחיקה', 'תוכנית האש נמחקה בהצלחה');
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (e) {
      Alert.alert('שגיאה', 'אירעה שגיאה במחיקה, נסה שוב');
    }
  };

  if (!firePlan) {
    return <View style={styles.container}><Text style={{textAlign: 'center', marginTop: 32}}>תוכנית האש לא נמצאה</Text></View>;
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
            {isEditMode && (
              <TargetSelectorModal onChooseTarget={handleChooseTarget} buttonTitle="בחר מטרה" />
            )}
            {firePlanId && (
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
            label="שם מטרה"
            value={firePlan.targetName}
            onChange={(value: string) => handleFieldChange('targetName', value)}
            editMode={isEditMode}
            placeholder="הזן שם מטרה"
          />
           <EditableData
            label="זמן"
            value={firePlan.time}
            onChange={(value: string) => handleFieldChange('time', value)}
            editMode={isEditMode}
            placeholder="הזן זמן"
          />
          <EditableData
            label="חימוש"
            value={firePlan.ammunition}
            onChange={(value: string) => handleFieldChange('ammunition', value)}
            editMode={isEditMode}
            placeholder="הזן חימוש"
          />
          <EditableData
            label="הערה"
            value={firePlan.note}
            onChange={(value: string) => handleFieldChange('note', value)}
            editMode={isEditMode}
            placeholder="הזן הערה"
            textArea
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
        {firePlan.id && (
          <DeleteButtonWithConfirm
            items={[firePlan.targetName || '']}
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
    alignItems: 'center',
    gap: 8,
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
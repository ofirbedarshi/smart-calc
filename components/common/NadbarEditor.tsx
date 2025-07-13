import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TargetEntity } from '../../entities';
import { useLocationStore } from '../../stores/locationStore';
import { useNadbarStore } from '../../stores/nadbarStore';
import { MergedNadbar, NadbarMerger } from '../../utils/NadbarMerger';
import { TargetToNadbarMapper } from '../../utils/TargetToNadbarMapper';
import Button from './Button';
import Header from './Header';
import NadbarRenderer from './NadbarRenderer';
import { TargetSelectorModal } from './TargetSelectorModal';
import { NadbarTemplate } from './nadbarTypes';

const handleError = (message: string, params?: any) => {
  Alert.alert('שגיאה', `${message}${params ? '\n' + JSON.stringify(params, null, 2) : ''}`);
};

interface NadbarEditorProps {
  template: NadbarTemplate;
  nadbarId?: string;
}

const NadbarEditor: React.FC<NadbarEditorProps> = ({ template, nadbarId }: NadbarEditorProps) => {
  const route = useRoute();
  // Prefer prop, fallback to route.params
  const resolvedNadbarId = nadbarId ?? (route.params && (route.params as any).nadbarId);
  const { locationData: selfLocation } = useLocationStore();
  const { loadNadbars, getNadbarById, upsertNadbar, loading: nadbarLoading } = useNadbarStore();
  const [mergedNadbar, setMergedNadbar] = useState<MergedNadbar | null>(null);

  // Load existing nadbar or create new one in memory
  useEffect(() => {
    const loadNadbar = async () => {
      try {
        await loadNadbars();
        const nadbarData = resolvedNadbarId ? getNadbarById(resolvedNadbarId) : undefined;
        if (nadbarData) {
          const merged = NadbarMerger.merge(template, nadbarData);
          setMergedNadbar(merged);
        } else if (!resolvedNadbarId) {
          // Create new nadbar in memory only (not saved yet)
          const emptyNadbar = NadbarMerger.createEmptyNadbar(template);
          setMergedNadbar(emptyNadbar);
        }
      } catch (error) {
        console.error('[NadbarEditor] Failed to load nadbar:', error);
        Alert.alert('שגיאה', 'שגיאה בטעינת הנדבר');
      }
    };
    loadNadbar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedNadbarId, template]);

  const handleChange = (updatedNadbar: MergedNadbar) => {
    setMergedNadbar(updatedNadbar);
  };

  const handleSave = async () => {
    try {
      if (!mergedNadbar) return;
      const values = NadbarMerger.extractValues(mergedNadbar, mergedNadbar.values);
      const upserted = await upsertNadbar({
        id: mergedNadbar.id || undefined,
        templateId: template.id,
        targetId: mergedNadbar.targetId,
        values
      });
      const savedMerged = NadbarMerger.merge(template, upserted);
      setMergedNadbar(savedMerged);
      Alert.alert('הצלחה', mergedNadbar.id ? 'הנדבר עודכן בהצלחה' : 'הנדבר נשמר בהצלחה');
    } catch (error) {
      console.error('[NadbarEditor] Failed to save nadbar:', error);
      Alert.alert('שגיאה', 'שגיאה בשמירת הנדבר');
    }
  };

  const populateFieldsWithTargetData = (target: any): Record<string, string> | undefined => {
    if (!selfLocation || !mergedNadbar) {
      Alert.alert('שגיאה', 'מיקום עצמי או נדבר לא זמין');
      return;
    }
    const entity = TargetEntity.fromTargetData(target, selfLocation);
    const newValues = { ...mergedNadbar.values };
    mergedNadbar.elements.forEach((element: any) => {
      if (element.type === 'form' && Array.isArray(element.data)) {
        element.data.forEach((field: any) => {
          if ('targetField' in field && field.targetField) {
            const targetValue = TargetToNadbarMapper.getValue(field.targetField, entity);
            newValues[field.fieldId] = targetValue;
          }
        });
      }
      if ((element.type === 'conversation' || element.type === 'text') && 'targetFields' in element && Array.isArray(element.targetFields)) {
        element.targetFields.forEach((varName: any) => {
          const targetValue = TargetToNadbarMapper.getValue(varName, entity);
          newValues[varName] = targetValue;
        });
      }
    });
    return newValues;
  };

  const handleChooseTarget = async (target: any) => {
    try {
      if (!mergedNadbar) {
        throw new Error('Nadbar is missing');
      }
      const newValues = populateFieldsWithTargetData(target);
      setMergedNadbar((prev: MergedNadbar | null) => prev ? { ...prev, targetId: target.id, values: newValues ?? prev.values } : null);
    } catch (error) {
      console.error('[NadbarEditor] Failed to process selected target:', error);
      Alert.alert('שגיאה', 'שגיאה בטעינת נתוני המטרה');
    }
  };

  if (nadbarLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Button title="טוען..." disabled onPress={() => { }} />
      </View>
    );
  }

  if (!mergedNadbar) {
    return (
      <View style={styles.errorContainer}>
        <Button title="שגיאה בטעינת הנדבר" disabled onPress={() => { }} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.stickyButtonContainer}>
        <Button
          title="שמור"
          onPress={handleSave}
          theme="primary"
          small
        />
        <TargetSelectorModal onChooseTarget={handleChooseTarget} />
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        enableOnAndroid
        extraScrollHeight={120}
        keyboardShouldPersistTaps="handled"
      >
        {mergedNadbar && (
          <Header title={mergedNadbar.name} style={{marginBottom: 0, paddingBottom: 0, padding: 8}} />
        )}
        <View style={styles.container}>
          <NadbarRenderer
            nadbar={mergedNadbar}
            onChange={handleChange}
            onError={handleError}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stickyButtonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NadbarEditor; 
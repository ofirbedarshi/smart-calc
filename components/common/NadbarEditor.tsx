import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { TargetEntity } from '../../entities';
import { NadbarService } from '../../services/NadbarService';
import { useLocationStore } from '../../stores/locationStore';
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
}

const NadbarEditor: React.FC<NadbarEditorProps> = ({ template }) => {
  const params = useLocalSearchParams();
  const { locationData: selfLocation } = useLocationStore();
  const [mergedNadbar, setMergedNadbar] = useState<MergedNadbar | null>(null);
  const [loading, setLoading] = useState(true);

  // Load existing nadbar or create new one in memory
  useEffect(() => {
    const loadNadbar = async () => {
      try {
        setLoading(true);

        if (params.nadbarId) {
          // Load existing nadbar
          const nadbarData = await NadbarService.getNadbar(params.nadbarId as string);
          if (nadbarData) {
            const merged = NadbarMerger.merge(template, nadbarData);
            setMergedNadbar(merged);
          }
        } else {
          // Create new nadbar in memory only (not saved yet)
          const emptyNadbar = NadbarMerger.createEmptyNadbar(template);
          setMergedNadbar(emptyNadbar);
        }
      } catch (error) {
        console.error('[NadbarEditor] Failed to load nadbar:', error);
        Alert.alert('שגיאה', 'שגיאה בטעינת הנדבר');
      } finally {
        setLoading(false);
      }
    };

    loadNadbar();
  }, [params.nadbarId, template]);

  const handleChange = (updatedNadbar: MergedNadbar) => {
    // Just update the state, don't save to storage
    setMergedNadbar(updatedNadbar);
  };

  const handleSave = async () => {
    try {
      if (!mergedNadbar) return;
      const values = NadbarMerger.extractValues(mergedNadbar, mergedNadbar.values);

      if (!mergedNadbar.id) {
        // Create new nadbar in storage
        const newNadbarData = await NadbarService.saveNadbar({
          templateId: template.id,
          targetId: mergedNadbar.targetId,
          values: values
        });

        // Update with the real saved nadbar
        const savedMerged = NadbarMerger.merge(template, newNadbarData);
        setMergedNadbar(savedMerged);

        Alert.alert('הצלחה', 'הנדבר נשמר בהצלחה');
      } else {
        // Update existing nadbar
        await NadbarService.updateNadbar(mergedNadbar.id, { values });
        Alert.alert('הצלחה', 'הנדבר עודכן בהצלחה');
      }
    } catch (error) {
      console.error('[NadbarEditor] Failed to save nadbar:', error);
      Alert.alert('שגיאה', 'שגיאה בשמירת הנדבר');
    }
  };

  const populateFieldsWithTargetData = (target: any) => {
    if (!selfLocation || !mergedNadbar) {
      Alert.alert('שגיאה', 'מיקום עצמי או נדבר לא זמין');
      return;
    }

    // Create entity temporarily just to get computed values
    const entity = TargetEntity.fromTargetData(target, selfLocation);

    // Build new values object based on targetField mapping
    const newValues = { ...mergedNadbar.values };
    mergedNadbar.elements.forEach(element => {
      if (element.type === 'form' && Array.isArray(element.data)) {
        element.data.forEach(field => {
          if ('targetField' in field && field.targetField) {
            const targetValue = TargetToNadbarMapper.getValue(field.targetField, entity);
            newValues[field.fieldId] = targetValue;
          }
        });
      }
      // NEW: Also support conversation/text elements with targetFields
      if ((element.type === 'conversation' || element.type === 'text') && 'targetFields' in element && Array.isArray(element.targetFields)) {
        element.targetFields.forEach(varName => {
          const targetValue = TargetToNadbarMapper.getValue(varName, entity);
          newValues[varName] = targetValue;
        });
      }
    });

    setMergedNadbar({ ...mergedNadbar, values: newValues });
  };

  const handleChooseTarget = async (target: any) => {
    try {
      if (!mergedNadbar) return;

      // Update nadbar with targetId
      await NadbarService.updateNadbar(mergedNadbar.id, { targetId: target.id });

      // Update merged nadbar
      setMergedNadbar(prev => prev ? { ...prev, targetId: target.id } : null);

      // Copy target values statically
      populateFieldsWithTargetData(target);

      console.log('Selected target:', target);
    } catch (error) {
      console.error('[NadbarEditor] Failed to process selected target:', error);
      Alert.alert('שגיאה', 'שגיאה בטעינת נתוני המטרה');
    }
  };

  if (loading) {
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
      </ScrollView>
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
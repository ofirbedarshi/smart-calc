import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, View } from 'react-native';
import { TargetEntity } from '../../../entities';
import { NadbarService } from '../../../services/NadbarService';
import { useLocationStore } from '../../../stores/locationStore';
import { TargetToNadbarMapper } from '../../../utils/TargetToNadbarMapper';
import NadbarRenderer from '../../common/NadbarRenderer';
import { NadbarScheme } from '../../common/nadbarTypes';
import { TargetSelectorModal } from '../../common/TargetSelectorModal';
import emptyMaskarScheme from './emptyMaskarScheme.json';

const handleError = (message: string, params?: any) => {
  Alert.alert('שגיאה', `${message}${params ? '\n' + JSON.stringify(params, null, 2) : ''}`);
};

const Maskar: React.FC = () => {
  const params = useLocalSearchParams();
  const { locationData: selfLocation } = useLocationStore();
  const initialScheme: NadbarScheme = params.nadbar
    ? JSON.parse(params.nadbar as string)
    : (emptyMaskarScheme as NadbarScheme);
  const [scheme, setScheme] = useState<NadbarScheme>(initialScheme);

  useEffect(() => {
    if (params.nadbar) {
      setScheme(JSON.parse(params.nadbar as string));
    }
  }, [params.nadbar]);

  const handleChange = (updatedScheme: NadbarScheme) => {
    setScheme(updatedScheme);
  };

  const handleSave = async () => {
    try {
      const saved = await NadbarService.saveNadbar(scheme);
      setScheme(saved);
      Alert.alert('הצלחה', 'הנדבר עודכן בהצלחה');
    } catch (e) {
      Alert.alert('שגיאה', 'שגיאה בשמירה');
    }
  };

  const populateFieldsWithTargetData = (target: any) => {
    if (!selfLocation) {
      Alert.alert('שגיאה', 'מיקום עצמי לא זמין');
      return;
    }

    // Create entity temporarily just to get computed values
    const entity = TargetEntity.fromTargetData(target, selfLocation);
    
    const updatedScheme = { ...scheme };
    
    updatedScheme.elements = updatedScheme.elements.map(element => ({
      ...element,
      data: element.data.map(field => {
        if (field.targetField) {
          const targetValue = TargetToNadbarMapper.getValue(field.targetField, entity);
          return {
            ...field,
            value: targetValue
          };
        }
        return field;
      })
    }));

    setScheme(updatedScheme);
  };

  const handleChooseTarget = async (target: any) => {
    try {
      // Update scheme with targetId (for reference only)
      const updatedScheme = { ...scheme, targetId: target.id };
      setScheme(updatedScheme);
      
      // Copy target values statically - no dynamic connection
      populateFieldsWithTargetData(target);
      
      console.log('Selected target:', target);
    } catch (error) {
      console.error('[Maskar] Failed to process selected target:', error);
      Alert.alert('שגיאה', 'שגיאה בטעינת נתוני המטרה');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="שמור" onPress={handleSave} />
          <TargetSelectorModal onChooseTarget={handleChooseTarget} />
        </View>
        <NadbarRenderer scheme={scheme} onChange={handleChange} onError={handleError} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    marginTop: 24,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default Maskar; 
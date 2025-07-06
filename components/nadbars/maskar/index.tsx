import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, View } from 'react-native';
import { NadbarService } from '../../../services/NadbarService';
import NadbarRenderer from '../../common/NadbarRenderer';
import { NadbarScheme } from '../../common/nadbarTypes';
import { TargetSelectorModal } from '../../common/TargetSelectorModal';
import emptyMaskarScheme from './emptyMaskarScheme.json';

const handleError = (message: string, params?: any) => {
  Alert.alert('שגיאה', `${message}${params ? '\n' + JSON.stringify(params, null, 2) : ''}`);
};

const Maskar: React.FC = () => {
  const params = useLocalSearchParams();
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

  const handleChooseTarget = (target: any) => {
    console.log('Selected target:', target);
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
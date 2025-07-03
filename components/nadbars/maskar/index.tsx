import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import { NadbarService } from '../../../services/NadbarService';
import NadbarRenderer from '../../common/NadbarRenderer';
import { NadbarScheme } from '../../common/nadbarTypes';
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

  return (
    <View style={styles.container}>
      <Button title="שמור" onPress={handleSave} />
      <NadbarRenderer scheme={scheme} onChange={handleChange} onError={handleError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Maskar; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  static async saveData<T>(key: string, data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('[StorageService] Error saving data:', error);
      throw error;
    }
  }

  static async loadData<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('[StorageService] Error loading data:', error);
      throw error;
    }
  }
} 
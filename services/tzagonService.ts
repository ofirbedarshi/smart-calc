import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { TzagonData } from '../components/common/tzagonTypes';

const TZAGON_KEY = 'tzagon_data';

export class TzagonService {
  static async getTzagons(): Promise<TzagonData[]> {
    try {
      const json = await AsyncStorage.getItem(TZAGON_KEY);
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error('[TzagonService] Failed to load tzagons', err);
      throw err;
    }
  }

  static async getTzagon(id: string): Promise<TzagonData | null> {
    try {
      const tzagons = await this.getTzagons();
      return tzagons.find(t => t.id === id) || null;
    } catch (err) {
      console.error('[TzagonService] Failed to get tzagon', err);
      throw err;
    }
  }

  static async saveTzagon(tzagon: Omit<TzagonData, 'id' | 'createdAt' | 'updatedAt'>): Promise<TzagonData> {
    try {
      const now = Date.now();
      const newTzagon: TzagonData = {
        ...tzagon,
        id: uuid.v4() as string,
        createdAt: now,
        updatedAt: now,
      };
      const tzagons = await this.getTzagons();
      const updated = [newTzagon, ...tzagons];
      await AsyncStorage.setItem(TZAGON_KEY, JSON.stringify(updated));
      return newTzagon;
    } catch (err) {
      console.error('[TzagonService] Failed to save tzagon', err);
      throw err;
    }
  }

  static async updateTzagon(id: string, updates: Partial<TzagonData>): Promise<TzagonData[]> {
    try {
      const now = Date.now();
      const tzagons = await this.getTzagons();
      const updated = tzagons.map(t =>
        t.id === id ? { ...t, ...updates, updatedAt: now } : t
      );
      await AsyncStorage.setItem(TZAGON_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('[TzagonService] Failed to update tzagon', err);
      throw err;
    }
  }

  static async deleteTzagon(id: string): Promise<TzagonData[]> {
    try {
      const tzagons = await this.getTzagons();
      const filtered = tzagons.filter(t => t.id !== id);
      await AsyncStorage.setItem(TZAGON_KEY, JSON.stringify(filtered));
      return filtered;
    } catch (err) {
      console.error('[TzagonService] Failed to delete tzagon', err);
      throw err;
    }
  }
} 
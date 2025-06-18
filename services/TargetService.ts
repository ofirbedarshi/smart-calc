import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

export interface TargetFields {
  id: string;
  createdAt: number;
  name: string;
  description: string;
  northCoord: string;
  eastCoord: string;
  height: string;
  azimuth: string;
  distance: string;
  elevation: string;
  isAttacked: string;
  time: string;
  ammunition: string;
  team: string;
  date: string;
  notes: string;
}

const TARGETS_KEY = 'targets';

export const TargetService = {
  async getTargets(): Promise<TargetFields[]> {
    try {
      const json = await AsyncStorage.getItem(TARGETS_KEY);
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error('[TargetService] Failed to load targets', err);
      throw err;
    }
  },

  async addTarget(target: Omit<TargetFields, 'id' | 'createdAt'>): Promise<TargetFields[]> {
    try {
      const newTarget: TargetFields = {
        ...target,
        id: uuidv4(),
        createdAt: Date.now(),
      };
      const targets = await this.getTargets();
      const updated = [newTarget, ...targets];
      await AsyncStorage.setItem(TARGETS_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('[TargetService] Failed to add target', err);
      throw err;
    }
  },

  async updateTarget(id: string, updates: Partial<TargetFields>): Promise<TargetFields[]> {
    try {
      const targets = await this.getTargets();
      const updated = targets.map(t => t.id === id ? { ...t, ...updates } : t);
      await AsyncStorage.setItem(TARGETS_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('[TargetService] Failed to update target', err);
      throw err;
    }
  },

  async deleteTarget(id: string): Promise<TargetFields[]> {
    try {
      const targets = await this.getTargets();
      const updated = targets.filter(t => t.id !== id);
      await AsyncStorage.setItem(TARGETS_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('[TargetService] Failed to delete target', err);
      throw err;
    }
  },
}; 
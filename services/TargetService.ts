import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

export interface TargetFields {
  id?: string;
  createdAt?: number;
  updatedAt?: number;
  name: string;
  description: string;
  northCoord: string;
  eastCoord: string;
  height: string;
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

  async addTarget(target: Omit<TargetFields, 'id' | 'createdAt' | 'updatedAt'>): Promise<{newTarget: TargetFields, newTargets: TargetFields[]}> {
    try {
      const now = Date.now();
      const newTargetId = uuid.v4() as string;
      const newTarget: TargetFields = {
        ...target,
        id: newTargetId,
        createdAt: now,
        updatedAt: now,
      };
      const targets = await this.getTargets();
      const updated = [newTarget, ...targets];
      await AsyncStorage.setItem(TARGETS_KEY, JSON.stringify(updated));
      return {newTarget, newTargets: updated};
    } catch (err) {
      console.error('[TargetService] Failed to add target', err);
      throw err;
    }
  },

  async updateTarget(id: string, updates: Partial<TargetFields>): Promise<TargetFields[]> {
    try {
      const now = Date.now();
      const targets = await this.getTargets();
      const updated = targets.map(t => t.id === id ? { ...t, ...updates, updatedAt: now } : t);
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

  async searchTargets(query: string): Promise<TargetFields[]> {
    const allTargets = await this.getTargets();
    if (!query.trim()) return allTargets;
    const lowerQuery = query.toLowerCase();
    return allTargets.filter(t =>
      (t.name && t.name.toLowerCase().includes(lowerQuery)) ||
      (t.description && t.description.toLowerCase().includes(lowerQuery))
    );
  },

  async filterTargets({ query = '', isAttacked = 'הכל' }: { query?: string; isAttacked?: string }): Promise<TargetFields[]> {
    let targets = await this.getTargets();
    if (query && query.trim()) {
      const lowerQuery = query.toLowerCase();
      targets = targets.filter(t =>
        (t.name && t.name.toLowerCase().includes(lowerQuery)) ||
        (t.description && t.description.toLowerCase().includes(lowerQuery)) ||
        (t.northCoord && t.northCoord.toLowerCase().includes(lowerQuery)) ||
        (t.eastCoord && t.eastCoord.toLowerCase().includes(lowerQuery))
      );
    }
    if (isAttacked !== 'הכל') {
      targets = targets.filter(t => t.isAttacked === isAttacked);
    }
    return targets;
  },
}; 
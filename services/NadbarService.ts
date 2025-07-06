import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { NadbarData } from '../components/common/nadbarTypes';

const NADBARS_KEY = 'nadbar_data';

export class NadbarService {
  static async getNadbars(): Promise<NadbarData[]> {
    try {
      const json = await AsyncStorage.getItem(NADBARS_KEY);
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error('[NadbarService] Failed to load nadbars', err);
      throw err;
    }
  }

  static async getNadbar(id: string): Promise<NadbarData | null> {
    try {
      const nadbars = await this.getNadbars();
      return nadbars.find(n => n.id === id) || null;
    } catch (err) {
      console.error('[NadbarService] Failed to get nadbar', err);
      throw err;
    }
  }

  static async saveNadbar(nadbar: Omit<NadbarData, 'id' | 'createdAt' | 'updatedAt'>): Promise<NadbarData> {
    try {
      const now = Date.now();
      const newNadbar: NadbarData = {
        ...nadbar,
        id: uuid.v4() as string,
        createdAt: now,
        updatedAt: now,
      };
      
      const nadbars = await this.getNadbars();
      const updated = [newNadbar, ...nadbars];
      await AsyncStorage.setItem(NADBARS_KEY, JSON.stringify(updated));
      
      return newNadbar;
    } catch (err) {
      console.error('[NadbarService] Failed to save nadbar', err);
      throw err;
    }
  }

  static async updateNadbar(id: string, updates: Partial<NadbarData>): Promise<NadbarData[]> {
    try {
      const now = Date.now();
      const nadbars = await this.getNadbars();
      const updated = nadbars.map(n => 
        n.id === id ? { ...n, ...updates, updatedAt: now } : n
      );
      await AsyncStorage.setItem(NADBARS_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('[NadbarService] Failed to update nadbar', err);
      throw err;
    }
  }

  static async deleteNadbar(id: string): Promise<NadbarData[]> {
    try {
      const nadbars = await this.getNadbars();
      const filtered = nadbars.filter(n => n.id !== id);
      await AsyncStorage.setItem(NADBARS_KEY, JSON.stringify(filtered));
      return filtered;
    } catch (err) {
      console.error('[NadbarService] Failed to delete nadbar', err);
      throw err;
    }
  }

  static async filterNadbars(query: string): Promise<NadbarData[]> {
    try {
      const nadbars = await this.getNadbars();
      if (!query.trim()) return nadbars;
      const lower = query.toLowerCase();
      return nadbars.filter(n => n.templateId && n.templateId.toLowerCase().includes(lower));
    } catch (err) {
      console.error('[NadbarService] Failed to filter nadbars', err);
      throw err;
    }
  }

  static async getNadbarsByTemplate(templateId: string): Promise<NadbarData[]> {
    try {
      const nadbars = await this.getNadbars();
      return nadbars.filter(n => n.templateId === templateId);
    } catch (err) {
      console.error('[NadbarService] Failed to get nadbars by template', err);
      throw err;
    }
  }
} 
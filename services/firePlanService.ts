import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { FirePlanData } from '../components/common/firePlanTypes';

const FIRE_PLAN_KEY = 'fire_plan_data';

export class FirePlanService {
  static async getFirePlans(): Promise<FirePlanData[]> {
    try {
      const json = await AsyncStorage.getItem(FIRE_PLAN_KEY);
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error('[FirePlanService] Failed to load fire plans', err);
      throw err;
    }
  }

  static async getFirePlan(id: string): Promise<FirePlanData | null> {
    try {
      const firePlans = await this.getFirePlans();
      return firePlans.find(f => f.id === id) || null;
    } catch (err) {
      console.error('[FirePlanService] Failed to get fire plan', err);
      throw err;
    }
  }

  static async saveFirePlan(firePlan: Omit<FirePlanData, 'id' | 'createdAt' | 'updatedAt'>): Promise<FirePlanData> {
    try {
      const now = Date.now();
      const newFirePlan: FirePlanData = {
        ...firePlan,
        id: uuid.v4() as string,
        createdAt: now,
        updatedAt: now,
      };
      const firePlans = await this.getFirePlans();
      const updated = [newFirePlan, ...firePlans];
      await AsyncStorage.setItem(FIRE_PLAN_KEY, JSON.stringify(updated));
      return newFirePlan;
    } catch (err) {
      console.error('[FirePlanService] Failed to save fire plan', err);
      throw err;
    }
  }

  static async updateFirePlan(id: string, updates: Partial<FirePlanData>): Promise<FirePlanData[]> {
    try {
      const now = Date.now();
      const firePlans = await this.getFirePlans();
      const updated = firePlans.map(f =>
        f.id === id ? { ...f, ...updates, updatedAt: now } : f
      );
      await AsyncStorage.setItem(FIRE_PLAN_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('[FirePlanService] Failed to update fire plan', err);
      throw err;
    }
  }

  static async deleteFirePlan(id: string): Promise<FirePlanData[]> {
    try {
      const firePlans = await this.getFirePlans();
      const filtered = firePlans.filter(f => f.id !== id);
      await AsyncStorage.setItem(FIRE_PLAN_KEY, JSON.stringify(filtered));
      return filtered;
    } catch (err) {
      console.error('[FirePlanService] Failed to delete fire plan', err);
      throw err;
    }
  }
} 
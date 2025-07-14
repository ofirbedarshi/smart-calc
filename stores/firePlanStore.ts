import { create } from 'zustand';
import { FirePlanData } from '../components/common/firePlanTypes';
import { FirePlanService } from '../services/firePlanService';

interface FirePlanStoreState {
  firePlans: FirePlanData[];
  loading: boolean;
  error: string | null;
  loadFirePlans: () => Promise<void>;
  upsertFirePlan: (firePlan: Partial<FirePlanData> & Omit<FirePlanData, 'createdAt' | 'updatedAt'>) => Promise<FirePlanData>;
  deleteFirePlan: (id: string) => Promise<void>;
}

export const useFirePlanStore = create<FirePlanStoreState>((set, get) => ({
  firePlans: [],
  loading: false,
  error: null,

  loadFirePlans: async () => {
    set({ loading: true, error: null });
    try {
      const firePlans = await FirePlanService.getFirePlans();
      set({ firePlans, loading: false });
    } catch (err) {
      set({ error: 'שגיאה בטעינת תוכניות אש', loading: false });
    }
  },

  upsertFirePlan: async (firePlan) => {
    set({ loading: true, error: null });
    try {
      let result: FirePlanData;
      if (firePlan.id) {
        await FirePlanService.updateFirePlan(firePlan.id, firePlan);
        const firePlans = await FirePlanService.getFirePlans();
        set({ firePlans, loading: false });
        const updated = firePlans.find(f => f.id === firePlan.id);
        if (!updated) {
          throw new Error('Failed to find updated fire plan');
        }
        result = updated;
      } else {
        result = await FirePlanService.saveFirePlan(firePlan as Omit<FirePlanData, 'id' | 'createdAt' | 'updatedAt'>);
        const firePlans = await FirePlanService.getFirePlans();
        set({ firePlans, loading: false });
      }
      return result;
    } catch (err) {
      set({ error: 'שגיאה בשמירת/עדכון תוכנית אש', loading: false });
      throw err;
    }
  },

  deleteFirePlan: async (id) => {
    set({ loading: true, error: null });
    try {
      const firePlans = await FirePlanService.deleteFirePlan(id);
      set({ firePlans, loading: false });
    } catch (err) {
      set({ error: 'שגיאה במחיקת תוכנית אש', loading: false });
    }
  },
})); 
import { create } from 'zustand';
import { TargetFields, TargetService } from '../services/TargetService';

interface TargetStoreState {
  targets: TargetFields[];
  loading: boolean;
  error: string | null;
  loadTargets: () => Promise<void>;
  addTarget: (target: Omit<TargetFields, 'id' | 'createdAt'>) => Promise<void>;
  updateTarget: (id: string, updates: Partial<TargetFields>) => Promise<void>;
  deleteTarget: (id: string) => Promise<void>;
}

export const useTargetStore = create<TargetStoreState>((set) => ({
  targets: [],
  loading: false,
  error: null,

  loadTargets: async () => {
    set({ loading: true, error: null });
    try {
      const targets = await TargetService.getTargets();
      set({ targets, loading: false });
    } catch (err) {
      set({ error: 'שגיאה בטעינת מטרות', loading: false });
    }
  },

  addTarget: async (target) => {
    set({ loading: true, error: null });
    try {
      const targets = await TargetService.addTarget(target);
      set({ targets, loading: false });
    } catch (err) {
      set({ error: 'שגיאה בשמירת מטרה', loading: false });
    }
  },

  updateTarget: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const targets = await TargetService.updateTarget(id, updates);
      set({ targets, loading: false });
    } catch (err) {
      set({ error: 'שגיאה בעדכון מטרה', loading: false });
    }
  },

  deleteTarget: async (id) => {
    set({ loading: true, error: null });
    try {
      const targets = await TargetService.deleteTarget(id);
      set({ targets, loading: false });
    } catch (err) {
      set({ error: 'שגיאה במחיקת מטרה', loading: false });
    }
  },
})); 
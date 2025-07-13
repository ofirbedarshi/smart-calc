import { create } from 'zustand';
import { NadbarData } from '../components/common/nadbarTypes';
import { NadbarService } from '../services/NadbarService';

interface NadbarStoreState {
  nadbars: NadbarData[];
  loading: boolean;
  error: string | null;
  loadNadbars: () => Promise<void>;
  getNadbarById: (id: string) => NadbarData | undefined;
  saveNadbar: (nadbar: Omit<NadbarData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<NadbarData>;
}

export const useNadbarStore = create<NadbarStoreState>((set, get) => ({
  nadbars: [],
  loading: false,
  error: null,

  loadNadbars: async () => {
    set({ loading: true, error: null });
    try {
      const nadbars = await NadbarService.getNadbars();
      set({ nadbars, loading: false });
    } catch (err) {
      set({ error: 'שגיאה בטעינת נדברים', loading: false });
    }
  },

  getNadbarById: (id) => {
    const { nadbars } = get();
    return nadbars.find(n => n.id === id);
  },

  saveNadbar: async (nadbar) => {
    set({ loading: true, error: null });
    try {
      const newNadbar = await NadbarService.saveNadbar(nadbar);
      const nadbars = await NadbarService.getNadbars();
      set({ nadbars, loading: false });
      return newNadbar;
    } catch (err) {
      set({ error: 'שגיאה בשמירת נדבר', loading: false });
      throw err;
    }
  },

  upsertNadbar: async (nadbar: Partial<NadbarData> & { templateId: string; values: Record<string, string> }) => {
    set({ loading: true, error: null });
    try {
      let result: NadbarData | undefined;
      if (nadbar.id) {
        await NadbarService.updateNadbar(nadbar.id, { values: nadbar.values });
        const nadbars = await NadbarService.getNadbars();
        set({ nadbars, loading: false });
        result = nadbars.find(n => n.id === nadbar.id);
      } else {
        result = await NadbarService.saveNadbar({
          templateId: nadbar.templateId,
          targetId: nadbar.targetId,
          values: nadbar.values,
        });
        const nadbars = await NadbarService.getNadbars();
        set({ nadbars, loading: false });
      }
      return result;
    } catch (err) {
      set({ error: 'שגיאה בשמירת/עדכון נדבר', loading: false });
      throw err;
    }
  },
})); 
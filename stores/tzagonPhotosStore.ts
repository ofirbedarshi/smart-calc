import { create } from 'zustand';
import { TzagonData } from '../components/common/tzagonTypes';
import { TzagonService } from '../services/tzagonService';

interface TzagonPhotosStoreState {
  tzagons: TzagonData[];
  loading: boolean;
  error: string | null;
  loadTzagons: () => Promise<void>;
  upsertTzagon: (tzagon: Partial<TzagonData> & Omit<TzagonData, 'createdAt' | 'updatedAt'>) => Promise<TzagonData>;
  deleteTzagon: (id: string) => Promise<void>;
}

export const useTzagonPhotosStore = create<TzagonPhotosStoreState>((set, get) => ({
  tzagons: [],
  loading: false,
  error: null,

  loadTzagons: async () => {
    set({ loading: true, error: null });
    try {
      const tzagons = await TzagonService.getTzagons();
      set({ tzagons, loading: false });
    } catch (err) {
      set({ error: 'שגיאה בטעינת צגונים', loading: false });
    }
  },

  upsertTzagon: async (tzagon) => {
    set({ loading: true, error: null });
    try {
      let result: TzagonData;
      if (tzagon.id) {
        await TzagonService.updateTzagon(tzagon.id, tzagon);
        const tzagons = await TzagonService.getTzagons();
        set({ tzagons, loading: false });
        const updated = tzagons.find(t => t.id === tzagon.id);
        if (!updated) {
          throw new Error('Failed to find updated tzagon');
        }
        result = updated;
      } else {
        result = await TzagonService.saveTzagon(tzagon as Omit<TzagonData, 'id' | 'createdAt' | 'updatedAt'>);
        const tzagons = await TzagonService.getTzagons();
        set({ tzagons, loading: false });
      }
      return result;
    } catch (err) {
      set({ error: 'שגיאה בשמירת/עדכון צגון', loading: false });
      throw err;
    }
  },

  deleteTzagon: async (id) => {
    set({ loading: true, error: null });
    try {
      const tzagons = await TzagonService.deleteTzagon(id);
      set({ tzagons, loading: false });
    } catch (err) {
      set({ error: 'שגיאה במחיקת צגון', loading: false });
    }
  },
})); 
import { create } from 'zustand';
import { LocationData, LocationService } from '../services/LocationService';

interface LocationStore {
  locationData: LocationData;
  loadLocation: () => Promise<void>;
  saveLocation: (data: LocationData) => Promise<void>;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locationData: {
    height: '',
    northCoord: '',
    eastCoord: '',
  },
  loadLocation: async () => {
    try {
      const savedLocation = await LocationService.getLocation();
      if (savedLocation) {
        set({ locationData: savedLocation });
      }
    } catch (error) {
      console.error('[LocationStore] Error loading location:', error);
    }
  },
  saveLocation: async (data) => {
    await LocationService.saveLocation(data);
    set({ locationData: data });
  },
})); 
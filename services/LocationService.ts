import { StorageService } from './StorageService';

export interface LocationData {
  height: string;
  latitude: string;
  longitude: string;
}

const STORAGE_KEY = 'user_location';

export class LocationService {
  static async saveLocation(location: LocationData): Promise<void> {
    await StorageService.saveData<LocationData>(STORAGE_KEY, location);
  }

  static async getLocation(): Promise<LocationData | null> {
    return await StorageService.loadData<LocationData>(STORAGE_KEY);
  }
} 
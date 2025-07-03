import uuid from 'react-native-uuid';
import { NadbarScheme } from '../components/common/nadbarTypes';
import { StorageService } from './StorageService';

const NADBARS_KEY = 'nadbars';

export class NadbarService {
  static async getNadbars(): Promise<NadbarScheme[]> {
    const a = (await StorageService.loadData<NadbarScheme[]>(NADBARS_KEY)) || [];
    console.log(a)
    return a;
  }

  static async saveNadbar(scheme: NadbarScheme): Promise<NadbarScheme> {
    let id = scheme.id;
    let nadbars = await this.getNadbars();
    const now = Date.now();
    let updatedScheme = { ...scheme, updatedAt: now };
    if (!id) {
      id = uuid.v4() as string;
      updatedScheme = { ...updatedScheme, id };
      nadbars = [updatedScheme, ...nadbars];
    } else {
      nadbars = nadbars.map(n => n.id === id ? updatedScheme : n);
      if (!nadbars.find(n => n.id === id)) {
        nadbars = [updatedScheme, ...nadbars];
      }
    }
    await StorageService.saveData(NADBARS_KEY, nadbars);
    return updatedScheme;
  }

  static async filterNadbars(query: string): Promise<NadbarScheme[]> {
    const nadbars = await this.getNadbars();
    if (!query.trim()) return nadbars;
    const lower = query.toLowerCase();
    return nadbars.filter(n => n.name && n.name.toLowerCase().includes(lower));
  }
} 
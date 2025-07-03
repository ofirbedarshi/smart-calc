import uuid from 'react-native-uuid';
import { NadbarScheme } from '../components/common/nadbarTypes';
import { StorageService } from './StorageService';

const NADBARS_KEY = 'nadbars';

export class NadbarService {
  static async getNadbars(): Promise<NadbarScheme[]> {
    return (await StorageService.loadData<NadbarScheme[]>(NADBARS_KEY)) || [];
  }

  static async saveNadbar(scheme: NadbarScheme): Promise<NadbarScheme> {
    let id = scheme.id;
    let nadbars = await this.getNadbars();
    if (!id) {
      id = uuid.v4() as string;
      scheme = { ...scheme, id };
      nadbars = [scheme, ...nadbars];
    } else {
      nadbars = nadbars.map(n => n.id === id ? scheme : n);
      if (!nadbars.find(n => n.id === id)) {
        nadbars = [scheme, ...nadbars];
      }
    }
    await StorageService.saveData(NADBARS_KEY, nadbars);
    return scheme;
  }

  static async filterNadbars(query: string): Promise<NadbarScheme[]> {
    const nadbars = await this.getNadbars();
    if (!query.trim()) return nadbars;
    const lower = query.toLowerCase();
    return nadbars.filter(n => n.name && n.name.toLowerCase().includes(lower));
  }
} 
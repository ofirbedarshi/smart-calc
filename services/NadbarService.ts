import uuid from 'react-native-uuid';
import { NadbarScheme } from '../components/common/nadbarTypes';
import { StorageService } from './StorageService';

export class NadbarService {
  static async saveNadbar(scheme: NadbarScheme): Promise<NadbarScheme> {
    let id = scheme.id;
    if (!id) {
      id = uuid.v4() as string;
      scheme = { ...scheme, id };
    }
    const key = `Nadbar/${id}`;
    await StorageService.saveData(key, scheme);
    return scheme;
  }
} 
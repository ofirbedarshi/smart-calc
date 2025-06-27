import { StorageService } from '../../services/StorageService';

class LibraryContentService {
  static async setContent(key: string, content: string): Promise<void> {
    await StorageService.saveData(key, content);
  }

  static async getContent(key: string): Promise<string | null> {
    return await StorageService.loadData<string>(key);
  }
}

export default LibraryContentService; 
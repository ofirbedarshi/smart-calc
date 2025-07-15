import { TargetEntity } from '../entities';

export class TargetToNadbarMapper {
  /**
   * Maps a targetField to its corresponding value from the target entity
   * @param targetField - The field identifier (e.g., 'azimuth', 'coords', 'description')
   * @param targetEntity - The target entity containing the data
   * @returns The mapped value as a string
   */
  static getValue(targetField: string, targetEntity: TargetEntity): string {
    // Handle special case for coordinates
    if (targetField === 'coords') {
      let northCoord = targetEntity.northCoord || '';
      let eastCoord = targetEntity.eastCoord || '';

      // For northCoord: if it has 7 digits, show only the last 6 digits
      if (/^\d{7}$/.test(northCoord)) {
        northCoord = northCoord.slice(-6);
      }

      return northCoord && eastCoord ? `${eastCoord}/${northCoord}` : '';
    }

    // Map targetField to entity property
    const entityValue = targetEntity[targetField as keyof TargetEntity];
    return typeof entityValue === 'string' ? entityValue : '';
  }
} 
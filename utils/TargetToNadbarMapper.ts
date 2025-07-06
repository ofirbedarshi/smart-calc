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
      const northCoord = targetEntity.northCoord || '';
      const eastCoord = targetEntity.eastCoord || '';
      return northCoord && eastCoord ? `${northCoord}/${eastCoord}` : '';
    }

    // Map targetField to entity property
    const entityValue = targetEntity[targetField as keyof TargetEntity];
    return typeof entityValue === 'string' ? entityValue : '';
  }
} 
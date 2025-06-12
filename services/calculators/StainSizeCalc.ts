type WeaponType = 'rattle' | 'bush' | 'spectro' | 'pop';

interface StainSizeInput {
  weaponType: WeaponType;
  divergence: number;  // in cm
  range: number;      // in km
  selfDiameter: number; // in cm
}

interface StainSizeResult {
  size: string;  // in cm
}

export class StainSizeCalc {
  static calculateStainSize(input: StainSizeInput): StainSizeResult {
    // TODO: Implement actual calculation
    // For now, return a random number between 1 and 1000
    const randomSize = (Math.random() * 1000).toFixed(2);
    return {
      size: randomSize
    };
  }
} 
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
    const { divergence, range, selfDiameter } = input;
    const size = 1.5 * ((range*divergence) + selfDiameter);
    return {
      size: size.toFixed(2)
    };
  }
} 
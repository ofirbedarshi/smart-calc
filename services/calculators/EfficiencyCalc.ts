interface EfficiencyInput {
  deviation: number;  // in meters
  range: number;     // in kilometers
}

interface EfficiencyResult {
  efficiency: string;  // in kilometers
}

export class EfficiencyCalc {
  static calculateEfficiency(input: EfficiencyInput): EfficiencyResult {
    const { deviation, range } = input;
    
    // Formula: 20 * deviation / range
    // Convert range from km to meters for consistent units
    const rangeInMeters = range * 1000;
    const efficiency = (20 * deviation) / rangeInMeters;
    
    // Convert back to kilometers and format to 3 decimal places
    const efficiencyInKm = (efficiency * 1000).toFixed(3);
    
    return {
      efficiency: efficiencyInKm
    };
  }
} 
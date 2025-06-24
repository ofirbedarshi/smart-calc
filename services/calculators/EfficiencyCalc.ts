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
  
    // Formula: (20 * range) / deviation
    const efficiency = (20 * range) / deviation;
  
    return {
      efficiency: efficiency.toFixed(3)
    };
  }
} 
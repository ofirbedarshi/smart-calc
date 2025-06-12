export class UnitConversionCalc {
  // Degrees to Mils and back
  static degreesToMils(degrees: number): number {
    return degrees * 17.7777777778; // 6400 mils in a circle / 360 degrees
  }

  static milsToDegrees(mils: number): number {
    return mils / 17.7777777778;
  }

  // Meters to Feet and back
  static metersToFeet(meters: number): number {
    return meters * 3.28084;
  }

  static feetToMeters(feet: number): number {
    return feet / 3.28084;
  }
} 
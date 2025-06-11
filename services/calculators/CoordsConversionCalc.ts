import { LocationData } from '../LocationService';

export interface ConversionResults {
  azimuth: string;
  distance: string;
  elevation: string;
}

export class CoordsConversionCalc {
  private static parseAndValidateLocation(location: LocationData): { east: number; north: number; alt: number } {
    const { height, northCoord, eastCoord } = location;
    
    if (!height || !northCoord || !eastCoord) {
      throw new Error('Missing location data');
    }

    const east = parseFloat(eastCoord);
    const north = parseFloat(northCoord);
    const alt = parseFloat(height);

    if (isNaN(east) || isNaN(north) || isNaN(alt)) {
      throw new Error('Invalid coordinate format');
    }

    return { east, north, alt };
  }

  static calc(currentLocation: LocationData, targetLocation: LocationData): ConversionResults {
    const current = this.parseAndValidateLocation(currentLocation);
    const target = this.parseAndValidateLocation(targetLocation);

    const dx = target.east - current.east;
    const dy = target.north - current.north;
    const dz = target.alt - current.alt;

    // טווח אווירי
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // אזימוט במעלות
    let azimuthRad = Math.atan2(dx, dy);
    let azimuthDeg = azimuthRad * (180 / Math.PI);
    if (azimuthDeg < 0) azimuthDeg += 360;

    // זווית הגבהה (זוהר)
    const horizontalDistance = Math.sqrt(dx * dx + dy * dy);
    const elevationRad = Math.atan2(dz, horizontalDistance);
    const elevationDeg = elevationRad * (180 / Math.PI);

    return {
      azimuth: azimuthDeg.toString(),
      distance: distance.toString(),
      elevation: elevationDeg.toString()
    };
  }
} 
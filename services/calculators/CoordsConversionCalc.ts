import { LocationData } from '../LocationService';

export interface ConversionResults {
  azimuth: string;
  distance: string;
  elevation: string;
  eastCoord?: string;
  northCoord?: string;
  height?: string;
}

export class CoordsConversionCalc {
  static calc(source: LocationData, target: LocationData): ConversionResults {
    const sourceCoords = this.parseAndValidateLocation(source);
    const targetCoords = this.parseAndValidateLocation(target);

    const dx = targetCoords.eastCoord - sourceCoords.eastCoord;
    const dy = targetCoords.northCoord - sourceCoords.northCoord;
    const dz = targetCoords.height - sourceCoords.height;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const azimuth = this.calculateAzimuth(dx, dy);
    const elevation = this.calculateElevation(distance, dz);

    return {
      azimuth: azimuth.toFixed(2),
      distance: distance.toFixed(2),
      elevation: elevation.toFixed(2),
    };
  }

  static calcReverse(source: LocationData, target: { azimuth: string; distance: string; elevation: string }): ConversionResults {
    const sourceCoords = this.parseAndValidateLocation(source);
    const targetValues = this.parseAndValidateTarget(target);

    const azimuthRad = (targetValues.azimuth * Math.PI) / 180;
    const elevationRad = (targetValues.elevation * Math.PI) / 180;

    const horizontalDistance = targetValues.distance * Math.cos(elevationRad);
    const verticalDistance = targetValues.distance * Math.sin(elevationRad);

    const dx = horizontalDistance * Math.sin(azimuthRad);
    const dy = horizontalDistance * Math.cos(azimuthRad);

    const targetEastCoord = sourceCoords.eastCoord + dx;
    const targetNorthCoord = sourceCoords.northCoord + dy;
    const targetHeight = sourceCoords.height + verticalDistance;

    return {
      azimuth: target.azimuth,
      distance: target.distance,
      elevation: target.elevation,
      eastCoord: targetEastCoord.toFixed(2),
      northCoord: targetNorthCoord.toFixed(2),
      height: targetHeight.toFixed(2),
    };
  }

  private static parseAndValidateLocation(location: LocationData) {
    if (!location.height || !location.northCoord || !location.eastCoord) {
      throw new Error('Missing location data');
    }

    return {
      height: parseFloat(location.height),
      northCoord: parseFloat(location.northCoord),
      eastCoord: parseFloat(location.eastCoord),
    };
  }

  private static parseAndValidateTarget(target: { azimuth: string; distance: string; elevation: string }) {
    if (!target.azimuth || !target.distance || !target.elevation) {
      throw new Error('Missing target data');
    }

    return {
      azimuth: parseFloat(target.azimuth),
      distance: parseFloat(target.distance),
      elevation: parseFloat(target.elevation),
    };
  }

  private static calculateAzimuth(dx: number, dy: number): number {
    let azimuth = (Math.atan2(dx, dy) * 180) / Math.PI;
    if (azimuth < 0) {
      azimuth += 360;
    }
    return azimuth;
  }

  private static calculateElevation(distance: number, dz: number): number {
    return (Math.atan2(dz, distance) * 180) / Math.PI;
  }
} 
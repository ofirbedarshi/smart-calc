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
    const E_self = parseFloat(source.eastCoord);
    const N_self = parseFloat(source.northCoord);
    const H_self = parseFloat(source.height);
    const E_target = parseFloat(target.eastCoord);
    const N_target = parseFloat(target.northCoord);
    const H_target = parseFloat(target.height);

    const dE = E_target - E_self;
    const dN = N_target - N_self;
    const dH = H_target - H_self;

    // 3D range
    const range = Math.sqrt(dE ** 2 + dN ** 2 + dH ** 2);

    // Azimuth in radians
    let theta = Math.atan2(dE, dN);
    if (theta < 0) theta += 2 * Math.PI;
    const azimuth_mil = (theta / (2 * Math.PI)) * 6400;

    // Zohar (elevation angle) in mils
    const horizontal_distance = Math.sqrt(dE ** 2 + dN ** 2);
    const phi = Math.atan2(dH, horizontal_distance);
    const zohar_mil = (phi / (2 * Math.PI)) * 6400;

    return {
      azimuth: azimuth_mil.toFixed(2),
      distance: range.toFixed(2),
      elevation: zohar_mil.toFixed(2),
      eastCoord: '',
      northCoord: '',
      height: '',
    };
  }

  static calcReverse(source: LocationData, target: { azimuth: string; distance: string; elevation: string }): ConversionResults {
    const sourceCoords = this.parseAndValidateLocation(source);
    const azimuthMil = parseFloat(target.azimuth);
    const rangeM = parseFloat(target.distance);
    const zoharMil = parseFloat(target.elevation);

    // Convert mils to radians
    const theta = (azimuthMil / 6400) * 2 * Math.PI;
    const phi = (zoharMil / 6400) * 2 * Math.PI;

    // Horizontal range (XY) and height change
    const R_xy = rangeM * Math.cos(phi);
    const dH = rangeM * Math.sin(phi);

    // Easting and Northing components
    const dE = R_xy * Math.sin(theta);
    const dN = R_xy * Math.cos(theta);

    // Compute target coordinates
    const targetEastCoord = sourceCoords.eastCoord + dE;
    const targetNorthCoord = sourceCoords.northCoord + dN;
    const targetHeight = sourceCoords.height + dH;

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
import { CoordsConversionCalc } from '../services/calculators/CoordsConversionCalc';
import { LocationData } from '../services/LocationService';
import { TargetFields } from '../services/TargetService';

export class TargetEntity {
  private _data: TargetFields;
  private _selfLocation: LocationData | null = null;

  constructor(targetData: Partial<TargetFields> = {}, selfLocation?: LocationData) {
    this._data = {
      name: '',
      description: '',
      northCoord: '',
      eastCoord: '',
      height: '',
      isAttacked: '',
      time: '',
      ammunition: '',
      team: '',
      date: '',
      notes: '',
      ...targetData,
    };
    
    if (selfLocation) {
      this._selfLocation = selfLocation;
    }
  }

  // Getters for all target properties
  get id(): string | undefined { return this._data.id; }
  get createdAt(): number | undefined { return this._data.createdAt; }
  get updatedAt(): number | undefined { return this._data.updatedAt; }
  get name(): string { return this._data.name; }
  get description(): string { return this._data.description; }
  get northCoord(): string { return this._data.northCoord; }
  get eastCoord(): string { return this._data.eastCoord; }
  get height(): string { return this._data.height; }
  get isAttacked(): string { return this._data.isAttacked; }
  get time(): string { return this._data.time; }
  get ammunition(): string { return this._data.ammunition; }
  get team(): string { return this._data.team; }
  get date(): string { return this._data.date; }
  get notes(): string { return this._data.notes; }

  // Getter for the raw data (useful for saving/updating)
  get data(): TargetFields {
    return { ...this._data };
  }

  // Computed values as getters
  get azimuth(): string {
    if (!this._canCalculateComputedValues()) return '';
    const computed = this._calculateComputedValues();
    return computed.azimuth;
  }

  get distance(): string {
    if (!this._canCalculateComputedValues()) return '';
    const computed = this._calculateComputedValues();
    return computed.distance;
  }

  get elevation(): string {
    if (!this._canCalculateComputedValues()) return '';
    const computed = this._calculateComputedValues();
    return computed.elevation;
  }

  // Method to update self location
  updateSelfLocation(selfLocation: LocationData): void {
    this._selfLocation = selfLocation;
  }

  // Method to update target data
  updateData(updates: Partial<TargetFields>): void {
    this._data = { ...this._data, ...updates };
  }

  // Method to update a single field
  updateField<K extends keyof TargetFields>(field: K, value: TargetFields[K]): void {
    this._data[field] = value;
  }

  // Check if we have all required data for computed values
  private _canCalculateComputedValues(): boolean {
    return Boolean(
      this._selfLocation?.height && 
      this._selfLocation?.northCoord && 
      this._selfLocation?.eastCoord &&
      this._data.height && 
      this._data.northCoord && 
      this._data.eastCoord
    );
  }

  // Calculate computed values
  private _calculateComputedValues() {
    if (!this._selfLocation) {
      throw new Error('Self location is required for computing values');
    }

    return CoordsConversionCalc.calc(this._selfLocation, {
      height: this._data.height,
      northCoord: this._data.northCoord,
      eastCoord: this._data.eastCoord,
    });
  }

  // Static method to create from existing target data
  static fromTargetData(targetData: TargetFields, selfLocation?: LocationData): TargetEntity {
    return new TargetEntity(targetData, selfLocation);
  }


} 
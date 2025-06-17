export interface CalculatorField {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  keyboardType?: 'numeric' | 'default';
  prefixLength?: number;
}

export interface CalculatorResults {
  fields: CalculatorField[];
} 
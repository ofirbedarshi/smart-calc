export interface CalculatorField {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  keyboardType?: 'numeric' | 'default';
  prefixLength?: number;
  disabled?: boolean;
}

export interface CalculatorResults {
  fields: CalculatorField[];
} 
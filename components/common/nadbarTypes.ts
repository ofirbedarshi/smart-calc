// Nadbar types for schema-driven UI

export type InputType = 'text' | 'textArea' | 'number' | 'dropdown';

export type InputOptions = {
  dropdown?: string[];
};

export type NadbarFormField = {
  label: string;
  fieldId: string; // must be non-empty
  value: string;
  inputType?: InputType; // optional, defaults to 'text'
  inputOptions?: InputOptions; // optional, for dropdown options etc.
  targetField?: string; // optional, maps to target entity field
};

export type NadbarElement = {
  type: 'form';
  header?: string; // optional header for form sections
  data: NadbarFormField[];
};

export type NadbarScheme = {
  name: string;
  type: NadbarType;
  id: string;
  targetId?: string; // optional, ID of the associated target
  updatedAt: number;
  elements: NadbarElement[];
}; 

export enum NadbarType {
  Maskar = 'Maskar'
}
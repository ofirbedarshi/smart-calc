// Nadbar types for template + data separation

export type InputType = 'text' | 'textArea' | 'number' | 'dropdown';

export type InputOptions = {
  dropdown?: string[];
};

export type NadbarFormField = {
  label: string;
  fieldId: string; // must be non-empty
  inputType?: InputType; // optional, defaults to 'text'
  inputOptions?: InputOptions; // optional, for dropdown options etc.
  targetField?: string; // optional, maps to target entity field
};

export type NadbarElement = {
  type: 'form';
  header?: string; // optional header for form sections
  data: NadbarFormField[];
};

// Template - static structure (for now, just the default maskar template)
export type NadbarTemplate = {
  id: string;
  name: string;
  type: NadbarType;
  version: string;
  elements: NadbarElement[];
};

// Data - dynamic values for each instance
export type NadbarData = {
  id: string;
  templateId: string;
  targetId?: string;
  values: Record<string, string>; // fieldId -> value mapping
  createdAt: number;
  updatedAt: number;
};

export enum NadbarType {
  Maskar = 'Maskar'
}
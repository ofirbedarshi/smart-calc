// Nadbar types for schema-driven UI

export type NadbarFormField = {
  label: string;
  fieldId: string;
  value: string;
};

export type NadbarElement = {
  type: 'form';
  data: NadbarFormField[];
};

export type NadbarScheme = {
  name: string;
  id: string;
  updatedAt: string;
  elements: NadbarElement[];
}; 
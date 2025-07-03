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
  type: NadbarType;
  id: string;
  updatedAt: string;
  elements: NadbarElement[];
}; 

export enum NadbarType {
  Maskar = 'Maskar'
}
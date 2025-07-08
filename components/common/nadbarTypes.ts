// Nadbar types for template + data separation

type InputType = 'text' | 'textArea' | 'number' | 'dropdown';

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

export type NadbarFormElement = {
  type: 'form';
  header?: string; // optional header for form sections
  data: NadbarFormField[];
};

export type NadbarTextElement = {
  type: 'text';
  header?: string;
  data: string;
};

export type NadbarConversationMessage = {
  type: 'me' | 'they';
  data: string;
};

export type NadbarConversationElement = {
  type: 'conversation';
  header?: string;
  data: NadbarConversationMessage[];
};

export type NadbarHeaderElement = {
  type: 'header';
  data: string; // The header text to display
};

export type NadbarElement = NadbarFormElement | NadbarTextElement | NadbarConversationElement | NadbarHeaderElement;

// Template - static structure (for now, just the default maskar template)
export type NadbarTemplate = {
  id: string;
  name: string;
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
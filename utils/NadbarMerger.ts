import { NadbarData, NadbarFormField, NadbarTemplate } from '../components/common/nadbarTypes';

export interface MergedNadbarField extends NadbarFormField {
  value: string;
}

export type MergedNadbarElement =
  | {
      type: 'form';
      header?: string;
      data: MergedNadbarField[];
    }
  | {
      type: 'text';
      header?: string;
      data: string;
    }
  | {
      type: 'conversation';
      header?: string;
      data: { type: 'me' | 'they'; data: string }[];
    };

export interface MergedNadbar {
  id: string;
  name: string;
  type: string;
  templateId: string;
  targetId?: string;
  elements: MergedNadbarElement[];
  createdAt: number;
  updatedAt: number;
}

export class NadbarMerger {
  /**
   * Merges a template with data to create a complete nadbar for rendering
   */
  static merge(template: NadbarTemplate, data: NadbarData): MergedNadbar {
    const mergedElements = template.elements.map(element => {
      if (element.type === 'form') {
        return {
          ...element,
          data: element.data.map(field => ({
            ...field,
            value: data.values[field.fieldId] || ''
          }))
        };
      } else if (element.type === 'text' || element.type === 'conversation') {
        return {
          ...element
        };
      } else {
        return element as any;
      }
    });

    return {
      id: data.id,
      name: template.name,
      type: template.type,
      templateId: template.id,
      targetId: data.targetId,
      elements: mergedElements,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    };
  }

  /**
   * Creates a new empty nadbar from a template (for new nadbars)
   */
  static createEmptyNadbar(template: NadbarTemplate): MergedNadbar {
    const emptyValues = this.createEmptyValues(template);
    const tempData: NadbarData = {
      id: '', // Empty ID indicates new nadbar
      templateId: template.id,
      targetId: undefined,
      values: emptyValues,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    return this.merge(template, tempData);
  }

  /**
   * Extracts values from a merged nadbar back to data format
   */
  static extractValues(mergedNadbar: MergedNadbar): Record<string, string> {
    const values: Record<string, string> = {};
    
    mergedNadbar.elements.forEach(element => {
      if (element.type === 'form') {
        element.data.forEach(field => {
          values[field.fieldId] = field.value || '';
        });
      }
    });
    
    return values;
  }

  /**
   * Creates empty values object from template structure
   */
  static createEmptyValues(template: NadbarTemplate): Record<string, string> {
    const values: Record<string, string> = {};
    
    template.elements.forEach(element => {
      if (element.type === 'form') {
        element.data.forEach(field => {
          values[field.fieldId] = '';
        });
      }
    });
    
    return values;
  }
} 
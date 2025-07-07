import { NadbarData, NadbarFormField, NadbarTemplate } from '../components/common/nadbarTypes';
import { parseVariableString } from '../components/common/VariableStringInput';

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
  values: Record<string, string>;
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
      } else if (element.type === 'text') {
        return {
          ...element
        };
      } else if (element.type === 'conversation') {
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
      templateId: template.id,
      targetId: data.targetId,
      elements: mergedElements,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      values: { ...data.values }
    } as MergedNadbar & { values: Record<string, string> };
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
    
    return { ...this.merge(template, tempData), values: { ...emptyValues } } as MergedNadbar & { values: Record<string, string> };
  }

  /**
   * Extracts values from a merged nadbar back to data format
   */
  static extractValues(mergedNadbar: MergedNadbar, valuesMap?: Record<string, string>): Record<string, string> {
    const values: Record<string, string> = {};
    const variableValues = valuesMap || mergedNadbar.values || {};
    mergedNadbar.elements.forEach(element => {
      if (element.type === 'form') {
        element.data.forEach(field => {
          values[field.fieldId] = variableValues[field.fieldId] || '';
        });
      } else if (element.type === 'text') {
        parseVariableString(element.data).forEach(part => {
          if (part.type === 'var') {
            values[part.fieldId!] = variableValues[part.fieldId!] || '';
          }
        });
      } else if (element.type === 'conversation') {
        element.data.forEach(msg => {
          parseVariableString(msg.data).forEach(part => {
            if (part.type === 'var') {
              values[part.fieldId!] = variableValues[part.fieldId!] || '';
            }
          });
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
      } else if (element.type === 'text') {
        parseVariableString(element.data).forEach(part => {
          if (part.type === 'var') {
            values[part.fieldId!] = '';
          }
        });
      } else if (element.type === 'conversation') {
        element.data.forEach(msg => {
          parseVariableString(msg.data).forEach(part => {
            if (part.type === 'var') {
              values[part.fieldId!] = '';
            }
          });
        });
      }
    });
    
    return values;
  }
} 
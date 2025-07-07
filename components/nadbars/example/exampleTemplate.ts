import { NadbarTemplate } from '../../common/nadbarTypes';

export const EXAMPLE_TEMPLATE: NadbarTemplate = {
  id: 'example_v1',
  name: 'דוגמה',
  version: '1.0',
  elements: [
    {
      type: 'form',
      header: 'פרטים כלליים',
      data: [
        { label: 'שם הפרויקט', fieldId: 'projectName', inputType: 'text' },
        { label: 'תיאור', fieldId: 'description', inputType: 'textArea' },
        { label: 'תאריך', fieldId: 'date', inputType: 'text' },
        { label: 'אזימוט', fieldId: 'azimuth', inputType: 'text', targetField: 'azimuth' },
        { label: 'טווח', fieldId: 'distance', inputType: 'text', targetField: 'distance' }
      ]
    },
    {
      type: 'form',
      header: 'הגדרות נוספות',
      data: [
        { 
          label: 'סוג פעולה', 
          fieldId: 'actionType', 
          inputType: 'dropdown', 
          inputOptions: { dropdown: ['פעולה א', 'פעולה ב', 'פעולה ג'] } 
        },
        { label: 'הערות', fieldId: 'notes', inputType: 'textArea' }
      ]
    }
  ]
}; 
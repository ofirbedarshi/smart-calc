import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_MORTARS_TEMPLATE: NadbarTemplate = {
  id: 'mortars_v1',
  name: 'מרגמות',
  version: '1.0',
  elements: [
    {
      type: 'form',
      header: 'פרטי מרגמות',
      data: [
        { label: 'סוג מרגמה', fieldId: 'mortarType', inputType: 'dropdown', inputOptions: { dropdown: ['60 מ"מ', '81 מ"מ', '120 מ"מ', 'אחר'] } },
        { label: 'מספר סידורי', fieldId: 'serialNumber', inputType: 'text' },
        { label: 'תיאור', fieldId: 'description', inputType: 'textArea' },
        { label: 'מיקום', fieldId: 'location', inputType: 'text' },
        { label: 'סטטוס', fieldId: 'status', inputType: 'dropdown', inputOptions: { dropdown: ['פעיל', 'לא פעיל', 'נבדק'] } },
      ]
    },
    {
      type: 'form',
      header: 'הערות נוספות',
      data: [
        { label: 'הערות', fieldId: 'notes', inputType: 'textArea' }
      ]
    }
  ]
}; 
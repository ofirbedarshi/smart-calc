import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_OKETZ_PLADA_TEMPLATE: NadbarTemplate = {
  id: 'oketz_plada_v1',
  name: 'עוקץ פלדה',
  version: '1.0',
  elements: [
    {
      type: 'form',
      header: 'פרטי עוקץ פלדה',
      data: [
        { label: 'סוג עוקץ', fieldId: 'oketzType', inputType: 'dropdown', inputOptions: { dropdown: ['סוג א', 'סוג ב', 'אחר'] } },
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
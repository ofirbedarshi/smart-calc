import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_ARTILLERY_TEMPLATE: NadbarTemplate = {
  id: 'artillery_v1',
  name: 'ארטילריה',
  version: '1.0',
  elements: [
    {
      type: 'form',
      header: 'פרטי ארטילריה',
      data: [
        { label: 'סוג ארטילריה', fieldId: 'artilleryType', inputType: 'dropdown', inputOptions: { dropdown: ['תותח', 'הוביצר', 'אחר'] } },
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
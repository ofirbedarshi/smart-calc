import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_LEHAT_TEMPLATE: NadbarTemplate = {
  id: 'lehat_v1',
  name: 'להט',
  version: '1.0',
  elements: [
    {
      type: 'form',
      header: 'פרטי להט',
      data: [
        { label: 'סוג להט', fieldId: 'lehatType', inputType: 'dropdown', inputOptions: { dropdown: ['סוג א', 'סוג ב', 'אחר'] } },
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
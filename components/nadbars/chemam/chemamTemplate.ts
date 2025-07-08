import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_CHEMAM_TEMPLATE: NadbarTemplate = {
  id: 'chemam_v1',
  name: 'חמ"מ',
  version: '1.0',
  elements: [
    {
      type: 'form',
      header: 'פרטי חמ"מ',
      data: [
        { label: 'סוג חמ"מ', fieldId: 'chemamType', inputType: 'dropdown', inputOptions: { dropdown: ['טיל', 'פצצה', 'אחר'] } },
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
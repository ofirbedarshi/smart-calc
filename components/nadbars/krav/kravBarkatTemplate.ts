import { NadbarTemplate, NadbarType } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_BARKAT_TEMPLATE: NadbarTemplate = {
  id: 'krav_barkat_v1',
  name: 'קרב ברקת',
  type: NadbarType.Maskar,
  version: '1.0',
  elements: [
    {
      type: 'form',
      data: [
        { label: 'שדה דוגמה', fieldId: 'exampleField', inputType: 'text' },
      ],
    },
    {
      type: 'text',
      data: 'טקסט דוגמה לקרב ברקת',
    },
  ],
}; 
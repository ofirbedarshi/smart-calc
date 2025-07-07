import { NadbarTemplate, NadbarType } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_LINE6_TEMPLATE: NadbarTemplate = {
  id: 'krav_line6_v1',
  name: 'קרב line 6',
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
      data: 'טקסט דוגמה לקרב line 6',
    },
  ],
}; 
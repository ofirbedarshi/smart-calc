import { NadbarTemplate, NadbarType } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_SADURA_LASER_TEMPLATE: NadbarTemplate = {
  id: 'krav_sadura_laser_v1',
  name: 'קרב סדורה ברד לייזר',
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
      data: 'טקסט דוגמה לקרב סדורה ברד לייזר',
    },
  ],
}; 
import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_LASER_LOAL_TEMPLATE: NadbarTemplate = {
  id: 'krav_laser_loal_v1',
  name: 'קרב ברד לייזר loal',
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
      data: 'טקסט דוגמה לקרב ברד לייזר loal',
    },
  ],
}; 
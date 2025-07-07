import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_LASER_LOBL_TEMPLATE: NadbarTemplate = {
  id: 'krav_laser_lobl_v1',
  name: 'קרב ברד לייזר lobl',
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
      data: 'טקסט דוגמה לקרב ברד לייזר lobl',
    },
  ],
}; 
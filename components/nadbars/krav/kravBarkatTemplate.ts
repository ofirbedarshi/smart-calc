import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_BARKAT_TEMPLATE: NadbarTemplate = {
  id: 'krav_barkat_v1',
  name: 'קרב ברקת',
  version: '1.0',
  elements: [
    {
      type: 'form',
      data: [
        { label: 'תדר', fieldId: 'freq', inputType: 'text' },
        { label: 'או״ק חוליה', fieldId: 'ok_team', inputType: 'text' },
        { label: 'אזימוט', fieldId: 'azimuth', inputType: 'text', targetField: 'azimuth' },
        { label: 'טווח', fieldId: 'distance', inputType: 'text', targetField: 'distance' }
      ]
    },
    {
      type: 'form',
      data: [
        { label: 'שם ותיאור מטרה', fieldId: 'targetName', inputType: 'text', targetField: 'description' },
        { label: 'נ.צ GEO צפוני', fieldId: 'con_geoNorth', inputType: 'text' },
        { label: 'נ.צ GEO מזרחי', fieldId: 'con_geoEast', inputType: 'text' },
        { label: 'כיוון כניסה מומלץ', fieldId: 'enterence'},
        { label: 'קסום', fieldId: 'kasoom', inputType: 'text' },
        { label: 'עננות', fieldId: 'clouds', inputType: 'text' },
        { label: 'גובה עננים', fieldId: 'cloudsHeight', inputType: 'text' }
      ]
    },
    {
      type: 'header',
      data: 'חוזר על הנתונים לאימות',
    },
    {
      type: 'form',
      data: [
        { label: 'תיאור נוסף', fieldId: 'additional_desc', inputType: 'textArea' } 
      ]
    },
    {
      type: 'text',
      header: 'יעף לבן',
      data: `<b> שדר בזמנך להפעל קסום</b><br>קבל הפעל קסם<br><b>שדר מופעל קסום+ קוד ציון</b><br>קבל מזהה ירוקה<br>קבל הפסק<br><b>שדר הופסק קסום+קוד ציון</b>`
    },
  ]
}; 
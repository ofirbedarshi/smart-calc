import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_LASER_LOAL_TEMPLATE: NadbarTemplate = {
  id: 'krav_laser_loal_v1',
  name: 'קרב ברד לייזר loal',
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
        { label: 'גובה מטרה - רגל', fieldId: 'heightRegel'},
        { label: 'כיוון כניסה מומלץ', fieldId: 'enterence'},
        { label: 'קסום', fieldId: 'kasoom', inputType: 'text' },
        { label: 'עננות', fieldId: 'clouds', inputType: 'text' },
        { label: 'גובה עננים', fieldId: 'cloudsHeight', inputType: 'text' },
        { label: 'נק מכוון', fieldId: 'point', inputType: 'text' },
        { label: 'סוג מטרה', fieldId: 'targetType', inputType: 'dropdown', 
          inputOptions: { dropdown: ['קיר', 'גג', 'שטח'] }  }
      ]
    },
    {
      type: 'header',
      data: 'חוזר על הנתונים לאימות',
    },
    {
      type: 'text',
      header: 'יעף לבן',
      data: `יציבות נעילה - תקינות ציון, תנאים מאפשרים, מדידת זמן יעף +הטלה<br> סידור רכיבים במרחב המטרה - קבלת אימות אחרון`
    },
    {
      type: 'text',
      data: `קבל יוצא כיוון ליעף ברד לייזר על __ זמן מעוף פצצה שוער __ (נווט)<br>קבל הפעל קסום (נווט)<br><b>שדר מופעל קסום על __רשאי להטיל ברד לייזר (מטרה בתנועה - שדר נ״צ_גובה של נקודת פגיעה צפויה)</b><br>קבל דקה להטלה (טייס)<br>קבל אישור להטלה (נווט)<br>קבל הוטל __ שניות<br>קבל ספירת שניות לאחור (טייס)<br><b>שדר BDA</b>`
    },
  ],
}; 
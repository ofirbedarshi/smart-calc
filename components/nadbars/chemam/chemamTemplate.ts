import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_CHEMAM_TEMPLATE: NadbarTemplate = {
  id: 'chemam_v1',
  name: 'חמ"מ',
  version: '1.0',
  elements: [
    {
      type: 'form',
      data: [
        { label: 'תדר', fieldId: 'freq', inputType: 'text' },
        { label: 'או״ק חוליה', fieldId: 'ok_team', inputType: 'text' },
        { label: 'אזימוט', fieldId: 'azimuth', inputType: 'text', targetField: 'azimuth' },
        { label: 'טווח', fieldId: 'distance', inputType: 'text', targetField: 'distance' },
        { label: 'קו אחרון לכוחותינו', fieldId: 'lastLine', inputType: 'text'}
      ]
    },
    {
      type: 'form',
      header: 'נתונים כלליים',
      data: [
        { label: 'שם ותיאור מטרה', fieldId: 'targetName', inputType: 'text', targetField: 'description' },
        { label: 'נ.צ UTM', fieldId: 'natza', inputType: 'text', targetField: 'coords' },
        { label: 'נק מכוונת מדויקת', fieldId: 'targetedPoint', inputType: 'text' },
        { label: 'גובה מטרה', fieldId: 'targetHeight', inputType: 'text', targetField: 'height' },
        { 
          label: 'זווית פגיעה', 
          fieldId: 'hitAngle', 
          inputType: 'dropdown', 
          inputOptions: { dropdown: ['גג', 'חזית'] } 
        },
        { 
          label: 'סוג מבנה', 
          fieldId: 'structureType', 
          inputType: 'dropdown', 
          inputOptions: { dropdown: ['פח', 'בלוקים','בטון', 'עץ','סככה'] } 
        },
        { label: 'הישג נדרש', fieldId: 'requiredAchi', inputType: 'text' },
        { label: 'גובה עננים - מטר', fieldId: 'cloudsHeight', inputType: 'text' },
        { label: 'עננות', fieldId: 'cloudy', inputType: 'text' }
      ]
    },
    {
      type: 'form',
      header: 'תיאור מטרה - עצמים בולטים',
      data: [
        { label: 'אנדרשוט', fieldId: 'undershot', inputType: 'text' },
        { label: 'אוברשוט', fieldId: 'overshot', inputType: 'text' },
        { label: 'דקירת מטרה', fieldId: 'targetpoint2', inputType: 'text' },
        { label: 'קונטרסטיות', fieldId: 'kont', inputType: 'text' },
        { label: 'עוגן בפיינל', fieldId: 'ogen', inputType: 'text' },
        { label: 'הסתרים בקרבת מטרה', fieldId: 'hiddenSpots', inputType: 'text' },
        { label: 'מידע עדכני', fieldId: 'relevantInfo', inputType: 'text' },       
      ]
    },
    {
      type: 'text',
      header: 'דגשים',
      data: `- כתיבת דף מטרה בהתחשב בכיוון מעוף הטיל

- בדיקת עננות וגובה עננים-לזירה והוצאת עיניים מהאמצעי

- האם המטרה יכולה להיות בתנועה? להגיד. לשים לב לכל תזוזה הכי קטנה להודיע

- להודיע על אבק/עשן/ כל דבר שיכול להסתיר לרב״ת

- 45 שניות לפני שיגור לוודא שהמטרה עדיין בתפיסות
      `
    },
  ]
}; 
import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_MASKAR_TEMPLATE: NadbarTemplate = {
  id: 'maskar_v1',
  name: 'מסקר',
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
      header: 'לחיצת ידיים',
      data: [
        { 
          label: 'עבודה על עזר', 
          fieldId: 'ezer', 
          inputType: 'dropdown', 
          inputOptions: { dropdown: ['אורטופוטו', 'אורטופוטו שליטה'] } 
        },
        { label: 'מיקום עצמי - נצ״א', fieldId: 'natza', inputType: 'text' },
        { label: 'קו אחרון כוחותינו', fieldId: 'ourForces', inputType: 'text' },
        { label: 'מודיעין ואיומים', fieldId: 'threats', inputType: 'text' }
      ]
    },
    {
      type: 'form',
      header: 'נתונים כלליים',
      data: [
        { label: 'שם ותיאור מטרה', fieldId: 'targetName', inputType: 'text', targetField: 'description' },
        { label: 'נ.צ UTM', fieldId: 'natza', inputType: 'text', targetField: 'coords' },
        { label: 'נ.צ אריחי', fieldId: 'arihi', inputType: 'text' },
        { label: 'גובה מטרה', fieldId: 'targetHeight', inputType: 'text', targetField: 'height' },
        { 
          label: 'כיוון כניסה מומלץ', 
          fieldId: 'enterence', 
          inputType: 'dropdown', 
          inputOptions: { dropdown: ['מומלץ', 'מאפשר'] } 
        },
        { label: 'קסום', fieldId: 'kasoom', inputType: 'text' }
      ]
    },
    {
      type: 'form',
      header: 'אצע״ד ק״מ',
      data: [
        { label: 'אימות על העזר', fieldId: 'confirm', inputType: 'text' },
        { label: 'צביעת שטח', fieldId: 'areaPaint', inputType: 'text' },
        { label: 'עצמים בולטים', fieldId: 'bigObjects', inputType: 'text' },
        { label: 'דקירת מטרה', fieldId: 'targetPoint', inputType: 'text' },
        { label: 'קונטרסטיות', fieldId: 'Kon', inputType: 'text' },
        { label: 'מידע עדכני', fieldId: 'info', inputType: 'text' }
      ]
    },
    {
      type: 'form',
      header: 'הולכת שטח',
      data: [
        { label: 'עוגן', fieldId: 'ogen', inputType: 'text' },
        { label: 'הולכה', fieldId: 'holacha', inputType: 'textArea' },
        { label: 'הישג נדרש', fieldId: 'requiredAchievment', inputType: 'text' }
      ]
    }
  ]
}; 
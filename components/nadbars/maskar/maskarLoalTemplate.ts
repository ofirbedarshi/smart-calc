import { NadbarTemplate, NadbarType } from '../../common/nadbarTypes';

export const DEFAULT_MASKAR_LOAL_TEMPLATE: NadbarTemplate = {
  id: 'maskar_loal_v1',
  name: 'מסק״ר Loal',
  type: NadbarType.Maskar,
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
        { label: 'ק אחרון כוחותינו', fieldId: 'ourForces', inputType: 'text' },
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
        { label: 'קסום', fieldId: 'kasoom', inputType: 'text' },
        { label: 'עננים + גובה', fieldId: 'clouds', inputType: 'text' },
        { label: 'הסתרים אחרונים', fieldId: 'lastH', inputType: 'text' }
      ]
    },
    {
      type: 'text',
      header: 'היתכנות לירי',
      data: "ציפור __ ממסק״ר יש/אין היתכנות לירי, אזימוט מסק״ר למטרה __. כיוון תקיפה/גובה עננות/הפרש ירי עמדת ירי- מטרה/תקשורת/הסתרים"
    },
    {
      type: 'conversation',
      data: [
        {
          type: 'me',
          data: "מסק״ר מציפור {{bird}} על המשותף, האם מוכן לעבודה?"
        },
        {
          type: 'they',
          data: "ציפור __ ממסק״ר, חיובי מוכן/שלילי, __ דק"
        },
        {
          type: 'me',
          data: "ביצוע על מטרה {{con_target}} בקסום {{kasoom}}"
        },
        {
          type: 'they',
          data: "ביצוע על מטרה __, בקסום __ זמן מעוף __ , רשאי ללזור."
        },
        {
          type: 'me',
          data: "קיבלתי זמן מעוף {{con_aoof}} רשאי ללזור מסק״ר מציפור {{con_tzipor3}} למטרה {{con_target2}} - שגר"
        },
        {
          type: 'they',
          data: "שוגר, __ שניות"
        },
        {
          type: 'me',
          data: `דיווח תוצאות - ״קבל פגיעה/לא פגיאה״ + המלצות להשלמה אם נדרש`
        },
        
      ]
    },
  ]
}; 
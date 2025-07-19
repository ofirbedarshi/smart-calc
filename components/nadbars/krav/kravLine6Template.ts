import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_KRAV_LINE6_TEMPLATE: NadbarTemplate = {
  id: 'krav_line6_v1',
  name: `קרב 6 ליין`,
  version: '1.0',
  elements: [
    {
      type: 'header',
      data: `פורמט העברת מטרת קרב בנוהל ״הבזק״`,
    },
    {
      type: 'form',
      data: [
        { label: 'שם מטרה (דג_212_תאריך_שעה)', fieldId: 'targetName', inputType: 'text' },
        { label: 'נ.צ UTM', fieldId: 'natza', inputType: 'text', targetField: 'coords' },
        { label: 'מהות ורכיבים לתקיפה', fieldId: 'attack', inputType: 'none', constantText: 'בניין ק+1, חוליית נ״ט בקומה העליונה' },
        { label: 'כיוון/טווח כוחותינו', fieldId: 'ourTeam', inputType: 'none', constantText: 'כוחותינו 650 מ׳ דר׳ מז׳' },
        { label: 'נצ״א שפת השת״פ', fieldId: 'natza2', inputType: 'none', constantText: 'איתור 2035 או דבש 25,45,32' },
        { label: 'מתואם עד השעה', fieldId: 'hour', inputType: 'none', constantText: '14:55' },
      ]
    },
    {
      type: 'text',
      data: `
      <br><b>התאמת חימוש לסוג ומהות המטרה<br /></b>1. אויב בזמן חיות מטרה גדול - לפחות 30 דק׳ לתקיפת המטרה<br />2. הישג נדרש = השמדת המבנה</br>
<br><b>איסוף נתונים</b></br>
<br>1. מילוי טבלה ה 6 LINE</br>
<br>2. יש לוודא כי הכוחות מרוחקים לפחות 250/500 מטר בשטח פתוח/בנוי</br>
<br>3. יש לתאם עם הכוחות בסביבה לשמור על מרחקם מהמטרה בהתאם לטווחי הבטיחות עד לאחר תקיפת המטרה</br>
<br><b>אישור מפקד יחידה לתקיפה</b></br>
<br>1. עלייה מול מפקד היחידה ואישור של כל נתוני המטרה</br>
<br><b>העברת מטרה לתו״ש וקבלת זמן משוער לתקיפה</b></br>
<br>1. עלייה על תדר ״מבצעים יחידה״ מול ״סיפון קטלן״ והעברת נתוני 6 LINE</br>
<br>2. אישור קבלת נתונים מהתו״ש וקבלת זמן משוער לתקיפה</br>
<br><b>דיווח תוצאות ותקיפה</b></br>
<br>1. המתנה לזמן נפילת הפצצה ודיווח תוצאות על תדר ״מבצעים יחידה״</br>
      `,
    },
  ],
}; 
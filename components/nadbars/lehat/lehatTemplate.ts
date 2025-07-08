import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_LEHAT_TEMPLATE: NadbarTemplate = {
  id: 'lehat_v1',
  name: 'להט',
  version: '1.0',
  elements: [
    {
      type: 'conversation',
      targetFields: ['name', 'eastCoord', 'northCoord', 'height'],
      data: [
        {
          type: 'me',
          data: "ראם מציפור, האם אתה מבלה בענבים?"
        },
        {
          type: 'they',
          data: "חיובי, מבלה בענבים/שלילי, כמה קטנות"
        },
        {
          type: 'me',
          data: "קבל, קו״צ {{kotz3}}, כמו כן, גור {{goor3}} מעל פני הים."
        },
        {
          type: 'they',
          data: "קיבלתי, קו״צ __, גור__."
        },
        {
          type: 'me',
          data: "קבל למטרה {{name}} מרעום {{eastCoord}} (ספרה ספרה) צפע {{northCoord}} (ספרה ספרה)"
        },
        {
          type: 'they',
          data: "קיבלתי, למטרה __ (מספר שלם) מרעום __ (ספרה ספרה) צפע __ (ספרה ספרה)"
        },
        {
          type: 'me',
          data: "כמו כן, גמל {{height}} במטרים (מספר שלם)"
        },
        {
          type: 'they',
          data: "קיבלתי, גמל __ במטרים (מספר שלם). קבל, אמורה __ במעלות."
        },
        {
          type: 'me',
          data: "קיבלתי, אמורה {{amoora8}} במעלות. קבל אמורה {{validAmoora|dropdown:תקינה,לא תקינה}} - שפר ל{{angle8}} במעלות"
        },
        {
          type: 'me',
          data: "קבל למטרה {{name}} נדרש מסלול קשתי {{flightPathType|dropdown:ללא,ימני,שמאלי}} היסט מהנקודה ל{{offsetDirection|dropdown:ללא,ימין,שמאל,למעלה,למטה}} השהייה מסוג {{delayType|dropdown:ללא,קצרה,ארוכה}}"
        },
        {
          type: 'they',
          data: "קיבלתי למטרה __ נדרש מסלול קשתי ללא/ימני/שמאלי היסט מהנקודה ל(ללא/ימין/שמאל/למעלה/למטה) השהייה מסוג ללא/קצרה/ארוכה"
        },
        {
          type: 'they',
          data: "קבל ניתן לבצע עם מסלול קשתי ללא/ימני/שמאלי היסט מהנקודה ל(ללא/ימין/שמאל/למעלה/למטה) השהייה מסוג ללא/קצרה/ארוכה"
        },
        {
          type: 'me',
          data: "קיבלתי למטרה {{name}} ניתן לבצע עם מסלול קשתי {{flightPathType2|dropdown:ללא,ימני,שמאלי}} היסט מהנקודה ל{{offsetDirection2|dropdown:ללא,ימין,שמאל,למעלה,למטה}} השהייה מסוג {{delayType2|dropdown:ללא,קצרה,ארוכה}}"
        },
        {
          type: 'they',
          data: "קבל, האם יש הסתרים קרובים באיזור המטרה?"
        },
        {
          type: 'me',
          data: "{{coverStatus|dropdown:שלילי,חיובי}} - גובה הסתר ומרחק מהמטרה קבל למטרה {{target14}} הללויה"
        },
        {
          type: 'they',
          data: "קיבלתי, הללויה. קבל למטרה __ זמן מעוך משוער __, כמו כן מוקד"
        },
        {
          type: 'me',
          data: "למטרה {{target16}} אושר אושר"
        },
        {
          type: 'they',
          data: "קיבלתי אושר אושר - קבל, טורפדו"
        },
        {
          type: 'me',
          data: "קבל למטרה {{target18}} {{fargolType|dropdown:פרגול,הפוכה}} כמו כן - {{tunisiaNeed|dropdown:יש צורך בטוניס,אין צורך בטוניס}}. קבל נתוני השיגור {{launchDataType|dropdown:זהים,שונים}} (פירוט)."
        }
      ]
    },
  ]
}; 
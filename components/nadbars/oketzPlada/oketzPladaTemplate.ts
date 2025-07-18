import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_OKETZ_PLADA_TEMPLATE: NadbarTemplate = {
  id: 'oketz_plada_v1',
  name: 'עוקץ פלדה',
  version: '1.0',
  elements: [
    {
      type: 'conversation',
      targetFields: ['name', 'eastCoord', 'northCoord', 'height'],
      data: [
        {
          type: 'me',
          data: "תאו מציפור, האם אתה מוקי?"
        },
        {
          type: 'they',
          data: "חיובי/שלילי, כמה קטנות"
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
          data: `קבל למטרה {{name}} {{br}}מרעום {{eastCoord}}{{br}}צפע {{northCoord}}`
        },
        {
          type: 'they',
          data: "קיבלתי, למטרה __ (מספר שלם) מרעום __  צפע __ "
        },
        {
          type: 'me',
          data: "קבל, גובה רום קרקע (מעפ״י) {{room7}} במטר, גובה מעל הקרקע {{meter7}} במטר"
        },
        {
          type: 'they',
          data: "קיבלתי, גובה רום קרקע (מעפ״י) __ במטר, גובה מעל הקרקע __ במטר"
        },
        {
          type: 'me',
          data:  'קבל המאפיין מטרה: {{targetFeature|dropdown:חי"ר גלוי,חי"ר בביצורים,חי"ר מחופר,רכב רך,מבנה חזית,מבנה גג}}'
        },
        {
          type: 'they',
          data: "קיבלתי, מאפיין מטרה __ קבל אמורה __ באלפיות"
        },
        {
          type: 'me',
          data: "מאשר אמורה למטרה {{amora5}} באלפיות "
        },
        {
          type: 'they',
          data: "קבל, האם יש הסתרים קרובים באזור המטרה?"
        },
        {
          type: 'me',
          data: "{{mukiStatus|dropdown:חיובי,שלילי}} - כמה קטנות"
        },
        {
          type: 'they',
          data: "קבל זמן מעוף __ קטנקטנות"
        },
        {
          type: 'me',
          data: "קיבלתי זמן מעוף {{maoof9}} קטנטנות למטרה {{name}} הללויה"
        },
        {
          type: 'they',
          data: "קיבלתי הללויה. קבל מוכן לירי מטרה __"
        },
        {
          type: 'me',
          data: "קיבלתי מוכן לירי מטרה {{target11}} למטרה {{name}} אושר אושר"
        },
        {
          type: 'they',
          data: "קיבלתי, למטרה __ אושר אושרת קבל ראשונה נורתה"
        },
       
        {
          type: 'me',
          data: "דיווח פגיעה, פקודה להמשך"
        },
      ]
    },
  ]
}; 
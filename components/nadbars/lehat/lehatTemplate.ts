import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_LEHAT_TEMPLATE: NadbarTemplate = {
  id: 'lehat_v1',
  name: 'להט',
  version: '1.0',
  elements: [
    {
      type: 'conversation',
      data: [
        {
          type: 'me',
          data: "קבל מטרה {{name}} נדרש מסלול קשתי ללא/ימני/שמאלי היסט מהנקודה ל (ללא/ימין/שמאל/למעלה/למטה). השהייה מסוג ללא/קצרה/ארוכה"
        }
      ]
    },
  ]
}; 
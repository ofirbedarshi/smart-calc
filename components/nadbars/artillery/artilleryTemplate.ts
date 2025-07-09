import { artilleryHtml } from '@/app/screens/webview/pages/artilleryHtml';
import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_ARTILLERY_TEMPLATE: NadbarTemplate = {
  id: 'artillery_v1',
  name: 'ארטילריה',
  version: '1.0',
  elements: [
    {
      type: 'html',
      header: 'ארטילריה',
      data: artilleryHtml
    }
  ]
}; 
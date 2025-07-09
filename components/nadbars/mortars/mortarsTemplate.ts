import { mortarsHtml } from '@/app/screens/webview/pages/mortarsHtml';
import { NadbarTemplate } from '../../common/nadbarTypes';

export const DEFAULT_MORTARS_TEMPLATE: NadbarTemplate = {
  id: 'mortars_v1',
  name: 'מרגמות',
  version: '1.0',
  elements: [
    {
      type: 'html',
      header: 'מרגמות',
      data: mortarsHtml
    }
  ]
}; 
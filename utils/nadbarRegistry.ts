import { NadbarData } from '../components/common/nadbarTypes';
import { EXAMPLE_TEMPLATE } from '../components/nadbars/example/exampleTemplate';
import { DEFAULT_KRAV_BARKAT_TEMPLATE } from '../components/nadbars/krav/kravBarkatTemplate';
import { DEFAULT_KRAV_LASER_LOAL_TEMPLATE } from '../components/nadbars/krav/kravLaserLoalTemplate';
import { DEFAULT_KRAV_LASER_LOBL_TEMPLATE } from '../components/nadbars/krav/kravLaserLoblTemplate';
import { DEFAULT_KRAV_LINE6_TEMPLATE } from '../components/nadbars/krav/kravLine6Template';
import { DEFAULT_KRAV_SADURA_LASER_TEMPLATE } from '../components/nadbars/krav/kravSaduraLaserTemplate';
import { DEFAULT_MASKAR_LOAL_TEMPLATE } from '../components/nadbars/maskar/maskarLoalTemplate';
import { DEFAULT_MASKAR_TEMPLATE } from '../components/nadbars/maskar/maskarTemplate';

export const TEMPLATE_REGISTRY = {
  [DEFAULT_MASKAR_TEMPLATE.id]: DEFAULT_MASKAR_TEMPLATE,
  [DEFAULT_MASKAR_LOAL_TEMPLATE.id]: DEFAULT_MASKAR_LOAL_TEMPLATE,
  [EXAMPLE_TEMPLATE.id]: EXAMPLE_TEMPLATE,
  [DEFAULT_KRAV_BARKAT_TEMPLATE.id]: DEFAULT_KRAV_BARKAT_TEMPLATE,
  [DEFAULT_KRAV_SADURA_LASER_TEMPLATE.id]: DEFAULT_KRAV_SADURA_LASER_TEMPLATE,
  [DEFAULT_KRAV_LASER_LOBL_TEMPLATE.id]: DEFAULT_KRAV_LASER_LOBL_TEMPLATE,
  [DEFAULT_KRAV_LINE6_TEMPLATE.id]: DEFAULT_KRAV_LINE6_TEMPLATE,
  [DEFAULT_KRAV_LASER_LOAL_TEMPLATE.id]: DEFAULT_KRAV_LASER_LOAL_TEMPLATE,
};

export function getNadbarRoute(nadbar: NadbarData): string | null {
  switch (nadbar.templateId) {
    case DEFAULT_MASKAR_TEMPLATE.id:
      return '/TargetPage/Maskar';
    case DEFAULT_MASKAR_LOAL_TEMPLATE.id:
      return '/TargetPage/MaskarLoal';
    case EXAMPLE_TEMPLATE.id:
      return '/TargetPage/ExampleNadbar';
    case DEFAULT_KRAV_BARKAT_TEMPLATE.id:
      return '/TargetPage/KravBarkat';
    case DEFAULT_KRAV_SADURA_LASER_TEMPLATE.id:
      return '/TargetPage/KravSaduraLaser';
    case DEFAULT_KRAV_LASER_LOBL_TEMPLATE.id:
      return '/TargetPage/KravLaserLobl';
    case DEFAULT_KRAV_LINE6_TEMPLATE.id:
      return '/TargetPage/KravLine6';
    case DEFAULT_KRAV_LASER_LOAL_TEMPLATE.id:
      return '/TargetPage/KravLaserLoal';
    default:
      return null;
  }
}

export function getNadbarName(nadbar: NadbarData): string {
  const template = TEMPLATE_REGISTRY[nadbar.templateId];
  return template ? template.name : 'נדבר לא ידוע';
} 
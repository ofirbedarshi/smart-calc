import { NadbarData } from '../components/common/nadbarTypes';
import { DEFAULT_ARTILLERY_TEMPLATE } from '../components/nadbars/artillery/artilleryTemplate';
import { DEFAULT_CHEMAM_TEMPLATE } from '../components/nadbars/chemam/chemamTemplate';
import { EXAMPLE_TEMPLATE } from '../components/nadbars/example/exampleTemplate';
import { DEFAULT_KRAV_BARKAT_TEMPLATE } from '../components/nadbars/krav/kravBarkatTemplate';
import { DEFAULT_KRAV_LASER_LOAL_TEMPLATE } from '../components/nadbars/krav/kravLaserLoalTemplate';
import { DEFAULT_KRAV_LASER_LOBL_TEMPLATE } from '../components/nadbars/krav/kravLaserLoblTemplate';
import { DEFAULT_KRAV_LINE6_TEMPLATE } from '../components/nadbars/krav/kravLine6Template';
import { DEFAULT_KRAV_SADURA_LASER_TEMPLATE } from '../components/nadbars/krav/kravSaduraLaserTemplate';
import { DEFAULT_LEHAT_TEMPLATE } from '../components/nadbars/lehat/lehatTemplate';
import { DEFAULT_MASKAR_LOAL_TEMPLATE } from '../components/nadbars/maskar/maskarLoalTemplate';
import { DEFAULT_MASKAR_TEMPLATE } from '../components/nadbars/maskar/maskarTemplate';
import { DEFAULT_MORTARS_TEMPLATE } from '../components/nadbars/mortars/mortarsTemplate';
import { DEFAULT_OKETZ_PLADA_TEMPLATE } from '../components/nadbars/oketzPlada/oketzPladaTemplate';

export const TEMPLATE_REGISTRY = {
  [DEFAULT_MASKAR_TEMPLATE.id]: DEFAULT_MASKAR_TEMPLATE,
  [DEFAULT_MASKAR_LOAL_TEMPLATE.id]: DEFAULT_MASKAR_LOAL_TEMPLATE,
  [EXAMPLE_TEMPLATE.id]: EXAMPLE_TEMPLATE,
  [DEFAULT_KRAV_BARKAT_TEMPLATE.id]: DEFAULT_KRAV_BARKAT_TEMPLATE,
  [DEFAULT_KRAV_SADURA_LASER_TEMPLATE.id]: DEFAULT_KRAV_SADURA_LASER_TEMPLATE,
  [DEFAULT_KRAV_LASER_LOBL_TEMPLATE.id]: DEFAULT_KRAV_LASER_LOBL_TEMPLATE,
  [DEFAULT_KRAV_LINE6_TEMPLATE.id]: DEFAULT_KRAV_LINE6_TEMPLATE,
  [DEFAULT_KRAV_LASER_LOAL_TEMPLATE.id]: DEFAULT_KRAV_LASER_LOAL_TEMPLATE,
  [DEFAULT_OKETZ_PLADA_TEMPLATE.id]: DEFAULT_OKETZ_PLADA_TEMPLATE,
  [DEFAULT_MORTARS_TEMPLATE.id]: DEFAULT_MORTARS_TEMPLATE,
  [DEFAULT_CHEMAM_TEMPLATE.id]: DEFAULT_CHEMAM_TEMPLATE,
  [DEFAULT_LEHAT_TEMPLATE.id]: DEFAULT_LEHAT_TEMPLATE,
  [DEFAULT_ARTILLERY_TEMPLATE.id]: DEFAULT_ARTILLERY_TEMPLATE,
};

export function getNadbarRoute(nadbar: NadbarData): string | null {
  switch (nadbar.templateId) {
    case DEFAULT_MASKAR_TEMPLATE.id:
      return 'Maskar';
    case DEFAULT_MASKAR_LOAL_TEMPLATE.id:
      return 'MaskarLoal';
    case EXAMPLE_TEMPLATE.id:
      return 'ExampleNadbar';
    case DEFAULT_KRAV_BARKAT_TEMPLATE.id:
      return 'KravBarkat';
    case DEFAULT_KRAV_SADURA_LASER_TEMPLATE.id:
      return 'KravSaduraLaser';
    case DEFAULT_KRAV_LASER_LOBL_TEMPLATE.id:
      return 'KravLaserLobl';
    case DEFAULT_KRAV_LINE6_TEMPLATE.id:
      return 'KravLine6';
    case DEFAULT_KRAV_LASER_LOAL_TEMPLATE.id:
      return 'KravLaserLoal';
    case DEFAULT_OKETZ_PLADA_TEMPLATE.id:
      return 'OketzPlada';
    case DEFAULT_MORTARS_TEMPLATE.id:
      return 'Mortars';
    case DEFAULT_CHEMAM_TEMPLATE.id:
      return 'Chemam';
    case DEFAULT_LEHAT_TEMPLATE.id:
      return 'Lehat';
    case DEFAULT_ARTILLERY_TEMPLATE.id:
      return 'Artillery';
    default:
      return null;
  }
}

export function getNadbarName(nadbar: NadbarData): string {
  const template = TEMPLATE_REGISTRY[nadbar.templateId];
  return template ? template.name : 'נדבר לא ידוע';
} 
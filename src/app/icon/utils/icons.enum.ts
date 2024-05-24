import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faCalendarAlt,
  faCircleMinus,
  faCirclePlus,
  faClose,
  faCog,
  faLanguage,
  faTrashAlt,
  faWandMagicSparkles,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { CustomMap } from '../../utils/struct-utils';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export enum IconsEnum {
  Calendar = 1,
  Trash,
  Settings,
  CircleMinus,
  CirclePlus,
  AngleLeft,
  AngleRight,
  Warning,
  WindowClose,
  Language,
  WandMagicSparkles,
  Close,
}

export namespace IconsEnum {
  export const getName = new CustomMap<IconsEnum, IconProp>([
    [IconsEnum.Calendar, faCalendarAlt as IconProp],
    [IconsEnum.Trash, faTrashAlt as IconProp],
    [IconsEnum.Settings, faCog as IconProp],
    [IconsEnum.Close, faClose as IconProp],
    [IconsEnum.CircleMinus, faCircleMinus as IconProp],
    [IconsEnum.CirclePlus, faCirclePlus as IconProp],
    [IconsEnum.AngleLeft, faAngleDoubleLeft as IconProp],
    [IconsEnum.AngleRight, faAngleDoubleRight as IconProp],
    [IconsEnum.Warning, faWarning as IconProp],
    [IconsEnum.Language, faLanguage as IconProp],
    [IconsEnum.WandMagicSparkles, faWandMagicSparkles as IconProp],
  ]);
}

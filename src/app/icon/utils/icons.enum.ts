import {
  IconDefinition,
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
  Close
}

export namespace IconsEnum {
  export const getName = new CustomMap<IconsEnum, IconDefinition>([
    [IconsEnum.Calendar, faCalendarAlt],
    [IconsEnum.Trash, faTrashAlt],
    [IconsEnum.Settings, faCog],
    [IconsEnum.Close, faClose],
    [IconsEnum.CircleMinus, faCircleMinus],
    [IconsEnum.CirclePlus, faCirclePlus],
    [IconsEnum.AngleLeft, faAngleDoubleLeft],
    [IconsEnum.AngleRight, faAngleDoubleRight],
    [IconsEnum.Warning, faWarning],
    [IconsEnum.Language, faLanguage],
    [IconsEnum.WandMagicSparkles, faWandMagicSparkles],
  ]);
}

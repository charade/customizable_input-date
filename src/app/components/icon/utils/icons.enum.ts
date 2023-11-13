import { CustomMap } from 'src/app/utils/struct-utils';
import {
  IconDefinition,
  IconName,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faCalendarAlt,
  faCalendarDays,
  faCalendarPlus,
  faChevronLeft,
  faChevronRight,
  faCircleMinus,
  faCirclePlus,
  faClose,
  faCog,
  faCross,
  faLanguage,
  faMinusCircle,
  faTrashAlt,
  faWandMagicSparkles,
  faWarning,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

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

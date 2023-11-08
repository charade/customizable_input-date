import { CustomMap } from 'src/app/utils/struct-utils';
import {
  IconDefinition,
  IconName,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faCalendarPlus,
  faChevronLeft,
  faChevronRight,
  faCircleMinus,
  faCirclePlus,
  faCog,
  faTrashAlt,
  faWarning,
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
}

export namespace IconsEnum {
  export const getName = new CustomMap<IconsEnum, IconDefinition>([
    [IconsEnum.Calendar, faCalendar],
    [IconsEnum.Trash, faTrashAlt],
    [IconsEnum.Settings, faCog],
    [IconsEnum.CircleMinus, faCircleMinus],
    [IconsEnum.CirclePlus, faCirclePlus],
    [IconsEnum.AngleLeft, faAngleDoubleLeft],
    [IconsEnum.AngleRight, faAngleDoubleRight],
    [IconsEnum.Warning, faWarning],
  ]);
}

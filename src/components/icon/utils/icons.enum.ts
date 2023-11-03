import { CustomMap } from 'src/app/utils/struct-utils';
import {
  IconDefinition,
  IconName,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faArrowLeft,
  faArrowRight,
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faCog,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

export enum IconsEnum {
  Calendar = 1,
  Trash,
  Settings,
  ArrowLeft,
  ArrowRight,
  AngleLeft,
  AngleRight,
}

export namespace IconsEnum {
  export const getName = new CustomMap<IconsEnum, IconDefinition>([
    [IconsEnum.Calendar, faCalendar],
    [IconsEnum.Trash, faTrashAlt],
    [IconsEnum.Settings, faCog],
    [IconsEnum.ArrowLeft, faArrowLeft],
    [IconsEnum.AngleLeft, faAngleDoubleLeft],
    [IconsEnum.AngleRight, faAngleDoubleRight],
  ]);
}

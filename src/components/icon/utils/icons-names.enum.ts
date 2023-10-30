import { CustomMap } from 'src/app/utils/struct-utils';
import {
  IconDefinition,
  IconName,
  faCalendar,
} from '@fortawesome/free-solid-svg-icons';

export enum IconsEnum {
  Calendar = 'calendar-alt',
}

export namespace IconsEnum {
  export const getName = () =>
    new CustomMap<IconName, IconDefinition>([[IconsEnum.Calendar, faCalendar]]);
}

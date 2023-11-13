import * as dayjs from 'dayjs';
import { Language } from '../../../../utils/languages';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.locale('en');

export namespace DateUtils {
  type DateType = string | dayjs.Dayjs | Date;

  export enum FormatEnum {
    YYYY_MM_DD_hh_mm = 'YYYY-MM-DD -- HH:mm',
    YYYY__MM__DD_hh_mm = 'YYYY/ MM/ DD -- HH:mm ',
    DD_MM_YYYY_hh_mm = 'DD-MM-YYYY -- HH:mm',
    DD__MM__YYYY_hh_mm = 'DD/ MM/ YYYY -- HH:mm',
    En_DateOnly = 'YYYY/MM/DD'
  }

  export const settingsDateFormats = [
    FormatEnum.YYYY_MM_DD_hh_mm,
    FormatEnum.YYYY__MM__DD_hh_mm,
    FormatEnum.DD_MM_YYYY_hh_mm,
    FormatEnum.DD__MM__YYYY_hh_mm,
  ].map((value) => ({ value }));

  export const isValidDate = (date: DateType): boolean => {
    return dayjs(date).isValid();
  };

  export const isAfterDate = (
    date1: DateType,
    date2: dayjs.OpUnitType
  ): boolean => {
    return (
      dayjs(date1).isValid() &&
      dayjs(date2).isValid() &&
      dayjs(date1).isAfter(date2)
    );
  };

  export const convertToDate = (date: DateType, format?: string): string => {
    return isValidDate(date) && dayjs(date).format(format || 'DD/MM/YYY');
  };

  export const isOutOfDateRange = (
    date: dayjs.Dayjs,
    minDate?: dayjs.Dayjs,
    maxDate?: dayjs.Dayjs
  ): boolean => {
    return (
      (isValidDate(minDate) && isValidDate(date) && date.isAfter(minDate)) ||
      (isValidDate(maxDate) && isValidDate(date) && date.isBefore(maxDate))
    );
  };

  export const convertToDateTime = (
    date: DateType,
    format?: string
  ): string => {
    return isValidDate(date) && dayjs(date).format(format || 'DD/MM/YYY HH:MM');
  };

  export const formaDateUnit = (unit: number): string => {
    return `${unit < 10 ? '0' + unit : unit}`;
  };
}

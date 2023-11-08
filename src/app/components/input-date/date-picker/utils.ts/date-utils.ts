import * as dayjs from 'dayjs';
import { Language } from '../../../../utils/languages';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.locale('en');

export namespace DateUtils {
  type DateType = string | dayjs.Dayjs | Date;

  export enum FormatEnum {
    En_Date = 'YYYY-MM-DD',
  }

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

  export const formatDate = (
    selectedDate: dayjs.Dayjs,
    locale: string
  ): string => {
    const month = formaDateUnit(selectedDate.month() + 1); // range month from 1-12
    const monthDay = formaDateUnit(selectedDate.date());
    const hours = formaDateUnit(selectedDate.hour());
    const minutes = formaDateUnit(selectedDate.minute());

    return Language.convertLocalToLang.value(locale) === Language.Fr
      ? `${monthDay}/ ${month}/ ${selectedDate.year()} - ${
          hours + ' : ' + minutes
        } `
      : `${selectedDate.year()}/ ${month}/ ${monthDay} - ${
          hours + ' : ' + minutes
        }`;
  };
}

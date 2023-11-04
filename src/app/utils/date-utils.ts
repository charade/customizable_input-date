import * as dayjs from 'dayjs';
import { Language } from './languages';

dayjs.locale('en');

export namespace DateUtils {
  type DateType = string | dayjs.Dayjs | Date;

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

  const formaDateUnit = (unit: number): string => {
    return `${unit < 10 ? '0' + unit : unit}`;
  };

  export const formatDate = (
    date: dayjs.Dayjs,
    locale: string,
    displayTime?: boolean
  ): string => {
    const month = formaDateUnit(date.month());
    const hours = formaDateUnit(date.hour());
    const minutes = formaDateUnit(date.minute());

    return Language.convertLocalToLang.value(locale) === Language.Fr
      ? `${date.date()}/ ${month}/ ${date.year()} - ${
          displayTime && hours + ' : ' + minutes
        } `
      : `${date.year()}/ ${month}/ ${date.date()} - ${
          displayTime && hours + ' : ' + minutes
        }`;
  };
}

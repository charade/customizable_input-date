import * as dayjs from 'dayjs';

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

  export const convertToDateTime = (
    date: DateType,
    format?: string
  ): string => {
    return isValidDate(date) && dayjs(date).format(format || 'DD/MM/YYY HH:MM');
  };
}

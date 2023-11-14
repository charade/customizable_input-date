import * as dayjs from 'dayjs';
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
    En_DateOnly = 'YYYY/MM/DD',
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

  export const formaDateUnit = (unit: number): string => {
    return `${unit < 10 ? '0' + unit : unit}`;
  };
}

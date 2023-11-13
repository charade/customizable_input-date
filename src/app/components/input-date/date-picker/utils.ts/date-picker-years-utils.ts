import { DatePickerUtils } from './date-picker-utils.index';
import { range } from 'lodash';

export namespace DatePickerYearUtils {
  export const generateYears = (): DatePickerUtils.DateType[][] => {
    const yearsDataSource: DatePickerUtils.DateType[][] = [];

    const years: DatePickerUtils.DateType[] = range(
      DatePickerUtils.BIG_BANG_YEAR,
      DatePickerUtils.APOCALYPSE_YEAR
    ).map((year) => ({
      value: year,
    }));

    while (years.length) {
      yearsDataSource.push(years.splice(0, 7));
    }

    return yearsDataSource;
  };
}

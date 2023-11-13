import { range } from 'lodash';
import { DatePickerUtils } from './date-picker-utils.index';
import { DatePickerEnum } from './date-picker.enum';

export namespace DatePickerMonthsUtils {
  export const generateMonths = (): DatePickerUtils.DateType[][] => {
    const monthDataSource: DatePickerUtils.DateType[][] = [];

    const months: DatePickerUtils.DateType[] = range(0, 12).map((month) => ({
      value: month,
      label: DatePickerEnum.getMonthName.value(month),
    }));


    while (months.length) {
      monthDataSource.push(months.splice(0, 4));
    }

    return monthDataSource;
  };
}

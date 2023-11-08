import { range } from 'lodash';
import { DatePickerEnum } from './date-picker.enum';
import { WritableSignal } from '@angular/core';
import * as dayjs from 'dayjs';

export namespace DatePickerUtils {
  const BIG_BANG_YEAR = 1600;
  const APOCALYPSE_YEAR = 2504;

  export interface DateType {
    value: string | number;
    label?: string;
  }

  export interface DisplayedDateType {
    selectedDate: WritableSignal<dayjs.Dayjs>;
    locale: string;
  }

  export interface HolydaysType {
    [key: string]: string;
  }

  export type Day = DateType & {
    isSelected: boolean;
    id: string;
    swipeMonth?: 1 | -1;
    info?: string;
  };

  export const generateMonths = (): DateType[][] => {
    const monthDataSource: DateType[][] = [];

    const months: DateType[] = range(1, 13).map((month) => ({
      value: month,
      label: DatePickerEnum.getMonthName.value(month),
    }));

    while (months.length) {
      monthDataSource.push(months.splice(0, 4));
    }

    return monthDataSource;
  };

  export const generateYears = (): DateType[][] => {
    const yearsDataSource: DateType[][] = [];

    const years: DateType[] = range(BIG_BANG_YEAR, APOCALYPSE_YEAR).map(
      (year) => ({
        value: year,
      })
    );

    while (years.length) {
      yearsDataSource.push(years.splice(0, 7));
    }

    return yearsDataSource;
  };
}

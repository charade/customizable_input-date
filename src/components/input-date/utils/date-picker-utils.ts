import * as dayjs from 'dayjs';
import { range } from 'lodash';
import { DateUtils } from 'src/app/utils/date-utils';
import { InputDateEnum } from './input-date.enum';

export namespace DatePickerUtils {
  const BIG_BANG_YEAR = 1600;
  const APOCALYPSE_YEAR = 2504;

  export interface DateType {
    value: string | number;
    outOfDate: boolean;
    isSelected?: boolean;
    label?: string;
  }

  export type Day = DateType & {
    swipeMonth?: 1 | -1;
  };

  export const generateDaysOfMonth = (
    date: dayjs.Dayjs,
    minDate?: dayjs.Dayjs,
    maxDate?: dayjs.Dayjs
  ): Day[][] => {
    const selectedDate = dayjs(date);
    const firstWeekDayOfMonth = selectedDate.startOf('month').day();

    const lastWeekDayOfMonth = selectedDate.endOf('month').day();
    const daysInLastMonth = selectedDate.subtract(1, 'month').daysInMonth();

    const displayedDays: Day[] = [];
    const daysDataSource: Day[][] = [];

    const diffDaysWithPastMonth = range(7, firstWeekDayOfMonth + 1).length - 1;
    /*Filling the start of the week with past month days
     * if the selected month doesn't start on Monday
     */
    if (diffDaysWithPastMonth) {
      displayedDays.push(
        ...range(
          daysInLastMonth - diffDaysWithPastMonth + 1,
          daysInLastMonth + 1
        ).map(
          (monthDay: number): Day => ({
            swipeMonth: -1,
            value: monthDay,
            outOfDate: DateUtils.isOutOfDateRange(
              dayjs(selectedDate).subtract(1, 'month').set('date', monthDay),
              minDate,
              maxDate
            ),
          })
        )
      );
    }
    /* Filling then with the selected month days */
    displayedDays.push(
      ...range(1, selectedDate.daysInMonth() + 1).map(
        (monthDay: number): Day => ({
          value: monthDay,
          outOfDate: DateUtils.isOutOfDateRange(
            dayjs(selectedDate).set('date', monthDay),
            minDate,
            maxDate
          ),
        })
      )
    );
    /* Finally filling with the next month days if the selected month not ending on sunday */
    const diffDaysWithNextMonth = range(0, 7 - lastWeekDayOfMonth).length;

    if (diffDaysWithNextMonth) {
      displayedDays.push(
        ...range(1, diffDaysWithNextMonth + 1).map(
          (monthDay: number): Day => ({
            value: monthDay,
            swipeMonth: 1,
            outOfDate: DateUtils.isOutOfDateRange(
              dayjs(selectedDate).add(1, 'month').set('date', monthDay),
              minDate,
              maxDate
            ),
          })
        )
      );
    }

    while (displayedDays.length) {
      daysDataSource.push(displayedDays.splice(0, 7));
    }

    return daysDataSource;
  };

  export const generateMonths = (
    date: dayjs.Dayjs,
    minDate: dayjs.Dayjs,
    maxDate: dayjs.Dayjs
  ): DateType[][] => {
    const monthDataSource: DateType[][] = [];
    const selectedDate = dayjs(date);

    const months: DateType[] = range(1, 13).map((month) => ({
      value: month,
      label: InputDateEnum.getMonthName.value(month),
      outOfDate:
        selectedDate.set('month', month).isBefore(minDate) ||
        selectedDate.set('month', month).isAfter(maxDate),
    }));

    while (months.length) {
      monthDataSource.push(months.splice(0, 4));
    }

    return monthDataSource;
  };

  export const generateYears = (
    minDate: dayjs.Dayjs,
    maxDate: dayjs.Dayjs
  ): DateType[][] => {
    const yearsDataSource: DateType[][] = [];

    const years: DateType[] = range(BIG_BANG_YEAR, APOCALYPSE_YEAR).map(
      (year) => ({
        value: year,
        outOfDate:
          dayjs().set('year', year).isBefore(minDate) ||
          dayjs().set('year', year).isAfter(maxDate),
      })
    );

    while (years.length) {
      yearsDataSource.push(years.splice(0, 7));
    }

    return yearsDataSource;
  };
}

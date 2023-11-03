import * as dayjs from 'dayjs';
import { range } from 'lodash';
import { DateUtils } from 'src/app/utils/date-utils';
import { InputDateEnum } from './input-date.enum';

export namespace InputDateUtils {
  export interface DateType {
    value: string | number;
    outOfDate: boolean;
    isSelected?: boolean;
  }

  export type Day = DateType & {
    swipeMonth?: 1 | -1;
  };

  export const generateDaysOfMonth = (
    selectedDate: dayjs.Dayjs,
    minDate?: dayjs.Dayjs,
    maxDate?: dayjs.Dayjs
  ): Day[][] => {
    const firstWeekDayOfMonth = selectedDate.startOf('month').day();

    const lastWeekDayOfMonth = selectedDate.endOf('month').day();
    const daysInLastMonth = selectedDate.subtract(1, 'month').daysInMonth();

    const displayedDays: Day[] = [];
    const daysDataSource: Day[][] = [];

    const diffDaysWithLastMonth = range(7, firstWeekDayOfMonth + 1).length - 1;
    /*Filling the start of the week with past month days
     * if the selected month doesn't start on Monday
     */
    if (diffDaysWithLastMonth) {
      displayedDays.push(
        ...range(
          daysInLastMonth - diffDaysWithLastMonth + 1,
          daysInLastMonth + 1
        ).map(
          (dayOfMonth: number): Day => ({
            swipeMonth: -1,
            value: dayOfMonth,
            outOfDate: [minDate, maxDate].some((date) => {
              const dateMinusOneMonth = selectedDate.subtract(1, 'month');

              return (
                DateUtils.isValidDate(date) &&
                DateUtils.isOutOfDateRange(minDate, maxDate, dateMinusOneMonth)
              );
            }),
          })
        )
      );
    }
    /* Filling then with the selected month days */
    displayedDays.push(
      ...range(0, selectedDate.daysInMonth()).map(
        (monthDay: number): Day => ({
          value: monthDay + 1,
          outOfDate: [minDate, maxDate].some(
            (date) =>
              DateUtils.isValidDate(date) &&
              DateUtils.isOutOfDateRange(minDate, maxDate, selectedDate)
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
            outOfDate: [minDate, maxDate].some((date) => {
              const datePlusOneMonth = selectedDate.add(1, 'month');
              return (
                DateUtils.isValidDate(date) &&
                DateUtils.isOutOfDateRange(minDate, maxDate, datePlusOneMonth)
              );
            }),
          })
        )
      );
    }

    while (displayedDays.length) {
      daysDataSource.push(displayedDays.splice(0, 7));
    }

    return daysDataSource;
  };

  export const generateMonth = (): DateType[][] => {
    const monthDataSource: DateType[][] = [];

    const months = range(1, 13).map((month) =>
      InputDateEnum.getMonthName.value(month)
    );

    while (months.length) {
      monthDataSource.push(months.splice(0, 5));
    }

    return monthDataSource;
  };

  export const generateYears = (
    big_bang: number,
    apocalypse: number
  ): DateType[][] => {
    const yearsDataSource: DateType[][] = [];
    const years = range(big_bang, apocalypse);

    while (years.length) {
      yearsDataSource.push(years.splice(big_bang, apocalypse + 1));
    }

    return yearsDataSource;
  };
}

import * as dayjs from 'dayjs';
import { range } from 'lodash';
import { DateUtils } from 'src/app/utils/date-utils';
import { InputDateEnum } from './input-date.enum';

export namespace DatePickerUtils {
  const BIG_BANG_YEAR = 1600;
  const APOCALYPSE_YEAR = 2504;

  export interface DateType {
    value: string | number;
    label?: string;
  }

  export type Day = DateType & {
    swipeMonth?: 1 | -1;
    isSelected: boolean;
  };
  /**
   * Check selected month day helper
   * Checking Day.isSelected unicity on a same view
   */
  const parseSelectedDate = (selectedDate: dayjs.Dayjs) =>
    `${selectedDate.date()}-${selectedDate.month()}-${selectedDate.year()}`;

  export const generateDaysOfMonth = (selectedDate: dayjs.Dayjs): Day[][] => {
    let firstWeekDayOfTheMonth = selectedDate.startOf('month').day();
    firstWeekDayOfTheMonth =
      firstWeekDayOfTheMonth < 1 ? 7 : firstWeekDayOfTheMonth;
    let lastWeekDayOfTheMonth = selectedDate.endOf('month').day();
    lastWeekDayOfTheMonth =
      lastWeekDayOfTheMonth < 1 ? 7 : lastWeekDayOfTheMonth;
    const daysInLastMonth = selectedDate.subtract(1, 'month').daysInMonth();

    const displayedDays: Day[] = [];
    const daysDataSource: Day[][] = [];

    /*Filling the start of the week with past month days
     * if the selected month doesn't start on Monday
     */
    if (firstWeekDayOfTheMonth > 1) {
      displayedDays.push(
        ...range(
          // filling the current week with pastMonthLastDay - diffWeekDays With current month
          daysInLastMonth - firstWeekDayOfTheMonth + 2,
          daysInLastMonth + 1
        ).map((monthDay: number): Day => {
          return {
            swipeMonth: -1,
            value: monthDay,
            isSelected:
              `${monthDay}-${selectedDate
                .subtract(1, 'month')
                .month()}-${selectedDate.year()}` ===
              parseSelectedDate(selectedDate),
          };
        })
      );
    }

    /* Filling then with the selected month days */
    displayedDays.push(
      ...range(1, selectedDate.daysInMonth() + 1).map(
        (monthDay: number): Day => ({
          value: monthDay,
          isSelected:
            `${monthDay}-${selectedDate.month()}-${selectedDate.year()}` ===
            parseSelectedDate(selectedDate),
        })
      )
    );
    /* Finally filling with the next month days if the selected month not ending on sunday */
    if (lastWeekDayOfTheMonth < 7) {
      displayedDays.push(
        ...range(1, 8 - lastWeekDayOfTheMonth).map(
          (monthDay: number): Day => ({
            value: monthDay,
            swipeMonth: 1,
            isSelected:
              `${monthDay}-${selectedDate
                .add(1, 'month')
                .month()}-${selectedDate.year()}` ===
              parseSelectedDate(selectedDate),
          })
        )
      );
    }

    while (displayedDays.length) {
      daysDataSource.push(displayedDays.splice(0, 7));
    }

    return daysDataSource.splice(0, 5);
  };

  export const generateMonths = (): DateType[][] => {
    const monthDataSource: DateType[][] = [];

    const months: DateType[] = range(1, 13).map((month) => ({
      value: month,
      label: InputDateEnum.getMonthName.value(month),
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
      yearsDataSource.push(years.splice(0, 8));
    }

    return yearsDataSource;
  };
}

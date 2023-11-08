import * as dayjs from 'dayjs';
import { range } from 'lodash';
import { DateUtils } from 'src/app/components/input-date/date-picker/utils.ts/date-utils';
import { DatePickerUtils } from './date-picker-utils';

export namespace DatePickerWeekUtils {
  /** uniqueness helper */
  export const getDayId = (
    year: number,
    month: number,
    monthDay: number
  ): string => dayjs(`${year}-${month}-${monthDay}`).format('YYYY-MM-DD');

  export const generateDaysOfMonth = (
    _selectedDate: dayjs.Dayjs,
    holydays: DatePickerUtils.HolydaysType
  ): DatePickerUtils.Day[][] => {
    const selectedDate = _selectedDate || dayjs();

    /** if month started on Sunday(equals 0) turn it to range (1, 7) */
    let firstWeekDayOfTheMonth = selectedDate.startOf('month').day();
    firstWeekDayOfTheMonth =
      firstWeekDayOfTheMonth < 1 ? 7 : firstWeekDayOfTheMonth;

    let lastWeekDayOfTheMonth = selectedDate.endOf('month').day();
    lastWeekDayOfTheMonth =
      lastWeekDayOfTheMonth < 1 ? 7 : lastWeekDayOfTheMonth;

    let displayedDays: DatePickerUtils.Day[] = [];
    const daysDataSource: DatePickerUtils.Day[][] = [];
    /*Filling the start of the week with past month days
     * if the selected month doesn't start on Monday
     */
    if (firstWeekDayOfTheMonth > 1) {
      displayedDays.push(
        ...generatePastMonthDays(selectedDate, firstWeekDayOfTheMonth)
      );
    }

    /* Filling then with the selected month days */
    displayedDays.push(...generateCurrentMonthDays(selectedDate));

    /* Finally filling with the next month days if the selected month not ending on sunday */
    if (lastWeekDayOfTheMonth < 7) {
      displayedDays.push(
        ...generateNextMonthDays(selectedDate, lastWeekDayOfTheMonth)
      );
    }

    /** settings holidays tooltip label */
    displayedDays = displayedDays.map((day) => ({
      ...day,
      info: holydays[day.id],
    }));

    /** divide week days to display into 7 columns table*/
    while (displayedDays.length) {
      daysDataSource.push(displayedDays.splice(0, 7));
    }

    /** displaying the week/days table in 7x5 */
    return daysDataSource.splice(0, 5);
  };

  const generateCurrentMonthDays = (
    selectedDate: dayjs.Dayjs
  ): DatePickerUtils.Day[] => {
    return range(1, selectedDate.daysInMonth() + 1).map(
      (monthDay: number): DatePickerUtils.Day => {
        const month = selectedDate.month() + 1;
        const year = selectedDate.year();
        const id = getDayId(year, month, monthDay);

        return {
          id,
          value: monthDay,
          isSelected: id === selectedDate.format(DateUtils.FormatEnum.En_Date),
        };
      }
    );
  };

  const generatePastMonthDays = (
    selectedDate: dayjs.Dayjs,
    firstWeekDayOfTheMonth: number
  ): DatePickerUtils.Day[] => {
    const daysInLastMonth = selectedDate.subtract(1, 'month').daysInMonth();
    return range(
      // filling the current week with pastMonthLastDay - diffWeekDays With current month
      daysInLastMonth - firstWeekDayOfTheMonth + 2,
      daysInLastMonth + 1
    ).map((monthDay: number): DatePickerUtils.Day => {
      const month = selectedDate.month();
      const year = selectedDate.year();
      const id = getDayId(year, month, monthDay);
      return {
        id,
        swipeMonth: -1,
        value: monthDay,
        /** checking uniqueness */
        isSelected: id === selectedDate.format(DateUtils.FormatEnum.En_Date),
      };
    });
  };

  const generateNextMonthDays = (
    selectedDate: dayjs.Dayjs,
    lastWeekDayOfTheMonth
  ) => {
    return range(1, 8 - lastWeekDayOfTheMonth).map(
      (monthDay: number): DatePickerUtils.Day => {
        const month = selectedDate.add(2, 'month').month();
        const year = selectedDate.year();
        const id = getDayId(year, month, monthDay);
        return {
          id,
          value: monthDay,
          swipeMonth: 1,
          isSelected: id === selectedDate.format(DateUtils.FormatEnum.En_Date),
        };
      }
    );
  };
}

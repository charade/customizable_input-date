import * as dayjs from 'dayjs';
import { range } from 'lodash';
import { DatePickerUtils } from './date-picker-utils.index';
import { DateUtils } from './date-utils';

export namespace DatePickerWeekUtils {
  export const generateDaysOfMonth = (
    _selectedDate: dayjs.Dayjs
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

    /** styling selected day */
    displayedDays = displayedDays.map((day) => ({
      ...day,
      isSelected:
        day.id === selectedDate.format(DateUtils.FormatEnum.En_DateOnly),
    }));

    /** divide week days to display into 7 columns table*/
    while (displayedDays.length) {
      daysDataSource.push(displayedDays.splice(0, 7));
    }

    return daysDataSource;
  };

  const generatePastMonthDays = (
    selectedDate: dayjs.Dayjs,
    firstWeekDayOfTheMonth: number
  ): DatePickerUtils.Day[] => {
    /** helps to know the last visible months days in calendar
     * then we subtract to fill the calendar
     * if current month not starting on a Monday
     */
    const daysInLastMonth = selectedDate.subtract(1, 'month').daysInMonth();
    return range(
      // filling the current week with pastMonthLastDay - diffWeekDays With current month
      daysInLastMonth - firstWeekDayOfTheMonth + 2,
      daysInLastMonth + 1
    ).map(
      (monthDay: number): DatePickerUtils.Day => ({
        id: selectedDate
          .subtract(1, 'month')
          .set('date', monthDay)
          .format(DateUtils.FormatEnum.En_DateOnly),
        swipeMonth: -1,
        value: monthDay,
      })
    );
  };

  const generateCurrentMonthDays = (
    selectedDate: dayjs.Dayjs
  ): DatePickerUtils.Day[] =>
    range(1, selectedDate.daysInMonth() + 1).map(
      (monthDay: number): DatePickerUtils.Day => ({
        id: selectedDate
          .set('date', monthDay)
          .format(DateUtils.FormatEnum.En_DateOnly),
        value: monthDay,
      })
    );

  const generateNextMonthDays = (
    selectedDate: dayjs.Dayjs,
    lastWeekDayOfTheMonth
  ) =>
    range(1, 8 - lastWeekDayOfTheMonth).map(
      (monthDay: number): DatePickerUtils.Day => ({
        id: selectedDate
          .add(1, 'month')
          .format(DateUtils.FormatEnum.En_DateOnly),
        value: monthDay,
        swipeMonth: 1,
      })
    );
}

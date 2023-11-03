import { CustomMap } from 'src/app/utils/struct-utils';

export namespace InputDateEnum {
  export enum Month {
    Jan = 1,
    Feb,
    Mar,
    Apr,
    May,
    June,
    Jul,
    Aug,
    Sept,
    oct,
    Nov,
    Dec,
  }

  export enum WeekDay {
    Mon = 1,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
    Sun,
  }

  export enum View {
    Dayjs = 1,
    Months,
    Years,
  }

  const monthNamekey = 'input.date.month';
  export const getMonthName = new CustomMap<Month, string>([
    [Month.Jan, monthNamekey + 'jan'],
    [Month.Feb, monthNamekey + 'feb'],
    [Month.Mar, monthNamekey + 'mar'],
    [Month.Apr, monthNamekey + 'apr'],
    [Month.May, monthNamekey + 'may'],
    [Month.June, monthNamekey + 'june'],
    [Month.Jul, monthNamekey + 'jul'],
    [Month.Aug, monthNamekey + 'aug'],
    [Month.Sept, monthNamekey + 'sep'],
    [Month.oct, monthNamekey + 'oct'],
    [Month.Nov, monthNamekey + 'oct'],
    [Month.Dec, monthNamekey + 'dec'],
  ]);

  const weekDayNameKey = 'input.date.weekDay.';
  export const getWeekDayName = new CustomMap<WeekDay, string>([
    [WeekDay.Mon, weekDayNameKey + 'mon'],
    [WeekDay.Tue, weekDayNameKey + 'tue'],
    [WeekDay.Wed, weekDayNameKey + 'wed'],
    [WeekDay.Thu, weekDayNameKey + 'thu'],
    [WeekDay.Fri, weekDayNameKey + 'fri'],
    [WeekDay.Sat, weekDayNameKey + 'sat'],
    [WeekDay.Sun, weekDayNameKey + 'sun'],
  ]);

  const viewModeKey = 'input.date.';
  export const viewModeToString = new CustomMap<View, string>([
    [View.Dayjs, viewModeKey + 'days'],
    [View.Months, viewModeKey + 'months'],
    [View.Years, viewModeKey + 'years'],
  ]);
}

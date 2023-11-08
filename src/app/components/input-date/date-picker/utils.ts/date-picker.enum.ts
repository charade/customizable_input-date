import { CustomMap } from 'src/app/utils/struct-utils';

export namespace DatePickerEnum {
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
    Week = 1,
    Months,
    Years,
  }

  export enum HolydaysEnum {
    NewYearDay = '1er janvier',
    MayoFirst = '1er mai',
    MayoEight = '8 mai',
    Ascension = 'Ascension',
    Pentecost = 'Lundi de Pentecôte',
    July14 = '14 juillet',
    Assumption = 'Assomption',
    Toussaint = 'Toussaint',
    November11 = '11 novembre',
    Christmas = 'Jour de Noël',
  }

  const holydayKey = 'input.date.holydays.';
  export const translateHolyday = new CustomMap<HolydaysEnum, string>([
    [HolydaysEnum.NewYearDay, holydayKey + 'newYearDay'],
    [HolydaysEnum.MayoFirst, holydayKey + 'mayFirst'],
    [HolydaysEnum.MayoEight, holydayKey + 'mayEight'],
    [HolydaysEnum.Ascension, holydayKey + 'ascension'],
    [HolydaysEnum.Pentecost, holydayKey + 'pentecost'],
    [HolydaysEnum.July14, holydayKey + 'july14'],
    [HolydaysEnum.Assumption, holydayKey + 'assumption'],
    [HolydaysEnum.Toussaint, holydayKey + 'toussaint'],
    [HolydaysEnum.November11, holydayKey + 'november11'],
    [HolydaysEnum.Christmas, holydayKey + 'christmas'],
  ]);

  const monthNamekey = 'input.date.month.';
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
    [Month.Nov, monthNamekey + 'nov'],
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
    [View.Week, viewModeKey + 'weeks'],
    [View.Months, viewModeKey + 'months'],
    [View.Years, viewModeKey + 'years'],
  ]);
}

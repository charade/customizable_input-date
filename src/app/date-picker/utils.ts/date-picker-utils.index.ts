import { WritableSignal } from '@angular/core';
import * as dayjs from 'dayjs';

export namespace DatePickerUtils {
  export const BIG_BANG_YEAR = 1600;
  export const APOCALYPSE_YEAR = 2504;

  export interface DateType {
    value: string | number;
    label?: string;
  }

  export interface HolydaysType {
    [key: string]: string;
  }

  export interface DisplayedDateType {
    selectedDate: WritableSignal<dayjs.Dayjs>;
    locale: string;
  }

  export type Day = DateType & {
    id?: string;
    isSelected?: boolean;
    swipeMonth?: 1 | -1;
    info?: string;
  };
}

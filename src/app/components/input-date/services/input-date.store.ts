import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DatePickerUtils } from '../date-picker/utils.ts/date-picker-utils';

export interface InputDateState {
  holydays: DatePickerUtils.HolydaysType;
}

const defaultState: InputDateState = {
  holydays: {},
};
@Injectable()
export class InputDateStore extends ComponentStore<InputDateState> {
  constructor() {
    super(defaultState);
  }

  readonly holidays$ = this.select((state) => state.holydays);
  readonly loadHolidays = this.updater(
    (state, holydays: DatePickerUtils.HolydaysType | null) => ({
      ...state,
      holydays: holydays || {},
    })
  );
}

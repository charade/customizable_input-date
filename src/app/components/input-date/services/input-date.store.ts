import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Language } from 'src/app/utils/languages';
import { DateUtils } from '../date-picker/utils.ts/date-utils';

export interface InputDateState {
  language: Language;
  dateFormat: DateUtils.FormatEnum;
}

const defaultState: InputDateState = {
  language: Language.En,
  dateFormat: DateUtils.FormatEnum.DD_MM_YYYY_hh_mm,
};
@Injectable()
export class InputDateStore extends ComponentStore<InputDateState> {
  constructor() {
    super(defaultState);
  }

  readonly getLang$ = this.select((state) => state.language);
  readonly setLang = this.updater((state, language: Language | null) => ({
    ...state,
    language,
  }));

  readonly getDateFormat$ = this.select((state) => state.dateFormat);
  readonly setDateFormat = this.updater(
    (state, dateFormat: DateUtils.FormatEnum | null) => ({
      ...state,
      dateFormat,
    })
  );
}

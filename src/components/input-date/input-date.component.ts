import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  forwardRef,
  signal,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as dayjs from 'dayjs';
import { IconComponent } from '../icon/icon.component';
import { IconsEnum } from '../icon/utils/icons-names.enum';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor, OnInit {
  @Input() startDate: string;
  @Input() endDate: string;
  @Input() dateOnly = false;
  icon = IconsEnum.Calendar;

  private selectedDate: Signal<dayjs.Dayjs> = signal(null);
  private _value = computed(() =>
    this.dateOnly
      ? DateUtils.convertToDate(this.selectedDate())
      : DateUtils.convertToDateTime(this.selectedDate())
  );

  ngOnInit(): void {}

  onChange: (value: string) => void;
  onTouch: () => void;

  disabled = false;

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {}
}

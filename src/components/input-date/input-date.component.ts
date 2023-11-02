import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Signal,
  ViewChild,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import * as dayjs from 'dayjs';

import { IconComponent } from '../icon/icon.component';

import { DateUtils } from 'src/app/utils/date-utils';
import { CustomOverlayService } from '../custom-overlay/overlay.service';

import { IconsEnum } from '../icon/utils/icons-names.enum';
import { PopoverComponent } from '../popover/popover.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  imports: [IconComponent, PopoverComponent, CdkOverlayOrigin],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CustomOverlayService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements ControlValueAccessor, OnInit {
  @ViewChild('popoverOrigin', { read: ElementRef<HTMLDivElement> })
  popoverOrigin: ElementRef<HTMLDivElement>;

  @Input() startDate: string;
  @Input() endDate: string;
  @Input() dateOnly = false;

  dateField: ComponentType<HTMLDivElement>;

  icon = IconsEnum.Calendar;
  disabled = false;

  private selectedDate: Signal<dayjs.Dayjs> = signal(null);

  private _value = computed(() => {
    if (this.disabled) {
      return;
    }

    return this.dateOnly
      ? DateUtils.convertToDate(this.selectedDate())
      : DateUtils.convertToDateTime(this.selectedDate());
  });

  private overlayService = inject(CustomOverlayService);

  ngOnInit(): void {}

  onChange: (value: string) => void;
  onTouch: () => void;

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

  openDatePickerOnClick() {
    this.overlayService.open(PopoverComponent, {
      origin: this.popoverOrigin,
      closeOnbackDropClicked: true,
    });
  }
}

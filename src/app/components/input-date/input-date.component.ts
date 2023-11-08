import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import * as dayjs from 'dayjs';

import { IconComponent } from '../icon/icon.component';
import { CustomOverlayService } from '../../shared-services/custom-overlay/overlay.service';

import { IconsEnum } from '../icon/utils/icons.enum';
import { ScrollStrategyEnum } from 'src/app/shared-services/custom-overlay/overlay.config';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerEnum } from './date-picker/utils.ts/date-picker.enum';
import { DateUtils } from './date-picker/utils.ts/date-utils';
import { DatePickerUtils } from './date-picker/utils.ts/date-picker-utils';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  imports: [IconComponent, TranslateModule, DatePickerComponent],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CustomOverlayService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent implements OnInit, ControlValueAccessor {
  @ViewChild('popoverOrigin', { read: ElementRef<HTMLDivElement> })
  popoverOrigin: Element;

  IconsEnum = IconsEnum;
  DatePickerEnum = DatePickerEnum;

  private translateService = inject(TranslateService);
  private overlayService = inject(CustomOverlayService);
  private viewContainerRef = inject(ViewContainerRef);
  private locale: WritableSignal<string> = signal('en');
  private cd = inject(ChangeDetectorRef);

  selectedDate: WritableSignal<dayjs.Dayjs> = signal(dayjs());

  /** manage formatted date displayed in the field */
  displayedDate = computed(() => {
    if (!DateUtils.isValidDate(this.selectedDate())) {
      return;
    }

    return (
      this.selectedDate() &&
      DateUtils.formatDate(this.selectedDate(), this.locale())
    );
  });
  ngOnInit(): void {
    this.translateService.use('en');
  }

  openDatePickerOnClick() {
    this.overlayService.open<DatePickerUtils.DisplayedDateType>(
      DatePickerComponent,
      {
        origin: this.popoverOrigin,
        scrollStrategy: ScrollStrategyEnum.Block,
        viewContainerRef: this.viewContainerRef,
        config: { width: '25rem', height: '31.5rem', hasBackdrop: true },
        data: {
          selectedDate: this.selectedDate,
          locale: this.locale(),
        },
      }
    );
  }

  writeValue(value: dayjs.Dayjs): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}

import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { BehaviorSubject, Observable } from 'rxjs';
import { range } from 'lodash';
import * as dayjs from 'dayjs';

import { IconComponent } from '../../icon/icon.component';
import { CustomOverlayService } from 'src/app/components/input-date/custom-overlay/overlay.service';

import { IconsEnum } from '../../icon/utils/icons.enum';
import { DatePickerEnum } from './utils.ts/date-picker.enum';

import { DateUtils } from './utils.ts/date-utils';
import { DatePickerUtils } from './utils.ts/date-picker-utils.index';
import { DatePickerWeekUtils } from './utils.ts/date-picker-weeks-utils';
import { OverlayUtils } from 'src/app/components/input-date/custom-overlay/overlay.config';
import { DatePickerYearUtils } from './utils.ts/date-picker-years-utils';
import { DatePickerMonthsUtils } from './utils.ts/date-picker-months-utils';

@Component({
  selector: 'app-input-date',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: true,
  imports: [
    IconComponent,
    TranslateModule,
    NgFor,
    NgIf,
    CdkTableModule,
    NgClass,
  ],
  providers: [TranslateService, CustomOverlayService],
})
export class DatePickerComponent implements OnInit {
  /** helps scrolling into view selected minute, hour, year */
  @ViewChild('datePicker') set _yearsTable(_: ElementRef) {
    window.document
      .querySelector(`#year-id-${this.selectedYear()}`)
      ?.scrollIntoView({ block: 'center' });

    window.document
      .querySelector(`#hour-id-${this.selectedHours()}`)
      .scrollIntoView();

    window.document
      .querySelector(`#minute-id-${this.selectedMinutes()}`)
      .scrollIntoView();
  }

  @ViewChild('popoverOrigin', { read: Element }) popoverOrigin: Element;

  private readonly weekView = DatePickerEnum.View.Week;
  private readonly yearsView = DatePickerEnum.View.Years;
  /* manages selected date state */
  /** Arbitrary choosing default view to be weeks */
  viewMode: WritableSignal<DatePickerEnum.View> = signal(
    DatePickerEnum.View.Week
  );

  IconsEnum = IconsEnum;
  DatePickerEnum = DatePickerEnum;
  DateUtils = DateUtils;
  minutesField = range(0, 60).map((minute) => DateUtils.formaDateUnit(minute));
  hoursField = range(0, 24).map((hour) => DateUtils.formaDateUnit(hour));

  readonly weekDataSource$: Observable<DatePickerUtils.Day[][]> = toObservable(
    computed(() => [
      ...DatePickerWeekUtils.generateDaysOfMonth(
        this.overlayRefData.selectedDate()
      ),
    ])
  );
  /** split week view in 7 columns table.
   * Chose starting from 1 because i used a lazy enum declaration
   */
  readonly weekTableColumns: string[] = range(1, 8).map(
    (weekName: DatePickerEnum.WeekDay) =>
      DatePickerEnum.getWeekDayName.value(weekName)
  );
  /* Helps to split month in 4 columns*/
  readonly monthsDataSource$ = new BehaviorSubject(
    DatePickerMonthsUtils.generateMonths()
  );
  readonly monthsTableFakeHeaders = range(0, 4).map((value: number) =>
    value.toString()
  );

  readonly yearsDataSource$ = new BehaviorSubject(
    DatePickerYearUtils.generateYears()
  );
  /** split years table in 7 columns */
  readonly yearsTableFakeHeaders = range(0, 6).map((value: number) =>
    value.toString()
  );

  readonly selectedMonth = computed(() =>
    (this.overlayRefData.selectedDate() || dayjs()).month()
  );
  readonly selectedYear = computed(() =>
    (this.overlayRefData.selectedDate() || dayjs()).year()
  );
  readonly currentWeekOfYear = computed(() =>
    (this.overlayRefData.selectedDate() || dayjs()).week()
  );
  readonly selectedHours = computed(() =>
    DateUtils.formaDateUnit(
      (this.overlayRefData.selectedDate() || dayjs()).hour()
    )
  );
  readonly selectedMinutes = computed(() =>
    DateUtils.formaDateUnit(
      (this.overlayRefData.selectedDate() || dayjs()).minute()
    )
  );

  private translateService = inject(TranslateService);
  private overlayRef = inject(OverlayRef);

  private overlayRefData: DatePickerUtils.DisplayedDateType = inject(
    OverlayUtils.OVERLAY_DATA_TOKEN<DatePickerUtils.DisplayedDateType>
  );

  ngOnInit(): void {
    this.translateService.use(this.overlayRefData.locale);
  }
  today() {
    this.overlayRefData.selectedDate.set(dayjs());
  }
  clearDate() {
    this.overlayRefData.selectedDate.set(null);
  }
  setMinutes(minutes: string) {
    this.overlayRefData.selectedDate.update((date) =>
      (date || dayjs()).set('minute', parseInt(minutes))
    );
  }
  setHours(hours: string) {
    this.overlayRefData.selectedDate.update((date) =>
      (date || dayjs()).set('hour', parseInt(hours))
    );
  }
  setDay(day: DatePickerUtils.Day) {
    // on select a day from another month
    if (day.swipeMonth) {
      const month =
        (this.overlayRefData.selectedDate() || dayjs()).month() +
        day.swipeMonth;

      this.setMonth(month);
    }

    this.overlayRefData.selectedDate.update((date) =>
      (date || dayjs()).set('date', day.value as number)
    );
  }
  setMonth(month: number) {
    this.overlayRefData.selectedDate.update((date) =>
      (date || dayjs()).set('month', month)
    );
  }
  setYear(year: number) {
    this.overlayRefData.selectedDate.update((date) =>
      (date || dayjs()).set('year', year)
    );
  }
  swipeViewOnDoubleArrowClick(direction: 1 | -1) {
    this.viewMode.update((view) =>
      view + direction > this.yearsView
        ? this.weekView
        : view + direction < this.weekView
        ? this.yearsView
        : view + direction
    );
  }
  swipeWeeksOnArrowClick(direction: 1 | -1) {
    this.overlayRefData.selectedDate.update((date) =>
      (date || dayjs()).add(direction, 'week')
    );
  }
  closeDatePickerModal() {
    this.overlayRef.dispose();
  }
}

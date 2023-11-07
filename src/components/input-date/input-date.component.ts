import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';

import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

import { CdkTableModule } from '@angular/cdk/table';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { range } from 'lodash';
import * as dayjs from 'dayjs';
import { IconComponent } from '../icon/icon.component';
import { CustomOverlayService } from '../../app/services/custom-overlay/overlay.service';
import { DateUtils } from 'src/app/utils/date-utils';

import { IconsEnum } from '../icon/utils/icons.enum';
import { InputDateEnum } from './utils/input-date.enum';

import { ScrollStrategyEnum } from '../../app/services/custom-overlay/overlay.config';
import { DatePickerUtils } from './utils/date-picker-utils';
import { InputDateAnimationsEnum } from './animations/input-date-animations';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  animations: [
    InputDateAnimationsEnum.slideLeft,
    InputDateAnimationsEnum.slideRight,
  ],
  imports: [
    IconComponent,
    TranslateModule,
    NgFor,
    NgIf,
    CdkTableModule,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TranslateService,
    CustomOverlayService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent {
  @ViewChild('popoverOrigin', { read: ElementRef<HTMLDivElement> })
  popoverOrigin: ElementRef<HTMLDivElement>;

  @ViewChild('yearsTable', { read: HTMLTableElement })
  yearsTable: HTMLTableElement;

  dateOnly = false;

  IconsEnum = IconsEnum;
  InputDateEnum = InputDateEnum;
  InputDateAnimationsEnum = InputDateAnimationsEnum;
  /** Aritrary choosing default view mode to be week */
  viewMode: WritableSignal<InputDateEnum.View> = signal(
    InputDateEnum.View.Week
  );

  /* managing date state */
  selectedDate: WritableSignal<dayjs.Dayjs> = signal(dayjs());

  minutesDataSource = range(0, 60);

  /** manage formatted date displayed in the field */
  displayedDate = computed(() => {
    if (!DateUtils.isValidDate(this.selectedDate())) {
      return;
    }

    return (
      this.selectedDate() &&
      DateUtils.formatDate(this.selectedDate(), this.locale(), !this.dateOnly)
    );
  });

  minutesField = range(0, 60).map((minute) => DateUtils.formaDateUnit(minute));
  hoursField = range(0, 24).map((hour) => DateUtils.formaDateUnit(hour));

  readonly weekDataSource$: Observable<DatePickerUtils.Day[][]> = toObservable(
    computed(() =>
      DatePickerUtils.generateDaysOfMonth(this.selectedDate() || dayjs())
    )
  );
  weekTableColumns: string[] = range(1, 8).map(
    (weekName: InputDateEnum.WeekDay) =>
      InputDateEnum.getWeekDayName.value(weekName)
  );

  readonly monthsDataSource$ = new BehaviorSubject(
    DatePickerUtils.generateMonths()
  );
  monthsTableFakeHeaders = range(0, 4).map((value: number) => value.toString());
  selectedMonth = computed(() => (this.selectedDate() || dayjs()).month() + 1); // display month range to feet 1-12

  yearsDataSource$ = new BehaviorSubject(DatePickerUtils.generateYears());
  yearsTableFakeHeaders = range(0, 7).map((value: number) => value.toString());
  selectedYear = computed(() => (this.selectedDate() || dayjs()).year());

  slideViewLabelAnimationState: WritableSignal<InputDateAnimationsEnum> =
    signal(InputDateAnimationsEnum.SlideLeftStart);

  readonly currentWeekOfYear = computed(() =>
    (this.selectedDate() || dayjs()).week()
  );

  private readonly weekView = InputDateEnum.View.Week;
  private readonly yearsView = InputDateEnum.View.Years;

  private locale: WritableSignal<string> = signal('es');

  private translateService = inject(TranslateService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayService = inject(CustomOverlayService);

  ngOnInit() {
    this.translateService.use(this.locale());
  }

  today() {
    this.selectedDate.set(dayjs());
  }

  clearDate() {
    this.selectedDate.set(null);
  }

  setDay(day: DatePickerUtils.Day) {
    // on select a day from another month
    if (day.swipeMonth) {
      const month = this.selectedDate().month() + day.swipeMonth;
      this.setMonth(month);
    }

    this.selectedDate.update((date) => date.set('date', day.value as number));
  }

  setMonth(month: number) {
    this.selectedDate.update(
      (date) => date.set('month', month - 1) // range back to dayjs range 0-11
    );
  }

  setYear(year: number) {
    this.selectedDate.update((date) => date.set('year', year));
  }

  swipeViewOnDoubleArrowClick(direction: 1 | -1) {
    this.slideViewLabelAnimationState.set(InputDateAnimationsEnum.SlideOutLeft);

    this.viewMode.update((view) =>
      view + direction > this.yearsView
        ? this.weekView
        : view + direction < this.weekView
        ? this.yearsView
        : view + direction
    );
  }

  swipeWeeksOnArrowClick(direction: 1 | -1) {
    this.selectedDate.update((date) => date.add(direction, 'week'));
  }

  openDatePickerOnClick(inputDateContent: TemplateRef<any>) {
    this.overlayService.open(inputDateContent, {
      origin: this.popoverOrigin,
      scrollStrategy: ScrollStrategyEnum.Block,
      viewContainerRef: this.viewContainerRef,
      config: { width: '22rem', height: '31.5rem', hasBackdrop: true },
    });
  }
}

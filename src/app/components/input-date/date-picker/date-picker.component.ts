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
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { range } from 'lodash';
import * as dayjs from 'dayjs';

import { IconComponent } from '../../icon/icon.component';
import { HttpService } from '../services/http.services';
import { IconsEnum } from '../../icon/utils/icons.enum';
import { DatePickerEnum } from './utils.ts/date-picker.enum';
import { DateUtils } from './utils.ts/date-utils';
import { DatePickerUtils } from './utils.ts/date-picker-utils';
import { DatePickerWeekUtils } from './utils.ts/date-picker.week.utils';
import { InputDateStore } from '../services/input-date.store';
import { CustomOverlayService } from 'src/app/shared-services/custom-overlay/overlay.service';
import { OverlayUtils } from 'src/app/shared-services/custom-overlay/overlay.config';

@Component({
  selector: 'app-input-date',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  standalone: true,
  // animations: [
  //   InputDateAnimationsEnum.slideLeft,
  //   InputDateAnimationsEnum.slideRight,
  // ],
  imports: [
    IconComponent,
    TranslateModule,
    NgFor,
    NgIf,
    CdkTableModule,
    NgClass,
  ],
  providers: [TranslateService, HttpService, CustomOverlayService],
})
export class DatePickerComponent implements OnInit {
  @ViewChild('yearsTable', {
    static: false,
  })
  set _yearsTable(_: ElementRef) {
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

  @ViewChild('popoverOrigin', { read: Element })
  popoverOrigin: Element;

  private readonly weekView = DatePickerEnum.View.Week;
  private readonly yearsView = DatePickerEnum.View.Years;
  /* managing current date state */
  selectedDate: WritableSignal<dayjs.Dayjs> = signal(dayjs());
  /** Arbitrary choosing default view to be weeks */
  viewMode: WritableSignal<DatePickerEnum.View> = signal(
    DatePickerEnum.View.Week
  );

  IconsEnum = IconsEnum;
  DatePickerEnum = DatePickerEnum;
  DateUtils = DateUtils;
  // InputDateAnimationsEnum = InputDateAnimationsEnum;
  minutesDataSource = range(0, 60);
  minutesField = range(0, 60).map((minute) => DateUtils.formaDateUnit(minute));
  hoursField = range(0, 24).map((hour) => DateUtils.formaDateUnit(hour));

  readonly weekDataSource$: Observable<DatePickerUtils.Day[][]> = toObservable(
    computed(() => [
      ...DatePickerWeekUtils.generateDaysOfMonth(
        this.selectedDate(),
        this.holydays()
      ),
    ])
  );
  weekTableColumns: string[] = range(1, 8).map(
    (weekName: DatePickerEnum.WeekDay) =>
      DatePickerEnum.getWeekDayName.value(weekName)
  );
  readonly monthsDataSource$ = new BehaviorSubject(
    DatePickerUtils.generateMonths()
  );

  monthsTableFakeHeaders = range(0, 4).map((value: number) => value.toString());
  readonly selectedMonth = computed(
    () => (this.selectedDate() || dayjs()).month() + 1
  ); // display month range to feet 1-12

  yearsDataSource$ = new BehaviorSubject(DatePickerUtils.generateYears());
  yearsTableFakeHeaders = range(0, 7).map((value: number) => value.toString());
  readonly selectedYear = computed(() =>
    (this.selectedDate() || dayjs()).year()
  );

  // slideViewLabelAnimationState: WritableSignal<InputDateAnimationsEnum> =
  //   signal(InputDateAnimationsEnum.SlideLeftStart);

  readonly currentWeekOfYear = computed(() =>
    (this.selectedDate() || dayjs()).week()
  );
  /** label displayed on Month & Table view showing if it's holidays */
  readonly selectedDateInfo = toSignal(
    this.weekDataSource$.pipe(
      map((weekDays) => {
        const linearWeekDays = weekDays.reduce((acc, curr) => {
          return [...acc, ...curr];
        }, []);

        const date = this.selectedDate() || dayjs();
        const selectedYear = date.year();
        const selectedMonth = date.month() + 1;
        const selectedDay = date.date();

        const selectedDate = linearWeekDays.find(
          (weekDay) =>
            weekDay.id ===
              DatePickerWeekUtils.getDayId(
                selectedYear,
                selectedMonth,
                selectedDay
              ) && weekDay.info
        );

        return selectedDate?.info as DatePickerEnum.HolydaysEnum;
      })
    )
  );

  readonly selectedMinutes = computed(() =>
    DateUtils.formaDateUnit((this.selectedDate() || dayjs()).minute())
  );
  readonly selectedHours = computed(() =>
    DateUtils.formaDateUnit((this.selectedDate() || dayjs()).hour())
  );

  private store = inject(InputDateStore);
  private httpService = inject(HttpService);
  private readonly holydays = toSignal(this.store.holidays$);
  private translateService = inject(TranslateService);

  private overlayRefData: DatePickerUtils.DisplayedDateType = inject(
    OverlayUtils.OVERLAY_DATA_TOKEN<DatePickerUtils.DisplayedDateType>
  );

  constructor() {
    /** fetching holidays on computing current year */
    toObservable(computed(() => this.selectedDate().year()))
      .pipe(
        switchMap((year) => this.httpService.loadHolydays(year)),
        tap((holidays) => this.store.loadHolidays(holidays))
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.selectedDate = this.overlayRefData.selectedDate;

    this.translateService.use(this.overlayRefData.locale);
  }

  ngAfterViewInit(): void {
    // this.yearsTableElement.elementRef.nativeElement
    //   .getElementById(`${this.selectedDate().year()}-selected-year-id`)
    //   .scrollIntoView();
  }

  today() {
    this.selectedDate.set(dayjs());
  }

  clearDate() {
    this.selectedDate.set(null);
  }

  setMinutes(minutes: string) {
    console.log(parseInt(minutes));
    this.selectedDate.update((date) =>
      (date || dayjs()).set('minute', parseInt(minutes))
    );
  }

  setHours(hours: string) {
    console.log(parseInt(hours));
    this.selectedDate.update((date) =>
      (date || dayjs()).set('hour', parseInt(hours))
    );
  }
  setDay(day: DatePickerUtils.Day) {
    console.log(day);
    // on select a day from another month
    if (day.swipeMonth) {
      const month =
        (this.selectedDate() || dayjs()).month() + day.swipeMonth + 1;
      this.setMonth(month);
    }
    this.selectedDate.update((date) =>
      (date || dayjs()).set('date', day.value as number)
    );
  }

  setMonth(month: number) {
    this.selectedDate.update(
      (date) => (date || dayjs()).set('month', month - 1) // range back to dayjs range 0-11
    );
  }

  setYear(year: number) {
    this.selectedDate.update((date) => (date || dayjs()).set('year', year));
  }

  swipeViewOnDoubleArrowClick(direction: 1 | -1) {
    // this.slideViewLabelAnimationState.set(InputDateAnimationsEnum.SlideOutLeft);

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
}

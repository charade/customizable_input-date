import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';

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
import { CustomControlValueAccessor } from 'src/app/utils/control-value-accessor';
import { DatePickerUtils } from './utils/date-picker-utils';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
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
export class InputDateComponent extends CustomControlValueAccessor {
  @ViewChild('popoverOrigin', { read: ElementRef<HTMLDivElement> })
  popoverOrigin: ElementRef<HTMLDivElement>;

  @Input() startDate: dayjs.Dayjs;
  @Input() endDate: dayjs.Dayjs;
  @Input() minDate: dayjs.Dayjs;
  @Input() maxDate: dayjs.Dayjs;
  @Input() dateOnly = false;
  @Input() clearable: boolean;

  IconsEnum = IconsEnum;
  InputDateEnum = InputDateEnum;

  /** Aritrary choosing default view mode to be days */
  viewMode: WritableSignal<InputDateEnum.View> = signal(
    InputDateEnum.View.Dayjs
  );

  /* managing date state */
  selectedDate: WritableSignal<dayjs.Dayjs> = signal(dayjs());

  minutesDataSource = range(0, 60);

  /* months && years table don't have headers displayed */
  monthsTableFakeHeaders = range(0, 4).map((value: number) => value.toString());
  yearsTableFakeHeaders = range(0, 7).map((value: number) => value.toString());

  /** manage formatted date displayed in the field */
  displayedDate = computed(() => {
    if (!this.selectedDate()) {
      return;
    }

    return (
      this.selectedDate() &&
      DateUtils.formatDate(this.selectedDate(), this.locale(), !this.dateOnly)
    );
  });

  daysTableColumns: string[] = range(1, 8).map(
    (weekName: InputDateEnum.WeekDay) =>
      InputDateEnum.getWeekDayName.value(weekName)
  );

  readonly daysDataSource$: Observable<DatePickerUtils.Day[][]> = toObservable(
    computed(() => DatePickerUtils.generateDaysOfMonth(this.selectedDate()))
  );

  readonly monthsDataSource$: Observable<DatePickerUtils.DateType[][]> =
    toObservable(
      computed(() =>
        DatePickerUtils.generateMonths(
          this.selectedDate(),
          this.minDate,
          this.maxDate
        )
      )
    );

  yearsDataSource$: BehaviorSubject<DatePickerUtils.DateType[][]>;

  private readonly daysView = InputDateEnum.View.Dayjs;
  private readonly yearsView = InputDateEnum.View.Years;

  private locale: WritableSignal<string> = signal('es');

  private translateService = inject(TranslateService);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayService = inject(CustomOverlayService);

  ngOnInit() {
    this.translateService.use(this.locale());

    this.yearsDataSource$ = new BehaviorSubject(
      DatePickerUtils.generateYears(this.minDate, this.maxDate)
    );

    this.value = computed(() => {
      if (this.disabled) {
        return;
      }
      return this.dateOnly
        ? DateUtils.convertToDate(this.selectedDate())
        : DateUtils.convertToDateTime(this.selectedDate());
    })();
  }

  setDay(day: DatePickerUtils.Day) {
    this.selectedDate.update((date) => date.set('date', day.value as number));
    // on select a day from another month
    if (day.swipeMonth) {
      const month = this.selectedDate().month() + day.swipeMonth;
      this.setMonth(month);
    }
  }

  setMonth(month: number) {
    this.selectedDate.update((date) => date.set('month', month));
  }

  setYear(year: number) {
    this.selectedDate.update((date) => date.set('year', year));
  }

  swipeViewOnDoubleArrowClick(direction: 1 | -1) {
    this.viewMode.update((view) =>
      view + direction > this.yearsView
        ? this.daysView
        : view + direction < this.daysView
        ? this.yearsView
        : view + direction
    );
  }

  openDatePickerOnClick(inputDateContent: TemplateRef<any>) {
    this.overlayService.open(inputDateContent, {
      origin: this.popoverOrigin,
      scrollStrategy: ScrollStrategyEnum.Block,
      viewContainerRef: this.viewContainerRef,
      config: { width: '19rem', height: '30.5rem', hasBackdrop: true },
    });
  }
}

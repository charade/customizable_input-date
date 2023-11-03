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
import * as dayjs from 'dayjs';
import { range } from 'lodash';
import { IconComponent } from '../icon/icon.component';
import { DateUtils } from 'src/app/utils/date-utils';
import { CustomOverlayService } from '../../app/services/custom-overlay/overlay.service';

import { IconsEnum } from '../icon/utils/icons.enum';
import { ScrollStrategyEnum } from '../../app/services/custom-overlay/overlay.config';
import { CustomControlValueAccessor } from 'src/app/utils/control-value-accessor';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputDateEnum } from './input-date.enum';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { InputDateUtils } from './input-date-utils';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';

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

  @Input() startDate: string;
  @Input() endDate: string;
  @Input() dateOnly = false;
  @Input() clearable: boolean;

  IconsEnum = IconsEnum;
  InputDateEnum = InputDateEnum;

  viewMode: WritableSignal<InputDateEnum.View> = signal(
    InputDateEnum.View.Dayjs
  );

  selectedDate: WritableSignal<dayjs.Dayjs> = signal(dayjs());

  monthDataSource: WritableSignal<string[][]> = signal([[]]);
  yearsDataSource: WritableSignal<string[][]> = signal([[]]);

  dayjs = range(0, 24);
  minutesDataSource = range(0, 60);

  displayedDate = computed(() => {
    if (!this.selectedDate()) {
      return;
    }

    return (
      this.selectedDate() &&
      DateUtils.formatDate(this.selectedDate(), this.locale(), !this.dateOnly)
    );
  });

  displayedColumns: string[] = range(1, 8).map(
    (weekName: InputDateEnum.WeekDay) =>
      InputDateEnum.getWeekDayName.value(weekName)
  );

  readonly daysDataSource$: Observable<InputDateUtils.Day[][]> = toObservable(
    computed(() => InputDateUtils.generateDaysOfMonth(this.selectedDate()))
  );

  private translateService = inject(TranslateService);
  private viewContainerRef = inject(ViewContainerRef);
  private locale: WritableSignal<string> = signal('es');

  private readonly daysView = InputDateEnum.View.Dayjs;
  private readonly monthsView = InputDateEnum.View.Months;
  private readonly yearsView = InputDateEnum.View.Years;

  override ngOnInit(): void {
    this.translateService.use(this.locale());
    this.value = computed(() => {
      if (this.disabled) {
        return;
      }

      return this.dateOnly
        ? DateUtils.convertToDate(this.selectedDate())
        : DateUtils.convertToDateTime(this.selectedDate());
    })();
  }

  private overlayService = inject(CustomOverlayService);

  swipeDisplayedView(direction: 1 | -1): void {
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

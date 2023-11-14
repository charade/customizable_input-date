import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { CustomOverlayService } from '../services/custom-overlay/overlay.service';

import { ScrollStrategyEnum } from 'src/app/services/custom-overlay/overlay.config';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DatePickerEnum } from '../date-picker/utils.ts/date-picker.enum';
import { DateUtils } from '../date-picker/utils.ts/date-utils';
import { DatePickerUtils } from '../date-picker/utils.ts/date-picker-utils.index';
import { InputDateSettingsComponent } from '../settings-modal/input-date-settings';
import { Language } from 'src/app/utils/languages';
import { InputDateStore } from '../services/input-date.store/input-date.store.index';
import { IconComponent } from '../icon/icon.component';
import { IconsEnum } from '../icon/utils/icons.enum';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  imports: [
    IconComponent,
    TranslateModule,
    DatePickerComponent,
    InputDateSettingsComponent,
    LowerCasePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomOverlayService],
})
export class InputDateComponent implements OnInit {
  @ViewChild('popoverOrigin', { read: ElementRef<HTMLDivElement> })
  popoverOrigin: Element;

  IconsEnum = IconsEnum;
  DatePickerEnum = DatePickerEnum;
  selectedDate: WritableSignal<dayjs.Dayjs> = signal(dayjs());
  /** manage formatted date displayed in the field */
  displayedDate = computed(() => {
    if (!DateUtils.isValidDate(this.selectedDate())) {
      return;
    }
    return this.selectedDate() && this.selectedDate().format(this.dateFormat());
  });

  private translateService = inject(TranslateService);
  private overlayService = inject(CustomOverlayService);
  private viewContainerRef = inject(ViewContainerRef);

  private readonly DEFAULT_DATE_PICKER_BOUNDS = {
    width: '20rem',
    height: '27rem',
  };
  private readonly DEFAULT_SETTINGS_MODAL_BOUNDS = {
    width: '15rem',
    height: '17rem',
  };

  private readonly store = inject(InputDateStore);
  private locale: string;

  readonly dateFormat = toSignal(
    this.store.getDateFormat$.pipe(map((format) => format))
  );

  ngOnInit(): void {
    this.store.getLang$.subscribe((lang) => {
      this.locale = Language.convertToLocale.value(lang);
      this.translateService.use(this.locale);
    });
  }

  openDatePickerOnClick() {
    this.overlayService.open<DatePickerUtils.DisplayedDateType>(
      DatePickerComponent,
      {
        origin: this.popoverOrigin,
        scrollStrategy: ScrollStrategyEnum.Block,
        viewContainerRef: this.viewContainerRef,
        config: this.DEFAULT_DATE_PICKER_BOUNDS,
        data: {
          selectedDate: this.selectedDate,
          locale: this.locale,
        },
      }
    );
  }
  openSettingsOnClick() {
    this.overlayService.open(InputDateSettingsComponent, {
      origin: this.popoverOrigin,
      viewContainerRef: this.viewContainerRef,
      config: this.DEFAULT_SETTINGS_MODAL_BOUNDS,
    });
  }
}

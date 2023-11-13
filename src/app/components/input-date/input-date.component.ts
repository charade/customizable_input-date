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

import { IconComponent } from '../icon/icon.component';
import { CustomOverlayService } from './services/custom-overlay/overlay.service';

import { IconsEnum } from '../icon/utils/icons.enum';
import { ScrollStrategyEnum } from 'src/app/components/input-date/services/custom-overlay/overlay.config';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DatePickerEnum } from './date-picker/utils.ts/date-picker.enum';
import { DateUtils } from './date-picker/utils.ts/date-utils';
import { DatePickerUtils } from './date-picker/utils.ts/date-picker-utils.index';
import { InputDateSettingsComponent } from './input-date-settings/input-date-settings';
import { CustomControlValueAccessor } from 'src/app/utils/custom-control-value-accessor';
import { Language } from 'src/app/utils/languages';
import { InputDateStore } from './services/input-date.store/input-date.store.index';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomOverlayService],
})
export class InputDateComponent
  extends CustomControlValueAccessor<dayjs.Dayjs>
  implements OnInit
{
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
    height: '30rem',
  };
  private readonly DEFAULT_SETTINGS_MODAL_BOUNDS = {
    width: '15rem',
    height: '17rem',
  };

  private readonly store = inject(InputDateStore);
  private locale = toSignal(
    this.store.getLang$.pipe(
      map((lang) => Language.convertToLocale.value(lang))
    )
  );

  readonly dateFormat = toSignal(
    this.store.getDateFormat$.pipe(map((format) => format))
  );

  ngOnInit(): void {
    this.store.getLang$.subscribe((lang) =>
      this.translateService.use(Language.convertToLocale.value(lang))
    );
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
          locale: this.locale(),
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

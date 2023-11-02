import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  Signal,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import * as dayjs from 'dayjs';

import { IconComponent } from '../icon/icon.component';

import { DateUtils } from 'src/app/utils/date-utils';
import { CustomOverlayService } from '../../app/services/custom-overlay/overlay.service';

import { IconsEnum } from '../icon/utils/icons-names.enum';
import { ScrollStrategyEnum } from '../../app/services/custom-overlay/overlay.config';
import { CustomControlValueAccessor } from 'src/app/utils/control-value-accessor';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  standalone: true,
  imports: [IconComponent],
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
export class InputDateComponent extends CustomControlValueAccessor {
  @ViewChild('popoverOrigin', { read: ElementRef<HTMLDivElement> })
  popoverOrigin: ElementRef<HTMLDivElement>;

  @Input() startDate: string;
  @Input() endDate: string;
  @Input() dateOnly = false;

  icon = IconsEnum.Calendar;

  private selectedDate: Signal<dayjs.Dayjs> = signal(null);
  private viewContainerRef = inject(ViewContainerRef);

  override ngOnInit(): void {
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

  openDatePickerOnClick(inputDateContent: TemplateRef<any>) {
    this.overlayService.open(inputDateContent, {
      origin: this.popoverOrigin,
      scrollStrategy: ScrollStrategyEnum.Block,
      viewContainerRef: this.viewContainerRef,
      config: { width: '18rem', height: '20rem', hasBackdrop: true },
    });
  }
}

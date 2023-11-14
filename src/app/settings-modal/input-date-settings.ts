import { OverlayRef } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { CustomOverlayService } from 'src/app/services/custom-overlay/overlay.service';

import { Language } from 'src/app/utils/languages';
import { InputDateStore } from '../services/input-date.store/input-date.store.index';
import { DateUtils } from '../date-picker/utils.ts/date-utils';
import { IconComponent } from 'src/app/icon/icon.component';
import { ButtonGroupComponent } from 'src/app/button-group/button-group.component';
import { IconsEnum } from 'src/app/icon/utils/icons.enum';

@Component({
  selector: 'app-input-date-settings',
  templateUrl: './input-date-settings.html',
  styleUrls: ['./input-date-settings.scss'],
  standalone: true,
  imports: [TranslateModule, IconComponent, ButtonGroupComponent],
  providers: [CustomOverlayService],
})
export class InputDateSettingsComponent {
  IconsEnum = IconsEnum;
  readonly settingsLanguages = Language.settings;
  readonly bigEndianDateFormats = DateUtils.settingsDateFormats.slice(0, 2);
  readonly littleEndianDateFormats = DateUtils.settingsDateFormats.slice(2, 4);

  private store = inject(InputDateStore);
  private readonly overlayRef = inject(OverlayRef);
  readonly selectedLang = toSignal(this.store.getLang$);
  readonly selectedDateFormat = toSignal(this.store.getDateFormat$);

  setLang(lang: Language) {
    this.store.setLang(lang);
  }
  setDateFormat(dateFormat: DateUtils.FormatEnum) {
    this.store.setDateFormat(dateFormat);
  }
  closeModal() {
    this.overlayRef.dispose();
  }
}

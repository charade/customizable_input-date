import { OverlayRef } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomOverlayService } from 'src/app/components/input-date/custom-overlay/overlay.service';
import { IconsEnum } from '../../icon/utils/icons.enum';
import { IconComponent } from '../../icon/icon.component';
import { ButtonGroupComponent } from '../../button-group/button-group.component';
import { Language } from 'src/app/utils/languages';
import { InputDateStore } from '../services/input-date.store';
import { DateUtils } from '../date-picker/utils.ts/date-utils';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-input-date-settings',
  templateUrl: './input-date-settings.html',
  styleUrls: ['./input-date-settings.scss'],
  standalone: true,
  providers: [CustomOverlayService],
  imports: [TranslateModule, IconComponent, ButtonGroupComponent],
})
export class InputDateSettingsComponent {
  IconsEnum = IconsEnum;
  readonly settingsLanguages = Language.settings;
  readonly settings_En_DateFormats = DateUtils.settingsDateFormats.slice(0, 2);
  readonly settings_Fr_DateFormats = DateUtils.settingsDateFormats.slice(2, 3);

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

import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  CssStyleClass,
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/fontawesome-svg-core';
import { IconsEnum } from './utils/icons.enum';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './icon.component.html',
})
export class IconComponent {
  @Input({ required: true }) set name(_name: IconsEnum) {
    this.icon = IconsEnum.getName.value(_name);
  }

  @Input() cssClass: string;
  @Input() iconClass: CssStyleClass;
  @Input() prefix: IconPrefix;

  public icon: IconDefinition;
}

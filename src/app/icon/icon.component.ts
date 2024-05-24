import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconsEnum } from './utils/icons.enum';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  standalone: true,
  imports: [FontAwesomeModule],
})
export class IconComponent {
  public icon: IconProp;

  @Input({ required: true }) set name(_name: IconsEnum) {
    this.icon = IconsEnum.getName.value(_name);
  }

  @Input() cssClass: string;
}

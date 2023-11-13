import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, TranslateModule],
})
export class ButtonGroupComponent<T> {
  @Input({ required: true }) items: { value: T; label?: string }[] = [];
  @Input({ required: true }) selectedItem: T;
  @Output() valueChanged = new EventEmitter();
}

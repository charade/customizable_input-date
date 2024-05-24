import { Component, inject } from '@angular/core';
import { InputDateComponent } from './input-date/input-date.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [InputDateComponent, FormsModule, TranslateModule],
})
export class AppComponent {
  translate = inject(TranslateService);
}

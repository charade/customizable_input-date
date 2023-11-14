import { Component, signal } from '@angular/core';
import { InputDateComponent } from './input-date/input-date.component';
import { FormsModule } from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [InputDateComponent, FormsModule],
})
export class AppComponent {
  date = signal(dayjs().add(1, 'month'));
}

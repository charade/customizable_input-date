import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePickerUtils } from 'src/app/components/input-date/date-picker/utils.ts/date-picker-utils';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}
  loadHolydays = (year: number): Observable<DatePickerUtils.HolydaysType> =>
    this.http.get<{ [key: string]: string }>(
      `https://calendrier.api.gouv.fr/jours-feries/metropole/${year}.json`
    );
}

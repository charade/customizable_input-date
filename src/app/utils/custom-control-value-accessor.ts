import { Directive, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomControlValueAccessor),
      multi: true,
    },
  ],
})
export class CustomControlValueAccessor<T = string>
  implements ControlValueAccessor
{
  value: T;
  writeValue(value: T): void {}
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}

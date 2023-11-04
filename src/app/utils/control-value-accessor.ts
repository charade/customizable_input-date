import { Directive, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export class CustomControlValueAccessor<T = string>
  implements ControlValueAccessor
{
  protected disabled = false;

  value: T;
  onChange: (value: string) => void;
  onTouch: () => void;

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {}
}

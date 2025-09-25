import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-not-a-robot',
  templateUrl: './not-a-robot.component.html',
  styleUrl: './not-a-robot.component.scss',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NotARobotComponent,
      multi: true,
    },
  ],
})
export class NotARobotComponent implements ControlValueAccessor {
  value = false;
  disabled = false;
  onChange = (value: boolean) => {};
  onTouched = () => {};

  // Sync the component state with the form control
  writeValue(value: boolean): void {
    this.value = value;
  }

  // Sync the form control with component state
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Sync the form control touched state with whatever relevant business logic
  // to set the touched state
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Sync the component state "disabled" with the form control's disabled state
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(): void {
    if (this.disabled) return;

    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
  }
}

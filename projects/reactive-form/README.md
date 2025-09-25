## Reactive Forms Tutorial (Angular)

This guide walks you end-to-end through Angular Reactive Forms: setup, `FormControl`/`FormGroup`/`FormArray`, validation (built-in, custom, async), dynamic fields, custom form controls (ControlValueAccessor), HTTP submission, and testing.

### Why Reactive Forms?

- Model-driven and TypeScript-first
- Predictable, testable, and ideal for complex/dynamic validation

---

## 1) Setup

Enable reactive forms

```ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<form [formGroup]="form"></form>`,
})
export class ExampleComponent {}
```

---

## 2) Core APIs

### FormControl

```ts
import { FormControl, Validators } from '@angular/forms';

const email = new FormControl<string>('', {
  validators: [Validators.required],
});
email.valueChanges.subscribe((v) => console.log('email:', v));
```

Template:

```html
<input type="email" [formControl]="email" placeholder="you@example.com" />
@if(email.touched && email.invalid) {
<small>Invalid email</small>
}
```

### FormGroup

```ts
import { Validators } from '@angular/forms';

profileForm = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email])
});

submit() {
  if (this.profileForm.invalid) return;
  console.log(this.profileForm.value);
}
```

Template:

```html
<form [formGroup]="profileForm" (ngSubmit)="submit()">
  <input formControlName="firstName" placeholder="First name" />
  <input formControlName="lastName" placeholder="Last name" />
  <input type="email" formControlName="email" placeholder="Email" />
  <button type="submit" [disabled]="profileForm.invalid">Save</button>
</form>
```

### FormArray

```ts
import { FormArray, Validators } from '@angular/forms';

profile = new FormGroup({
    phones: new FormArray([]);
})

get phones(): FormArray {
    return this.profile.get("phone") as FormArray;
}

addPhone() { this.phones.push(new FormControl('', Validators.required)); }
removePhone(i: number) { this.phones.removeAt(i); }
```

Template:

```html
<div [formGroup]="profile">
  <div formArrayName="phones">
    @for(ctrl of phones.controls; index as i) {
    <div>
      <input [formControl]="ctrl" placeholder="Phone" />
      <button type="button" (click)="removePhone(i)">Remove</button>
    </div>
    }
    <button type="button" (click)="addPhone()">Add phone</button>
  </div>
</div>
```

---

## 3) Validation

### Built-in

```ts
this.fb.control('', [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(50),
  Validators.email,
  Validators.pattern(/^\+?\d{8,15}$/),
]);
```

### Cross-field (group) validator

```ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

function passwordMatch(group: AbstractControl): ValidationErrors | null {
  const p = group.get('password')?.value;
  const c = group.get('confirmPassword')?.value;
  return p === c ? null : { passwordMismatch: true };
}

accountForm = this.fb.group(
  {
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: this.fb.control('', Validators.required),
  },
  { validators: passwordMatch }
);
```

Error display snippet:

```html
<ng-container *ngIf="ctrl.touched && ctrl.invalid">
  <small *ngIf="ctrl.hasError('required')">Required</small>
  <small *ngIf="ctrl.hasError('minlength')">Too short</small>
  <small *ngIf="ctrl.hasError('email')">Invalid email</small>
  <small *ngIf="ctrl.hasError('usernameTaken')">Already taken</small>
</ng-container>
```

---

## 4) Custom Controls (ControlValueAccessor)

```ts
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  template: `<input [value]="value" (input)="onInput($event)" (blur)="onTouched()" />`,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneInputComponent), multi: true },
  ],
})
export class PhoneInputComponent implements ControlValueAccessor {
  value = '';
  private onChange = (v: string) => {};
  private onTouched = () => {};
  writeValue(v: string): void {
    this.value = v ?? '';
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(disabled: boolean): void {
    /* toggle UI */
  }
  onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.value = v;
    this.onChange(v);
  }
}
```

Usage:

```html
<app-phone-input formControlName="phone"></app-phone-input>
```

---

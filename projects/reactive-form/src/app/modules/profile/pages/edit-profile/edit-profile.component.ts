import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotARobotComponent } from '../../not-a-robot/not-a-robot.component';

function noDuplicateNumbersValidator(control: AbstractControl) {
  const numbers = control.value;
  const uniqueNumbers = new Set(numbers);
  return uniqueNumbers.size === numbers.length ? null : { noDuplicateNumbers: true };
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: 'edit-profile.component.scss',
  imports: [CommonModule, ReactiveFormsModule, NotARobotComponent],
})
export class EditProfileComponent {
  profile = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    phones: new FormArray([], noDuplicateNumbersValidator),
    notARobot: new FormControl({ value: false, disabled: false }),
  });

  get phones(): FormArray {
    return this.profile.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(new FormControl(''));
  }

  removePhone(index: number) {
    this.phones.removeAt(index);
  }

  updateProfile() {
    if (this.profile.invalid) {
      alert('Invalid profile');
      this.profile.markAllAsTouched();
      return;
    }

    alert(JSON.stringify(this.profile.value));
  }
}

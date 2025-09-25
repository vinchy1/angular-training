import { Component, signal } from '@angular/core';
import { EditProfileComponent } from './modules/profile/pages/edit-profile/edit-profile.component';

@Component({
  selector: 'app-root',
  imports: [EditProfileComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

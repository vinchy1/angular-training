import { Component } from '@angular/core';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found" style="padding: 1rem">
      <h1>404 - Page Not Found</h1>
    </div>
  `,
  imports: [SharedModule],
})
export class NotFoundComponent {}

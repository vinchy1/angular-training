import { Component, signal } from '@angular/core';
import { HelloCardComponent } from './pages/hello-card/hello-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ HelloCardComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('hello-angular');

  indexesCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  addCard() {
    this.indexesCards.push(this.indexesCards.length + 1);
  }
}

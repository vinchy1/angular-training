import { Component, signal } from '@angular/core';
import { PostsComponent } from './post/pages/posts/posts.component';

@Component({
  selector: 'app-root',
  imports: [PostsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('exo-form');
}

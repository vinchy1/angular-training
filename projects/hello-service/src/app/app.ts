import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { PostsComponent } from "./component/posts/posts.component";
import { PostService } from './services/post.service';
import { CommonModule } from '@angular/common';
import { CreatePost, Post } from './models/post.model';
import { BehaviorSubject, combineLatest, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [PostsComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  postService = inject(PostService);

  addEvent$: Subject<void> = new Subject<void>();
  deleteEvent$: Subject<void> = new Subject<void>();

  posts$!: Observable<Post[]>;

  ngOnInit(): void {
    this.posts$ = combineLatest([
      this.addEvent$.pipe(startWith(null)),
      this.deleteEvent$.pipe(startWith(null))
    ]).pipe(
      switchMap(() => this.postService.list())
    )
  }

  addPost() {
    this.postService.add({ title: 'Hello', views: 0 }).subscribe(() => {
      this.addEvent$.next();
    });
  }

  deletePost(id: string) {
    this.postService.delete(id).subscribe(() => {
      this.deleteEvent$.next();
    });
  }
}

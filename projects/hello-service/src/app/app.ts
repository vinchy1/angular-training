import { Component, inject, signal, WritableSignal, OnInit } from '@angular/core';
import { PostsComponent } from "./component/posts/posts.component";
import { PostService } from './services/post.service';
import { CommonModule } from '@angular/common';
import { Post } from './models/post.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [PostsComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  postService = inject(PostService);
  posts: WritableSignal<Post[]> = signal([]);

  ngOnInit(): void {
    this.postService.list().subscribe(list => {
      this.posts.set(list);
    });
  }

  addPost() {
    this.postService.add({ title: 'Hello', views: 0 })
      .pipe(
        switchMap(() => this.postService.list())
      )
      .subscribe((list) => {
        this.posts.set(list);
      });
  }

  deletePost(id: string) {
    this.postService.delete(id)
      .pipe(
        switchMap(() => this.postService.list())
      )
      .subscribe((list) => {
        this.posts.set(list);
      });
  }
}

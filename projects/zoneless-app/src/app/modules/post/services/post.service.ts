import { effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { CreatePost, Post, UpdatePost } from '../models/post.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private _posts: WritableSignal<Post[]> = signal([]);
  posts: Signal<Post[]> = this._posts;

  private _updateList: WritableSignal<any> = signal(0);
  private _quickSearch: WritableSignal<string> = signal('');

  constructor() {
    effect(() => {
      this.list(this._quickSearch(), this._updateList()).subscribe((posts) => {
        this._posts.set(posts);
      });
    });
  }

  setQuickSearch(quickSearch: string): void {
    this._quickSearch.set(quickSearch);
  }

  refreshList(): void {
    this._updateList.update((value) => value + 1);
  }

  setPosts(posts: Post[]): void {
    this._posts.set(posts);
  }

  create(post: CreatePost): Observable<Post> {
    return this.http.post<Post>('http://localhost:3000/posts', post).pipe(
      tap(() => {
        this.refreshList();
      })
    );
  }

  retrieve(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/posts/${id}`);
  }

  update(post: UpdatePost): Observable<Post> {
    return this.http.patch<Post>(`http://localhost:3000/posts/${post.id}`, post).pipe(
      tap(() => {
        this.refreshList();
      })
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/posts/${id}`).pipe(
      tap(() => {
        this.refreshList();
      })
    );
  }

  list(quickSearch: string, updateList: any): Observable<Post[]> {
    return this.http
      .get<Post[]>('http://localhost:3000/posts')
      .pipe(
        map((posts) =>
          posts.filter(
            (post) => post.content.includes(quickSearch) || post.title.includes(quickSearch)
          )
        )
      );
  }
}

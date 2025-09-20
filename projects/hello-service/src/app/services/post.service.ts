import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Post, CreatePost } from "../models/post.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class PostService {
    private http = inject(HttpClient);

    add(post: CreatePost): Observable<Post> {
        return this.http.post<Post>(
            'http://localhost:3000/posts',
            post,
        );
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/posts/${id}`);
    }

    list(): Observable<Post[]> {
        return this.http.get<Post[]>('http://localhost:3000/posts');
    }
}
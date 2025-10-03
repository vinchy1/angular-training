import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post, PostForUpdate } from "../models/post.model";

@Injectable({ providedIn: "root" })
export class PostService {
    private http = inject(HttpClient);

    list(): Observable<Post[]> {
        return this.http.get<Post[]>("http://localhost:3000/posts")
    }

    update(post: PostForUpdate): Observable<Post> {
        return this.http.patch<Post>(`http://localhost:3000/posts/${post.id}`, post)
    }

    delete(postId: string): Observable<void> {
        return this.http.get<void>(`http://localhost:3000/posts/${postId}`)
    }
}
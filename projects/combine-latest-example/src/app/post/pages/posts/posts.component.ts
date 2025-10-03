import { Component, inject, OnInit } from "@angular/core";
import { SharedModule } from "../../../shared.module";
import { QuickSearchComponent } from "../../components/quick-search/quick-search.component";
import { FormControl } from "@angular/forms";
import { ListOfPostsComponent } from "../../components/list-of-posts/list-of-posts.component";
import { PostService } from "../../services/post.service";
import { BehaviorSubject, combineLatest, debounceTime, map, merge, Observable, startWith, switchMap, take } from "rxjs";
import { Post, PostForUpdate } from "../../models/post.model";

@Component({
    selector: "app-posts",
    templateUrl: "posts.component.html",
    imports: [SharedModule, QuickSearchComponent, ListOfPostsComponent]
})
export class PostsComponent implements OnInit {
    ctrl = new FormControl("");

    postService = inject(PostService);
    refresh$ = new BehaviorSubject(null);

    posts$!: Observable<Post[]>;

    ngOnInit(): void {
        this.posts$ = 
        combineLatest([
            this.ctrl.valueChanges.pipe(startWith(""), debounceTime(300)),
            this.refresh$,
        ]).pipe(
            switchMap(([searchInput]) => 
                this.postService.list().pipe(
                    map(list => list.filter(row => this.containsString(searchInput!, row)))
                )
            )
        );
    }

    update(post: PostForUpdate) {
        this.postService.update(post).pipe(take(1)).subscribe(() => { this.refresh$.next(null) });
    }

    delete(postId: string) {
        this.postService.delete(postId).pipe(take(1)).subscribe(() => { this.refresh$.next(null) });
    }

    containsString(searchIn: string, obj: { [key: string]: any}): boolean {
        return Object.values(obj).find(val => ("" + val).indexOf(searchIn) >= 0);
    }
}
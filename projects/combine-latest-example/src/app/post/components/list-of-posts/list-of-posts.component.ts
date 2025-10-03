import { Component, input, output, signal, WritableSignal } from "@angular/core";
import { SharedModule } from "../../../shared.module";
import { Post, PostForUpdate } from "../../models/post.model";
import { PostItemComponent } from "../post-item/post-item.component";

@Component({
    selector: "app-list-of-posts",
    templateUrl: "list-of-posts.component.html",
    imports: [SharedModule, PostItemComponent]
})
export class ListOfPostsComponent {
    posts = input<Post[]>();
    
    onUpdate = output<PostForUpdate>();
    onDelete = output<string>();
    
    editId: WritableSignal<string | null> = signal(null);

    update(post: PostForUpdate) {
        this.onUpdate.emit(post);
    }

    delete(postId: string) {
        this.onDelete.emit(postId);
    }
}

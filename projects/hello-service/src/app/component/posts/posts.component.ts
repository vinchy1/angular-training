import { Component, inject, input, output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Post } from "../../models/post.model";
import { PostService } from "../../services/post.service";

@Component({
    selector: 'app-posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss'],
    imports: [CommonModule]
})
export class PostsComponent {
    posts = input.required<Post[]>();
    
    deleteEvent = output<string>();

    postService = inject(PostService);


    deletePost(id: string) {
        this.deleteEvent.emit(id);
    }
}

import { Component, inject, Signal } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { SharedModule } from '../../../../shared.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: 'posts-list.component.html',
  styleUrls: ['posts-list.component.scss'],
  imports: [SharedModule, RouterModule],
})
export class PostsListComponent {
  private postService = inject(PostService);
  posts: Signal<Post[]> = this.postService.posts;

  deletePost(id: string) {
    this.postService.delete(id).subscribe();
  }
}

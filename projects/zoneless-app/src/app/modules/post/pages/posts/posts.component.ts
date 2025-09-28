import { Component } from '@angular/core';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { SharedModule } from '../../../shared.module';
import { NewPostComponent } from './new-post/new-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: 'posts.component.html',
  styleUrl: 'posts.component.scss',
  imports: [SharedModule, QuickSearchComponent, PostsListComponent, NewPostComponent],
})
export class PostsComponent {}

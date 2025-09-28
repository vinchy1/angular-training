import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SharedModule } from '../../../../shared.module';
import { PostService } from '../../../services/post.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-quick-search',
  templateUrl: 'quick-search.component.html',
  imports: [SharedModule],
})
export class QuickSearchComponent {
  quickSearch = new FormControl('');
  postService = inject(PostService);

  constructor() {
    this.quickSearch.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.postService.setQuickSearch(value ?? '');
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePost } from '../../../models/post.model';
import { SharedModule } from '../../../../shared.module';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: 'new-post.component.html',
  styleUrls: ['new-post.component.scss'],
  imports: [SharedModule],
})
export class NewPostComponent {
  postService = inject(PostService);

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.postService.create({ ...this.form.value, views: 0 } as CreatePost).subscribe();
  }
}

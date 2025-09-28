import { Component, inject, signal, WritableSignal } from '@angular/core';
import { SharedModule } from '../../../shared.module';
import { ActivatedRoute } from '@angular/router';
import { Post, UpdatePost } from '../../models/post.model';
import { map, merge, Subject, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: 'post.component.html',
  imports: [SharedModule, RouterModule],
})
export class PostComponent {
  route = inject(ActivatedRoute);
  postService = inject(PostService);
  editMode: WritableSignal<boolean> = signal(false);

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  onUpdate$ = new Subject<Post>();

  post$ = merge(this.route.data.pipe(map((data) => data['post'] as Post)), this.onUpdate$).pipe(
    tap((post) => this.form.patchValue(post))
  );

  toggleEditMode() {
    this.editMode.update((mode) => !mode);
  }

  updatePost(id: string) {
    if (this.form.invalid) {
      return;
    }

    this.postService.update({ ...this.form.value, id } as UpdatePost).subscribe((post: Post) => {
      this.onUpdate$.next(post);
      this.toggleEditMode();
    });
  }
}

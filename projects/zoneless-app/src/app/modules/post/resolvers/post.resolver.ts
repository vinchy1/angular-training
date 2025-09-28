import { inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { Post } from '../models/post.model';
import { catchError, EMPTY, of } from 'rxjs';

export const postResolver: ResolveFn<Post> = (route: ActivatedRouteSnapshot) => {
  const postService = inject(PostService);
  const router = inject(Router);

  return postService.retrieve(route.params['id']).pipe(
    catchError(() => {
      router.navigate(['/not-found']);
      return EMPTY;
    })
  );
};

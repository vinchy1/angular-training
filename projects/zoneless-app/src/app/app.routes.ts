import { Routes } from '@angular/router';
import { postResolver } from './modules/post/resolvers/post.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/core/home/home.component').then((m) => m.HomePage),
    pathMatch: 'full',
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./modules/post/pages/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'posts/:id',
    resolve: {
      post: postResolver,
    },
    loadComponent: () =>
      import('./modules/post/pages/post/post.component').then((m) => m.PostComponent),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./modules/core/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

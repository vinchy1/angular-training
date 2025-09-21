# Routing

Routing is the core of a Single‑Page Application (SPA). It creates a multiple‑page experience by mapping each URL to a component rendered inside `<router-outlet></router-outlet>`.

## Step 1 — Write your template

Add a `<router-outlet>` in `app.html`.

## Step 2 — Configure the router

In `app.routes.ts`, define your routes:

```ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
```

## Step 2b — Lazy loading

Lazy‑load a standalone component:

```ts
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },
];
```

Lazy‑load a feature module (NgModule pattern):

```ts
// Feature module routing (secondary router)
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /* feature routes here */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FeatureRoutingModule {}
```

Wire the feature in the main router:

```ts
{
  path: 'real-estate',
  loadChildren: () =>
    import('./modules/real-estate.module').then((m) => m.RealEstateModule),
}
```

Paths inside a child (secondary) router are relative to the parent’s path. For example, `real-estate/ads` comes from parent `path: 'real-estate'` and child `path: 'ads'`.

## Resolvers and guards

Resolvers can preload data before a page activates, avoiding empty screens. They also help keep a component in sync with the URL when the same component is reused with different params (for example, navigating from one detail view to the next). Since Angular doesn’t recreate the component on param changes, ensure you react to route param changes in the component or preload via a resolver.

Redirect on resolver error (common pattern):

```ts
return service.get(id).pipe(
  catchError(() => {
    router.navigateByUrl('/not-found'); // perform redirect
    return EMPTY; // cancel original navigation
  })
);
```

Guards are similar to resolvers, but they return one of: `boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>`. They are commonly used to check access rights. If access is denied, a guard can return a `UrlTree` to redirect to a different URL.

Note: Returning a `UrlTree` triggers a redirect in guards, not in resolvers. For resolvers, use `router.navigateByUrl('/not-found')` and return `EMPTY` to cancel activation.

## Exercise

We'll create an online store. For now, the app will list available products and provide a detail page for each product.

Create a feature module with its own routing configuration and lazy‑load it. Add a simple guard that injects a fake authorization service and randomly allows or denies access. When access is denied, redirect the user to the 404 page (`/not-found`).

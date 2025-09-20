# Hello Service

Services are injectable TypeScript classes managed by Angular's Dependency Injection (DI) system.
In most cases, Angular will manage a single instance of your service, which then needs to be declared in app.config.ts, but a more efficient way to do so is by simply configuring your injectable class with `providedIn: 'root'`.

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MyService {}
```

## Step 1 — Add a new application to your Angular workspace

```bash
ng g application hello-service
```

A new project entry is added to `angular.json`. To run it:

```bash
ng serve hello-service
```

## Step 2 — Add JSON Server (mock API)

Docs: `https://www.npmjs.com/package/json-server`

Install and add a script:

```bash
npm i -D json-server
```

Add to `package.json`:

```json
{
  "scripts": {
    "api": "json-server --watch db.json --port 3000"
  }
}
```

Then run:

```bash
npm run api
```

Ensure `db.json` exists at the workspace root.

## Step 3 — Write `RealEstateAdService`

Write an interface `RealEstateAdService` to type your object.
 
Implement `add`, `list`, and `delete` in your service. The `add` will simply add a hardcoded object.

Note: When you use `HttpClient`, ensure it is provided (e.g., `provideHttpClient()` in `app.config.ts`).

Connect and use that service in `app.ts`.


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { pages, RealEstateAdsComponent, RealEstateAdComponent } from './pages';
import { provideHttpClient } from '@angular/common/http';
import { realEstateAdResolver } from './resolvers/real-estate-ad.resolver';

const routes: Routes = [
  {
    path: '',
    component: RealEstateAdsComponent,
  },
  {
    path: ':id',
    resolve: {
      realEstateAd: realEstateAdResolver,
    },
    component: RealEstateAdComponent,
  },
];

@NgModule({
  declarations: [...pages],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [],
  providers: [provideHttpClient()],
})
export class RealEstateModule {}

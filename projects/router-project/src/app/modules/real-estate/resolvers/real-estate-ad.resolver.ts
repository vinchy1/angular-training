import { inject } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { RealEstateAd } from '../models/real-estate-ad.model';
import { RealEstateAdService } from '../services/real-estate-ad.service';
import { EMPTY, catchError } from 'rxjs';

export const realEstateAdResolver: ResolveFn<RealEstateAd> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const realEstateAdService = inject(RealEstateAdService);
  const router = inject(Router);
  const userId = route.paramMap.get('id')!;

  return realEstateAdService.get(userId).pipe(
    catchError(() => {
      router.navigateByUrl('/not-found');
      return EMPTY;
    })
  );
};

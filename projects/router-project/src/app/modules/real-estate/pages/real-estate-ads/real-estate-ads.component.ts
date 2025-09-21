import { Component, inject } from '@angular/core';
import { RealEstateAdService } from '../../services/real-estate-ad.service';

@Component({
  selector: 'app-real-estate-ads',
  templateUrl: './real-estate-ads.component.html',
  standalone: false,
})
export class RealEstateAdsComponent {
  private realEstateAdService = inject(RealEstateAdService);

  realEstateAds$ = this.realEstateAdService.list();
}

import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RealEstateAd } from '../../models/real-estate-ad.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-real-estate-ad',
  templateUrl: './real-estate-ad.component.html',
  standalone: false,
})
export class RealEstateAdComponent {
  private route = inject(ActivatedRoute);
  ad$: Observable<RealEstateAd> = this.route.data.pipe(map((data) => data['realEstateAd']));
}

import { Injectable } from '@angular/core';
import { RealEstateAd } from '../models/real-estate-ad.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateAdService {
  private apiUrl = 'http://localhost:3000/realEstateAds';

  constructor(private http: HttpClient) {}

  list(): Observable<RealEstateAd[]> {
    return this.http.get<RealEstateAd[]>(this.apiUrl);
  }

  get(id: string): Observable<RealEstateAd> {
    return this.http.get<RealEstateAd>(`${this.apiUrl}/${id}`);
  }
}

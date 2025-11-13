import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Region } from '../../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private baseUrl = `${environment.apiUrl}/regions`

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<Region[]> {
    console.log("get regions")
    return this.http.get<Region[]>(this.baseUrl, { withCredentials: true });
  }
}

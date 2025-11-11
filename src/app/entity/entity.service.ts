import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

export interface Entity {
  id?: number;
  corporate_name: string;
  trade_name: string;
  cnpj: string;
  region: Region;
  inauguration_date: string;
  active: boolean;
}

export interface Region {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  private baseUrl = `${environment.apiUrl}/entities`

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  getAll(): Observable<Entity[]> {
    console.log("get entities")
    return this.authService.token$.pipe(
      tap(token => console.log("token now:", token)),
      filter((token): token is string => !!token),
      take(1),
      switchMap((token) => 
        this.http.get<Entity[]>(this.baseUrl, {
          headers: {Authorization: `Bearer ${token}`}
        })
      )
    )
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { filter, Observable, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Entity } from '../../models/entity.model';

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
    return this.http.get<Entity[]>(this.baseUrl, { withCredentials: true });
  }

  store(entity: Entity): Observable<Entity> {
    return this.http.post<Entity>(this.baseUrl, entity, {withCredentials: true})
  }

  update (id: number, entity: Entity): Observable<Entity> {
    return this.http.put<Entity>(`${this.baseUrl}/${id}`, entity, { withCredentials: true })
  }

  getById(id: number): Observable<Entity> {
    return this.http.get<Entity>(`${this.baseUrl}/${id}`, {withCredentials: true})
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {withCredentials: true})
  }
}

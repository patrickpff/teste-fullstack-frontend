import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth/token';

  // User state in memory
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  // Token in memory
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable()

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    const body = {
      username,
      password
    }

    return this.http.post<AuthResponse>(this.apiUrl, body).pipe(
      tap((res) => {
        this.tokenSubject.next(res.access_token);
        this.fetchUser().subscribe();
      })
    )
  }

  logout() {
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }

  private fetchUser(): Observable<User> {
    const url = `${environment.apiUrl}/user`

    return this.token$.pipe(
      tap((token) => {
        if (!token) throw new Error('No token found');
      }),
      switchMap((token) =>
        this.http.get<User>(url, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ),
      tap((user) => this.currentUserSubject.next(user))
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}

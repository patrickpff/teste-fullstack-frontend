import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/auth/token';

  // User state in memory
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  
  // Token in memory
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    const body = {
      email,
      password
    }

    return this.http.post<AuthResponse>(this.apiUrl, body).pipe(
      tap((res) => {
        this.token = res.access_token;

        this.fetchUser().subscribe();
      })
    )
  }

  private fetchUser(): Observable<User> {
    return this.http.get<User>('/api/user').pipe(
      tap((user) => this.currentUserSubject.next(user))
    );
  }

  getToken(): string | null {
    return this.token;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value != null;
  }
}

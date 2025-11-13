import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth/token`;
  private userUrl = `${environment.apiUrl}/user`;
  private logoutUrl = `${environment.apiUrl}/auth/logout`;

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();


  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Initialize the authentication
   */
  initAuth() {
    return this.fetchUser().subscribe()
  }

  /**
   * Log in and store the tokens in memory
   * 
   * @param username 
   * @param password 
   * @returns 
   */
  login(username: string, password: string) {
    return this.http.post<AuthResponse>(
      this.apiUrl,
      { username, password },
      { withCredentials: true } // 🔑 allow cookies from API
    ).pipe(
      tap(() => {
        this._isLoggedIn.next(true);
      })
    );
  }

  /**
   * Update the access token using refresh token
   * 
   * @returns 
   */
  refreshToken(): Observable<any> {
    const url = `${environment.apiUrl}/auth/refresh`

    return this.http.post(url, {}, { withCredentials: true });
  }

  /**
   * Logout and clear memory
   */
  logout(): void {
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    document.cookie = 'refresh_token=; Max-Age=0; path=/;';
  }

  /**
   * Search for autheticated user with the token in use
   * 
   * @returns 
   */
  private fetchUser() {
    return this.http.get<any>(
      this.userUrl,
      { withCredentials: true }
    ).pipe(
      tap({
        next: (user) => {
          this._isLoggedIn.next(true);
          console.log("User: ", user);
        },
        error: (err) => {
          if (err.status == 401) {
            this._isLoggedIn.next(false);
            console.warn("User not authenticated or session expired.")
          }
        }
      })
    )
  }
  
  checkSession() {
    return this.http.get<boolean>('/api/check-session', { withCredentials: true })
  }
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { catchError, map, of, switchMap, take } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkSession().pipe(
    take(1),
    switchMap(isLoggedIn => {
      if (isLoggedIn) return of(true);

      return authService.refreshToken().pipe(
        switchMap(refreshed => {
          if (refreshed) return authService.checkSession();
          else return of(false);
        }),
        map(valid => {
          if (valid) return true;
          router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        })
      );
    }),
    catchError(() => {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return of(false);
    })
  );
};

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { authInterceptor } from './interceptors/auth.interceptor';

export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    JwtHelperService,
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]), withInterceptorsFromDi()),
    provideAnimations(),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [''],
          disallowedRoutes: ['']
        }
      })
    ),
  ]
};

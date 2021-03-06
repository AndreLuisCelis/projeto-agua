import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  constructor(
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentUser = this.authenticationService?.currentUserValue;
    let isLoggedIn = currentUser && currentUser.token;
    const helper = new JwtHelperService();
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    // VERIFICA SE O TOKEN EXPIROU
    if(helper.isTokenExpired(currentUser?.token)){
      this.authenticationService.logout();
      isLoggedIn = false;
    }
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}

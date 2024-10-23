import {
  HttpEvent,
  HttpRequest,
  HttpInterceptorFn,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpResponse,
  HttpProgressEvent,
  HttpUserEvent
} from '@angular/common/http';
import { KeycloakService } from '../services/keycloak/keycloak.service';
import { Observable, from, switchMap } from 'rxjs';
import { inject } from '@angular/core';

// Functional interceptor
export const httpTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) => {
  // Use the inject function to get an instance of KeycloakService
  const keycloakService = inject(KeycloakService);

  // Convert the promise from getToken into an observable
  return from(keycloakService.getToken()).pipe(
    switchMap(token => {
      // If token is present, clone the request and set the Authorization header
      if (token) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(authReq); // Proceed with the modified request
      }
      // If no token, continue with the original request
      return next(req);
    })
  );
};



/*
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { KeycloakService } from '../services/keycloak/keycloak.service';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private keycloakService: KeycloakService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Use the getToken() method to retrieve the token
    return from(this.keycloakService.getToken()).pipe(
      switchMap(token => {
        // If a token is available, clone the request and set the Authorization header
        const authReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });
        return next.handle(authReq); // Pass the modified request to the next handler
      }),
      // Handle the case where no token is available
      switchMap(() => next.handle(request)) // Continue without modifying the request
    );
  }
}

/*
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KeycloakService} from '../services/keycloak/keycloak.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private keycloakService: KeycloakService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.keycloakService.keycloak.token;
    if (token) {
      const authReq = request.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
*/

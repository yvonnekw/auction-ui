import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AppNavbar } from './app/navbar/navbar.component'



bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/*
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { KeycloakService } from './app/services/keycloak/keycloak.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './app/interceptor/http-token.interceptor';

const keycloakService = new KeycloakService();

keycloakService.init().then(authenticated => {
  if (authenticated) {
    console.log('User authenticated');
  } else {
    console.log('User not authenticated, but no forced login');
  }

  bootstrapApplication(AppComponent, {
    providers: [
      { provide: KeycloakService, useValue: keycloakService },
      HttpClientModule,
      { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
    ]
  });
}).catch(err => console.error('Keycloak init failed', err));

/*
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { KeycloakService } from '../src/app/services/keycloak/keycloak.service';

const keycloakService = new KeycloakService();

keycloakService.init().then(authenticated => {
  if (authenticated) {
    console.log('User authenticated');
  } else {
    console.log('User not authenticated, but no forced login');
  }

  // Now bootstrap the Angular app
  bootstrapApplication(AppComponent, {
    providers: [
      // Add KeycloakService to providers
      { provide: KeycloakService, useValue: keycloakService }
    ]
  });
}).catch(err => console.error('Keycloak init failed', err));

*/
/*

*/

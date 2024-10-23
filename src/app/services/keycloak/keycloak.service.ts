import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloakInstance: Keycloak.KeycloakInstance;
  private authenticated: boolean = false;
  private userProfile: UserProfile | undefined;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:9098',  // Keycloak base URL
      realm: 'auth2-auction-realm',   // Keycloak realm name
      clientId: 'auth2-auction-client' // Keycloak client ID
    });
  }

  // Initialize Keycloak instance
  async init(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<boolean> {
    try {
      this.authenticated = await this.keycloakInstance.init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
      });

      if (this.authenticated) {
        await this.loadUserProfile();
      }

      return this.authenticated;
    } catch (err) {
      console.error('Keycloak init error', err);
      return false;
    }
  }

  // Load user profile after authentication
  private async loadUserProfile(): Promise<void> {
    try {
      this.userProfile = await this.keycloakInstance.loadUserProfile() as UserProfile;
    } catch (err) {
      console.error('Failed to load user profile', err);
    }
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authenticated || this.keycloakInstance.authenticated || false;
  }

  // Getter for the user profile
  getUserProfile(): UserProfile | undefined {
    return this.userProfile;
  }

  // Function to log in
  login(): void {
    this.keycloakInstance.login();
  }

  // Function to log out
  logout(): void {
    this.keycloakInstance.logout({ redirectUri: 'http://localhost:4200' }); // Ensure redirect URI is correctly formatted
  }

  // Get token
  getToken(): Promise<string> {
    return this.keycloakInstance.token
      ? Promise.resolve(this.keycloakInstance.token)
      : Promise.reject('No token');
  }
}

/*
import {Injectable} from '@angular/core';
import Keycloak from 'keycloak-js';
import {UserProfile} from './user-profile';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloakInstance: Keycloak.KeycloakInstance;
  private authenticated: boolean = false;

  constructor() {
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:9098',  // Keycloak base URL
      realm: 'auth2-auction-realm',   // Keycloak realm name
      clientId: 'auth2-auction-client' // Keycloak client ID
    });
  }

  // Initialize Keycloak instance
  init(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): Promise<boolean> {
    // You can use the route and state parameters here if needed for specific logic

    return this.keycloakInstance
      .init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
      })
      .then(authenticated => {
        this.authenticated = authenticated;
        return authenticated;
      })
      .catch(err => {
        console.error('Keycloak init error', err);
        return false;
      });
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authenticated || this.keycloakInstance.authenticated || false;

  }

  /*
    constructor() {
    }


    get keycloak() {
      if (!this._keycloak) {
        this._keycloak = new Keycloak({
          url: 'http://localhost:9098',
          realm: 'auth2-auction-realm',
          clientId: 'auth2-auction-client'
        });
      }
      return this._keycloak;
    }

    get profile() : UserProfile | undefined {
      return this._profile
    }


    async init() {
      console.log('Authenticating the user ...')
     const authenticated = await this.keycloak?.init({
       onLoad: 'login-required'
     });

      if (authenticated) {
        console.log('User Authenticated...');
        this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
        this._profile.token = this.keycloak?.token;
      }
    }
  */

/*
  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({redirectUri: 'http:localhost;4200'})
  }
}
*/

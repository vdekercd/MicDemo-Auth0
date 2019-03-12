import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    audience: 'http://127.0.0.1/',
    scope: 'openid profile',
    clientID: 'CLIENTID',
    domain: 'DOMAIN',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/',
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/login']);
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.setSession(authResult);
        console.log('authenticated');
        this.router.navigate(['/dashboard']);
      } else if (err) {
        console.log(err);
        this.router.navigate(['/login']);
      }
    });
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime < expiresAt;
  }

  private setSession(authResult): void {
    const expireAt = JSON.stringify(authResult.expiresIn * 1000) + new Date().getTime();
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expireAt);
    console.log(authResult.accessToken);
  }


}

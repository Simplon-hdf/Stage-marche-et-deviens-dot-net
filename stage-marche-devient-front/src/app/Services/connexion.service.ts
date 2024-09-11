import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserCredentials } from '../Models/con.model';
import { map, Observable, tap } from 'rxjs';

export interface CredentialResponse {
  token:string;
  message:string;
}

export interface CredentialOnToken {
  nameid:string;
  unique_name:string;
  given_name:string;
  role:string;
  nbf:number;
  exp:number;
  iat:number;
}

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private BASE_URL = 'http://localhost:5001';
  user = signal<CredentialOnToken | null | undefined>(undefined);
  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodedToken(): CredentialOnToken | null {
    const helper = new JwtHelperService();
    return helper.decodeToken<CredentialOnToken | null>(this.getToken()!);
  }

  login(credentials: UserCredentials): Observable<CredentialOnToken | null | undefined> {
    return this.http
      .post(this.BASE_URL + '/Auth/Connexion', credentials)
      .pipe(
        tap((result: any) => {
          localStorage.setItem('token', result.token);
          this.user.set(this.decodedToken());
        }),
        map((result: any) => {
          return this.user();
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.user.set(undefined);
  }
}

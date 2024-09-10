import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer le token CSRF depuis l'API
  getCsrfToken(): Observable<any> {
    return this.http.get('/api/csrf-token');
  }
}
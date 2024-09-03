import { Injectable } from '@angular/core';
import { ApiService } from "./api/api.service";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from "rxjs";
import { Randonnee } from "../Models/randonnee.model";
import { environment } from "../Environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RandonneeService {
  private readonly RANDONNEE_ENDPOINT = '/api/Randonnee';
  private apiUrl = 'https://localhost:5001/api/Randonnee'

  constructor(private api: ApiService, private http: HttpClient) { }

  getRandos(): Observable<Randonnee[]> {
    const url = `${environment.apiBaseUrl}${this.RANDONNEE_ENDPOINT}`;
    console.log('Calling API at:', url);
    return this.api.get<Randonnee[]>(url).pipe(
      catchError(error => {
        console.error('Erreur détaillée:', error);
        return throwError(() => new Error(`Échec de la récupération des randonnées: ${error.message}`));
      })
    );
  }
 
  getRandonnee(id: number): Observable<Randonnee> {
    return this.http.get<Randonnee>(`${this.apiUrl}/${id}`);
  }
}
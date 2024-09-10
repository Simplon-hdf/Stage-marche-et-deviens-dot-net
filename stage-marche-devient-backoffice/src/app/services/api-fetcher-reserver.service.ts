import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Reserver } from '../intefaces/reserver';

@Injectable({
  providedIn: 'root'
})
export class ApiFetcherReserverService {
  constructor() { }

  httpClient = inject(HttpClient);

  private endPointUrl: string = "https://localhost:7092/api/Reserver";
  
  RecupererListeReserver(): Observable<any> {
    return this.httpClient.get<Reserver[]>(this.endPointUrl, { observe: 'response' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);
          
          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  RecupererListeReserverParUtilisateur(idUtilisateur: number): Observable<any> {
    return this.httpClient.get(this.endPointUrl + "/idUtilisateur:" + idUtilisateur, { observe: 'response' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  RecupererListeReserverParSession(idSession: number): Observable<any> {
    return this.httpClient.get(this.endPointUrl + "/idSession:" + idSession, { observe: 'response' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  RecupererReserverParId(idReserver: number): Observable<any> {
    return this.httpClient.get(this.endPointUrl + "/" + idReserver, { observe: 'response' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  AjouterReserver(reserver: Reserver): Observable<any> {
    return this.httpClient.post(this.endPointUrl, reserver, { observe: 'response' ,responseType: 'text' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  SuppressionReserver(idReserver: number): Observable<any> {
    return this.httpClient.delete(this.endPointUrl + `/${idReserver}`, { observe: 'response' ,responseType: 'text' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }

  MiseAJourReserver(idReserver: number, reserverModif: Reserver): Observable<any> {
    return this.httpClient.put(this.endPointUrl + "/" + idReserver, reserverModif, { observe: 'response' ,responseType: 'text' })
      .pipe(
        map(response => {
          console.log('Status:', response.status);
          console.log('Body:', response.body);

          if (response.status >= 200 && response.status < 300) {
            return response.body;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }),
        catchError(error => {
          console.error('Error:', error);
          return of(null);
        })
      );
  }
}
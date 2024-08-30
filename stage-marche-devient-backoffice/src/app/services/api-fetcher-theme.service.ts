import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map , of } from 'rxjs';
import { Theme } from '../intefaces/theme';

@Injectable({
  providedIn: 'root'
})
export class ApiFetcherThemeService {

  private endPointUrl: string = "https://localhost:7260/api/Theme"

  httpClient = inject(HttpClient);
  
  recupererThemeList(): Observable<any>{
    return this.httpClient.get(`${this.endPointUrl}`, { observe: 'response' })
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

  recupererThemeParId(id: number): Observable<any>{
    return this.httpClient.get(`${this.endPointUrl}/${id}`, { observe: 'response' })
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

  
  async ajoutTheme(theme: Theme) {
     
    this.httpClient.post(`${this.endPointUrl}`, { "nomTheme":  theme.nom }, { observe: 'response' })
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

  async supprimerTheme(id: number) {
    await this.httpClient.delete(`${this.endPointUrl}/${id}`, { observe: 'response' })
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

  majTheme(id: number,theme: Theme){
      this.httpClient.put(`${this.endPointUrl}/${id}`,{ "nomTheme": theme.nom }, { observe: 'response' })
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
